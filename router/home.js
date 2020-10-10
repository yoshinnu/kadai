const router = require("express").Router();
 
//ログイン画面遷移
router.get("/",(req, res) => {

  res.render("home.ejs", {title: "Home" });
});
module.exports = router;