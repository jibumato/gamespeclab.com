#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""ゲーミングデバイス(マウス/キーボード/ヘッドセット)の深掘りおすすめページを生成.

価格.com・各レビューサイトの評価をもとに、製品ごとに詳細スペック(重量・寸法・
センサー/スイッチ・接続・バッテリー等)と使い心地レビューをまとめた静的ページ。
Amazonアソシエイト(検索リンク, tag=jbmt-22)付き。

  python3 tools/build_device_guides.py
"""
import os
from urllib.parse import urlencode

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TAG = "jbmt-22"
VER = "deep122"
TODAY = "2026-06-19"

GTM_HEAD = """    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-TVV88Q6L');</script>
    <!-- End Google Tag Manager -->
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-FZRP7SHMG7"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-FZRP7SHMG7');
    </script>"""
GTM_NOSCRIPT = """
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TVV88Q6L"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->"""
BASE = "https://gamespeclab.com"

# デバイス横断ナビ(全ガイド)
DEVICE_NAV = [
    ("gaming-monitor-guide.html", "モニター", "高Hz・解像度・パネルで選ぶ"),
    ("gaming-mouse-guide.html", "マウス", "重量・センサー・形状で選ぶ"),
    ("gaming-keyboard-guide.html", "キーボード", "磁気軸・ラピッドトリガーで選ぶ"),
    ("gaming-headset-guide.html", "ヘッドセット", "定位・装着感・接続で選ぶ"),
    ("gaming-mousepad-guide.html", "マウスパッド", "素材・タイプ・サイズで選ぶ"),
    ("gaming-controller-guide.html", "コントローラー", "スティック方式・背面ボタンで選ぶ"),
]


def amz(query):
    return "https://www.amazon.co.jp/s?" + urlencode({"k": query, "tag": TAG})


# ---- 各デバイスの定義 -------------------------------------------------------
# product = dict(name, q, specs=[(label, value)...], review)
def P(name, q, specs, review):
    return {"name": name, "q": q, "specs": specs, "review": review}


MOUSE = {
    "slug": "gaming-mouse-guide",
    "icon": "mouse",
    "eyebrow": "GAMING MOUSE GUIDE",
    "h1": "ゲーミングマウスおすすめ",
    "h1sub": "重量・センサー・形状から選ぶ、深掘り比較ガイド",
    "title": "ゲーミングマウスおすすめ｜重量・センサー・形状で選ぶ詳細比較 | GameSpec Lab",
    "desc": "価格.com等のレビューをもとに、ゲーミングマウスを重量(g)・サイズ・センサー・接続まで詳細スペックで比較。軽量左右対称からエルゴ、コスパまで用途別に解説します。",
    "lead": "FPSではマウスの軽さと素直な動きが、判断をそのままプレイへ変える速さに直結します。"
            "まず「重量・形状(持ち方)・センサー/ポーリング・接続」の4点を押さえると失敗しにくくなります。",
    "axes": [
        ("重量", [("〜50g台", "振り向きが速く疲れにくい。競技志向の主流。"),
                  ("60g前後", "軽さと安定感のバランス。万能。"),
                  ("80g以上", "ずっしり安定。低感度・置きエイム派にも。")]),
        ("形状・サイズ", [("左右対称", "つまみ・つかみ持ちと相性。万人向け。"),
                          ("エルゴ", "かぶせ持ち・大きめの手にフィット。"),
                          ("小型", "手が小さい人やつまみ持ちに。")]),
        ("センサー・接続", [("光学センサー", "DPI/IPSが高いほど高速移動に強い。"),
                            ("ポーリングレート", "1000Hz標準。4K/8Kで更に低遅延。"),
                            ("無線(LIGHTSPEED等)", "今や有線並みの低遅延が主流。")]),
    ],
    "cats": [
        {"kicker": "LIGHTWEIGHT SYMMETRICAL", "h2": "① 軽量・左右対称（競技の主流）",
         "lead": "つまみ・つかみ持ちと相性が良く、プロ採用率も高い王道。迷ったらこの2機種から。",
         "items": [
            P("Logicool G PRO X SUPERLIGHT 2",
              "Logicool G PRO X SUPERLIGHT 2",
              [("重量", "約60g"), ("サイズ", "125 × 63.5 × 40mm（左右対称）"),
               ("センサー", "HERO 2（最大32,000DPI / 500IPS / 40G）"),
               ("スイッチ", "ハイブリッド光学メカ"),
               ("接続・ポーリング", "LIGHTSPEED 2.4GHz / 最大2,000Hz / 遅延0.5ms"),
               ("バッテリー", "最大95時間")],
              "プロシーンで最も見かける定番。クセの少ない形状で持ち方を選ばず、"
              "軽さ・安定感・ソフトウェアの完成度のバランスが高い。長く使える「外さない一台」。"),
            P("Razer Viper V3 Pro",
              "Razer Viper V3 Pro",
              [("重量", "約54g（±1g）"), ("サイズ", "125 × 63.5 × 40mm（左右対称）"),
               ("センサー", "Focus Pro 35K Gen2（35,000DPI / 750IPS / 70G）"),
               ("スイッチ", "第3世代光学スイッチ"),
               ("接続・ポーリング", "HyperPolling同梱で最大8,000Hz"),
               ("バッテリー", "最大95時間")],
              "現行でも屈指の軽さに8,000Hzポーリングを組み合わせた競技特化。"
              "ハイエンドPC＋高Hzモニターと合わせると、反応の限界を一段引き上げたい人に刺さる。"),
         ]},
        {"kicker": "ERGONOMIC", "h2": "② エルゴノミクス（かぶせ持ち・大きめの手）",
         "lead": "手のひら全体で支えるかぶせ持ちや、手が大きい人にフィットする右手用形状。",
         "items": [
            P("Razer DeathAdder V3 Pro",
              "Razer DeathAdder V3 Pro",
              [("重量", "約63g"), ("サイズ", "128 × 68 × 44mm（右手用エルゴ）"),
               ("センサー", "Focus Pro 30K/35K"),
               ("接続・ポーリング", "2.4GHz / 別売ドングルで最大8,000Hz"),
               ("バッテリー", "最大90時間")],
              "名作エルゴの最軽量級。先代88gから約30%軽量化しつつ握り心地の評価も高く、"
              "「軽いのに安定して掴める」と評価が高い。かぶせ持ちなら第一候補。"),
         ]},
        {"kicker": "COMPACT", "h2": "③ 小型・超軽量（手が小さい人・つまみ持ち）",
         "lead": "本体が小さく軽いほど、つまみ持ちや細かいエイム調整がしやすくなります。",
         "items": [
            P("ASUS ROG Harpe Ace（Aim Lab Edition / Mini）",
              "ASUS ROG Harpe Ace Aim Lab Edition",
              [("重量", "Aim Lab Edition 約54g / Mini 約49g"),
               ("センサー", "ROG AimPoint Pro（最大42,000DPI）"),
               ("接続・ポーリング", "2.4GHz / Bluetooth / 有線（最大8,000Hz対応）"),
               ("形状", "やや小さめの左右対称")],
              "プロFPSプレイヤー監修の小型軽量モデル。Miniはさらに小さく、"
              "手が小さい人やつまみ持ちで「マウスが大きすぎる」と感じていた人に好相性。"),
         ]},
        {"kicker": "BUDGET", "h2": "④ コスパ入門（はじめての無線）",
         "lead": "まず無線の軽快さを体験したい人向け。数千円でも競技に通用する性能です。",
         "items": [
            P("Logicool G304（G304rWH）",
              "Logicool G304 LIGHTSPEED ワイヤレス",
              [("重量", "約99g（単三電池込み）"),
               ("センサー", "HERO（最大12,000DPI）"),
               ("接続・ポーリング", "LIGHTSPEED 2.4GHz / 1,000Hz / 遅延1ms"),
               ("バッテリー", "単三1本で最大250時間")],
              "3,000〜4,000円台で「安くてもFPSでちゃんと使える無線」の定番。"
              "やや重めだが反応は十分速く、初めての一台や予備機として鉄板。"),
         ]},
    ],
    "sense": [
        ("判断速度", "軽量＋高ポーリング＋低遅延無線で、狙ってから動かすまでのズレを最小化。"),
        ("空間把握・エイム", "自分の手に合う形状とサイズが、振り向きや追いエイムの再現性を高めます。"),
    ],
    "faqs": [
        ("ゲーミングマウスの重さはどれくらいが良い？",
         "FPSなど素早い操作中心なら60g前後〜50g台の軽量モデルが主流です。安定感を重視するなら70〜90gも選択肢になります。"),
        ("有線と無線、どちらが良い？",
         "現在のLIGHTSPEEDやHyperSpeedなどの無線は有線並みに低遅延で、ケーブルの抵抗がないぶん快適です。競技でも無線が主流になっています。"),
    ],
}

