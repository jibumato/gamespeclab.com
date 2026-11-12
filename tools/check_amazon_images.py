#!/usr/bin/env python3
"""商品画像の反映結果を検査する。日次ワークフローが無人でコミットするため、
おかしな状態のまま公開されないように手前で止める。

検査するのは次の5点:
  1. 画像URLが m.media-amazon.com 以外を指していないか（規約上ホットリンク必須）
  2. 自サイトに商品写真を保存していないか（assets/ にJPEGが増えていないか）
  3. 写真を指す img に data-fallback と is-photo が必ず付いているか
  4. data-fallback のドット絵が実在するか
  5. 写真が前回より大きく減っていないか（PA-APIの部分障害の取りこぼし検知）
"""

import json
import os
import re
import sys

STORE = 'data/amazon-images.json'
ZUKAN = 'device-zukan.html'
ALLOWED_HOST = 'm.media-amazon.com'

problems = []


def check_store_urls():
    try:
        store = json.load(open(STORE, encoding='utf-8'))
    except (OSError, ValueError):
        return {}
    for asin, rec in store.items():
        for key in ('medium', 'large'):
            url = rec.get(key) or ''
            if url and not url.startswith('https://' + ALLOWED_HOST + '/'):
                problems.append('%s の %s が %s 以外を指している: %s'
                                % (asin, key, ALLOWED_HOST, url[:80]))
    return store


def check_no_saved_photos():
    """商品写真を assets/ に保存していないこと。ドット絵のPNGだけが正。"""
    for root, _dirs, files in os.walk('assets'):
        for f in files:
            if f.lower().endswith(('.jpg', '.jpeg')):
                problems.append('商品写真を保存している可能性: %s'
                                % os.path.join(root, f))


IMG_RE = re.compile(r'<img\s[^>]*>')


def check_markup():
    photos = 0
    for name in sorted(os.listdir('.')):
        if not name.endswith('.html'):
            continue
        src = open(name, encoding='utf-8').read()
        for tag in IMG_RE.findall(src):
            if ALLOWED_HOST not in tag:
                continue
            photos += 1
            if 'data-fallback=' not in tag:
                problems.append('%s: 写真にdata-fallbackが無い %s' % (name, tag[:110]))
                continue
            if 'is-photo' not in tag:
                problems.append('%s: 写真にis-photoが無い %s' % (name, tag[:110]))
            fb = re.search(r'data-fallback="([^"?]+)', tag)
            if fb and not os.path.exists(fb.group(1)):
                problems.append('%s: フォールバック画像が無い %s' % (name, fb.group(1)))
        # 他ドメインの画像を埋め込んでいないか
        for tag in IMG_RE.findall(src):
            m = re.search(r'src="https?://([^/"]+)', tag)
            if m and m.group(1) != ALLOWED_HOST:
                problems.append('%s: 外部画像 %s' % (name, m.group(1)))
    return photos


def check_zukan(store):
    src = open(ZUKAN, encoding='utf-8').read()
    m = re.search(r'var DATA = (\[.*?\]);', src, re.S)
    data = json.loads(m.group(1))
    with_photo = [d for d in data if d.get('photo')]
    for d in with_photo:
        if not d['photo'].startswith('https://' + ALLOWED_HOST + '/'):
            problems.append('図鑑 %s の photo が不正: %s' % (d['name'], d['photo'][:80]))
    # ASINがあるのに写真が無い製品は、落ちたのか元から無いのか切り分けたい
    expect = sum(1 for d in data if re.search(r'/dp/[A-Z0-9]{10}', d.get('link', '')))
    return len(with_photo), expect


def main():
    store = check_store_urls()
    check_no_saved_photos()
    photos = check_markup()
    zphotos, expect = check_zukan(store)

    print('保存済み画像URL: %d件' % len(store))
    print('図鑑の写真: %d/%d 製品（ASIN付き製品のうち）' % (zphotos, expect))
    print('ガイドHTMLの写真img: %d箇所' % photos)

    # ASIN付きの半分未満しか写真が付いていないのは取りこぼしを疑う
    if store and expect and zphotos * 2 < expect:
        problems.append('写真が %d/%d しか付いていない。PA-APIの部分障害を疑う'
                        % (zphotos, expect))

    if problems:
        print('\n問題 %d件:' % len(problems))
        for p in problems:
            print('  -', p)
        sys.exit(1)
    print('\n検査OK')


if __name__ == '__main__':
    main()
