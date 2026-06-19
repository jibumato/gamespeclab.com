#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""全ページのフッターnav(<footer class="site-footer">内の<nav>)を共通化(冪等).

フッターが30種類以上に分裂していたのを統一。本文内の関連リンクは各ページに
残るため、文脈リンク(SEO)は維持される。
"""
import glob
import re
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

CANON_NAV = (
    '<nav aria-label="運営情報">\n'
    '        <a href="gamesense.html"><span data-icon="chart"></span>ゲームセンス</a>\n'
    '        <a href="gamermbti.html"><span data-icon="user"></span>ゲーマーMBTI</a>\n'
    '        <a href="results.html"><span data-icon="list"></span>結果一覧</a>\n'
    '        <a href="articles.html"><span data-icon="spark"></span>ガイド</a>\n'
    '        <a href="privacy.html"><span data-icon="shield"></span>プライバシー</a>\n'
    '        <a href="affiliate-disclosure.html"><span data-icon="ad"></span>広告表記</a>\n'
    '        <a href="site-map.html"><span data-icon="list"></span>サイトマップ</a>\n'
    '      </nav>'
)

footer_pat = re.compile(r'(<footer class="site-footer".*?</footer>)', re.S)
nav_pat = re.compile(r'<nav\b.*?</nav>', re.S)


def fix_footer(block):
    if "<nav" in block:
        return nav_pat.sub(CANON_NAV, block, count=1)
    return block


def run(path):
    s = open(path, encoding="utf-8").read()
    if 'class="site-footer"' not in s:
        return False
    s2 = footer_pat.sub(lambda m: fix_footer(m.group(1)), s, count=1)
    if s2 != s:
        open(path, "w", encoding="utf-8").write(s2)
        return True
    return False


if __name__ == "__main__":
    n = sum(run(p) for p in glob.glob(os.path.join(ROOT, "*.html")))
    print("normalized footer nav:", n, "files")
