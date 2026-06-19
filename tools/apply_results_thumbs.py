#!/usr/bin/env python3
"""results.html の早見表カードにタイプ別ドット絵サムネを差し込み図鑑化(冪等)."""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PATH = os.path.join(ROOT, "results.html")

with open(PATH, encoding="utf-8") as f:
    html = f.read()


def slug_for(block):
    m = re.search(r'href="gamer-mbti-([a-z]{4})\.html"', block)
    if m:
        return m.group(1)
    m = re.search(r'href="(sense-[a-z]+-guide)\.html"', block)
    if m:
        return m.group(1)
    return None


def repl(m):
    block = m.group(0)
    if "type-thumb" in block:
        return block
    slug = slug_for(block)
    if not slug:
        return block
    name = re.search(r"<strong>([^<]+)</strong>", block)
    alt = (name.group(1).strip() if name else slug) + "のドット絵キャラクター"
    img = (f'<img class="type-thumb" src="assets/types/{slug}.png" '
           f'width="72" height="79" loading="lazy" decoding="async" alt="{alt}" />')
    return "<article>" + img + block[len("<article>"):]


new = re.sub(r"<article>.*?</article>", repl, html, flags=re.S)
with open(PATH, "w", encoding="utf-8") as f:
    f.write(new)

print("thumbs:", new.count('class="type-thumb"'))