KEYBOARD = {
    "slug": "gaming-keyboard-guide",
    "icon": "keyboard",
    "eyebrow": "GAMING KEYBOARD GUIDE",
    "h1": "ゲーミングキーボードおすすめ",
    "h1sub": "磁気軸・ラピッドトリガーを軸にした深掘り比較ガイド",
    "title": "ゲーミングキーボードおすすめ｜磁気軸・ラピッドトリガーで選ぶ詳細比較 | GameSpec Lab",
    "desc": "価格.com等のレビューをもとに、ゲーミングキーボードをスイッチ方式・アクチュエーション・ラピッドトリガー・サイズまで詳細に比較。磁気軸の本命からコスパ機まで解説します。",
    "lead": "近年の主役は、押し込み量を可変にできる磁気軸（ホール効果）とラピッドトリガー。"
            "キーを離した瞬間に入力がリセットされ、素早い切り返しがしやすくなります。"
            "「スイッチ方式・アクチュエーション・サイズ・静音性」で選びましょう。",
    "axes": [
        ("スイッチ方式", [("磁気軸(ホール効果)", "押下量を可変。ラピッドトリガーの本命。"),
                          ("アナログ光学", "磁気軸同様にアナログ入力・高速反応。"),
                          ("メカニカル", "打鍵感と種類が豊富。静音軸も選べる。")]),
        ("ラピッドトリガー", [("アクチュエーション可変", "0.1〜4.0mmで深さを調整。"),
                              ("リセットが動的", "離した瞬間に入力解除、連打や切返しに強い。"),
                              ("ラピッドタップ/SOCD", "左右同時押しの処理で移動が安定。")]),
        ("サイズ・静音", [("TKL/60%", "省スペースでマウス可動域を確保。"),
                          ("フルサイズ", "テンキー作業も多い人向け。"),
                          ("静音性", "60dB以下ならボイスチャットに乗りにくい。")]),
    ],
    "cats": [
        {"kicker": "RAPID TRIGGER FLAGSHIP", "h2": "① ラピッドトリガーの本命（磁気軸）",
         "lead": "切り返しの速さで差が出る競技FPS向け。調整幅と完成度で選ぶならこの2台。",
         "items": [
            P("Wooting 60HE / 80HE",
              "Wooting 60HE",
              [("スイッチ", "Lekker 磁気軸（ホール効果・アナログ）"),
               ("アクチュエーション", "0.1〜4.0mm 可変 / ラピッドトリガー"),
               ("サイズ", "60HE＝60% / 80HE＝80%"),
               ("特徴", "ラピッドトリガーの先駆け。アナログ入力・SOCD対応")],
              "ラピッドトリガー普及の立役者で、ゲーム性能の評価が非常に高い基準機。"
              "80HEはエンスージアスト向けの打鍵チューンが施され、静かで打ち心地も良好。"),
            P("SteelSeries Apex Pro TKL Gen 3",
              "SteelSeries Apex Pro TKL Gen 3",
              [("スイッチ", "OmniPoint 3.0 ハイパーマグネティック"),
               ("アクチュエーション", "0.1〜4.0mm / 40段階 / ラピッドトリガー"),
               ("機能", "ラピッドタップ(SOCD)・保護モード・OLED画面"),
               ("仕様", "TKL / PBTキーキャップ / USB-C")],
              "調整幅・機能・耐久のバランスが高水準。OLEDで設定確認ができ、"
              "FPS以外の用途も含めて「全部入りで失敗したくない人」に向く完成度。"),
         ]},
        {"kicker": "MAINSTREAM", "h2": "② 主流の完成形（アナログ光学）",
         "lead": "磁気軸の対抗格。アナログ光学スイッチで高速反応と耐久を両立します。",
         "items": [
            P("Razer Huntsman V3 Pro TKL",
              "Razer Huntsman V3 Pro TKL",
              [("スイッチ", "アナログ光学スイッチ"),
               ("アクチュエーション", "0.1〜4.0mm 可変 / ラピッドトリガー"),
               ("耐久", "1億回キーストローク"),
               ("サイズ", "TKL")],
              "ラピッドトリガー対応の主流モデルで、立て付けの良さと打鍵感に定評。"
              "Wootingと比較されることが多く、入手性とサポートを重視するなら有力。"),
         ]},
        {"kicker": "MECHANICAL FEEL", "h2": "③ 打鍵感・静音重視（メカニカル）",
         "lead": "磁気軸でなく、確かな打鍵感やタイピングの心地よさも大事にしたい人向け。",
         "items": [
            P("Logicool G PRO X TKL",
              "Logicool G PRO X TKL ゲーミングキーボード",
              [("スイッチ", "GXメカニカル（リニア/タクタイル/クリッキー）"),
               ("接続", "LIGHTSPEED 2.4GHz / Bluetooth / 有線"),
               ("サイズ", "TKL / メディアコントロール"),
               ("特徴", "無線対応・eスポーツ定番の堅実機")],
              "ラピッドトリガーは非搭載だが、打鍵感の良さと無線の取り回しで根強い人気。"
              "「ゲームも普段使いも一台で気持ちよく」という層に合う。"),
         ]},
        {"kicker": "BUDGET", "h2": "④ コスパで磁気軸を試す",
         "lead": "まず磁気軸・ラピッドトリガーを体験したい人向け。1万円前後から選べます。",
         "items": [
            P("磁気軸・ラピッドトリガー（CAROTMAS / AIM1瞬 など）",
              "磁気軸 ラピッドトリガー ゲーミングキーボード",
              [("スイッチ", "磁気軸（ホール効果）"),
               ("アクチュエーション", "可変 / ラピッドトリガー対応"),
               ("価格帯", "約8,000〜15,000円"),
               ("注意", "2万円以上のモデルより軸のブレや作りは控えめ")],
              "格安帯でも磁気軸・ラピッドトリガーを体験できるモデルが増加。"
              "まず効果を試して、必要なら上位機へ乗り換える入口として現実的。"),
         ]},
    ],
    "sense": [
        ("判断速度", "ラピッドトリガーと浅いアクチュエーションで、入力と切り返しの遅れを削減。"),
        ("操作の安定", "SOCD/ラピッドタップ対応なら、左右同時押し時の移動が暴れにくくなります。"),
    ],
    "faqs": [
        ("ラピッドトリガーは本当に効果ある？",
         "キーを離した瞬間に入力がリセットされるため、左右の切り返しや細かい連打がしやすくなります。特にFPSのストレイフで体感差が出やすい機能です。"),
        ("磁気軸とメカニカルはどちらが良い？",
         "反応速度や調整幅を最優先するなら磁気軸、打鍵感の好みや価格を重視するならメカニカルが向きます。用途で選び分けるのがおすすめです。"),
    ],
}

