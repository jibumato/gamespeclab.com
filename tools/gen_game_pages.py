#!/usr/bin/env python3
# ゲーム別の「プロ使用デバイスまとめ」ページを tools/pro_players.json から生成する。
# 再実行しても安全（毎回上書き）。sitemap.xml / site-map.html への登録も冪等に行う。
import json, re, html, os
from urllib.parse import quote, urlencode

os.chdir(os.path.join(os.path.dirname(__file__), '..'))
data = json.load(open('tools/pro_players.json', encoding='utf-8'))
UPDATED = data['updated']
PLAYERS = data['players']

CAT = {"mouse": "マウス", "kb": "キーボード", "mon": "モニター",
       "hs": "ヘッドセット/イヤホン", "pad": "マウスパッド"}
CAT_ORDER = ["mouse", "mon", "kb", "pad", "hs"]
GUIDE = {"mouse": "gaming-mouse-guide.html", "kb": "gaming-keyboard-guide.html",
         "mon": "gaming-monitor-guide.html", "hs": "gaming-headset-guide.html",
         "pad": "gaming-mousepad-guide.html"}

# 出力するゲームと、ページ固有のメタ情報
GAMES = [
    {"key": "VALORANT", "slug": "valorant", "label": "VALORANT",
     "intro": "VALORANTは1発の精度がそのまま勝敗に直結するタクティカルFPSで、低感度・高リフレッシュレートの構成が主流です。"},
    {"key": "Apex Legends", "slug": "apex", "label": "Apex Legends",
     "intro": "Apex Legendsは移動しながらの追いエイムが多く、振り向きの速さと軽さを両立するマウス選びが重視されます。"},
    {"key": "LoL", "slug": "lol", "label": "League of Legends",
     "intro": "League of Legendsはクリック精度と長時間の安定性が要求されるMOBAで、エイム系FPSとは選ばれる機材の傾向が異なります。"},
    {"key": "CS2", "slug": "cs2", "label": "Counter-Strike 2",
     "intro": "Counter-Strike 2は極端な低感度と高リフレッシュレートの文化が根強く、機材の世代交代も比較的ゆるやかです。"},
]

# 同一製品のエディション違い・表記ゆれを束ねる。
# 誤集計を避けるため、推測に頼らず明示的に列挙する方針。
ALIAS = {
    "Logicool G640r": "Logicool G640",
    "Logicool G PRO ワイヤレス": "Logicool G PRO Wireless",
    "Logicool G PRO X ワイヤレス": "Logicool G PRO X",
    "ARTISAN NINJA FX ZERO XSoft": "ARTISAN FX ZERO",
    "ARTISAN FX ZERO XL": "ARTISAN FX ZERO",
    "Wooting 80HE Frost": "Wooting 80HE",
}

AMAZON_TAG = 'jbmt-22'


def esc(s):
    return html.escape(str(s), quote=True)


def canon(name):
    """エディション表記（括弧内）を落としたうえで別名を正規化する。"""
    base = re.sub(r'[（(].*?[)）]', '', name).strip()
    return ALIAS.get(base, base)


def amazon_url(name):
    # 型番違いの誤リンクを避けるため、商品直リンクではなく検索結果へ送る
    q = re.sub(r'[（(].*?[)）]', '', name).strip()
    return 'https://www.amazon.co.jp/s?' + urlencode({'k': q, 'tag': AMAZON_TAG})


def aff_slug(name):
    t = re.sub(r'[（(].*?[)）]', '', name)
    t = re.sub(r'[^0-9A-Za-z]+', '-', t).strip('-').lower()
    return t[:40] or 'item'


