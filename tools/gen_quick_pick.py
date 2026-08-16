#!/usr/bin/env python3
# 30秒クイック提案ページ (quick-pick.html) を生成する。
# 3問（カテゴリ→予算→プレイスタイル）で、既存ガイドの「編集部の結論」と
# 図鑑の掲載製品から1台を提案する。本診断（24問）への入口も兼ねる。
# 再実行しても安全。sitemap.xml / site-map.html への登録も冪等に行う。
import json, re, html, os

os.chdir(os.path.join(os.path.dirname(__file__), '..'))

SLUG = 'quick-pick.html'
URL = f'https://gamespeclab.com/{SLUG}'
UPDATED = '2026年8月'

# 決定表: カテゴリ × 予算 × スタイル(fps=競技FPS中心 / mix=いろいろ遊ぶ)
# 製品は各ガイドの「編集部の結論」と図鑑の掲載製品から選んでいる。
# 予算帯に実製品がない場合は、最も近い現実的な選択肢を honest に提示する。
PICKS = {
    "mouse": {
        "label": "マウス", "icon": "mouse", "guide": "gaming-mouse-guide.html",
        "low":  {"fps": ["Logicool G304", "約4,500〜7,000円 / 99g / 無線", "この価格で競技に通用する無線はG304がほぼ一択です。まず無線の軽快さを体験できます。"],
                 "mix": ["Logicool G304", "約4,500〜7,000円 / 99g / 無線", "初めての1台や予備機の定番です。安くても反応は十分速く、外しにくい選択です。"]},
        "mid":  {"fps": ["Razer Viper V3 Pro", "約2〜2.6万円 / 54g / 8000Hz", "競技FPSの本命。54gの軽さと8000Hzの反応で、エイムの限界を押し上げたい人向けです。"],
                 "mix": ["Logicool G PRO X SUPERLIGHT 2", "約2〜2.3万円 / 60g / 無線", "プロ使用率1位常連の王道。クセのない形状で持ち方を選ばず、長く使えます。"]},
        "high": {"fps": ["Logicool G PRO X2 SUPERSTRIKE", "約2.6〜2.9万円 / 61g / ラピッドトリガー", "2026年に出た世界初のラピッドトリガー搭載マウス。クリック反応を突き詰めるならこれです。"],
                 "mix": ["Logicool G PRO X SUPERLIGHT 2", "約2〜2.3万円 / 60g / 無線", "予算に余裕があっても、万能性ではこの王道が最有力。残りはパッドや練習環境に回すのが賢い配分です。"]},
    },
    "kb": {
        "label": "キーボード", "icon": "cpu", "guide": "gaming-keyboard-guide.html",
        "low":  {"fps": ["磁気軸エントリー（CAROTMAS / AIM1瞬 など）", "約6,000〜12,000円 / 磁気軸", "1万円前後でラピッドトリガーを試せる入門帯。まず体感してから上位機を判断できます。"],
                 "mix": ["磁気軸エントリー（CAROTMAS / AIM1瞬 など）", "約6,000〜12,000円 / 磁気軸", "この予算なら磁気軸入門が最有力。普段使いにも支障ありません。"]},
        "mid":  {"fps": ["Razer Huntsman V3 Pro TKL", "約2.1〜2.8万円 / アナログ光学", "ラピッドトリガー対応の中では価格と完成度のバランスが良い1台です。"],
                 "mix": ["Logicool G PRO X TKL", "約2.4〜3万円 / 無線", "無線で取り回しが良く、打鍵感も安定した定番。ゲームも作業も1台でこなせます。"]},
        "high": {"fps": ["Wooting 80HE", "約2.8〜4万円 / 磁気軸", "ラピッドトリガーの元祖にして競技FPSの標準装備。迷ったときの基準になる1台です。"],
                 "mix": ["SteelSeries Apex Pro TKL Gen 3", "約3.2〜4.5万円 / 磁気軸", "調整幅と打鍵感のバランスが高い定番。ゲーム特化に振り切らない上位機です。"]},
    },
    "mon": {
        "label": "モニター", "icon": "monitor", "guide": "gaming-monitor-guide.html",
        "low":  {"fps": ["1万円台のフルHD 180〜200Hz", "約1.3〜2万円 / 180Hz〜", "1万円を少し超えますが、144Hz未満を買うと後悔しがちです。180Hz帯が現実的な最安ラインです。"],
                 "mix": ["1万円台のフルHD 180〜200Hz", "約1.3〜2万円 / 180Hz〜", "最初の1台はこの帯で十分。60Hzからの乗り換えなら世界が変わります。"]},
        "mid":  {"fps": ["ASUS TUF Gaming VG249QML5A", "約2.4〜2.8万円 / 240Hz / Fast IPS", "この価格で240Hz。競技FPS入門の本命です。"],
                 "mix": ["ASUS TUF Gaming VG27AQ5A", "約2.4〜3.6万円 / WQHD 180Hz", "WQHDの精細さと180Hzの滑らかさを両立。FPS以外のゲームや作業も快適です。"]},
        "high": {"fps": ["BenQ ZOWIE XL2566K", "約9.6〜11万円 / 360Hz / DyAc+", "競技FPSの大会標準。プロと同じ表示環境を求めるならここに行き着きます。"],
                 "mix": ["LG UltraGear 27GS95QE-B", "約9.3〜11万円 / WQHD 240Hz / 有機EL", "有機ELの映像美と240Hzを両取り。FPSも映画もゲームも1台で満足できます。"]},
    },
    "hs": {
        "label": "ヘッドセット", "icon": "headset", "guide": "gaming-headset-guide.html",
        "low":  {"fps": ["HyperX Cloud Stinger 2 など有線軽量機", "約5,500〜8,000円 / 有線", "この帯は軽さと素直な音の有線機が正解。足音もきちんと拾えます。"],
                 "mix": ["HyperX Cloud Stinger 2 など有線軽量機", "約5,500〜8,000円 / 有線", "長時間でも疲れにくい軽さが魅力。最初の1台に十分です。"]},
        "mid":  {"fps": ["HyperX Cloud III Wireless", "約1.8〜2.2万円 / 低遅延無線", "定位の良さと装着感のバランスが高いFPS向け定番です。"],
                 "mix": ["Logicool G PRO X2 LIGHTSPEED", "約2.5〜3万円 / 無線/BT", "ゲームも通話も音楽もバランス良くこなす万能機です。"]},
        "high": {"fps": ["Razer BlackShark V2 Pro（2023）", "約2.3〜3万円 / 2.4G/BT", "定位特化の競技向け。足音の方向がわかりやすいと定評があります。"],
                 "mix": ["SteelSeries Arctis Nova Pro Wireless", "約4.2〜4.9万円 / ANC / ホットスワップ", "ノイキャンと電池ホットスワップを備えた最上位。環境ごと整えたい人向けです。"]},
    },
    "pad": {
        "label": "マウスパッド", "icon": "target", "guide": "gaming-mousepad-guide.html",
        "low":  {"fps": ["SteelSeries QcK Heavy", "約2,500〜3,500円 / 布・厚手", "厚手で安定する定番。迷ったらまずこれで困りません。"],
                 "mix": ["Razer Gigantus V2", "約2,000〜3,000円 / 布", "均一な滑りでジャンルを選ばない万能パッドです。"]},
        "mid":  {"fps": ["ARTISAN NINJA FX 零（ZERO）", "約4,000〜6,000円 / 布・コントロール", "止めの効くコントロール系の代表格。エイムの再現性を上げたい人へ。"],
                 "mix": ["Logicool G840 / G640", "約4,000〜5,500円 / 布・大型", "プロ使用者も多い大型の定番。キーボードごと載せる使い方もできます。"]},
        "high": {"fps": ["Pulsar Superglide 2（ガラス）", "約1.5〜1.8万円 / ガラス", "滑走特化のガラス製。速いエイムに振り切るならここまで来ます。"],
                 "mix": ["ARTISAN NINJA FX 零（ZERO）", "約4,000〜6,000円 / 布・コントロール", "パッドは高ければ良いわけではありません。品質最優先ならARTISANで十分満点です。"]},
    },
}

