#!/usr/bin/env python3
"""16タイプページに「強みを支える一品」カードを冪等に追加する。

- 各ページ1リンクのみの控えめな文脈型（役割データに基づくカテゴリ検索）
- tag=jbmt-22 / rel=sponsored / data-affiliate=mbti-<type>
- カード内に広告注記を含める（compare-hint）
- 挿入位置は OTHER TYPES カードの直前
"""
import urllib.parse

# type -> (icon, 検索語, 見出し, small, 理由em, リード文)
# 2026年7月時点の市場調査に基づき、ブランド＋型番を指定した商品名検索にしている
# （既存の7デバイスガイドで比較検証済みの型番は再利用し、全ページで推薦を統一）
GEAR = {
    "ENFJ": ("headset", "Razer BlackShark V2 Pro 2023 ゲーミングヘッドセット",
             "Razer BlackShark V2 Pro（2023）", "指示と鼓舞はクリアな声から",
             "IGL・モチベ管理型は、聞き取りやすい声がチームの安心感になります。",
             "旗手型の武器は「伝わる声」。通話の質は積極的に投資する価値があります。"),
    "ENFP": ("mouse", "Logicool G PRO X SUPERLIGHT 2",
             "Logicool G PRO X SUPERLIGHT 2", "ひらめきを即、動きに変える",
             "フランカー型の武器は機動力。軽さは発想の速さに追従します。",
             "冒険家型の立ち回りは軽さが命。手の中の自由度を上げましょう。"),
    "ENTJ": ("monitor", "ASUS TUF Gaming VG249QML5A 240Hz",
             "ASUS TUF Gaming VG249QML5A", "戦場全体を正確に把握する",
             "司令塔は情報の鮮度が生命線。滑らかな画面は判断の質を上げます。",
             "コマンダー型の判断力は、入ってくる情報の質で決まります。"),
    "ENTP": ("mouse", "Razer Naga V2 Pro 多ボタンマウス",
             "Razer Naga V2 Pro", "奇策の引き出しを増やす",
             "キー割当の自由度は、メタ破壊の実験場になります。",
             "革命家型の発想は、19+1ボタンの割り当て数だけ広がります。"),
    "ESFJ": ("chat", "HyperX QuadCast 2 USBマイク",
             "HyperX QuadCast 2", "通話のホストは声が資本",
             "聞き取りやすい声は、PTの居心地を大きく左右します。",
             "宮廷官型の場づくりは、まず自分の声を整えることから。"),
    "ESFP": ("monitor", "Samsung Odyssey G5 27インチ WQHD 湾曲 ゲーミングモニター",
             "Samsung Odyssey G5（27インチ湾曲）", "祝祭の臨場感を最大化",
             "視界を包む湾曲画面は、先陣役の没入と勢いを支えます。",
             "先陣役型の勢いは、1000R湾曲パネルの迫力からも生まれます。"),
    "ESTJ": ("monitor", "ASUS TUF Gaming VG27AQ5A WQHD",
             "ASUS TUF Gaming VG27AQ5A", "情報量で進行を管理する",
             "高解像度の広い視界は、目標管理と進行役の把握力を支えます。",
             "実戦指揮官型の規律は、見えている情報の広さに支えられます。"),
    "ESTP": ("zap", "SteelSeries Apex Pro TKL Gen 3",
             "SteelSeries Apex Pro TKL Gen 3", "瞬間の入力を最速に",
             "エントリーの一歩目は入力速度から。磁気軸の即応性が武器になります。",
             "電撃アサルト型の武器は初速。入力の遅れをゼロに近づけましょう。"),
    "INFJ": ("headset", "SteelSeries Arctis Nova Pro Wireless",
             "SteelSeries Arctis Nova Pro Wireless", "音から未来を読む",
             "足音の方向と距離は、預言者型の先読みに直結する情報源です。",
             "預言者型の読みは、音の解像度が上がるほど鋭くなります。"),
    "INFP": ("user", "GTPLAYER ファブリック ゲーミングチェア ポケットコイル",
             "GTPLAYER ファブリック（ポケットコイル）", "長い旅路を快適に",
             "探索とまったり協力が好きな巡礼者型は、座り心地が体験の質そのもの。",
             "巡礼者型の物語は長い。旅の拠点を快適にしておきましょう。"),
    "INTJ": ("target", "Logicool G840 XL ゲーミングマウスパッド",
             "Logicool G840 XL", "精密な狙いの再現性を作る",
             "スナイパー・終盤判断型は、同じ操作を同じ精度で再現できる環境が武器です。",
             "軍師型の設計図は、ブレない操作環境の上でこそ機能します。"),
    "INTP": ("cpu", "REALFORCE GX1 静音キーボード",
             "REALFORCE GX1", "長時間の研究・検証に",
             "ビルド研究と攻略検証が長い研究者型は、疲れにくい静かな入力環境が効きます。",
             "研究者型の集中は環境音に敏感。トップクラスの静音性で雑音を減らしましょう。"),
    "ISFJ": ("headset", "HyperX Cloud Stinger 2 ゲーミングヘッドセット",
             "HyperX Cloud Stinger 2", "長時間の後衛サポートでも疲れない",
             "カバー役は試合を通して音を聞き続ける役割。軽さは集中の持続力です。",
             "守護騎士型の献身は長丁場。装備の軽さが優しさを支えます。"),
    "ISFP": ("headset", "SONY IER-G900W ゲーミングイヤホン",
             "SONY IER-G900W", "軽やかに音を拾う",
             "魅せプレイと機動力の吟遊詩人型には、軽くて遅延のない音環境が合います。",
             "吟遊詩人型の感性は、身軽な装備でこそ自由に動きます。"),
    "ISTJ": ("cpu", "Logicool G PRO X TKL ゲーミングキーボード",
             "Logicool G PRO X TKL", "定位置で正確な操作を繰り返す",
             "省スペースでマウス可動域を確保。毎回同じ配置が記録官型の安定を生みます。",
             "記録官型の強みは再現性。操作環境も毎回同じに保ちましょう。"),
    "ISTP": ("mouse", "Razer Viper V3 Pro",
             "Razer Viper V3 Pro", "一瞬の精度を研ぎ澄ます",
             "クラッチ役の勝負所は一瞬。8Kポーリングの解像度がそのまま武器になります。",
             "剣豪型の一太刀は、道具の精度で切れ味が変わります。"),
}

