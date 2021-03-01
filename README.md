NodeCG bundle 「Road to the Record」レイアウト
---

### 事前準備
起動にDocker Composeを使用しています。

cfgフォルダに「rttr_layouts.json」を作成します。
```
// 以下を基に「rttr_layouts.json」を作成
{
    "requestURL": "GASアプリのURL"
}
// 「rttr_layouts.json」を保存
```

jsonファイルを作成したら起動できます！
```
docker-compose build
docker-compose up -d
```
