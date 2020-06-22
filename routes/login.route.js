const express = require("express");
const router = express.Router();

const login_controller = require("../controllers/login.controller");

router.post("/", login_controller.register);
router.get("/checkuser", login_controller.checkUser);

module.exports = router;
