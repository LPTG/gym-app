const express = require("express");
const router = express.Router();

const userAuth_controller = require("../controllers/userAuth.controller");

router.post("/login", userAuth_controller.login);
router.post("/register", userAuth_controller.register);

module.exports = router;