def rank_products(players, cat):
    """(正規化名, 使用者リスト, 実表記のバリエーション) を使用者数の降順で返す。"""
    buckets = {}
    for p in players:
        for d in p['dev']:
            if d[0] != cat:
                continue
            key = canon(d[1])
            b = buckets.setdefault(key, {"users": [], "variants": []})
            b["users"].append(p)
            if d[1] not in b["variants"]:
                b["variants"].append(d[1])
    rows = [(k, v["users"], v["variants"]) for k, v in buckets.items()]
    # 使用者数の降順、同数なら名前順で安定させる
    rows.sort(key=lambda r: (-len(r[1]), r[0]))
    return rows


def rank_block(game, players, cat):
    rows = rank_products(players, cat)
    if not rows:
        return ''
    total = len(players)
    top_n = len(rows[0][1])
    items = []
    for name, users, variants in rows:
        n = len(users)
        # 全員バラバラのときに順位番号を振ると、実態のない序列に見えるため
        # 「最多」バッジは複数名が使う製品があるときだけ出す。
        badge = '<span class="prorank-top">最多</span>' if n == top_n and top_n >= 2 else ''
        chips = ''.join(
            f'<a class="pro-user-chip" href="pro-{u["id"]}.html">{esc(u["name"])}'
            f'<small>{esc(u["team"])}</small></a>' for u in users)
        variant_note = ''
        if len(variants) > 1 or variants[0] != name:
            variant_note = (f'<p class="prorank-variant">実際の表記: '
                            f'{esc(" / ".join(variants))}</p>')
        items.append(f'''
              <li class="prorank-row">
                <div class="prorank-head">
                  {badge}
                  <a class="prorank-name" href="pro-devices.html?q={quote(name)}"
                     title="この製品を使うプロを全タイトル横断で逆引き">{esc(name)}</a>
                  <span class="prorank-count"><b>{n}</b>/{total}名</span>
                </div>
                {variant_note}
                <div class="pro-user-chips">{chips}</div>
                <div class="prorank-actions">
                  <a class="pro-dev-guide" href="{GUIDE[cat]}">選び方</a>
                  <a class="pro-dev-buy" href="{amazon_url(name)}" target="_blank"
                     rel="sponsored noopener noreferrer"
                     data-affiliate="game-{game["slug"]}-{aff_slug(name)}">Amazonで探す</a>
                </div>
              </li>''')
    listed = sum(len(u) for _, u, _ in rows)
    if top_n >= 2:
        tops = [r[0] for r in rows if len(r[1]) == top_n]
        lead = (f'確認できた{listed}名のうち、{esc(" / ".join(tops))}が{top_n}名で最多です。')
    else:
        lead = f'確認できた{listed}名は全員が異なる{CAT[cat]}を使っています。'
    note = ''
    if listed < total:
        note = (f'<br>{total}名中{listed}名分の{CAT[cat]}情報を確認できています。'
                f'残りは出典が確認できないため未掲載です。')
    return f'''
          <div class="article-card">
            <p class="article-kicker">USAGE</p>
            <h2>{esc(CAT[cat])}の使用率</h2>
            <p class="prorank-note">{lead}{note}</p>
            <ul class="prorank-list">{''.join(items)}</ul>
          </div>'''


def roster_block(game, players):
    rows = []
    for p in sorted(players, key=lambda q: q['name'].lower()):
        devs = ' / '.join(f'{CAT[d[0]]}: {d[1]}' for d in p['dev'][:3])
        rows.append(f'''
                <tr>
                  <td><a href="pro-{p["id"]}.html">{esc(p["name"])}</a></td>
                  <td>{esc(p["team"])}</td>
                  <td>{esc(devs)}</td>
                </tr>''')
    return f'''
          <div class="article-card">
            <p class="article-kicker">PLAYERS</p>
            <h2>掲載中の{esc(game["label"])}プロ一覧</h2>
            <div class="prorank-scroll">
              <table class="prorank-table">
                <thead><tr><th>選手</th><th>所属</th><th>主な使用デバイス</th></tr></thead>
                <tbody>{''.join(rows)}</tbody>
              </table>
            </div>
            <p class="prorank-note">選手名をクリックすると、全デバイスと出典を掲載した個別ページに移動します。</p>
          </div>'''


