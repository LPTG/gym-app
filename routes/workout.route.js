const express = require("express");
const router = express.Router();

const workout_controller = require("../controllers/workout.controller");

router.get("/test", workout_controller.test);

router.post("/create", workout_controller.workout_create);

module.exports = router;
