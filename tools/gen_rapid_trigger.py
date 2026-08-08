#!/usr/bin/env python3
# ラピッドトリガー特集ページ (rapid-trigger-guide.html) を生成する。
# プロの採用状況は tools/pro_players.json から集計するため、選手を追加すれば自動で追従する。
# 再実行しても安全（毎回上書き）。sitemap.xml / site-map.html への登録も冪等に行う。
import json, re, html, os
from urllib.parse import quote, urlencode

os.chdir(os.path.join(os.path.dirname(__file__), '..'))
PLAYERS = json.load(open('tools/pro_players.json', encoding='utf-8'))['players']
UPDATED = '2026年8月'
SLUG = 'rapid-trigger-guide.html'
URL = f'https://gamespeclab.com/{SLUG}'
AMAZON_TAG = 'jbmt-22'


def esc(s):
    return html.escape(str(s), quote=True)


def amazon_url(name):
    q = re.sub(r'[（(].*?[)）]', '', name).strip()
    return 'https://www.amazon.co.jp/s?' + urlencode({'k': q, 'tag': AMAZON_TAG})


def aff_slug(name):
    t = re.sub(r'[（(].*?[)）]', '', name)
    t = re.sub(r'[^0-9A-Za-z]+', '-', t).strip('-').lower()
    return t[:40] or 'item'


# 掲載するラピッドトリガー対応製品。
# match は pro_players.json の使用デバイス名との照合に使う部分文字列。
KEYBOARDS = [
    {"name": "Wooting 60HE / 80HE", "match": "Wooting", "sw": "磁気式（ホールエフェクト）",
     "price": "約2.8〜4万円",
     "desc": "ラピッドトリガーを世に広めた元祖。競技FPSでの採用実績が最も厚く、迷ったときの基準になる1台です。"},
    {"name": "SteelSeries Apex Pro TKL Gen 3", "match": "Apex Pro", "sw": "磁気式（ホールエフェクト）",
     "price": "約3.2〜4.5万円",
     "desc": "調整幅と打鍵感のバランスが良い定番。キーごとのアクチュエーション設定が細かく、汎用機としても使えます。"},
    {"name": "Razer Huntsman V3 Pro TKL", "match": "Huntsman V3 Pro", "sw": "アナログ光学",
     "price": "約2.1〜2.8万円",
     "desc": "磁気式ではなくアナログ光学式でラピッドトリガーを実現。押し込み量の検知方式が違うだけで、体感の狙いは同じです。"},
    {"name": "ZENAIM KEYBOARD", "match": "ZENAIM", "sw": "磁気式（ホールエフェクト）",
     "price": "約3.5〜4.5万円",
     "desc": "ZETA DIVISION監修の国内開発モデル。ラピッドトリガー（MOTION HACK）を0.05mm単位、アクチュエーションを0.1〜1.8mmで設定できます。"},
    {"name": "Pulsar PCMK 3HE", "match": "PCMK", "sw": "磁気式（ホールエフェクト）",
     "price": "約2〜3万円",
     "desc": "バラして組み替えられるモジュラー構造の磁気軸。60%とTKLがあり、国内プロの採用も増えています。"},
    {"name": "磁気軸エントリー（CAROTMAS / AIM1瞬 など）", "match": None, "sw": "磁気式（ホールエフェクト）",
     "price": "約6,000〜12,000円",
     "desc": "1万円前後でラピッドトリガーを試せる価格帯。まず体感してから上位機に移るなら、ここから入るのが無駄になりません。"},
]

MICE = [
    {"name": "Logicool G PRO X2 SUPERSTRIKE", "match": "SUPERSTRIKE",
     "sw": "ハプティック誘導トリガーシステム（HITS）", "price": "約2.6〜2.9万円",
     "model": "G-PPD-004WL-STRK / G-PPD-004WL-STRKd",
     "amazon_q": "Logicool G PRO X2 SUPERSTRIKE G-PPD-004WL-STRK",
     "desc": "2026年2月19日発売。ラピッドトリガーをマウスに載せた世界初の製品です。"
             "メインクリックの押し込み量を連続的に検知し、アクチュエーションポイントを10段階、"
             "ラピッドトリガーを5段階で調整できます。クリック反応は最大30ms速くなるとされています。",
     "specs": [("重量", "約61g"), ("センサー", "HERO 2（最大44,000DPI）"),
               ("ポーリングレート", "最大8,000Hz"),
               ("接続", "LIGHTSPEED 2.4GHz / USB Type-C（POWERPLAY対応）"),
               ("バッテリー", "最大約90時間"),
               ("調整幅", "アクチュエーション10段階 / ラピッドトリガー5段階")]},
]

