#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""デバイスガイド6ページのドット絵OGPカード(1200x630)を生成.

  python3 tools/build_device_ogp.py
出力: assets/og/<slug>.png
"""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "og")
JP_FONT = "/etc/alternatives/fonts-japanese-gothic.ttf"
LATIN_FONT = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"

GW, GH = 64, 48          # 論理キャンバス(ドット)
OUTLINE = (18, 14, 30, 255)


def hx(s):
    s = s.lstrip("#")
    return (int(s[0:2], 16), int(s[2:4], 16), int(s[4:6], 16), 255)


def shade(c, f):
    return tuple(max(0, min(255, int(c[i] * f))) for i in range(3)) + (255,)


class Cv:
    def __init__(self):
        self.img = Image.new("RGBA", (GW, GH), (0, 0, 0, 0))
        self.px = self.img.load()

    def r(self, x, y, w, h, c):
        for yy in range(int(y), int(y + h)):
            for xx in range(int(x), int(x + w)):
                if 0 <= xx < GW and 0 <= yy < GH:
                    self.px[xx, yy] = c


def add_outline(cv, color=OUTLINE):
    src = cv.img.copy().load()
    for y in range(GH):
        for x in range(GW):
            if src[x, y][3] != 0:
                continue
            for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nx, ny = x + dx, y + dy
                if 0 <= nx < GW and 0 <= ny < GH and src[nx, ny][3] != 0:
                    cv.px[x, y] = color
                    break


# ---- 各デバイスのドット絵 --------------------------------------------------
def d_monitor(cv, a):
    dark = shade(a, 0.5)
    scr = shade(a, 1.15)
    cv.r(10, 8, 44, 26, dark)        # 筐体
    cv.r(13, 11, 38, 20, scr)        # 画面
    cv.r(13, 11, 38, 4, shade(a, 1.4))  # 画面の光沢
    cv.r(30, 34, 4, 5, dark)         # 支柱
    cv.r(22, 39, 20, 3, shade(a, 0.7))  # 台座


def d_mouse(cv, a):
    body = a
    cv.r(24, 8, 16, 32, body)        # 本体(上面)
    cv.r(26, 6, 12, 6, body)         # 先端丸み
    cv.r(31, 9, 2, 8, shade(a, 0.6))  # 中央線
    cv.r(30, 11, 4, 4, shade(a, 1.3))  # ホイール
    cv.r(24, 22, 16, 18, shade(a, 0.85))  # 後部の陰


def d_keyboard(cv, a):
    base = shade(a, 0.55)
    cv.r(6, 14, 52, 22, base)
    key = shade(a, 1.15)
    for ry in range(4):
        for rx in range(11):
            cv.r(9 + rx * 4, 17 + ry * 4, 3, 3, key)
    cv.r(20, 33, 24, 3, shade(a, 1.0))  # スペースキー風


def d_headset(cv, a):
    band = shade(a, 0.7)
    # ヘッドバンド(アーチ)
    cv.r(18, 8, 28, 4, band)
    cv.r(14, 11, 4, 8, band)
    cv.r(46, 11, 4, 8, band)
    cup = a
    cv.r(10, 17, 12, 18, cup)        # 左イヤーカップ
    cv.r(42, 17, 12, 18, cup)        # 右
    cv.r(13, 20, 6, 12, shade(a, 1.3))
    cv.r(45, 20, 6, 12, shade(a, 1.3))
    cv.r(12, 34, 3, 8, band)         # マイクブーム
    cv.r(11, 41, 6, 3, shade(a, 1.4))


def d_mousepad(cv, a):
    pad = shade(a, 0.6)
    cv.r(6, 14, 52, 24, pad)         # パッド
    cv.r(6, 14, 52, 3, shade(a, 0.8))
    # 上に小さいマウス
    cv.r(40, 19, 9, 15, a)
    cv.r(43, 21, 3, 4, shade(a, 1.3))


def d_controller(cv, a):
    body = a
    cv.r(14, 16, 36, 14, body)       # 中央
    cv.r(8, 20, 12, 16, body)        # 左グリップ
    cv.r(44, 20, 12, 16, body)       # 右グリップ
    cv.r(12, 30, 8, 8, body)
    cv.r(44, 30, 8, 8, body)
    dark = shade(a, 0.5)
    cv.r(17, 22, 6, 6, dark)         # 左スティック
    cv.r(41, 22, 6, 6, dark)         # 右スティック
    cv.r(18, 23, 4, 4, shade(a, 1.3))
    cv.r(42, 23, 4, 4, shade(a, 1.3))
    cv.r(27, 19, 3, 3, dark)         # 十字/ボタン
    cv.r(34, 19, 3, 3, dark)


DEVICES = [
    ("gaming-monitor-guide", "MONITOR", "ゲーミングモニター", "#5fd0e0", d_monitor),
    ("gaming-mouse-guide", "MOUSE", "ゲーミングマウス", "#ff7fae", d_mouse),
    ("gaming-keyboard-guide", "KEYBOARD", "ゲーミングキーボード", "#9d8be0", d_keyboard),
    ("gaming-headset-guide", "HEADSET", "ゲーミングヘッドセット", "#7fe0c4", d_headset),
    ("gaming-mousepad-guide", "MOUSEPAD", "ゲーミングマウスパッド", "#e0b94a", d_mousepad),
    ("gaming-controller-guide", "CONTROLLER", "ゲームコントローラー", "#6fd08a", d_controller),
]


def font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()


def fit(d, path, text, max_w, start):
    size = start
    while size > 28:
        f = font(path, size)
        if d.textlength(text, font=f) <= max_w:
            return f
        size -= 4
    return font(path, 28)


def build(slug, en, jp, accent, drawfn):
    Wd, Hd = 1200, 630
    base = (10, 11, 24)
    ac = hx(accent)
    img = Image.new("RGB", (Wd, Hd), base)
    d = ImageDraw.Draw(img)
    for y in range(Hd):
        f = y / Hd
        img.paste(tuple(int(base[i] + (ac[i] * 0.32 - base[i]) * f) for i in range(3)),
                  (0, y, Wd, y + 1))
    for gy in range(0, Hd, 40):
        for gx in range(0, Wd, 40):
            d.point((gx, gy), fill=(255, 255, 255))
    # 左パネル
    d.rounded_rectangle([60, 90, 520, 540], radius=28, fill=(0, 0, 0),
                        outline=ac[:3], width=4)
    # ドット絵
    cv = Cv()
    drawfn(cv, ac)
    add_outline(cv)
    sc = 7
    art = cv.img.resize((GW * sc, GH * sc), Image.NEAREST)
    img.paste(art, (int(290 - art.width / 2), int(315 - art.height / 2)), art)

    tx = 580
    f_en = fit(d, LATIN_FONT, en, Wd - tx - 40, 120)
    f_jp = fit(d, JP_FONT, jp, Wd - tx - 40, 56)
    d.text((tx, 150), en, font=f_en, fill=ac[:3])
    jw = d.textlength(jp, font=f_jp)
    d.rectangle([tx + 4, 286, tx + 4 + jw, 292], fill=ac[:3])
    d.text((tx + 4, 302), jp, font=f_jp, fill=(255, 255, 255))
    d.text((tx + 4, 452), "ゲーミングデバイスガイド", font=font(JP_FONT, 30), fill=(200, 205, 225))
    d.text((tx + 4, 500), "GameSpec Lab", font=font(JP_FONT, 34), fill=ac[:3])

    os.makedirs(OUT, exist_ok=True)
    img.save(os.path.join(OUT, f"{slug}.png"))


def main():
    os.makedirs(OUT, exist_ok=True)
    cols = 2
    cell_w, cell_h = 300, 158
    sheet = Image.new("RGB", (cols * cell_w, ((len(DEVICES) + 1) // cols) * cell_h),
                      (20, 22, 40))
    for i, (slug, en, jp, accent, fn) in enumerate(DEVICES):
        build(slug, en, jp, accent, fn)
        thumb = Image.open(os.path.join(OUT, f"{slug}.png")).resize((cell_w, cell_h))
        sheet.paste(thumb, ((i % cols) * cell_w, (i // cols) * cell_h))
        print("og:", slug)
    sheet.save(os.path.join(OUT, "_contact.png"))


if __name__ == "__main__":
    main()
