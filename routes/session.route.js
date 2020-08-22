const router = require("express").Router();
const passport = require("passport");
const session_controller = require("../controllers/session.controller");

// POST     /session                        // log user in
// DELETE   /session                        // log user out
// GET      /session                        // check if user is logged in

router.post("/", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    session_controller.create_session(req, res, err, user, info);
  })(req, res, next);
});

router.delete("/", session_controller.destroy_session);
router.get("/", session_controller.check_session);

module.exports = router;
