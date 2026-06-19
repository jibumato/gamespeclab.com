#!/usr/bin/env python3
"""gamer-mbti-*.html にタイプ別ドット絵キャラを組み込む.

  - ヒーローにキャラ画像(assets/types/<code>.png)を挿入
  - og:image / twitter:image をタイプ別OGPカードへ差し替え
  - キャラ画像のpreloadを追加
冪等(再実行しても二重挿入しない)。
"""
import glob
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = "https://gamespeclab.com"

for path in sorted(glob.glob(os.path.join(ROOT, "gamer-mbti-*.html"))):
    name = os.path.basename(path)
    m = re.match(r"gamer-mbti-([a-z]{4})\.html", name)
    if not m:
        continue
    code = m.group(1)
    with open(path, encoding="utf-8") as f:
        html = f.read()

    # H1先頭スパンからタイプ表記("INTJ 冷静沈着の軍師型")を取得
    h1 = re.search(r"<h1><span>([^<]+)</span>", html)
    label = h1.group(1).strip() if h1 else code.upper()
    alt = f"{label}のドット絵キャラクター"
    sprite = f"assets/types/{code}.png"
    ogp = f"{BASE}/assets/types/{code}-ogp.png"

    # 1) OGP / Twitter画像
    html = re.sub(r'(<meta property="og:image" content=")[^"]+(")',
                  rf'\g<1>{ogp}\g<2>', html)
    html = re.sub(r'(<meta name="twitter:image" content=")[^"]+(")',
                  rf'\g<1>{ogp}\g<2>', html)

    # 2) preload(冪等)
    if "type-sprite-preload" not in html:
        html = html.replace(
            '<link rel="canonical"',
            f'<link rel="preload" as="image" href="{sprite}" '
            f'fetchpriority="high" data-tag="type-sprite-preload" />\n    '
            '<link rel="canonical"', 1)

    # 3) ヒーローにキャラ画像(冪等)
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
    print("patched", name, "->", label)
