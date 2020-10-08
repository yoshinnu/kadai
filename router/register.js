const express = require("express");
const router = express.Router();
//validate設定
const validateRegistData = function (body){
  let isValidated = true, errors = {};
  let checkpasslength = 7;
  if(!body.name || !body.email || !body.password || !body.repassword) {
    isValidated = false;
    errors.parameter = "全ての項目を入力してください";
  }
  if(body.password !== body.repassword){
    isValidated = false;
    errors.comform = "パスワードが一致しません";
  }
  if(body.password.length < checkpasslength ){
    isValidated = false;
    errors.passlength = "パスワードは7文字以上にしてください" 
  }
  return isValidated ? undefined : errors;
};
//formデータ宣言
const createRegistData = function (body) {
  return {
    username: body.name,
    email: body.email,
    password: body.password,
    repassword: body.repassword
  };
};
//新規登録画面に遷移
router.get("/",(req, res) => {
  res.render("register.ejs", {title: "Register" });
});
//エラーなしならホーム画面遷移
router.post("/input", (req, res) => {
  let userdata = createRegistData(req.body);
  let errors = validateRegistData(req.body);
  if (errors){
    res.render("./conform/registerconform.ejs",{ errors, userdata, title: "Register"});
    return;
  }
  res.render("home.ejs", { userdata ,title: "Home"});
});
module.exports = router;