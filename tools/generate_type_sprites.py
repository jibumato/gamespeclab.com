#!/usr/bin/env python3
"""GameSpec Lab - ゲーマーMBTI 16タイプのドット絵キャラクター生成ツール.

各タイプのアーキタイプ(軍師/剣豪/吟遊詩人...)に合わせたチビキャラの
ドット絵スプライトと、SNSシェア用のOGPカード(1200x630)を生成する。

  python3 tools/generate_type_sprites.py

出力先:
  assets/types/<code>.png       透過スプライト(インライン表示用)
  assets/types/<code>-ogp.png   1200x630 のシェアカード
"""
from __future__ import annotations

import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "types")

# --- 論理キャンバス(ドット単位) -------------------------------------------
W, H = 40, 44
OUTLINE = (24, 18, 40, 255)

JP_FONT = "/etc/alternatives/fonts-japanese-gothic.ttf"
LATIN_FONT = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"


def hx(s: str) -> tuple:
    s = s.lstrip("#")
    return (int(s[0:2], 16), int(s[2:4], 16), int(s[4:6], 16), 255)


def shade(c, f):
    return (max(0, min(255, int(c[0] * f))),
            max(0, min(255, int(c[1] * f))),
            max(0, min(255, int(c[2] * f))), 255)


class Canvas:
    def __init__(self):
        self.img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        self.px = self.img.load()

    def p(self, x, y, c):
        if 0 <= x < W and 0 <= y < H and c is not None:
            self.px[int(x), int(y)] = c

    def rect(self, x, y, w, h, c):
        for yy in range(int(y), int(y + h)):
            for xx in range(int(x), int(x + w)):
                self.p(xx, yy, c)

    def hline(self, x, y, w, c):
        self.rect(x, y, w, 1, c)

    def vline(self, x, y, h, c):
        self.rect(x, y, 1, h, c)


def add_outline(cv: Canvas, color=OUTLINE):
    src = cv.img.copy().load()
    for y in range(H):
        for x in range(W):
            if src[x, y][3] != 0:
                continue
            edge = False
            for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nx, ny = x + dx, y + dy
                if 0 <= nx < W and 0 <= ny < H and src[nx, ny][3] != 0:
                    edge = True
                    break
            if edge:
                cv.px[x, y] = color


# --- 体のベース -------------------------------------------------------------
CX = 20  # 中心x


def draw_body(cv, pal):
    skin = pal["skin"]
    skin_s = shade(skin, 0.85)
    outfit = pal["outfit"]
    outfit_s = shade(outfit, 0.78)
    pants = shade(outfit, 0.55)
    hair = pal["hair"]
    hair_s = shade(hair, 0.8)
    accent = pal["accent"]

    # --- 脚 ---
    cv.rect(15, 33, 4, 6, pants)
    cv.rect(21, 33, 4, 6, pants)
    cv.rect(14, 39, 5, 2, shade(pants, 0.7))  # 靴
    cv.rect(21, 39, 5, 2, shade(pants, 0.7))

    # --- 胴体(マント風に裾広がり) ---
    cv.rect(13, 22, 14, 11, outfit)
    cv.rect(12, 30, 16, 3, outfit_s)   # 裾
    # 胸元アクセント
    cv.rect(19, 22, 2, 9, accent)

    # --- 腕 ---
    cv.rect(10, 23, 3, 7, outfit_s)    # 左腕
    cv.rect(27, 23, 3, 7, outfit_s)    # 右腕
    cv.rect(10, 29, 3, 2, skin)        # 左手
    cv.rect(27, 29, 3, 2, skin)        # 右手

    # --- 頭 ---
    cv.rect(13, 9, 14, 12, skin)
    # 角を丸める
    for cx, cy in ((13, 9), (25, 9), (13, 19), (25, 19)):
        cv.rect(cx, cy, 2, 1, (0, 0, 0, 0))
        cv.rect(cx if cx < 20 else cx + 1, cy + 1, 1, 1, (0, 0, 0, 0))
    cv.rect(13, 18, 14, 3, skin_s)     # あごの影

    # --- 髪(前髪+サイド) ---
    cv.rect(12, 7, 16, 5, hair)
    cv.rect(12, 11, 2, 6, hair_s)      # もみあげ左
    cv.rect(26, 11, 2, 6, hair_s)      # もみあげ右
    cv.rect(13, 11, 4, 2, hair)        # 前髪左
    cv.rect(23, 11, 4, 2, hair)        # 前髪右
    cv.rect(11, 6, 18, 2, hair_s)      # 髪トップ

    # --- 顔 ---
    eye = (30, 28, 45, 255)
    cv.rect(16, 14, 2, 3, eye)
    cv.rect(22, 14, 2, 3, eye)
    cv.p(16, 14, (255, 255, 255, 255))
    cv.p(22, 14, (255, 255, 255, 255))
    cv.rect(14, 17, 1, 1, hx("#ff9b9b"))       # ほお
    cv.rect(25, 17, 1, 1, hx("#ff9b9b"))
    cv.rect(19, 18, 2, 1, shade(skin, 0.7))    # 口


