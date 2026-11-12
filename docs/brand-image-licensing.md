# メーカー公式画像の利用可否（調査記録）

図鑑60製品の商品写真を、メーカー公式の製品画像で賄えるかを調べた記録。
調査日 2026-11-12。

## 結論

**この方法では賄えない。** 自サイトに置いて表示することが条文上はっきり
認められているのは、**60製品のうち2製品（IODATAのモニター）だけ**だった。

| 分類 | 製品数 | 内容 |
|---|---|---|
| A. 条文上明確に可 | **4** | IODATA 2製品、Xbox 2製品（**パッケージ画像のみ**） |
| B. 条件が曖昧／要問い合わせ | **13** | Logicool 7、ASUS 5、BenQ/ZOWIE 1 |
| C. 明確に不可、または確認不能 | **25** | Razer 5、SteelSeries 3、HyperX 3、GIGABYTE 3、ARTISAN 2、Pulsar 2、PlayStation 2、LG 2、INZONE 2、ASRock 1 |
| 未調査 | **18** | 中小ブランド、総称枠、オフィスチェア各社 |

Xbox の2製品を「使える」と数えているが、許諾されているのは製品写真ではなく
**パッケージ画像（box shot）**で、しかもトリミング不可。箱の写真だけが
他59製品のシルエットの中に並ぶことになるので、実用上は使えない。
**実質2/60**と考えてよい。

## この調査の限界（重要）

調査したセッションでは**ブランド各社のドメインが全てネットワーク遮断されていて、
規約ページを直接読めていない。** 以下の記述はすべて、検索結果に含まれていた
公式ドメイン上のページからの引用抜粋に基づく。

画像を実際に使う前には、該当ページをブラウザで直接確認すること。特に
A分類の IODATA は、**たった2製品のために条文解釈のリスクを負う**ことになるので、
原文確認は必須。

## 横断的に分かったこと

1. **13ブランドのうち、アフィリエイト収益化サイトでの利用を名指しで許諾/禁止
   しているブランドは1つも無い。** 「editorial use only」という語を使っている
   ブランドも無い。つまり「レビューサイトなら使っていい」と書いてある会社は
   存在せず、既定ルール（＝事前の書面許諾が必要）に当たるかどうかの判断になる。
2. **「プレスキットからダウンロードできる」は許諾の根拠にならない。**
   ASUS・SteelSeries・HP/HyperX・GIGABYTE は、ダウンロードリンクを提供しつつ
   利用には書面許諾を要求している。この取り違えが一番危ない。
3. 収益化が判定を左右すると**明文で**読めるのは2件だけ。LG の
   "for commercial use without the express written consent" と、
   Xbox Fansite Guidelines（非商用ファンサイト限定）。
4. **ASRock は ASUS の別会社**（2002年スピンオフ、現 Pegatron グループ）。
   ASUS の条件を流用できない。

## ブランド別

### A. 条文上明確に可

