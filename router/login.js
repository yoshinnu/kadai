const router = require("express").Router();
const { authenticate } = require("../lib/security/accountcontrol.js");

//ログイン画面遷移
router.get("/", (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}, (req, res) => {
  res.render("home.ejs",{title: "Home"});
});
    
router.get("/login",(req, res) => {
  res.render("login.ejs", {title: "Login", message: req.flash("message") });
});
router.post("/login", authenticate());
module.exports = router;