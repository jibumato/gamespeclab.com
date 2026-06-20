#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""ゲーマーMBTIの説明を一本化(冪等).

「短い要約(②)」を、診断結果の元データ(script.js gamerMbtiTypes[code].summary)と
各タイプページの hero lead の両方へ反映し、診断結果・一覧・ページの文言を統一する。
フルの6部構成(③)はタイプページの TYPE OVERVIEW に残す。
"""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# code -> ②短い要約(です・ます調・本質＋強み)
SHORT = {
    "INTJ": "あなたのゲームセンスの正体は「先を読む力」です。終盤に何が強いか、どこで崩れるかを読み、気合いではなく設計図で勝率を上げられる、数少ないタイプです。",
    "INTP": "あなたのゲームセンスは「分析」にあります。仕様も数字も相手の手癖も理由まで突き詰めて、誰も気づかない最適解を見つけ出せるタイプです。",
    "ENTJ": "あなたのゲームセンスは「決断」です。曖昧な空気の中でも勝つために今すべきことを言い切り、迷うチームに進む方向を与えられる司令塔タイプです。",
    "ENTP": "あなたのゲームセンスは「裏をかく力」です。定石の外側を見て、フェイクや変則の一手で相手の想定を崩し、試合の流れごとひっくり返せるタイプです。",
    "INFJ": "あなたのゲームセンスは「先読み」と「気配り」の両立です。試合の潮目と味方の空気を同時に読み、崩れる前に整えられる、固定チームの潤滑油タイプです。",
    "INFP": "あなたのゲームセンスは「没入と共感」です。勝敗の数字より世界や仲間との時間を味わい、その場を温かくできる、物語を大切にするタイプです。",
    "ENFJ": "あなたのゲームセンスは「人を動かす力」です。声かけと立て直しで味方の気持ちを上げ、チーム全体の出力を引き上げられるリーダータイプです。",
    "ENFP": "あなたのゲームセンスは「発想と勢い」です。その場のひらめきで道を切り開き、止まった試合に火をつけられる、場を面白くする天才タイプです。",
    "ISTJ": "あなたのゲームセンスは「安定と再現性」です。勝てる形を丁寧に積み上げ、細部を雑にしないので事故が少なく、気づけば一番信頼されているタイプです。",
    "ISFJ": "あなたのゲームセンスは「支援と気配り」です。味方の状態を誰より早く察知し、回復やカバーでチームを安心させられる、頼れる守護役タイプです。",
    "ESTJ": "あなたのゲームセンスは「規律と段取り」です。目的・役割・次の行動をはっきりさせ、勝率を運任せから実力に変えられる、進行役タイプです。",
    "ESFJ": "あなたのゲームセンスは「場づくり」です。全員が気持ちよく遊べる空気を作り、「また集まりたい」とチームを長続きさせられるタイプです。",
    "ISTP": "あなたのゲームセンスは「現場対応力」です。説明より手の速さと状況判断で、崩れた局面を一人でひっくり返せる、土壇場で輝く職人タイプです。",
    "ISFP": "あなたのゲームセンスは「感覚と表現」です。理屈より「気持ちいい」動きを大切にし、ハマれば誰にも真似できない一手で場を沸かせる唯一無二タイプです。",
    "ESTP": "あなたのゲームセンスは「反応と度胸」です。考えるより速く動き、勝負どころを一瞬で嗅ぎ分けて飛び込める、最前線の起爆剤タイプです。",
    "ESFP": "あなたのゲームセンスは「盛り上げる力」です。勝っても負けても空気を明るく切り替え、ピンチでもチームを折れさせない、ムードメーカータイプです。",
}


def update_script_js():
    path = os.path.join(ROOT, "script.js")
    s = open(path, encoding="utf-8").read()
    n = 0
    for code, short in SHORT.items():
        pat = re.compile(r"(" + code + r": \{.*?summary: ')[^']*(')", re.S)
        s, c = pat.subn(lambda m: m.group(1) + short + m.group(2), s, count=1)
        if c != 1:
            print("WARN script.js summary no match:", code)
        else:
            n += 1
    open(path, "w", encoding="utf-8").write(s)
    print("script.js summaries updated:", n)


def update_pages():
    n = 0
    for code, short in SHORT.items():
        path = os.path.join(ROOT, f"gamer-mbti-{code.lower()}.html")
        s = open(path, encoding="utf-8").read()
        s2, c = re.subn(r'<p class="lead">[^<]*</p>',
                        f'<p class="lead">{short}</p>', s, count=1)
        if c != 1:
            print("WARN page lead no match:", code)
            continue
        open(path, "w", encoding="utf-8").write(s2)
        n += 1
    print("page leads updated:", n)


if __name__ == "__main__":
    update_script_js()
    update_pages()
