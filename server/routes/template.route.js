const router = require("express").Router();

const template_controller = require("../controllers/template.controller");

router.post("/", template_controller.create_template);
router.get("/", template_controller.read_templates);
router.get("/:templateID", template_controller.read_template);
router.put("/:templateID", template_controller.update_template);
router.delete("/:templateID", template_controller.delete_template);

module.exports = router;
