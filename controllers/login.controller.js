const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const saltRounds = 10;

exports.register = function (req, res) {
  // req.body: user, email, pwd
  // in the future we will check if the username/email is taken in real time
  // we will also validate input

  // Search to see if user already exists
  User.findOne({ user: req.body.user }, function (err, user) {
    if (err) {
      console.log(err);
    }
    var message;

    // If the user already exists
    if (user) {
      console.log("Username '" + req.body.user + "' is already taken.");
      res.send("Username '" + req.body.user + "' is already taken.");
      // Otherwise
    } else {
      // Generate a unique salt for the user
      bcrypt.genSalt(saltRounds, function (err, genSalt) {
        // Create the hash
        bcrypt.hash(req.body.pwd, 10, function (err1, hash) {
          // Build the user
          let user = new User({
            user: req.body.user,
            email: req.body.email,
            pwd: hash,
            salt: genSalt,
            type: "Member",
            workouts: [],
            prevex: [],
          });

          // Insert the user into the User collection
          user.save(function (err2, insUser) {
            if (err2) {
              console.log("User '" + req.body.user + "' could not be created.");
              res.send("User '" + req.body.user + "' could not be created.");
            } else {
              console.log("User '" + req.body.user + "' successfully created!");
              res.send("User '" + req.body.user + "' successfully created!");
            }
          });
        });
      });
    }
  });
};

// exports.login

exports.checkUser = function (req, res) {
  users.findOne({ user: req.body.user }, function (err, user) {
    if (err) {
      console.log(err);
    }
    var message;
    if (user) {
      message = "'" + user + "' already exists";
      console.log(message);
    } else {
      message = "user does not exist";
      console.log(message);
    }
    res.json({ message: message });
  });
};
