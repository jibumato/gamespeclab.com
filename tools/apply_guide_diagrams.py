#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""相性・適性ガイド4ページに概念図/対応図を追加(冪等)."""
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def flow(nodes, sequence=True):
    cls = "gsl-flow is-sequence" if sequence else "gsl-flow"
    if sequence:
        ns = "".join(f'<div class="gsl-node"><b>{i + 1}</b>{n}</div>'
                     for i, n in enumerate(nodes))
    else:
        ns = "".join(f'<div class="gsl-node">{n}</div>' for n in nodes)
    return f'            <div class="{cls}">{ns}</div>'


def mapping(pairs):
    rows = "".join(
        f'<div class="gsl-map-row"><span class="gsl-map-from">{a}</span>'
        f'<span class="gsl-map-arrow" aria-hidden="true">→</span>'
        f'<span class="gsl-map-to">{b}</span></div>'
        for a, b in pairs)
    return f'            <div class="gsl-map">{rows}</div>'


def fig(cap, inner):
    return ('          <div class="gsl-figure">\n'
            f'            <p class="gsl-figure-cap"><span data-icon="chart"></span>{cap}</p>\n'
            f'{inner}\n'
            '          </div>')


DIAGRAMS = {
    "gamer-mbti-compatibility": fig("相性を読む4つの観点", flow(
        ["通話の温度", "勝ち筋の作り方", "役割の重なり", "反省のスタイル"],
        sequence=False)),
    "coop-game-compatibility": fig("協力で見たい4つの相性", flow(
        ["通話ペース", "勝ち負けの温度", "役割分担", "ミスへの反応"],
        sequence=False)),
    "moba-role-type": fig("強みからロールを選ぶ", mapping([
        ("判断速度・心理戦", "前線で流れを作る"),
        ("状況認識・未来予測", "全体を動かす"),
        ("リソース管理・学習適応", "味方を活かす"),
    ])),
    "steam-game-type-guide": fig("強みから合うジャンルを探す", mapping([
        ("判断速度", "FPS・アクション・ローグライト"),
        ("未来予測", "ストラテジー・MOBA・デッキ構築"),
        ("リソース管理", "サバイバル・クラフト・シミュ"),
        ("心理戦", "人狼系・非対称対戦・駆け引き"),
        ("学習適応力", "高難度アクション・対戦・やり込み"),
    ])),
}

ANCHOR = '          </div>\n          <div class="article-grid">'

n = 0
for slug, dia in DIAGRAMS.items():
    path = os.path.join(ROOT, f"{slug}.html")
    s = open(path, encoding="utf-8").read()
    if "gsl-figure" in s:
        print("skip (already):", slug)
        continue
    if ANCHOR not in s:
        print("WARN anchor not found:", slug)
        continue
    s = s.replace(
        ANCHOR,
        '          </div>\n' + dia + '\n          <div class="article-grid">',
        1)
    open(path, "w", encoding="utf-8").write(s)
    n += 1
print("guide diagrams added:", n)
