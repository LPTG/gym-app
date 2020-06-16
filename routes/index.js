const express = require("express");
const router = express.Router();

const workout = require("./workout.route");
const login = require("./login.route");

router.use("/workout", workout);
router.use("/login", login);

module.exports = router;