# 型番の枝番はスペックではなく保証期間と販路の違い。買う側が迷う点なので明記する。
MODEL_NOTE = '''
            <div class="rt-model">
              <p class="rt-model-title">型番が2つあります（性能は同じ）</p>
              <ul class="article-list">
                <li><strong>G-PPD-004WL-STRKd</strong><span>Amazon限定モデル。<b>1年間無償保証</b>のかわりに価格が抑えられており、実売は約2.65万円です。</span></li>
                <li><strong>G-PPD-004WL-STRK</strong><span>通常モデル。<b>2年間無償保証</b>で、公式ストア価格は29,150円（税込）です。</span></li>
              </ul>
              <p class="rt-model-foot">マウス本体の性能・付属品はどちらも同一で、違うのは保証期間と価格だけです。
              Amazonで買うなら末尾に「d」が付いたモデルが安く、長く保証を受けたいなら「d」なしを選ぶことになります。</p>
            </div>'''

SOURCES = [
    ("4Gamer（PRO X2 SUPERSTRIKE 発売告知）", "https://www.4gamer.net/games/023/G002336/20260127045/"),
    ("ロジクール公式プレスリリース", "https://press.logicool.co.jp/ja-jp/PRO-X2-SUPERSTRIKE/"),
    ("GAME Watch（PRO X2 SUPERSTRIKE レビュー）", "https://game.watch.impress.co.jp/docs/review/rev1/2086285.html"),
    ("ZENAIM 公式製品ページ", "https://zenaim.com/en/products/zenaim-keyboard"),
    ("GIGAZINE（CS2のSnap Tap禁止）", "https://gigazine.net/gsc_news/en/20240821-counter-strike-2-snap-tap/"),
]


def users_of(match):
    """該当製品を使うプロを pro_players.json から拾う。"""
    if not match:
        return []
    out = []
    for p in PLAYERS:
        for d in p['dev']:
            if match.lower() in d[1].lower():
                out.append((p, d[1]))
                break
    return out


def product_row(item, kind):
    us = users_of(item['match'])
    chips = ''
    if us:
        inner = ''.join(
            f'<a class="pro-user-chip" href="pro-{p["id"]}.html">{esc(p["name"])}'
            f'<small>{esc(p["game"])}</small></a>' for p, _ in us)
        chips = f'<div class="pro-user-chips">{inner}</div>'
    lookup = ''
    if item['match']:
        lookup = (f'<a class="pro-dev-guide" href="pro-devices.html?q={quote(item["match"])}">'
                  f'使用プロを見る</a>')
    model = (f'<p class="prorank-variant">型番: {esc(item["model"])}</p>'
             if item.get('model') else '')
    specs = ''
    if item.get('specs'):
        specs = ('<dl class="rt-spec">'
                 + ''.join(f'<div><dt>{esc(k)}</dt><dd>{esc(v)}</dd></div>' for k, v in item['specs'])
                 + '</dl>')
    return f'''
              <li class="prorank-row">
                <div class="prorank-head">
                  <span class="prorank-name">{esc(item['name'])}</span>
                  <span class="prorank-count">{esc(item['price'])}</span>
                </div>
                <p class="prorank-variant">検知方式: {esc(item['sw'])}</p>
                {model}
                <p class="rt-desc">{esc(item['desc'])}</p>
                {specs}
                {chips}
                <div class="prorank-actions">
                  <a class="pro-dev-guide" href="{'gaming-keyboard-guide.html' if kind == 'kb' else 'gaming-mouse-guide.html'}">選び方</a>
                  {lookup}
                  <a class="pro-dev-buy" href="{amazon_url(item.get('amazon_q') or item['name'])}" target="_blank"
                     rel="sponsored noopener noreferrer"
                     data-affiliate="rt-{kind}-{aff_slug(item['name'])}">Amazonで探す</a>
                </div>
              </li>'''


