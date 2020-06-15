const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ExerciseSchema = require("../models/exercise.model");

// Model for an entire workout
let WorkoutSchema = new Schema({
  name: { type: String, required: true, maxlength: 40 },
  desc: { type: String, maxlength: 100 },
  notes: { type: String, maxlength: 350 },
  exercises: [
    {
      name: { type: String, required: true, maxlength: 40 },
      wsr: [ExerciseSchema.schema],
    },
  ],
});

module.exports = mongoose.model("Workout", WorkoutSchema);
