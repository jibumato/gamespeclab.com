#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""8つのセンス能力ガイドに各能力の概念図を追加(冪等)."""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def flow(nodes, sequence=True):
    cls = "gsl-flow is-sequence" if sequence else "gsl-flow"
    if sequence:
        ns = "".join(f'<div class="gsl-node"><b>{i + 1}</b>{n}</div>'
                     for i, n in enumerate(nodes))
    else:
        ns = "".join(f'<div class="gsl-node">{n}</div>' for n in nodes)
    return f'            <div class="{cls}">{ns}</div>'


def formula(parts, result):
    boxes = '<span class="cf-op">＋</span>'.join(
        f'<span class="cf-box">{p}</span>' for p in parts)
    return ('            <div class="concept-formula">'
            f'{boxes}<span class="cf-op">＝</span>'
            f'<span class="cf-box cf-result">{result}</span></div>')


def fig(cap, inner):
    return ('          <div class="gsl-figure">\n'
            f'            <p class="gsl-figure-cap"><span data-icon="chart"></span>{cap}</p>\n'
            f'{inner}\n'
            '          </div>')


DIAGRAMS = {
    "sense-awareness-guide": fig("まず見るべき3つ", flow(
        ["画面の情報", "音", "味方の位置"], sequence=False)),
    "sense-prediction-guide": fig("先読みの流れ", flow(
        ["今の状況", "相手のパターン", "次の一手"])),
    "sense-pattern-guide": fig("癖を攻略に変える", flow(
        ["観察する", "型を覚える", "対策する"])),
    "sense-spatial-guide": fig("空間把握の4要素", flow(
        ["距離", "角度", "高低差", "射線"], sequence=False)),
    "sense-speed-guide": fig("判断速度の正体", formula(
        ["気づく", "決める", "動かす"], "判断速度")),
    "sense-resource-guide": fig("管理する4つの資源", flow(
        ["時間", "スキル", "体力", "物資"], sequence=False)),
    "sense-mindgame-guide": fig("心理戦の流れ", flow(
        ["意図を読む", "選択肢をずらす", "揺さぶる"])),
    "sense-adaptation-guide": fig("学習のループ", flow(
        ["試す", "失敗", "振り返り", "修正"])),
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
    s = s.replace(ANCHOR, '          </div>\n' + dia + '\n          <div class="article-grid">', 1)
    open(path, "w", encoding="utf-8").write(s)
    n += 1
print("sense diagrams added:", n)
