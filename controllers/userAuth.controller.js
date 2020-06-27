const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const saltRounds = 10;

// Takes username and password
// Returns status
exports.login = function (req, res) {
  // Check that we have all required data
  if (req.body.username && req.body.pwd) {
    User.findOne({ username: req.body.username }, "username pwd", function (err, user) {
      if (err) {
        console.log(err);
      }
      // If user exists
      if (user) {
        let userHash = user.pwd;

        // Compare stored user hash with newly inputted password
        bcrypt.compare(req.body.pwd, userHash, function (err1, same) {
          if (same) {
            res.send("Logged in as '" + user.username + "'!");
          } else {
            res.send("Incorrect username or password.");
          }
        });
        // If user does not exist
      } else {
        res.send("User not found.");
      }
    });
  } else {
    res.send("Missing required data.");
  }
};

// Possible problem: Internet was lagging and was testing register functionality... two users with same username were created
// Possible fix: Changed User schema to have unique username

// Takes username, email, and password
// Returns status
exports.register = async function (req, res) {
  // in the future we will check if the username/email is taken in real time
  // we will also validate input

  // Check that we have all required data
  if (req.body.username && req.body.email && req.body.pwd) {
    // Search to see if user already exists
    User.findOne({ username: req.body.username }, "username", function (err, user) {
      if (err) {
        console.log(err);
      }
      // If the user already exists
      if (user) {
        console.log("Username '" + user.username + "' is already taken.");
        res.send("Username '" + user.username + "' is already taken.");
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
                console.log("User '" + user.username + "' could not be created.");
                res.send("User '" + user.username + "' could not be created.");
              } else {
                console.log("User '" + user.username + "' successfully created!");
                res.send("User '" + user.username + "' successfully created!");
              }
            });
          });
        });
      }
    });
  } else {
    res.send("Missing required data.");
  }
};

// Requires authentication
// Takes user _id
// Returns status
exports.delete = function (req, res) {};

// Takes user _id and update option
// Returns update status
exports.update = function (req, res) {
  // Check that we have all required data
  if (req.body.userID && req.body.update) {
    // See if user exists
    User.findById(req.body.userID, function (err, res1) {
      res1.update(req.body.update, function (err) {
        if (err) {
          console.log(err);
          res.send("User could not be updated.");
        } else {
          res.send("User updated successfully!");
        }
      });
    });
  } else {
    res.send("Missing required data.");
  }
};

// exports.checkUser = function (req, res) {
//   User.findOne({ user: req.body.user }, function (err, user) {
//     if (err) {
//       console.log(err);
//     }
//     var message;
//     if (user) {
//       message = "'" + user + "' already exists";
//       console.log(message);
//     } else {
//       message = "user does not exist";
//       console.log(message);
//     }
//     res.json({ message: message });
//   });
// };
