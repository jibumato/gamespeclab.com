#!/usr/bin/env python3
"""Creators API で商品画像URLを取得し data/product-photos.json に保存する。

PA-API 5.0 は廃止され、後継の Creators API に置き換わった。旧APIのAWS SigV4
署名は不要になり、OAuth 2.0 の client_credentials でトークンを取るだけになった。

Amazonアソシエイト運営規約（JPプログラムポリシー ライセンス条項(h)）では、
画像そのものの保存・キャッシュは禁止で、**画像へのリンクは最長24時間**しか
保持できない。そのためこのスクリプトは画像URLだけを保存し、GitHub Actions の
日次ワークフローで取り直す前提で作っている。

認証情報は環境変数から読む（GitHub Secrets 経由。リポジトリには置かない）:
  CREATORS_CLIENT_ID / CREATORS_CLIENT_SECRET / CREATORS_PARTNER_TAG

使い方:
  python3 tools/fetch_amazon_photos.py            # 取得して保存
  python3 tools/fetch_amazon_photos.py --dry-run  # 認証情報なしで対象ASINだけ確認
"""

import json
import os
import re
import sys
import time
import urllib.error
import urllib.request

# 日本は FE リージョン（認証情報バージョン 3.3）。
# APIのエンドポイントは全リージョン共通。
TOKEN_URL = 'https://api.amazon.co.jp/auth/o2/token'
API_URL = 'https://creatorsapi.amazon/catalog/v1/getItems'
MARKETPLACE = 'www.amazon.co.jp'
SCOPE = 'creatorsapi::default'
RESOURCES = ['images.primary.medium', 'images.primary.large', 'itemInfo.title']
BATCH = 10                    # itemIds は1リクエストあたり最大10件
OUT = 'data/product-photos.json'


def targets_from_zukan(path='device-zukan.html'):
    """図鑑の DATA から ASIN を拾う。

    保存先のキーは製品のドット絵ファイル名（拡張子なし）に揃える。
    メーカー公式画像を使う経路と同じキーにしておくことで、どちらの
    出どころでも apply 側が同じように扱える。

    同じASINを複数製品が参照することがある（例: B0BLVB63JH は
    マウスパッドとデスクの両方に G840 として載っている）。同一商品なので
    写真は共通でよく、ASINごとに参照する製品キーの一覧を持たせる。
    """
    src = open(path, encoding='utf-8').read()
    m = re.search(r'var DATA\s*=\s*(\[.*?\]);', src, re.S)
    if not m:
        raise SystemExit('device-zukan.html の DATA が見つからない')
    found = {}
    for d in json.loads(m.group(1)):
        am = re.search(r'/dp/([A-Z0-9]{10})', d.get('link', ''))
        img = d.get('img') or ''
        if am and img:
            key = os.path.splitext(os.path.basename(img))[0]
            found.setdefault(am.group(1), []).append((key, d['name']))
    return found


