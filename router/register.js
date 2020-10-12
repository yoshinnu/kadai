const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const { dbURL, dbName, dbOption } = require("../config/mongodb.config.js");
const logger  = require("../lib/log/logger.js").console;
// const {validateRegistData, check} = require("../lib/validation/validation.js");
const { validationResult } = require("express-validator");
const registercheck = require("../lib/validation/validation.js");

//ユーザー情報作成
const createDBRegistUser = function (body) {
  return {
    username: body.username,
    email: body.email,
    password: body.password
  };
};
//新規登録画面に遷移
router.get("/",(req, res) => {
  res.render("register.ejs", {title: "Register" });
});
//エラーなしならホーム画面遷移
router.post("/input",registercheck,(req, res) => {
  let userdata = createDBRegistUser(req.body);
  let errors = validationResult(req);
  logger.info(errors.array());
  if (!errors.isEmpty()){
    logger.info("validationエラー");
    errors =errors.array(); 
    logger.info(errors[0].msg);
    res.render("../views/register.ejs",{ errors, title: "Register"});
    return;
  }
  logger.info("DB接続");
  //DBへ接続設定
  MongoClient.connect(dbURL,dbOption,(error,client) => {
    logger.info(dbURL);
    var db = client.db(dbName);
    //ユーザー登録
    db.collection("users")
      .insertOne(userdata)
      .then(() => {
        res.render("../views/home.ejs",{ title: "Home",userdata});
      }).catch((error) => {
        throw error;
      }).then(() => {
        client.close();
        logger.info("DB切断");
      });
  });
});
module.exports = router;