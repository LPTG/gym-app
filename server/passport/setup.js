const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

passport.serializeUser((user, done) => {
  console.log("Serializing user " + user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("Deserializing user " + id);
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy({ usernameField: "username" }, (username, password, done) => {
    User.findOne({ username: username })
      .then((user) => {
        // User does not exist
        if (!user) {
          return done(null, false, { error: "Incorrect username or password." });
        } else {
          // Compare stored user hash with newly inputted password
          bcrypt.compare(password, user.pwd, function (err1, same) {
            if (err1) {
              return done(null, false, { error: "Incorrect username or password." });
            }

            if (same) {
              return done(null, user);
            } else {
              return done(null, false, { error: "Incorrect username or password." });
            }
          });
        }
      })
      .catch((err) => {
        return done(null, false, { error: err });
      });
  })
);
