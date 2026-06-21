#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""各ゲーマーMBTIタイプページに「プレイ中のあるある」を追加(冪等).

タイプ固有の共感ポイントを2つ、FAQカードの直前に挿入する。

  python3 tools/add_type_aruaru.py
"""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# code -> [あるある2つ]
ARU = {
    "intj": ["味方が突っ込む前に「それ罠だ」と気づいている", "勝ち筋が見えた瞬間、急に口数が増える"],
    "intp": ["最適解を調べているうちに試合が始まっている", "なぜ負けたかの分析が、勝つより楽しい"],
    "entj": ["気づけば自然と指示を出している", "非効率な動きを見るとムズムズする"],
    "entp": ["定石より「裏をかく」を試したくなる", "強いとされる構成ほど崩しにいきたくなる"],
    "infj": ["相手の次の動きが、なんとなく分かる", "目立たないが、勝敗を左右する一手を打っている"],
    "infp": ["世界観やストーリーについ浸ってしまう", "勝ち負けより「良い瞬間」を覚えている"],
    "enfj": ["自然とチームの士気を上げている", "味方が落ち込むと放っておけない"],
    "enfp": ["新しい戦法をすぐ試したくなる", "気づけば寄り道や探索をしている"],
    "istj": ["同じ手順を、丁寧に積み上げる", "奇策より堅実。だから事故が少ない"],
    "isfj": ["味方のカバーを最優先に動いている", "無理はしないが、誰かのためには踏ん張る"],
    "estj": ["役割とルールをきっちり決めたい", "だらけた進行が気になってしまう"],
    "esfj": ["場の空気を読んで潤滑油になっている", "みんなが楽しめているか、つい気にする"],
    "istp": ["言葉より、行動で示すタイプ", "ピンチになるほど、逆に冷静になる"],
    "isfp": ["自分の感覚やスタイルを大事にする", "縛られたり急かされると一気に冷める"],
    "estp": ["考えるより先に、体が動いている", "劣勢でも一発逆転を狙ってしまう"],
    "esfp": ["ノリと勢いで場を盛り上げる", "注目される場面でこそ強い"],
}

ANCHOR_RE = re.compile(
    r'(\n {10}<div class="article-card">\n {12}<p class="article-kicker">FAQ</p>)')


def card(items):
    lis = "\n".join(f'              <li>{x}</li>' for x in items)
    return ('          <div class="article-card">\n'
            '            <p class="article-kicker">ALLY VIEW</p>\n'
            '            <h2>プレイ中のあるある</h2>\n'
            '            <p>「わかる」と思ったら、それがこのタイプらしさです。</p>\n'
            '            <ul class="article-list aruaru-list">\n'
            f'{lis}\n'
            '            </ul>\n'
            '          </div>\n')


def main():
    n = 0
    for code, items in ARU.items():
        path = os.path.join(ROOT, f"gamer-mbti-{code}.html")
        s = open(path, encoding="utf-8").read()
        if "プレイ中のあるある" in s:
            print("  skip:", code)
            continue
        m = ANCHOR_RE.search(s)
        if not m:
            print("  WARN no anchor:", code)
            continue
        s = s[:m.start()] + "\n" + card(items) + s[m.start() + 1:]
        s = re.sub(r'"dateModified":"[0-9-]*"', '"dateModified":"2026-06-21"', s)
        open(path, "w", encoding="utf-8").write(s)
        print("  +aruaru:", code)
        n += 1
    print("type aruaru added:", n)


if __name__ == "__main__":
    main()
