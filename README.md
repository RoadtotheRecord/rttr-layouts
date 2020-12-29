NodeCG bundle 「Road to the Record」レイアウト
---

### 事前準備
これはNodeCGの"bundle"ファイルです。

[NodeCGのインストールページ](https://www.nodecg.dev/docs/installing/)に従ってNodeCGの導入まで実施してください。

NodeCGのインストールが完了したら、プロジェクトをダウンロードします。
```
cd bundles/rttr_layouts
git clone https://github.com/gunimus/rttr_layouts.git
npm install
cd ../..
```

プロジェクトをダウンロードしたらcfgフォルダに「rttr_layouts.json」を作成します。
```
cd cfg
// 以下を基に「rttr_layouts.json」を作成
{
    "requestURL": "GASアプリのURL"
}
// 「rttr_layouts.json」を保存
cd ..
```

jsonファイルを作成したら起動できます！
```
node index.js
```
