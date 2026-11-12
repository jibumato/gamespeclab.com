#!/usr/bin/env python3
"""PA-API 5.0 の GetItems で商品画像URLを取得し data/amazon-images.json に保存する。

Amazonアソシエイト運営規約では、商品画像を自サイトに保存して配信することは
できない。PA-APIが返したURL（m.media-amazon.com）を直接参照する必要がある。
そのため、このスクリプトは**画像URLだけ**を保存し、画像ファイルは取得しない。

またPA-APIのデータは24時間までしかキャッシュできないため、GitHub Actions から
日次で実行して保存内容を入れ替える前提で作っている。

認証情報は環境変数から読む（GitHub Secrets 経由。リポジトリには置かない）:
  PAAPI_ACCESS_KEY / PAAPI_SECRET_KEY / PAAPI_PARTNER_TAG

使い方:
  python3 tools/fetch_amazon_images.py            # 取得して保存
  python3 tools/fetch_amazon_images.py --dry-run  # 認証情報なしで対象ASINだけ確認
"""

import datetime
import hashlib
import hmac
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request

HOST = 'webservices.amazon.co.jp'
REGION = 'us-west-2'          # 日本のマーケットプレイスは us-west-2
SERVICE = 'ProductAdvertisingAPI'
PATH = '/paapi5/getitems'
TARGET = 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems'
MARKETPLACE = 'www.amazon.co.jp'
RESOURCES = ['Images.Primary.Medium', 'Images.Primary.Large', 'ItemInfo.Title']
BATCH = 10                    # GetItems は1リクエストあたり最大10 ASIN
OUT = 'data/amazon-images.json'


def asins_from_zukan(path='device-zukan.html'):
    """図鑑の DATA から ASIN を拾う。製品名も一緒に返して突き合わせに使う。"""
    src = open(path, encoding='utf-8').read()
    m = re.search(r'var DATA\s*=\s*(\[.*?\]);', src, re.S)
    if not m:
        raise SystemExit('device-zukan.html の DATA が見つからない')
    found = {}
    for d in json.loads(m.group(1)):
        am = re.search(r'/dp/([A-Z0-9]{10})', d.get('link', ''))
        if am:
            # 同じASINを複数製品が参照することがある（例: B0BLVB63JH は
            # マウスパッドとデスクの両方に G840 として載っている）。同一商品
            # なので写真は共通でよく、名前だけ先勝ちにしておく。
            found.setdefault(am.group(1), d['name'])
    return found


def _sign(key, msg):
    return hmac.new(key, msg.encode('utf-8'), hashlib.sha256).digest()


def _signing_key(secret, datestamp):
    k = _sign(('AWS4' + secret).encode('utf-8'), datestamp)
    k = _sign(k, REGION)
    k = _sign(k, SERVICE)
    return _sign(k, 'aws4_request')


def build_request(asins, access_key, secret_key, partner_tag, now=None):
    """SigV4 で署名したリクエストを組み立てる（送信はしない。テストしやすいよう分離）。"""
    payload = json.dumps({
        'ItemIds': asins,
        'Resources': RESOURCES,
        'PartnerTag': partner_tag,
        'PartnerType': 'Associates',
        'Marketplace': MARKETPLACE,
    }, ensure_ascii=False).encode('utf-8')

    now = now or datetime.datetime.now(datetime.timezone.utc)
    amzdate = now.strftime('%Y%m%dT%H%M%SZ')
    datestamp = now.strftime('%Y%m%d')

    headers = {
        'content-encoding': 'amz-1.0',
        'content-type': 'application/json; charset=utf-8',
        'host': HOST,
        'x-amz-date': amzdate,
        'x-amz-target': TARGET,
    }
    signed = ';'.join(sorted(headers))
    canonical_headers = ''.join('%s:%s\n' % (k, headers[k]) for k in sorted(headers))
    canonical = '\n'.join([
        'POST', PATH, '', canonical_headers, signed,
        hashlib.sha256(payload).hexdigest(),
    ])
    scope = '%s/%s/%s/aws4_request' % (datestamp, REGION, SERVICE)
    to_sign = '\n'.join([
        'AWS4-HMAC-SHA256', amzdate, scope,
        hashlib.sha256(canonical.encode('utf-8')).hexdigest(),
    ])
    sig = hmac.new(_signing_key(secret_key, datestamp),
                   to_sign.encode('utf-8'), hashlib.sha256).hexdigest()
    headers['Authorization'] = (
        'AWS4-HMAC-SHA256 Credential=%s/%s, SignedHeaders=%s, Signature=%s'
        % (access_key, scope, signed, sig))
    return payload, headers


def get_items(asins, access_key, secret_key, partner_tag):
    payload, headers = build_request(asins, access_key, secret_key, partner_tag)
    req = urllib.request.Request('https://%s%s' % (HOST, PATH),
                                 data=payload, headers=headers, method='POST')
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.loads(r.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8', 'replace')[:800]
        raise SystemExit('PA-API が %s を返した:\n%s' % (e.code, body))


def main():
    dry = '--dry-run' in sys.argv
    targets = asins_from_zukan()
    print('対象ASIN: %d件' % len(targets))

    if dry:
        for a, name in sorted(targets.items(), key=lambda kv: kv[1]):
            print('  %s  %s' % (a, name))
        print('\n--dry-run のため送信しません')
        return

    access = os.environ.get('PAAPI_ACCESS_KEY', '')
    secret = os.environ.get('PAAPI_SECRET_KEY', '')
    tag = os.environ.get('PAAPI_PARTNER_TAG', '')
    missing = [n for n, v in [('PAAPI_ACCESS_KEY', access),
                              ('PAAPI_SECRET_KEY', secret),
                              ('PAAPI_PARTNER_TAG', tag)] if not v]
    if missing:
        raise SystemExit('環境変数が未設定: ' + ', '.join(missing))

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
        res = get_items(chunk, access, secret, tag)
        for item in res.get('ItemsResult', {}).get('Items', []):
            asin = item.get('ASIN')
            primary = item.get('Images', {}).get('Primary', {})
            med = primary.get('Medium', {}).get('URL')
            lar = primary.get('Large', {}).get('URL')
            if not med:
                problems.append('%s 画像なし' % asin)
                continue
            store[asin] = {
                'medium': med,
                'large': lar or med,
                'title': item.get('ItemInfo', {}).get('Title', {}).get('DisplayValue', ''),
                'name': targets.get(asin, ''),
            }
            ok += 1
        for err in res.get('Errors', []) or []:
            problems.append('%s %s' % (err.get('Code'), err.get('Message', '')[:120]))
        if i + BATCH < len(keys):
            time.sleep(1.1)       # PA-API の既定レートは 1req/sec

    # 図鑑から消えたASINは保存先からも落とす
    for gone in [a for a in store if a not in targets]:
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
