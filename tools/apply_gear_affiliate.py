#!/usr/bin/env python3
"""購買意図の高い6ガイドへ Amazon 商品検索リンクを冪等に追加する。

- 既存の .gear-link-list コンポーネント（gamesense.html と同型）を再利用
- 2026年7月時点の市場調査（Amazon売れ筋・比較メディアの評価）に基づき、
  カテゴリ名だけの汎用検索ではなく、ブランド＋型番を指定した商品名検索にする
  （検索結果1位が該当商品になり、探す手間を省ける）
- 挿入位置は「次に読みたい関連ページ」カードの直前
- 併せて開示文を「本ページの製品リンクには…」の明示形に更新
"""
import urllib.parse

# page -> (kicker説明, [(icon, 検索語, 見出し, small, em理由), ...])
PLAN = {
    "gaming-chair-guide.html": (
        "座り心地は実物差が大きいですが、2026年時点で評価の高い候補を挙げておきます。",
        [
            ("user", "GTPLAYER ファブリック ゲーミングチェア ポケットコイル", "GTPLAYER ファブリック（ポケットコイル）",
             "Amazon売れ筋上位・蒸れにくい", "座面にポケットコイルを使い体圧を分散。通気性も良く長時間向きです。"),
            ("shield", "EdoErgo メッシュ オフィスチェア H-WY01", "EdoErgo メッシュオフィスチェア",
             "ランバーサポート付き・省スペース", "背もたれ＆座面メッシュで蒸れにくく、腰サポートも内蔵した入門機です。"),
            ("spark", "ottostyle.jp 高反発 ランバーサポートクッション", "ottostyle.jp ランバーサポートクッション",
             "今の椅子に足す選択肢", "高反発ウレタンの立体カーブが腰にフィット。買い替え前の改善に。"),
        ],
    ),
    "gaming-earphone-guide.html": (
        "2026年時点で評価の高い、接続方式別のモデルをまとめました。",
        [
            ("headset", "SONY IER-G900W ゲーミングイヤホン", "SONY IER-G900W",
             "Fnatic監修のFPS向け有線機", "FPS向けEQプリセットと高い遮音性で、足音を正確に拾えます。"),
            ("zap", "SONY INZONE Buds 2.4GHz ワイヤレス", "SONY INZONE Buds",
             "PC/PS5対応の低遅延ワイヤレス", "専用ドングルで2.4GHz低遅延接続。ケーブルなしでも対戦向きです。"),
            ("spark", "Comply フォームチップス イヤーピース", "Comply フォームチップス",
             "装着感と遮音を底上げ", "低反発ウレタンが耳穴にフィットし、遮音性と装着感が上がります。"),
        ],
    ),
    "gaming-desk-setup-guide.html": (
        "2026年時点で評価の高い、価格帯別の候補です。",
        [
            ("monitor", "エルゴトロン LX デスクマウントアーム 45-241-224", "エルゴトロン LX デスクマウントアーム",
             "人気売れ筋1位・少ない力で調整", "特許のConstant Forceで、どの方向へもスムーズに位置調整できます。"),
            ("mouse", "ロジクール G G840 XL ゲーミングデスクマット", "ロジクール G G840",
             "900×400mmの大判サイズ", "厚さ3mmのクッションで手首の負担を軽減し、マウス操作も再現しやすくなります。"),
            ("shield", "HyperX Wrist Rest リストレスト", "HyperX Wrist Rest",
             "クールジェルで熱がこもらない", "低反発クッション＋ジェルの冷涼感で、長時間のタイピングでも快適です。"),
        ],
    ),
    "gaming-pc-lifespan-guide.html": (
        "買い替え前の延命メンテに使える、2026年時点で評価の高い定番はこのあたりです。",
        [
            ("zap", "サンワサプライ 電動エアダスター", "サンワサプライ 電動エアダスター",
             "ガス缶不要・繰り返し使える", "充電式で温度を下げる最重要メンテがいつでもできます。"),
            ("cpu", "WD_Black SN7100 2TB NVMe SSD", "WD_Black SN7100 2TB",
             "容量不足の解消に", "ゲーミング向けの高耐久ラインで、空き容量の確保は安定動作に直結します。"),
            ("shield", "玄人志向 KRPW-GA750W/90+ 80PLUS GOLD", "玄人志向 KRPW-GA750W/90+",
             "750W・80PLUS GOLD認証", "消耗した電源の交換に。余裕のある容量が安定の土台になります。"),
        ],
    ),
    "game-lag-fix-guide.html": (
        "設定で直らない場合の物理的な対処に、2026年時点で評価の高い定番はこのあたりです。",
        [
            ("zap", "サンワサプライ カテゴリ6A LANケーブル 細径メッシュ", "サンワサプライ CAT6A LANケーブル",
             "無線から有線への切り替えに", "10G対応・つめ折れ防止で、回線の安定はラグ対策の基本です。"),
            ("shield", "サンワサプライ 電動エアダスター", "サンワサプライ 電動エアダスター",
             "発熱によるカクつき対策", "充電式で繰り返し使え、清掃による温度低下は効果が大きいです。"),
            ("cpu", "WD_Black SN7100 2TB NVMe SSD", "WD_Black SN7100 2TB",
             "空き不足・読み込み改善", "ゲーミング向け高耐久SSD。ストレージの余裕が安定を生みます。"),
        ],
    ),
    "gaming-monitor-settings-guide.html": (
        "設定を活かすには、2026年時点で評価の高いケーブル・設置機材も確認しておくと安心です。",
        [
            ("monitor", "UGREEN ゲーミング 8K DisplayPortケーブル", "UGREEN 8K DisplayPortケーブル",
             "4K@144Hz/2K@240Hz対応・VESA認証", "高リフレッシュはケーブルが上限になりがち。規格対応品を選びましょう。"),
            ("spark", "エルゴトロン LX デスクマウントアーム 45-241-224", "エルゴトロン LX デスクマウントアーム",
             "高さ・距離も最適化", "見やすさは設定と設置の両輪。人気売れ筋1位のモニターアームです。"),
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
