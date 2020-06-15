const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Model for a single exercise
let ExerciseSchema = new Schema({
  name: { type: String, required: true, maxlength: 40 },
  wsr: [
    {
      weight: { type: Number, min: 1, max: 2000 },
      sets: { type: Number, min: 1, max: 20 },
      reps: { type: Number, min: 1, max: 100 },
    },
  ],
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
