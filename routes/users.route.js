const router = require("express").Router();
const users_controller = require("../controllers/users.controller");
const workout_route = require("../routes/workout.route");
const template_route = require("../routes/template.route");

// GET      /users                                      // returns a list of all users
// POST     /users                                      // create a new user
// GET      /users/:username                            // returns information on single user
// PUT      /users/:username                            // update a single user

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    // req.isAuthenticated() will return true if user is logged in
    next();
  } else {
    return res.status(401).send({ error: "Authentication required" });
  }
}

router.get(
  "/",
  function (req, res, next) {
    if (req.user.type !== "Admin") return res.status(403).send({ error: "Admin access only." });

    next();
  },
  users_controller.read_all
);

router.post("/", users_controller.create_user);
router.get("/:username", checkAuthentication, users_controller.read_user);
router.put("/:username", checkAuthentication, users_controller.update_user);

router.use("/:username/workouts", checkAuthentication, workout_route);
router.use("/:username/templates", checkAuthentication, template_route);

module.exports = router;
