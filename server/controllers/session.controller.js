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

    return res.json({ message: "Logged in" });
  });
};

exports.destroy_session = function (req, res) {
  if (req.user) {
    req.logout();
  }

  res.json({ message: "Logged out" });
};
