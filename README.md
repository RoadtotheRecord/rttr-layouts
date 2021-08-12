NodeCG bundle 「Road to the Record」レイアウト
---

## セットアップ
たぶん環境次第でやり方変わってくるので迷ったら @gunimus に聞いてください
1. [Docker](https://www.docker.com/get-started) をインストール
2. [DockerCompose](https://docs.docker.jp/compose/install.html#compose) をインストール
3. このリポジトリをチェックアウトする
4. cfgフォルダに「rttr-layouts.json」を作成します。
```
// 以下を基に「rttr-layouts.json」を作成
{
    "google": {
        "webAppURL": "GASアプリのURL",
        "spreadsheetId": "スプレッドシートのID"
    }
}
// 「rttr-layouts.json」を保存
```
5. チェックアウトしてきたディレクトリで
    1. `docker-compose build`
    2. `docker-compose up -d`
6. ブラウザで `http://localhost:9091` にアクセス

## 構成
* Docker
* Node.js