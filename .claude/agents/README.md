# GamespecLab 運営チーム

このディレクトリのエージェントは、GamespecLab の運用で繰り返してきた作業を分担します。
Claude Code は**セッション開始時に読み込む**ため、追加・変更した直後のセッションでは呼び出せません。次回から有効になります。

## 構成

| エージェント | 担当 | 呼び出し例 |
|---|---|---|
| `pro-scout` | プロ選手の調査・データ追加。掲載可否の判断 | 「プロ選手を5名追加して」 |
| `site-builder` | 生成スクリプト実行・キャッシュバスター・整合性 | 「データを反映して」 |
| `site-qa` | Playwright での全ページ検証 | 「検証して」 |
| `content-auditor` | リンク・数値・メタデータの監査（報告のみ） | 「監査して」 |

## 標準的な流れ

選手追加を例にすると、こう連携します。

```
pro-scout      調査して pro_players.json を更新（出典が弱いものは見送る）
     ↓
site-builder   gen_pro_pages.py → gen_game_pages.py → gen_search_index.py
               キャッシュバスターを更新
     ↓
site-qa        全ページ走査。問題があればここで止める
     ↓
（メイン）      コミット → rebase → PR → squash merge
```

`content-auditor` はこの流れとは独立に、定期点検として単独で回します。

## 設計の前提

- **一次データは `tools/pro_players.json` と `device-zukan.html` の `DATA`。** 生成されるHTMLを直接編集しない
- **手書きの数値を作らない。** 「プロ使用N名」「全52製品」の類は生成スクリプトで同期する。過去に複数箇所でズレた
- **正確性を件数より優先する。** 出典が矛盾するデータは載せない
- **コミット前に必ず全ページ検証する。** 横スクロールとJSエラーが最も事故が多い

## リポジトリの運用ルール

- 作業ブランチ: `claude/gamesepclabの預言者型修正-gf31xr`
- main はsquash mergeで更新されるため、続けて作業するときは `git rebase origin/main` してから `--force-with-lease` で push する
- コミットメッセージ・PR本文は日本語。何をなぜ変えたかを書く