def _post(url, payload, headers):
    body = json.dumps(payload, ensure_ascii=False).encode('utf-8')
    req = urllib.request.Request(url, data=body, headers=headers, method='POST')
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.loads(r.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        detail = e.read().decode('utf-8', 'replace')[:800]
        hint = ''
        if e.code in (401, 403):
            hint = ('\nヒント: Creators API は「直近30日で10件の適格販売」が'
                    '利用条件。条件を割ると権限が外れる。')
        raise SystemExit('%s が %s を返した:\n%s%s' % (url, e.code, detail, hint))


def get_token(client_id, client_secret):
    """client_credentials でアクセストークンを取る。有効期限は1時間。

    リフレッシュトークンは発行されない（必要になれば取り直すだけ）。
    ブラウザ同意も不要なので、無人のCIで素直に動く。
    """
    res = _post(TOKEN_URL, {
        'grant_type': 'client_credentials',
        'client_id': client_id,
        'client_secret': client_secret,
        'scope': SCOPE,
    }, {'Content-Type': 'application/json'})
    token = res.get('access_token')
    if not token:
        raise SystemExit('アクセストークンを取得できなかった: %s' % str(res)[:300])
    return token


def get_items(asins, token, partner_tag):
    return _post(API_URL, {
        'itemIds': asins,
        'itemIdType': 'ASIN',
        'marketplace': MARKETPLACE,
        'partnerTag': partner_tag,
        'resources': RESOURCES,
    }, {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        # x-marketplace は PA-API には無かった必須ヘッダ。
        # 付け忘れが移行時の典型的な失敗要因として挙げられている。
        'x-marketplace': MARKETPLACE,
    })


def items_of(res):
    """レスポンスから商品配列を取り出す。包みの形が変わっても拾えるようにする。"""
    if isinstance(res.get('items'), list):
        return res['items']
    nested = res.get('itemsResult') or {}
    if isinstance(nested.get('items'), list):
        return nested['items']
    return []


def main():
    dry = '--dry-run' in sys.argv
    targets = targets_from_zukan()
    print('対象ASIN: %d件' % len(targets))

    if dry:
        for a in sorted(targets, key=lambda k: targets[k][0][1]):
            for key, name in targets[a]:
                print('  %s  %-22s %s' % (a, key, name))
        print('\n--dry-run のため送信しません')
        return

    cid = os.environ.get('CREATORS_CLIENT_ID', '')
    sec = os.environ.get('CREATORS_CLIENT_SECRET', '')
    tag = os.environ.get('CREATORS_PARTNER_TAG', '')
    missing = [n for n, v in [('CREATORS_CLIENT_ID', cid),
                              ('CREATORS_CLIENT_SECRET', sec),
                              ('CREATORS_PARTNER_TAG', tag)] if not v]
    if missing:
        raise SystemExit('環境変数が未設定: ' + ', '.join(missing))

    token = get_token(cid, sec)

    # 取得できなかったASINは前回値を残す。一時的な失敗で写真が
    # 一斉に消えるのを避けるため、上書きではなくマージする。
    try:
        store = json.load(open(OUT, encoding='utf-8'))
    except (OSError, ValueError):
        store = {}

    keys = sorted(targets)
    ok = 0
    problems = []
    for i in range(0, len(keys), BATCH):
        chunk = keys[i:i + BATCH]
        res = get_items(chunk, token, tag)
        for item in items_of(res):
            asin = item.get('asin') or item.get('ASIN')
            primary = (item.get('images') or {}).get('primary') or {}
            med = (primary.get('medium') or {}).get('url')
            lar = (primary.get('large') or {}).get('url')
            if not asin or not med:
                problems.append('%s 画像なし' % (asin or '(ASIN不明)'))
                continue
            title = ((item.get('itemInfo') or {}).get('title') or {}).get('displayValue', '')
            for key, name in targets.get(asin, []):
                # メーカー公式画像を置いてある製品はそちらを優先する。
                # 自サイトに置ける分、24時間の保持制限も受けない。
                existing = store.get(key) or {}
                if existing.get('src', '').startswith('assets/'):
                    problems.append('%s はメーカー画像があるため据え置き' % key)
                    continue
                store[key] = {
                    'src': med,
                    'large': lar or med,
                    'title': title,
                    'name': name,
                    'source': 'creators-api',
                    'asin': asin,
                }
                ok += 1
        for err in res.get('errors') or res.get('Errors') or []:
            problems.append('%s %s' % (err.get('code') or err.get('Code'),
                                       (err.get('message') or err.get('Message') or '')[:120]))
        if i + BATCH < len(keys):
            time.sleep(1.1)

    # 図鑑から消えた製品のうち、Amazon由来のものは保存先からも落とす
    # （メーカー公式画像は図鑑と無関係に手で足すこともあるので残す）
    live = {k for v in targets.values() for k, _ in v}
    for gone in [k for k, r in store.items()
                 if k not in live and r.get('source') == 'creators-api']:
        del store[gone]
        problems.append('%s は図鑑に無いため削除' % gone)

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, 'w', encoding='utf-8') as f:
        json.dump(store, f, ensure_ascii=False, indent=2, sort_keys=True)
        f.write('\n')

    print('画像URLを取得: %d件 / 保存済み合計 %d件 → %s' % (ok, len(store), OUT))
    for p in problems:
        print('  注意:', p)
    if ok == 0:
        raise SystemExit('1件も取得できなかったため失敗として扱う')


if __name__ == '__main__':
    main()
