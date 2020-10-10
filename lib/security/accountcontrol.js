const MongoClient = require("mongodb").MongoClient;
const { dbURL, dbName, dbOption } = require("../../config/mongodb.config.js");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
let initialize, authenticate,authorize;

passport.serializeUser((email, done) => {
  done(null, email);
});
passport.deserializeUser((email, done) => {
  MongoClient.connect(dbURL, dbOption, (error, client) => {
    var db = client.db(dbName);
    db.collection("users")
      .findOne({email})
      .then((user) => {
        console.log(user);
        done(null, user);
      }).catch((error) => {
        done(error);
      }).then(() => {
        client.close();
      });
  });
});

passport.use("local-strategy",
  new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, (req, email, password, done) => {
    MongoClient.connect(dbURL, dbOption, (error, client) => {
      var db = client.db(dbName);
      db.collection("users")
        .findOne({
          email: email,
          password: password
        }).then((user) => {
          if (user) {
            req.session.regenerate((error) => {
              if (error) {
                done(error);
              } else {
                done(null, user);
              }
            });
          } else {
            done(null, false, req.flash("message", "メールアドレス または パスワード が間違っています。"));
          }
        }).catch((error) => {
          done(error);
        }).then(() => {
          client.close();
        });
    });
  })
);
initialize =function(){
  return[
    passport.initialize(),
    passport.session()
  ];
};
authenticate = function(){
  return passport.authenticate(
    "local-strategy", {
      successRedirect: "/home",
      failureRedirect: "/login"
    }
  );
};
authorize = function (privilege) {
  return function (req, res, next) {
    if (req.isAuthenticated() &&
      (req.user.permissions || []).indexOf(privilege) >= 0) {
      next();
    } else {
      res.redirect("/");
    }
  };
};
module.exports = {
  initialize, 
  authenticate,
  authorize
};