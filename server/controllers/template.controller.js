const Template = require("../models/template.model");
const User = require("../models/user.model");

// TODO: Check if template is in user's templates list before modifying/reading them

// Takes user _id and new template
exports.create_template = function (req, res) {
  // Check that we have all required data
  if (!req.username || !req.body.template) {
    return res.send("Missing required data.");
  }

  // See if user exists
  User.findOne({ username: req.username }, function (err, user) {
    if (err) return err;

    if (!user) {
      return res.send("User not found.");
    }

    let template = new Template({
      name: req.body.template.name,
      desc: req.body.template.desc,
      notes: req.body.template.notes,
      exercises: req.body.template.exercises,
    });

    // Save template in Templates collection
    template.save(function (err, product) {
      if (err) {
        // how should we handle errors?
        return res.send("Template could not be created. " + err);
      }
      // Append template ref to end of templates array in Users collection
      user.update({ $push: { templates: product._id } }, function (err) {
        if (err) {
          res.send("Template could not be created.");
        } else {
          res.send("Template added successfully!");
        }
      });
    });
  });
};

// Need to check if templateID is in user templates array
// Takes template _id and update option
exports.read_template = function (req, res) {
  console.log("looking for template");
  Template.findById(req.params.templateID, function (err, template) {
    if (err) {
      return res.send("Could not find template.");
    }

    res.send(template);
  });
};

exports.read_templates = function (req, res) {
  if (!req.username) {
    return res.send("Missing required data.");
  }

  // See if user exists
  User.findOne({ username: req.username }, function (err, templates) {
    if (err) return err;

    if (!templates) {
      return res.send("User not found.");
    }

    res.send(templates);
  })
    .populate("templates")
    .select("templates -_id");
};

// Takes template _id and update option
exports.update_template = function (req, res) {
  // Check that we have all required data
  if (!req.params.templateID || !req.body.update) {
    return res.send("Missing required data.");
  }

  console.log(req.params.templateID);

  // See if template exists
  Template.findById(req.params.templateID, function (err, template) {
    if (err) {
      return res.send("Could not update template.");
    }

    if (!template) {
      return res.send("Could not find template.");
    }

    template.update(req.body.update, function (err) {
      if (err) {
        res.send("Template could not be updated.");
      } else {
        res.send("Template updated successfully!");
      }
    });
  });
};

// Takes username and template _id
exports.delete_template = function (req, res) {
  if (!req.username || !req.params.templateID) {
    return res.send("Missing required data.");
  }
  // See if user exists and update it
  User.update(
    { username: req.username },
    { $pull: { templates: req.params.templateID } },
    function (err, res1) {
      if (err) {
        return res.send("Could not update template.");
      }

      if (!res1) {
        return res.send("Could not find user.");
      }

      // Delete template from Templates collection
      Template.findByIdAndDelete(req.params.templateID, function (err1, res2) {
        if (err1) {
          return res.send("Could not delete template.");
        }

        if (!res2) {
          return res.send("Template not found.");
        }

        res.send("Template deleted successfully!");
      });
    }
  );
};
