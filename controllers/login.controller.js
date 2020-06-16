const UserSchema = require("../models/user.model");

exports.register = function (req, res) {
  // req.body: user, email, pwd
  // in the future we will check if the username/email is taken in real time
  // we will also validate input
};

exports.checkUser = function (req, res) {
  users.findOne({ user: req.query.user }, function (err, user) {
    if (err) {
      console.log(err);
    }
    var message;
    if (user) {
      message = "'" + user + "' already exists";
      console.log(message);
    } else {
      message = "user does not exist";
      console.log(message);
    }
    res.json({ message: message });
  });
};
