#!/usr/bin/env python3
"""タイプ解説/能力ガイドページに再シェア用ブロックを追加(冪等).

シェアリンクから流入した人がそのまま X / LINE で再シェアできるよう、
記事末尾にシェアカードを差し込み、拡散ループを作る。

対象:
  - gamer-mbti-XXXX.html  (ゲーマーMBTI 16タイプ)
  - sense-*-guide.html     (GameSense 8能力ガイド)
"""
import glob
import os
import re
from urllib.parse import quote

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def targets():
    for p in sorted(glob.glob(os.path.join(ROOT, "gamer-mbti-*.html"))):
        if re.match(r"gamer-mbti-[a-z]{4}\.html$", os.path.basename(p)):
            yield p, "mbti"
    for p in sorted(glob.glob(os.path.join(ROOT, "sense-*-guide.html"))):
        yield p, "sense"


def x_url(text, url, hashtags):
    return ("https://twitter.com/intent/tweet?text=" + quote(text)
            + "&url=" + quote(url) + "&hashtags=" + quote(hashtags))


def line_url(url):
    return "https://social-plugins.line.me/lineit/share?url=" + quote(url)


for path, kind in targets():
    with open(path, encoding="utf-8") as f:
        html = f.read()
    if "type-share-card" in html:
        continue

    canon = re.search(r'<link rel="canonical" href="([^"]+)"', html)
    url = canon.group(1) if canon else ""
    h1 = re.search(r"<h1><span>([^<]+)</span><span>([^<]*)</span>", html)
    title = h1.group(1).strip() if h1 else ""
    tagline = (h1.group(2).strip() if h1 and h1.lastindex >= 2 else "")

    if kind == "mbti":
        heading = "このタイプをシェア"
        lead = "結果が当たっていたら、友だちにも回してみてください。同じタイプ探しも盛り上がります。"
        text = f"ゲーマーMBTI診断、私は「{title}」でした！{tagline}"
        hashtags = "ゲーマーMBTI,GameSpecLab"
    else:
        heading = "このガイドをシェア"
        lead = "ゲームセンスの話で盛り上がりそうな相手に、軽く共有してみてください。"
        text = f"{title}｜GameSpec Labのゲームセンス解説"
        hashtags = "ゲームセンス,GameSpecLab"

    block = f"""          <div class="article-card type-share-card">
            <p class="eyebrow"><span data-icon="share"></span>SHARE</p>
            <h2>{heading}</h2>
            <p>{lead}</p>
            <div class="type-share-links">
              <a class="share-chip share-chip-x" href="{x_url(text, url, hashtags)}" target="_blank" rel="noopener" aria-label="Xでポストする"><span data-icon="x"></span>Xでポスト</a>
              <a class="share-chip share-chip-line" href="{line_url(url)}" target="_blank" rel="noopener" aria-label="LINEで送る"><span data-icon="chat"></span>LINEで送る</a>
            </div>
          </div>
"""

    new = html.replace("        </article>\n      </section>",
                       block + "        </article>\n      </section>", 1)
    if new == html:
        print("SKIP (anchor not found):", os.path.basename(path))
        continue
    with open(path, "w", encoding="utf-8") as f:
        f.write(new)
    print("share block ->", os.path.basename(path))
