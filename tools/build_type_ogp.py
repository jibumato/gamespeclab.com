#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""タイプ個別ページのOGPカード24枚を新スタイルで再生成.

MBTI 16タイプ(gamer-mbti-*.html) と GameSense 8能力(sense-*-guide.html) の
既存キャラPNG(assets/types/*.png)を使い、記事OGPと同じネオンスタイル
(グロー＋スキャンライン＋二重枠＋タイプ色)で 1200x630 のOGPを生成する。
タイトル・アクセント色は各HTMLから抽出。

  python3 tools/build_type_ogp.py
出力: assets/types/<slug>-ogp.png
"""
import glob
import os
import re

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TYPES = os.path.join(ROOT, "assets", "types")
JP_FONT = "/etc/alternatives/fonts-japanese-gothic.ttf"
LATIN_FONT = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"

CYAN = (114, 242, 255)
PINK = (255, 77, 210)

# GameSense 8能力（slug -> EN, JP, アクセント）
SENSE = [
    ("sense-awareness-guide", "AWARENESS", "状況認識", (127, 224, 240)),
    ("sense-prediction-guide", "PREDICTION", "未来予測", (179, 167, 255)),
    ("sense-pattern-guide", "PATTERN", "パターン認識", (127, 224, 196)),
    ("sense-spatial-guide", "SPATIAL", "空間把握", (155, 192, 255)),
    ("sense-speed-guide", "SPEED", "判断速度", (255, 210, 74)),
    ("sense-resource-guide", "RESOURCE", "リソース管理", (255, 224, 122)),
    ("sense-mindgame-guide", "MINDGAME", "心理戦", (255, 155, 214)),
    ("sense-adaptation-guide", "ADAPTATION", "学習適応力", (167, 232, 176)),
]


def font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()


def glow_layer(size, blobs):
    layer = Image.new("RGB", size, (0, 0, 0))
    d = ImageDraw.Draw(layer)
    for cx, cy, r, color, strength in blobs:
        col = tuple(int(c * strength) for c in color)
        d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=col)
    return layer.filter(ImageFilter.GaussianBlur(115))


def parse_mbti():
    records = []
    for path in sorted(glob.glob(os.path.join(ROOT, "gamer-mbti-????.html"))):
        code = os.path.basename(path)[len("gamer-mbti-"):-len(".html")].upper()
        if len(code) != 4:
            continue
        html = open(path, encoding="utf-8").read()
        m_ac = re.search(r"--type-accent:\s*([0-9]+)\s+([0-9]+)\s+([0-9]+)", html)
        m_h1 = re.search(r"<h1><span>([^<]+)</span>", html)
        accent = tuple(int(m_ac.group(i)) for i in (1, 2, 3)) if m_ac else CYAN
        title = m_h1.group(1) if m_h1 else code
        jp = title[len(code):].strip() if title.upper().startswith(code) else title
        records.append({
            "slug": f"gamer-mbti-{code.lower()}",
            "char": os.path.join(TYPES, f"{code.lower()}.png"),
            "en": code,
            "jp": jp,
            "group": "ゲーマーMBTI 16タイプ",
            "accent": accent,
        })
    return records


def build(rec):
    Wd, Hd = 1200, 630
    base = (8, 10, 22)
    ac = rec["accent"]
    img = Image.new("RGB", (Wd, Hd), base)
    for y in range(Hd):
        f = y / Hd
        img.paste(tuple(int(base[i] + (ac[i] * 0.16 - base[i]) * f) for i in range(3)),
                  (0, y, Wd, y + 1))
    img = ImageChops.add(img, glow_layer((Wd, Hd), [
        (300, 300, 260, ac, 0.52),
        (1040, 110, 250, CYAN, 0.22),
        (900, 560, 240, PINK, 0.18),
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
    # 左キャラパネル（二重枠＋ピンクのコーナー）
    px1, py1, px2, py2 = 60, 70, 520, 560
    d.rounded_rectangle([px1, py1, px2, py2], radius=30, fill=(6, 9, 20), outline=ac, width=4)
    d.rounded_rectangle([px1 + 9, py1 + 9, px2 - 9, py2 - 9], radius=24,
                        outline=(255, 255, 255), width=1)
    d.line([(px2 - 22, py1 + 4), (px2 - 4, py1 + 4)], fill=PINK, width=3)
    d.line([(px2 - 4, py1 + 4), (px2 - 4, py1 + 22)], fill=PINK, width=3)
    # キャラ配置（下寄せ）
    if os.path.exists(rec["char"]):
        char = Image.open(rec["char"]).convert("RGBA")
        maxw, maxh = px2 - px1 - 90, py2 - py1 - 70
        sc = min(maxw / char.size[0], maxh / char.size[1])
        cw, ch = int(char.size[0] * sc), int(char.size[1] * sc)
        char = char.resize((cw, ch), Image.NEAREST)
        cx = px1 + (px2 - px1 - cw) // 2
        cy = py2 - ch - 30
        img.paste(char, (cx, cy), char)
    d = ImageDraw.Draw(img)

    # 右テキスト
    tx = 580
    max_w = Wd - tx - 46
    # EN（自動縮小）
    size = 150
    while size > 40:
        f_en = font(LATIN_FONT, size)
        if d.textlength(rec["en"], font=f_en) <= max_w:
            break
        size -= 6
    d.text((tx, 120), rec["en"], font=f_en, fill=ac)
    # JP（下線＋白）
    size = 76
    while size > 34:
        f_jp = font(JP_FONT, size)
        if d.textlength(rec["jp"], font=f_jp) <= max_w:
            break
        size -= 4
    jw = d.textlength(rec["jp"], font=f_jp)
    d.rectangle([tx + 4, 300, tx + 4 + jw, 306], fill=ac)
    d.text((tx + 4, 320), rec["jp"], font=f_jp, fill=(232, 240, 255))
    # グループ＋ブランド
    d.text((tx + 4, 468), rec["group"], font=font(JP_FONT, 30), fill=(200, 205, 225))
    d.text((tx + 4, 516), "GameSpec Lab", font=font(JP_FONT, 34), fill=ac)

    img.save(os.path.join(TYPES, f"{rec['slug']}-ogp.png"))


def main():
    records = parse_mbti()
    for slug, en, jp, ac in SENSE:
        records.append({
            "slug": slug,
            "char": os.path.join(TYPES, f"{slug}.png"),
            "en": en,
            "jp": jp,
            "group": "GameSense Scan 8 能力",
            "accent": ac,
        })
    for rec in records:
        build(rec)
        print("ogp:", rec["slug"])
    print(f"total: {len(records)}")


if __name__ == "__main__":
    main()
