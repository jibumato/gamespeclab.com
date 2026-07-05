#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""記事ヒーロー(.legal-hero.article-hero)にピクセルモチーフを差し込む(冪等).

- <section> にスラッグ別アクセント(--hero-accent)を付与
- .legal-copy の後ろにモチーフ画像 .article-hero-motif を挿入
先に tools/build_hero_motifs.py を実行してスプライトを生成しておくこと。
MBTIタイプページ(type-hero付き)は対象外。

  python3 tools/apply_hero_motif.py
"""
import glob
import os
import re

import build_hero_motifs as hm

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 素のarticle-hero(type-hero等が付かないもの)だけを対象にする。
# 既存のstyle属性(--hero-accentを持つページがある)も許容する。
HERO_RE = re.compile(
    r'<section class="legal-hero article-hero"([^>]*)>(.*?)</section>', re.S
)


def patch(path):
    slug = os.path.splitext(os.path.basename(path))[0]
    if slug not in hm.ACCENTS:
        return False
    html = open(path, encoding="utf-8").read()
    if "article-hero-motif" in html:
        return False
    m = HERO_RE.search(html)
    if not m:
        return False
    attrs = m.group(1)
    if "--hero-accent" not in attrs:
        attrs += hm.hero_section_attrs(slug)
    inner = m.group(2).rstrip()  # </section>直前の字下げを落とす
    new_section = (
        f'<section class="legal-hero article-hero"{attrs}>'
        f'{inner}{hm.motif_html(slug)}\n      </section>'
    )
    html = html[: m.start()] + new_section + html[m.end():]
    with open(path, "w", encoding="utf-8") as f:
        f.write(html)
    return True


def main():
    n = 0
    for path in sorted(glob.glob(os.path.join(ROOT, "*.html"))):
        if patch(path):
            n += 1
            print("motif+", os.path.basename(path))
    print("patched", n, "pages")


if __name__ == "__main__":
    main()
