# Amazon商品写真の自動更新

図鑑とガイドの商品画像を、ドット絵からAmazonの商品写真へ切り替えるための仕組み。
商品画像URLを取得し、HTMLに反映する。

> **未解決：取得部分は動かない可能性が高い（2026-11）**
>
> PA-API 5.0 は 2026-04-30 に非推奨、2026-05-15 に停止したとの情報があり
> （Amazonの開発者ページを含む複数の情報源）、現在は403を返すとされる。
> 後継の Creators API は認証が AWS キーから OAuth 2.0 に変わるため、
> `tools/fetch_amazon_images.py` の SigV4 署名はそのままでは使えない。
> さらに Creators API は「直近30日で10件の適格販売」が利用条件という情報がある。
>
> **影響は取得スクリプト1本に閉じている。** 反映（`apply`）・検査（`check`）・
> CSS・フォールバック・図鑑の描画は、入力が `{ASIN: {medium, large}}` の形で
> ありさえすれば取得元を問わないため、そのまま使える。
> 以下のPA-APIを前提にした記述は、取得手段が確定したら書き換える。

## なぜこの作りなのか

Amazonアソシエイト運営規約の都合で、実装方法がほぼ一通りに決まる。

1. **商品画像を自サイトに保存して配信してはいけない。**
   PA-APIが返した `m.media-amazon.com` のURLを `src` に直接入れる（ホットリンク）。
   画像のバイトは常にAmazonから配信される。`assets/` にJPEGを置くのは規約違反なので、
   `tools/check_amazon_images.py` が検出したら失敗する。
2. **PA-APIのデータは24時間を超えて保持できない。**
   このサイトは静的なので、GitHub Actions で日次に取り直してコミットし直す。
3. **PA-APIはアソシエイトの本審査通過が前提。**
   さらに、直近の売上が途切れるとアクセスが停止されることがある。止まった場合は
   ワークフローが失敗するので、Actionsのログで気づける。

## 初回セットアップ

### 1. PA-APIの認証情報を発行する

アソシエイト・セントラル → ツール → Product Advertising API から
アクセスキーとシークレットキーを発行する。シークレットキーは発行時にしか
表示されないので、その場で控える。

### 2. GitHub Secrets に登録する

リポジトリの Settings → Secrets and variables → Actions → New repository secret で3つ登録する。

| Secret名 | 値 |
|---|---|
| `PAAPI_ACCESS_KEY` | アクセスキー |
| `PAAPI_SECRET_KEY` | シークレットキー |
| `PAAPI_PARTNER_TAG` | `jbmt-22` |

認証情報はリポジトリにも環境変数ファイルにも置かない。Secretsだけに置く。

### 3. ワークフローを手動で1回動かす

Actions → 「Amazon商品画像の日次更新」 → Run workflow。
成功すると `data/amazon-images.json` とHTMLの差分がコミットされ、
Cloudflare Pages が自動でデプロイする。

以降は毎日 04:20 JST に自動実行される。

## 構成

| ファイル | 役割 |
|---|---|
| `tools/fetch_amazon_images.py` | PA-APIのGetItemsを叩き、画像URLを `data/amazon-images.json` に保存 |
| `tools/apply_amazon_images.py` | JSONの内容を図鑑とガイドのHTMLに反映 |
| `tools/check_amazon_images.py` | 反映結果を検査。問題があればワークフローを止める |
| `.github/workflows/amazon-images.yml` | 上の3つを日次で回し、差分があればコミット |

`fetch` は認証情報が要るが、`apply` と `check` はローカルでも動く。

```bash
python3 tools/fetch_amazon_images.py --dry-run   # 対象ASINの確認（認証不要）
python3 tools/apply_amazon_images.py             # 反映
python3 tools/check_amazon_images.py             # 検査
```

`apply` は2回続けて実行しても差分が出ない（冪等）。

## 表示の仕組み

写真が取れた製品のimgはこうなる。

```html
<img class="device-pick-thumb is-photo"
     src="https://m.media-amazon.com/images/I/xxxx._SL160_.jpg"
     data-fallback="assets/devices/p-mouse-gpx2.png?v=gear81" ...>
```

- `is-photo` … ドット絵用の `image-rendering: pixelated` を打ち消し、白背景の写真を
  タイルとして収める（`style.css`）
- `data-fallback` … 画像が読めなかったときに戻すドット絵。`script.js` のグローバル
  error ハンドラが拾って差し替える。Amazon側の都合でURLが切れても絵が消えない

写真が取れなかった製品は従来どおりドット絵のまま。`data/amazon-images.json` が
空または無い場合、`apply` は全てをドット絵に戻す（自己修復する）。

## 写真が出ない製品

図鑑60製品のうち、Amazonの商品ページ（`/dp/ASIN`）を指していない12製品には
写真が出ない。内訳は次のとおり。

**総称枠（単一の商品が存在しないので、写真は出せない）**

- WQHD QD-OLED（ASUS / MSI / Dell）
- 4K OLED 各社モデル
- 1万円台のフルHD 180〜200Hz
- 磁気軸・ラピッドトリガー（CAROTMAS / AIM1瞬 など）

**ASINを調べれば写真を出せる8製品**

- Logicool G PRO X2 SUPERSTRIKE
- Wooting 60HE / 80HE
- Pulsar Superglide 3 Glass（Type S）
- WALLHACK SP-004
- LG UltraGear 27GP850-B
- FlexiSpot C7
- エルゴヒューマン Pro2
- Comply フォームチップス

図鑑の `link` を `https://www.amazon.co.jp/dp/<ASIN>?tag=jbmt-22` に変えれば、
次回の実行から自動で写真が付く。ASINの取り違えは誤った商品の写真とリンクに
直結するので、商品ページを目視で確認してから変更する。

## 注意

- `data/amazon-images.json` はコミットする（gitignoreしない）。これが無いと
  ビルド時にHTMLがドット絵に戻る
- ASIN `B0BLVB63JH` は「Logicool G840 / G640」（マウスパッド）と
  「ロジクール G G840」（デスク）の2製品が共有している。同一商品なので
  同じ写真が出る。二重掲載を整理するなら図鑑側の編集が必要
- 価格は手書きの帯域表記のまま。PA-APIから実価格も取れるが、24時間ルールと
  在庫切れ時の表示を考える必要があるため、今は画像だけに留めている
