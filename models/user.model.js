const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const WorkoutSchema = require("../models/workout.model");

// Model for a single user
let UserSchema = new Schema({
  user: { type: String, required: true, minlength: 2, maxlength: 15 },
  email: { type: String, required: true, maxlength: 320 },
  pwd: { type: String, required: true },
  salt: { type: String, required: true },
  type: { type: String, required: true },
  workouts: [WorkoutSchema.schema],
  prevex: [{ type: String }], // Need to add exercise title here on new exercise creation
});

module.exports = mongoose.model("User", UserSchema, "users");