HEADSET = {
    "slug": "gaming-headset-guide",
    "icon": "headset",
    "eyebrow": "GAMING HEADSET GUIDE",
    "h1": "ゲーミングヘッドセットおすすめ",
    "h1sub": "定位・装着感・接続から選ぶ深掘り比較ガイド",
    "title": "ゲーミングヘッドセットおすすめ｜定位・装着感・接続で選ぶ詳細比較 | GameSpec Lab",
    "desc": "価格.com等のレビューをもとに、ゲーミングヘッドセットをドライバー・重量・接続・バッテリー・定位性能まで詳細に比較。FPS向けの本命から最上位、コスパまで解説します。",
    "lead": "ヘッドセットの肝は「定位」——どの方向・距離から音が来るかを瞬時に掴めるかです。"
            "状況認識を音から底上げできます。「定位/音の解像度・装着感(重量)・接続/バッテリー・マイク」で選びましょう。",
    "axes": [
        ("定位・音", [("足音の解像度", "高域がクリアだと足音や位置が掴みやすい。"),
                      ("空間オーディオ", "7.1や3D空間音響で前後左右を把握。"),
                      ("バランス", "低音過多だと足音が埋もれやすい点に注意。")]),
        ("装着感・重量", [("〜300g前後", "長時間でも疲れにくい軽量帯。"),
                          ("側圧・イヤパッド", "メガネ併用や長時間は緩めが快適。"),
                          ("通気性", "蒸れにくい素材だと集中が続く。")]),
        ("接続・マイク", [("無線2.4GHz", "低遅延でケーブルの煩わしさなし。"),
                          ("バッテリー", "長いほど充電を気にせず使える。"),
                          ("マイク品質", "通話やVCの聞き取りやすさに直結。")]),
    ],
    "cats": [
        {"kicker": "FPS POSITIONAL", "h2": "① FPSの定位重視（本命）",
         "lead": "足音や銃声の方向を掴むことを最優先したい人向け。競技でも定番の2台。",
         "items": [
            P("Razer BlackShark V2 Pro（2023）",
              "Razer BlackShark V2 Pro 2023",
              [("ドライバー", "50mm TriForce チタンコート"),
               ("重量", "約320g"),
               ("接続", "2.4GHz HyperSpeed / Bluetooth 5.2"),
               ("バッテリー", "最大70時間"),
               ("音響", "THX Spatial Audio")],
              "高域の解像感が高く、足音や位置の手がかりを掴みやすいFPSの定番。"
              "初期設定では低音が控えめなので、EQで好みに寄せるとさらに化ける。"),
            P("Logicool G PRO X2 LIGHTSPEED",
              "Logicool G PRO X2 LIGHTSPEED ヘッドセット",
              [("ドライバー", "50mm グラフェン"),
               ("接続", "LIGHTSPEED 2.4GHz / Bluetooth"),
               ("バッテリー", "最大50時間"),
               ("マイク", "BLUE VO!CE / バーチャル7.1")],
              "やや温かみのあるバランスで、定位の手がかりを残しつつ聴き疲れしにくい。"
              "装着感とマイク品質の評価も高く、通話やVC中心の人にも合う万能機。"),
         ]},
        {"kicker": "COMFORT & BATTERY", "h2": "② 装着感・バッテリー重視",
         "lead": "長時間プレイで疲れにくさと充電頻度の少なさを重視したい人向け。",
         "items": [
            P("HyperX Cloud III Wireless",
              "HyperX Cloud III Wireless",
              [("ドライバー", "53mm 角度付き"),
               ("重量", "約330g（マイク込み約342g）"),
               ("接続", "USBドングル 2.4GHz"),
               ("バッテリー", "最大120時間"),
               ("音響", "3D Spatial Audio")],
              "装着感の良さと120時間の長寿命バッテリーが光るコスパ機。"
              "クセが少なく扱いやすいので、最初の本格ワイヤレスとしても選びやすい。"),
         ]},
        {"kicker": "FLAGSHIP", "h2": "③ 最上位オールラウンド",
         "lead": "定位・音質・機能を妥協したくない人向けのハイエンド。",
         "items": [
            P("SteelSeries Arctis Nova Pro Wireless",
              "SteelSeries Arctis Nova Pro Wireless",
              [("周波数特性", "10Hz〜40kHz"),
               ("マイク", "4マイク・ハイブリッドANC"),
               ("音響", "360° 空間オーディオ（高精度な定位）"),
               ("運用", "ホットスワップ式バッテリーで実質充電切れなし")],
              "イメージング（音の方向感）が非常に正確で、足音や方向手がかりがクリア。"
              "ベースステーションやANCも含め、一台で全部こなしたい人に向く上位モデル。"),
         ]},
        {"kicker": "BUDGET", "h2": "④ コスパ入門（有線・軽量）",
         "lead": "まず定位の効果を試したい人向け。有線なら低遅延で価格も手頃です。",
         "items": [
            P("HyperX Cloud Stinger 2 など有線軽量機",
              "HyperX Cloud Stinger 2 ゲーミングヘッドセット",
              [("接続", "有線（3.5mm / USB）"),
               ("特徴", "軽量で側圧控えめ・装着感良好"),
               ("価格帯", "数千円〜"),
               ("用途", "まず定位を体験したい入門に最適")],
              "低価格でも装着感と基本的な定位はしっかり。配信や通話の入門にも向き、"
              "「まずヘッドセットで足音を聞き分ける感覚を試したい」人の最初の一台に。"),
         ]},
    ],
    "sense": [
        ("状況認識", "高解像度な定位で、足音や銃声の方向・距離を音から先に掴めます。"),
        ("連携・心理戦", "クリアなマイクは、コールやVCでの情報共有・読み合いを支えます。"),
    ],
    "faqs": [
        ("FPSで足音を聞き取りやすいのはどんなヘッドセット？",
         "高域の解像度が高く、低音が出すぎないモデルが足音の定位に向きます。空間オーディオ対応だと前後左右の把握がしやすくなります。"),
        ("無線と有線どちらが良い？",
         "取り回しと低遅延を両立したいなら2.4GHz無線、価格と遅延の少なさを最優先するなら有線が手堅い選択です。"),
    ],
}

