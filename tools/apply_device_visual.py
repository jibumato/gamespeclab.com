#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""デバイス比較カード(.device-pick)に、ランクオーブ＋カテゴリのビジュアルバナーを付与する。

各ガイドの .device-pick カードの先頭に、
  - ランク番号(01, 02, ...) と デバイスアイコンのネオンオーブ
  - カテゴリ表記 + PICK番号のタグ
を挿入して「映える」ギアカードに整える。冪等（再実行しても二重挿入しない）。

  python3 tools/apply_device_visual.py
"""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ファイル -> (デバイスアイコン, カテゴリ表記)
GUIDES = {
    "gaming-mouse-guide.html": ("mouse", "GAMING MOUSE"),
    "gaming-keyboard-guide.html": ("keyboard", "GAMING KEYBOARD"),
    "gaming-headset-guide.html": ("headset", "GAMING HEADSET"),
    "gaming-mousepad-guide.html": ("mousepad", "GAMING MOUSEPAD"),
    "gaming-controller-guide.html": ("gamepad", "GAME CONTROLLER"),
}

PATTERN = re.compile(
    r'(<article class="device-pick">)(\s*\n)(\s*)(<div class="device-pick-head">)'
)


def banner(indent, icon, label, rank):
    inner = indent + "  "
    return (
        f'{indent}<div class="device-pick-banner">\n'
        f'{inner}<span class="device-rank-orb"><b>{rank:02d}</b>'
        f'<span data-icon="{icon}"></span></span>\n'
        f'{inner}<span class="device-rank-tag"><span data-icon="spark"></span>'
        f'{label} · PICK {rank:02d}</span>\n'
        f'{indent}</div>\n'
    )


def main():
    total = 0
    for filename, (icon, label) in GUIDES.items():
        path = os.path.join(ROOT, filename)
        if not os.path.exists(path):
            print(f"skip (missing): {filename}")
            continue
        html = open(path, encoding="utf-8").read()
        counter = {"n": 0}

        def repl(match):
            counter["n"] += 1
            indent = match.group(3)
            b = banner(indent, icon, label, counter["n"])
            return (
                match.group(1)
                + match.group(2)
                + b
                + indent
                + match.group(4)
            )

        new_html, count = PATTERN.subn(repl, html)
        if count:
            open(path, "w", encoding="utf-8").write(new_html)
            print(f"{filename}: {count} banners inserted")
            total += count
        else:
            print(f"{filename}: no change (already applied?)")
    print(f"total banners: {total}")


if __name__ == "__main__":
    main()
