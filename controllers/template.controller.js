const Template = require("../models/template.model");
const User = require("../models/user.model");

// Takes user _id and new template
exports.create_template = function (req, res) {
  // Check that we have all required data
  if (!req.body.template)
    return res.status(400).send({ error: "Template required in request body." });

  // See if user exists
  User.findOne({ username: req.user.username }, function (err, user) {
    if (err) return res.status(400).send({ error: "Error finding user." });

    if (!user) return res.status(400).send({ error: "User not found." });

    let template = new Template({
      name: req.body.template.name,
      desc: req.body.template.desc,
      notes: req.body.template.notes,
      exercises: req.body.template.exercises,
    });

    // Save template in Templates collection
    template.save(function (err, product) {
      if (err) return res.status(400).send({ error: "Template could not be created." });

      // Append template ref to end of templates array in Users collection
      user.update({ $push: { templates: product._id } }, function (err) {
        if (err) return res.status(400).send({ error: "Workout could not be created." });

        return res.status(201).send({});
      });
    });
  });
};

exports.read_templates = function (req, res) {
  // See if user exists
  User.findOne({ username: req.user.username }, function (err, templates) {
    if (err) return res.status(400).send({ error: "Could not read templates." });

    if (!templates) return res.status(400).send({ error: "User not found." });

    return res.status(200).send(templates);
  })
    .populate("templates")
    .select("templates -_id");
};

// Takes template _id
exports.read_template = function (req, res) {
  // Check if user has a template with given templateID
  if (!req.user.templates.includes(req.params.templateID))
    return res.status(403).send({ error: "Template not found in user templates." });

  Template.findById(req.params.templateID, function (err, template) {
    if (err) return res.status(400).send({ error: "Could not find template." });

    return res.status(200).send(template);
  });
};

// Takes template _id and update option
exports.update_template = function (req, res) {
  // Check if user has a template with given templateID
  if (!req.user.templates.includes(req.params.templateID))
    return res.status(403).send({ error: "Template not found in user templates." });

  // Check that we have all required data
  if (!req.body.update) return res.status(400).send({ error: "Update required in request body." });

  // See if template exists
  Template.findById(req.params.templateID, function (err, template) {
    if (err) return res.status(400).send({ error: "Could not update template." });

    if (!template) return res.status(400).send({ error: "Could not find template." });

    template.update(req.body.update, function (err) {
      if (err) return res.status(400).send({ error: "Could not update template." });

      return res.status(204).send({});
    });
  });
};

// Takes username and template _id
exports.delete_template = function (req, res) {
  if (!req.user.templates.includes(req.params.templateID))
    return res.status(403).send({ error: "Template not found in user templates." });

  // See if user exists and update it
  User.update(
    { username: req.user.username },
    { $pull: { templates: req.params.templateID } },
    function (err, res1) {
      if (err) return res.status(400).send("Unable to delete template.");

      if (!res1) return res.status(400).send({ error: "Could not find user." });

      // Delete template from Templates collection
      Template.findByIdAndDelete(req.params.templateID, function (err1, res2) {
        if (err1) return res.status(400).send({ error: "Unable to delete template." });

        if (!res2) return res.status(400).send({ error: "Could not find template." });

        return res.status(204).send({});
      });
    }
  );
};