**IODATA** — [サイトご利用上の注意](https://www.iodata.jp/copyright.htm/)

> 各商品のギャラリーページに掲載されている商品写真（JPG、EPS形式）は、データの
> 加工、複製、印刷、送信、提示を行うことを認めます。ただし、商品の著しい変形や、
> アイ・オー・データ以外の商品として利用することは禁止します。

- 「送信」が含まれるのでウェブ掲載・自前ホスティングは射程内
- 「加工」が明示的に許諾されている（リサイズ・トリミング可。背景除去は
  「著しい変形」に当たるかの程度問題）
- 商用利用禁止の文言も editorial 限定の文言も無い
- 対象は**ギャラリーページの商品写真（JPG, EPS）に限定**。サイト上の他の
  写真・イラスト・映像は別扱いで、事前の文書許諾が必要

**Microsoft / Xbox（パッケージ画像のみ）** — [Use of Microsoft Copyrighted Content](https://www.microsoft.com/en-us/legal/intellectualproperty/copyright/permissions)

- box shot は "advertising, documentation, tutorials, videos, and websites" で
  使用可と明文。ただし**画像全体としてのリサイズのみ**可で、箱から製品部分を
  切り出すのは不可
- **製品写真は別扱いで不可**。商標ガイドラインに
  "photographs, videos, and designs can never be used without an express license"
- 窓口 trademarks@microsoft.com / xboxbrand@microsoft.com
- 許諾ページは検索インデックス上「約4年前」と出ており、現行版の確認が必要

### B. 要問い合わせ

**Logicool / Logitech G（7製品）** — [Logitech Assets License](https://www.logitech.com/en-us/tos/logitech-assets-license)

- 許諾範囲は "in direct association with the sale, marketing, or promotion of
  new, genuine Logitech products" かつ **Logitech から正式に権利を付与された
  国／地域に限る**。独立系レビューサイトはこれに当たらないため、条文上は
  事前書面許諾または正規パートナー化が必要
- 禁止例に「Amazon・eBay 等のマーケットプレイスでの出品・販売」があるが、
  これは**マーケットプレイスで売る行為**の禁止で、アフィリエイトリンクを
  貼ることとは別論点。混同しないこと
- [Affiliate Program](https://www.logitech.com/en-us/programs/affiliate-program)
  ではアフィリエイトが「プログラム経由で供給されたロゴ」を使用できると明記。
  製品画像まで含むかは未確認 → **ここが問い合わせポイント**
- 日本語の[商標ガイドライン](https://www.logicool.co.jp/ja-jp/tos/trademark-guidelines.html)はあるが、Assets License の日本語版は見つからない

**ASUS / ROG / TUF（5製品）**

- [Media Kit](https://press.asus.com/media/media-kit/) と
  [日本法人の広報サイト](https://www.asus-event.com/pr/)（製品ごとに画像ZIP）は
  存在するが、**利用条件の本文を取得できていない**
- 一般規約は「書面合意なしに画像を使う権利を与えない」
- ASUS JAPAN 広報が窓口として明確 → **問い合わせで白黒がつく見込みが高い**

**BenQ / ZOWIE（1製品）**

- BenQ はニュースルームに Mynewsdesk を使用（[media library](https://www.mynewsdesk.com/benq/latest_media)）。
  **ファイル単位でライセンスラベルが違う**（"Media Use" と "All rights reserved" が混在）
- Mynewsdesk の "Media Use" は対象に *"journalists, bloggers, columnists"* を
  明示的に含む。13ブランド中、収益化サイトに最も近い明文
- ただし **BenQ 自身の規約ではない**、**改変不可**（unmodified 条件 →
  リサイズすら不可と読める）、**クレジット表記必須**、**ZOWIE 製品の収録が未確認**、
  文言のスニペットが約5700日前と非常に古い

### C. 不可／確認不能

| ブランド | 製品数 | 根拠 |
|---|---|---|
| Razer | 5 | *"may not reproduce, alter or adapt any of our creative assets ... without our express written consent"*（[Trademark Use Guidelines](https://www.razer.com/legal/trademark-use-guidelines)） |
| SteelSeries | 3 | **利用条件を定めた文書が公式ドメイン内に一切見つからない**。アセットは Box / Bynder で製品ごとに個別配布 |
| HyperX (HP) | 3 | *"you may link to, but may not copy, any Materials"*（HP Terms of Use）。※[HP/HyperX Visual Content Terms](https://hyperx.com/pages/hp-hyperx-visual-content-terms-of-use) は**UGC規約でプレスアセットの規約ではない**ので混同注意 |
| GIGABYTE / AORUS | 3 | 書面承認なしの *"reproducing, distributing, adapting, editing"* を禁止（[Terms of Use](https://global.aorus.com/terms_of_use.php)） |
| ARTISAN | 2 | [利用規約](https://artisan-jp.com/jp/term-of-service)が**「商品写真」を名指しで**著作権の対象とし、無断複製・転載・改変を禁止。プレスキットは存在しない |
| Pulsar | 2 | 明示的書面許諾なしの複製不可（[ToS](https://www.pulsar.gg/policies/terms-of-service)。中国語版は画像を明示列挙） |
| PlayStation / DualSense | 2 | [著作権について（日本）](https://www.playstation.com/ja-jp/legal/about-copyrights/)が**「ウェブサイトへの転載は許諾しない」と明文**。13ブランド中最も明確な禁止。[SIEの商品画像ページ](https://sonyinteractive.com/jp/)は用途別窓口（報道→広報部／販売→営業部）に分かれる |
| LG | 2 | *"None of the information on this site may be copied, distributed or transmitted in any way **for commercial use** without the express written consent"*（[Legal Statement](https://www.lg.com/global/legal/)）。収益化サイトに直撃。[Brand Assets](https://www.lg.com/global/our-identity/brand-assets/) はロゴのみで製品画像ではない |
| INZONE | 2 | SIE ではなく**ソニー側のブランド**で別管轄。[ソニー ウェブサイトご利用条件](https://www.sony.jp/CorporateCruise/terms/)は私的使用超に事前の文書許諾を要求 |
| ASRock | 1 | **プレスキット・規約とも一切見つからない**（ASUS とは別会社） |

## 未調査の18製品

中小ブランド（ATTACK SHARK、SkyPAD、GameSir、WALLHACK、Wooting、8BitDo、Comply）、
オフィスチェア各社（GTPLAYER、EdoErgo、COFO、FlexiSpot、エルゴヒューマン、
ハーマンミラー、エルゴトロン、ottostyle.jp）、総称枠3件。

A分類が2製品しか出なかった時点でこの方法を採らない判断になったため、
ここで打ち切っている。方針が変わったら再開する。

## 問い合わせする場合の窓口

| ブランド | 窓口 |
|---|---|
| ASUS | ASUS JAPAN 広報（[asus-event.com/pr](https://www.asus-event.com/pr/)） |
| Logicool | Affiliate Program 経由 |
| BenQ | 日本法人広報 |
| Microsoft / Xbox | trademarks@microsoft.com、xboxbrand@microsoft.com |
| SIE | 用途により広報部／営業部 |
| HP / HyperX | MediaRelations@hp.com |

B分類の3ブランド（13製品）が全て可になっても、A+B で17/60。
**問い合わせの手間に対して得られる製品数が見合わない**のが、この方法の
本質的な問題。
