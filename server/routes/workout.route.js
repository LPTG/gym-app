const express = require("express");
const router = express.Router();
const { redirectLogin } = require("./middleware.js");

const workout_controller = require("../controllers/workout.controller");

router.get("/", (req, res) => {
  res.redirect("http://localhost:3000/workoutlist");
});

router.get("/create", (req, res) => {
  res.redirect("http://localhost:3000/workouts");
});

router.post("/create", workout_controller.workout_create);
router.get("user");
router.post("/update", workout_controller.workout_update);
router.post("/delete", workout_controller.workout_delete);

module.exports = router;
