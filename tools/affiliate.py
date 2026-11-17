#!/usr/bin/env python3
"""アフィリエイトリンクの組み立てを1か所にまとめる。

楽天のアフィリエイトIDはここだけに書く。script.js と各ページの
インラインJSにも同じIDが入るが、apply_rakuten_links.py の検査で
ここと一致しているかを確かめる。
"""

import re
import urllib.parse

AMAZON_TAG = 'jbmt-22'
RAKUTEN_ID = '599f973b.374c4c97.599f973c.7d69e558'

# 楽天の汎用リンク。pc= / m= に楽天内のURLを渡すとそこへ飛ぶ。
# 商品ページは店舗ごとに分かれていて、売り切れ・出品停止でリンクが
# 切れるため、製品名で楽天市場を検索した結果に飛ばす。
RAKUTEN_HGC = 'https://hb.afl.rakuten.co.jp/hgc/%s/' % RAKUTEN_ID


def rakuten_search_url(keyword):
    keyword = re.sub(r'\s+', ' ', keyword).strip()
    target = 'https://search.rakuten.co.jp/search/mall/%s/' % urllib.parse.quote(keyword, safe='')
    enc = urllib.parse.quote(target, safe='')
    return '%s?pc=%s&m=%s' % (RAKUTEN_HGC, enc, enc)


def amazon_keyword(url):
    """Amazon検索リンクの検索語。商品ページ（/dp/）なら空。"""
    q = urllib.parse.urlparse(url.replace('&amp;', '&')).query
    return (urllib.parse.parse_qs(q).get('k') or [''])[0]


def amazon_asin(url):
    m = re.search(r'/dp/([A-Z0-9]{10})', url)
    return m.group(1) if m else ''
