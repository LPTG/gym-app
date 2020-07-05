const express = require("express");
const router = express.Router();
const { redirectHome } = require("./middleware.js");

const userAuth_controller = require("../controllers/userAuth.controller");

// Need to check rest api naming standards
// router.get("/", (req, res) => {
//   console.log("Inside home page callback function");
//   console.log(req.sessionID);
//   if (req.session.name) {
//     res.send("<h1>Welcome " + req.session.name + "<h1>");
//   } else {
//     //req.session.name = "Lukas";
//     res.send("<h1>Welcome " + req.session.name + "<h1>");
//   }
// });

router.get("/login", redirectHome, userAuth_controller.loginForm);
router.post("/login", redirectHome, userAuth_controller.login);
router.post("/register", redirectHome, userAuth_controller.register);
router.post("/update", redirectHome, userAuth_controller.update);

module.exports = router;