def settings_block(game, players):
    withset = [p for p in players if p['settings']]
    if not withset:
        return ''
    keys = []
    for p in withset:
        for k, _ in p['settings']:
            if k not in keys:
                keys.append(k)
    # 主要な項目を優先して並べる
    pref = ['DPI', 'ゲーム内感度', 'eDPI', 'ポーリングレート', 'Windows感度', '解像度']
    keys.sort(key=lambda k: (pref.index(k) if k in pref else len(pref), k))
    head = ''.join(f'<th>{esc(k)}</th>' for k in keys)
    rows = []
    for p in sorted(withset, key=lambda q: q['name'].lower()):
        st = dict(p['settings'])
        cells = ''.join(f'<td>{esc(st.get(k, "―"))}</td>' for k in keys)
        rows.append(f'<tr><td><a href="pro-{p["id"]}.html">{esc(p["name"])}</a></td>{cells}</tr>')
    missing = len(players) - len(withset)
    note = ''
    if missing:
        note = (f'<p class="prorank-note">残り{missing}名は、信頼できる出典で数値を確認できなかったため'
                f'掲載していません。確認でき次第追加します。</p>')
    return f'''
          <div class="article-card">
            <p class="article-kicker">SETTINGS</p>
            <h2>{esc(game["label"])}プロの感度・eDPI一覧</h2>
            {note}
            <div class="prorank-scroll">
              <table class="prorank-table">
                <thead><tr><th>選手</th>{head}</tr></thead>
                <tbody>{''.join(rows)}</tbody>
              </table>
            </div>
            <p>eDPIは「マウスのDPI × ゲーム内感度」で求める、機材が違っても比較できる指標です。
            計算方法や自分に合う値の探し方は<a href="fps-sensitivity-guide.html">FPS感度の決め方</a>（eDPI・振り向き計算機つき）で解説しています。</p>
          </div>'''


def _usage_answer(rows, cat, tail):
    """同数タイのときに「最多」と言い切らないよう文面を切り替える。"""
    top_n = len(rows[0][1])
    listed = sum(len(u) for _, u, _ in rows)
    if top_n >= 2:
        tops = [r[0] for r in rows if len(r[1]) == top_n]
        return (f'当サイトで出典を確認できた{listed}名のうち、{" / ".join(tops)}が{top_n}名で最多です'
                f'（{UPDATED}時点）。{tail}')
    names = ' / '.join(r[0] for r in rows)
    return (f'出典を確認できた{listed}名は全員が異なる{cat}を使っており、突出した1製品はありません'
            f'（{UPDATED}時点）。内訳は{names}です。{tail}')


def faq_pairs_for(game, players):
    pairs = []
    mrows = rank_products(players, 'mouse')
    if mrows:
        pairs.append((
            f'{game["label"]}のプロに一番使われているマウスは？',
            _usage_answer(mrows, 'マウス',
                          '母数が小さい集計のため、傾向を掴む目安としてご覧ください。')))
    monrows = rank_products(players, 'mon')
    if monrows:
        pairs.append((
            f'{game["label"]}のプロはどんなモニターを使っている？',
            _usage_answer(monrows, 'モニター',
                          '競技シーンでは高リフレッシュレートのモデルが選ばれる傾向があります。')))
    withset = [p for p in players if p['settings'] and dict(p['settings']).get('eDPI')]
    if withset:
        vals = ', '.join(f'{p["name"]} {dict(p["settings"])["eDPI"]}' for p in withset)
        pairs.append((
            f'{game["label"]}プロのeDPIはどのくらい？',
            f'出典を確認できた範囲では{vals}です。eDPIはDPI×ゲーム内感度で算出します。'))
    pairs.append((
        'プロと同じデバイスを買えば強くなれる？',
        'デバイスはあくまで土台です。プロの使用機材にはスポンサー契約が関わることもあり、'
        '手の大きさ・持ち方・プレイスタイルが違えば最適解も変わります。'
        '傾向を掴む参考として使い、最終的には自分の手に合うかで選ぶのがおすすめです。'))
    return pairs


