const router = require("express").Router();
//ログイン画面遷移
router.get("/",(req, res) => {
  res.render("login.ejs", {title: "Login" });
});
module.exports = router;