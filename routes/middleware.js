// If not logged in then we redirect to login page
exports.redirectLogin = (req, res, next) => {
  console.log("Checking for current session");
  if (!req.session.userID) {
    res.redirect("/login");
  } else {
    next();
  }
};

// If logged in then we redirect to workout list page
exports.redirectHome = (req, res, next) => {
  console.log("Checking for current session");
  if (req.session.userID) {
    res.redirect("http://localhost:3000/workoutlist");
  } else {
    next();
  }
};
