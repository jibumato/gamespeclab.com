#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""ゲーマーMBTI 16タイプページのヒーローをキャラ展示ステージ化(冪等).

- type-hero セクションにタイプ別アクセント色(--type-accent: R G B)を注入
- ドット絵を type-hero-stage(後光リング+台座)で囲んで魅せる

  python3 tools/apply_type_hero_stage.py
"""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)
import generate_type_sprites as G  # noqa: E402

ACCENT = {d[0]: d[4] for d in G._MBTI_DEF}  # code -> accent hex

SECTION = '<section class="legal-hero article-hero type-hero">'
IMG_RE = re.compile(r'([ \t]*)(<img class="type-hero-art[^"]*"[^>]*>)')


def rgb(hexv):
    s = hexv.lstrip("#")
    return f"{int(s[0:2], 16)} {int(s[2:4], 16)} {int(s[4:6], 16)}"


def patch(code):
    path = os.path.join(ROOT, f"gamer-mbti-{code}.html")
    if not os.path.exists(path):
        print("  (no html)", code)
        return False
    s = open(path, encoding="utf-8").read()
    orig = s
    triplet = rgb(ACCENT[code])

    # 1) セクションにアクセント色を注入
    if "--type-accent" not in s and SECTION in s:
        s = s.replace(
            SECTION,
            f'<section class="legal-hero article-hero type-hero" '
            f'style="--type-accent: {triplet}">', 1)

    # 2) ヒーロー画像をステージで包む
    if "type-hero-stage" not in s:
        def wrap(m):
            ind, img = m.group(1), m.group(2)
            return (f'{ind}<div class="type-hero-stage">\n'
                    f'{ind}  <span class="type-hero-ring" aria-hidden="true"></span>\n'
                    f'{ind}  {img}\n'
                    f'{ind}  <span class="type-hero-pedestal" aria-hidden="true"></span>\n'
                    f'{ind}</div>')
        s = IMG_RE.sub(wrap, s, count=1)

    if s != orig:
        open(path, "w", encoding="utf-8").write(s)
        print("  staged", code)
        return True
    print("  skip (already)", code)
    return False


def main():
    n = 0
    for code in [d[0] for d in G._MBTI_DEF]:
        if patch(code):
            n += 1
    print("type hero stages applied:", n)


if __name__ == "__main__":
    main()
