#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""FAQ構造化データはあるのに可視FAQが無いページに、可視FAQを描画(冪等).

各ページのJSON-LDからFAQPageのQ&Aを取り出し、本文末尾(シェア/広告
表記カード、または</article>の直前)に「よくある質問」カードを挿入する。
構造化データと可視コンテンツの不整合を解消し、コンテンツも厚くする。

  python3 tools/sync_visible_faq.py
"""
import os
import re
import json
import html as _html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SKIP = set()

ANCHOR_RE = re.compile(
    r'\n([ \t]*)(<div class="article-card type-share-card">'
    r'|<div class="article-card affiliate-disclosure">)')
ARTICLE_END_RE = re.compile(r'\n([ \t]*)(</article>)')
MAIN_END_RE = re.compile(r'\n([ \t]*)(</main>)')


def extract_faq(s):
    m = re.search(r'<script type="application/ld\+json">(.*?)</script>',
                  s, re.DOTALL)
    if not m:
        return None
    try:
        data = json.loads(m.group(1))
    except Exception:
        return None
    graph = data.get("@graph", [data])
    for node in graph:
        if node.get("@type") == "FAQPage":
            out = []
            for q in node.get("mainEntity", []):
                name = q.get("name", "")
                ans = q.get("acceptedAnswer", {}).get("text", "")
                if name and ans:
                    out.append((name, ans))
            return out
    return None


def faq_card(items, ind):
    rows = "\n".join(
        f'{ind}  <div><strong>{_html.escape(q)}</strong>'
        f'<p>{_html.escape(a)}</p></div>' for q, a in items)
    return (f'{ind}<div class="article-card">\n'
            f'{ind}  <p class="article-kicker">FAQ</p>\n'
            f'{ind}  <h2>よくある質問</h2>\n'
            f'{ind}  <div class="article-pair-grid">\n'
            f'{rows}\n'
            f'{ind}  </div>\n'
            f'{ind}</div>\n')


def faq_section(items, ind):
    rows = "\n".join(
        f'{ind}  <div><strong>{_html.escape(q)}</strong>'
        f'<p>{_html.escape(a)}</p></div>' for q, a in items)
    return (f'{ind}<section class="section seo-link-panel" aria-label="よくある質問">\n'
            f'{ind}  <div class="section-heading compact">\n'
            f'{ind}    <p class="eyebrow"><span data-icon="spark"></span>FAQ</p>\n'
            f'{ind}    <h2>よくある質問</h2>\n'
            f'{ind}  </div>\n'
            f'{ind}  <div class="article-pair-grid faq-section-grid">\n'
            f'{rows}\n'
            f'{ind}  </div>\n'
            f'{ind}</section>\n')


def main():
    n = 0
    for fn in sorted(os.listdir(ROOT)):
        if not fn.endswith(".html") or fn in SKIP:
            continue
        path = os.path.join(ROOT, fn)
        s = open(path, encoding="utf-8").read()
        if '"@type": "FAQPage"' not in s:
            continue
        if "よくある質問" in s:
            continue  # 既に可視FAQあり
        items = extract_faq(s)
        if not items:
            print("  WARN no parsable FAQ:", fn)
            continue
        m = ANCHOR_RE.search(s)
        if not m:
            m = ARTICLE_END_RE.search(s)
        use_section = False
        if not m:
            m = MAIN_END_RE.search(s)
            use_section = True
        if not m:
            print("  SKIP no anchor:", fn)
            continue
        ind = m.group(1)
        card = faq_section(items, ind) if use_section else faq_card(items, ind)
        s = s[:m.start()] + "\n" + card + s[m.start() + 1:]
        open(path, "w", encoding="utf-8").write(s)
        print(f"  +FAQ({len(items)}):", fn)
        n += 1
    print("visible FAQ synced:", n)


if __name__ == "__main__":
    main()
