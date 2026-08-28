#!/usr/bin/env python3
# サイト横断検索のインデックス (search-index.json) を生成する。
# 収録: 図鑑の全製品 / プロ選手全員 / sitemap.xml 掲載の全ページ。
# 再実行しても安全（毎回上書き）。ページを増やしたら再実行するだけで反映される。
import json, re, html, os

os.chdir(os.path.join(os.path.dirname(__file__), '..'))

entries = []


def add(title, sub, url, kind, extra_keywords=''):
    entries.append({
        't': title,
        's': sub,
        'u': url,
        'c': kind,
        # 検索は小文字化した title + sub + k に対する部分一致で行う
        'k': extra_keywords,
    })


# ---- 製品（図鑑の DATA が一次データ）----
zukan = open('device-zukan.html', encoding='utf-8').read()
DATA = json.loads(re.search(r'      var DATA = (\[.*?\]);\n', zukan, re.S).group(1))
for d in DATA:
    spec = ' / '.join(list(d.get('specs', {}).values())[:2])
    add(d['name'], f"{d['cat']}・{d['price']}" + (f'・{spec}' if spec else ''),
        f"device-zukan.html?q={d['name']}", '製品')

# ---- プロ選手 ----
players = json.load(open('tools/pro_players.json', encoding='utf-8'))['players']
for p in players:
    devs = '・'.join(dv[1] for dv in p['dev'][:2])
    add(p['name'], f"{p['game']} / {p['team']}", f"pro-{p['id']}.html", 'プロ', devs)

# ---- ページ（sitemap.xml 掲載分）----
sm = open('sitemap.xml', encoding='utf-8').read()
locs = re.findall(r'<loc>https://gamespeclab\.com/([^<]*)</loc>', sm)
skip_prefix = ('pro-',)  # 選手個別ページはプロ枠で収録済み
for loc in locs:
    page = loc or 'index.html'
    if page.startswith(skip_prefix) and page != 'pro-devices.html':
        continue
    if not os.path.exists(page):
        continue
    src = open(page, encoding='utf-8').read()
    tm = re.search(r'<title>([^<]*)</title>', src)
    dm = re.search(r'<meta name="description" content="([^"]*)"', src)
    if not tm:
        continue
    title = html.unescape(tm.group(1)).split(' | ')[0].split('｜')[0].strip()
    desc = html.unescape(dm.group(1)).strip() if dm else ''
    if len(desc) > 80:
        desc = desc[:79] + '…'
    add(title, desc, page, 'ページ')

out = json.dumps(entries, ensure_ascii=False, separators=(',', ':'))
open('search-index.json', 'w', encoding='utf-8').write(out)


def sync_product_count():
    """「全NN種／全NN製品」の表記を図鑑の実データに合わせる。

    製品を足すたびに複数ファイルで数字がズレる事故を繰り返したため、
    手書きをやめて一次データから同期する。生成スクリプト側の文字列も
    直すので、再生成しても古い数字に戻らない。
    """
    n = len(DATA)
    targets = ['device-zukan.html', 'index.html', 'quick-pick.html',
               'rapid-trigger-guide.html',
               'tools/gen_quick_pick.py', 'tools/gen_rapid_trigger.py']
    changed = []
    for path in targets:
        if not os.path.exists(path):
            continue
        src = open(path, encoding='utf-8').read()
        new = re.sub(r'全\d+(種|製品)', lambda m: f'全{n}{m.group(1)}', src)
        new = re.sub(r'デバイス\d+種', f'デバイス{n}種', new)
        if new != src:
            open(path, 'w', encoding='utf-8').write(new)
            changed.append(path)
    print(f'製品数表記を全{n}に同期: {len(changed)}ファイル' + (f' ({", ".join(changed)})' if changed else ''))


sync_product_count()

kinds = {}
for e in entries:
    kinds[e['c']] = kinds.get(e['c'], 0) + 1
print(f"search-index.json: {len(entries)}件 {kinds} / {len(out) / 1024:.1f}KB")