MOUSEPAD = {
    "slug": "gaming-mousepad-guide",
    "icon": "mousepad",
    "eyebrow": "GAMING MOUSEPAD GUIDE",
    "h1": "ゲーミングマウスパッドおすすめ",
    "h1sub": "素材・タイプ・サイズで選ぶ深掘り比較ガイド",
    "title": "ゲーミングマウスパッドおすすめ｜素材・タイプ・サイズで選ぶ詳細比較 | GameSpec Lab",
    "desc": "価格.com等のレビューをもとに、ゲーミングマウスパッドを素材(布/ガラス)・タイプ(コントロール/スピード)・サイズ・厚みまで詳細に比較。止め重視からスピード、大判まで解説します。",
    "lead": "マウスパッドは「滑り」と「止め」のバランスを決める土台。エイムの再現性に直結します。"
            "低感度で大きく振る人ほど大判が安心。「素材・タイプ(コントロール/スピード)・サイズ/厚み」で選びましょう。",
    "axes": [
        ("素材", [("布(クロス)", "止めやすく精密操作向き。最も主流。"),
                  ("ガラス/ハード", "滑りが速く半永久的。スピード重視。"),
                  ("ハイブリッド", "速度と止めの中間を狙ったタイプ。")]),
        ("タイプ", [("コントロール", "止め重視・低感度向き。エイムが安定。"),
                    ("スピード", "滑り重視・高感度向き。素早い振り向き。"),
                    ("バランス", "stop&goの両立。迷ったらここ。")]),
        ("サイズ・厚み", [("M/L", "デスクが狭い人や高感度に。"),
                          ("XL/デスクマット", "低感度・大振りでも安心。"),
                          ("厚み", "厚いほど止めやすいが滑りは控えめ。")]),
    ],
    "cats": [
        {"kicker": "CONTROL", "h2": "① コントロール系（止め重視・低感度）",
         "lead": "ピタッと止めてエイムを置きたい人向け。FPSで最も選ばれるタイプ。",
         "items": [
            P("ARTISAN NINJA FX 零（ZERO）",
              "ARTISAN NINJA FX 零 マウスパッド",
              [("素材", "布（撚り糸織り）"),
               ("タイプ", "コントロール（滑りと止めのバランスに定評）"),
               ("硬さ", "XSOFT / SOFT / MID から選択"),
               ("サイズ", "M / L / XL"),
               ("製造", "日本製")],
              "プロ使用率が高い「止め」性能の代名詞。汗や湿度で滑りが変わりにくく、"
              "沈み込みの違う3硬度から持ち方に合わせて選べる。エイム安定を最優先するならこれ。"),
            P("SteelSeries QcK Heavy",
              "SteelSeries QcK Heavy マウスパッド",
              [("素材", "布"),
               ("タイプ", "コントロール"),
               ("厚み", "厚手（約4〜6mm）で安定感が高い"),
               ("サイズ", "M〜3XL（デスクマット含む）")],
              "厚手で凹凸を吸収し、安定した止め心地が続く定番ロングセラー。"
              "3XLはデスクマットとしてキーボードごと載せられ、コスパも良い。"),
         ]},
        {"kicker": "BALANCED / SPEED", "h2": "② バランス〜スピード系",
         "lead": "止めも残しつつ素早い振り向きもしたい人向け。万人に扱いやすい帯。",
         "items": [
            P("ARTISAN 疾風（HAYATE）甲/乙",
              "ARTISAN 疾風 甲 マウスパッド",
              [("素材", "布"),
               ("タイプ", "バランス〜スピード（乙は粗めの表面）"),
               ("特徴", "素早いstop&go・高耐久"),
               ("製造", "日本製")],
              "スピードとコントロールの良いところ取り。乙は表面が粗めで耐久が高く、"
              "滑り出しの軽さと止めを両立。零より速さが欲しい人に合う。"),
            P("Razer Gigantus V2",
              "Razer Gigantus V2 マウスパッド",
              [("素材", "布"),
               ("タイプ", "バランス"),
               ("サイズ", "4サイズ（M/L/XL/3XL）"),
               ("特徴", "縦横で滑りの差が少ない均一な織り・ラバーベース")],
              "クセが少なく扱いやすいコスパ機。均一な滑りで初めての一枚にも向き、"
              "サイズ展開も豊富。まず無難に揃えたい人の鉄板。"),
         ]},
        {"kicker": "GLASS / FASTEST", "h2": "③ ガラス・最速（スピード最優先）",
         "lead": "とにかく速い滑り出しと一定の滑走感を求める人向け。耐久も半永久。",
         "items": [
            P("Pulsar Superglide 2（ガラス）",
              "Pulsar Superglide 2 ガラス マウスパッド",
              [("素材", "強化ガラス"),
               ("タイプ", "スピード（微細加工でコントロール性も付与）"),
               ("特徴", "PTFEとは大きく異なる滑り出し・半永久使用"),
               ("注意", "硬く冷たい質感。止めは布より効きにくい")],
              "ガラス製ならではの一定で速い滑走が魅力。2は表面処理でやや止めも効くが、"
              "基本はスピード派・高感度向け。摩耗しにくく長く使えるのも利点。"),
         ]},
        {"kicker": "DESK MAT", "h2": "④ 大判・デスクマット",
         "lead": "低感度で大きく振る人や、見た目を整えたい人向けの特大サイズ。",
         "items": [
            P("Logicool G840 / G640",
              "Logicool G840 XL マウスパッド",
              [("素材", "布"),
               ("タイプ", "コントロール寄り"),
               ("サイズ", "G640＝大判 / G840＝XL（約900×400mm）"),
               ("特徴", "安定したラバーベース・コスパ良好")],
              "広い可動域を確保できる定番大判。G840はキーボードごと載るデスクマットで、"
              "低感度プレイや机周りの統一感を求める人に扱いやすい。"),
         ]},
    ],
    "sense": [
        ("空間把握・エイム", "止めと滑りの一貫性が、振り向きや追いエイムの再現性を支えます。"),
        ("判断速度", "素早いstop&goができる面なら、狙い直しの切り返しが速くなります。"),
    ],
    "faqs": [
        ("コントロールとスピード、どっちを選べばいい？",
         "ピタッと止めてエイムを安定させたいならコントロール(布)、素早い振り向きや高感度ならスピード(ガラス/ハード)が向きます。迷ったらバランス型が無難です。"),
        ("マウスパッドのサイズはどれくらいが良い？",
         "低感度で大きく腕を振るならXLや大判が安心です。感度が高めでデスクが狭いならM〜Lでも十分です。"),
    ],
}

