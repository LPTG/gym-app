const router = require("express").Router();
const users_controller = require("../controllers/users.controller");
const workout_route = require("../routes/workout.route");
const template_route = require("../routes/template.route");

// GET      /users                                      // returns a list of all users
// POST     /users                                      // create a new user
// GET      /users/:username                            // returns information on single user
// PUT      /users/:username                            // update a single user

router.get(
  "/",
  function (req, res, next) {
    if (req.user.type !== "Admin") return res.status(403).send({ error: "Admin access only." });

    next();
  },
  users_controller.read_all
);
router.post("/", users_controller.create_user);
router.get("/:username", users_controller.read_user);
router.put("/:username", users_controller.update_user);

router.use("/:username/workouts", workout_route);
router.use("/:username/templates", template_route);

module.exports = router;
