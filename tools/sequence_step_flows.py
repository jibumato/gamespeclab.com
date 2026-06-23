#!/usr/bin/env python3
"""手順を表す gsl-flow を番号付き is-sequence に変換（冪等）。

キャプションに「流れ」「ステップ」「手順」を含む図のみを対象にし、
各ノードへ <b>N</b> の連番バッジを付与、flow に is-sequence を付ける。
順序のないポイント列（軸・ポイント・要素など）は対象外。
"""
import re
import glob

SEQ_WORDS = ("流れ", "ステップ", "手順", "ロードマップ", "順番")


def convert(path):
    html = open(path, encoding="utf-8").read()
    changed = 0

    def repl(m):
        nonlocal changed
        whole = m.group(0)
        cap = m.group("cap")
        flow = m.group("flow")
        if not any(w in cap for w in SEQ_WORDS):
            return whole
        if "is-sequence" in flow:
            return whole
        nodes = re.findall(r'<div class="gsl-node">(.*?)</div>', flow)
        new_nodes = "".join(
            f'<div class="gsl-node"><b>{i}</b>{t}</div>' for i, t in enumerate(nodes, 1)
        )
        new_flow = f'<div class="gsl-flow is-sequence">{new_nodes}</div>'
        changed += 1
        return whole.replace(flow, new_flow)

    # figure caption + その直後の flow をまとめて捕捉
    pat = re.compile(
        r'<p class="gsl-figure-cap">(?P<cap>.*?)</p>\s*'
        r'(?P<flow><div class="gsl-flow">.*?</div></div>)',
        re.S,
    )
    new = pat.sub(repl, html)
    if changed:
        open(path, "w", encoding="utf-8").write(new)
    return changed


def main():
    total = 0
    for p in sorted(glob.glob("*.html")):
        c = convert(p)
        if c:
            print(f"  + {p}: {c}件を番号付きシーケンスに変換")
            total += c
    print(f"done: {total} flows converted")


if __name__ == "__main__":
    main()