CONTROLLER = {
    "slug": "gaming-controller-guide",
    "icon": "gamepad",
    "eyebrow": "GAME CONTROLLER GUIDE",
    "h1": "PCゲームコントローラーおすすめ",
    "h1sub": "スティック方式・背面ボタン・接続で選ぶ深掘り比較ガイド",
    "title": "PCゲームコントローラーおすすめ｜ホールエフェクト・背面ボタンで選ぶ詳細比較 | GameSpec Lab",
    "desc": "価格.com等のレビューをもとに、PC/Steam用ゲームコントローラーを重量・接続・スティック方式(ホール/TMR)・背面ボタンまで詳細に比較。標準機から高機能、コスパまで解説します。",
    "lead": "近年はスティックのドリフトを防ぐホールエフェクト/TMR方式や、指を離さず操作できる"
            "背面ボタンが選びの軸です。「スティック方式・機能(背面ボタン等)・接続/対応機種」で選びましょう。",
    "axes": [
        ("スティック方式", [("通常(ポテンショ)", "安価だが経年でドリフトが出やすい。"),
                            ("ホールエフェクト", "非接触で耐久・精度が高くドリフトに強い。"),
                            ("TMR", "ホールの進化版。高精度・低消費電力。")]),
        ("機能", [("背面ボタン", "スティックから手を離さず操作でき有利。"),
                  ("交換スティック/パドル", "高さや形を好みに調整できる。"),
                  ("プロファイル", "感度やマッピングを保存・切替。")]),
        ("接続・対応", [("有線", "低遅延で安定。競技や格ゲー向き。"),
                        ("無線(2.4G/BT)", "取り回し重視。2.4Gは低遅延。"),
                        ("対応機種", "Xbox/PS5対応可否は要確認。")]),
    ],
    "cats": [
        {"kicker": "STANDARD", "h2": "① 標準（迷ったらこれ）",
         "lead": "PCでの定番。互換性とバランスが良く、最初の一台に向きます。",
         "items": [
            P("Xbox ワイヤレス コントローラー",
              "Xbox ワイヤレス コントローラー",
              [("重量", "約287g"),
               ("接続", "Bluetooth / Xbox無線 / 有線USB-C"),
               ("スティック", "通常方式"),
               ("対応", "PC / Xbox / モバイル"),
               ("価格帯", "約7,000円")],
              "PCでの事実上の標準。XInput対応で「挿せば動く」安心感があり、"
              "持ちやすさと入手性が高い。まず一台ならこれを選べば失敗しにくい。"),
            P("DualSense（PS5）",
              "DualSense ワイヤレスコントローラー",
              [("重量", "約280g"),
               ("接続", "Bluetooth / 有線USB-C"),
               ("特徴", "ハプティック振動・アダプティブトリガー"),
               ("対応", "PC / PS5"),
               ("価格帯", "約9,000円")],
              "精密な振動とトリガーの没入感が魅力。対応タイトルでは体験が一段上がり、"
              "PCでも有線なら機能を活かしやすい。アクションやレース好きに。"),
         ]},
        {"kicker": "HALL / TMR VALUE", "h2": "② ホール/TMRコスパ（ドリフト対策）",
         "lead": "ドリフトに強い方式を手頃に。多機能なのに価格が抑えめで人気の帯。",
         "items": [
            P("GameSir Cyclone 2",
              "GameSir Cyclone 2 コントローラー",
              [("重量", "約227g"),
               ("スティック", "Mag-Res TMR（1000Hz・ドリフト耐性）"),
               ("背面ボタン", "4つ（M1〜M4）"),
               ("接続", "2.4G / Bluetooth / 有線USB-C"),
               ("注意", "Xbox Series・PS5には非対応")],
              "5,000円前後でTMRスティック＋背面4ボタンを備える高コスパ機。"
              "軽量で取り回しが良く、PC・Switch中心で多機能を安く欲しい人に刺さる。"),
            P("8BitDo Ultimate 2",
              "8BitDo Ultimate 2 コントローラー",
              [("スティック", "TMR（高精度・低消費電力）"),
               ("機能", "背面ボタン・マウスクリックトリガー"),
               ("接続", "2.4G / Bluetooth / 有線"),
               ("特徴", "充電ドック付属モデルあり")],
              "TMRスティックや追加ボタンを盛り込んだ多機能コスパ機。"
              "カスタマイズ性が高く、価格を抑えつつ機能で選びたい人向け。"),
         ]},
        {"kicker": "HIGH-END / CUSTOM", "h2": "③ 高機能・カスタム（背面ボタン上位）",
         "lead": "背面パドルや交換パーツで突き詰めたい競technical志向の人向け。",
         "items": [
            P("Xbox Elite Series 2",
              "Xbox Elite Series 2 コントローラー",
              [("重量", "約345g"),
               ("機能", "背面パドル4・交換スティック/十字キー・トリガーロック"),
               ("接続", "Bluetooth / Xbox無線 / 有線"),
               ("対応", "PC / Xbox"),
               ("価格帯", "高価格帯")],
              "カスタマイズ性の最上位。パドルや張力調整、プロファイル切替まで揃い、"
              "「操作を自分仕様に詰めたい」人の定番。ずっしりした高級感も人気。"),
            P("DualSense Edge",
              "DualSense Edge コントローラー",
              [("重量", "約325g"),
               ("機能", "背面ボタン2・交換スティックモジュール・プロファイル"),
               ("接続", "Bluetooth / 有線"),
               ("対応", "PC / PS5"),
               ("価格帯", "高価格帯")],
              "DualSenseの競技仕様。スティックモジュールを交換でき、設定保存にも対応。"
              "PS5機能を活かしつつ背面ボタンが欲しい人に。"),
         ]},
    ],
    "sense": [
        ("判断速度", "背面ボタンでスティックから指を離さず操作でき、行動の同時化で反応が速くなります。"),
        ("操作精度", "ホール/TMRスティックはドリフトに強く、狙いの正確さを長く保てます。"),
    ],
    "faqs": [
        ("ホールエフェクトやTMRのコントローラーは何が良い？",
         "非接触でスティックを検知するためドリフト(勝手に入力される不具合)が起きにくく、耐久と精度に優れます。長く使いたい人ほど有利です。"),
        ("PCで使うならXboxとPSどちらのコントローラーが良い？",
         "互換性の高さならXbox系が無難です。振動やトリガーの没入感を重視するならDualSense、ドリフト対策とコスパならホール/TMR機が選択肢になります。"),
    ],
}