BUDGET_LABELS = {"low": "〜1万円", "mid": "1〜3万円", "high": "3万円〜"}
STYLE_LABELS = {"fps": "競技FPSが中心", "mix": "いろいろなゲームを遊ぶ"}

FAQ = [
    ("この提案はどうやって決まっていますか？",
     "各カテゴリの選び方ガイドで編集部が検証した「本命」製品を、予算とプレイスタイルで振り分けています。"
     "広告主の指定ではなく、ガイド本文と同じ基準です。"),
    ("もっと詳しく自分に合うものを知りたい",
     "24問のゲームセンス診断では、プレイの強み8能力を分析して、能力ごとに効くデバイスカテゴリまで提案します。"
     "所要時間は約3分です。"),
    ("提案された製品は必ず買うべきですか？",
     "いいえ。手の大きさ・持ち方・環境で最適解は変わります。提案はあくまで出発点として、"
     "各ガイドの比較表や、プロの使用状況もあわせて確認するのがおすすめです。"),
]


def esc(s):
    return html.escape(str(s), quote=True)


def head_for(HEAD):
    title = f'30秒デバイス提案｜3問であなたの1台を絞り込み | GamespecLab'
    desc = ('カテゴリ・予算・プレイスタイルの3問に答えるだけで、編集部が検証した「本命」から'
            'あなたに合う1台を提案します。登録不要・30秒。じっくり選びたい人には8能力診断も。')
    h = HEAD
    for pat, rep in [
        (r'<meta name="description" content="[^"]*" />', f'<meta name="description" content="{esc(desc)}" />'),
        (r'<meta property="og:title" content="[^"]*" />', f'<meta property="og:title" content="{esc(title)}" />'),
        (r'<meta property="og:description" content="[^"]*" />', f'<meta property="og:description" content="{esc(desc)}" />'),
        (r'<meta property="og:url" content="[^"]*" />', f'<meta property="og:url" content="{URL}" />'),
        (r'<meta name="twitter:title" content="[^"]*" />', '<meta name="twitter:title" content="30秒デバイス提案" />'),
        (r'<meta name="twitter:description" content="[^"]*" />', f'<meta name="twitter:description" content="{esc(desc)}" />'),
        (r'<title>[^<]*</title>', f'<title>{esc(title)}</title>'),
        (r'<link rel="canonical" href="[^"]*" />', f'<link rel="canonical" href="{URL}" />'),
    ]:
        h = re.sub(pat, lambda m, r=rep: r, h, count=1)
    ld = {
        "@context": "https://schema.org",
        "@graph": [
            {"@type": "WebApplication", "name": "30秒デバイス提案", "url": URL,
             "applicationCategory": "GameApplication", "operatingSystem": "Any",
             "description": desc,
             "offers": {"@type": "Offer", "price": "0", "priceCurrency": "JPY"}},
            {"@type": "BreadcrumbList", "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://gamespeclab.com/"},
                {"@type": "ListItem", "position": 2, "name": "30秒デバイス提案", "item": URL}]},
            {"@type": "FAQPage", "mainEntity": [
                {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}}
                for q, a in FAQ]},
        ],
    }
    i = h.find('<script type="application/ld+json">')
    j = h.find('</script>', i) + len('</script>')
    return (h[:i] + '<script type="application/ld+json">\n'
            + json.dumps(ld, ensure_ascii=False, indent=2) + '\n    </script>' + h[j:])