def pro_stats():
    """RT機器を使うプロの人数を集計する。"""
    kb_matches = [k['match'] for k in KEYBOARDS if k['match']]
    mouse_matches = [m['match'] for m in MICE if m['match']]
    kb_users, mouse_users, kb_recorded = set(), set(), set()
    for p in PLAYERS:
        for d in p['dev']:
            if d[0] == 'kb':
                kb_recorded.add(p['id'])
            if any(m.lower() in d[1].lower() for m in kb_matches):
                kb_users.add(p['id'])
            if any(m.lower() in d[1].lower() for m in mouse_matches):
                mouse_users.add(p['id'])
    return kb_users, mouse_users, kb_recorded


def pro_block():
    kb_users, mouse_users, kb_recorded = pro_stats()
    rows = []
    for p in PLAYERS:
        if p['id'] not in kb_users and p['id'] not in mouse_users:
            continue
        items = []
        for d in p['dev']:
            for it in KEYBOARDS + MICE:
                if it['match'] and it['match'].lower() in d[1].lower():
                    items.append(d[1])
        rows.append(f'''
                <tr>
                  <td><a href="pro-{p["id"]}.html">{esc(p["name"])}</a></td>
                  <td>{esc(p["game"])}</td>
                  <td>{esc(" / ".join(items))}</td>
                </tr>''')
    return f'''
          <div class="article-card">
            <p class="article-kicker">PRO ADOPTION</p>
            <h2>プロの採用状況</h2>
            <p class="prorank-note">当サイトが出典つきで掲載している{len(PLAYERS)}名のうち、
            キーボードの機種まで確認できた{len(kb_recorded)}名を見ると、{len(kb_users)}名がラピッドトリガー対応機を使っています。
            一方でマウス側は{len(mouse_users)}名にとどまります。これは製品が2026年2月に出たばかりで、
            まだ入れ替えが進んでいないためです。</p>
            <div class="prorank-scroll">
              <table class="prorank-table">
                <thead><tr><th>選手</th><th>タイトル</th><th>使用しているRT対応機</th></tr></thead>
                <tbody>{''.join(rows)}</tbody>
              </table>
            </div>
            <p style="margin-top:12px"><a class="primary-link" href="pro-devices.html"><span data-icon="arrow"></span>プロ使用デバイス検索で全{len(PLAYERS)}名を見る</a></p>
          </div>'''


FAQ = [
    ("ラピッドトリガーは本当に効果がありますか？",
     "左右の切り返し（ストレイフ）を多用するFPSでは、キーを離してから入力が切れるまでの距離が短くなるぶん、"
     "止まる・撃つまでの動作が速くなります。ただし効果はジャンルと操作内容に依存します。"
     "押しっぱなしが中心の操作や、切り返しの少ないジャンルでは体感差は小さくなります。"),
    ("ラピッドトリガーは大会で禁止されていませんか？",
     "ラピッドトリガーそのものは禁止されていません。禁止されたのは「SOCD（Snap Tap / 後入力優先）」という別機能です。"
     "Counter-Strike 2では2024年8月にValveがこれを禁止し、公式サーバーでは検知されるとキックされます。"
     "混同されやすいので、購入前に自分がプレイするタイトルの規定を確認してください。"),
    ("キーボードとマウス、どちらを先に買うべき？",
     "キーボードを先に検討することをおすすめします。ラピッドトリガーの恩恵が最も大きいのはWASDの切り返しで、"
     "そこはキーボード側の機能だからです。加えてキーボードは1万円前後から試せますが、"
     "ラピッドトリガー対応マウスは2026年8月時点で実質1機種、価格も2.6万円以上です。"),
    ("ラピッドトリガー対応のマウスは何種類ありますか？",
     f"{UPDATED}時点で当サイトが確認できたのは、ロジクールG PRO X2 SUPERSTRIKE の1機種のみです。"
     "「対応マウスおすすめ○選」といった記事も見かけますが、実際には非対応の製品が混ざっている場合があります。"
     "たとえばRazer Viper V3 Proは光学式スイッチを採用した製品で、ラピッドトリガーは搭載していません。"),
    ("G-PPD-004WL-STRKd と G-PPD-004WL-STRK は何が違いますか？",
     "マウス本体の性能・付属品は同一で、違うのは保証期間と価格だけです。"
     "末尾に「d」が付く G-PPD-004WL-STRKd はAmazon限定モデルで、無償保証が1年になるかわりに"
     "実売約2.65万円と安く設定されています。「d」なしの G-PPD-004WL-STRK は2年間無償保証で、"
     "公式ストア価格は29,150円（税込）です。"),
    ("磁気式とアナログ光学式では、どちらが良いですか？",
     "どちらもキーの押し込み量を連続的に検知してラピッドトリガーを実現する方式で、優劣というより設計思想の違いです。"
     "製品数は磁気式のほうが多く、選択肢の広さを重視するなら磁気式が無難です。"),
]


