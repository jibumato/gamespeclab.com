#!/usr/bin/env python3
"""デバイスガイドの商品カードに「プロ使用実績」行を冪等に追加する。

- 2026年7月時点の公開情報（ProSettings集計・大会採用実績・国内VCJの
  使用状況まとめ）で確認できた、確度の高い実績のみを記載
- 断定できない選手個人名は避け、集計・チーム・大会レベルの事実に留める
- 挿入位置は各 device-pick の spec-table 直後（device-review の前）
"""

# (file, h3の一意な部分文字列, プロ使用テキスト)
PLAN = [
    # マウス
    ("gaming-mouse-guide.html", "Logicool G PRO X SUPERLIGHT 2",
     "VALORANTプロの使用率2強のひとつ。MIBRのaspas選手ら世界のトップFPSプロが使用。"),
    ("gaming-mouse-guide.html", "Razer Viper V3 Pro",
     "ProSettings集計（VALORANTプロ600名超）で使用率No.1。現行プロシーンの最多採用マウス。"),
    ("gaming-mouse-guide.html", "Razer DeathAdder V3 Pro",
     "エルゴ（左右非対称）形状ではプロの定番。CS・VALORANTのかぶせ持ちプロに愛用者多数。"),
    # キーボード
    ("gaming-keyboard-guide.html", "Wooting 60HE",
     "ラピッドトリガーの火付け役。国内VCJプロ（ZETA・DFMの主力選手ら）で採用率最多クラス。"),
    ("gaming-keyboard-guide.html", "SteelSeries Apex Pro TKL Gen 3",
     "国内外のVALORANT・FPSプロに使用者多数。磁気軸の2大定番のひとつ。"),
    ("gaming-keyboard-guide.html", "Logicool G PRO X TKL",
     "Logicool Gがプロ選手と共同開発したエスポーツライン。大会シーンでの使用例多数。"),
    # ヘッドセット
    ("gaming-headset-guide.html", "Razer BlackShark V2 Pro",
     "eスポーツプロと共同設計。CSのNiKo選手ら世界のFPSプロが使用する競技の定番。"),
    ("gaming-headset-guide.html", "Logicool G PRO X2 LIGHTSPEED",
     "Logicool Gのプロ共同開発ライン。VALORANT・OWの大会シーンで使用例多数。"),
    # マウスパッド
    ("gaming-mousepad-guide.html", "ARTISAN NINJA FX 零",
     "日本製でプロ人気が特に高く、国内VALORANTプロ・配信者に愛用者多数。"),
    ("gaming-mousepad-guide.html", "SteelSeries QcK Heavy",
     "eスポーツ黎明期からの超定番。CS系プロの使用実績が最も長いシリーズ。"),
    ("gaming-mousepad-guide.html", "Logicool G840 / G640",
     "G640は「長年のプロ標準」と呼ばれた定番。多くのプロがここから調整を始める基準面。"),
]

LINE = ('              <p class="pro-use"><span data-icon="trophy"></span>'
        'プロ使用実績：{text}</p>\n')


def main():
    changed = {}
    for path, key, text in PLAN:
        html = open(path, encoding="utf-8").read()
        i = html.find(f"<h3>{key}")
        if i == -1:
            print(f"  SKIP {path}: h3「{key}」なし")
            continue
        # このカードの spec-table 閉じタグを探す
        j = html.find("</dl>", i)
        if j == -1:
            print(f"  SKIP {path}: {key} のspec-tableなし")
            continue
        insert_at = j + len("</dl>") + 1  # 改行の後
        # 冪等: このカード近傍に既に pro-use があるか
        if 'class="pro-use"' in html[i:insert_at + 200]:
            print(f"  ok {path}: {key} 既存スキップ")
            continue
        html = html[:insert_at] + LINE.format(text=text) + html[insert_at:]
        open(path, "w", encoding="utf-8").write(html)
        changed[path] = changed.get(path, 0) + 1
        print(f"  + {path}: {key}")
    print("done:", changed)


if __name__ == "__main__":
    main()
