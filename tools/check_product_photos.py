#!/usr/bin/env python3
"""商品写真の反映結果を検査する。自動更新が無人でコミットする構成のため、
おかしな状態のまま公開されないように手前で止める。

写真の出どころは2通りある。
  1. メーカー公式画像を自サイトに置いたもの（assets/devices/photos/ 配下）
  2. Amazon の Creators API が返した画像URL（m.media-amazon.com）

検査するのは次の6点:
  1. 写真が許可された場所以外を指していないか
  2. Amazonの商品画像を自サイトに保存していないか（規約で禁止）
  3. 写真を指す img に data-fallback / onerror / is-photo が揃っているか
  4. data-fallback のドット絵が実在するか
  5. 自前ホスティングの写真ファイルが実在するか
  6. 写真が前回より大きく減っていないか（部分障害の取りこぼし検知）
"""

import json
import os
import re
import sys

STORE = 'data/product-photos.json'
ZUKAN = 'device-zukan.html'
AMAZON_HOST = 'm.media-amazon.com'
PHOTO_DIR = 'assets/devices/photos/'

problems = []


def is_allowed(src):
    """許可されるのは自サイトの写真ディレクトリか、Amazonの画像ホストだけ。"""
    return src.startswith(PHOTO_DIR) or src.startswith('https://' + AMAZON_HOST + '/')


def is_photo_src(src):
    """写真を指す src かどうか（キャッシュバスター付きも拾う）。"""
    return src.startswith(PHOTO_DIR) or AMAZON_HOST in src


def local_path(src):
    """自前ホスティングの写真の実ファイルパス。該当しなければ空。"""
    return src.split('?')[0] if src.startswith(PHOTO_DIR) else ''


def photo_src(rec):
    return (rec or {}).get('src') or (rec or {}).get('medium') or ''


def check_store():
    try:
        store = json.load(open(STORE, encoding='utf-8'))
    except (OSError, ValueError):
        return {}
    for key, rec in store.items():
        src = photo_src(rec)
        if not src:
            problems.append('%s に写真のパスが無い' % key)
        elif not is_allowed(src):
            problems.append('%s の写真が許可外を指している: %s' % (key, src[:90]))
        elif local_path(src) and not os.path.exists(local_path(src)):
            problems.append('%s の写真ファイルが無い: %s' % (key, src))

    # 図鑑のどの製品にも結びつかないキーは、まず打ち間違い。
    # 黙って写真が出ないまま緑になるのを防ぐ。
    known = zukan_keys()
    for key in sorted(set(store) - known):
        problems.append('%s は図鑑のどの製品とも一致しない（キーの打ち間違い？）' % key)
    return store


def zukan_keys():
    src = open(ZUKAN, encoding='utf-8').read()
    data = json.loads(re.search(r'var DATA = (\[.*?\]);', src, re.S).group(1))
    return {os.path.splitext(os.path.basename(d['img']))[0]
            for d in data if d.get('img')}


def check_no_saved_amazon_photos():
    """Amazonの商品画像は自サイトに保存できない（規約）。

    メーカー公式画像は保存してよいので、出どころを data/product-photos.json の
    source で見分ける。Amazon由来のものがローカルに落ちていたら止める。
    """
    try:
        store = json.load(open(STORE, encoding='utf-8'))
    except (OSError, ValueError):
        store = {}
    for key, rec in store.items():
        src = photo_src(rec)
        origin = (rec or {}).get('source', '')
        if local_path(src) and AMAZON_HOST in origin:
            problems.append('%s はAmazon由来の画像を保存している: %s' % (key, src))


IMG_RE = re.compile(r'<img\s[^>]*>')


def check_markup():
    photos = 0
    for name in sorted(os.listdir('.')):
        if not name.endswith('.html'):
            continue
        src_html = open(name, encoding='utf-8').read()
        for tag in IMG_RE.findall(src_html):
            # 図鑑のカードを組み立てるJSテンプレート文字列にも <img が
            # 現れる。実HTMLに文字列連結は出てこないので、それで除く。
            if "' +" in tag or "+ '" in tag:
                continue
            m = re.search(r'\ssrc="([^"]*)"', tag)
            src = m.group(1) if m else ''

            # 外部ホストの画像は、許可したAmazonの画像ホスト以外は認めない
            host = re.match(r'https?://([^/"]+)', src)
            if host and host.group(1) != AMAZON_HOST:
                problems.append('%s: 外部画像 %s' % (name, host.group(1)))

            # 写真かどうかは src で判定する。data-fallback の有無で
            # 判定すると、属性が消えた写真が検査をすり抜けてしまう。
            if not is_photo_src(src):
                continue
            photos += 1
            if not is_allowed(src):
                problems.append('%s: 写真が許可外 %s' % (name, src[:90]))
            if 'data-fallback=' not in tag:
                problems.append('%s: 写真にdata-fallbackが無い %s' % (name, tag[:110]))
            # class属性だけを見る。onerror の中にも is-photo という文字列が
            # 入っているため、タグ全体で探すと必ず一致してしまう。
            cls = re.search(r'\sclass="([^"]*)"', tag)
            if not cls or 'is-photo' not in cls.group(1).split():
                problems.append('%s: 写真にis-photoが無い %s' % (name, tag[:110]))
            # onerror が無いと、script.js の到着が遅れたときに
            # 画像が壊れたまま残る
            if 'onerror=' not in tag:
                problems.append('%s: 写真にonerrorが無い %s' % (name, tag[:110]))
            fb = re.search(r'data-fallback="([^"?]+)', tag)
            if fb and not os.path.exists(fb.group(1)):
                problems.append('%s: フォールバック画像が無い %s' % (name, fb.group(1)))
    return photos


def check_zukan(store):
    src = open(ZUKAN, encoding='utf-8').read()
    m = re.search(r'var DATA = (\[.*?\]);', src, re.S)
    data = json.loads(m.group(1))
    with_photo = [d for d in data if d.get('photo')]
    for d in with_photo:
        if not is_allowed(d['photo']):
            problems.append('図鑑 %s の photo が不正: %s' % (d['name'], d['photo'][:90]))
    return len(with_photo), len(data)


def main():
    store = check_store()
    check_no_saved_amazon_photos()
    photos = check_markup()
    zphotos, total = check_zukan(store)

    print('保存済みの写真: %d件' % len(store))
    print('図鑑の写真: %d/%d 製品' % (zphotos, total))
    print('ガイドHTMLの写真img: %d箇所' % photos)

    # 保存件数に対して反映が大きく欠けているのは取りこぼしを疑う
    if store and zphotos * 2 < len(store):
        problems.append('保存 %d件に対し図鑑の反映が %d件しかない'
                        % (len(store), zphotos))

    if problems:
        print('\n問題 %d件:' % len(problems))
        for p in problems:
            print('  -', p)
        sys.exit(1)
    print('\n検査OK')


if __name__ == '__main__':
    main()
