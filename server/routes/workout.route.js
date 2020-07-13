const express = require("express");
const router = express.Router();

const workout_controller = require("../controllers/workout.controller");

router.get("/", workout_controller.read_workouts);
router.post("/", workout_controller.create_workout);
router.get("/:workoutID", workout_controller.read_workout);
router.put("/:workoutID", workout_controller.update_workout);
router.delete("/:workoutID", workout_controller.delete_workout);

module.exports = router;