def main_html():
    kb_users, mouse_users, kb_recorded = pro_stats()
    kb_rows = ''.join(product_row(k, 'kb') for k in KEYBOARDS)
    mouse_rows = ''.join(product_row(m, 'mouse') for m in MICE)
    faq_inner = ''.join(f'<div><strong>{esc(q)}</strong><p>{esc(a)}</p></div>' for q, a in FAQ)
    src = ' / '.join(f'<a href="{u}" target="_blank" rel="noopener nofollow">{esc(t)}</a>'
                     for t, u in SOURCES)
    return f'''<main id="main">
      <section class="legal-hero">
        <div class="legal-copy">
          <p class="eyebrow">FEATURE</p>
          <h1><span>ラピッドトリガー搭載デバイス特集</span><span>キーボードは成熟、マウスはついに実用化</span></h1>
          <p class="lead">キーを離した瞬間に入力が切れる「ラピッドトリガー」。キーボードではすでに定番機能になりましたが、
          2026年にはマウスにも搭載機が登場しました。両方をまとめて、いま何が選べるのかを整理します。</p>
          <p class="lead">最終確認: {UPDATED}</p>
        </div>
      </section>
      <section class="legal-section">
        <div class="article-body">
          <div class="article-card">
            <p class="article-kicker">30 SECONDS</p>
            <h2>ラピッドトリガーとは</h2>
            <p>通常のキーボードは「押し込む深さ」と「離して戻る深さ」があらかじめ決まっています。
            ラピッドトリガーはこれを固定せず、<strong>少しでも指を離した瞬間に入力がオフ、少しでも押した瞬間にオン</strong>になります。
            キーをどこまで戻したかに関係なく反応するため、同じキーを素早く押し直す動作が速くなります。</p>
            <p>実現には、キーの押し込み量を段階的に検知できるスイッチが必要です。
            主流は<strong>磁気式（ホールエフェクト）</strong>で、ほかに<strong>アナログ光学式</strong>があります。
            仕組みの詳細は<a href="gaming-tech-guide.html">ゲーミングデバイスの技術解説</a>で扱っています。</p>
          </div>

          <div class="article-card">
            <p class="article-kicker">KEYBOARD</p>
            <h2>キーボード編 ── 選択肢は出揃っている</h2>
            <p class="prorank-note">価格帯は1万円前後から4万円台まで広がり、用途と予算で選べる状態になっています。
            以下は当サイトが掲載しているラピッドトリガー対応モデルです。</p>
            <ul class="prorank-list">{kb_rows}</ul>
          </div>

          <div class="article-card">
            <p class="article-kicker">MOUSE</p>
            <h2>マウス編 ── 2026年、ようやく実用化された</h2>
            <p>ラピッドトリガーは長らくキーボードだけの機能でした。これが変わったのが2026年2月19日、
            ロジクールGが<strong>世界初のラピッドトリガー搭載マウス</strong>として PRO X2 SUPERSTRIKE を発売したときです。</p>
            <p>メインクリックに「ハプティック誘導トリガーシステム（HITS）」を採用し、
            押し込み量を連続的に検知します。アクチュエーションポイントは10段階、ラピッドトリガーは5段階で調整でき、
            クリック反応は最大30ms速くなるとされています。</p>
            <ul class="prorank-list">{mouse_rows}</ul>{MODEL_NOTE}
            <p class="rt-caution"><strong>注意:</strong> 「ラピッドトリガー対応マウスおすすめ○選」といった記事では、
            実際には非対応の製品が混ざっていることがあります。たとえば Razer Viper V3 Pro は光学式スイッチを採用した高性能マウスですが、
            ラピッドトリガーは搭載していません。{UPDATED}時点で当サイトが確認できた対応マウスは、上記1機種のみです。</p>
          </div>

          <div class="article-card affiliate-disclosure">
            <p class="eyebrow"><span data-icon="ad"></span>広告・アフィリエイトについて</p>
            <p>「Amazonで探す」はAmazonアソシエイトのリンクを含む広告です。リンク経由の購入で当サイトが収益を得る場合があります。掲載内容はメーカーからの依頼に基づくものではありません。型番違いを避けるため商品ページではなく検索結果へリンクしています。価格・在庫・仕様は各製品ページでご確認ください。</p>
            <a class="ghost-link" href="affiliate-disclosure.html"><span data-icon="ad"></span>広告・アフィリエイト表記の詳細</a>
          </div>

          <div class="article-card">
            <p class="article-kicker">WHICH FIRST</p>
            <h2>キーボードとマウス、どちらから買うべきか</h2>
            <p><strong>キーボードが先です。</strong>理由は3つあります。</p>
            <ul class="article-list">
              <li><strong>恩恵が大きいのはWASD側</strong><span>ラピッドトリガーが最も効くのは左右の切り返し（ストレイフ）で、これはキーボードの操作です。マウスのクリックを素早く切り返す場面は、それに比べると限られます。</span></li>
              <li><strong>試すコストが違う</strong><span>キーボードは1万円前後の入門機でも機能自体は体験できます。対応マウスは2.6万円以上で、しかも選択肢が1機種しかありません。</span></li>
              <li><strong>マウス側はまだ黎明期</strong><span>発売から日が浅く、競合製品も出ていません。急がなければ、選択肢が増えてからでも遅くありません。</span></li>
            </ul>
          </div>

          <div class="article-card">
            <p class="article-kicker">WHEN IT WORKS</p>
            <h2>効果が出る場面・出にくい場面</h2>
            <ul class="article-list">
              <li><strong>効果が出やすい</strong><span>FPSのストレイフ撃ち（左右の切り返しから止まって撃つ）、Fortniteの建築・編集、格闘ゲームや音ゲーの高速入力。いずれも「同じキーを短時間に押し直す」動作が多いジャンルです。</span></li>
              <li><strong>効果が出にくい</strong><span>MOBAやRTSのようにキーの押し直しが少ない操作、移動を押しっぱなしにする場面。ラピッドトリガーは「離してから切れるまで」を短くする機能なので、離す動作が少なければ差は出ません。</span></li>
              <li><strong>SOCDは別機能で、禁止されている場合がある</strong><span>左右同時押し時に後から押した方を優先する「SOCD / Snap Tap」は、ラピッドトリガーとは別の機能です。Counter-Strike 2では2024年8月にValveが禁止し、公式サーバーでは検知されるとキックされます。ラピッドトリガー自体は禁止されていませんが、混同しないよう注意してください。</span></li>
            </ul>
          </div>{pro_block()}

          <div class="article-card">
            <p class="article-kicker">FAQ</p>
            <h2>よくある質問</h2>
            <div class="article-pair-grid">{faq_inner}</div>
          </div>

          <div class="article-card">
            <p class="article-kicker">RELATED</p>
            <h2>あわせて読みたい</h2>
            <div class="pro-user-chips">
              <a class="pro-user-chip" href="gaming-keyboard-guide.html">ゲーミングキーボードの選び方<small>ランキングと比較</small></a>
              <a class="pro-user-chip" href="gaming-mouse-guide.html">ゲーミングマウスの選び方<small>ランキングと比較</small></a>
              <a class="pro-user-chip" href="gaming-tech-guide.html">デバイスの技術解説<small>磁気軸・8000Hzの仕組み</small></a>
              <a class="pro-user-chip" href="device-zukan.html">デバイス図鑑<small>全52製品をスペック比較</small></a>
            </div>
            <p class="pro-src">出典: {src}</p>
          </div>
        </div>
      </section>
    </main>
'''


