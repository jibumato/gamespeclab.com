#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""results.html の図鑑サムネをステージ化(冪等).

各 <article> の type-thumb を type-thumb-stage(台座+グロー)で包み、
画像スラッグから引いたタイプ別アクセント色を article に注入する。

  python3 tools/apply_dex_thumb_stage.py
"""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)
import generate_type_sprites as G  # noqa: E402

ACCENT = {r["slug"]: r["accent"] for r in G.RECORDS}  # slug -> accent hex
PATH = os.path.join(ROOT, "results.html")

# <article ...> ... <img class="type-thumb" src="assets/types/<slug>.png" ...> ...
ART_RE = re.compile(
    r'<article>(\s*<img class="type-thumb" src="assets/types/([a-z0-9-]+)\.png"[^>]*>)')


def rgb(hexv):
    s = hexv.lstrip("#")
    return f"{int(s[0:2], 16)} {int(s[2:4], 16)} {int(s[4:6], 16)}"


def main():
    s = open(PATH, encoding="utf-8").read()
    if "type-thumb-stage" in s:
        print("skip (already staged)")
        return
    n = 0

    def repl(m):
        nonlocal n
        img, slug = m.group(1).strip(), m.group(2)
        accent = ACCENT.get(slug)
        if accent is None:
            return m.group(0)  # 未知スラッグは触らない
        n += 1
        stage = (f'<span class="type-thumb-stage">'
                 f'<span class="type-thumb-glow" aria-hidden="true"></span>'
                 f'{img}</span>')
        return f'<article style="--type-accent: {rgb(accent)}">{stage}'

    s2 = ART_RE.sub(repl, s)
    open(PATH, "w", encoding="utf-8").write(s2)
    print("dex thumbs staged:", n)


if __name__ == "__main__":
    main()