DEVICES = [MOUSE, KEYBOARD, HEADSET, MOUSEPAD, CONTROLLER]


def render_specs(specs):
    rows = "\n".join(
        f"                <div><dt>{k}</dt><dd>{v}</dd></div>" for k, v in specs)
    return f'              <dl class="spec-table">\n{rows}\n              </dl>'


def render_product(p, idx, dev_icon, dev_label):
    return f"""            <article class="device-pick">
              <div class="device-pick-banner">
                <span class="device-rank-orb"><b>{idx:02d}</b><span data-icon="{dev_icon}"></span></span>
                <span class="device-rank-tag"><span data-icon="spark"></span>{dev_label} · PICK {idx:02d}</span>
              </div>
              <div class="device-pick-head">
                <h3>{p['name']}</h3>
                <a class="primary-link" href="{amz(p['q'])}" target="_blank" rel="noopener sponsored" data-affiliate="dev-{idx}"><span data-icon="cart"></span>Amazonで見る</a>
              </div>
{render_specs(p['specs'])}
              <p class="device-review"><strong>使い心地：</strong>{p['review']}</p>
            </article>"""


def render_category(cat, start_idx, dev_icon, dev_label):
    prods = "\n".join(render_product(p, start_idx + i, dev_icon, dev_label)
                      for i, p in enumerate(cat["items"]))
    return f"""          <div class="article-card">
            <p class="article-kicker">{cat['kicker']}</p>
            <h2>{cat['h2']}</h2>
            <p>{cat['lead']}</p>
{prods}
          </div>""", start_idx + len(cat["items"])


def _flow(nodes, sequence=True):
    cls = "gsl-flow is-sequence" if sequence else "gsl-flow"
    if sequence:
        ns = "".join(f'<div class="gsl-node"><b>{i + 1}</b>{n}</div>'
                     for i, n in enumerate(nodes))
    else:
        ns = "".join(f'<div class="gsl-node">{n}</div>' for n in nodes)
    return f'            <div class="{cls}">{ns}</div>'


def _fig(cap, inner):
    return ('          <div class="gsl-figure">\n'
            f'            <p class="gsl-figure-cap"><span data-icon="chart"></span>{cap}</p>\n'
            f'{inner}\n'
            '          </div>')


DIA = {
    "gaming-monitor-guide": _fig("選ぶ順番", _flow(
        ["用途を決める", "リフレッシュレート", "解像度", "パネル"])),
    "gaming-mouse-guide": _fig("マウス選びの4点", _flow(
        ["重量", "形状(持ち方)", "センサー", "接続"], sequence=False)),
    "gaming-keyboard-guide": _fig("キーボード選びの軸", _flow(
        ["スイッチ方式", "ラピッドトリガー", "サイズ", "静音性"], sequence=False)),
    "gaming-headset-guide": _fig("ヘッドセット選びの軸", _flow(
        ["定位", "装着感", "接続", "マイク"], sequence=False)),
    "gaming-mousepad-guide": _fig("選ぶ順番", _flow(
        ["素材", "タイプ(止め/滑り)", "サイズ"])),
    "gaming-controller-guide": _fig("コントローラー選びの軸", _flow(
        ["スティック方式", "背面ボタン", "接続"], sequence=False)),
}


