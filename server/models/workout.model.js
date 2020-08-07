const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ExerciseSchema = require("./exercise.model");

// Model for an entire workout
let WorkoutSchema = new Schema({
  name: { type: String, required: true, maxlength: 40 },
  desc: { type: String, maxlength: 200 },
  notes: { type: String, maxlength: 350 },
  exercises: [ExerciseSchema.schema],
});

// Middleware

// Workout Example
// name: Day 1 Max,
// desc: Squat max day,
// notes: Aim for 1-4 reps, multiply weight by 1.03 for 2 rep, 1.06 for 3 reps, and 1.09 for 4 reps to find new max
// exercises:
//    [
//      {
//        name: Squat,
//        wsr: [{weight: 290, sets: 1, reps: 4}] // Plan to support range of numbers in the future
//      },
//      {
//        name: Deadlift,
//        wsr: [{weight: 285, sets: 1, reps: 4}, {weight: 295, sets: 1, reps: 4}, {weight: 305, sets: 1, reps: 2}]
//      },
//      {
//        name: Optional Lower Body,
//        wsr: [{sets: 3}]
//      },
//      {
//        name: Optional Lower Body,
//        wsr: [{sets: 3}]
//      }
//    ]

module.exports = mongoose.model("Workout", WorkoutSchema, "workouts");
