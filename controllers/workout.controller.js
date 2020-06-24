const User = require("../models/user.model");
const Workout = require("../models/workout.model");

// Need user authentication later
// Takes user _id, new workout, and user auth token (later)
exports.workout_create = function (req, res) {
  // Need to test if this works since adding user ref updating <---------
  // Check that we have all required data
  if (req.body.userID && req.body.workout) {
    // validate that we have a valid workout?

    // See if user exists
    User.findById(req.body.userID, function (err, res1) {
      if (err) return err;

      if (res1) {
        let workout = new Workout({
          name: req.body.name,
          desc: req.body.desc,
          notes: req.body.notes,
          exercises: req.body.exercises,
        });

        // Save workout in Workouts collection
        workout.save(function (err, product) {
          if (err) {
            return next(err); // how should we handle errors?
          }

          // Append workout ref to end of workouts array in Users collection
          res1.update({ $push: { workouts: product._id } }, function (err) {
            if (err) {
              console.log(err);
              res.send("Workout could not be created.");
            } else {
              res.send("Workout added successfully!");
            }
          });
        });
      } else {
        res.send("User not found.");
      }
    });
  }
};