def head_html(HEAD):
    kb_users, mouse_users, _ = pro_stats()
    title = f'ラピッドトリガー搭載デバイス特集｜キーボードとマウス【{UPDATED}】 | GamespecLab'
    desc = ('ラピッドトリガー対応のキーボードとマウスをまとめて解説。2026年に登場した世界初のRT搭載マウス'
            'PRO X2 SUPERSTRIKEの仕様、対応キーボード6機種の比較、プロの採用状況、'
            'SOCD禁止との違いまで出典つきで整理しています。')
    h = HEAD
    for pat, rep in [
        (r'<meta name="description" content="[^"]*" />', f'<meta name="description" content="{esc(desc)}" />'),
        (r'<meta property="og:title" content="[^"]*" />', f'<meta property="og:title" content="{esc(title)}" />'),
        (r'<meta property="og:description" content="[^"]*" />', f'<meta property="og:description" content="{esc(desc)}" />'),
        (r'<meta property="og:url" content="[^"]*" />', f'<meta property="og:url" content="{URL}" />'),
        (r'<meta name="twitter:title" content="[^"]*" />', '<meta name="twitter:title" content="ラピッドトリガー搭載デバイス特集｜キーボードとマウス" />'),
        (r'<meta name="twitter:description" content="[^"]*" />', f'<meta name="twitter:description" content="{esc(desc)}" />'),
        (r'<title>[^<]*</title>', f'<title>{esc(title)}</title>'),
        (r'<link rel="canonical" href="[^"]*" />', f'<link rel="canonical" href="{URL}" />'),
    ]:
        h = re.sub(pat, lambda m, r=rep: r, h, count=1)

    graph = [
        {"@type": "Article", "headline": "ラピッドトリガー搭載デバイス特集｜キーボードとマウス",
         "url": URL, "description": desc,
         "author": {"@type": "Organization", "name": "GamespecLab"},
         "publisher": {"@type": "Organization", "name": "GamespecLab"},
         "dateModified": "2026-08-08"},
        {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://gamespeclab.com/"},
            {"@type": "ListItem", "position": 2, "name": "読み物", "item": "https://gamespeclab.com/articles.html"},
            {"@type": "ListItem", "position": 3, "name": "ラピッドトリガー搭載デバイス特集", "item": URL}]},
        {"@type": "FAQPage", "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}}
            for q, a in FAQ]},
    ]
    ld = {"@context": "https://schema.org", "@graph": graph}
    i = h.find('<script type="application/ld+json">')
    j = h.find('</script>', i) + len('</script>')
    return (h[:i] + '<script type="application/ld+json">\n'
            + json.dumps(ld, ensure_ascii=False, indent=2) + '\n    </script>' + h[j:])


