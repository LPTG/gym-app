const express = require("express");
const router = express.Router();
const workout_controller = require("../controllers/workout.controller");

// GET      /users/:username/workouts                   // returns workouts of a single user
// POST     /users/:username/workouts                   // create a new workout for a user
// GET      /users/:username/workouts/:workoutID        // returns workouts of a single user
// PUT      /users/:username/workouts/:workoutID        // update a workout
// DELETE   /users/:username/workouts/:workoutID        // delete a workout

router.get("/", workout_controller.read_workouts);
router.post("/", workout_controller.create_workout);
router.get("/:workoutID", workout_controller.read_workout);
router.put("/:workoutID", workout_controller.update_workout);
router.delete("/:workoutID", workout_controller.delete_workout);

module.exports = router;
