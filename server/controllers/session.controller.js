exports.create_session = function (req, res, err, user, info) {
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

    safeUser = {
      type: req.user.type,
      workouts: req.user.workouts,
      templates: req.user.templates,
      prevex: req.user.prevex,
      username: req.user.username,
      email: req.user.email,
    };
    // May only need to send username
    return res.json({ loggedIn: true, user: safeUser });
  });
};

exports.destroy_session = function (req, res) {
  if (req.user) {
    req.logout();
  }

  res.json({ message: "Logged out" });
};

exports.check_session = function (req, res) {
  if (req.user) {
    safeUser = {
      type: req.user.type,
      workouts: req.user.workouts,
      templates: req.user.templates,
      prevex: req.user.prevex,
      username: req.user.username,
      email: req.user.email,
    };

    return res.json({ loggedIn: true, user: safeUser });
  }

  return res.json({ loggedIn: false });
};
