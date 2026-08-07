#!/usr/bin/env python3
# 「A vs B」比較ページ (vs-<id>.html) を tools/vs_pairs.json から生成する。
# スペックは device-zukan.html の DATA、プロ使用実績は tools/pro_players.json を参照。
# 再実行可能（冪等）。sitemap.xml / site-map.html への登録も行う。
import json, re, html, os
from urllib.parse import urlencode, quote

os.chdir(os.path.join(os.path.dirname(__file__), '..'))
CFG = json.load(open('tools/vs_pairs.json', encoding='utf-8'))
UPDATED = CFG['updated']
PRO = json.load(open('tools/pro_players.json', encoding='utf-8'))['players']

zs = open('device-zukan.html', encoding='utf-8').read()
ZDATA = {d['name']: d for d in json.loads(re.search(r'var DATA = (\[.*?\]);', zs, re.S).group(1))}

tpl = open('pro-devices.html', encoding='utf-8').read()
HEAD = tpl[:tpl.find('<main id="main">')]
FOOT = tpl[tpl.find('<footer class="site-footer">'):]

def esc(s): return html.escape(str(s), quote=True)
def aff_slug(name):
    t = re.sub(r'[（(].*?[)）]', '', name)
    return (re.sub(r'[^0-9A-Za-z]+', '-', t).strip('-').lower() or 'item')[:40]

def pros_using(name):
    out = []
    for p in PRO:
        if any(d[1] == name for d in p['dev']):
            out.append(p)
    return out

def build(pair):
    A, B = ZDATA[pair['a']], ZDATA[pair['b']]
    title = f"{pair['a']} と {pair['b']} はどっち？スペック比較と選び方 | GamespecLab"
    desc = f"{pair['a']}と{pair['b']}をスペック・価格帯で比較。どんな人にどちらが向くのかを、用途別にはっきり結論づけます。プロの使用実績も掲載。"
    url = f"https://gamespeclab.com/vs-{pair['id']}.html"

    h = HEAD
    for pat, rep in [
        (r'<meta name="description" content="[^"]*" />', f'<meta name="description" content="{esc(desc)}" />'),
        (r'<meta property="og:title" content="[^"]*" />', f'<meta property="og:title" content="{esc(title)}" />'),
        (r'<meta property="og:description" content="[^"]*" />', f'<meta property="og:description" content="{esc(desc)}" />'),
        (r'<meta property="og:url" content="[^"]*" />', f'<meta property="og:url" content="{url}" />'),
        (r'<meta name="twitter:title" content="[^"]*" />', f'<meta name="twitter:title" content="{esc(pair["a"])} vs {esc(pair["b"])}" />'),
        (r'<meta name="twitter:description" content="[^"]*" />', f'<meta name="twitter:description" content="{esc(desc)}" />'),
        (r'<title>[^<]*</title>', f'<title>{esc(title)}</title>'),
        (r'<link rel="canonical" href="[^"]*" />', f'<link rel="canonical" href="{url}" />'),
    ]:
        h = re.sub(pat, rep, h, count=1)

    ld = {"@context":"https://schema.org","@graph":[
      {"@type":"Article","headline":title,"url":url,"description":desc,
       "author":{"@type":"Organization","name":"GamespecLab"},
       "publisher":{"@type":"Organization","name":"GamespecLab"},"dateModified":"2026-08-06"},
      {"@type":"BreadcrumbList","itemListElement":[
        {"@type":"ListItem","position":1,"name":"Home","item":"https://gamespeclab.com/"},
        {"@type":"ListItem","position":2,"name":"デバイス図鑑","item":"https://gamespeclab.com/device-zukan.html"},
        {"@type":"ListItem","position":3,"name":f"{pair['a']} vs {pair['b']}","item":url}]},
      {"@type":"FAQPage","mainEntity":[
        {"@type":"Question","name":f"{pair['a']}と{pair['b']}はどちらが良い？",
         "acceptedAnswer":{"@type":"Answer","text":pair['verdict']}}]}]}
    i = h.find('<script type="application/ld+json">'); j = h.find('</script>', i) + len('</script>')
    h = h[:i] + '<script type="application/ld+json">\n' + json.dumps(ld, ensure_ascii=False, indent=2) + '\n    </script>' + h[j:]

    keys = list(dict.fromkeys(list(A.get('specs', {})) + list(B.get('specs', {}))))
    rows = f'<tr><th scope="row">価格帯</th><td>{esc(A.get("price","—"))}</td><td>{esc(B.get("price","—"))}</td></tr>'
    rows += ''.join(f'<tr><th scope="row">{esc(k)}</th><td>{esc(A.get("specs",{}).get(k,"—"))}</td>'
                    f'<td>{esc(B.get("specs",{}).get(k,"—"))}</td></tr>' for k in keys)

    def buy(item, side):
        return (f'<a class="vs-buy" href="{item["link"]}" target="_blank" rel="sponsored noopener noreferrer" '
                f'data-affiliate="vs-{pair["id"]}-{side}-{aff_slug(item["name"])}">Amazonで価格を見る</a>')

    def pro_note(name):
        ps = pros_using(name)
        if not ps: return ''
        names = '・'.join(f'<a href="pro-{p["id"]}.html">{esc(p["name"])}</a>' for p in ps)
        return f'<p class="vs-pro">プロ使用: {names}</p>'

    def side_card(item, forlist, side, label):
        lis = ''.join(f'<li>{esc(x)}</li>' for x in forlist)
        return (f'<div class="vs-side"><span class="vs-side-tag">{label}</span>'
                f'<h3>{esc(item["name"])}</h3><p class="vs-price">{esc(item.get("price","—"))}</p>'
                f'{pro_note(item["name"])}'
                f'<p class="vs-side-head">こんな人に向く</p><ul class="vs-list">{lis}</ul>'
                f'{buy(item, side)}'
                + (f'<a class="vs-guide" href="{item["guide"]}">{esc(item["glabel"])}を読む</a>' if item.get('guide') else '')
                + '</div>')

    main = f'''<main id="main">
      <section class="legal-hero">
        <div class="legal-copy">
          <p class="eyebrow">VS COMPARE</p>
          <h1><span>{esc(pair['a'])}</span><span>vs {esc(pair['b'])}</span></h1>
          <p class="lead">{esc(pair['lead'])}</p>
          <p class="lead">最終確認: {UPDATED}</p>
        </div>
      </section>
      <section class="legal-section">
        <div class="article-body">
          <div class="article-card">
            <p class="article-kicker">SPEC</p>
            <h2>スペック比較</h2>
            <div class="zukan-cmp-scroll">
              <table class="zukan-cmp-table">
                <thead><tr><th scope="col">項目</th><th scope="col">{esc(pair['a'])}</th><th scope="col">{esc(pair['b'])}</th></tr></thead>
                <tbody>{rows}</tbody>
              </table>
            </div>
            <p class="vs-note">スペックはメーカー公称値をもとにした比較用の要約です。価格帯は{UPDATED}時点の目安で変動します。</p>
          </div>
          <div class="article-card">
            <p class="article-kicker">WHICH ONE</p>
            <h2>どちらを選ぶべきか</h2>
            <div class="vs-grid">
              {side_card(A, pair['a_for'], 'a', 'A')}
              {side_card(B, pair['b_for'], 'b', 'B')}
            </div>
          </div>
          <div class="article-card vs-verdict">
            <p class="article-kicker">VERDICT</p>
            <h2>編集部の結論</h2>
            <p>{esc(pair['verdict'])}</p>
          </div>
          <div class="article-card affiliate-disclosure">
            <p class="eyebrow"><span data-icon="ad"></span>広告・アフィリエイトについて</p>
            <p>本ページの購入リンクにはAmazonアソシエイトを利用しています。リンク経由の購入で当サイトが収益を得る場合があります。比較は編集部による用途別の整理であり、特定メーカーからの依頼に基づくものではありません。価格・在庫・仕様は各製品ページでご確認ください。</p>
            <a class="ghost-link" href="affiliate-disclosure.html"><span data-icon="ad"></span>広告・アフィリエイト表記の詳細</a>
          </div>
          <div class="article-card">
            <p class="article-kicker">NEXT</p>
            <h2>次に読みたい</h2>
            <div class="article-pair-grid">
              <div><strong><a href="device-zukan.html">デバイス図鑑で比較する</a></strong><p>他の製品とも横並びでスペック比較できます。</p></div>
              <div><strong><a href="pro-devices.html">プロ使用デバイス検索</a></strong><p>トップ選手が実戦で使う機材を逆引き。</p></div>
              <div><strong><a href="gamesense.html">ゲームセンス診断</a></strong><p>自分の強みから、効くデバイスの方向を知る。</p></div>
              <div><strong><a href="gaming-tech-guide.html">デバイスの技術解説</a></strong><p>磁気軸・8000Hz・QD-OLEDの仕組み。</p></div>
            </div>
          </div>
        </div>
      </section>
    </main>
'''
    return h + main + FOOT