def compare_table(caption, headers, rows):
    ths = "".join(f"<th>{h}</th>" for h in headers)
    body = ""
    for label, vals in rows:
        tds = "".join(f"<td>{v}</td>" for v in vals)
        body += f"<tr><th>{label}</th>{tds}</tr>"
    return ('          <div class="gsl-figure">\n'
            f'            <p class="gsl-figure-cap"><span data-icon="list"></span>{caption}'
            '<span class="compare-hint">（横スクロールで比較）</span></p>\n'
            '            <div class="compare-wrap"><table class="compare-table">'
            f'<thead><tr><th></th>{ths}</tr></thead><tbody>{body}</tbody></table></div>\n'
            '          </div>')


COMPARE = {
    "gaming-mouse-guide": compare_table("主要モデルを比較",
        ["GPX2", "Viper V3 Pro", "DeathAdder V3 Pro", "Harpe Ace", "G304"], [
            ("重量", ["約60g", "約54g", "約63g", "54/49g", "約99g"]),
            ("形状", ["左右対称", "左右対称", "エルゴ", "小型左右対称", "左右対称"]),
            ("センサー", ["HERO 2", "Focus Pro 35K", "Focus Pro", "AimPoint Pro", "HERO"]),
            ("接続", ["無線2.4G", "無線/8K", "無線/8K", "無線/BT/有線", "無線2.4G"]),
            ("バッテリー", ["95h", "95h", "90h", "—", "250h(単三)"]),
        ]),
    "gaming-keyboard-guide": compare_table("主要モデルを比較",
        ["Wooting 60HE/80HE", "Apex Pro TKL G3", "Huntsman V3 Pro", "G PRO X TKL"], [
            ("スイッチ", ["磁気軸", "磁気軸", "アナログ光学", "メカニカル"]),
            ("ラピッドトリガー", ["○ 先駆け", "○ 40段階", "○", "×"]),
            ("サイズ", ["60%/80%", "TKL", "TKL", "TKL"]),
            ("接続", ["有線", "有線", "有線", "無線/BT/有線"]),
        ]),
    "gaming-headset-guide": compare_table("主要モデルを比較",
        ["BlackShark V2 Pro", "G PRO X2", "Cloud III WL", "Nova Pro WL"], [
            ("ドライバー", ["50mm チタン", "50mm グラフェン", "53mm", "—"]),
            ("重量", ["約320g", "—", "約330g", "—"]),
            ("接続", ["2.4G/BT", "2.4G/BT", "2.4G(USB)", "2.4G/BT"]),
            ("バッテリー", ["70h", "50h", "120h", "ホットスワップ"]),
            ("強み", ["定位", "バランス/マイク", "装着感/電池", "最上位/ANC"]),
        ]),
    "gaming-mousepad-guide": compare_table("主要モデルを比較",
        ["Artisan 零", "QcK Heavy", "Artisan 疾風甲", "Gigantus V2", "Superglide 2"], [
            ("素材", ["布", "布", "布", "布", "ガラス"]),
            ("タイプ", ["コントロール", "コントロール", "バランス", "バランス", "スピード"]),
            ("特徴", ["3硬度", "厚手・安定", "高耐久", "均一な滑り", "半永久"]),
            ("サイズ", ["M/L/XL", "M〜3XL", "複数", "4サイズ", "定形"]),
        ]),
    "gaming-controller-guide": compare_table("主要モデルを比較",
        ["Xbox WL", "DualSense", "Cyclone 2", "Elite 2", "DualSense Edge"], [
            ("重量", ["約287g", "約280g", "約227g", "約345g", "約325g"]),
            ("スティック", ["通常", "通常", "TMR", "通常", "通常(交換)"]),
            ("背面ボタン", ["—", "—", "4", "4(パドル)", "2"]),
            ("接続", ["BT/無線/有線", "BT/有線", "2.4G/BT/有線", "BT/無線/有線", "BT/有線"]),
            ("対応", ["PC/Xbox", "PC/PS5", "PC/Switch", "PC/Xbox", "PC/PS5"]),
        ]),
}


def render_axes(axes):
    cols = []
    for title, rows in axes:
        lis = "\n".join(
            f"                  <li><strong>{a}</strong><span>{b}</span></li>"
            for a, b in rows)
        cols.append(f"""              <section class="article-card">
                <h2>{title}</h2>
                <ul class="article-list">
{lis}
                </ul>
              </section>""")
    return "\n".join(cols)


def render_nav(current_slug):
    cells = []
    for href, label, note in DEVICE_NAV:
        if href.startswith(current_slug):
            cells.append(f'              <div><strong>{label}（このページ）</strong><p>{note}</p></div>')
        else:
            cells.append(f'              <div><strong><a href="{href}">{label}ガイド</a></strong><p>{note}</p></div>')
    return "\n".join(cells)


def render_faq_jsonld(faqs):
    items = ",\n".join(
        f"""              {{
                "@type": "Question",
                "name": "{q}",
                "acceptedAnswer": {{ "@type": "Answer", "text": "{a}" }}
              }}""" for q, a in faqs)
    return items


