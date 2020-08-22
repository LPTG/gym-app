const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const saltRounds = 10;

exports.read_all = function (req, res) {
  User.find({}, function (err, res1) {
    if (err) return res.status(400).send({ error: "Could not find users" });

    return res.status(200).send(res1);
  }).select("type username email -_id");
};

exports.create_user = function (req, res) {
  if (!req.body.username || !req.body.email || !req.body.pwd)
    return res.status(400).send({ error: "Missing required data in request body." });

  // Search to see if user already exists
  User.findOne({ username: req.body.username }, "username", function (err, user) {
    if (err) return res.status(400).send({ error: "Error creating user." });

    if (req.body.pwd.length < 8) {
      // Further constrainsts needed (special chars, etc.)
      return res.status(400).send({ error: "Password needs to be at least 8 characters long." });
    }

    // If the user already exists
    if (user) {
      return res.status(400).send({ error: "Username is already taken." });
      // Otherwise
    } else {
      // Generate a unique salt for the user
      bcrypt.genSalt(saltRounds, function (err, genSalt) {
        // Create the hash
        bcrypt.hash(req.body.pwd, genSalt, function (err1, hash) {
          // Build the user
          let user = new User({
            username: req.body.username,
            email: req.body.email,
            pwd: hash,
            type: "Member",
            workouts: [],
            prevex: [],
          });

          // Insert the user into the User collection
          user.save(function (err2) {
            if (err2) {
              console.log(err2);
              return res.status(400).send("User could not be created.");
            }

            return res.status(201).send({});
          });
        });
      });
    }
  });
};

exports.read_user = function (req, res) {
  if (!(req.user.type === "Admin") && req.params.username !== req.user.username)
    return res.status(403).send({ error: "Only able to read self." });

  User.findOne({ username: req.params.username }, function (err, res1) {
    if (err) return res.status(400).send({ error: "Error finding user." });

    return res.status(200).send(res1);
  })
    .populate("workouts")
    .select("-pwd -_id");
};

exports.update_user = function (req, res) {
  // Need to update so that Admins can change any user
  if (req.params.username !== req.user.username)
    return res.status(403).send({ error: "Only able to update self." });

  if (!req.body.update) return res.status(400).send({ error: "Update required in request body." });

  // See if user exists
  User.findOne({ username: req.user.username }, function (err, res1) {
    res1.update(req.body.update, function (err) {
      if (err) return res.status(400).send({ error: "User could not be updated." });

      return res.status(204).send({});
    });
  });
};
