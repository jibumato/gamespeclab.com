#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""各センスガイドに「GameSense 8能力」シリーズナビを追加(冪等).

8能力ガイドを相互リンクするナビ(seo-link-grid)を、シェアカードの
直前に挿入する。現在のページ自身は除外。

  python3 tools/apply_sense_series_nav.py
"""
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SENSES = [
    ("sense-awareness-guide", "状況認識力", "画面・音・位置から状況を拾う"),
    ("sense-prediction-guide", "未来予測力", "次の動きと試合の流れを先読みする"),
    ("sense-pattern-guide", "パターン認識", "定番展開と相手の癖を見抜く"),
    ("sense-spatial-guide", "空間把握力", "距離・角度・射線を捉える"),
    ("sense-speed-guide", "判断速度", "撃つ・引く・詰めるを速く決める"),
    ("sense-resource-guide", "リソース管理", "時間・スキル・物資を配分する"),
    ("sense-mindgame-guide", "心理戦", "相手の意図を読み、揺さぶる"),
    ("sense-adaptation-guide", "学習適応力", "試して振り返り、素早く修正する"),
]

ANCHOR = '          <div class="article-card type-share-card">'
MARK = "GameSense 8能力をすべて見る"


def nav_html(current):
    cards = []
    for slug, label, blurb in SENSES:
        if slug == current:
            continue
        cards.append(
            f'              <a href="{slug}.html"><span data-icon="chart"></span>'
            f'<strong>{label}</strong><small>{blurb}</small></a>')
    inner = "\n".join(cards)
    return (
        '          <div class="article-card">\n'
        f'            <h2>{MARK}</h2>\n'
        '            <p>あなたの強みは8つの能力の組み合わせで決まります。'
        '他の能力も見ると、自分の勝ち筋がより立体的にわかります。</p>\n'
        '            <div class="seo-link-grid">\n'
        f'{inner}\n'
        '            </div>\n'
        '          </div>\n')


def main():
    n = 0
    for slug, _, _ in SENSES:
        path = os.path.join(ROOT, f"{slug}.html")
        s = open(path, encoding="utf-8").read()
        if MARK in s:
            print("  skip (already):", slug)
            continue
        if ANCHOR not in s:
            print("  WARN no share-card anchor:", slug)
            continue
        s = s.replace(ANCHOR, nav_html(slug) + ANCHOR, 1)
        open(path, "w", encoding="utf-8").write(s)
        print("  nav added:", slug)
        n += 1
    print("sense series nav added:", n)


if __name__ == "__main__":
    main()
