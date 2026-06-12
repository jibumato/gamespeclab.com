# GameSpec Lab

PCゲーマー向けの診断サービスMVPです。

最初の入口は「ゲームパートナー相性診断」にして、結果ページからおすすめゲーム、推奨PC環境、周辺機器紹介へ自然につなげる構成にしています。

## 狙い

- SNSで話題になりやすい恋愛・相棒相性診断を入口にする
- 「ゲーム女子」だけに限定せず、ゲームパートナー相性として広く使える表現にする
- 結果ごとにおすすめゲームとPC構成を出し、収益導線を作る
- `/result/clutch-ace` のような結果タイプ別ページを作り、共有先として使う
- 診断結果にSNS画像風の共有カードを表示する
- PC構成診断で、予算・ゲーム傾向・画面環境・配信有無から構成タイプを出す
- PC構成結果ごとに、BTO PC、モニター、周辺機器の広告リンク枠を出す
- `/pc-result/fps-competitive` のようなPC構成結果ページを作り、共有先として使う
- 広告リンク枠のクリック数をブラウザ内に保存して表示する
- Amazonアソシエイト用の検索リンクを設定する
- 広告表記、プライバシーポリシー、免責事項、運営者情報ページを追加する
- 診断結果カードをSVGとして保存できる
- 将来的にPC構成診断、デバイス診断、配信環境診断へ拡張する

## 収益化メモ

- BTO PC、パーツ、モニター、マウス、ヘッドセット、マイク、チェアのアフィリエイト
- Amazonアソシエイトのタグは `src/App.tsx` の `AMAZON_ASSOCIATE_TAG` に `jbmt-22` を設定済み
- 現在のAmazonリンクは、RTX 50系、WQHD/OLEDモニター、Gen5 SSD、USB/XLRマイクなど新しめの検索語句に設定
- 結果タイプ別のおすすめゲーム紹介
- PC構成診断の結果別おすすめ枠
- 広告リンク枠のクリック計測
- 診断結果ページのスポンサー枠
- Discord、LINE、メール登録への誘導
- 人気結果タイプをもとにした比較記事やランキング記事

## ローカル確認

```bash
npm install
npm run dev
```

## Cloudflare Pages

GitHubにこのフォルダをpushして、Cloudflare Pagesでリポジトリを接続します。

```txt
Build command: npm run build
Build output directory: dist
```

`public/_redirects` を入れているため、Cloudflare Pagesでも `/result/cozy-link` などの直リンクを開けます。
PC構成診断の `/pc-result/fps-competitive` なども同じ仕組みで開けます。
運営情報ページの `/privacy`、`/disclaimer`、`/affiliate-disclosure`、`/about` も直リンクで開けます。

## 次に足すと強いもの

- 共有カードのPNG保存
- クリック計測をGoogle AnalyticsやCloudflare Web Analyticsに接続
- 運営者名、お問い合わせ先、正式なプライバシーポリシー文面の確定
- 人気ゲーム・人気デバイスの更新管理
