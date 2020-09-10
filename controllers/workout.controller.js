const User = require("../models/user.model");
const Workout = require("../models/workout.model");

// Takes username and new workout
exports.create_workout = function (req, res) {
  if (!(req.user.type === "Admin") && req.params.username !== req.user.username)
    return res.status(403).send({ error: "Only able to read self." });

  // Check that we have all required data
  if (!req.body.workout)
    return res.status(400).send({ error: "Workout required in request body." });

  // See if user exists
  User.findOne({ username: req.user.username }, function (err, user) {
    if (err) return res.status(400).send({ error: "Error finding user." });

    if (!user) return res.status(400).send({ error: "User not found." });

    let workout = new Workout({
      name: req.body.workout.name,
      desc: req.body.workout.desc,
      notes: req.body.workout.notes,
      exercises: req.body.workout.exercises,
    });

    // Save workout in Workouts collection
    workout.save(function (err, product) {
      if (err) return res.status(400).send({ error: "Workout could not be created." });

      // Append workout ref to end of workouts array in Users collection
      user.update({ $push: { workouts: product._id } }, function (err1) {
        if (err1) return res.status(400).send({ error: "Workout could not be created." });

        return res.status(201).send({});
      });
    });
  });
};

exports.read_workouts = function (req, res) {
  if (!(req.user.type === "Admin") && req.params.username !== req.user.username)
    return res.status(403).send({ error: "Only able to read self." });

  // See if user exists
  User.findOne({ username: req.user.username }, function (err, workouts) {
    if (err) return res.status(400).send({ error: "Could not read workouts." });

    if (!workouts) return res.status(400).send({ error: "User not found." });

    return res.status(200).send(workouts);
  })
    .populate("workouts")
    .select("workouts -_id");
};

// Takes workout _id
exports.read_workout = function (req, res) {
  if (!(req.user.type === "Admin") && req.params.username !== req.user.username)
    return res.status(403).send({ error: "Only able to read self." });

  // Check if user has a workout with given workoutID
  if (!req.user.workouts.includes(req.params.workoutID))
    return res.status(403).send({ error: "Workout not found in user workouts." });

  Workout.findById(req.params.workoutID, function (err1, workout) {
    if (err1) return res.status(400).send({ error: "Could not find workout." });

    return res.status(200).send(workout);
  });
};

// Takes workout _id and update option
exports.update_workout = function (req, res) {
  if (!(req.user.type === "Admin") && req.params.username !== req.user.username)
    return res.status(403).send({ error: "Only able to update self." });

  // Check if user has a workout with given workoutID
  if (!req.user.workouts.includes(req.params.workoutID))
    return res.status(403).send({ error: "Workout not found in user workouts." });

  // Check that we have all required data
  if (!req.body.update) return res.status(400).send({ error: "Update required in request body." });

  // See if workout exists
  Workout.findById(req.params.workoutID, function (err, workout) {
    if (err) return res.status(400).send({ error: "Could not update workout." });

    if (!workout) return res.status(400).send({ error: "Could not find workout." });

    workout.update(req.body.update, function (err) {
      if (err) return res.status(400).send({ error: "Could not update workout." });

      return res.status(204).send({});
    });
  });
};

// Takes user _id and workout _id
exports.delete_workout = function (req, res) {
  if (!(req.user.type === "Admin") && req.params.username !== req.user.username)
    return res.status(403).send({ error: "Only able to modify self." });

  if (!req.user.workouts.includes(req.params.workoutID))
    return res.status(403).send({ error: "Workout not found in user workouts." });

  // See if user exists and update it
  User.update(
    { username: req.user.username },
    { $pull: { workouts: req.params.workoutID } },
    function (err, res1) {
      if (err) return res.status(400).send({ error: "Unable to delete workout." });

      if (!res1) return res.status(400).send({ error: "Could not find user." });

      // Delete workout from Workouts collection
      Workout.findByIdAndDelete(req.params.workoutID, function (err1, res2) {
        if (err1) return res.status(400).send({ error: "Unable to delete workout." });

        if (!res2) return res.status(400).send({ error: "Could not find workout." });

        return res.status(204).send({});
      });
    }
  );
};
