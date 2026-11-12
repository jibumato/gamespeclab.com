# Amazon商品写真の自動更新

図鑑とガイドの商品画像を、ドット絵からAmazonの商品写真へ切り替えるための仕組み。
Creators API から画像URLを取得し、HTMLに反映する。

> **現状：未稼働。利用条件を満たす必要がある（2026-11時点）**
>
> Creators API の利用には **直近30日間で10件の適格販売** が必要（公式 Prerequisites）。
> 条件を満たして認証情報を発行するまで、画像URLは取得できない。
> その間サイトは従来どおりドット絵を表示し続ける（`data/amazon-images.json` が
> 無ければ何も変わらない作りになっている）。

## なぜこの作りなのか

Amazonアソシエイト運営規約の都合で、実装方法がほぼ一通りに決まる。

1. **商品画像を自サイトに保存して配信してはいけない。**
   JPプログラムポリシー ライセンス条項(h)は「画像で構成されるプロダクト広告
   コンテンツを保存またはキャッシュしてはいけません」と定める。APIが返した
   `m.media-amazon.com` のURLを `src` に直接入れる（ホットリンク）。
   `assets/` にJPEGを置くのは違反なので `tools/check_amazon_images.py` が検出して止める。
2. **画像へのリンクは最長24時間しか保持できない**（同条項(h)）。
   静的サイトなので、GitHub Actions で日次に取り直してコミットし直す。
3. **画像の改変は「比率を維持したリサイズ」だけ**（同 §170(a)）。
   `object-fit: contain` で比率を保ち、角丸は当てない。トリミング・合成・
   オーバーレイは不可。
4. **価格・レビューはAPI経由でしか出せない**（§153 / §189）。
   いまは価格を手書きの帯域表記で出しているので、この仕組みでは画像だけ扱う。

## 前提条件

| 条件 | 内容 |
|---|---|
| アソシエイト本登録 | 最終承認済みであること |
| 適格販売 | **直近30日間で10件以上**（公式 Prerequisites） |
| 登録者 | プライマリアカウント所有者のみ |
| 上限 | 1ストアあたりアプリ2つ、1アプリあたり認証情報2セット |

公式ドキュメント内に矛盾があり、API Rates ページは「30日間連続で適格販売が
0件なら失効、発送後2日以内に復帰」と書いている。どちらが実際の判定かは
断定できないため、10件/30日を満たし続ける前提で考えておくのが安全。

## 初回セットアップ

### 1. Creators API に登録して認証情報を発行する

アソシエイト・セントラル → Creators API の登録ページから申請し、
Credential ID と Credential Secret を発行する。日本は **FE リージョン
（認証情報バージョン 3.3）**。

### 2. GitHub Secrets に登録する

リポジトリの Settings → Secrets and variables → Actions → New repository secret。

| Secret名 | 値 |
|---|---|
| `CREATORS_CLIENT_ID` | Credential ID |
| `CREATORS_CLIENT_SECRET` | Credential Secret |
| `CREATORS_PARTNER_TAG` | `jbmt-22` |

認証情報はリポジトリにも環境変数ファイルにも置かない。Secretsだけに置く。

### 3. ワークフローを手動で1回動かす

Actions → 「Amazon商品画像の日次更新」 → Run workflow。
成功すると `data/amazon-images.json` とHTMLの差分がコミットされ、
Cloudflare Pages が自動でデプロイする。以降は毎日 04:20 JST に自動実行。

失敗した場合はログを見る。401/403 なら利用条件（10件/30日）を割っている
可能性が高く、スクリプトがその旨をヒントとして出す。

## API の呼び方（実装済みの内容）

認証は OAuth 2.0 の `client_credentials`。リフレッシュトークンは発行されず、
ブラウザ同意も不要なので、無人のCIで素直に動く。

```
POST https://api.amazon.co.jp/auth/o2/token
  {"grant_type":"client_credentials","client_id":…,"client_secret":…,
   "scope":"creatorsapi::default"}
  → {"access_token":…, "expires_in":3600}

POST https://creatorsapi.amazon/catalog/v1/getItems
  Authorization: Bearer <token>
  x-marketplace: www.amazon.co.jp          ← PA-APIに無かった必須ヘッダ
  {"itemIds":[…最大10件…],"itemIdType":"ASIN",
   "marketplace":"www.amazon.co.jp","partnerTag":"jbmt-22",
   "resources":["images.primary.medium","images.primary.large","itemInfo.title"]}
```

レスポンスのフィールドは lowerCamelCase（PA-API の PascalCase から変更）。
画像は `images.primary.medium.url` に入り、ホストは `m.media-amazon.com` のまま。
サイズはURLの `_SLxxx_` で決まる（small=75px、medium=160px、large=500px）。

## 構成

| ファイル | 役割 |
|---|---|
| `tools/fetch_amazon_images.py` | Creators API を叩き、画像URLを `data/amazon-images.json` に保存 |
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
     data-fallback="assets/devices/p-mouse-gpx2.png?v=gear21"
     onerror="this.onerror=null;var f=this.dataset.fallback;if(f){…;this.src=f}" ...>
```

- `is-photo` … ドット絵用の `image-rendering: pixelated` を打ち消し、
  比率を保ったまま白背景のタイルに収める（`style.css`）
- `onerror` … 画像が読めなければドット絵に戻す。**解析時に登録される**ので、
  `script.js` の到着が遅れても取りこぼさない
- `script.js` 側にも同じ働きのグローバルハンドラがあり、`onerror` を通らない
  経路の保険になっている。こちらはキャプチャ段階で先に走って `data-fallback`
  を外すため、`onerror` 側は属性が無ければ何もしないようにしてある

写真が取れなかった製品は従来どおりドット絵のまま。`data/amazon-images.json` が
空または無い場合、`apply` は全てをドット絵に戻す（自己修復する）。

## 写真が出ない製品

図鑑60製品のうち、Amazonの商品ページ（`/dp/ASIN`）を指していない12製品には
写真が出ない。

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
  HTMLがドット絵に戻る。なお画像URLがgit履歴に24時間を超えて残る点は、
  規約が制限しているのが「表示に使うコンテンツの保持」であり履歴の保存とは
  別と解しているが、気になる場合はワークフローで履歴を潰す運用も取れる
- ASIN `B0BLVB63JH` は「Logicool G840 / G640」（マウスパッド）と
  「ロジクール G G840」（デスク）の2製品が共有している。同一商品なので
  同じ写真が出る。二重掲載を整理するなら図鑑側の編集が必要
- API を使わずにAmazonの商品画像を表示する手段は実質無い。SiteStripe の
  画像リンク生成は2023年12月に終了しており（二次情報）、残るテキストリンクに
  画像は含まれない。条件を満たせない間は、ドット絵を使い続けるか、
  自前で撮影した画像に切り替えるかの二択になる
