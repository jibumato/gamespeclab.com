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
