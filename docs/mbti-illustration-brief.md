# ゲーマーMBTI 16タイプ イラスト制作ブリーフ

> このファイルは `tools/build_illustration_brief.py` が自動生成します。
> 既存のドット絵キャラ（`assets/types/<code>.png`）の設定をそのまま引き継いだ、
> **HD版イラスト**を16体つくるための仕様書です。

## 1. 使うツール（商用利用の安全性）

- **推奨: Adobe Firefly** — 学習データがライセンス済み/パブリックドメイン中心で、
  生成物の商用利用が比較的安全。Webサイト掲載・アフィリエイト誘導ページでも使いやすい。
- Midjourney を使う場合は **有料プラン（商用利用権が付く）** で。無料/トライアルは不可。
- Stable Diffusion 系はモデルのライセンスを各自確認（商用可のモデルを選ぶ）。
- いずれも **生成後に必ず利用規約を確認**し、人物・既存IP・ロゴが写り込まないこと。

## 2. 一貫性の出し方（最重要）

16体をバラバラの絵柄にしないための手順:

1. **アンカーを1体作る** — まず `INTJ` を下の共通スタイル＋INTJ用プロンプトで、
   納得いくまで生成して1枚決める。これが全体の「絵柄の見本」になります。
2. **スタイル参照を固定** — Firefly なら「参照画像 → スタイル」に①の画像を設定し、
   スタイルの強さを固定。残り15体は同じ設定のまま、プロンプトのタイプ別の一文だけ差し替え。
3. **同じ縦横比・同じシード** — 比率は **1:1（正方形）** を推奨（既存画像が約480×528で正方形に近い）。
   可能ならシードも固定すると頭身・塗りがそろいます。
4. **書き出しは大きめ** — 2048px程度で書き出し、取り込みツール側で縮小します。

## 3. 共通スタイル（全タイプ共通の前置き）

```
anime-style game mascot character illustration, semi-deformed proportions (roughly 3-heads tall, friendly large eyes), clean cel-shading with soft rim light, fantasy-RPG outfit with subtle sci-fi neon accents, single character, full body, centered, facing the viewer, crisp consistent line art, deep navy background with faint cyan and magenta glow
```

**ネガティブ（除外したい要素）**

```
no text, no watermark, no logo, no signature, no multiple characters, no photorealism, no realistic adult proportions, no busy background, no extra limbs, no cropped limbs
```

## 4. タイプ別プロンプト（共通スタイルの後ろにこの一文を足す）

### INTJ — 冷静沈着の軍師型（The Strategist）

- 配色: 衣装 `#3b2f6b` / 髪 `#2a2440` / アクセント(発光) `#9d8be0`
- 装備: a dark mysterious hood pulled up / holding a tactical scroll

```
The Strategist, calm and analytical expression, a dark mysterious hood pulled up, holding a tactical scroll, wearing an outfit in #3b2f6b, #2a2440 hair, glowing #9d8be0 accents, studying a faint tactical hologram, composed
```

### INTP — 孤高の研究者型（The Researcher）

- 配色: 衣装 `#4a3b7a` / 髪 `#6b5a3a` / アクセント(発光) `#a594e6`
- 装備: thin-framed scholarly glasses / holding a thick research tome with faint floating glyphs

```
The Researcher, curious and detached expression, thin-framed scholarly glasses, holding a thick research tome with faint floating glyphs, wearing an outfit in #4a3b7a, #6b5a3a hair, glowing #a594e6 accents, adjusting the glasses, intrigued
```

### ENTJ — 覇道コマンダー型（The Commander）

- 配色: 衣装 `#5b3a7a` / 髪 `#1f1a30` / アクセント(発光) `#e0b94a`
- 装備: a regal pointed crown / raising a golden command scepter

```
The Commander, bold and commanding expression, a regal pointed crown, raising a golden command scepter, wearing an outfit in #5b3a7a, #1f1a30 hair, glowing #e0b94a accents, standing tall and confident
```

### ENTP — メタ破壊の革命家型（The Disruptor）

- 配色: 衣装 `#7a3a78` / 髪 `#c4502a` / アクセント(発光) `#ffd24a`
- 装備: wild spiky hair, no headwear / crackling neon energy arcing between the fingers

```
The Disruptor, sharp and mischievous expression, wild spiky hair, no headwear, crackling neon energy arcing between the fingers, wearing an outfit in #7a3a78, #c4502a hair, glowing #ffd24a accents, smirking with a clever spark
```

### INFJ — 静かなる預言者型（The Seer）

- 配色: 衣装 `#2f5b56` / 髪 `#2a2438` / アクセント(発光) `#7fd9c4`
- 装備: a tall pointed wizard hat with a small star / leaning on a staff topped with a glowing orb

```
The Seer, serene and mysterious expression, a tall pointed wizard hat with a small star, leaning on a staff topped with a glowing orb, wearing an outfit in #2f5b56, #2a2438 hair, glowing #7fd9c4 accents, eyes half-closed, quietly focused
```

### INFP — 夢見る巡礼者型（The Dreamer）

- 配色: 衣装 `#3a6b5a` / 髪 `#a86b3a` / アクセント(発光) `#a7e8c4`
- 装備: a soft traveler's hood / carrying a softly glowing lantern

```
The Dreamer, gentle and wistful expression, a soft traveler's hood, carrying a softly glowing lantern, wearing an outfit in #3a6b5a, #a86b3a hair, glowing #a7e8c4 accents, gazing toward a distant horizon
```

### ENFJ — 鼓舞する旗手型（The Standard-Bearer）

