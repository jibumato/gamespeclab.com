#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""seo-link-grid内の記事カードにOGPサムネイルを追加する(冪等).

各 <a href="X.html"> の先頭に、その記事のOGP画像をサムネイルとして挿入する。
画像の解決順:
  1. assets/og/X.png                       (記事OGP)
  2. assets/types/<code>-ogp.png           (gamer-mbti-XXXX -> XXXX)
  3. assets/types/X-ogp.png                (sense-*-guide)
どれも無いリンクはスキップ(現状カードのまま)。

  python3 tools/apply_card_thumbs.py
"""
import glob
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

BLOCK_RE = re.compile(r'(<div class="seo-link-grid[^"]*">)(.*?)(</div>)', re.S)
LINK_RE = re.compile(r'(<a href="([a-z0-9-]+)\.html">)(<span data-icon=)')


def resolve_thumb(slug):
    candidates = [f"assets/og/{slug}.png"]
    if slug.startswith("gamer-mbti-"):
        candidates.append(f"assets/types/{slug[len('gamer-mbti-'):]}-ogp.png")
    candidates.append(f"assets/types/{slug}-ogp.png")
    for rel in candidates:
        if os.path.exists(os.path.join(ROOT, rel)):
            return rel
    return None


# トップページは thumb-side クラス(右側スモールサムネイル)で高さを維持しつつ適用する。
# CSSでOGP右側のピクセルモチーフ部分だけを正方形に切り出して表示する。


def main():
    total = 0
    for path in sorted(glob.glob(os.path.join(ROOT, "*.html"))):
        html = open(path, encoding="utf-8").read()
        counter = {"n": 0}

        def patch_block(block_match):
            head, body, tail = block_match.groups()

            def patch_link(link_match):
                anchor, slug, icon_span = link_match.groups()
                thumb = resolve_thumb(slug)
                if not thumb:
                    return link_match.group(0)
                counter["n"] += 1
                img = (
                    f'<span class="seo-thumb"><img src="{thumb}" alt="" '
                    f'width="1200" height="630" loading="lazy" decoding="async" /></span>'
                )
                return f"{anchor}{img}{icon_span}"

            if 'class="seo-thumb"' in body:
                return block_match.group(0)
            return head + LINK_RE.sub(patch_link, body) + tail

        new_html = BLOCK_RE.sub(patch_block, html)
        if counter["n"]:
            open(path, "w", encoding="utf-8").write(new_html)
            print(f"{os.path.basename(path)}: {counter['n']} thumbs")
            total += counter["n"]
    print(f"total thumbs: {total}")


if __name__ == "__main__":
    main()
