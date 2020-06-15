const Workout = require("../models/workout.model");

exports.test = function (req, res) {
  res.send("Greetings from the test controller!");
};

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
