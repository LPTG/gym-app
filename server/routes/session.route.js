const router = require("express").Router();
const passport = require("passport");
const session_controller = require("../controllers/session.controller");

// POST     /session                        // log user in
// DELETE   /session                        // log user out

//router.get("/new", session_controller.create_session);
router.post("/", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    session_controller.create_session(req, res, err, user, info);
  })(req, res, next);
});

router.delete("/", session_controller.destroy_session);

module.exports = router;
