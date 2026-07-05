#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""記事ヒーロー用のピクセルモチーフ(透過PNG)を生成.

OGPカードと同じモチーフ関数・スラッグ別アクセントを流用し、
各記事ページのヒーロー右側に置く小さなピクセル絵文字を書き出す。

  python3 tools/build_hero_motifs.py
出力: assets/motifs/<slug>.png (透過)
"""
import os
from PIL import Image

import build_content_ogp as ogp

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "motifs")

SCALE = 10  # 32px グリッド -> 320px (グローはCSSのdrop-shadowで付与)

# PAGES(=OGP)に無い記事ヒーローslugを補完 (slug, motif, accent)
EXTRA = [
    ("gaming-mouse-guide", "mouse", "#9d8be0"),
    ("gaming-keyboard-guide", "gamepad", "#7fd9c4"),
    ("gaming-headset-guide", "chat", "#7fe0c4"),
    ("gaming-mousepad-guide", "mouse", "#5fd0e0"),
    ("gaming-controller-guide", "gamepad", "#ff9bc0"),
    ("gaming-monitor-guide", "monitor", "#5fd0e0"),
    ("site-map", "book", "#72f2ff"),
]


# slug -> アクセントRGB。パッチャ/各ジェネレータが同じ配色を参照する。
ACCENTS = {slug: ogp.hx(ac) for slug, _eb, _jp, ac in ogp.PAGES}
ACCENTS.update({slug: ogp.hx(ac) for slug, _mo, ac in EXTRA})


def accent_rgb(slug):
    ac = ACCENTS.get(slug)
    return " ".join(str(c) for c in ac) if ac else None


def hero_section_attrs(slug):
    """記事ヒーロー<section>に付けるアクセント指定 (無ければ空文字)。"""
    rgb = accent_rgb(slug)
    return f' style="--hero-accent: {rgb}"' if rgb else ""


def motif_html(slug):
    """記事ヒーロー右側に置くピクセルモチーフのマークアップ (無ければ空文字)。"""
    if slug not in ACCENTS:
        return ""
    return (
        '\n        <div class="article-hero-motif" aria-hidden="true">'
        f'<img src="assets/motifs/{slug}.png" alt="" width="180" height="180" '
        'loading="lazy" decoding="async" /></div>'
    )


def build(slug, accent, motif_name=None):
    ac = ogp.hx(accent)
    name = motif_name or ogp.SLUG_MOTIF.get(slug, "radar")
    motif = ogp.MOTIFS.get(name, ogp.m_radar)
    cv = ogp.Cv()
    motif(cv, tuple(ac) + (255,))
    ogp.add_outline(cv)
    art = cv.img.resize((ogp.GW * SCALE, ogp.GH * SCALE), Image.NEAREST)

    os.makedirs(OUT, exist_ok=True)
    art.save(os.path.join(OUT, f"{slug}.png"), optimize=True)


def main():
    for slug, _eb, _jp, ac in ogp.PAGES:
        build(slug, ac)
        print("motif:", slug)
    for slug, motif_name, ac in EXTRA:
        build(slug, ac, motif_name)
        print("motif:", slug)


if __name__ == "__main__":
    main()
