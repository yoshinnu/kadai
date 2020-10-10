const {check } = require("express-validator");

module.exports = 
  [ 
    check("email")
      .not()
      .isEmpty()
      .withMessage("メールアドレスを入力してください。"),
    check("username")
      .not()
      .isEmpty()
      .withMessage("名前を入力してください。"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("パスワードを入力してください。"),
    check("repassword")
      .not()
      .isEmpty()
      .withMessage("確認用パスワードを入力してください。"),
    check("password")
      .isLength({min: 7, max: undefined})
      .withMessage("パスワードは7文字以上必要です。")
      .custom((value,{req}) =>{
        if(req.body.password !== req.body.repassword){
          throw new Error("パスワードが一致しません。");
        }
        return true;
      })
  ];

