const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Workout = require("../models/workout.model");

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

exports.read_workouts = function (req, res) {
  User.findOne({ username: req.params.username }, function (err, workouts) {
    if (err) throw err;

    res.send(workouts);
  })
    .populate("workouts")
    .select("workouts -_id");
};

exports.create_workout = function (req, res) {
  if (!req.params.username || !req.body.workout) {
    res.send("User not found.");
  }

  // See if user exists
  // TODO: Is it better to search by _id than username? probably
  User.findOne({ username: req.params.username }, function (err, user) {
    if (err) return err;

    if (!user) {
      res.send("Workout could not be created.");
    }

    let workout = new Workout({
      name: req.body.workout.name,
      desc: req.body.workout.desc,
      notes: req.body.workout.notes,
      exercises: req.body.workout.exercises,
    });

    // Save workout in Workouts collection
    workout.save(function (err, product) {
      if (err) {
        res.send("Workout could not be created.");
      } else {
        // Append workout ref to end of workouts array in Users collection
        user.update({ $push: { workouts: product._id } }, function (err1) {
          if (err1) {
            res.send("Workout could not be created.");
          } else {
            res.send("Workout added successfully!");
          }
        });
      }
    });
  });
};

exports.read_workout = function (req, res) {
  User.findOne({ username: req.params.username }, function (err, user) {
    if (err) throw err;

    let workoutID = user.workouts.find((workout) => workout == req.params.workoutID);
    Workout.findById(workoutID, function (err1, workout) {
      if (err1) throw err1;

      res.send(workout);
    }).select("-_id");
  });
};

// Takes workout _id and update option
exports.update_workout = function (req, res) {
  // Check that we have all required data
  // TODO: Is this even necessary for url params? probably not
  if (!req.params.username || !req.params.workoutID || !req.body.update) {
    res.send("Missing required data.");
  }
  // See if user exists
  Workout.findById(req.params.workoutID, function (err, workout) {
    if (err) {
      res.send("Could not update workout.");
    } else {
      workout.update(req.body.update, function (err) {
        if (err) {
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
  if (!req.params.username || !req.params.workoutID) {
    res.send("Missing required data.");
  }
  // See if user exists and update it
  User.update(
    { username: req.params.username },
    { $pull: { workouts: req.params.workoutID } },
    function (err, res1) {
      if (err) {
        res.send("Unable to delete workout.");
      } else {
        // Delete workout from Workouts collection
        Workout.findByIdAndDelete(req.params.workoutID, function (err1, res2) {
          if (err1) {
            res.send("Unable to delete workout.");
          } else {
            res.send("Workout deleted successfully!");
          }
        });
      }
    }
  );
};