def head_for(game, players, HEAD):
    label = game['label']
    n = len(players)
    mrows = rank_products(players, 'mouse')
    top = mrows[0][0] if mrows else ''
    title = f"{label}プロの使用デバイスまとめ【{UPDATED}】 | GamespecLab"
    desc = (f"{label}のプロ選手{n}名の使用デバイスを出典つきで集計。マウス・モニター・キーボードの"
            f"使用率ランキングと感度・eDPI一覧を掲載しています。"
            + (f"最多使用マウスは{top}。" if top else ""))
    url = f"https://gamespeclab.com/{game['slug']}-pro-devices.html"
    h = HEAD
    h = re.sub(r'<meta name="description" content="[^"]*" />',
               f'<meta name="description" content="{esc(desc)}" />', h, count=1)
    h = re.sub(r'<meta property="og:title" content="[^"]*" />',
               f'<meta property="og:title" content="{esc(title)}" />', h, count=1)
    h = re.sub(r'<meta property="og:description" content="[^"]*" />',
               f'<meta property="og:description" content="{esc(desc)}" />', h, count=1)
    h = re.sub(r'<meta property="og:url" content="[^"]*" />',
               f'<meta property="og:url" content="{url}" />', h, count=1)
    h = re.sub(r'<meta name="twitter:title" content="[^"]*" />',
               f'<meta name="twitter:title" content="{esc(label + "プロの使用デバイスまとめ")}" />', h, count=1)
    h = re.sub(r'<meta name="twitter:description" content="[^"]*" />',
               f'<meta name="twitter:description" content="{esc(desc)}" />', h, count=1)
    h = re.sub(r'<title>[^<]*</title>', f'<title>{esc(title)}</title>', h, count=1)
    h = re.sub(r'<link rel="canonical" href="[^"]*" />',
               f'<link rel="canonical" href="{url}" />', h, count=1)

    faq = [{"@type": "Question", "name": q,
            "acceptedAnswer": {"@type": "Answer", "text": a}}
           for q, a in faq_pairs_for(game, players)]
    graph = [
        {"@type": "Article", "headline": f"{label}プロの使用デバイスまとめ", "url": url,
         "description": desc, "author": {"@type": "Organization", "name": "GamespecLab"},
         "publisher": {"@type": "Organization", "name": "GamespecLab"},
         "dateModified": "2026-08-08"},
        {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://gamespeclab.com/"},
            {"@type": "ListItem", "position": 2, "name": "プロ使用デバイス検索",
             "item": "https://gamespeclab.com/pro-devices.html"},
            {"@type": "ListItem", "position": 3, "name": f"{label}プロの使用デバイス", "item": url}]},
    ]
    if faq:
        graph.append({"@type": "FAQPage", "mainEntity": faq})
    ld = {"@context": "https://schema.org", "@graph": graph}
    i = h.find('<script type="application/ld+json">')
    j = h.find('</script>', i) + len('</script>')
    h = (h[:i] + '<script type="application/ld+json">\n'
         + json.dumps(ld, ensure_ascii=False, indent=2) + '\n    </script>' + h[j:])
    return h