- 配色: 衣装 `#2f6b4a` / 髪 `#4a3320` / アクセント(発光) `#ffd24a`
- 装備: a plumed circlet / raising a rallying banner

```
The Standard-Bearer, warm and inspiring expression, a plumed circlet, raising a rallying banner, wearing an outfit in #2f6b4a, #4a3320 hair, glowing #ffd24a accents, an encouraging open gesture
```

### ENFP — ひらめき冒険家型（The Explorer）

- 配色: 衣装 `#3a8a52` / 髪 `#d98a2a` / アクセント(発光) `#ffe07a`
- 装備: a feathered explorer's cap / unfolding an explorer's treasure map

```
The Explorer, bright and energetic expression, a feathered explorer's cap, unfolding an explorer's treasure map, wearing an outfit in #3a8a52, #d98a2a hair, glowing #ffe07a accents, mid-stride with an excited grin
```

### ISTJ — 鉄壁の記録官型（The Archivist）

- 配色: 衣装 `#2f3b6b` / 髪 `#36363f` / アクセント(発光) `#8ba3d8`
- 装備: a neat military side cap / holding an open record ledger

```
The Archivist, precise and steady expression, a neat military side cap, holding an open record ledger, wearing an outfit in #2f3b6b, #36363f hair, glowing #8ba3d8 accents, neat and composed posture
```

### ISFJ — 誓約の守護騎士型（The Guardian）

- 配色: 衣装 `#3a4f8b` / 髪 `#6b4a2a` / アクセント(発光) `#c7cedd`
- 装備: a knight's helmet with a raised visor / bracing a crested guardian shield

```
The Guardian, protective and loyal expression, a knight's helmet with a raised visor, bracing a crested guardian shield, wearing an outfit in #3a4f8b, #6b4a2a hair, glowing #c7cedd accents, a steadfast protective stance
```

### ESTJ — 規律の実戦指揮官型（The Field Commander）

- 配色: 衣装 `#2f4f8b` / 髪 `#26262e` / アクセント(発光) `#e0b94a`
- 装備: an officer's peaked cap with an insignia / resting a straight knight's sword at the side

```
The Field Commander, disciplined and firm expression, an officer's peaked cap with an insignia, resting a straight knight's sword at the side, wearing an outfit in #2f4f8b, #26262e hair, glowing #e0b94a accents, an authoritative stance
```

### ESFJ — 陽だまりの宮廷官型（The Host）

- 配色: 衣装 `#4a6bb0` / 髪 `#d6b24a` / アクセント(発光) `#ff9bc0`
- 装備: a delicate jeweled tiara / holding an elegant folding fan

```
The Host, bright and sociable expression, a delicate jeweled tiara, holding an elegant folding fan, wearing an outfit in #4a6bb0, #d6b24a hair, glowing #ff9bc0 accents, a graceful welcoming smile
```

### ISTP — 無言の剣豪型（The Blademaster）

- 配色: 衣装 `#6b3a2a` / 髪 `#26262e` / アクセント(発光) `#cfd6e2`
- 装備: a swordsman's cloth headband / one hand on a sheathed katana

```
The Blademaster, cool and silent expression, a swordsman's cloth headband, one hand on a sheathed katana, wearing an outfit in #6b3a2a, #26262e hair, glowing #cfd6e2 accents, a quiet, focused ready stance
```

### ISFP — 自由なる吟遊詩人型（The Bard）

- 配色: 衣装 `#8b5a2a` / 髪 `#7a3a6b` / アクセント(発光) `#e0a050`
- 装備: an artist's beret / playing a bard's lute

```
The Bard, free and artistic expression, an artist's beret, playing a bard's lute, wearing an outfit in #8b5a2a, #7a3a6b hair, glowing #e0a050 accents, relaxed and easygoing
```

### ESTP — 電撃アサルト型（The Daredevil）

- 配色: 衣装 `#8b3a2a` / 髪 `#26262e` / アクセント(発光) `#ffd24a`
- 装備: tactical goggles resting on the forehead / crackling neon energy arcing between the fingers

```
The Daredevil, bold and fast expression, tactical goggles resting on the forehead, crackling neon energy arcing between the fingers, wearing an outfit in #8b3a2a, #26262e hair, glowing #ffd24a accents, a dynamic action lunge
```

### ESFP — 祝祭の先陣役型（The Showstopper）

- 配色: 衣装 `#c44a6b` / 髪 `#d9a52a` / アクセント(発光) `#ffe07a`
- 装備: a festive star-topped party crown / raising a blazing torch

```
The Showstopper, festive and magnetic expression, a festive star-topped party crown, raising a blazing torch, wearing an outfit in #c44a6b, #d9a52a hair, glowing #ffe07a accents, a celebratory open pose
```

## 5. 書き出しと取り込み（差し替えるだけで反映）

1. 生成したPNGを **透過背景**で（難しければ濃紺背景でも可）、以下の名前で保存:

   ```
   assets/types/src/intj.png
   assets/types/src/intp.png
   …（16タイプ、コードは小文字）
   ```

2. 取り込みコマンドを実行:

   ```
   python3 tools/import_type_illustrations.py
   ```

   これで各タイプの **ヒーロー画像** と **OGPシェアカード** が自動生成され、
   タイプページのHTML（表示モード/alt）も更新されます。1体ずつでも実行可。

3. キャッシュ更新のため `?v=deepNN` を1つ上げてコミット。

## 6. メモ

- 結果一覧の図鑑サムネやOGPの一部はドット絵のままです。タイプページのイラストが
  固まったら、同じ16体を縮小して図鑑にも展開すると統一できます（別タスク）。
- 透過PNGだと額縁・OGPともに最もきれいに収まります。