for pair in CFG['pairs']:
    for key in ('a','b'):
        if pair[key] not in ZDATA: raise SystemExit(f'図鑑に無い製品: {pair[key]}')
    open(f'vs-{pair["id"]}.html', 'w', encoding='utf-8').write(build(pair))
print(f'{len(CFG["pairs"])} ページ生成')

# sitemap
sm = open('sitemap.xml', encoding='utf-8').read()
anchor = '''  <url>
    <loc>https://gamespeclab.com/device-zukan.html</loc>'''
added = 0
for pair in CFG['pairs']:
    loc = f'https://gamespeclab.com/vs-{pair["id"]}.html'
    if loc not in sm:
        sm = sm.replace(anchor, f'''  <url>
    <loc>{loc}</loc>
    <lastmod>2026-08-06</lastmod>
    <priority>0.6</priority>
  </url>
''' + anchor, 1)
        added += 1
open('sitemap.xml','w',encoding='utf-8').write(sm)
print(f'sitemap: {added} 件追加')

# site-map.html
s = open('site-map.html', encoding='utf-8').read()
m = re.search(r'<div><strong><a href="pro-devices\.html">.*?</div>', s, re.S)
added = 0
if m:
    ins = ''
    for pair in CFG['pairs']:
        href = f'vs-{pair["id"]}.html'
        if href not in s:
            ins += f'\n              <div><strong><a href="{href}">{esc(pair["a"])} vs {esc(pair["b"])}</a></strong><p>スペック比較と用途別の選び分け。</p></div>'
            added += 1
    s = s[:m.end()] + ins + s[m.end():]
    open('site-map.html','w',encoding='utf-8').write(s)
print(f'site-map: {added} 件追加')
