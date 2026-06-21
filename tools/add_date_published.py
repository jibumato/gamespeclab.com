#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Article構造化データに datePublished を補完(冪等).

各ページのgit作成日を datePublished として、Articleノードの
dateModified の直前に挿入する(公開日 <= 更新日)。

  python3 tools/add_date_published.py
"""
import os
import re
import subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def git_created(fn):
    out = subprocess.run(
        ["git", "log", "--diff-filter=A", "--follow",
         "--format=%ad", "--date=short", "--", fn],
        cwd=ROOT, capture_output=True, text=True).stdout.strip().splitlines()
    return out[-1] if out else "2026-06-18"


def main():
    n = 0
    for fn in sorted(os.listdir(ROOT)):
        if not fn.endswith(".html"):
            continue
        path = os.path.join(ROOT, fn)
        s = open(path, encoding="utf-8").read()
        if '"@type": "Article"' not in s:
            continue
        if '"datePublished"' in s:
            continue
        date = git_created(fn)
        # 最初の dateModified 行の直前に同じインデントで挿入
        m = re.search(r'\n([ \t]*)"dateModified": "', s)
        if not m:
            print("  WARN no dateModified:", fn)
            continue
        ind = m.group(1)
        ins = f'\n{ind}"datePublished": "{date}",'
        s = s[:m.start()] + ins + s[m.start():]
        open(path, "w", encoding="utf-8").write(s)
        print(f"  +datePublished {date}:", fn)
        n += 1
    print("datePublished added:", n)


if __name__ == "__main__":
    main()