# --- 頭装備 -----------------------------------------------------------------
def hg_hood(cv, pal):
    c = shade(pal["outfit"], 0.9)
    cv.rect(11, 5, 18, 5, c)
    cv.rect(10, 8, 3, 10, c)
    cv.rect(27, 8, 3, 10, c)
    cv.rect(12, 4, 16, 2, shade(c, 1.15))


def hg_glasses(cv, pal):
    g = (40, 40, 55, 255)
    cv.rect(15, 14, 4, 3, g)
    cv.rect(21, 14, 4, 3, g)
    cv.rect(19, 15, 2, 1, g)
    cv.rect(16, 15, 2, 1, (200, 220, 255, 255))


def hg_crown(cv, pal):
    g = pal["accent"]
    cv.rect(13, 4, 14, 3, g)
    for x in (13, 17, 21, 25):
        cv.rect(x, 2, 2, 2, g)
    cv.rect(18, 5, 2, 1, hx("#e0405a"))


def hg_spiky(cv, pal):
    h = pal["hair"]
    for x in (12, 16, 20, 24, 27):
        cv.rect(x, 2, 2, 5, h)
    cv.rect(11, 6, 18, 2, shade(h, 0.85))


def hg_wizard(cv, pal):
    c = shade(pal["outfit"], 1.0)
    # とんがり帽子
    cv.rect(18, 0, 4, 2, c)
    cv.rect(16, 2, 8, 2, c)
    cv.rect(14, 4, 12, 2, c)
    cv.rect(12, 6, 16, 2, shade(c, 0.85))
    cv.rect(19, 1, 2, 1, pal["accent"])  # 星


def hg_travelhood(cv, pal):
    c = shade(pal["outfit"], 0.85)
    cv.rect(11, 6, 18, 3, c)
    cv.rect(10, 8, 4, 8, c)
    cv.rect(26, 8, 4, 8, c)


def hg_plume(cv, pal):
    cv.rect(11, 6, 18, 2, shade(pal["hair"], 0.85))
    cv.rect(26, 1, 3, 6, pal["accent"])  # 羽飾り


def hg_feather(cv, pal):
    c = shade(pal["outfit"], 0.95)
    cv.rect(11, 6, 18, 3, c)
    cv.rect(11, 5, 8, 2, shade(c, 1.1))
    cv.rect(25, 2, 5, 4, pal["accent"])  # 羽


def hg_cap(cv, pal):
    c = shade(pal["outfit"], 0.9)
    cv.rect(12, 5, 16, 3, c)
    cv.rect(24, 7, 6, 2, shade(c, 1.1))  # つば


def hg_helmet(cv, pal):
    c = pal["accent"]
    cv.rect(11, 4, 18, 5, c)
    cv.rect(10, 8, 3, 9, c)
    cv.rect(27, 8, 3, 9, c)
    cv.rect(13, 11, 14, 1, shade(c, 0.7))  # バイザー線
    cv.rect(18, 2, 4, 3, hx("#e0405a"))    # トサカ


def hg_officer(cv, pal):
    c = shade(pal["outfit"], 0.85)
    cv.rect(11, 4, 18, 4, c)
    cv.rect(24, 6, 6, 2, shade(c, 1.1))
    cv.rect(17, 4, 6, 2, pal["accent"])    # 帽章


def hg_tiara(cv, pal):
    cv.rect(11, 6, 18, 2, shade(pal["hair"], 0.85))
    cv.rect(14, 4, 12, 2, pal["accent"])
    cv.rect(19, 3, 2, 2, hx("#ff7fae"))


def hg_headband(cv, pal):
    cv.rect(11, 6, 18, 2, shade(pal["hair"], 0.85))
    cv.rect(11, 8, 18, 2, pal["accent"])
    cv.rect(8, 8, 3, 2, pal["accent"])     # たれ
    cv.rect(7, 10, 2, 4, pal["accent"])


