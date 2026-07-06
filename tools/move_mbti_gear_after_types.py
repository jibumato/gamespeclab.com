#!/usr/bin/env python3
"""16タイプページの ROLE GEAR カードを OTHER TYPES の直後(FAQ直前)へ移動する(冪等).

現状: ALLY VIEW → ROLE GEAR → OTHER TYPES → FAQ
変更後: ALLY VIEW → OTHER TYPES → ROLE GEAR → FAQ
（タイプ解説を読み終えてからギア紹介に触れる導線に整理する）

  python3 tools/move_mbti_gear_after_types.py
"""
import glob
import re

GEAR_RE = re.compile(
    r'          <div class="article-card">\n'
    r'            <p class="article-kicker">ROLE GEAR</p>\n'
    r'.*?\n'
    r'          </div>\n',
    re.DOTALL,
)

OTHER_TYPES_RE = re.compile(
    r'          <div class="article-card">\n'
    r'            <p class="article-kicker">OTHER TYPES</p>\n'
    r'.*?\n'
    r'          </div>\n',
    re.DOTALL,
)


def process(path):
    html = open(path, encoding="utf-8").read()
    gear_m = GEAR_RE.search(html)
    types_m = OTHER_TYPES_RE.search(html)
    if not gear_m or not types_m:
        return "skip(missing block)"
    if gear_m.start() > types_m.start():
        return "skip(already after)"
    gear_block = gear_m.group(0)
    html = html[: gear_m.start()] + html[gear_m.end():]
    # OTHER TYPES の位置はgear削除後にずれるので再検索する
    types_m2 = OTHER_TYPES_RE.search(html)
    html = html[: types_m2.end()] + gear_block + html[types_m2.end():]
    open(path, "w", encoding="utf-8").write(html)
    return "moved"


def main():
    changed = 0
    for path in sorted(glob.glob("gamer-mbti-????.html")):
        status = process(path)
        print(f"  {status}: {path}")
        if status == "moved":
            changed += 1
    print(f"done: {changed} pages changed")


if __name__ == "__main__":
    main()
