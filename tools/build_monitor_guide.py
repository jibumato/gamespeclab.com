#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""ゲーミングモニターおすすめページ(gaming-monitor-guide.html)を生成.

価格.com等のレビュー・人気傾向をもとにした用途別の名指し推奨を、
Amazonアソシエイト(検索リンク, tag=jbmt-22)付きで掲載する静的ページ。
製品やコピーの更新はこのスクリプトを編集して再生成する。

  python3 tools/build_monitor_guide.py
"""
import os
from urllib.parse import urlencode

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TAG = "jbmt-22"
VER = "deep116"
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
URL = "https://gamespeclab.com/gaming-monitor-guide.html"


def amz(query):
    return "https://www.amazon.co.jp/s?" + urlencode({"k": query, "tag": TAG})


# 用途別カテゴリ。各製品: (名前, 検索クエリ, スペック, おすすめ理由, affiliate-id)
CATEGORIES = [
    {
        "kicker": "FOR COMPETITIVE FPS",
        "h2": "① 競技FPS・最速重視（フルHD / 240〜360Hz）",
        "lead": "勝ち負けが反応と視認で決まるFPS向け。解像度はフルHDに抑えてフレームレートを稼ぎ、"
                "残像低減機能と高リフレッシュで「見えてから動く」までを最短にします。"
                "GameSense Scan 8でいう判断速度・状況認識を、ハードから底上げする構成です。",
        "items": [
            ("BenQ ZOWIE XL2566K", "BenQ ZOWIE XL2566K",
             "24.5型 / フルHD / 360Hz / TNパネル / DyAc⁺",
             "プロFPSシーンの定番。DyAc⁺で激しい動きでも残像が出にくく、リコイル制御や敵の視認がしやすい。Black eQualizerで暗所も見やすく、競技特化なら筆頭候補。"),
            ("ASUS TUF Gaming VG249QML5A", "ASUS TUF Gaming VG249QML5A 240Hz",
             "23.8型 / フルHD / Fast IPS / 240Hz / 0.3ms",
             "Fast IPSで色と視認性を保ちつつ240Hzの滑らかさ。G-Sync/FreeSync対応で、競技入門〜中級の定番コスパ機。"),
            ("IODATA GigaCrysta EX-GD251UH", "IODATA GigaCrysta 240Hz",
             "24.5型 / フルHD / 240Hz",
             "国内サポートと長期保証で安心の240Hz。海外メーカーが不安な人の現実的な選択肢。"),
        ],
    },
    {
        "kicker": "BALANCED / MOST POPULAR",
        "h2": "② 主流バランス（WQHD / 165〜180Hz IPS）",
        "lead": "解像度と滑らかさのバランスが最も良く、今いちばん売れている価格帯。"
                "FPSもRPGも一台でこなしたい人向けで、3〜5万円台で高コスパ機が揃います。",
        "items": [
            ("ASUS TUF Gaming VG27AQ5A", "ASUS TUF Gaming VG27AQ5A WQHD",
             "27型 / WQHD / Fast IPS / 180Hz前後 / 0.3ms",
             "3万円台でWQHD高リフレッシュ・G-Sync/FreeSync対応。価格と性能のバランスが良く、主流帯の中心モデル。"),
            ("LG UltraGear 27GP850-B", "LG UltraGear 27GP850",
             "27型 / WQHD / Nano IPS / 165〜180Hz",
             "色再現と応答速度のバランスに定評があるLGの定番。後継の27GS75Q系も同様の狙い。"),
            ("GIGABYTE M27Q", "GIGABYTE M27Q WQHD 170Hz",
             "27型 / WQHD / IPS / 170Hz / KVM内蔵",
             "KVMスイッチ内蔵で仕事用PCとの併用に便利。コスパ重視の鉄板WQHD。"),
        ],
    },
    {
        "kicker": "OLED + SPEED",
        "h2": "③ 映像美＋高速（WQHD 有機EL / 240Hz）",
        "lead": "有機ELの「黒の締まり」と240Hzの速さを両立するハイエンド主流帯。"
                "競技の反応速度も、RPGや配信での映像美も両立したい人に向く本命帯です。",
        "items": [
            ("LG UltraGear 27GS95QE-B", "LG UltraGear 27GS95QE-B OLED",
             "26.5型 / WQHD / 有機EL(WOLED) / 240Hz / 0.03ms",
             "マイクロレンズアレイでピーク輝度1300cd/m²まで向上し、VGP2025金賞。OLEDの黒と240Hzの速さを両立した、この価格帯(約10万円)の代表格。"),
            ("WQHD QD-OLED（ASUS / MSI / Dell）", "WQHD QD-OLED ゲーミングモニター 240Hz",
             "27型前後 / WQHD / QD-OLED / 240〜360Hz",
             "同価格帯のQD-OLED勢も発色が鮮やかで人気。在庫・価格で比較して選びたい人向けの一覧。"),
        ],
    },
    {
        "kicker": "4K HIGH RESOLUTION",
        "h2": "④ 高精細4K（4K / 144Hz IPS）",
        "lead": "広い視野と精細感を取りたい人向け。HDMI 2.1搭載モデルなら家庭用ゲーム機の"
                "4K高フレームレートにも対応します。空間把握や没入感を重視する遊び方と好相性です。",
        "items": [
            ("GIGABYTE M28U", "GIGABYTE M28U 4K 144Hz",
             "28型 / 4K / IPS / 144Hz / HDMI 2.1",
             "4K144Hzを手頃にこなす定番コスパ機。HDMI 2.1でPS5などとも好相性で、最初の4Kとして選びやすい。"),
            ("GIGABYTE M32U", "GIGABYTE M32U 4K 144Hz",
             "32型 / 4K / IPS / 144Hz / HDMI 2.1",
             "大画面で4K高リフレッシュを楽しむなら。迫力重視の没入派におすすめ。"),
        ],
    },
    {
        "kicker": "FLAGSHIP 4K OLED",
        "h2": "⑤ 最上位4K OLED（4K / 240Hz QD-OLED）",
        "lead": "解像度・速度・映像美をできるだけ妥協したくない最上位帯。ハイエンドPCを持っていて、"
                "一台で全部叶えたい人向けの構成です。",
        "items": [
            ("ASUS ROG Swift OLED PG32UCDM", "ASUS ROG Swift OLED PG32UCDM",
             "31.5型 / 4K / QD-OLED / 240Hz / 0.03ms",
             "4K・240Hz・QD-OLEDを全部入りで叶える現行トップクラスの一台。99% DCI-P3の広色域で、競技速度も映像美も両立したい人に向く。"),
            ("4K OLED 各社モデル", "4K OLED ゲーミングモニター 240Hz",
             "32型前後 / 4K / QD-OLED・WOLED / 240Hz",
             "LGやDell、MSIなども4K OLEDを展開。価格と在庫を見比べて選びたい人向けの一覧。"),
        ],
    },
    {
        "kicker": "BUDGET / ENTRY",
        "h2": "⑥ コスパ入門（フルHD / 180Hz前後・1万円台〜）",
        "lead": "まず高リフレッシュレートを体験したい人向け。フルHD・180Hz前後なら"
                "1〜2万円台から選べ、60Hzからの乗り換えでも違いがはっきり分かります。",
        "items": [
            ("IODATA GigaCrysta KH-GD241JD", "IODATA GigaCrysta KH-GD241JD 180Hz",
             "23.8型 / フルHD / 180Hz / 3年保証",
             "国内サポート＋3年保証で約2.4万円。安心して買える入門機の定番。"),
            ("ASRock Phantom Gaming PG25FFT", "ASRock PG25FFT 180Hz",
             "24.5型 / フルHD / 180Hz / 約1.9万円",
             "2万円を切る価格で180Hz。とにかく安く高リフレッシュを試したい人に。"),
            ("1万円台のフルHD 180〜200Hz", "ゲーミングモニター フルHD 180Hz 24インチ",
             "23.8〜25型 / フルHD / 180〜200Hz",
             "KTCやPixioなど格安勢も多数。価格優先で最新の在庫から選びたい人向けの一覧。"),
        ],
    },
]

# GameSense能力 → 効くスペック
SENSE_MAP = [
    ("状況認識・判断速度", "高リフレッシュレート(144Hz以上、競技なら240Hz+)と低遅延。1秒あたりの情報量が増え、反応の余裕が生まれます。"),
    ("空間把握", "27型以上の画面サイズとWQHD/4Kの精細感。距離・角度・射線が掴みやすくなります。"),
    ("長時間の集中", "有機ELやフリッカーフリー・ブルーライト軽減。目の負担を抑えて終盤までパフォーマンスを保てます。"),
]


def render_item(it, idx):
    name, query, spec, reason = it[0], it[1], it[2], it[3]
    return f"""              <a href="{amz(query)}" target="_blank" rel="noopener sponsored" data-affiliate="mon-{idx}">
                <span><span data-icon="monitor"></span>{name}｜Amazonで見る</span>
                <small>{spec}</small>
                <em>{reason}</em>
              </a>"""


def render_category(cat, start_idx):
    items_html = "\n".join(render_item(it, start_idx + i) for i, it in enumerate(cat["items"]))
    return f"""          <div class="article-card">
            <p class="article-kicker">{cat['kicker']}</p>
            <h2>{cat['h2']}</h2>
            <p>{cat['lead']}</p>
            <div class="gear-link-list">
{items_html}
            </div>
          </div>""", start_idx + len(cat["items"])


def _monitor_compare():
    headers = ["ZOWIE XL2566K", "TUF VG27AQ5A", "LG 27GS95QE", "GIGABYTE M28U", "ROG PG32UCDM"]
    rows = [
        ("用途", ["競技FPS", "主流バランス", "映像美+高速", "高精細4K", "最上位4K"]),
        ("サイズ", ["24.5型", "27型", "26.5型", "28型", "31.5型"]),
        ("解像度", ["フルHD", "WQHD", "WQHD", "4K", "4K"]),
        ("リフレッシュ", ["360Hz", "180Hz前後", "240Hz", "144Hz", "240Hz"]),
        ("パネル", ["TN", "Fast IPS", "有機EL", "IPS", "QD-OLED"]),
    ]
    ths = "".join(f"<th>{h}</th>" for h in headers)
    body = "".join(
        "<tr><th>" + lbl + "</th>" + "".join(f"<td>{v}</td>" for v in vals) + "</tr>"
        for lbl, vals in rows)
    return ('          <div class="gsl-figure">\n'
            '            <p class="gsl-figure-cap"><span data-icon="list"></span>主要モデルを比較'
            '<span class="compare-hint">（横スクロールで比較）</span></p>\n'
            '            <div class="compare-wrap"><table class="compare-table">'
            f'<thead><tr><th></th>{ths}</tr></thead><tbody>{body}</tbody></table></div>\n'
            '          </div>')


def _monitor_diagram():
    nodes = ["用途を決める", "リフレッシュレート", "解像度", "パネル"]
    ns = "".join(f'<div class="gsl-node"><b>{i + 1}</b>{n}</div>'
                 for i, n in enumerate(nodes))
    return ('          <div class="gsl-figure">\n'
            '            <p class="gsl-figure-cap"><span data-icon="chart"></span>選ぶ順番</p>\n'
            f'            <div class="gsl-flow is-sequence">{ns}</div>\n'
            '          </div>')


def build():
    cats_html = []
    idx = 1
    for cat in CATEGORIES:
        html, idx = render_category(cat, idx)
        cats_html.append(html)
    categories = "\n".join(cats_html)
    diagram = _monitor_diagram()
    compare = _monitor_compare()

    sense_rows = "\n".join(
        f'              <div><strong>{a}</strong><p>{b}</p></div>'
        for a, b in SENSE_MAP)

    desc = "価格.com等のレビューや人気傾向をもとに、ゲーミングモニターを用途別（競技FPS/WQHD/4K/OLED/コスパ）におすすめ。リフレッシュレート・解像度・パネルの選び方も解説します。"
    title = "ゲーミングモニターおすすめ｜用途別の選び方と本命モデル | GameSpec Lab"

    page = f"""<!doctype html>
