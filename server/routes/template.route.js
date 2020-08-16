const router = require("express").Router();
const template_controller = require("../controllers/template.controller");

// GET      /users/:username/templates                   // returns templates of a single user
// POST     /users/:username/templates                   // create a new template for a user
// GET      /users/:username/templates/:workoutID        // returns templates of a single user
// PUT      /users/:username/templates/:workoutID        // update a template
// DELETE   /users/:username/templates/:workoutID        // delete a template

router.get("/", template_controller.read_templates);
router.post("/", template_controller.create_template);
router.get("/:templateID", template_controller.read_template);
router.put("/:templateID", template_controller.update_template);
router.delete("/:templateID", template_controller.delete_template);

module.exports = router;
