#!/usr/bin/env python3
# プロ選手の個別ページ (pro-<id>.html) を tools/pro_players.json から生成する。
# 再実行しても安全（毎回上書き）。sitemap.xml / site-map.html への登録も冪等に行う。
import json, re, html, sys, os
from urllib.parse import quote, urlencode

os.chdir(os.path.join(os.path.dirname(__file__), '..'))
data = json.load(open('tools/pro_players.json', encoding='utf-8'))
UPDATED = data['updated']
PLAYERS = data['players']
CAT = {"mouse":"マウス","kb":"キーボード","mon":"モニター","hs":"ヘッドセット/イヤホン","pad":"マウスパッド"}

tpl = open('pro-devices.html', encoding='utf-8').read()
HEAD = tpl[:tpl.find('<main id="main">')]
FOOT = tpl[tpl.find('<footer class="site-footer">'):]

def esc(s): return html.escape(s, quote=True)

def head_for(p):
    name = p['name']; game = p['game']
    devnames = '・'.join(d[1] for d in p['dev'][:3])
    title = f"{name}の使用デバイス・設定まとめ【{UPDATED}】 | GamespecLab"
    desc = f"{game}プロ{name}（{p['team']}）の使用デバイスを出典つきで掲載。{devnames}など。同じ製品を使うプロの逆引きや、カテゴリ別の選び方ガイドにもつながります。"
    url = f"https://gamespeclab.com/pro-{p['id']}.html"
    h = HEAD
    h = re.sub(r'<meta name="description" content="[^"]*" />', f'<meta name="description" content="{esc(desc)}" />', h, count=1)
    h = re.sub(r'<meta property="og:title" content="[^"]*" />', f'<meta property="og:title" content="{esc(title)}" />', h, count=1)
    h = re.sub(r'<meta property="og:description" content="[^"]*" />', f'<meta property="og:description" content="{esc(desc)}" />', h, count=1)
    h = re.sub(r'<meta property="og:url" content="[^"]*" />', f'<meta property="og:url" content="{url}" />', h, count=1)
    h = re.sub(r'<meta name="twitter:title" content="[^"]*" />', f'<meta name="twitter:title" content="{esc(name + "の使用デバイス・設定まとめ")}" />', h, count=1)
    h = re.sub(r'<meta name="twitter:description" content="[^"]*" />', f'<meta name="twitter:description" content="{esc(desc)}" />', h, count=1)
    h = re.sub(r'<title>[^<]*</title>', f'<title>{esc(title)}</title>', h, count=1)
    h = re.sub(r'<link rel="canonical" href="[^"]*" />', f'<link rel="canonical" href="{url}" />', h, count=1)

    faq = []
    mouse = next((d for d in p['dev'] if d[0] == 'mouse'), None)
    if mouse:
        faq.append({"@type":"Question","name":f"{name}が使っているマウスは？",
                    "acceptedAnswer":{"@type":"Answer","text":f"{UPDATED}時点の情報では{mouse[1]}を使用しています。プロは機材を頻繁に変えるため、最新は本人の配信・SNSが確実です。"}})
    st = dict(p['settings'])
    if 'eDPI' in st:
        faq.append({"@type":"Question","name":f"{name}の感度・eDPIは？",
                    "acceptedAnswer":{"@type":"Answer","text":f"出典時点でeDPI {st['eDPI']}とされています。詳細は本文の設定欄と出典をご確認ください。"}})
    graph = [
        {"@type":"Article","headline":f"{name}の使用デバイス・設定まとめ","url":f"https://gamespeclab.com/pro-{p['id']}.html",
         "description":desc,"author":{"@type":"Organization","name":"GamespecLab"},
         "publisher":{"@type":"Organization","name":"GamespecLab"},"dateModified":"2026-08-06"},
        {"@type":"BreadcrumbList","itemListElement":[
            {"@type":"ListItem","position":1,"name":"Home","item":"https://gamespeclab.com/"},
            {"@type":"ListItem","position":2,"name":"プロ使用デバイス検索","item":"https://gamespeclab.com/pro-devices.html"},
            {"@type":"ListItem","position":3,"name":name,"item":f"https://gamespeclab.com/pro-{p['id']}.html"}]},
    ]
    if faq: graph.append({"@type":"FAQPage","mainEntity":faq})
    ld = {"@context":"https://schema.org","@graph":graph}
    i = h.find('<script type="application/ld+json">'); j = h.find('</script>', i) + len('</script>')
    h = h[:i] + '<script type="application/ld+json">\n' + json.dumps(ld, ensure_ascii=False, indent=2) + '\n    </script>' + h[j:]
    return h