<html lang="ja">
  <head>
{GTM_HEAD}
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="{desc}" />
    <meta name="theme-color" content="#04050d" />
    <meta property="og:site_name" content="GameSpec Lab" />
    <meta property="og:title" content="{title}" />
    <meta property="og:description" content="{desc}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="{URL}" />
    <meta property="og:image" content="https://gamespeclab.com/assets/og/gaming-monitor-guide.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="ゲーミングモニターおすすめ｜用途別の選び方と本命モデル" />
    <meta name="twitter:description" content="{desc}" />
    <meta name="twitter:image" content="https://gamespeclab.com/assets/og/gaming-monitor-guide.png" />
    <title>{title}</title>
    <link rel="canonical" href="{URL}" />
    <link rel="icon" href="favicon.svg" />
    <link rel="preload" as="image" href="assets/diagnosis-sync-bg.webp" type="image/webp" fetchpriority="high" />
    <link rel="stylesheet" href="style.css?v={VER}" />
    <script type="application/ld+json">
      {{
        "@context": "https://schema.org",
        "@graph": [
          {{
            "@type": "Article",
            "headline": "ゲーミングモニターおすすめ｜用途別の選び方と本命モデル",
            "url": "{URL}",
            "description": "{desc}",
            "author": {{ "@type": "Organization", "name": "GameSpec Lab" }},
            "publisher": {{ "@type": "Organization", "name": "GameSpec Lab" }},
            "dateModified": "{TODAY}"
          }},
          {{
            "@type": "FAQPage",
            "mainEntity": [
              {{
                "@type": "Question",
                "name": "ゲーミングモニターは何Hzを選べばいい？",
                "acceptedAnswer": {{ "@type": "Answer", "text": "FPSなど対戦中心なら最低144Hz、競技志向なら240Hz以上が目安です。60Hzからの乗り換えなら180Hz前後でも体感差ははっきり分かります。" }}
              }},
              {{
                "@type": "Question",
                "name": "解像度はフルHD・WQHD・4Kのどれがいい？",
                "acceptedAnswer": {{ "@type": "Answer", "text": "フレームレート最優先の競技FPSはフルHD、バランス重視ならWQHD、精細感と没入を取るなら4Kが目安です。WQHDが最も人気の価格帯です。" }}
              }},
              {{
                "@type": "Question",
                "name": "有機EL(OLED)ゲーミングモニターは買い？",
                "acceptedAnswer": {{ "@type": "Answer", "text": "黒の表現と応答速度に優れ、映像美と高速描画を両立できます。価格は上がりますが、競技と映像美を両立したい人には有力です。" }}
              }}
            ]
          }},
          {{
            "@type": "BreadcrumbList",
            "itemListElement": [
              {{ "@type": "ListItem", "position": 1, "name": "GameSpec Lab", "item": "https://gamespeclab.com/" }},
              {{ "@type": "ListItem", "position": 2, "name": "ゲーミングモニターおすすめ", "item": "{URL}" }}
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
          <p class="eyebrow"><span data-icon="monitor"></span>GAMING MONITOR GUIDE</p>
          <h1><span>ゲーミングモニターおすすめ</span><span>用途別の選び方と、いま選ばれている本命モデル</span></h1>
          <p class="lead">価格.comなどのレビューや人気傾向をもとに、競技FPSからWQHD・4K・有機ELまで用途別に整理しました。まず「リフレッシュレート・解像度・パネル」の3点だけ押さえれば、失敗しにくくなります。</p>
        </div>
      </section>
      <section class="section article-section">
        <article class="article-body">
          <div class="article-card">
            <p class="article-kicker">DEVICE GUIDES</p>
            <h2>デバイス別ガイド</h2>
            <div class="article-pair-grid">
              <div><strong>モニター（このページ）</strong><p>高Hz・解像度・パネルで選ぶ</p></div>
              <div><strong><a href="gaming-mouse-guide.html">マウスガイド</a></strong><p>重量・センサー・形状で選ぶ</p></div>
              <div><strong><a href="gaming-keyboard-guide.html">キーボードガイド</a></strong><p>磁気軸・ラピッドトリガーで選ぶ</p></div>
              <div><strong><a href="gaming-headset-guide.html">ヘッドセットガイド</a></strong><p>定位・装着感・接続で選ぶ</p></div>
              <div><strong><a href="gaming-mousepad-guide.html">マウスパッドガイド</a></strong><p>素材・タイプ・サイズで選ぶ</p></div>
              <div><strong><a href="gaming-controller-guide.html">コントローラーガイド</a></strong><p>スティック方式・背面ボタンで選ぶ</p></div>
            </div>
          </div>
          <div class="article-card">
            <p class="article-kicker">HOW TO CHOOSE</p>
            <h2>まず押さえる3つの軸</h2>
            <div class="article-grid">
              <section class="article-card">
                <h2>リフレッシュレート</h2>
                <ul class="article-list">
                  <li><strong>144Hz</strong><span>対戦ゲームの入口。60Hzからは劇的に変わります。</span></li>
                  <li><strong>180〜240Hz</strong><span>主流〜競技。滑らかさと反応の余裕が増します。</span></li>
                  <li><strong>360Hz</strong><span>競技特化。最速の視認と残像低減を求める人向け。</span></li>
                </ul>
              </section>
              <section class="article-card">
                <h2>解像度</h2>
                <ul class="article-list">
                  <li><strong>フルHD</strong><span>フレームを稼ぎたい競技FPS向け。</span></li>
                  <li><strong>WQHD</strong><span>精細感と速度のバランス。今いちばん人気。</span></li>
                  <li><strong>4K</strong><span>没入感と高精細。RPGや大画面派に。</span></li>
                </ul>
              </section>
              <section class="article-card">
                <h2>パネル</h2>
                <ul class="article-list">
                  <li><strong>Fast IPS</strong><span>色・視野角・速度のバランスが良い万能型。</span></li>
                  <li><strong>有機EL</strong><span>黒の締まりと応答速度が屈指。映像美重視。</span></li>
                  <li><strong>TN / VA</strong><span>TNは最速・安価、VAはコントラスト重視。</span></li>
                </ul>
              </section>
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
            <p>本ページのモニター紹介リンクにはAmazonアソシエイトを利用しています。リンク経由の購入で当サイトが収益を得る場合があります。価格・在庫・仕様は変動するため、最新情報は各製品ページでご確認ください。掲載は編集部による用途別の整理であり、特定メーカーからの依頼に基づくものではありません。</p>
            <a class="ghost-link" href="affiliate-disclosure.html"><span data-icon="ad"></span>広告・アフィリエイト表記の詳細</a>
          </div>
          <div class="article-card">
            <h2>次に読みたい関連ガイド</h2>
            <div class="article-pair-grid">
              <div><strong><a href="gamesense.html">GameSense Scan 8</a></strong><p>24問で8つのゲームセンスを可視化。</p></div>
              <div><strong><a href="pc-build.html">ゲーミングPCの選び方</a></strong><p>モニター性能を引き出すPC構成の目安。</p></div>
              <div><strong><a href="fps-aptitude-diagnosis.html">FPS適性診断</a></strong><p>自分に向いた立ち回りからギアを考える。</p></div>
            </div>
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
    out = os.path.join(ROOT, "gaming-monitor-guide.html")
    with open(out, "w", encoding="utf-8") as f:
        f.write(page)
    print("wrote", out)


if __name__ == "__main__":
    build()
