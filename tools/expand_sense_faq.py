#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""GameSense 8能力ガイドのFAQを1問拡充(冪等). schema↔可視を同期。

  python3 tools/expand_sense_faq.py
"""
import os
import re
import json

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

ADD = {
    "sense-awareness-guide": ("状況認識が高い人の特徴は？",
        "撃ち合い中でも周囲や音に気を配り、不利になる前に動けます。索敵や報告、カバーが的確で、事故を未然に防ぎやすいです。"),
    "sense-prediction-guide": ("未来予測はどうやって鍛える？",
        "相手の定番行動を1つずつ覚え、「次どこに来るか」を毎回予想して答え合わせを繰り返すと、少しずつ精度が上がります。"),
    "sense-pattern-guide": ("パターン認識が高いと何が有利？",
        "相手の癖や定番展開を先回りでき、同じ負けを繰り返さずに対策を立てられます。キャラ対策やメタ理解でも差が出ます。"),
    "sense-spatial-guide": ("空間把握が苦手だとどうなる？",
        "開けた場所で被弾しやすく、退路や射線を見落としがちになります。まず位置取りと射線管理から見直すと改善しやすいです。"),
    "sense-speed-guide": ("判断速度と反応速度は違う？",
        "反応速度は刺激に反応する速さ、判断速度は何をするかを決める速さです。判断は事前に基準を決めておくと速くなります。"),
    "sense-resource-guide": ("リソース管理が上手い人の特徴は？",
        "スキルや回復、弾、時間の使い所が計画的で、勝負どころでリソースを切らしません。抱え落ちや無駄遣いが少ないのも特徴です。"),
    "sense-mindgame-guide": ("心理戦が強い人の特徴は？",
        "同じ動きを繰り返さず、相手の期待を外す選択ができます。ブラフと本命を混ぜ、相手を迷わせるのが上手です。"),
    "sense-adaptation-guide": ("学習適応力を高めるには？",
        "負けたら毎回1つだけ動きを変え、その結果を確認する。この小さな改善を積み重ねるのが一番の近道です。"),
}


def add_schema(s, q, a):
    fi = s.find('"FAQPage"')
    mi = s.find('"mainEntity": [', fi)
    ci = s.find('\n            ]', mi)
    item = (',\n              {\n'
            '                "@type": "Question",\n'
            f'                "name": "{q}",\n'
            '                "acceptedAnswer": { "@type": "Answer", '
            f'"text": "{a}" }}\n'
            '              }')
    return s[:ci] + item + s[ci:]


def add_visible(s, q, a):
    hi = s.find('よくある質問</h2>')
    gi = s.find('<div class="article-pair-grid">', hi)
    gc = s.find('\n            </div>', gi)
    return s[:gc] + f'\n            <div><strong>{q}</strong><p>{a}</p></div>' + s[gc:]


def main():
    n = 0
    for slug, (q, a) in ADD.items():
        path = os.path.join(ROOT, f"{slug}.html")
        s = open(path, encoding="utf-8").read()
        if q in s:
            print("  skip:", slug)
            continue
        s = add_schema(s, q, a)
        s = add_visible(s, q, a)
        m = re.search(r'<script type="application/ld\+json">(.*?)</script>',
                      s, re.DOTALL)
        json.loads(m.group(1))
        s = re.sub(r'"dateModified": "[0-9-]*"', '"dateModified": "2026-06-21"', s)
        open(path, "w", encoding="utf-8").write(s)
        print("  +1 FAQ:", slug)
        n += 1
    print("sense FAQ expanded:", n)


if __name__ == "__main__":
    main()