def main_html():
    faq_inner = ''.join(f'<div><strong>{esc(q)}</strong><p>{esc(a)}</p></div>' for q, a in FAQ)
    picks_json = json.dumps(PICKS, ensure_ascii=False)
    return f'''<main id="main">
      <section class="legal-hero">
        <div class="legal-copy">
          <p class="eyebrow">QUICK PICK</p>
          <h1><span>30秒デバイス提案</span></h1>
          <p class="lead">3問に答えるだけで、編集部が検証した「本命」からあなたに合う1台を絞り込みます。
          登録不要・無料。じっくり選びたくなったら、8能力を分析する本診断へどうぞ。</p>
        </div>
      </section>
      <section class="legal-section">
        <div class="article-body">
          <div class="article-card">
            <div id="qp-app" aria-live="polite"></div>
          </div>
          <div class="article-card affiliate-disclosure">
            <p class="eyebrow"><span data-icon="ad"></span>広告・アフィリエイトについて</p>
            <p>提案結果の「Amazonで見る」はAmazonアソシエイトのリンクを含む広告です。リンク経由の購入で当サイトが収益を得る場合があります。提案は各ガイドの編集部検証と同じ基準で行っており、メーカーからの依頼に基づくものではありません。価格・在庫・仕様は各製品ページでご確認ください。</p>
            <a class="ghost-link" href="affiliate-disclosure.html"><span data-icon="ad"></span>広告・アフィリエイト表記の詳細</a>
          </div>
          <div class="article-card">
            <p class="article-kicker">FAQ</p>
            <h2>よくある質問</h2>
            <div class="article-pair-grid">{faq_inner}</div>
          </div>
          <div class="article-card">
            <p class="article-kicker">DEEP DIVE</p>
            <h2>もっと自分に合わせたい人へ</h2>
            <div class="pro-user-chips">
              <a class="pro-user-chip" href="gamesense.html">ゲームセンス診断<small>24問・8能力を分析</small></a>
              <a class="pro-user-chip" href="device-zukan.html">デバイス図鑑<small>全52製品をスペック比較</small></a>
              <a class="pro-user-chip" href="pro-devices.html">プロ使用デバイス検索<small>26名から逆引き</small></a>
            </div>
          </div>
        </div>
      </section>
    </main>
    <script>
    (function(){{
      var PICKS = {picks_json};
      var BUDGETS = [["low","〜1万円"],["mid","1〜3万円"],["high","3万円〜"]];
      var STYLES = [["fps","競技FPSが中心"],["mix","いろいろなゲームを遊ぶ"]];
      var app = document.getElementById('qp-app');
      var state = {{ cat: null, budget: null, style: null }};

      function chip(label, sub, attr) {{
        return '<button type="button" class="qp-chip" ' + attr + '><b>' + label + '</b>'
          + (sub ? '<small>' + sub + '</small>' : '') + '</button>';
      }}
      function stepHeader(n, title) {{
        return '<div class="qp-step"><span class="qp-n">Q' + n + ' / 3</span><h2>' + title + '</h2></div>';
      }}
      function render() {{
        if (!state.cat) {{
          app.innerHTML = stepHeader(1, 'なにを買いたい？')
            + '<div class="qp-chips">'
            + Object.keys(PICKS).map(function(k){{
                return chip(PICKS[k].label, '', 'data-cat="' + k + '"');
              }}).join('') + '</div>';
          return;
        }}
        if (!state.budget) {{
          app.innerHTML = stepHeader(2, '予算は？')
            + '<div class="qp-chips">'
            + BUDGETS.map(function(b){{ return chip(b[1], '', 'data-budget="' + b[0] + '"'); }}).join('')
            + '</div>' + backLink();
          return;
        }}
        if (!state.style) {{
          app.innerHTML = stepHeader(3, '主に遊ぶのは？')
            + '<div class="qp-chips">'
            + STYLES.map(function(s){{ return chip(s[1], '', 'data-style="' + s[0] + '"'); }}).join('')
            + '</div>' + backLink();
          return;
        }}
        var cat = PICKS[state.cat];
        var pick = cat[state.budget][state.style];
        var name = pick[0], spec = pick[1], reason = pick[2];
        var amazon = 'https://www.amazon.co.jp/s?k=' + encodeURIComponent(name.replace(/[（(].*?[)）]/g, '').trim()) + '&tag=jbmt-22';
        var zukan = 'device-zukan.html?q=' + encodeURIComponent(name);
        app.innerHTML = '<div class="qp-result">'
          + '<p class="qp-kicker">あなたへの提案</p>'
          + '<h2 class="qp-name">' + name + '</h2>'
          + '<p class="qp-spec">' + spec + '</p>'
          + '<p class="qp-reason">' + reason + '</p>'
          + '<div class="qp-actions">'
          + '<a class="qp-buy" href="' + amazon + '" target="_blank" rel="sponsored noopener noreferrer" data-affiliate="quick-' + state.cat + '-' + state.budget + '-' + state.style + '">Amazonで見る</a>'
          + '<a class="qp-ghost" href="' + zukan + '">図鑑でスペックを見る</a>'
          + '<a class="qp-ghost" href="' + cat.guide + '">' + cat.label + 'の選び方を読む</a>'
          + '</div>'
          + '<div class="qp-deep"><b>もっと精度を上げるなら:</b> あなたのプレイの強み8能力から選ぶ'
          + '<a href="gamesense.html">ゲームセンス診断（24問・約3分）</a>へ。</div>'
          + '<button type="button" class="qp-again">最初からやり直す</button>'
          + '</div>';
        if (typeof trackEvent === 'function') {{
          trackEvent('quick_pick_done', {{ cat: state.cat, budget: state.budget, style: state.style, product: name }});
        }}
      }}
      function backLink() {{
        return '<p class="qp-back"><button type="button" class="qp-back-btn">← 1つ戻る</button></p>';
      }}
      app.addEventListener('click', function(e){{
        var t = e.target.closest('button, a');
        if (!t) return;
        if (t.dataset.cat) state.cat = t.dataset.cat;
        else if (t.dataset.budget) state.budget = t.dataset.budget;
        else if (t.dataset.style) state.style = t.dataset.style;
        else if (t.classList.contains('qp-again')) state = {{ cat: null, budget: null, style: null }};
        else if (t.classList.contains('qp-back-btn')) {{
          if (state.budget) state.budget = null; else state.cat = null;
        }} else return;
        render();
      }});
      render();
    }})();
    </script>
'''