def main_for(game, players):
    label = game['label']
    n = len(players)
    ranks = ''.join(rank_block(game, players, c) for c in CAT_ORDER)

    faq_html = ''
    pairs = faq_pairs_for(game, players)
    if pairs:
        inner = ''.join(f'<div><strong>{esc(q)}</strong><p>{esc(a)}</p></div>' for q, a in pairs)
        faq_html = f'''
          <div class="article-card">
            <p class="article-kicker">FAQ</p>
            <h2>よくある質問</h2>
            <div class="article-pair-grid">{inner}</div>
          </div>'''

    others = ''.join(
        f'<a class="pro-user-chip" href="{g["slug"]}-pro-devices.html">{esc(g["label"])}'
        f'<small>{sum(1 for p in PLAYERS if p["game"] == g["key"])}名</small></a>'
        for g in GAMES if g['key'] != game['key'])

    srcs = []
    for p in players:
        for s in p['src']:
            if s[1] not in [x[1] for x in srcs]:
                srcs.append(s)
    src_html = ' / '.join(
        f'<a href="{s[1]}" target="_blank" rel="noopener nofollow">{esc(s[0])}</a>' for s in srcs)

    return f'''<main id="main">
      <section class="legal-hero">
        <div class="legal-copy">
          <p class="eyebrow">PRO DEVICE</p>
          <h1><span>{esc(label)}プロの使用デバイスまとめ</span></h1>
          <p class="lead">{esc(label)}のプロ選手{n}名の使用デバイスを、出典つきで集計しました。
          マウス・モニター・キーボードなどカテゴリ別の使用率ランキングと、確認できた感度・eDPIを掲載しています。</p>
          <p class="lead">{esc(game['intro'])} 最終確認: {UPDATED}</p>
        </div>
      </section>
      <section class="legal-section">
        <div class="article-body">{ranks}
          <div class="article-card affiliate-disclosure">
            <p class="eyebrow"><span data-icon="ad"></span>広告・アフィリエイトについて</p>
            <p>「Amazonで探す」はAmazonアソシエイトのリンクを含む広告です。リンク経由の購入で当サイトが収益を得る場合があります。掲載内容は選手の使用機材を出典つきで整理したものであり、メーカーからの依頼に基づくものではありません。型番違いを避けるため商品ページではなく検索結果へリンクしています。価格・在庫・仕様は各製品ページでご確認ください。</p>
            <a class="ghost-link" href="affiliate-disclosure.html"><span data-icon="ad"></span>広告・アフィリエイト表記の詳細</a>
          </div>{settings_block(game, players)}{roster_block(game, players)}
          <div class="article-card">
            <p class="article-kicker">HOW TO USE</p>
            <h2>この集計の読み方</h2>
            <ul class="article-list">
              <li><strong>母数が小さい点に注意</strong><span>当サイトが出典を確認できた{n}名分の集計です。{esc(label)}のプロ全体を網羅した統計ではないため、傾向を掴む目安として使ってください。</span></li>
              <li><strong>スポンサー契約の影響がある</strong><span>使用デバイスはチームのスポンサー契約で決まる場合があります。「プロが選んだ最良の製品」とは限りません。</span></li>
              <li><strong>エディション違いはまとめて集計</strong><span>シグネチャーモデルなど同一製品の派生版は、本体の型番でまとめて数えています。各行の「実際の表記」で元の名称を確認できます。</span></li>
              <li><strong>情報は変わる</strong><span>プロは機材を頻繁に乗り換えます。最新の使用状況は本人の配信・公式SNSが最も確実です。</span></li>
            </ul>
          </div>{faq_html}
          <div class="article-card">
            <p class="article-kicker">RELATED</p>
            <h2>ほかのタイトルも見る</h2>
            <div class="pro-user-chips">{others}</div>
            <p style="margin-top:12px"><a class="primary-link" href="pro-devices.html"><span data-icon="arrow"></span>プロ使用デバイス検索で全{len(PLAYERS)}名を見る</a></p>
            <p style="margin-top:8px"><a class="primary-link" href="device-zukan.html"><span data-icon="arrow"></span>デバイス図鑑でスペックを比較する</a></p>
            <p class="pro-src">出典: {src_html}</p>
          </div>
        </div>
      </section>
    </main>
'''


