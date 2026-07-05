#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""gamer-mbti-XXXX.html の type-hero に data-mbti-type-code 属性を付与(冪等).

「タイプ図鑑」機能が、静的タイプページへの直接訪問だけでも
そのタイプを図鑑に登録(解放)できるようにするためのフック。
script.js 側は DOMContentLoaded で [data-mbti-type-code] を探し、
見つかれば unlockDexEntry('mbti', code) を呼ぶ。

  python3 tools/apply_type_dex_hooks.py
"""
import glob
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

PATTERN = re.compile(r'class="legal-hero article-hero type-hero"')


def main():
    total = 0
    for path in sorted(glob.glob(os.path.join(ROOT, "gamer-mbti-????.html"))):
        filename = os.path.basename(path)
        code = filename[len("gamer-mbti-"):-len(".html")].upper()
        if len(code) != 4:
            continue
        html = open(path, encoding="utf-8").read()
        if "data-mbti-type-code" in html:
            print(f"{filename}: already applied")
            continue
        new_html, count = PATTERN.subn(
            f'class="legal-hero article-hero type-hero" data-mbti-type-code="{code}"',
            html,
            count=1,
        )
        if count:
            open(path, "w", encoding="utf-8").write(new_html)
            print(f"{filename}: hooked ({code})")
            total += 1
        else:
            print(f"{filename}: pattern not found, skipped")
    print(f"total hooked: {total}")


if __name__ == "__main__":
    main()
