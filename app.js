//module定義
const applogger = require("./lib/log/logger.js").application;
const logger  = require("./lib/log/logger.js").console;
const accesslogger = require("./lib/log/accesslogger.js");
const systemlogger = require("./lib/log/systemlogger.js");
const express = require("express");
const app = express();
const flash = require("connect-flash");
const accountcontrol = require("./lib/security/accountcontrol.js");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
//ミドルウェアを設定
app.use(cookieParser());
app.set("view engine" ,"ejs");
app.use("/public", express.static(__dirname + "/public/" + (process.env.NODE_ENV === "development" ? "development" : "production")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());
app.use(...accountcontrol.initialize());
// セッションの設定
app.use(session({
  secret: "secret word",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 1000
  }
}));
//------アクセスログ取得
app.use(accesslogger());
//------
//ログイン画面遷移
app.use("/", require("./router/login.js"));
//アカウント登録画面遷移
app.use("/register", require("./router/register.js"));
//ホーム画面遷移
app.use("/home", require("./router/home.js"));
//------システムログ取得
app.use(systemlogger());
//------
//------アプリケーションログ取得
applogger.error("app1","message3");
//-------
app.listen(3000);
//------コンソールログ
logger.info("start.");