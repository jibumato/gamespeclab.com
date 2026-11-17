#!/usr/bin/env python3
"""Amazonの購入リンクの隣に、楽天市場で同じ製品を探すリンクを添える。

対象:
  - 静的HTMLにある Amazon アソシエイトのリンク（tag=jbmt-22）すべて
  - 図鑑の DATA。各製品に rlink（楽天のリンク）を持たせ、カードと比較表の
    JS がそれを使う

検索語:
  1. Amazon検索リンク（/s?k=）なら、その検索語をそのまま使う
  2. 商品ページ（/dp/ASIN）なら、図鑑で同じASINを持つ製品名
  3. 図鑑に無ければ、カード型リンクの見出し
  4. それも無ければ EXTRA に書いた名前

生成スクリプトが pro-* / vs-* などを作り直すと楽天のリンクは消えるので、
最後に必ず実行される gen_search_index.py からも呼ぶ。単体でも実行できる。
既存の楽天リンクを外してから付け直すので、2回続けて実行しても差分が
出ない（冪等）。
"""

import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from affiliate import (AMAZON_TAG, RAKUTEN_ID, amazon_asin, amazon_keyword,  # noqa: E402
                       rakuten_search_url)

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
ZUKAN = 'device-zukan.html'

# 図鑑に無いASIN。カード型でもないため見出しを拾えないもの。
EXTRA = {
    'B0C783P8BJ': 'HyperX Cloud III',
    'B0CH9YTXT5': 'Pulsar X2V2',
}

AMAZON_A = re.compile(
    r'<a\s[^>]*href="(https://www\.amazon\.co\.jp/[^"]*)"[^>]*>(.*?)</a>', re.S)
# 付け直す前に外す。自分が入れたものだけを確実に拾うため class で見分ける
OURS = re.compile(r'<a [^>]*class="[^"]*\b(?:is-rakuten|gear-link-rakuten)\b[^"]*"[^>]*>.*?</a>', re.S)
SCRIPT = re.compile(r'<script\b.*?</script>', re.S)
RAKUTEN_ID_RE = re.compile(r'hb\.afl\.rakuten\.co\.jp/hgc/([0-9a-f.]+)/')


def plain_name(name):
    """「（180Hz）」のような括弧書きを外す。検索語としては邪魔になる。"""
    return re.sub(r'\s+', ' ', re.sub(r'[（(].*?[)）]', '', name)).strip()


def zukan_data(src):
    m = re.search(r'(var DATA = )(\[.*?\]);', src, re.S)
    return m, json.loads(m.group(2))


def asin_names():
    _, data = zukan_data(open(ZUKAN, encoding='utf-8').read())
    names = {}
    for d in data:
        a = amazon_asin(d.get('link', ''))
        if a:
            names.setdefault(a, plain_name(d['name']))
    names.update(EXTRA)
    return names


def attr(tag, name):
    m = re.search(r'\s%s="([^"]*)"' % name, tag)
    return m.group(1) if m else None


def is_card(open_tag, inner):
    """リンク全体がカードになっている型（.gear-link-list の中身）。"""
    return attr(open_tag, 'class') is None and '<small>' in inner


def card_title(inner):
    m = re.search(r'<span>(.*?)</span>\s*<small>', inner, re.S)
    if not m:
        return ''
    return re.sub(r'<[^>]+>', '', m.group(1)).strip()


def rakuten_anchor(open_tag, inner, keyword):
    href = rakuten_search_url(keyword).replace('&', '&amp;')
    aff = attr(open_tag, 'data-affiliate')
    common = (' href="%s" target="_blank" rel="nofollow sponsored noopener"%s'
              % (href, ' data-affiliate="%s-rakuten"' % aff if aff else ''))
    if is_card(open_tag, inner):
        return ('<a class="gear-link-rakuten"%s><span data-icon="cart"></span>'
                '楽天市場で探す</a>' % common)
    cls = (attr(open_tag, 'class') + ' is-rakuten').strip()
    label = inner.replace('Amazon.co.jp', '楽天市場').replace('Amazon', '楽天')
    return '<a class="%s"%s>%s</a>' % (cls, common, label)


