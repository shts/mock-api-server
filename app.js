//expressモジュールの読み込み
const express = require('express')
//expressのインスタンス化
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

async function getToken () {
  const axios = require('axios');
  const res = await axios.get('http://localhost:8081');
  return res.data.idToken;
};

app.use(async (req, res, next) => {
  console.log('Time:', Date.now())
  const token = await getToken();
  const headerToken = req.header('api-key');
  if (token != headerToken) {
    res.status(401);
    return res.json({ error: 'invalidate token'});
  }
  next();
})


const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/test_db');

const db = mongoose.connection;
db.once('open', () => console.log('DB connection successful'));

const UserSchema = mongoose.Schema({
  name: String,
  age: Number
});

const userModel = mongoose.model('User',UserSchema);


//8080番ポートでサーバーを待ちの状態にする。
//またサーバーが起動したことがわかるようにログを出力する
app.listen(8080, () => {
  console.log("サーバー起動中");
});

//GETリクエストの設定
//'/get'でアクセスされた時に、JSONとログを出力するようにする
app.get('/', async (req, res) => {
  res.json({res: "Hello World"});
  res.end();
});

app.get('/users', async (req, res) => {
  const users = await userModel.find({});
  res.json(users);
});

app.post('/user', async (req, res) => {
  await userModel.create({ name: req.body.name, age: req.body.age});
  res.json({ result: "OK" });
});

// 疎通テスト用
app.get('/token', async (req, res) => {
  const axios = require('axios');
  const response = await axios.get('http://localhost:8081');
  res.json(response.data); 
});


