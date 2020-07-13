const router = require("express").Router();
const users_controller = require("../controllers/users.controller");
const workout_route = require("../routes/workout.route");
const template_route = require("../routes/template.route");

// GET      /users                                      // returns a list of all users
// POST     /users                                      // create a new user

// GET      /users/:username                            // returns information on single user
// PUT      /users/:username                            // update a single user

// GET      /users/:username/workouts                   // returns workouts of a single user
// POST     /users/:username/workouts                   // create a new workout for a user
// GET      /users/:username/workouts/:workoutID        // returns workouts of a single user
// PUT      /users/:username/workouts/:workoutID        // update a workout
// DELETE   /users/:username/workouts/:workoutID        // delete a workout

router.get("/", users_controller.read_all);
router.post("/", users_controller.create_user);

router.get("/:username", users_controller.read_user);
router.put("/:username", users_controller.update_user);

router.use(
  "/:username/workouts",
  function (req, res, next) {
    req.username = req.params.username;
    next();
  },
  workout_route
);

router.use(
  "/:username/templates",
  function (req, res, next) {
    req.username = req.params.username;
    next();
  },
  template_route
);

module.exports = router;