def hg_beret(cv, pal):
    c = pal["accent"]
    cv.rect(12, 4, 16, 4, c)
    cv.rect(12, 7, 16, 1, shade(c, 0.8))
    cv.p(26, 3, c)


def hg_goggles(cv, pal):
    g = (45, 45, 60, 255)
    cv.rect(11, 6, 18, 2, shade(pal["hair"], 0.85))
    cv.rect(14, 12, 5, 4, g)
    cv.rect(21, 12, 5, 4, g)
    cv.rect(15, 13, 3, 2, pal["accent"])
    cv.rect(22, 13, 3, 2, pal["accent"])


def hg_party(cv, pal):
    cv.rect(11, 6, 18, 2, shade(pal["hair"], 0.85))
    cv.rect(18, 1, 4, 2, pal["accent"])
    cv.rect(16, 3, 8, 2, hx("#ff7fae"))
    cv.rect(14, 5, 12, 2, pal["accent"])
    cv.rect(19, 0, 2, 1, hx("#ffe07a"))    # 星


# --- 持ち物(右手側 col27-34付近) -------------------------------------------
def wp_scroll(cv, pal):
    p = hx("#efe3c0")
    cv.rect(29, 24, 5, 8, p)
    cv.rect(29, 24, 5, 1, hx("#c9a24a"))
    cv.rect(29, 31, 5, 1, hx("#c9a24a"))
    cv.rect(31, 26, 1, 4, hx("#9a6b3a"))


def wp_book(cv, pal):
    cv.rect(28, 25, 6, 7, pal["accent"])
    cv.rect(29, 26, 4, 5, hx("#f4efe2"))
    cv.rect(30, 26, 1, 5, hx("#c9b27a"))


def wp_scepter(cv, pal):
    cv.rect(31, 22, 2, 12, hx("#caa64a"))
    cv.rect(30, 20, 4, 3, hx("#ffe07a"))
    cv.p(31, 21, hx("#e0405a"))


def wp_spark(cv, pal):
    g = hx("#ffe07a")
    cv.rect(30, 24, 2, 2, g)
    cv.rect(32, 22, 2, 2, g)
    cv.rect(28, 22, 2, 2, g)
    cv.rect(31, 26, 2, 2, hx("#ff9b3a"))
    cv.rect(29, 27, 2, 2, g)


def wp_stafforb(cv, pal):
    cv.rect(31, 23, 2, 11, hx("#7a5a3a"))
    cv.rect(30, 20, 4, 4, pal["accent"])
    cv.p(31, 21, hx("#ffffff"))


def wp_lantern(cv, pal):
    cv.rect(30, 26, 1, 4, hx("#9a6b3a"))   # 取っ手
    cv.rect(29, 29, 4, 6, hx("#6b5126"))
    cv.rect(30, 30, 2, 4, hx("#ffe07a"))   # 灯


def wp_banner(cv, pal):
    cv.rect(31, 18, 2, 18, hx("#8a6b3a"))
    cv.rect(33, 18, 5, 8, pal["accent"])
    cv.rect(34, 20, 3, 1, hx("#ffffff"))
    cv.rect(34, 22, 3, 1, hx("#ffffff"))


def wp_map(cv, pal):
    p = hx("#efe3c0")
    cv.rect(28, 25, 7, 6, p)
    cv.rect(28, 25, 7, 1, hx("#c9a24a"))
    cv.p(30, 27, hx("#c0392b"))            # ×印
    cv.p(32, 28, hx("#2e7d32"))


def wp_ledger(cv, pal):
    cv.rect(28, 26, 6, 6, shade(pal["outfit"], 0.7))
    cv.rect(29, 27, 4, 1, hx("#f4efe2"))
    cv.rect(29, 29, 4, 1, hx("#f4efe2"))


def wp_shield(cv, pal):
    c = pal["accent"]
    cv.rect(28, 23, 7, 9, c)
    cv.rect(28, 31, 7, 2, shade(c, 0.7))
    cv.rect(29, 24, 5, 7, shade(c, 1.15))
    cv.rect(31, 25, 1, 5, hx("#c0392b"))   # 紋章
    cv.rect(29, 27, 5, 1, hx("#c0392b"))


