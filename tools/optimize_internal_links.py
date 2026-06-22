#!/usr/bin/env python3
"""関連リンクグリッドへ高価値な内部リンクを冪等に追加する。

- game-terms-glossary.html（用語集）の被リンクを増やす
- 新規記事への片方向リンクを相互化する
各ターゲットページの「次に読みたい関連ページ／ガイド」グリッド末尾に、
未掲載の href のみを追記する。
"""
import re
import sys

# target_page -> [(href, anchor, desc), ...]
PLAN = {
    "fps-improve-guide.html": [
        ("game-terms-glossary.html", "ゲーム用語集", "FPS用語がわからないときの早見表。"),
        ("esports-start-guide.html", "e-スポーツの始め方", "上達の先にある競技・大会への道。"),
    ],
    "cant-win-games-guide.html": [
        ("game-terms-glossary.html", "ゲーム用語集", "知らない用語をすぐ確認。"),
        ("esports-start-guide.html", "e-スポーツの始め方", "勝てるようになったら競技に挑戦。"),
        ("gaming-pc-lifespan-guide.html", "ゲーミングPCの寿命・買い替え時期", "性能が原因か切り分ける。"),
    ],
    "aim-training-guide.html": [
        ("game-terms-glossary.html", "ゲーム用語集", "練習で出てくる用語の早見表。"),
    ],
    "fps-sensitivity-guide.html": [
        ("game-terms-glossary.html", "ゲーム用語集", "eDPIなど用語の意味を確認。"),
    ],
    "game-skill-traits.html": [
        ("game-terms-glossary.html", "ゲーム用語集", "用語の意味をまとめて確認。"),
    ],
    "game-improve-guide.html": [
        ("game-terms-glossary.html", "ゲーム用語集", "練習で出てくる用語の早見表。"),
    ],
    "gaming-monitor-guide.html": [
        ("gaming-pc-lifespan-guide.html", "ゲーミングPCの寿命・買い替え時期", "PCの買い替え判断と合わせて。"),
    ],
    "coop-game-compatibility.html": [
        ("discord-setup-guide.html", "Discordの使い方・設定", "協力プレイの連絡基盤を整える。"),
    ],
    "gamer-mbti-compatibility.html": [
        ("discord-setup-guide.html", "Discordの使い方・設定", "相性のいい相手と通話する準備。"),
    ],
}

HEADERS = ["次に読みたい関連ページ", "次に読みたい関連ガイド"]


def find_grid_close(html, start):
    """start（<div class="article-pair-grid"> の直後）から対応する </div> の位置を返す。"""
    depth = 1
    i = start
    pat = re.compile(r"<div\b|</div>")
    for m in pat.finditer(html, start):
        if m.group() == "</div>":
            depth -= 1
            if depth == 0:
                return m.start()
        else:
            depth += 1
    return -1


def patch(path, entries):
    html = open(path, encoding="utf-8").read()
    # 見出しの位置
    hidx = -1
    for h in HEADERS:
        hidx = html.find(h)
        if hidx != -1:
            break
    if hidx == -1:
        print(f"  SKIP {path}: 関連グリッド見出しなし")
        return False
    gopen = html.find('<div class="article-pair-grid">', hidx)
    if gopen == -1:
        print(f"  SKIP {path}: グリッドなし")
        return False
    inner_start = gopen + len('<div class="article-pair-grid">')
    gclose = find_grid_close(html, inner_start)
    if gclose == -1:
        print(f"  SKIP {path}: グリッド閉じ不明")
        return False
    additions = []
    for href, anchor, desc in entries:
        if f'href="{href}"' in html:
            continue  # 既出はスキップ（冪等）
        additions.append(
            f'              <div><strong><a href="{href}">{anchor}</a></strong><p>{desc}</p></div>\n'
        )
    if not additions:
        print(f"  ok {path}: 追加なし（既出）")
        return False
    insert = "".join(additions)
    new = html[:gclose] + insert + html[gclose:]
    open(path, "w", encoding="utf-8").write(new)
    print(f"  + {path}: {len(additions)}件追加")
    return True


def main():
    changed = 0
    for path, entries in PLAN.items():
        if patch(path, entries):
            changed += 1
    print(f"done: {changed} pages changed")


if __name__ == "__main__":
    main()
