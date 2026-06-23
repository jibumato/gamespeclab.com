#!/usr/bin/env python3
"""article-hero にトピック別アクセント色を注入（冪等）。

build_content_ogp.py の色マップを再利用し、各ページの
<section class="legal-hero article-hero"> に style="--hero-accent: R G B" を付与。
"""
import glob
import re

# slug -> hex（OGPと統一）。device系など未掲載は既定シアンのまま。
COLOR = {}
for m in re.finditer(
    r'\("([a-z0-9-]+)",\s*"[^"]*",\s*"[^"]*",\s*"(#[0-9a-fA-F]{6})"\)',
    open("tools/build_content_ogp.py", encoding="utf-8").read(),
):
    COLOR[m.group(1)] = m.group(2)

# デバイスガイド等の補完
COLOR.setdefault("gaming-mouse-guide", "#72f2ff")
COLOR.setdefault("gaming-monitor-guide", "#5fd0e0")
COLOR.setdefault("gaming-headset-guide", "#7fd9c4")
COLOR.setdefault("gaming-keyboard-guide", "#ff7fae")
COLOR.setdefault("gaming-controller-guide", "#9d8be0")
COLOR.setdefault("gaming-mousepad-guide", "#ffd24a")


def rgb(hx):
    hx = hx.lstrip("#")
    return f"{int(hx[0:2], 16)} {int(hx[2:4], 16)} {int(hx[4:6], 16)}"


def main():
    changed = 0
    for p in sorted(glob.glob("*.html")):
        slug = p[:-5]
        if slug not in COLOR:
            continue
        html = open(p, encoding="utf-8").read()
        # article-hero のみ対象（plain legal-hero は既定色のまま）
        m = re.search(r'<section class="legal-hero article-hero"([^>]*)>', html)
        if not m:
            continue
        if "--hero-accent" in m.group(0):
            print(f"  ok {p}: 既存スキップ")
            continue
        triplet = rgb(COLOR[slug])
        new_tag = f'<section class="legal-hero article-hero" style="--hero-accent: {triplet}">'
        html = html.replace(m.group(0), new_tag, 1)
        open(p, "w", encoding="utf-8").write(html)
        changed += 1
        print(f"  + {p}: --hero-accent {triplet}")
    print(f"done: {changed} pages changed")


if __name__ == "__main__":
    main()