AMAZON_TAG = 'jbmt-22'

def amazon_url(name):
    # 型番違いの誤リンクを避けるため、商品直リンクではなく検索結果へ送る
    q = re.sub(r'[（(].*?[)）]', '', name).strip()
    return 'https://www.amazon.co.jp/s?' + urlencode({'k': q, 'tag': AMAZON_TAG})

def aff_slug(name):
    t = re.sub(r'[（(].*?[)）]', '', name)
    t = re.sub(r'[^0-9A-Za-z]+', '-', t).strip('-').lower()
    return t[:40] or 'item'

def dev_line(d, pid):
    lookup = f'pro-devices.html?q={quote(d[1])}'
    return (f'<li class="pro-dev-row"><span class="pro-dev-cat">{esc(CAT[d[0]])}</span>'
            f'<a class="pro-dev-name" href="{lookup}" title="この製品を使うプロを逆引き">{esc(d[1])}</a>'
            + (f'<a class="pro-dev-guide" href="{d[2]}">選び方</a>' if d[2] else '')
            + f'<a class="pro-dev-buy" href="{amazon_url(d[1])}" target="_blank" rel="sponsored noopener noreferrer"'
              f' data-affiliate="pro-{pid}-{aff_slug(d[1])}">Amazonで探す</a></li>')

