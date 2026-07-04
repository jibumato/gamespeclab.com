#!/usr/bin/env python3
"""汎用検索リンクの「候補をAmazonで探す」「強みを支える一品」カードを
一旦削除する（冪等パッチャーを新データで再実行する前段）。
"""
import glob
import re

GEAR_PICK_PATTERN = re.compile(
    r'\s*<div class="article-card">\s*'
    r'<p class="article-kicker">GEAR PICK</p>.*?'
    r'</div>\s*</div>',
    re.S,
)
ROLE_GEAR_PATTERN = re.compile(
    r'\s*<div class="article-card">\s*'
    r'<p class="article-kicker">ROLE GEAR</p>.*?'
    r'</div>\s*'
    r'<p class="compare-hint">[^<]*<a href="affiliate-disclosure\.html">[^<]*</a>[^<]*</p>\s*'
    r'</div>',
    re.S,
)

GEAR_PICK_PAGES = [
    "gaming-chair-guide.html",
    "gaming-earphone-guide.html",
    "gaming-desk-setup-guide.html",
    "gaming-pc-lifespan-guide.html",
    "game-lag-fix-guide.html",
    "gaming-monitor-settings-guide.html",
]


def main():
    for p in GEAR_PICK_PAGES:
        html = open(p, encoding="utf-8").read()
        new, n = GEAR_PICK_PATTERN.subn("", html, count=1)
        if n:
            open(p, "w", encoding="utf-8").write(new)
            print(f"  - {p}: GEAR PICKカード削除")
        else:
            print(f"  SKIP {p}: 見つからず")

    for p in sorted(glob.glob("gamer-mbti-????.html")):
        html = open(p, encoding="utf-8").read()
        new, n = ROLE_GEAR_PATTERN.subn("", html, count=1)
        if n:
            open(p, "w", encoding="utf-8").write(new)
            print(f"  - {p}: ROLE GEARカード削除")
        else:
            print(f"  SKIP {p}: 見つからず")


if __name__ == "__main__":
    main()
