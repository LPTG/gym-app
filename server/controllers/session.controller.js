exports.create_session = function (req, res, err, user, info) {
  if (err) return next(err);

  // If user does not exist
  if (!user) return res.status(400).send(info);

  // Log user in
  req.logIn(user, function (err1) {
    if (err1) return next(err1);

    return res.status(200).send({ loggedIn: true, user: req.user.username });
  });
};

exports.destroy_session = function (req, res) {
  if (req.user) req.logout();

  return res.status(204).send({});
};

exports.check_session = function (req, res) {
  if (req.user) return res.status(200).send({ loggedIn: true, user: req.user.username });

  return res.status(200).send({ loggedIn: false });
};