def main_for(p):
    name = p['name']
    same_game = [q for q in PLAYERS if q['game'] == p['game'] and q['id'] != p['id']]
    settings_html = ''
    if p['settings']:
        rows = ''.join(f'<li><strong>{esc(k)}</strong><span>{esc(v)}</span></li>' for k, v in p['settings'])
        settings_html = f'''
          <div class="article-card">
            <p class="article-kicker">SETTINGS</p>
            <h2>感度・設定</h2>
            <ul class="article-list">{rows}</ul>
            <p>eDPIの意味や自分に合う感度の探し方は<a href="fps-sensitivity-guide.html">FPS感度の決め方</a>（eDPI・振り向き計算機つき）で解説しています。</p>
          </div>'''
    note_html = f'<p class="pro-memo">{esc(p["note"])}</p>' if p['note'] else ''
    faq_pairs = []
    mouse = next((d for d in p['dev'] if d[0] == 'mouse'), None)
    if mouse:
        faq_pairs.append((f'{name}が使っているマウスは？', f'{UPDATED}時点の情報では{mouse[1]}を使用しています。プロは機材を頻繁に変えるため、最新は本人の配信・SNSが確実です。'))
    st = dict(p['settings'])
    if 'eDPI' in st:
        faq_pairs.append((f'{name}の感度・eDPIは？', f'出典時点でeDPI {st["eDPI"]}とされています。詳細は上の設定欄と出典をご確認ください。'))
    faq_html = ''
    if faq_pairs:
        inner = ''.join(f'<div><strong>{esc(q)}</strong><p>{esc(a)}</p></div>' for q, a in faq_pairs)
        faq_html = f'''
          <div class="article-card">
            <p class="article-kicker">FAQ</p>
            <h2>よくある質問</h2>
            <div class="article-pair-grid">{inner}</div>
          </div>'''
    chips = ''.join(f'<a class="pro-user-chip" href="pro-{q["id"]}.html">{esc(q["name"])}<small>{esc(q["team"])}</small></a>' for q in same_game)
    related_html = f'''
          <div class="article-card">
            <p class="article-kicker">RELATED</p>
            <h2>同じタイトルのプロを見る</h2>
            <div class="pro-user-chips">{chips}</div>
            <p style="margin-top:12px"><a class="primary-link" href="pro-devices.html"><span data-icon="arrow"></span>プロ使用デバイス検索で全選手を見る</a></p>
          </div>''' if same_game else f'''
          <div class="article-card">
            <p class="article-kicker">RELATED</p>
            <h2>ほかのプロを見る</h2>
            <p><a class="primary-link" href="pro-devices.html"><span data-icon="arrow"></span>プロ使用デバイス検索で全選手を見る</a></p>
          </div>'''
    return f'''<main id="main">
      <section class="legal-hero">
        <div class="legal-copy">
          <p class="eyebrow">PRO DEVICE</p>
          <h1><span>{esc(name)}の使用デバイス</span></h1>
          <p class="lead">{esc(p['blurb'])}</p>
          <p class="lead">{esc(p['game'])} / {esc(p['team'])} ─ 最終確認: {UPDATED}</p>
        </div>
      </section>
      <section class="legal-section">
        <div class="article-body">
          <div class="article-card">
            <p class="article-kicker">DEVICES</p>
            <h2>使用デバイス一覧</h2>
            <ul class="pro-dev-list pro-dev-list-page">{''.join(dev_line(d, p['id']) for d in p['dev'])}</ul>
            {note_html}
            <p class="pro-src">出典: {' / '.join(f'<a href="{s[1]}" target="_blank" rel="noopener nofollow">{esc(s[0])}</a>' for s in p['src'])}</p>
          </div>
          <div class="article-card affiliate-disclosure">
            <p class="eyebrow"><span data-icon="ad"></span>広告・アフィリエイトについて</p>
            <p>「Amazonで探す」はAmazonアソシエイトのリンクを含む広告です。リンク経由の購入で当サイトが収益を得る場合があります。掲載内容は選手の使用機材を出典つきで整理したものであり、メーカーからの依頼に基づくものではありません。型番違いを避けるため商品ページではなく検索結果へリンクしています。価格・在庫・仕様は各製品ページでご確認ください。</p>
            <a class="ghost-link" href="affiliate-disclosure.html"><span data-icon="ad"></span>広告・アフィリエイト表記の詳細</a>
          </div>{settings_html}
          <div class="article-card">
            <p class="article-kicker">HOW TO USE</p>
            <h2>この情報の使い方</h2>
            <ul class="article-list">
              <li><strong>「プロと同じ」を鵜呑みにしない</strong><span>使用デバイスにはスポンサー契約が関わる場合があります。手の大きさ・持ち方・プレイスタイルが違えば最適解も変わります。</span></li>
              <li><strong>診断・比較と組み合わせる</strong><span><a href="gamesense.html">ゲームセンス診断</a>で自分の強みを知り、<a href="device-zukan.html">デバイス図鑑</a>のスペック比較で候補を絞るのがおすすめです。</span></li>
              <li><strong>情報は変わる</strong><span>プロは機材を頻繁に乗り換えます。最新の使用状況は本人の配信・公式SNSが最も確実です。</span></li>
            </ul>
          </div>{faq_html}{related_html}
        </div>
      </section>
    </main>
'''

# ---- ページ生成 ----
for p in PLAYERS:
    out = head_for(p) + main_for(p) + FOOT
    open(f'pro-{p["id"]}.html', 'w', encoding='utf-8').write(out)
print(f'{len(PLAYERS)} ページ生成')

# ---- sitemap.xml（冪等） ----
sm = open('sitemap.xml', encoding='utf-8').read()
added = 0
anchor = '''  <url>
    <loc>https://gamespeclab.com/pro-devices.html</loc>'''
for p in PLAYERS:
    loc = f'https://gamespeclab.com/pro-{p["id"]}.html'
    if loc not in sm:
        entry = f'''  <url>
    <loc>{loc}</loc>
    <lastmod>2026-08-06</lastmod>
    <priority>0.6</priority>
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
    for p in PLAYERS:
        href = f'pro-{p["id"]}.html'
        if href not in s:
            ins += f'\n              <div><strong><a href="{href}">{esc(p["name"])}の使用デバイス</a></strong><p>{esc(p["game"])} / {esc(p["team"])}</p></div>'
            added += 1
    s = s[:m.end()] + ins + s[m.end():]
    open('site-map.html', 'w', encoding='utf-8').write(s)
print(f'site-map: {added} 件追加')
