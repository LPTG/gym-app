const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const saltRounds = 10;

exports.read_all = function (req, res) {
  User.find({}, function (err, res1) {
    if (err) throw err;

    res.send(res1);
  }).select("type username email -_id");
};

exports.create_user = function (req, res) {
  if (!req.body.username || !req.body.email || !req.body.pwd) {
    return res.send("Missing required data.");
  }
  // Search to see if user already exists
  User.findOne({ username: req.body.username }, "username", function (err, user) {
    if (err) {
      console.log(err);
    }

    if (req.body.pwd.length < 8) {
      // Further constrainsts needed (special chars, etc.)
      return res.send("Password must be at least 8 characters");
    }

    // If the user already exists
    if (user) {
      console.log("Username '" + user.username + "' is already taken.");
      res.send("Username '" + user.username + "' is already taken.");
      // Otherwise
    } else {
      // Generate a unique salt for the user
      bcrypt.genSalt(saltRounds, function (err, genSalt) {
        // Create the hash
        bcrypt.hash(req.body.pwd, genSalt, function (err1, hash) {
          // Build the user
          let user = new User({
            username: req.body.username,
            email: req.body.email,
            pwd: hash,
            type: "Member",
            workouts: [],
            prevex: [],
          });

          console.log(user);

          // Insert the user into the User collection
          user.save(function (err2) {
            if (err2) {
              console.log("User '" + user.username + "' could not be created.");
              res.send("User '" + user.username + "' could not be created.");
            } else {
              console.log("User '" + user.username + "' successfully created!");
              res.send("User '" + user.username + "' successfully created!");
            }
          });
        });
      });
    }
  });
};

exports.read_user = function (req, res) {
  User.findOne({ username: req.params.username }, function (err, res1) {
    if (err) throw err;

    res.send(res1);
  })
    .populate("workouts")
    .select("-pwd -_id");
};

exports.update_user = function (req, res) {
  if (!req.body.userID || !req.body.update) {
    res.send("Missing required data.");
  }
  // See if user exists
  User.findById(req.body.userID, function (err, res1) {
    res1.update(req.body.update, function (err) {
      if (err) {
        console.log(err);
        res.send("User could not be updated.");
      } else {
        res.send("User updated successfully!");
      }
    });
  });
};