ANCHOR = ('          <div class="article-card">\n'
          '            <p class="article-kicker">OTHER TYPES</p>')


def amazon(q):
    return f"https://www.amazon.co.jp/s?k={urllib.parse.quote_plus(q)}&tag=jbmt-22"


def card(t):
    icon, q, title, small, em, lead = GEAR[t]
    return (
        '          <div class="article-card">\n'
        '            <p class="article-kicker">ROLE GEAR</p>\n'
        '            <h2>このタイプの強みを支える一品</h2>\n'
        f'            <p>{lead}</p>\n'
        '            <div class="gear-link-list">\n'
        f'              <a href="{amazon(q)}" target="_blank" rel="noopener sponsored" data-affiliate="mbti-{t.lower()}">\n'
        f'                <span><span data-icon="{icon}"></span>{title}</span>\n'
        f'                <small>{small}</small>\n'
        f'                <em>{em}</em>\n'
        '              </a>\n'
        '            </div>\n'
        '            <p class="compare-hint">※リンクはAmazonアソシエイト（広告）を利用しています。詳しくは<a href="affiliate-disclosure.html">広告表記</a>へ。</p>\n'
        '          </div>\n'
    )


def main():
    changed = 0
    for t in GEAR:
        p = f"gamer-mbti-{t.lower()}.html"
        html = open(p, encoding="utf-8").read()
        if "ROLE GEAR" in html:
            print(f"  ok {p}: 既存スキップ")
            continue
        if ANCHOR not in html:
            print(f"  SKIP {p}: アンカーなし")
            continue
        html = html.replace(ANCHOR, card(t) + ANCHOR, 1)
        open(p, "w", encoding="utf-8").write(html)
        changed += 1
        print(f"  + {p}: ROLE GEAR追加（{GEAR[t][2]}）")
    print(f"done: {changed} pages changed")


if __name__ == "__main__":
    main()
