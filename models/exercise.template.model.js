const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Model for a single exercise
let ExerciseTemplateSchema = new Schema({
  _id: false,
  name: { type: String, required: true, maxlength: 40 },
  wsr: [
    {
      _id: false,
      weight: { type: String, maxlength: 15 },
      sets: { type: String, maxlength: 15 },
      reps: { type: String, maxlength: 15 },
    },
  ],
});

module.exports = mongoose.model("ExerciseTemplate", ExerciseTemplateSchema);
