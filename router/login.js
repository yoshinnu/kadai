const router = require("express").Router();
//ログイン画面遷移
router.get("/",(req, res) => {
  res.render("login.ejs", {title: "Login", message: req.flash("message") });
});
    
router.get("/login",(req, res) => {
  res.render("login.ejs", {title: "Login", message: req.flash("message") });
});

module.exports = router;