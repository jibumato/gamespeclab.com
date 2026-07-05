#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""主要コンテンツページ用のOGPカード(1200x630)を生成.

  python3 tools/build_content_ogp.py
出力: assets/og/<slug>.png
"""
import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageChops

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "og")
JP_FONT = "/etc/alternatives/fonts-japanese-gothic.ttf"
LATIN_FONT = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"

CYAN = (114, 242, 255)
PINK = (255, 77, 210)

# slug, eyebrow(EN), title(JP), accent
PAGES = [
    ("game-improve-guide", "GAME IMPROVE", "ゲームが上手くなる方法", "#72f2ff"),
    ("fps-sensitivity-guide", "FPS SENSITIVITY", "FPS感度の決め方", "#ff7fae"),
    ("game-focus-guide", "FOCUS", "ゲームの集中力を高める方法", "#a7e8b0"),
    ("gaming-gear-guide", "GAMING GEAR", "ゲーミングデバイスの選び方", "#e0b94a"),
    ("mouse-grip-guide", "MOUSE GRIP", "ゲーミングマウスの持ち方", "#9d8be0"),
    ("game-terms-glossary", "GLOSSARY", "ゲーム・FPS用語集", "#7fd9c4"),
    ("fps-improve-guide", "FPS IMPROVE", "FPSが上手くなる方法", "#72f2ff"),
    ("aim-training-guide", "AIM TRAINING", "エイム力を上げる練習方法", "#ff7fae"),
    ("reaction-speed-guide", "REACTION", "反応速度を上げるには", "#ffd24a"),
    ("cant-win-games-guide", "WHY YOU LOSE", "ゲームで勝てない原因と対処", "#ffd24a"),
    ("game-skill-traits", "SKILL TRAITS", "ゲームが上手い人の特徴", "#72f2ff"),
    ("game-sense-guide", "GAME SENSE", "ゲームセンスとは？", "#9d8be0"),
    ("fps-sense-type", "FPS SENSE", "FPSに向いている人の特徴", "#72f2ff"),
    ("moba-role-type", "MOBA ROLE", "MOBAに向いている人の特徴", "#7fd9c4"),
    ("valorant-improve-guide", "VALORANT", "VALORANT上達のコツ", "#ff6b78"),
    ("apex-improve-guide", "APEX", "Apexの立ち回り・上達", "#ff8a5b"),
    ("game-sickness-guide", "MOTION SICKNESS", "ゲーム酔いの対策", "#a7e8b0"),
    ("voice-chat-tips", "VOICE CHAT", "VCが苦手を克服するコツ", "#7fd9c4"),
    ("steam-game-type-guide", "STEAM PICK", "Steamゲームの選び方", "#7fe0c4"),
    ("gamer-mbti-compatibility", "MBTI MATCH", "ゲーマーMBTI相性の見方", "#9d8be0"),
    ("coop-game-compatibility", "CO-OP", "協力ゲームで相性がいい人", "#7fe0c4"),
    ("gamer-couple-compatibility", "COUPLE", "ゲーム好きカップルの相性", "#ff9bc0"),
    ("gamer-partner-tips", "PARTNER", "ゲーマー彼氏・彼女と楽しむコツ", "#ff9bc0"),
    ("online-game-romance", "ONLINE ROMANCE", "オンラインゲームの恋愛", "#ff9bc0"),
    ("index", "GAMESPEC LAB", "無料ゲームセンス診断とゲーマーMBTI", "#72f2ff"),
    ("gamesense", "GAMESENSE SCAN 8", "無料ゲームセンス診断", "#72f2ff"),
    ("gamermbti", "GAMER MBTI", "ゲーマーMBTI診断", "#9d8be0"),
    ("articles", "READ GUIDE", "ゲーム診断・読み物ガイド一覧", "#72f2ff"),
    ("results", "TYPE LIST", "診断結果タイプ一覧", "#ff7fae"),
    ("guide", "PLAY GUIDE", "ゲーム・デバイスガイド", "#7fe0c4"),
    ("game-aptitude-diagnosis", "GAME APTITUDE", "自分に向いてるゲーム診断", "#7fe0c4"),
    ("fps-aptitude-diagnosis", "FPS APTITUDE", "FPSに向いてる人診断", "#72f2ff"),
    ("steam-recommendation-diagnosis", "STEAM PICK", "Steamおすすめゲーム診断", "#7fe0c4"),
    ("partner", "DUO SYNC", "ゲームパートナー相性診断", "#ff9bc0"),
    ("pc-build", "PC BUILD", "ゲーミングPCの選び方", "#e0b94a"),
    ("gaming-desk-setup-guide", "DESK SETUP", "ゲーミングデスク環境の作り方", "#5fd0e0"),
    ("pro-gamer-practice-guide", "PRO PRACTICE", "プロゲーマーの練習方法・共通点", "#e0b94a"),
    ("gaming-chair-guide", "GAMING CHAIR", "ゲーミングチェアの選び方", "#ff9bc0"),
    ("gaming-earphone-guide", "GAMING EARPHONE", "ゲーミングイヤホンの選び方", "#7fe0c4"),
    ("game-streaming-start-guide", "GAME STREAMING", "ゲーム配信の始め方", "#5fd0e0"),
    ("discord-setup-guide", "DISCORD GUIDE", "Discordの使い方・設定", "#7f8cff"),
    ("gaming-pc-lifespan-guide", "PC LIFESPAN", "ゲーミングPCの寿命・買い替え時期", "#e0b94a"),
    ("esports-start-guide", "ESPORTS START", "e-スポーツの始め方", "#ff9bc0"),
    ("game-lag-fix-guide", "LAG FIX", "PCゲームが重い・カクつく時の対処", "#5fd0e0"),
    ("gaming-monitor-settings-guide", "MONITOR SETUP", "ゲーミングモニターの最適設定", "#5fd0e0"),
    ("steam-beginner-guide", "STEAM GUIDE", "Steamの使い方", "#7fe0c4"),
    ("gaming-pc-setup-guide", "PC FIRST SETUP", "ゲーミングPCを買ったら最初にやる設定", "#e0b94a"),
    ("game-motivation-guide", "MOTIVATION", "ゲームのモチベが続かない・飽きた時の対処", "#a7e8b0"),
]


def hx(s):
    s = s.lstrip("#")
    return (int(s[0:2], 16), int(s[2:4], 16), int(s[4:6], 16))


# ---- 右側に描くピクセルモチーフ ------------------------------------------
GW = GH = 32
OUTLINE = (18, 14, 30, 255)


class Cv:
    def __init__(self):
        self.img = Image.new("RGBA", (GW, GH), (0, 0, 0, 0))
        self.px = self.img.load()

    def r(self, x, y, w, h, c):
        for yy in range(int(y), int(y + h)):
            for xx in range(int(x), int(x + w)):
                if 0 <= xx < GW and 0 <= yy < GH:
                    self.px[xx, yy] = c


def shade(c, f):
    return tuple(max(0, min(255, int(c[i] * f))) for i in range(3)) + (255,)


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


def m_crosshair(cv, a):
    lite = shade(a, 1.25)
    for t in range(0, 360, 1):
        pass
    # リング(矩形近似)
    cv.r(10, 6, 12, 3, a)
    cv.r(10, 23, 12, 3, a)
    cv.r(6, 10, 3, 12, a)
    cv.r(23, 10, 3, 12, a)
    cv.r(8, 8, 3, 3, a)
    cv.r(21, 8, 3, 3, a)
    cv.r(8, 21, 3, 3, a)
    cv.r(21, 21, 3, 3, a)
    # 十字
    cv.r(15, 2, 2, 7, lite)
    cv.r(15, 23, 2, 7, lite)
    cv.r(2, 15, 7, 2, lite)
    cv.r(23, 15, 7, 2, lite)
    cv.r(15, 15, 2, 2, lite)


def m_arrow_up(cv, a):
    lite = shade(a, 1.3)
    cv.r(14, 22, 4, 8, shade(a, 0.7))
    cv.r(13, 12, 6, 10, a)
    for i, w in enumerate((2, 6, 10, 14)):
        cv.r(16 - w // 2, 4 + i * 2, w, 2, lite)


def m_radar(cv, a):
    dark = shade(a, 0.5)
    lite = shade(a, 1.3)
    cv.r(4, 4, 24, 1, dark)
    cv.r(4, 27, 24, 1, dark)
    cv.r(4, 4, 1, 24, dark)
    cv.r(27, 4, 1, 24, dark)
    # ポリゴン風
    cv.r(15, 7, 2, 2, a)
    cv.r(9, 12, 2, 2, a)
    cv.r(22, 11, 2, 2, a)
    cv.r(12, 22, 2, 2, a)
    cv.r(21, 20, 2, 2, a)
    cv.r(12, 12, 9, 8, shade(a, 0.85))
    cv.r(15, 15, 3, 3, lite)


def m_heart(cv, a):
    lite = shade(a, 1.25)
    cv.r(8, 8, 6, 5, a)
    cv.r(18, 8, 6, 5, a)
    cv.r(6, 11, 20, 6, a)
    cv.r(9, 17, 14, 4, a)
    cv.r(12, 21, 8, 3, a)
    cv.r(14, 24, 4, 3, a)
    cv.r(10, 10, 3, 3, lite)


def m_gamepad(cv, a):
    dark = shade(a, 0.55)
    cv.r(6, 11, 20, 9, a)
    cv.r(3, 13, 5, 10, a)
    cv.r(24, 13, 5, 10, a)
    cv.r(9, 13, 2, 6, dark)
    cv.r(7, 15, 6, 2, dark)
    cv.r(22, 14, 2, 2, dark)
    cv.r(25, 16, 2, 2, dark)
    cv.r(19, 16, 2, 2, dark)
    cv.r(22, 18, 2, 2, dark)


def m_monitor(cv, a):
    scr = shade(a, 1.2)
    cv.r(4, 6, 24, 15, shade(a, 0.55))
    cv.r(6, 8, 20, 11, scr)
    cv.r(6, 8, 20, 3, shade(a, 1.4))
    cv.r(14, 21, 4, 4, shade(a, 0.55))
    cv.r(10, 25, 12, 2, shade(a, 0.7))


def m_pc(cv, a):
    dark = shade(a, 0.55)
    lite = shade(a, 1.3)
    cv.r(9, 3, 14, 26, dark)
    cv.r(11, 5, 10, 4, lite)
    cv.r(11, 11, 10, 2, a)
    cv.r(11, 15, 10, 2, a)
    cv.r(18, 24, 3, 3, lite)


def m_chat(cv, a):
    lite = shade(a, 1.25)
    cv.r(4, 6, 24, 14, a)
    cv.r(8, 20, 6, 5, a)
    cv.r(8, 10, 4, 2, lite)
    cv.r(14, 10, 8, 2, lite)
    cv.r(8, 14, 12, 2, lite)


def m_trophy(cv, a):
    lite = shade(a, 1.3)
    cv.r(10, 4, 12, 9, a)
    cv.r(6, 5, 4, 6, shade(a, 0.75))
    cv.r(22, 5, 4, 6, shade(a, 0.75))
    cv.r(13, 13, 6, 4, a)
    cv.r(14, 17, 4, 5, shade(a, 0.7))
    cv.r(10, 23, 12, 4, a)
    cv.r(12, 6, 3, 3, lite)


def m_zap(cv, a):
    lite = shade(a, 1.3)
    cv.r(16, 3, 6, 4, a)
    cv.r(13, 7, 6, 4, a)
    cv.r(10, 11, 6, 4, a)
    cv.r(8, 15, 14, 3, lite)
    cv.r(14, 18, 6, 4, a)
    cv.r(12, 22, 5, 4, a)
    cv.r(10, 26, 4, 3, a)


def m_book(cv, a):
    lite = shade(a, 1.25)
    cv.r(5, 6, 11, 20, a)
    cv.r(16, 6, 11, 20, shade(a, 0.8))
    cv.r(15, 6, 2, 21, shade(a, 0.5))
    cv.r(7, 9, 7, 2, lite)
    cv.r(7, 13, 7, 2, lite)
    cv.r(19, 9, 6, 2, lite)
    cv.r(19, 13, 6, 2, lite)


def m_flame(cv, a):
    lite = shade(a, 1.35)
    cv.r(14, 3, 4, 5, a)
    cv.r(11, 7, 9, 6, a)
    cv.r(8, 12, 16, 9, a)
    cv.r(10, 21, 12, 5, shade(a, 0.8))
    cv.r(14, 14, 5, 8, lite)
    cv.r(15, 22, 3, 3, lite)


def m_mouse(cv, a):
    lite = shade(a, 1.3)
    cv.r(11, 4, 10, 6, a)
    cv.r(9, 8, 14, 18, a)
    cv.r(15, 5, 2, 6, shade(a, 0.5))
    cv.r(14, 12, 4, 3, lite)
    cv.r(9, 18, 14, 8, shade(a, 0.85))


MOTIFS = {
    "crosshair": m_crosshair,
    "arrow": m_arrow_up,
    "radar": m_radar,
    "heart": m_heart,
    "gamepad": m_gamepad,
    "monitor": m_monitor,
    "pc": m_pc,
    "chat": m_chat,
    "trophy": m_trophy,
    "zap": m_zap,
    "book": m_book,
    "flame": m_flame,
    "mouse": m_mouse,
}

SLUG_MOTIF = {
    "game-improve-guide": "arrow",
    "fps-sensitivity-guide": "crosshair",
    "game-focus-guide": "flame",
    "gaming-gear-guide": "mouse",
    "mouse-grip-guide": "mouse",
    "game-terms-glossary": "book",
    "fps-improve-guide": "crosshair",
    "aim-training-guide": "crosshair",
    "reaction-speed-guide": "zap",
    "cant-win-games-guide": "trophy",
    "game-skill-traits": "arrow",
    "game-sense-guide": "radar",
    "fps-sense-type": "crosshair",
    "moba-role-type": "radar",
    "valorant-improve-guide": "crosshair",
    "apex-improve-guide": "crosshair",
    "game-sickness-guide": "monitor",
    "voice-chat-tips": "chat",
    "steam-game-type-guide": "gamepad",
    "gamer-mbti-compatibility": "heart",
    "coop-game-compatibility": "gamepad",
    "gamer-couple-compatibility": "heart",
    "gamer-partner-tips": "heart",
    "online-game-romance": "heart",
    "index": "radar",
    "gamesense": "radar",
    "gamermbti": "radar",
    "articles": "book",
    "results": "trophy",
    "guide": "gamepad",
    "game-aptitude-diagnosis": "gamepad",
    "fps-aptitude-diagnosis": "crosshair",
    "steam-recommendation-diagnosis": "gamepad",
    "partner": "heart",
    "pc-build": "pc",
    "gaming-desk-setup-guide": "monitor",
    "pro-gamer-practice-guide": "trophy",
    "gaming-chair-guide": "mouse",
    "gaming-earphone-guide": "chat",
    "game-streaming-start-guide": "monitor",
    "discord-setup-guide": "chat",
    "gaming-pc-lifespan-guide": "pc",
    "esports-start-guide": "trophy",
    "game-lag-fix-guide": "zap",
    "gaming-monitor-settings-guide": "monitor",
    "steam-beginner-guide": "gamepad",
    "gaming-pc-setup-guide": "pc",
    "game-motivation-guide": "flame",
}


def glow_layer(size, blobs):
    layer = Image.new("RGB", size, (0, 0, 0))
    d = ImageDraw.Draw(layer)
    for cx, cy, r, color, strength in blobs:
        col = tuple(int(c * strength) for c in color)
        d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=col)
    return layer.filter(ImageFilter.GaussianBlur(110))


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
    base = (8, 10, 22)
    ac = hx(accent)
    img = Image.new("RGB", (Wd, Hd), base)
    # 背景グラデ
    for y in range(Hd):
        f = y / Hd
        img.paste(tuple(int(base[i] + (ac[i] * 0.16 - base[i]) * f) for i in range(3)),
                  (0, y, Wd, y + 1))
    # ネオングロー(右にアクセント、左上シアン、下ピンク)
    img = ImageChops.add(img, glow_layer((Wd, Hd), [
        (930, 300, 250, ac, 0.50),
        (170, 90, 220, CYAN, 0.20),
        (420, 580, 230, PINK, 0.16),
    ]))
    # スキャンライン
    scan = Image.new("RGBA", (Wd, Hd), (0, 0, 0, 0))
    sd = ImageDraw.Draw(scan)
    for y in range(0, Hd, 4):
        sd.line([(0, y), (Wd, y)], fill=(0, 0, 0, 24))
    img = Image.alpha_composite(img.convert("RGBA"), scan).convert("RGB")
    d = ImageDraw.Draw(img)
    # ドット格子
    for gy in range(0, Hd, 44):
        for gx in range(0, Wd, 44):
            d.point((gx, gy), fill=(255, 255, 255))
    # 右パネル(モチーフ用の二重枠)
    px1, py1, px2, py2 = 770, 140, 1110, 490
    d.rounded_rectangle([px1, py1, px2, py2], radius=28, fill=(6, 9, 20), outline=ac, width=3)
    d.rounded_rectangle([px1 + 9, py1 + 9, px2 - 9, py2 - 9], radius=22,
                        outline=(255, 255, 255), width=1)
    d.line([(px2 - 22, py1 + 4), (px2 - 4, py1 + 4)], fill=PINK, width=3)
    d.line([(px2 - 4, py1 + 4), (px2 - 4, py1 + 22)], fill=PINK, width=3)
    # ピクセルモチーフ
    motif = MOTIFS.get(SLUG_MOTIF.get(slug, "radar"), m_radar)
    cv = Cv()
    motif(cv, tuple(ac) + (255,))
    add_outline(cv)
    sc = 9
    art = cv.img.resize((GW * sc, GH * sc), Image.NEAREST)
    cx, cy = (px1 + px2) // 2, (py1 + py2) // 2
    img.paste(art, (cx - art.width // 2, cy - art.height // 2), art)
    d = ImageDraw.Draw(img)
    # 左の発光バー
    d.rectangle([80, 150, 92, 480], fill=ac)
    mx = 120
    max_w = px1 - mx - 46
    # eyebrow
    f_eye = font(LATIN_FONT, 34)
    d.text((mx, 150), eyebrow, font=f_eye, fill=ac)
    # タイトル(自動縮小+折り返し)
    size = 84
    while size >= 46:
        f_title = font(JP_FONT, size)
        lines = wrap(d, title, f_title, max_w)
        if len(lines) <= 3:
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