tpl = open('pro-devices.html', encoding='utf-8').read()
HEAD = tpl[:tpl.find('<main id="main">')]
FOOT = tpl[tpl.find('<footer class="site-footer">'):]
open(SLUG, 'w', encoding='utf-8').write(head_for(HEAD) + main_html() + FOOT)
print(f'{SLUG} 生成 — {len(PICKS)}カテゴリ × 3予算 × 2スタイル = {len(PICKS) * 6}パターン')

# ---- sitemap.xml（冪等） ----
sm = open('sitemap.xml', encoding='utf-8').read()
if URL not in sm:
    anchor = '''  <url>
    <loc>https://gamespeclab.com/pro-devices.html</loc>'''
    entry = f'''  <url>
    <loc>{URL}</loc>
    <lastmod>2026-08-16</lastmod>
    <priority>0.7</priority>
  </url>
'''
    sm = sm.replace(anchor, entry + anchor, 1)
    open('sitemap.xml', 'w', encoding='utf-8').write(sm)
    print('sitemap: 1 件追加')
else:
    print('sitemap: 追加なし（登録済み）')

# ---- site-map.html（冪等） ----
s = open('site-map.html', encoding='utf-8').read()
if f'"{SLUG}"' not in s:
    m = re.search(r'<div><strong><a href="pro-devices\.html">.*?</div>', s, re.S)
    if m:
        ins = (f'\n              <div><strong><a href="{SLUG}">30秒デバイス提案</a></strong>'
               f'<p>3問であなたの1台を絞り込み</p></div>')
        s = s[:m.end()] + ins + s[m.end():]
        open('site-map.html', 'w', encoding='utf-8').write(s)
        print('site-map: 1 件追加')
else:
    print('site-map: 追加なし（登録済み）')