tpl = open('pro-devices.html', encoding='utf-8').read()
HEAD = tpl[:tpl.find('<main id="main">')]
FOOT = tpl[tpl.find('<footer class="site-footer">'):]
open(SLUG, 'w', encoding='utf-8').write(head_html(HEAD) + main_html() + FOOT)
kb_u, mo_u, kb_rec = pro_stats()
print(f'{SLUG} 生成 — キーボード{len(KEYBOARDS)}機種 / マウス{len(MICE)}機種 / '
      f'RT使用プロ キーボード{len(kb_u)}名・マウス{len(mo_u)}名')

# ---- sitemap.xml（冪等） ----
sm = open('sitemap.xml', encoding='utf-8').read()
if URL not in sm:
    anchor = '''  <url>
    <loc>https://gamespeclab.com/gaming-tech-guide.html</loc>'''
    if anchor not in sm:
        anchor = '''  <url>
    <loc>https://gamespeclab.com/pro-devices.html</loc>'''
    entry = f'''  <url>
    <loc>{URL}</loc>
    <lastmod>2026-08-08</lastmod>
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
    m = re.search(r'<div><strong><a href="gaming-tech-guide\.html">.*?</div>', s, re.S)
    if m:
        ins = (f'\n              <div><strong><a href="{SLUG}">ラピッドトリガー搭載デバイス特集</a></strong>'
               f'<p>対応キーボード・マウスとプロの採用状況</p></div>')
        s = s[:m.end()] + ins + s[m.end():]
        open('site-map.html', 'w', encoding='utf-8').write(s)
        print('site-map: 1 件追加')
    else:
        print('site-map: 挿入位置が見つからず未登録')
else:
    print('site-map: 追加なし（登録済み）')
