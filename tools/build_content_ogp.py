#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""主要コンテンツページ用のOGPカード(1200x630)を生成.

  python3 tools/build_content_ogp.py
出力: assets/og/<slug>.png
"""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "og")
JP_FONT = "/etc/alternatives/fonts-japanese-gothic.ttf"
LATIN_FONT = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"

# slug, eyebrow(EN), title(JP), accent
PAGES = [
    ("game-improve-guide", "GAME IMPROVE", "ゲームが上手くなる方法", "#72f2ff"),
    ("fps-sensitivity-guide", "FPS SENSITIVITY", "FPS感度の決め方", "#ff7fae"),
    ("game-focus-guide", "FOCUS", "ゲームの集中力を高める方法", "#a7e8b0"),
    ("gaming-gear-guide", "GAMING GEAR", "ゲーミングデバイスの選び方", "#e0b94a"),
    ("mouse-grip-guide", "MOUSE GRIP", "ゲーミングマウスの持ち方", "#9d8be0"),
    ("game-terms-glossary", "GLOSSARY", "ゲーム・FPS用語集", "#7fd9c4"),
]


def hx(s):
    s = s.lstrip("#")
    return (int(s[0:2], 16), int(s[2:4], 16), int(s[4:6], 16))


def font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()


def wrap(d, text, fnt, max_w):
    lines, cur = [], ""
    for ch in text:
        if d.textlength(cur + ch, font=fnt) <= max_w:
            cur += ch
        else:
            lines.append(cur)
            cur = ch
    if cur:
        lines.append(cur)
    return lines


def build(slug, eyebrow, title, accent):
    Wd, Hd = 1200, 630
    base = (10, 11, 24)
    ac = hx(accent)
    img = Image.new("RGB", (Wd, Hd), base)
    d = ImageDraw.Draw(img)
    # 背景グラデ
    for y in range(Hd):
        f = y / Hd
        img.paste(tuple(int(base[i] + (ac[i] * 0.30 - base[i]) * f) for i in range(3)),
                  (0, y, Wd, y + 1))
    # ドット格子
    for gy in range(0, Hd, 40):
        for gx in range(0, Wd, 40):
            d.point((gx, gy), fill=(255, 255, 255))
    # 左の発光バー
    d.rectangle([80, 150, 92, 480], fill=ac)
    mx = 120
    # eyebrow
    f_eye = font(LATIN_FONT, 34)
    d.text((mx, 150), eyebrow, font=f_eye, fill=ac)
    # タイトル(自動縮小+折り返し)
    size = 92
    while size >= 56:
        f_title = font(JP_FONT, size)
        lines = wrap(d, title, f_title, Wd - mx - 90)
        if len(lines) <= 2:
            break
        size -= 6
    y = 210
    for ln in lines:
        d.text((mx, y), ln, font=f_title, fill=(245, 249, 255))
        y += size + 12
    # ブランド
    d.text((mx, 520), "GameSpec Lab", font=font(JP_FONT, 36), fill=ac)
    d.text((mx + 270, 530), "gamespeclab.com", font=font(LATIN_FONT, 24),
           fill=(170, 178, 200))
    os.makedirs(OUT, exist_ok=True)
    img.save(os.path.join(OUT, f"{slug}.png"))


def main():
    for slug, eb, jp, ac in PAGES:
        build(slug, eb, jp, ac)
        print("og:", slug)


if __name__ == "__main__":
    main()
