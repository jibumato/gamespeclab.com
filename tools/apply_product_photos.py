#!/usr/bin/env python3
"""data/product-photos.json の商品写真を図鑑とガイドのHTMLに反映する。

写真の出どころは2通りあり、どちらも同じ形で扱う。

1. メーカー公式の製品画像を自サイトに置いたもの（src がリポジトリ内のパス）
2. Amazon の Creators API が返した画像URL（src が m.media-amazon.com）
   こちらは規約で自サイト保存が禁じられているため直接参照する

写真が出せないときドット絵へ戻せるよう、元のパスを data-fallback に残す。

キーは製品のドット絵ファイル名（拡張子なし。例 p-mouse-gpx2）。ASINを
キーにすると、Amazonの商品ページを持たない12製品を扱えないため。

JSONが無い・空のときは全てドット絵に戻る（自己修復する）。
2回続けて実行しても差分が出ないこと（冪等）が要件。
"""

import json
import os
import re
import sys

STORE = 'data/product-photos.json'
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


def key_of(d):
    """製品のキー。ドット絵ファイル名（拡張子なし）を使う。"""
    img = d.get('img') or ''
    return os.path.splitext(os.path.basename(img))[0] if img else ''


def photo_src(rec):
    """保存レコードから表示に使うURL/パスを取り出す。"""
    if not rec:
        return ''
    return rec.get('src') or rec.get('medium') or ''  


def update_zukan(store):
    """図鑑の DATA に photo を入れる。JS 側は d.photo を見て写真を優先する。"""
    src = open(ZUKAN, encoding='utf-8').read()
    m, data = zukan_data(src)
    hit = 0
    for d in data:
        url = photo_src(store.get(key_of(d)))
        if url:
            d['photo'] = url
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
            url = photo_src(store.get(key_of(d)))
            if url:
                table[d['img']] = url
    return table, by_name


# 製品写真のimgタグ全体を見て組み立て直す。src だけを置換すると、
# data-fallback を失ったタグ（＝どのドット絵に戻すか分からないタグ）を
# 拾えず復旧できなくなるため、タグ単位で扱う。
IMG_RE = re.compile(r'<img\s[^>]*>')
ATTR_RE = re.compile(r'(\s[a-zA-Z-]+)="([^"]*)"')
PIXEL_PATH = re.compile(r'^(assets/devices/p-[a-z0-9-]+\.png)(\?v=[a-z0-9]+)?$')

# 写真が読めなかったときドット絵へ戻す。this.onerror=null で、
# 戻した先も読めない場合の無限ループを止める。
# script.js 側のハンドラがキャプチャ段階で先に走り、data-fallback を
# 外してから src を差し替える。その後にこちらが走るため、属性が
# 消えていたら何もしない（undefined を src に入れると逆に壊れる）。
ONERROR = ("this.onerror=null;var f=this.dataset.fallback;"
           "if(f){this.classList.remove('is-photo');this.src=f}")


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
        if key in ('data-fallback', 'onerror'):
            continue                    # 下で付け直す
        if key == 'src':
            out.append(('src', url or pixel))
            if url:
                out.append(('data-fallback', pixel))
                # onerror は解析時に登録されるので、script.js の到着が
                # 遅れても取りこぼさない。script.js 側のハンドラは、
                # ここを通らない経路のための保険として残してある。
                out.append(('onerror', ONERROR))
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
            touched[name] = sum(1 for t in IMG_RE.findall(new) if 'data-fallback=' in t)
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
