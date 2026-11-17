#!/usr/bin/env python3
"""上達・診断系の記事で、本文がすでにデバイスに触れている箇所にだけ
デバイスガイドへのリンクを張る。

上達・センス系20ページのうち13ページは、デバイスのページへのリンクが
1本も無かった。一方で「144Hz以上のモニター」「目と姿勢の疲れ」のように、
本文が自分でデバイスを原因・対策として挙げているのにリンクが無い箇所が
あった。読者がいちばん「どれを選べば？」と思う場所なので、そこを繋ぐ。

方針:
  - 本文が道具に触れていない箇所には張らない。判断速度・空間把握・
    読み合いなど、道具で伸びない能力のページは対象外
  - 張るのは内部のガイドへのリンクだけ。購入リンクは足さない
    （情報記事を広告まみれにしない。購入はガイド側で）
  - 1つのカード内で同じガイドへは1回まで

これらの記事は build_articles.py で作られたが、その後の加筆スクリプトで
大きく手が入っており、build_articles.py を再実行すると加筆が消える。
現在はHTMLが一次データなので、ここで直接書き換える。
2回続けて実行しても差分が出ない（冪等）。
"""

import os
import re
import sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')

# (ページ, 見出し語, リンク先, リンク文言)
LINKS = [
    # VALORANT上達 → 「環境を整える（設定とデバイス）」
    ('valorant-improve-guide.html', '感度を固定', 'fps-sensitivity-guide.html', '感度の決め方'),
    ('valorant-improve-guide.html', '144Hz以上のモニター', 'gaming-monitor-guide.html', 'モニターの選び方'),
    ('valorant-improve-guide.html', '軽量・低遅延マウス', 'gaming-mouse-guide.html', 'マウスの選び方'),
    # Apex上達 → 「環境を整える」
    ('apex-improve-guide.html', '高Hzモニター', 'gaming-monitor-guide.html', 'モニターの選び方'),
    ('apex-improve-guide.html', '軽量マウス', 'gaming-mouse-guide.html', 'マウスの選び方'),
    ('apex-improve-guide.html', 'ヘッドセット', 'gaming-headset-guide.html', 'ヘッドセットの選び方'),
    # 反応速度 → 「環境の遅延を削る」
    ('reaction-speed-guide.html', '高Hzモニター', 'gaming-monitor-guide.html', 'モニターの選び方'),
    ('reaction-speed-guide.html', '低遅延マウス', 'gaming-mouse-guide.html', 'マウスの選び方'),
    # 勝てない → 原因の1つ「環境の遅延」（fps低下・入力遅延）
    ('cant-win-games-guide.html', '環境の遅延', 'game-lag-fix-guide.html', '重い・カクつく時の対処'),
    # 上達ピラー → 5ステップの⑤「環境を整える」
    ('game-improve-guide.html', '⑤ 環境を整える', 'gaming-gear-guide.html', 'デバイスの選び方'),
    # 集中力 → 原因の1つ「目と姿勢の疲れ」
    ('game-focus-guide.html', '目と姿勢の疲れ', 'gaming-chair-guide.html', 'チェアの選び方'),
    # 状況認識 → 鍛え方「音に意識を割く」（足音の方向＝定位）
    ('sense-awareness-guide.html', '音に意識を割く', 'gaming-headset-guide.html', '足音が分かるヘッドセット'),
]

# 項目は <strong>見出し</strong><p>説明</p> か <strong>見出し</strong><span>説明</span>。
# 見出しをリンクにすると、暗いページでは普通の見出しと見分けがつかない
# （白文字・下線なし）。そのため説明の後ろに明示的なリンクを添える。
ITEM_RE = r'(<strong>%s</strong>(?:<p>[^<]*</p>|<span>[^<]*</span>))(<a class="ctx-guide-link"[^>]*>.*?</a>)?'


def link_html(href, text):
    return ('<a class="ctx-guide-link" href="%s"><span data-icon="arrow"></span>%s</a>'
            % (href, text))


def apply():
    os.chdir(ROOT)
    changed, problems = set(), []
    pages = {}
    for page, label, href, text in LINKS:
        if not os.path.exists(href):
            problems.append('%s: リンク先 %s が無い' % (page, href))
            continue
        src = pages.get(page) or open(page, encoding='utf-8').read()
        pat = re.compile(ITEM_RE % re.escape(label))
        hits = pat.findall(src)
        if len(hits) != 1:
            problems.append('%s: 「%s」の項目が %d 箇所（1箇所のはず）' % (page, label, len(hits)))
            pages[page] = src
            continue
        new = pat.sub(lambda m: m.group(1) + link_html(href, text), src)
        if new != src:
            changed.add(page)
        pages[page] = new
    for page in changed:
        open(page, 'w', encoding='utf-8').write(pages[page])
    return changed, problems


def main():
    changed, problems = apply()
    print('デバイスガイドへの文脈リンク: %d本（%dページ）／今回変更 %dページ'
          % (len(LINKS), len({l[0] for l in LINKS}), len(changed)))
    if problems:
        for p in problems:
            print('  -', p)
        sys.exit(1)


if __name__ == '__main__':
    main()