def sync_pro_devices_data():
    """pro-devices.html の検索用DBを一次データから再生成する（手動同期のドリフト防止）。"""
    s = open('pro-devices.html', encoding='utf-8').read()
    rows = [{'name': p['name'], 'team': p['team'], 'game': p['game'], 'dev': p['dev'],
             'src': p['src'], 'note': p['note'], 'id': p['id']} for p in PLAYERS]
    payload = json.dumps(rows, ensure_ascii=False)
    new, cnt = re.subn(r'(\s*var DATA = )\[.*?\](;\n)',
                       lambda m: m.group(1) + payload + m.group(2), s, count=1, flags=re.S)
    if not cnt:
        raise SystemExit('pro-devices.html の DATA 置換に失敗')
    open('pro-devices.html', 'w', encoding='utf-8').write(new)
    print(f'pro-devices: 選手DB {len(rows)} 名を同期')


def sync_hub_links(made):
    """pro-devices.html のタイトル別リンクを一次データから再生成する（人数のズレ防止）。"""
    s = open('pro-devices.html', encoding='utf-8').read()
    chips = ''.join(
        f'\n              <a class="pro-user-chip" href="{fn}">{esc(game["label"])}'
        f'プロの使用デバイス<small>{n}名の使用率ランキング</small></a>' for fn, game, n in made)
    block = (f'<div class="pro-user-chips" id="game-hub-links">{chips}\n            </div>')
    new, cnt = re.subn(r'<div class="pro-user-chips" id="game-hub-links">.*?</div>',
                       lambda m: block, s, count=1, flags=re.S)
    if not cnt:
        raise SystemExit('game-hub-links の置換に失敗')
    open('pro-devices.html', 'w', encoding='utf-8').write(new)
    print(f'pro-devices: タイトル別リンク {len(made)} 件を同期')


tpl = open('pro-devices.html', encoding='utf-8').read()
HEAD = tpl[:tpl.find('<main id="main">')]
FOOT = tpl[tpl.find('<footer class="site-footer">'):]

# ---- ページ生成 ----
made = []
for game in GAMES:
    players = [p for p in PLAYERS if p['game'] == game['key']]
    if not players:
        continue
    out = head_for(game, players, HEAD) + main_for(game, players) + FOOT
    fn = f"{game['slug']}-pro-devices.html"
    open(fn, 'w', encoding='utf-8').write(out)
    made.append((fn, game, len(players)))
    print(f'{fn}: {len(players)}名')

# ---- sitemap.xml（冪等） ----
sm = open('sitemap.xml', encoding='utf-8').read()
added = 0
anchor = '''  <url>
    <loc>https://gamespeclab.com/pro-devices.html</loc>'''
for fn, game, n in made:
    loc = f'https://gamespeclab.com/{fn}'
    if loc not in sm:
        entry = f'''  <url>
    <loc>{loc}</loc>
    <lastmod>2026-08-08</lastmod>
    <priority>0.7</priority>
  </url>
'''
        sm = sm.replace(anchor, entry + anchor, 1)
        added += 1
open('sitemap.xml', 'w', encoding='utf-8').write(sm)
print(f'sitemap: {added} 件追加')

# ---- site-map.html（冪等） ----
s = open('site-map.html', encoding='utf-8').read()
added = 0
m = re.search(r'<div><strong><a href="pro-devices\.html">.*?</div>', s, re.S)
if m:
    ins = ''
    for fn, game, n in made:
        if f'"{fn}"' not in s:
            ins += (f'\n              <div><strong><a href="{fn}">{esc(game["label"])}'
                    f'プロの使用デバイスまとめ</a></strong>'
                    f'<p>{n}名の使用率ランキングと感度一覧</p></div>')
            added += 1
    s = s[:m.end()] + ins + s[m.end():]
    open('site-map.html', 'w', encoding='utf-8').write(s)
print(f'site-map: {added} 件追加')

sync_hub_links(made)
sync_pro_devices_data()
