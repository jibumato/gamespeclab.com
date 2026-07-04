#!/usr/bin/env python3
"""16タイプページから「気軽に試しやすいゲーム例」セクションを冪等に削除する。

外部ゲームサイト（VALORANT/LoL/Steam等）への離脱リンクのみのセクションで、
サイト内回遊・収益に寄与せず導線を長くするだけのため削除する。
"""
import glob
import re

PATTERN = re.compile(
    r'\s*<div class="article-card">\s*'
    r'<h2>気軽に試しやすいゲーム例</h2>.*?'
    r'</ul>\s*</div>',
    re.S,
)


def main():
    changed = 0
    for p in sorted(glob.glob("gamer-mbti-????.html")):
        html = open(p, encoding="utf-8").read()
        new, n = PATTERN.subn("", html, count=1)
        if n == 0:
            print(f"  SKIP {p}: セクションなし")
            continue
        open(p, "w", encoding="utf-8").write(new)
        changed += 1
        print(f"  - {p}: セクション削除")
    print(f"done: {changed} pages changed")


if __name__ == "__main__":
    main()