def build(dev):
    url = f"{BASE}/{dev['slug']}.html"
    cats_html = []
    idx = 1
    dev_label = dev["eyebrow"].replace(" GUIDE", "")
    for cat in dev["cats"]:
        html, idx = render_category(cat, idx, dev["icon"], dev_label)
        cats_html.append(html)
    categories = "\n".join(cats_html)
    axes = render_axes(dev["axes"])
    diagram = DIA.get(dev["slug"], "")
    compare = COMPARE.get(dev["slug"], "")
    nav = render_nav(dev["slug"])
    sense_rows = "\n".join(
        f"              <div><strong>{a}</strong><p>{b}</p></div>"
        for a, b in dev["sense"])
    faq_items = render_faq_jsonld(dev["faqs"])

    page = f"""<!doctype html>
<html lang="ja">
  <head>
{GTM_HEAD}
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="{dev['desc']}" />
    <meta name="theme-color" content="#04050d" />
    <meta property="og:site_name" content="GameSpec Lab" />
    <meta property="og:title" content="{dev['title']}" />
    <meta property="og:description" content="{dev['desc']}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="{url}" />
    <meta property="og:image" content="https://gamespeclab.com/assets/og/{dev['slug']}.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{dev['h1']}｜詳細スペック比較" />
    <meta name="twitter:description" content="{dev['desc']}" />
    <meta name="twitter:image" content="https://gamespeclab.com/assets/og/{dev['slug']}.png" />
    <title>{dev['title']}</title>
    <link rel="canonical" href="{url}" />
    <link rel="icon" href="favicon.svg" />
    <link rel="preload" as="image" href="assets/diagnosis-sync-bg.webp" type="image/webp" fetchpriority="high" />
    <link rel="stylesheet" href="style.css?v={VER}" />
    <script type="application/ld+json">
      {{
        "@context": "https://schema.org",
        "@graph": [
          {{
            "@type": "Article",
            "headline": "{dev['h1']}｜詳細スペック比較",
            "url": "{url}",
            "description": "{dev['desc']}",
            "author": {{ "@type": "Organization", "name": "GameSpec Lab" }},
            "publisher": {{ "@type": "Organization", "name": "GameSpec Lab" }},
            "dateModified": "{TODAY}"
          }},
          {{
            "@type": "FAQPage",
            "mainEntity": [
{faq_items}
            ]
          }},
          {{
            "@type": "BreadcrumbList",
            "itemListElement": [
              {{ "@type": "ListItem", "position": 1, "name": "GameSpec Lab", "item": "https://gamespeclab.com/" }},
              {{ "@type": "ListItem", "position": 2, "name": "{dev['h1']}", "item": "{url}" }}
            ]
          }}
        ]
      }}
    </script>
  </head>
  <body>{GTM_NOSCRIPT}
    <header class="site-header">
      <a class="brand" href="index.html"><span class="brand-mark">GSL</span><span>GameSpec Lab</span></a>
      <button class="menu-toggle" type="button" aria-label="メニューを開く" aria-expanded="false" aria-controls="site-menu"><span data-icon="menu"></span><span>MENU</span></button>
      <nav id="site-menu" aria-label="サイト内メニュー">
        <a href="gamesense.html"><span data-icon="chart"></span>ゲームセンス</a>
        <a href="gamermbti.html"><span data-icon="user"></span>ゲーマーMBTI</a>
        <a href="results.html"><span data-icon="list"></span>結果一覧</a>
        <a href="articles.html"><span data-icon="spark"></span>ガイド</a>
        <a href="affiliate-disclosure.html"><span data-icon="ad"></span>広告表記</a>
      </nav>
      <button class="menu-backdrop" type="button" aria-label="メニューを閉じる"></button>
    </header>
    <main>
      <section class="legal-hero article-hero">
        <div class="legal-copy">
          <p class="eyebrow"><span data-icon="{dev['icon']}"></span>{dev['eyebrow']}</p>
          <h1><span>{dev['h1']}</span><span>{dev['h1sub']}</span></h1>
          <p class="lead">{dev['lead']}</p>
        </div>
      </section>
      <section class="section article-section">
        <article class="article-body">
          <div class="article-card">
            <p class="article-kicker">DEVICE GUIDES</p>
            <h2>デバイス別ガイド</h2>
            <div class="article-pair-grid">
{nav}
            </div>
          </div>
          <div class="article-card">
            <p class="article-kicker">HOW TO CHOOSE</p>
            <h2>選び方の軸</h2>
            <div class="article-grid">
{axes}
            </div>
          </div>
{diagram}
{compare}
{categories}
          <div class="article-card">
            <p class="article-kicker">MATCH WITH YOUR SCAN</p>
            <h2>診断結果と合わせて選ぶ</h2>
            <p>GameSense Scan 8の上位能力に合わせると、どのスペックを優先すべきかが見えてきます。</p>
            <div class="article-pair-grid">
{sense_rows}
            </div>
            <a class="primary-link" href="gamesense.html"><span data-icon="arrow"></span>GameSense Scan 8で自分の強みを診断する</a>
          </div>
          <div class="article-card affiliate-disclosure">
            <p class="eyebrow"><span data-icon="ad"></span>広告・アフィリエイトについて</p>
            <p>本ページの製品紹介リンクにはAmazonアソシエイトを利用しています。リンク経由の購入で当サイトが収益を得る場合があります。価格・在庫・仕様は変動するため、最新情報は各製品ページでご確認ください。掲載は編集部による用途別の整理であり、特定メーカーからの依頼に基づくものではありません。</p>
            <a class="ghost-link" href="affiliate-disclosure.html"><span data-icon="ad"></span>広告・アフィリエイト表記の詳細</a>
          </div>
        </article>
      </section>
    </main>
    <footer class="site-footer">
      <div>
        <a class="brand" href="index.html"><span class="brand-mark">GSL</span><span>GameSpec Lab</span></a>
        <p>PCゲームのゲームセンス、ゲーマータイプ、相性を診断するサービスです。</p>
      </div>
      <nav aria-label="運営情報">
        <a href="gamesense.html"><span data-icon="chart"></span>ゲームセンス</a>
        <a href="gamermbti.html"><span data-icon="user"></span>ゲーマーMBTI</a>
        <a href="results.html"><span data-icon="list"></span>結果一覧</a>
        <a href="articles.html"><span data-icon="spark"></span>ガイド</a>
        <a href="privacy.html"><span data-icon="shield"></span>プライバシー</a>
        <a href="affiliate-disclosure.html"><span data-icon="ad"></span>広告表記</a>
        <a href="site-map.html"><span data-icon="list"></span>サイトマップ</a>
      </nav>
    </footer>
    <script src="script.js?v={VER}"></script>
  </body>
</html>
"""
    out = os.path.join(ROOT, f"{dev['slug']}.html")
    with open(out, "w", encoding="utf-8") as f:
        f.write(page)
    n = sum(len(c["items"]) for c in dev["cats"])
    print(f"wrote {dev['slug']}.html ({n} products)")


if __name__ == "__main__":
    for d in DEVICES:
        build(d)
