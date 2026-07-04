#!/usr/bin/env python3
"""購買意図の高い6ガイドへ Amazon カテゴリ検索リンクを冪等に追加する。

- 既存の .gear-link-list コンポーネント（gamesense.html と同型）を再利用
- 特定商品でなくカテゴリ検索リンク（&tag=jbmt-22）なので陳腐化しにくい
- 挿入位置は「次に読みたい関連ページ」カードの直前
- 併せて開示文を「本ページの製品リンクには…」の明示形に更新
"""
import urllib.parse

# page -> (kicker説明, [(icon, 検索語, 見出し, small, em理由), ...])
PLAN = {
    "gaming-chair-guide.html": (
        "座り心地は実物差が大きいので、候補の相場感をつかむ用途でどうぞ。",
        [
            ("user", "ゲーミングチェア ファブリック", "ファブリックのゲーミングチェア",
             "蒸れにくく長時間向き", "通気性は集中の持続に直結します。"),
            ("shield", "オフィスチェア メッシュ ランバーサポート", "メッシュ系オフィスチェア",
             "姿勢・腰サポート重視ならこちら", "腰の支えは疲れの出方を大きく変えます。"),
            ("spark", "ランバーサポート クッション", "ランバーサポートクッション",
             "今の椅子に足す選択肢", "買い替え前に姿勢だけ改善する手もあります。"),
        ],
    ),
    "gaming-earphone-guide.html": (
        "接続方式で絞ってから探すと選びやすくなります。",
        [
            ("headset", "ゲーミングイヤホン 有線", "有線ゲーミングイヤホン",
             "遅延ほぼゼロの定番", "3.5mm/USBは対戦でも安心の選択です。"),
            ("zap", "ワイヤレスイヤホン 2.4GHz 低遅延 ゲーム", "2.4GHz低遅延ワイヤレス",
             "ケーブルなしでも対戦向き", "対戦向け無線はドングル式が主流です。"),
            ("spark", "イヤーピース 低反発", "低反発イヤーピース",
             "装着感と遮音を底上げ", "手持ちイヤホンの強化にも使えます。"),
        ],
    ),
    "gaming-desk-setup-guide.html": (
        "環境改善は単価の小さい順に試すのがおすすめです。",
        [
            ("monitor", "モニターアーム", "モニターアーム",
             "高さ・距離を自由に調整", "目線の高さ合わせが姿勢改善の起点です。"),
            ("mouse", "大型 ゲーミング デスクマット", "大型デスクマット",
             "手首の負担を軽減", "マウス操作の再現性も上がります。"),
            ("shield", "リストレスト キーボード", "リストレスト",
             "手首の角度を保つ", "長時間プレイの疲れ対策に効きます。"),
        ],
    ),
    "gaming-pc-lifespan-guide.html": (
        "買い替え前の延命メンテに使える定番はこのあたりです。",
        [
            ("zap", "エアダスター PC", "エアダスター",
             "掃除で寿命を延ばす基本", "温度を下げる最重要メンテです。"),
            ("cpu", "内蔵SSD 2TB", "内蔵SSD（増設用）",
             "容量不足の解消に", "空き容量の確保は安定動作に直結します。"),
            ("shield", "PC電源ユニット 750W", "電源ユニット",
             "消耗した電源の交換に", "余裕のある容量が安定の土台になります。"),
        ],
    ),
    "game-lag-fix-guide.html": (
        "設定で直らない場合の物理的な対処はこのあたりが定番です。",
        [
            ("zap", "LANケーブル CAT6A", "有線LANケーブル（CAT6A）",
             "無線から有線への切り替えに", "回線の安定はラグ対策の基本です。"),
            ("shield", "エアダスター PC", "エアダスター",
             "発熱によるカクつき対策", "清掃による温度低下は効果が大きいです。"),
            ("cpu", "内蔵SSD", "内蔵SSD（増設用）",
             "空き不足・読み込み改善", "ストレージの余裕が安定を生みます。"),
        ],
    ),
    "gaming-monitor-settings-guide.html": (
        "設定を活かすには、ケーブルと設置も確認しておくと安心です。",
        [
            ("monitor", "DisplayPort ケーブル", "DisplayPortケーブル",
             "高リフレッシュの必須条件", "ケーブルが上限のボトルネックになることがあります。"),
            ("spark", "モニターアーム", "モニターアーム",
             "高さ・距離も最適化", "見やすさは設定と設置の両輪です。"),
        ],
    ),
}

ANCHOR = '          <div class="article-card">\n            <h2>次に読みたい関連ページ</h2>'

OLD_DISCLOSURE = "関連ガイドにはAmazonアソシエイトのリンクを含む場合があります。"
NEW_DISCLOSURE = (
    "本ページの製品リンクにはAmazonアソシエイト（tag=jbmt-22）を利用しており、"
    "リンク経由の購入で当サイトが収益を得る場合があります。"
    "価格・在庫は変動するため、最新情報は各製品ページでご確認ください。"
)


def amazon(q):
    return f"https://www.amazon.co.jp/s?k={urllib.parse.quote_plus(q)}&tag=jbmt-22"


def card(slug, lead, items):
    links = "\n".join(
        f'              <a href="{amazon(q)}" target="_blank" rel="noopener sponsored" data-affiliate="{slug}-{i}">\n'
        f'                <span><span data-icon="{icon}"></span>{title}</span>\n'
        f'                <small>{small}</small>\n'
        f'                <em>{em}</em>\n'
        f'              </a>'
        for i, (icon, q, title, small, em) in enumerate(items, 1)
    )
    return (
        '          <div class="article-card">\n'
        '            <p class="article-kicker">GEAR PICK</p>\n'
        '            <h2>候補をAmazonで探す</h2>\n'
        f'            <p>{lead}</p>\n'
        '            <div class="gear-link-list">\n'
        f'{links}\n'
        '            </div>\n'
        '          </div>\n'
    )


def main():
    changed = 0
    for page, (lead, items) in PLAN.items():
        html = open(page, encoding="utf-8").read()
        slug = page.replace(".html", "").replace("gaming-", "").replace("game-", "")
        if "gear-link-list" in html:
            print(f"  ok {page}: 既存スキップ")
            continue
        if ANCHOR not in html:
            print(f"  SKIP {page}: アンカーなし")
            continue
        html = html.replace(ANCHOR, card(slug, lead, items) + ANCHOR, 1)
        if OLD_DISCLOSURE in html:
            html = html.replace(OLD_DISCLOSURE, NEW_DISCLOSURE, 1)
        open(page, "w", encoding="utf-8").write(html)
        changed += 1
        print(f"  + {page}: リンク{len(items)}本追加・開示文更新")
    print(f"done: {changed} pages changed")


if __name__ == "__main__":
    main()
