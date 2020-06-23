const express = require("express");
const router = express.Router();

const workout = require("./workout.route");
const userAuth = require("./userAuth.route");

router.use("/workout", workout);
router.use("/", userAuth);

module.exports = router;
