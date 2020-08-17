const express = require("express");
const router = express.Router();

const session = require("./session.route");
const users = require("./users.route");

// API routes

// GET      /session/new                    // returns login page
// POST     /session                        // log user in
// DELETE   /session                        // log user out
// GET      /users                          // returns a list of all users
// POST     /users                          // create a new user
// GET      /users/:username              // returns information on single user
// PUT      /users/:username              // update a single user
// GET      /users/:username/workouts     // returns workouts of a single user
// POST     /users/:username/workouts     // create a new workout for a user

router.use("/session", session);
router.use(
  "/users",
  function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
      // req.isAuthenticated() will return true if user is logged in
      next();
    } else {
      return res.status(401).send({ error: "Authentication required" });
    }
  },
  users
);

module.exports = router;
