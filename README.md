# GameSpec Lab

PCゲームの相性、才能タイプ、おすすめゲーム、PC構成を診断する静的サイトです。

## 公開方法

GitHubにこのフォルダ内のファイルをアップロードし、Cloudflare Pagesでリポジトリを接続します。

- Build command: 空欄
- Build output directory: `/`
- Framework preset: None

## ファイル

- `index.html`: トップページと診断本体
- `style.css`: デザイン
- `script.js`: 診断ロジック、Amazonリンク、簡易イベント記録
- `assets/`: 画像
- `robots.txt` / `sitemap.xml`: 検索エンジン向け
- `_headers`: Cloudflare Pages向けヘッダー設定
- `404.html`: 見つからないページ用

## 注意

`node_modules` は不要です。このサイトはHTML、CSS、JavaScriptだけで動きます。
