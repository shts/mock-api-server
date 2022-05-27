トークン切れを再現するためのサーバー。

app.js - データを提供する API
auth.js - トークンを提供する API

app.js の API は auth.js で取得した token をリクエストヘッダー `api-key` に指定する必要あり。

git clone したら `yarn` でライブラリ群を取得。

`$ node app.js` `$ node auth.js` で両サーバーを起動

mongodb 使ってるのでインストール&起動を忘れず。


