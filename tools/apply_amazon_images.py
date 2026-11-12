#!/usr/bin/env python3
"""data/amazon-images.json の画像URLを図鑑とガイドのHTMLに反映する。

画像はダウンロードせず、PA-APIが返したURLをそのまま src に入れる
（Amazonアソシエイト運営規約で自サイト保存が禁じられているため）。
URLが切れたときにドット絵へ戻せるよう、元のパスを data-fallback に残す。
script.js がこの属性を見て差し替える。

JSONが無い・空のときは何もしない。PA-APIを動かす前のブランチでも安全に
走るようにしてある（GitHub Actions の初回実行で中身が入る）。

2回続けて実行しても差分が出ないこと（冪等）が要件。
"""

import json
import os
import re
import sys

STORE = 'data/amazon-images.json'
ZUKAN = 'device-zukan.html'


def load_store():
    try:
        with open(STORE, encoding='utf-8') as f:
            return json.load(f)
    except (OSError, ValueError):
        return {}


def zukan_data(src):
    m = re.search(r'(var DATA = )(\[.*?\]);', src, re.S)
    if not m:
        raise SystemExit('%s の DATA が見つからない' % ZUKAN)
    return m, json.loads(m.group(2))


def asin_of(link):
    m = re.search(r'/dp/([A-Z0-9]{10})', link or '')
    return m.group(1) if m else None


def update_zukan(store):
    """図鑑の DATA に photo を入れる。JS 側は d.photo を見て写真を優先する。"""
    src = open(ZUKAN, encoding='utf-8').read()
    m, data = zukan_data(src)
    hit = 0
    for d in data:
        rec = store.get(asin_of(d.get('link')) or '')
        if rec and rec.get('medium'):
            d['photo'] = rec['medium']
            hit += 1
        else:
            d.pop('photo', None)      # 取得できなくなったら写真を外す
    new = src[:m.start(2)] + json.dumps(data, ensure_ascii=False) + src[m.end(2):]
    changed = new != src
    if changed:
        open(ZUKAN, 'w', encoding='utf-8').write(new)
    return hit, len(data), changed


def lookup_tables(store):
    """ドット絵のパス → 写真URL と、製品名 → ドット絵のパス を図鑑から作る。

    後者は、HTMLから data-fallback が失われたタグを alt の製品名から
    復旧するために使う。
    """
    src = open(ZUKAN, encoding='utf-8').read()
    _, data = zukan_data(src)
    table, by_name = {}, {}
    for d in data:
        if d.get('img'):
            by_name[d['name']] = d['img']
            rec = store.get(asin_of(d.get('link')) or '')
            if rec and rec.get('medium'):
                table[d['img']] = rec['medium']
    return table, by_name


# 製品写真のimgタグ全体を見て組み立て直す。src だけを置換すると、
# data-fallback を失ったタグ（＝どのドット絵に戻すか分からないタグ）を
# 拾えず復旧できなくなるため、タグ単位で扱う。
IMG_RE = re.compile(r'<img\s[^>]*>')
ATTR_RE = re.compile(r'(\s[a-zA-Z-]+)="([^"]*)"')
PIXEL_PATH = re.compile(r'^(assets/devices/p-[a-z0-9-]+\.png)(\?v=[a-z0-9]+)?$')


def _attrs(tag):
    """属性を順序を保ったまま取り出す。"""
    return [(m.group(1).strip(), m.group(2)) for m in ATTR_RE.finditer(tag)]


def site_version():
    """サイト共通のキャッシュバスター（?v=gearNN）を拾う。

    alt から復旧したドット絵のパスには版数が付かないが、assets は
    immutable 配信なので版数が無いと差し替え時に古い絵が残る。
    """
    src = open('index.html', encoding='utf-8').read()
    m = re.search(r'style\.css\?v=([a-z0-9]+)', src)
    return '?v=' + m.group(1) if m else ''


def rebuild_img(tag, table, by_name, version=''):
    a = dict(_attrs(tag))
    src = a.get('src', '')
    fb = a.get('data-fallback', '')

    # このimgが本来どのドット絵のものかを特定する。
    # data-fallback が最優先。失われていたら alt の製品名から引き直す。
    pixel = ''
    for cand in (fb, src):
        if PIXEL_PATH.match(cand or ''):
            pixel = cand
            break
    if not pixel and 'm.media-amazon.com' in src:
        recovered = by_name.get(a.get('alt', '').strip(), '')
        if recovered:
            pixel = recovered + version
    if not pixel:
        return tag                      # 製品画像ではない（ロゴなど）

    bare = PIXEL_PATH.match(pixel).group(1)
    url = table.get(bare)

    out = []
    for key, val in _attrs(tag):
        if key == 'data-fallback':
            continue                    # 下で付け直す
        if key == 'src':
            out.append(('src', url or pixel))
            if url:
                out.append(('data-fallback', pixel))
        elif key == 'class':
            names = [c for c in val.split() if c != 'is-photo']
            if url:
                names.append('is-photo')
            out.append(('class', ' '.join(names)))
        else:
            out.append((key, val))
    return '<img ' + ' '.join('%s="%s"' % kv for kv in out) + '>'


def update_guides(table, by_name):
    """ガイドの <img> を写真に差し替える。クラスにも is-photo を足す。"""
    touched = {}
    version = site_version()
    for name in sorted(os.listdir('.')):
        if not name.endswith('.html') or name == ZUKAN:
            continue
        src = open(name, encoding='utf-8').read()
        if 'assets/devices/p-' not in src and 'm.media-amazon.com' not in src:
            continue
        new = IMG_RE.sub(lambda mt: rebuild_img(mt.group(0), table, by_name, version), src)
        if new != src:
            open(name, 'w', encoding='utf-8').write(new)
            touched[name] = new.count('m.media-amazon.com')
    return touched


def main():
    # ストアが空でも処理を通す。空なら対応表も空になり、HTMLは
    # ドット絵に戻る。PA-API実行前（何も無い状態）では変化しないので
    # 初回前のブランチでも安全で、写真が消えたときは自己修復する。
    store = load_store()
    hit, total, zchanged = update_zukan(store)
    table, by_name = lookup_tables(store)
    touched = update_guides(table, by_name)

    print('図鑑: %d/%d 製品に写真URLを設定%s' % (hit, total, '' if zchanged else '（変更なし）'))
    print('ドット絵→写真の対応: %d件' % len(table))
    if touched:
        for name in sorted(touched):
            print('  %-34s 写真 %d箇所' % (name, touched[name]))
    else:
        print('ガイド: 変更なし')


if __name__ == '__main__':
    main()
