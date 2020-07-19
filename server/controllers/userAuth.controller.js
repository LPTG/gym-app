const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const passport = require("passport");
const saltRounds = 10;
//require("../passport/setup");

exports.loginForm = function (req, res) {
  if (req.session.userID) {
    console.log("Already logged in as " + req.session.userID);
    res.send("Already logged in as " + req.session.userID);
  } else {
    res.redirect("http://localhost:3000/login");
  }
};

// Takes username and password
// Returns status
exports.login = function (req, res, err, user, info, next) {
  if (err) {
    return next(err);
  }

  // If user does not exist
  if (!user) {
    return res.json(info);
  }

  // Log user in
  req.logIn(user, function (err1) {
    if (err1) {
      return next(err1);
    }

    return res.json(info);
  });
  // if (!req.body.username) {
  //   return res.status(200).json({ errors: "No user found" });
  // } else {
  //   console.log("redirecting");
  //   return res.status(200).json({ success: `logged in as ${user.username}` });
  // }
};

exports.logout = function (req, res) {
  if (req.user) {
    req.logout();
    res.send({ message: "Logged out" });
  } else {
    res.send({ message: "Already logged out" });
  }
};
// // Check that we have all required data
// if (req.body.username && req.body.pwd) {
//   User.findOne({ username: req.body.username }, function (err, user) {
//     if (err) {
//       console.log(err);
//     }
//     // If user exists
//     if (user) {
//       let userHash = user.pwd;

//       // Compare stored user hash with newly inputted password
//       bcrypt.compare(req.body.pwd, userHash, function (err1, same) {
//         if (same) {
//           //req.session.username = user.username;
//           //req.session.userID = user._id;
//           res.status(200).send("'message': 'Success', 'user':" + user);
//         } else {
//           res.status(200).send("{'message': 'Incorrect information'}");
//         }
//       });
//       // If user does not exist
//     } else {
//       res.status(200).send("{'message': 'User not found'}");
//     }
//   });
// } else {
//   res.status(200).send("{'message': 'Missing data'}");
// }

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

      if (req.body.pwd.length < 8) {
        // Further constrainsts needed (special chars, etc.)
        return res.send("Password must be at least 8 characters");
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

            console.log(user);

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
