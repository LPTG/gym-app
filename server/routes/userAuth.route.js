const express = require("express");
const router = express.Router();
const { redirectHome } = require("./middleware.js");
const passport = require("passport");

const userAuth_controller = require("../controllers/userAuth.controller");

// Need to check rest api naming standards
router.get("/", (req, res) => {
  if (req.user) {
    res.send("<h1>Welcome " + req.user.username + "<h1>");
  } else {
    res.send("<h1>Home Page<h1>");
  }
});

router.get("/login", redirectHome, userAuth_controller.loginForm);

router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    userAuth_controller.login(req, res, err, user, info, next);
  })(req, res, next);
});

router.get("/logout", userAuth_controller.logout);
router.post("/register", redirectHome, userAuth_controller.register);
router.post("/update", redirectHome, userAuth_controller.update);

module.exports = router;
