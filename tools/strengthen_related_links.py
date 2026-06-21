#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""記事クラスタの相互リンクを補強(冪等).

各記事の「次に読みたい関連ページ」に、トピック上の兄弟記事リンクを
追記する(既存リンクは重複させない/グリッドは最大6件まで)。

  python3 tools/strengthen_related_links.py
"""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 各ページの定型リンク(アンカー, 補足)
LINK = {
    "fps-improve-guide": ("FPSの上達方法", "エイム以外で勝率を上げる立ち回り。"),
    "aim-training-guide": ("エイム力を上げる練習方法", "感度設定とエイム練習の組み立て。"),
    "valorant-improve-guide": ("VALORANT上達のコツ", "配置・スキル・情報共有でランク上げ。"),
    "apex-improve-guide": ("Apexの立ち回りのコツ", "漁夫対策と安置読みで勝率アップ。"),
    "reaction-speed-guide": ("反応速度を上げるには", "知覚・判断・操作と環境遅延の削り方。"),
    "cant-win-games-guide": ("ゲームで勝てない原因と対処", "連敗から抜ける5つの見直し。"),
    "game-skill-traits": ("ゲームが上手い人の特徴", "上手さを8能力に分解して伸ばす。"),
    "fps-sense-type": ("FPSに向いている人の特徴", "適性・役割・伸ばし方を整理。"),
    "moba-role-type": ("MOBAに向いている人の特徴", "マクロ判断とロール適性。"),
    "game-sense-guide": ("ゲームセンスとは？", "上手さを8能力で可視化する。"),
    "voice-chat-tips": ("VCが苦手な人へ", "短い定型コールとマイク設定。"),
    "gamer-mbti-compatibility": ("ゲーマーMBTI相性の見方", "通話の温度と判断基準で相性を読む。"),
    "coop-game-compatibility": ("協力ゲームで相性がいい人", "役割分担で楽しく続く。"),
}

# 各記事に補強する兄弟記事(優先順)
RELATED = {
    "fps-improve-guide": ["valorant-improve-guide", "apex-improve-guide",
                          "reaction-speed-guide", "cant-win-games-guide", "fps-sense-type"],
    "aim-training-guide": ["fps-improve-guide", "valorant-improve-guide",
                           "reaction-speed-guide", "fps-sense-type"],
    "valorant-improve-guide": ["apex-improve-guide", "fps-improve-guide",
                               "aim-training-guide", "cant-win-games-guide"],
    "apex-improve-guide": ["valorant-improve-guide", "fps-improve-guide",
                           "cant-win-games-guide", "fps-sense-type"],
    "reaction-speed-guide": ["fps-improve-guide", "aim-training-guide",
                             "cant-win-games-guide", "game-skill-traits"],
    "cant-win-games-guide": ["fps-improve-guide", "reaction-speed-guide",
                             "game-skill-traits", "voice-chat-tips"],
    "game-skill-traits": ["cant-win-games-guide", "fps-improve-guide",
                          "reaction-speed-guide", "fps-sense-type", "game-sense-guide"],
    "fps-sense-type": ["fps-improve-guide", "aim-training-guide",
                       "moba-role-type", "game-sense-guide"],
    "voice-chat-tips": ["cant-win-games-guide", "gamer-mbti-compatibility",
                        "coop-game-compatibility"],
    "game-sickness-guide": ["fps-improve-guide", "reaction-speed-guide"],
}

GRID_RE = re.compile(
    r'(次に読みたい関連ページ</h2>\n\s*<div class="article-pair-grid">\n)'
    r'(.*?)'
    r'(\n {12}</div>)', re.DOTALL)

MAX_ITEMS = 6


def item(href):
    anchor, blurb = LINK[href]
    return (f'              <div><strong><a href="{href}.html">{anchor}</a>'
            f'</strong><p>{blurb}</p></div>')


def main():
    total = 0
    for src, targets in RELATED.items():
        path = os.path.join(ROOT, f"{src}.html")
        if not os.path.exists(path):
            print("  (no file)", src)
            continue
        s = open(path, encoding="utf-8").read()
        m = GRID_RE.search(s)
        if not m:
            print("  WARN no related grid:", src)
            continue
        items = m.group(2)
        count = items.count('<div><strong>')
        added = []
        for t in targets:
            if count >= MAX_ITEMS:
                break
            if f'href="{t}.html"' in items or f'href="{t}.html"' in "".join(added):
                continue
            added.append("\n" + item(t))
            count += 1
        if not added:
            print("  skip (full/linked):", src)
            continue
        new_block = m.group(1) + items + "".join(added) + m.group(3)
        s = s[:m.start()] + new_block + s[m.end():]
        open(path, "w", encoding="utf-8").write(s)
        print(f"  +{len(added)} links:", src)
        total += len(added)
    print("related links added:", total)


if __name__ == "__main__":
    main()
