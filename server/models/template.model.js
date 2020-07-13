const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ExerciseTemplateSchema = require("./exercise.template.model");

// Model for an entire workout
let TemplateSchema = new Schema({
  name: { type: String, required: true, maxlength: 40 },
  desc: { type: String, maxlength: 100 },
  notes: { type: String, maxlength: 350 },
  exercises: [ExerciseTemplateSchema.schema],
});

// Template Example

// {
//   "template":
//       {
//           "name": "Upper Body Day",
//           "desc": "Upper back and upper chest targeting",
//           "notes": "Any notes here",
//           "exercises" : [
//               {
//                   "name": "Benchpress",
//                   "wsr": [
//                       {
//                           "weight": "135",
//                           "sets": "2-3",
//                           "reps": "8-12"
//                       }
//                   ]
//               },
//               {
//                   "name": "Lat Pulldowns",
//                   "wsr": [
//                       {
//                           "weight": "140",
//                           "sets": "2",
//                           "reps": "8-12"
//                       }
//                   ]
//               },
//               {
//                   "name": "Shoulder Press",
//                   "wsr": [
//                       {
//                           "weight": "45",
//                           "sets": "3-4",
//                           "reps": "8-10"
//                       }
//                   ]
//               }
//           ]
//       }
// }

module.exports = mongoose.model("Template", TemplateSchema, "templates");
