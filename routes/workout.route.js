const express = require("express");
const router = express.Router();

const workout_controller = require("../controllers/workout.controller");

router.post("/create", workout_controller.workout_create);

module.exports = router;
