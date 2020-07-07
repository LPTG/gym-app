const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Workout = require("../models/workout.model");

const saltRounds = 10;

exports.read_all = function (req, res) {};

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

exports.read_user = function (req, res) {};

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

exports.read_workouts = function (req, res) {};

exports.create_workout = function (req, res) {
  if (!req.body.userID || !req.body.workout) {
    res.send("User not found.");
  }

  // See if user exists
  User.findById(req.body.userID, function (err, res1) {
    if (err) return err;

    if (res1) {
      let workout = new Workout({
        name: req.body.workout.name,
        desc: req.body.workout.desc,
        notes: req.body.workout.notes,
        exercises: req.body.workout.exercises,
      });
      console.log(workout);

      // Save workout in Workouts collection
      workout.save(function (err, product) {
        if (err) {
          console.log(err); // how should we handle errors?
          res.send("Workout could not be created. " + err);
        } else {
          // Append workout ref to end of workouts array in Users collection
          res1.update({ $push: { workouts: product._id } }, function (err) {
            if (err) {
              console.log(err);
              res.send("Workout could not be created.");
            } else {
              res.send("Workout added successfully!");
            }
          });
        }
      });
    }
  });
};

exports.read_workout = function (req, res) {};

// Takes workout _id and update option
exports.update_workout = function (req, res) {
  // Check that we have all required data
  if (!req.body.workoutID || !req.body.update) {
    res.send("Missing required data.");
  }
  // See if user exists
  Workout.findById(req.body.workoutID, function (err, res1) {
    if (err) {
      res.send("Could not update workout.");
    } else {
      res1.update(req.body.update, function (err) {
        if (err) {
          console.log(err);
          res.send("Workout could not be updated.");
        } else {
          res.send("Workout updated successfully!");
        }
      });
    }
  });
};

// Takes user _id and workout _id
exports.delete_workout = function (req, res) {
  if (!req.body.userID || !req.body.workoutID) {
    res.send("Missing required data.");
  }
  // See if user exists and update it
  User.update({ _id: req.body.userID }, { $pull: { workouts: req.body.workoutID } }, function (
    err,
    res1
  ) {
    if (err) {
      res.send("Unable to delete workout.");
    } else {
      // Delete workout from Workouts collection
      Workout.findByIdAndDelete(req.body.workoutID, function (err1, res2) {
        if (err1) {
          res.send("Invalid workout id.");
        } else {
          res.send("Workout deleted successfully!");
        }
      });
    }
  });
};
