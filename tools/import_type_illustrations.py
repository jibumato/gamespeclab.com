#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""AI生成したMBTIタイプイラストを取り込んで反映(冪等).

  1. assets/types/src/<code>.png を読む(透過PNG推奨, 16タイプ)
  2. ヒーロー画像 assets/types/<code>.png を生成(正規化)
  3. OGPカード assets/types/<code>-ogp.png を生成(既存レイアウト準拠)
  4. gamer-mbti-<code>.html のヒーロー表示をイラスト用に更新

src に置いたコードだけ処理するので、1体ずつでも実行可。

  python3 tools/import_type_illustrations.py
"""
import os
import re
import sys

from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)
import generate_type_sprites as G  # noqa: E402

OUT = G.OUT
SRC = os.path.join(OUT, "src")

HERO_W = 480           # ヒーロー基準幅(既存スプライトと同じ)
HERO_MAX_H = 620

# code -> 既存レコード(big/arche/group/outfit/accent を流用)
MBTI = {r["slug"]: r for r in G.RECORDS if r["group"] == G._MBTI}


def normalize_hero(im):
    im = im.convert("RGBA")
    alpha = im.split()[-1]
    bbox = alpha.getbbox()
    if bbox and (bbox != (0, 0, im.width, im.height)):
        im = im.crop(bbox)
    w, h = im.size
    nh = max(1, round(h * HERO_W / w))
    im = im.resize((HERO_W, nh), Image.LANCZOS)
    if nh > HERO_MAX_H:
        nw = max(1, round(HERO_W * HERO_MAX_H / nh))
        im = im.resize((nw, HERO_MAX_H), Image.LANCZOS)
    return im


def build_ogp(r, illu):
    """既存 generate_type_sprites.build_ogp と同じレイアウトで、左パネルに
    ドット絵スプライトの代わりにイラストを配置する。"""
    big_text, arche = r["big"], r["arche"]
    outfit, accent, group = r["outfit"], r["accent"], r["group"]
    Wd, Hd = 1200, 630
    base = (10, 11, 24)
    img = Image.new("RGB", (Wd, Hd), base)
    d = ImageDraw.Draw(img)
    oc = G.hx(outfit)
    for y in range(Hd):
        f = y / Hd
        rr = int(base[0] + (oc[0] * 0.35 - base[0]) * f)
        gg = int(base[1] + (oc[1] * 0.35 - base[1]) * f)
        bb = int(base[2] + (oc[2] * 0.35 - base[2]) * f)
        d.line([(0, y), (Wd, y)], fill=(rr, gg, bb))
    for gy in range(0, Hd, 40):
        for gx in range(0, Wd, 40):
            d.point((gx, gy), fill=(255, 255, 255))
    # 左の額縁パネル
    panel = (60, 70, 520, 560)
    d.rounded_rectangle(list(panel), radius=28, fill=(0, 0, 0),
                        outline=G.hx(accent)[:3], width=4)
    # イラストをパネル内に収めて配置
    pad = 28
    box_w = (panel[2] - panel[0]) - pad * 2
    box_h = (panel[3] - panel[1]) - pad * 2
    sp = illu.convert("RGBA")
    sw, sh = sp.size
    scale = min(box_w / sw, box_h / sh)
    sp = sp.resize((max(1, round(sw * scale)), max(1, round(sh * scale))),
                   Image.LANCZOS)
    px = panel[0] + pad + (box_w - sp.width) // 2
    py = panel[1] + pad + (box_h - sp.height) // 2
    img.paste(sp, (px, py), sp)

    def fit(path, text, max_w, start):
        size = start
        while size > 24:
            fnt = G.load_font(path, size)
            if d.textlength(text, font=fnt) <= max_w:
                return fnt
            size -= 4
        return G.load_font(path, 24)

    tx, max_w = 580, 1200 - 580 - 40
    f_big = fit(G.LATIN_FONT, big_text, max_w, 150)
    f_arche = fit(G.JP_FONT, arche, max_w, 76)
    f_brand = G.load_font(G.JP_FONT, 34)
    f_tag = G.load_font(G.JP_FONT, 30)
    d.text((tx, 130), big_text, font=f_big, fill=G.hx(accent)[:3])
    aw = d.textlength(arche, font=f_arche)
    d.rectangle([tx + 4, 296, tx + 4 + aw, 302], fill=G.hx(accent)[:3])
    d.text((tx + 4, 312), arche, font=f_arche, fill=(255, 255, 255))
    d.text((tx + 4, 470), group, font=f_tag, fill=(200, 205, 225))
    d.text((tx + 4, 520), "GameSpec Lab", font=f_brand, fill=G.hx(accent)[:3])
    img.save(os.path.join(OUT, f"{r['slug']}-ogp.png"))


def update_html(code, hero):
    path = os.path.join(ROOT, f"gamer-mbti-{code}.html")
    if not os.path.exists(path):
        print("  (no html)", code)
        return
    s = open(path, encoding="utf-8").read()
    orig = s
    # 表示モードを is-illustration に(冪等)
    s = re.sub(r'class="type-hero-art(?! is-illustration)"',
               'class="type-hero-art is-illustration"', s)
    # alt の「ドット絵キャラクター」→「イラスト」
    s = s.replace("のドット絵キャラクター", "のイラスト")
    # width/height を実寸比に更新
    s = re.sub(
        r'(class="type-hero-art is-illustration" src="assets/types/'
        + re.escape(code) + r'\.png" )width="\d+" height="\d+"',
        rf'\g<1>width="{hero.width}" height="{hero.height}"', s)
    if s != orig:
        open(path, "w", encoding="utf-8").write(s)
        print("  html updated", code)


def main():
    if not os.path.isdir(SRC):
        print("置き場所がありません。先に作成してください:", SRC)
        print("  例: assets/types/src/intj.png ...")
        return
    n = 0
    for code in [d[0] for d in G._MBTI_DEF]:
        sp = os.path.join(SRC, f"{code}.png")
        if not os.path.exists(sp):
            continue
        r = MBTI[code]
        illu = Image.open(sp)
        hero = normalize_hero(illu)
        hero.save(os.path.join(OUT, f"{code}.png"))
        build_ogp(r, hero)
        update_html(code, hero)
        print("imported", code, hero.size)
        n += 1
    if n == 0:
        print("src にイラストが見つかりません:", SRC)
    else:
        print(f"done: {n} types。 style.css の ?v= を1つ上げてコミットしてください。")


if __name__ == "__main__":
    main()