def wp_sword(cv, pal):
    cv.rect(31, 18, 2, 14, hx("#d8dde8"))  # 刃
    cv.rect(31, 16, 2, 2, hx("#eef2f8"))
    cv.rect(29, 31, 6, 2, hx("#caa64a"))   # つば
    cv.rect(31, 33, 2, 3, hx("#8a6b3a"))   # 柄


def wp_fan(cv, pal):
    c = pal["accent"]
    cv.rect(29, 22, 7, 2, c)
    cv.rect(28, 24, 9, 2, shade(c, 1.1))
    cv.rect(27, 26, 11, 1, c)
    cv.rect(32, 27, 1, 3, hx("#8a6b3a"))


def wp_katana(cv, pal):
    cv.rect(31, 16, 2, 17, hx("#cfd6e2"))
    cv.rect(31, 15, 2, 1, hx("#eef2f8"))
    cv.rect(30, 32, 4, 1, hx("#2a2a33"))   # つば
    cv.rect(31, 33, 2, 3, hx("#7a2a2a"))   # 柄


def wp_lute(cv, pal):
    body = hx("#9a6b3a")
    cv.rect(28, 26, 7, 7, body)
    cv.rect(29, 27, 5, 5, shade(body, 1.2))
    cv.rect(31, 28, 1, 3, hx("#3a2a18"))   # サウンドホール
    cv.rect(33, 20, 2, 8, body)            # ネック
    cv.rect(33, 19, 2, 1, hx("#caa64a"))


def wp_torch(cv, pal):
    cv.rect(31, 26, 2, 9, hx("#7a5a3a"))
    cv.rect(30, 22, 4, 4, hx("#ff9b3a"))
    cv.rect(31, 20, 2, 3, hx("#ffe07a"))


def wp_mic(cv, pal):
    cv.rect(31, 28, 2, 7, hx("#3a3a44"))
    cv.rect(29, 24, 5, 5, hx("#c8ccd6"))
    cv.rect(30, 25, 3, 3, hx("#8a8f9c"))


HEADGEAR = {
    "hood": hg_hood, "glasses": hg_glasses, "crown": hg_crown, "spiky": hg_spiky,
    "wizard": hg_wizard, "travelhood": hg_travelhood, "plume": hg_plume,
    "feather": hg_feather, "cap": hg_cap, "helmet": hg_helmet, "officer": hg_officer,
    "tiara": hg_tiara, "headband": hg_headband, "beret": hg_beret,
    "goggles": hg_goggles, "party": hg_party,
}
WEAPON = {
    "scroll": wp_scroll, "book": wp_book, "scepter": wp_scepter, "spark": wp_spark,
    "stafforb": wp_stafforb, "lantern": wp_lantern, "banner": wp_banner, "map": wp_map,
    "ledger": wp_ledger, "shield": wp_shield, "sword": wp_sword, "fan": wp_fan,
    "katana": wp_katana, "lute": wp_lute, "torch": wp_torch, "mic": wp_mic,
}

SKIN = "#f0c8a0"

# code, archetype, group-jp, palette, headgear, weapon
TYPES = [
    ("intj", "冷静沈着の軍師型",   "#3b2f6b", "#2a2440", "#9d8be0", "hood",       "scroll"),
    ("intp", "孤高の研究者型",     "#4a3b7a", "#6b5a3a", "#a594e6", "glasses",    "book"),
    ("entj", "覇道コマンダー型",   "#5b3a7a", "#1f1a30", "#e0b94a", "crown",      "scepter"),
    ("entp", "メタ破壊の革命家型", "#7a3a78", "#c4502a", "#ffd24a", "spiky",      "spark"),
    ("infj", "静かな預言者型",     "#2f5b56", "#2a2438", "#7fd9c4", "wizard",     "stafforb"),
    ("infp", "夢見る巡礼者型",     "#3a6b5a", "#a86b3a", "#a7e8c4", "travelhood", "lantern"),
    ("enfj", "鼓舞する旗手型",     "#2f6b4a", "#4a3320", "#ffd24a", "plume",      "banner"),
    ("enfp", "ひらめき冒険家型",   "#3a8a52", "#d98a2a", "#ffe07a", "feather",    "map"),
    ("istj", "鉄壁の記録官型",     "#2f3b6b", "#36363f", "#8ba3d8", "cap",        "ledger"),
    ("isfj", "誓約の守護騎士型",   "#3a4f8b", "#6b4a2a", "#c7cedd", "helmet",     "shield"),
    ("estj", "規律の実戦指揮官型", "#2f4f8b", "#26262e", "#e0b94a", "officer",    "sword"),
    ("esfj", "陽だまりの宮廷官型", "#4a6bb0", "#d6b24a", "#ff9bc0", "tiara",      "fan"),
    ("istp", "無言の剣豪型",       "#6b3a2a", "#26262e", "#cfd6e2", "headband",   "katana"),
    ("isfp", "自由なる吟遊詩人型", "#8b5a2a", "#7a3a6b", "#e0a050", "beret",      "lute"),
    ("estp", "電撃アサルト型",     "#8b3a2a", "#26262e", "#ffd24a", "goggles",    "spark"),
    ("esfp", "祝祭の先陣役型",     "#c44a6b", "#d9a52a", "#ffe07a", "party",      "torch"),
]


