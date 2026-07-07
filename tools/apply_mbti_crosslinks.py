#!/usr/bin/env python3
"""16のゲーマーMBTIタイプページに「ほかのタイプを見る」相互リンクカードを冪等に追加。

関係は3種でいずれも均衡（各タイプがちょうど3被リンク）:
  - 似たタイプ : 同じ中央2文字グループ内の循環
  - 噛み合う相棒: 全4文字反転（対合）
  - 別角度    : T/F反転（対合）
"""
import re
import glob

GROUPS = [
    ["INTJ", "INTP", "ENTJ", "ENTP"],
    ["INFJ", "INFP", "ENFJ", "ENFP"],
    ["ISFJ", "ISFP", "ESFJ", "ESFP"],
    ["ISTJ", "ISTP", "ESTJ", "ESTP"],
]

NICK = {
    "ENFJ": "鼓舞する旗手型", "ENFP": "ひらめき冒険家型", "ENTJ": "覇道コマンダー型",
    "ENTP": "メタ破壊の革命家型", "ESFJ": "陽だまりの宮廷官型", "ESFP": "祝祭の先陣役型",
    "ESTJ": "規律の実戦指揮官型", "ESTP": "電撃アサルト型", "INFJ": "静かなる預言者型",
    "INFP": "夢見る巡礼者型", "INTJ": "冷静沈着の軍師型", "INTP": "孤高の研究者型",
    "ISFJ": "誓約の守護騎士型", "ISFP": "自由なる吟遊詩人型", "ISTJ": "鉄壁の記録官型",
    "ISTP": "無言の剣豪型",
}

FLIP = {"E": "I", "I": "E", "N": "S", "S": "N", "F": "T", "T": "F", "J": "P", "P": "J"}


def dual(t):
    return "".join(FLIP[c] for c in t)


def tf_flip(t):
    return t[0] + t[1] + FLIP[t[2]] + t[3]


def similar(t):
    for g in GROUPS:
        if t in g:
            return g[(g.index(t) + 1) % 4]


def card(t):
    sim, dl, tf = similar(t), dual(t), tf_flip(t)
    rows = [
        (sim, "タイプが近く、感覚が通じ合いやすい。"),
        (dl, "対照的だけど、組むと噛み合う相棒。"),
        (tf, "別の角度から自分を映すタイプ。"),
    ]
    items = "\n".join(
        f'              <div><strong><a href="gamer-mbti-{c.lower()}.html">{c} {NICK[c]}</a></strong>'
        f'<p>{desc}</p></div>'
        for c, desc in rows
    )
    return (
        '          <div class="article-card">\n'
        '            <p class="article-kicker">OTHER TYPES</p>\n'
        '            <h2>ほかのゲーマータイプを見る</h2>\n'
        '            <p>近いタイプ、噛み合う相棒、別角度のタイプを見比べると、自分の輪郭がはっきりします。</p>\n'
        '            <div class="article-pair-grid">\n'
        f'{items}\n'
        '            </div>\n'
        '            <a class="primary-link" href="results.html#mbti-results"><span data-icon="list"></span>16タイプ一覧を見る</a>\n'
        '          </div>\n'
    )


def main():
    changed = 0
    for t in [x for g in GROUPS for x in g]:
        path = f"gamer-mbti-{t.lower()}.html"
        html = open(path, encoding="utf-8").read()
        if "OTHER TYPES" in html:
            print(f"  ok {path}: 既存スキップ")
            continue
        anchor = '          <div class="article-card">\n            <p class="article-kicker">FAQ</p>'
        if anchor not in html:
            print(f"  SKIP {path}: FAQアンカーなし")
            continue
        html = html.replace(anchor, card(t) + anchor, 1)
        open(path, "w", encoding="utf-8").write(html)
        changed += 1
        print(f"  + {path}: 相互リンクカード追加")
    print(f"done: {changed} pages changed")


if __name__ == "__main__":
    main()
