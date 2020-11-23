NodeCG bundle 「Road to the Record」レイアウト
---

### 事前準備
これはNodeCGの"bundle"ファイルです。

[NodeCGのインストールページ](https://nodecg.com/index.html#install)に従って、下記コマンドを入力するところまで実施してください。

```
git clone https://github.com/nodecg/nodecg.git
cd nodecg
npm install --production
node index.js
```
NodeCGにアクセスして空のダッシュボードが表示されたらOKです。

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
