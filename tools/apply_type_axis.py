#!/usr/bin/env python3
"""16タイプページに「4つの軸」ビジュアル図を冪等に追加。

タイプコードの各文字を傾向ワードに変換し、対極を添えたチップで表示。
type-overview カードの直後に gsl-figure として挿入する。
"""
import glob
import re

TRAIT = {
    "E": ("E", "外向"), "I": ("I", "内向"),
    "N": ("N", "直感"), "S": ("S", "感覚"),
    "T": ("T", "思考"), "F": ("F", "感情"),
    "J": ("J", "計画"), "P": ("P", "探索"),
}
OPP = {"E": "I", "I": "E", "N": "S", "S": "N", "T": "F", "F": "T", "J": "P", "P": "J"}


def figure(code):
    rows = []
    for c in code:
        l, word = TRAIT[c]
        ol, oword = TRAIT[OPP[c]]
        rows.append(
            f'              <div class="taxis"><b>{l}</b><span>{word}</span>'
            f'<small>↔ {ol} {oword}</small></div>'
        )
    body = "\n".join(rows)
    return (
        '          <div class="gsl-figure type-axis-figure">\n'
        f'            <p class="gsl-figure-cap"><span data-icon="chart"></span>{code} を形づくる4つの軸</p>\n'
        '            <div class="type-axis">\n'
        f'{body}\n'
        '            </div>\n'
        '          </div>\n'
    )


def main():
    changed = 0
    for p in sorted(glob.glob("gamer-mbti-????.html")):
        code = p.split("-")[-1].split(".")[0].upper()
        html = open(p, encoding="utf-8").read()
        if "type-axis-figure" in html:
            print(f"  ok {p}: 既存スキップ")
            continue
        anchor = '          </div>\n          <div class="article-grid">'
        if anchor not in html:
            print(f"  SKIP {p}: アンカーなし")
            continue
        html = html.replace(
            anchor, '          </div>\n' + figure(code) + '          <div class="article-grid">', 1
        )
        open(p, "w", encoding="utf-8").write(html)
        changed += 1
        print(f"  + {p}: 4軸図を追加")
    print(f"done: {changed} pages changed")


if __name__ == "__main__":
    main()
