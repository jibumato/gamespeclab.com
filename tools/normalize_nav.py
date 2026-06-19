#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""全ページのヘッダーナビ(<nav id="site-menu">)を共通化する(冪等).

サイト内ナビのバラつき(遊び方ガイド/読み物ガイド/広告表記の有無など)を解消し、
全ページで同一のメニューに統一する。ガイドハブは articles.html に一本化。
"""
import glob
import re
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

CANON = (
    '<nav id="site-menu" aria-label="サイト内メニュー">\n'
    '        <a href="gamesense.html"><span data-icon="chart"></span>ゲームセンス</a>\n'
    '        <a href="gamermbti.html"><span data-icon="user"></span>ゲーマーMBTI</a>\n'
    '        <a href="results.html"><span data-icon="list"></span>結果一覧</a>\n'
    '        <a href="articles.html"><span data-icon="spark"></span>ガイド</a>\n'
    '        <a href="affiliate-disclosure.html"><span data-icon="ad"></span>広告表記</a>\n'
    '      </nav>'
)

pat = re.compile(r'<nav id="site-menu".*?</nav>', re.S)
n = 0
for p in sorted(glob.glob(os.path.join(ROOT, "*.html"))):
    s = open(p, encoding="utf-8").read()
    if 'id="site-menu"' not in s:
        continue
    s2 = pat.sub(CANON, s, count=1)
    if s2 != s:
        open(p, "w", encoding="utf-8").write(s2)
        n += 1
print("normalized header nav:", n, "files")
