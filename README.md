# GameSpec Lab

PCゲームの相性、ゲームセンス、才能タイプ、おすすめゲームを診断する静的サイトです。

## 公開方法

GitHubにこのフォルダ内のファイルをアップロードし、Cloudflare Pagesでリポジトリを接続します。

- Build command: 空欄
- Build output directory: `/`
- Framework preset: None

## ファイル

- `index.html`: 2つの診断を選ぶトップページ
- `partner.html`: ゲームパートナー相性診断
- `gamesense.html`: 24問で8能力を可視化するGameSense Scan 8
- `style.css`: デザイン
- `script.js`: 診断ロジック、Amazonリンク、簡易イベント記録
- `assets/`: 画像
- `robots.txt` / `sitemap.xml`: 検索エンジン向け
- `_headers`: Cloudflare Pages向けヘッダー設定
- `404.html`: 見つからないページ用

## 注意

`node_modules` は不要です。このサイトはHTML、CSS、JavaScriptだけで動きます。
