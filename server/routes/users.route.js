const router = require("express").Router();
const users_controller = require("../controllers/users.controller");

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

router.get("/:username/workouts", users_controller.read_workouts);
router.post("/:username/workouts", users_controller.create_workout);
router.get("/:username/workouts/:workoutID", users_controller.read_workout);
router.put("/:username/workouts/:workoutID", users_controller.update_workout);
router.delete("/:username/workouts/:workoutID", users_controller.delete_workout);

module.exports = router;
