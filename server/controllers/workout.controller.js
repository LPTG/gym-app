const User = require("../models/user.model");
const Workout = require("../models/workout.model");

// // Need user authentication later
// // Takes user _id, new workout, and user auth token (later)
// exports.workout_create = function (req, res) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   //if (!req.session.userID) {
//   //  res.redirect("/login");
//   //}

//   // Check that we have all required data
//   if (!req.body.userID || !req.body.workout) {
//     res.send("Missing required data.");
//   }
//   // See if user exists
//   User.findById(req.body.userID, function (err, user) {
//     if (err) return err;

//     if (user) {
//       let workout = new Workout({
//         name: req.body.workout.name,
//         desc: req.body.workout.desc,
//         notes: req.body.workout.notes,
//         exercises: req.body.workout.exercises,
//       });

//       // Save workout in Workouts collection
//       workout.save(function (err, product) {
//         if (err) {
//           // how should we handle errors?
//           res.send("Workout could not be created. " + err);
//         } else {
//           // Append workout ref to end of workouts array in Users collection
//           user.update({ $push: { workouts: product._id } }, function (err) {
//             if (err) {
//               res.send("Workout could not be created.");
//             } else {
//               res.send("Workout added successfully!");
//             }
//           });
//         }
//       });
//     } else {
//       res.send("User not found.");
//     }
//   });
// };

// // Takes workout _id and update option
// exports.workout_update = function (req, res) {
//   // Check that we have all required data
//   if (!req.body.workoutID || !req.body.update) {
//     return res.send("Missing required data.");
//   }
//   // See if workout exists
//   Workout.findById(req.body.workoutID, function (err, workout) {
//     if (err) {
//       return res.send("Could not update workout.");
//     }

//     workout.update(req.body.update, function (err) {
//       if (err) {
//         res.send("Workout could not be updated.");
//       } else {
//         res.send("Workout updated successfully!");
//       }
//     });
//   });
// };

// // Takes user _id and workout _id
// exports.workout_delete = function (req, res) {
//   if (!req.body.userID || !req.body.workoutID) {
//     return res.send("Missing required data.");
//   }
//   // See if user exists and update it
//   User.update({ _id: req.body.userID }, { $pull: { workouts: req.body.workoutID } }, function (
//     err,
//     res1
//   ) {
//     if (err) {
//       return res.send("Unable to delete workout.");
//     }

//     // Delete workout from Workouts collection
//     Workout.findByIdAndDelete(req.body.workoutID, function (err1, res2) {
//       if (err1) {
//         res.send("Invalid workout id.");
//       } else {
//         res.send("Workout deleted successfully!");
//       }
//     });
//   });
// };

exports.read_workouts = function (req, res) {
  User.findOne({ username: req.username }, function (err, workouts) {
    if (err) {
      return res.send("Could not read workouts.");
    }

    if (!workouts) {
      return res.send("Could not find user.");
    }

    res.send(workouts);
  })
    .populate("workouts")
    .select("workouts -_id");
};

exports.create_workout = function (req, res) {
  if (!req.username || !req.body.workout) {
    res.send("User not found.");
  }

  // See if user exists
  // TODO: Is it better to search by _id than username? probably
  User.findOne({ username: req.username }, function (err, user) {
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
  console.log(req.params.workoutID);
  User.findOne({ username: req.username }, function (err, user) {
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
  if (!req.username || !req.params.workoutID || !req.body.update) {
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
  if (!req.username || !req.params.workoutID) {
    res.send("Missing required data.");
  }
  // See if user exists and update it
  User.update({ username: req.username }, { $pull: { workouts: req.params.workoutID } }, function (
    err,
    res1
  ) {
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
  });
};