def build_sprite(t):
    code, _, outfit, hair, accent, hg, wp = t
    pal = {"skin": hx(SKIN), "outfit": hx(outfit), "hair": hx(hair), "accent": hx(accent)}
    cv = Canvas()
    WEAPON[wp](cv, pal)         # 武器は背面寄りに先描き
    draw_body(cv, pal)
    HEADGEAR[hg](cv, pal)
    add_outline(cv)
    return cv.img


def save_sprite(t, scale=12):
    img = build_sprite(t)
    big = img.resize((W * scale, H * scale), Image.NEAREST)
    path = os.path.join(OUT, f"{t[0]}.png")
    big.save(path)
    return big


def load_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()


def build_ogp(t, sprite_big):
    code, arche, outfit, hair, accent = t[0], t[1], t[2], t[3], t[4]
    Wd, Hd = 1200, 630
    base = (10, 11, 24)
    img = Image.new("RGB", (Wd, Hd), base)
    d = ImageDraw.Draw(img)
    # 背景グラデ(テーマカラー寄せ)
    oc = hx(outfit)
    for y in range(Hd):
        f = y / Hd
        r = int(base[0] + (oc[0] * 0.35 - base[0]) * f)
        g = int(base[1] + (oc[1] * 0.35 - base[1]) * f)
        b = int(base[2] + (oc[2] * 0.35 - base[2]) * f)
        d.line([(0, y), (Wd, y)], fill=(r, g, b))
    # ドット格子の装飾
    for gy in range(0, Hd, 40):
        for gx in range(0, Wd, 40):
            d.point((gx, gy), fill=(255, 255, 255))
    # 左の額縁パネル
    d.rounded_rectangle([60, 70, 520, 560], radius=28, fill=(0, 0, 0),
                        outline=hx(accent)[:3], width=4)
    # キャラ配置(透過スプライトを拡大)
    sp = sprite_big.resize((W * 10, H * 10), Image.NEAREST)
    img.paste(sp, (int(60 + (460 - sp.width) / 2), int(560 - sp.height - 24)), sp)

    # テキスト
    f_code = load_font(LATIN_FONT, 150)
    f_arche = load_font(JP_FONT, 70)
    f_brand = load_font(JP_FONT, 34)
    f_tag = load_font(JP_FONT, 30)
    tx = 580
    d.text((tx, 120), code.upper(), font=f_code, fill=hx(accent)[:3])
    d.text((tx + 4, 300), arche, font=f_arche, fill=(255, 255, 255))
    # アクセント下線
    d.rectangle([tx + 4, 290, tx + 4 + 360, 296], fill=hx(accent)[:3])
    d.text((tx + 4, 470), "ゲーマーMBTI 16タイプ", font=f_tag, fill=(200, 205, 225))
    d.text((tx + 4, 520), "GameSpec Lab", font=f_brand, fill=hx(accent)[:3])

    path = os.path.join(OUT, f"{code}-ogp.png")
    img.save(path)
    return img


def main():
    os.makedirs(OUT, exist_ok=True)
    for t in TYPES:
        big = save_sprite(t)
        build_ogp(t, big)
        print("generated", t[0])
    # コンタクトシート(確認用、コミットしない)
    cols = 8
    cell = W * 6
    rows = (len(TYPES) + cols - 1) // cols
    sheet = Image.new("RGBA", (cols * cell, rows * (cell + 18)), (20, 22, 40, 255))
    for i, t in enumerate(TYPES):
        s = build_sprite(t).resize((cell, H * 6), Image.NEAREST)
        sheet.paste(s, ((i % cols) * cell, (i // cols) * (cell + 18)), s)
    sheet.save(os.path.join(OUT, "_contact_sheet.png"))


if __name__ == "__main__":
    main()
