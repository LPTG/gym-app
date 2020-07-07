const User = require("../models/user.model");
const Workout = require("../models/workout.model");

// Need user authentication later
// Takes user _id, new workout, and user auth token (later)
exports.workout_create = function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  //if (!req.session.userID) {
  //  res.redirect("/login");
  //}

  // Check that we have all required data
  if (req.body.userID && req.body.workout) {
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
      } else {
        res.send("User not found.");
      }
    });
  }
};

// Takes workout _id and update option
// Returns update status
exports.workout_update = function (req, res) {
  // Check that we have all required data
  if (req.body.workoutID && req.body.update) {
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
  } else {
    res.send("Missing required data.");
  }
};

// Takes user _id and workout _id
exports.workout_delete = function (req, res) {
  if (req.body.userID && req.body.workoutID) {
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
  } else {
    res.send("Missing required data.");
  }
};

exports.workout_read = function (req, res) {};

exports.workout_read_by_user = function (req, res, username) {
  User.findOne(username);
};
