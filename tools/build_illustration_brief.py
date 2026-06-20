#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""ゲーマーMBTI 16タイプのAIイラスト制作ブリーフを生成(冪等).

既存のドット絵設定(generate_type_sprites._MBTI_DEF)を流用し、各タイプの
アーキタイプ・配色・装備に一致したAI画像生成プロンプトを docs/ に出力する。
チビキャラの「HD版」として一貫した16体を作るための仕様書。

  python3 tools/build_illustration_brief.py
出力: docs/mbti-illustration-brief.md
"""
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)
import generate_type_sprites as G  # noqa: E402

# 装備の英語ビジュアル表現
HEADGEAR_EN = {
    "hood": "a dark mysterious hood pulled up",
    "glasses": "thin-framed scholarly glasses",
    "crown": "a regal pointed crown",
    "spiky": "wild spiky hair, no headwear",
    "wizard": "a tall pointed wizard hat with a small star",
    "travelhood": "a soft traveler's hood",
    "plume": "a plumed circlet",
    "feather": "a feathered explorer's cap",
    "cap": "a neat military side cap",
    "helmet": "a knight's helmet with a raised visor",
    "officer": "an officer's peaked cap with an insignia",
    "tiara": "a delicate jeweled tiara",
    "headband": "a swordsman's cloth headband",
    "beret": "an artist's beret",
    "goggles": "tactical goggles resting on the forehead",
    "party": "a festive star-topped party crown",
}
WEAPON_EN = {
    "scroll": "holding a tactical scroll",
    "book": "holding a thick research tome with faint floating glyphs",
    "scepter": "raising a golden command scepter",
    "spark": "crackling neon energy arcing between the fingers",
    "stafforb": "leaning on a staff topped with a glowing orb",
    "lantern": "carrying a softly glowing lantern",
    "banner": "raising a rallying banner",
    "map": "unfolding an explorer's treasure map",
    "ledger": "holding an open record ledger",
    "shield": "bracing a crested guardian shield",
    "sword": "resting a straight knight's sword at the side",
    "fan": "holding an elegant folding fan",
    "katana": "one hand on a sheathed katana",
    "lute": "playing a bard's lute",
    "torch": "raising a blazing torch",
}

# code -> (英名, 性格ムード, ポーズ)
PERSONA = {
    "intj": ("The Strategist", "calm and analytical", "studying a faint tactical hologram, composed"),
    "intp": ("The Researcher", "curious and detached", "adjusting the glasses, intrigued"),
    "entj": ("The Commander", "bold and commanding", "standing tall and confident"),
    "entp": ("The Disruptor", "sharp and mischievous", "smirking with a clever spark"),
    "infj": ("The Seer", "serene and mysterious", "eyes half-closed, quietly focused"),
    "infp": ("The Dreamer", "gentle and wistful", "gazing toward a distant horizon"),
    "enfj": ("The Standard-Bearer", "warm and inspiring", "an encouraging open gesture"),
    "enfp": ("The Explorer", "bright and energetic", "mid-stride with an excited grin"),
    "istj": ("The Archivist", "precise and steady", "neat and composed posture"),
    "isfj": ("The Guardian", "protective and loyal", "a steadfast protective stance"),
    "estj": ("The Field Commander", "disciplined and firm", "an authoritative stance"),
    "esfj": ("The Host", "bright and sociable", "a graceful welcoming smile"),
    "istp": ("The Blademaster", "cool and silent", "a quiet, focused ready stance"),
    "isfp": ("The Bard", "free and artistic", "relaxed and easygoing"),
    "estp": ("The Daredevil", "bold and fast", "a dynamic action lunge"),
    "esfp": ("The Showstopper", "festive and magnetic", "a celebratory open pose"),
}

STYLE = (
    "anime-style game mascot character illustration, semi-deformed proportions "
    "(roughly 3-heads tall, friendly large eyes), clean cel-shading with soft rim "
    "light, fantasy-RPG outfit with subtle sci-fi neon accents, single character, "
    "full body, centered, facing the viewer, crisp consistent line art, "
    "deep navy background with faint cyan and magenta glow"
)
NEGATIVE = (
    "no text, no watermark, no logo, no signature, no multiple characters, "
    "no photorealism, no realistic adult proportions, no busy background, "
    "no extra limbs, no cropped limbs"
)


def jp_color(hexv):
    return hexv


def build():
    mbti = {d[0]: d for d in G._MBTI_DEF}
    lines = []
    A = lines.append
    A("# ゲーマーMBTI 16タイプ イラスト制作ブリーフ")
    A("")
    A("> このファイルは `tools/build_illustration_brief.py` が自動生成します。")
    A("> 既存のドット絵キャラ（`assets/types/<code>.png`）の設定をそのまま引き継いだ、")
    A("> **HD版イラスト**を16体つくるための仕様書です。")
    A("")
    A("## 1. 使うツール（商用利用の安全性）")
    A("")
    A("- **推奨: Adobe Firefly** — 学習データがライセンス済み/パブリックドメイン中心で、")
    A("  生成物の商用利用が比較的安全。Webサイト掲載・アフィリエイト誘導ページでも使いやすい。")
    A("- Midjourney を使う場合は **有料プラン（商用利用権が付く）** で。無料/トライアルは不可。")
    A("- Stable Diffusion 系はモデルのライセンスを各自確認（商用可のモデルを選ぶ）。")
    A("- いずれも **生成後に必ず利用規約を確認**し、人物・既存IP・ロゴが写り込まないこと。")
    A("")
    A("## 2. 一貫性の出し方（最重要）")
    A("")
    A("16体をバラバラの絵柄にしないための手順:")
    A("")
    A("1. **アンカーを1体作る** — まず `INTJ` を下の共通スタイル＋INTJ用プロンプトで、")
    A("   納得いくまで生成して1枚決める。これが全体の「絵柄の見本」になります。")
    A("2. **スタイル参照を固定** — Firefly なら「参照画像 → スタイル」に①の画像を設定し、")
    A("   スタイルの強さを固定。残り15体は同じ設定のまま、プロンプトのタイプ別の一文だけ差し替え。")
    A("3. **同じ縦横比・同じシード** — 比率は **1:1（正方形）** を推奨（既存画像が約480×528で正方形に近い）。")
    A("   可能ならシードも固定すると頭身・塗りがそろいます。")
    A("4. **書き出しは大きめ** — 2048px程度で書き出し、取り込みツール側で縮小します。")
    A("")
    A("## 3. 共通スタイル（全タイプ共通の前置き）")
    A("")
    A("```")
    A(STYLE)
    A("```")
    A("")
    A("**ネガティブ（除外したい要素）**")
    A("")
    A("```")
    A(NEGATIVE)
    A("```")
    A("")
    A("## 4. タイプ別プロンプト（共通スタイルの後ろにこの一文を足す）")
    A("")
    for d in G._MBTI_DEF:
        code = d[0]
        arche = d[1]
        outfit, hair, accent = d[2], d[3], d[4]
        hg, wp = d[5], d[6]
        en, mood, pose = PERSONA[code]
        A(f"### {code.upper()} — {arche}（{en}）")
        A("")
        A(f"- 配色: 衣装 `{outfit}` / 髪 `{hair}` / アクセント(発光) `{accent}`")
        A(f"- 装備: {HEADGEAR_EN[hg]} / {WEAPON_EN[wp]}")
        A("")
        A("```")
        A(f"{en}, {mood} expression, {HEADGEAR_EN[hg]}, {WEAPON_EN[wp]}, "
          f"wearing an outfit in {outfit}, {hair} hair, glowing {accent} accents, "
          f"{pose}")
        A("```")
        A("")
    A("## 5. 書き出しと取り込み（差し替えるだけで反映）")
    A("")
    A("1. 生成したPNGを **透過背景**で（難しければ濃紺背景でも可）、以下の名前で保存:")
    A("")
    A("   ```")
    A("   assets/types/src/intj.png")
    A("   assets/types/src/intp.png")
    A("   …（16タイプ、コードは小文字）")
    A("   ```")
    A("")
    A("2. 取り込みコマンドを実行:")
    A("")
    A("   ```")
    A("   python3 tools/import_type_illustrations.py")
    A("   ```")
    A("")
    A("   これで各タイプの **ヒーロー画像** と **OGPシェアカード** が自動生成され、")
    A("   タイプページのHTML（表示モード/alt）も更新されます。1体ずつでも実行可。")
    A("")
    A("3. キャッシュ更新のため `?v=deepNN` を1つ上げてコミット。")
    A("")
    A("## 6. メモ")
    A("")
    A("- 結果一覧の図鑑サムネやOGPの一部はドット絵のままです。タイプページのイラストが")
    A("  固まったら、同じ16体を縮小して図鑑にも展開すると統一できます（別タスク）。")
    A("- 透過PNGだと額縁・OGPともに最もきれいに収まります。")
    out = os.path.join(ROOT, "docs", "mbti-illustration-brief.md")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    open(out, "w", encoding="utf-8").write("\n".join(lines) + "\n")
    print("wrote", out, f"({len(G._MBTI_DEF)} types)")


if __name__ == "__main__":
    build()
