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


# 楽天の検索は「語をすべて含む商品」を探すため、説明的な語や「A / B」の
# 併記が混ざると何もヒットしない。そうした検索語だけ、楽天用に置き換える。
# Amazon側の検索語や図鑑の製品名は変えない。
RAKUTEN_KEYWORD_FIX = {
    'HyperX Cloud Stinger 2 など有線軽量機': 'HyperX Cloud Stinger 2',
    'Logicool G840 / G640': 'Logicool G840',
    '磁気軸エントリー': '磁気軸 ラピッドトリガー キーボード',
    '1万円台のフルHD 180〜200Hz': 'ゲーミングモニター フルHD 180Hz',
    'Wooting 60HE / 80HE': 'Wooting',
    'ARTISAN 疾風甲/乙': 'ARTISAN 疾風',
    'ZOWIE × donk エディション': 'ZOWIE donk',
    'ATTACK SHARK × MAMBASNAKE CM05': 'ATTACK SHARK CM05',
    '玄人志向 KRPW-GA750W/90+': '玄人志向 KRPW-GA750W',
}


def rakuten_keyword(keyword):
    keyword = re.sub(r'\s+', ' ', keyword).strip()
    return RAKUTEN_KEYWORD_FIX.get(keyword, keyword)


def rakuten_search_url(keyword):
    keyword = rakuten_keyword(keyword)
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
