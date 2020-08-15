const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Model for a single exercise
let ExerciseSchema = new Schema({
  _id: false,
  name: { type: String, required: true, maxlength: 40 },
  namePH: { type: String, maxlength: 40 },
  wsr: [
    {
      _id: false,
      weight: { type: Number, min: 1, max: 2000 },
      weightPH: { type: String, max: 15 },
      sets: { type: Number, min: 1, max: 20 },
      setsPH: { type: String, max: 15 },
      reps: { type: Number, min: 1, max: 100 },
      repsPH: { type: String, max: 15 },
    },
  ],
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
