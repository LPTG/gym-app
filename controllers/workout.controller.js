const User = require("../models/user.model");
const Workout = require("../models/workout.model");

// Need user authentication later
// Takes user _id, new workout, and user auth token (later)
exports.workout_create = function (req, res) {
  console.log("Creating workout");
  let workout = new Workout({
    name: req.body.name,
    desc: req.body.desc,
    notes: req.body.notes,
    exercises: req.body.exercises,
  });

  workout.save(function (err, product) {
    if (err) {
      return next(err);
    }
    res.send(product);
  });
};
