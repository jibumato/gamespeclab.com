#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""デバイスガイドのFAQを拡充(冪等). schemaと可視FAQの両方に追記。

  python3 tools/expand_device_faq.py
"""
import os
import json
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

PAIRS = {
    "gaming-mouse-guide": [
        ("マウスの形は左右対称とエルゴ、どっちがいい？",
         "持ち方と手の大きさで選びます。つかみ・つまみ持ちや手が小さめなら左右対称、かぶせ持ちや手が大きめならエルゴノミクスが合いやすいです。"),
        ("ポーリングレートは高いほどいい？",
         "多くの場合1000Hzで十分です。4000/8000Hzは体感差が小さく、PC負荷が上がることもあるため、まず1000Hzで安定させるのがおすすめです。"),
    ],
    "gaming-keyboard-guide": [
        ("ゲーミングキーボードのサイズは何がいい？",
         "マウスを大きく振る人はテンキーレスや60%が省スペースで有利です。数字入力が多い人はフルサイズが快適です。"),
        ("磁気軸（ラピッドトリガー）は必要？",
         "競技FPSでは反応や連打で有利になりやすいです。普段使い中心なら一般的な軸でも十分実用的です。"),
    ],
    "gaming-headset-guide": [
        ("ヘッドセットとイヤホン＋マイク、どっちがいい？",
         "足音の定位や装着の安定感ならヘッドセット、軽さや長時間の快適さならイヤホンが向きます。FPSで音を重視するならヘッドセットが無難です。"),
        ("ワイヤレスとワイヤード、どちらがいい？",
         "遅延が気になるなら有線か低遅延無線を。最近の2.4GHz無線は実用上ほぼ問題なく、取り回しの良さで人気です。"),
    ],
    "gaming-mousepad-guide": [
        ("マウスパッドのサイズはどれくらいがいい？",
         "ローセンシで大きく振る人はLサイズ以上が安心です。デスクが狭いならMでも可。迷ったら大きめを選ぶと失敗しにくいです。"),
        ("布とハード（プラ・ガラス）どっちがいい？",
         "止めやすさとコスパなら布、滑りの速さと一貫性ならハード系です。多くの人は布のコントロール系が扱いやすいです。"),
    ],
    "gaming-controller-guide": [
        ("ホールエフェクトスティックは必要？",
         "スティックドリフト（勝手に入力される不具合）に強く、長く使うなら有利です。耐久性を重視する人におすすめです。"),
        ("背面ボタンは何に使う？",
         "ジャンプやスライディングなどを割り当て、親指をスティックから離さず操作できます。FPSやアクションで有利になりやすいです。"),
    ],
    "gaming-monitor-guide": [
        ("144Hzと240Hzの違いは？",
         "240Hzはより滑らかで残像が少なく、上級者ほど恩恵を感じやすいです。多くの人はまず144Hzでも体感が大きく変わります。"),
        ("FPSにおすすめのサイズ・解像度は？",
         "競技FPSは視野を把握しやすい24〜25インチのフルHDまたはWQHD・高リフレッシュが定番です。没入感重視なら27インチWQHDも選択肢です。"),
    ],
}


def add_schema(s, pairs):
    fi = s.find('"FAQPage"')
    mi = s.find('"mainEntity": [', fi)
    ci = s.find('\n            ]', mi)   # 12-space close of mainEntity
    add = "".join(
        ',\n              {\n'
        '                "@type": "Question",\n'
        f'                "name": "{q}",\n'
        '                "acceptedAnswer": { "@type": "Answer", '
        f'"text": "{a}" }}\n'
        '              }'
        for q, a in pairs)
    return s[:ci] + add + s[ci:]


def add_visible(s, pairs):
    hi = s.find('よくある質問</h2>')
    gi = s.find('<div class="article-pair-grid">', hi)
    gc = s.find('\n            </div>', gi)   # grid close (12-space)
    add = "".join(
        f'\n            <div><strong>{q}</strong><p>{a}</p></div>'
        for q, a in pairs)
    return s[:gc] + add + s[gc:]


def main():
    n = 0
    for slug, pairs in PAIRS.items():
        path = os.path.join(ROOT, f"{slug}.html")
        s = open(path, encoding="utf-8").read()
        if pairs[0][0] in s:
            print("  skip:", slug)
            continue
        s = add_schema(s, pairs)
        s = add_visible(s, pairs)
        # validate JSON-LD before writing
        m = re.search(r'<script type="application/ld\+json">(.*?)</script>',
                      s, re.DOTALL)
        json.loads(m.group(1))
        s = re.sub(r'"dateModified": "[0-9-]*"', '"dateModified": "2026-06-21"', s)
        s = re.sub(r'"dateModified":"[0-9-]*"', '"dateModified":"2026-06-21"', s)
        open(path, "w", encoding="utf-8").write(s)
        print("  +2 FAQ:", slug)
        n += 1
    print("device guides FAQ expanded:", n)


if __name__ == "__main__":
    main()
