#!/usr/bin/env python3
"""タイプ別ドット絵キャラを各ガイドページへ組み込む(冪等).

対象:
  - gamer-mbti-XXXX.html  (ゲーマーMBTI 16タイプ, slug=XXXX)
  - sense-*-guide.html     (GameSense Scan 8, slug=ファイル名)

各ページに対し:
  - ヒーローにキャラ画像(assets/types/<slug>.png)を挿入
  - og:image / twitter:image をタイプ別OGPカードへ差し替え
  - キャラ画像のpreloadを追加
  - style.css のキャッシュbust(deep78 -> deep79)
"""
import glob
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = "https://gamespeclab.com"


def targets():
    for path in sorted(glob.glob(os.path.join(ROOT, "gamer-mbti-*.html"))):
        m = re.match(r"gamer-mbti-([a-z]{4})\.html$", os.path.basename(path))
        if m:
            yield path, m.group(1)
    for path in sorted(glob.glob(os.path.join(ROOT, "sense-*-guide.html"))):
        yield path, os.path.basename(path)[:-5]


for path, slug in targets():
    with open(path, encoding="utf-8") as f:
        html = f.read()

    h1 = re.search(r"<h1><span>([^<]+)</span>", html)
    label = h1.group(1).strip() if h1 else slug
    alt = f"{label}のドット絵キャラクター"
    sprite = f"assets/types/{slug}.png"
    ogp = f"{BASE}/assets/types/{slug}-ogp.png"

    html = re.sub(r'(<meta property="og:image" content=")[^"]+(")',
                  rf'\g<1>{ogp}\g<2>', html)
    html = re.sub(r'(<meta name="twitter:image" content=")[^"]+(")',
                  rf'\g<1>{ogp}\g<2>', html)
    html = html.replace("style.css?v=deep78", "style.css?v=deep79")

    if "type-sprite-preload" not in html:
        html = html.replace(
            '<link rel="canonical"',
            f'<link rel="preload" as="image" href="{sprite}" '
            f'fetchpriority="high" data-tag="type-sprite-preload" />\n    '
            '<link rel="canonical"', 1)

    if "type-hero-art" not in html:
        html = html.replace(
            '<section class="legal-hero article-hero">',
            '<section class="legal-hero article-hero type-hero">', 1)
        html = html.replace(
            '<section class="legal-hero article-hero type-hero">\n        <div class="legal-copy">',
            '<section class="legal-hero article-hero type-hero">\n        '
            f'<img class="type-hero-art" src="{sprite}" width="200" height="220" '
            f'loading="eager" decoding="async" alt="{alt}" />\n        '
            '<div class="legal-copy">', 1)

    with open(path, "w", encoding="utf-8") as f:
        f.write(html)
    print("patched", os.path.basename(path), "->", label)
