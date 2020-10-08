//express呼び出し
const express = require("express");
const app = express();
//ejsをset
app.set("view engine" ,"ejs");
app.use(express.static(__dirname + "/views"));

//ログイン画面遷移
app.use("/", require("./router/login.js"));

//アカウント登録画面遷移
app.use("/register", require("./router/register.js"));

app.listen(3000);