def strip_ours(src):
    """自分が付けた楽天リンクを外す。<script> の中は触らない。

    図鑑や30秒提案のJSは、文字列として楽天ボタンの <a> を組み立てている。
    そこまで外すとJS側の楽天ボタンが消える（実際に消えた）。
    """
    out, last = [], 0
    for m in SCRIPT.finditer(src):
        out.append(OURS.sub('', src[last:m.start()]))
        out.append(m.group(0))
        last = m.end()
    out.append(OURS.sub('', src[last:]))
    return ''.join(out)


def process_html(src, names, problems, name):
    src = strip_ours(src)
    # インラインJSの文字列に入っている <a は対象外にする
    masked = SCRIPT.sub(lambda m: '\0' * len(m.group(0)), src)
    out, last, count = [], 0, 0
    for m in AMAZON_A.finditer(masked):
        href = m.group(1)
        if 'tag=%s' % AMAZON_TAG not in href:
            continue
        open_tag = src[m.start():m.start() + src[m.start():].index('>') + 1]
        inner = src[m.start(2):m.end(2)]
        keyword = (amazon_keyword(href) or names.get(amazon_asin(href), '')
                   or card_title(inner))
        if not keyword:
            problems.append('%s: 検索語を決められないリンク %s' % (name, href[:80]))
            continue
        if attr(open_tag, 'class') is None and not is_card(open_tag, inner):
            problems.append('%s: 想定外の形のリンク %s' % (name, open_tag[:80]))
            continue
        out.append(src[last:m.end()])
        out.append(rakuten_anchor(open_tag, inner, keyword))
        last = m.end()
        count += 1
    out.append(src[last:])
    return ''.join(out), count


def update_zukan_data():
    src = open(ZUKAN, encoding='utf-8').read()
    m, data = zukan_data(src)
    for d in data:
        keyword = amazon_keyword(d.get('link', '')) or plain_name(d['name'])
        d['rlink'] = rakuten_search_url(keyword)
    new = src[:m.start(2)] + json.dumps(data, ensure_ascii=False) + src[m.end(2):]
    if new != src:
        open(ZUKAN, 'w', encoding='utf-8').write(new)
    return len(data)


def check_ids(problems):
    """楽天のIDが affiliate.py と食い違っている箇所が無いか。"""
    for name in sorted(os.listdir('.')):
        if not (name.endswith('.html') or name == 'script.js'):
            continue
        for found in set(RAKUTEN_ID_RE.findall(open(name, encoding='utf-8').read())):
            if found != RAKUTEN_ID:
                problems.append('%s: 楽天のIDが違う %s' % (name, found))
    # JSが組み立てる楽天ボタンが残っているか。付け直しの処理が <script> の
    # 中まで消してしまったことがあるので、件数で見張る。
    for page, want in (('device-zukan.html', 2), ('quick-pick.html', 1)):
        js = ''.join(SCRIPT.findall(open(page, encoding='utf-8').read()))
        if js.count('is-rakuten') < want:
            problems.append('%s: JSの楽天ボタンが消えている（%d/%d）' % (page, js.count('is-rakuten'), want))
    # 30秒提案のJSは gen_quick_pick.py のテンプレートから作られる。
    # IDを直書きせず affiliate.py から取っているかを見る
    py = open(os.path.join('tools', 'gen_quick_pick.py'), encoding='utf-8').read()
    if 'from affiliate import' not in py:
        problems.append('gen_quick_pick.py が affiliate.py から楽天のIDを取っていない')


def apply():
    os.chdir(ROOT)
    problems = []
    zukan_items = update_zukan_data()
    names = asin_names()
    links, pages = 0, 0
    for name in sorted(os.listdir('.')):
        if not name.endswith('.html'):
            continue
        src = open(name, encoding='utf-8').read()
        new, n = process_html(src, names, problems, name)
        if n:
            links += n
            pages += 1
        if new != src:
            open(name, 'w', encoding='utf-8').write(new)
    check_ids(problems)
    return {'links': links, 'pages': pages, 'zukan': zukan_items}, problems


def main():
    stats, problems = apply()
    print('楽天リンク: %(links)d本（%(pages)dページ）／図鑑 %(zukan)d製品' % stats)
    if problems:
        for p in problems:
            print('  -', p)
        sys.exit(1)


if __name__ == '__main__':
    main()
