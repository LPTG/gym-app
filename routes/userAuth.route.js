const express = require("express");
const router = express.Router();

const userAuth_controller = require("../controllers/userAuth.controller");

// Need to check rest api naming standards
router.post("/login", userAuth_controller.login);
router.post("/register", userAuth_controller.register);
router.post("/update", userAuth_controller.update);

module.exports = router;
