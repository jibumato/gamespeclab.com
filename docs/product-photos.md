# 商品写真の反映

図鑑とガイドの商品画像を、ドット絵から商品写真へ切り替えるための仕組み。
写真の出どころは2通りあり、どちらも同じストア（`data/product-photos.json`）で
扱う。

| | メーカー公式画像 | Amazon Creators API |
|---|---|---|
| 置き場所 | `assets/devices/photos/` に自前ホスティング | `m.media-amazon.com` を直接参照 |
| 対象 | 許諾の取れたブランドのみ（**実測2/60製品**） | ASINのある48製品 |
| 更新 | 不要（画像を足したときだけ） | 24時間ごとに取り直し必須 |
| 条件 | ブランドごとの利用許諾 | 直近30日で10件の適格販売 |

両方に写真がある製品は**メーカー公式画像を優先**する。自サイトに置ける分、
24時間の保持制限を受けず、画像が消える心配もないため。

> **現状（2026-11）**
>
> - Creators API は利用条件（直近30日で10件の適格販売）を満たしておらず**使えない**。
>   そのため日次スケジュールはワークフロー内でコメントアウトしてある。
> - メーカー公式画像も**実質使えない**。13ブランドを調査した結果、自前ホスティングが
>   条文上明確に許されるのは IODATA の2製品だけだった。詳細は
>   [brand-image-licensing.md](brand-image-licensing.md)。
> - ストアが空の間、サイトは従来どおりドット絵を表示する。
>
> 仕組み自体は出どころを問わない作りなので、別の供給元（楽天/Yahoo!のAPI、
> 自前撮影など）が決まればそのまま流用できる。

## なぜこの作りなのか

Amazon由来の画像を使う場合、運営規約の都合で実装方法がほぼ一通りに決まる。
（メーカー公式画像を自前ホスティングする場合、以下1〜3はAmazonの規約の
話なので適用されない。代わりに各ブランドの利用条件に従う）

1. **商品画像を自サイトに保存して配信してはいけない。**
   JPプログラムポリシー ライセンス条項(h)は「画像で構成されるプロダクト広告
   コンテンツを保存またはキャッシュしてはいけません」と定める。APIが返した
   `m.media-amazon.com` のURLを `src` に直接入れる（ホットリンク）。
   `assets/` にJPEGを置くのは違反なので `tools/check_product_photos.py` が検出して止める。
2. **画像へのリンクは最長24時間しか保持できない**（同条項(h)）。
   静的サイトなので、GitHub Actions で日次に取り直してコミットし直す。
3. **画像の改変は「比率を維持したリサイズ」だけ**（同 §170(a)）。
   `object-fit: contain` で比率を保ち、角丸は当てない。トリミング・合成・
   オーバーレイは不可。
4. **価格・レビューはAPI経由でしか出せない**（§153 / §189）。
   いまは価格を手書きの帯域表記で出しているので、この仕組みでは画像だけ扱う。

## メーカー公式画像を追加する

1. ブランドのプレスキット/ブランドアセットで利用条件を確認する。
   収益化しているレビューサイトでの利用が認められるかを必ず見る。
   **「プレスキットからダウンロードできる」は許諾の根拠にならない**（調査した
   13ブランド中4社が、ダウンロードリンクを提供しつつ書面許諾を要求していた）。
   調査済みブランドの判定は [brand-image-licensing.md](brand-image-licensing.md)。
2. 画像を `assets/devices/photos/<ドット絵と同じ名前>` に置く
   （例: `assets/devices/photos/p-mouse-gpx2.webp`）
3. `data/product-photos.json` にレコードを足す

```json
{
  "p-mouse-gpx2": {
    "src": "assets/devices/photos/p-mouse-gpx2.webp",
    "credit": "Logicool",
    "source": "https://gaming.logicool.co.jp/..."
  }
}
```

4. `python3 tools/apply_product_photos.py && python3 tools/check_product_photos.py`

`credit` と `source` は表示には使っていないが、どのブランドの素材をどこから
持ってきたかを後から辿れるように必ず書く。許諾条件に帰属表示が含まれる
場合は、表示方法を別途決める必要がある。

## Creators API を使う場合の前提条件

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

Actions → 「商品写真の反映」 → Run workflow。
成功すると `data/product-photos.json` とHTMLの差分がコミットされ、
Cloudflare Pages が自動でデプロイする。

Amazon由来の画像は24時間を超えて保持できないため、Creators API を使い
始めたらワークフロー内の `schedule` のコメントを外して日次実行にする。

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
| `tools/fetch_amazon_photos.py` | Creators API を叩き、画像URLを `data/product-photos.json` に保存 |
| `tools/apply_product_photos.py` | JSONの内容を図鑑とガイドのHTMLに反映 |
| `tools/check_product_photos.py` | 反映結果を検査。問題があればワークフローを止める |
| `.github/workflows/product-photos.yml` | 上の3つを回し、差分があればコミット（現在は手動実行のみ） |

`fetch` は認証情報が要るが、`apply` と `check` はローカルでも動く。

```bash
python3 tools/fetch_amazon_photos.py --dry-run   # 対象ASINの確認（認証不要）
python3 tools/apply_product_photos.py             # 反映
python3 tools/check_product_photos.py             # 検査
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

写真が取れなかった製品は従来どおりドット絵のまま。`data/product-photos.json` が
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

- `data/product-photos.json` はコミットする（gitignoreしない）。これが無いと
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
