/// トークンを返すサーバー

//expressモジュールの読み込み
const express = require('express')
//expressのインスタンス化
const app = express()

//8081番ポートでサーバーを待ちの状態にする。
//またサーバーが起動したことがわかるようにログを出力する
app.listen(8081, () => {
  console.log("サーバー起動中");
});

//GETリクエストの設定
//'/get'でアクセスされた時に、JSONとログを出力するようにする
app.get('/', (req, res)=> {
    res.json({ idToken : "bbbb"});
});



