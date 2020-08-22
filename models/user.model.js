const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Workout = require("./workout.model");
const Template = require("../models/template.model");

function emailValidator(email) {
  const regex = /^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/;
  return regex.test(email);
}

// Need to validate username length / regex

// Model for a single user
let UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15,
    unique: true, // Note: this does not insure that duplicates are not inserted
    index: true,
  },
  email: {
    type: String,
    required: true,
    //validate: emailValidator,
    maxlength: 320,
    unique: true,
  },
  pwd: { type: String, required: true },
  type: { type: String, enumValues: ["Member", "Admin"], default: "Member", required: true },
  workouts: [{ type: Schema.Types.ObjectId, ref: "Workout" }],
  templates: [{ type: Schema.Types.ObjectId, ref: "Template" }],
  prevex: [{ type: String }], // Need to add exercise title here on new exercise creation
});

// Middleware
// Need to delete all referenced workouts?

module.exports = mongoose.model("User", UserSchema, "users");
