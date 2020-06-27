const express = require("express");
const router = express.Router();

const workout_controller = require("../controllers/workout.controller");

router.post("/create", workout_controller.workout_create);
router.post("/update", workout_controller.workout_update);
router.post("/delete", workout_controller.workout_delete);

module.exports = router;
