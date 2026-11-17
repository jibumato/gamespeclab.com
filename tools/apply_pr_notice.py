#!/usr/bin/env python3
"""購入リンクのあるページの冒頭（h1の直後）に広告表記を入れる。

なぜ冒頭か:
  2023年10月のステマ規制以降、ASP各社は「読者がすぐ気づく位置」への
  広告表記を求めることが多い。以前は各ページの広告表記が最初の購入
  リンクより後ろ（デバイスガイドではページの9割の位置）にあり、
  フッターにしか無いページもあった。

対象:
  - HTMLに Amazon アソシエイトのリンク（tag=jbmt-22）を含むページ
  - 診断結果などで script.js が購入リンクを後から差し込むページ

生成スクリプトで作り直されるページ（pro-*.html / vs-*.html など）でも
消えないよう、必ず最後に実行される gen_search_index.py からも呼ぶ。
単体でも実行できる。2回続けて実行しても差分が出ない（冪等）。
"""

import os
import re
import sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')

AFFILIATE_MARK = 'tag=jbmt-22'

# script.js が購入リンクを描画する受け皿。HTML自体にはリンクが無い。
RUNTIME_CONTAINERS = (
    'id="sense-gear-list"',     # GameSense の結果 → 本命デバイス
    'id="mbti-gear-list"',      # ゲーマーMBTI の結果 → 本命デバイス
    'id="affiliate-slots"',     # PC構成診断の結果 → 候補アイテム
)

# 表記そのものを説明するページには入れない
EXCLUDE = {'affiliate-disclosure.html', 'privacy.html', 'disclaimer.html', 'about.html'}

NOTICE = ('<p class="pr-notice"><span class="pr-badge">PR</span>'
          '本ページはプロモーション（Amazonアソシエイトの広告リンク）を含みます。'
          '<a href="affiliate-disclosure.html">広告表記</a></p>')

NOTICE_RE = re.compile(r'\s*<p class="pr-notice">.*?</p>', re.S)
H1_END = re.compile(r'</h1>')


def needs_notice(src):
    return AFFILIATE_MARK in src or any(c in src for c in RUNTIME_CONTAINERS)


def first_affiliate_pos(src):
    """本文で最初に購入リンク（または差し込み先）が現れる位置。"""
    body = src.find('<body')
    cands = [src.find(AFFILIATE_MARK, body)]
    cands += [src.find(c, body) for c in RUNTIME_CONTAINERS]
    cands = [c for c in cands if c >= 0]
    return min(cands) if cands else -1


def apply_one(src):
    """表記を入れた（または外した）HTMLを返す。h1が無ければ None。"""
    stripped = NOTICE_RE.sub('', src)
    if not needs_notice(stripped):
        return stripped
    m = H1_END.search(stripped, stripped.find('<body'))
    if not m:
        return None
    # h1 の閉じタグと同じ行の字下げに揃える
    line_start = stripped.rfind('\n', 0, m.start()) + 1
    indent = re.match(r'[ \t]*', stripped[line_start:]).group(0)
    return stripped[:m.end()] + '\n' + indent + NOTICE + stripped[m.end():]


def apply():
    os.chdir(ROOT)
    added, problems = [], []
    for name in sorted(os.listdir('.')):
        if not name.endswith('.html') or name in EXCLUDE:
            continue
        src = open(name, encoding='utf-8').read()
        new = apply_one(src)
        if new is None:
            problems.append('%s: h1 が無いので表記を入れられない' % name)
            continue
        if needs_notice(new):
            added.append(name)
            # 表記が最初の購入リンクより前にあることを確かめる
            if new.find('class="pr-notice"') > first_affiliate_pos(new):
                problems.append('%s: 表記が最初の購入リンクより後ろにある' % name)
        if new != src:
            open(name, 'w', encoding='utf-8').write(new)
    return added, problems


def main():
    added, problems = apply()
    print('広告表記（冒頭）: %dページ' % len(added))
    if problems:
        for p in problems:
            print('  -', p)
        sys.exit(1)


if __name__ == '__main__':
    main()
