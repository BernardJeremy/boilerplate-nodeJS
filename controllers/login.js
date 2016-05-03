exports.loginOk = function (req, res) {
  req.flash('flash', 'Connected.');
  var redirectTo = req.session.returnTo ? req.session.returnTo : '/';
  delete req.session.returnTo;
  res.redirect(redirectTo);

};

exports.loginFail = function (req, res) {
  req.flash('flash', 'Login or password denied!');
  req.session.save(function () {
    res.redirect('/');
  });
};

exports.loginNeeded = function (req, res) {
  req.flash('flash', 'You have to be connected!');
  req.session.save(function () {
    res.redirect('/');
  });
};

exports.loginView = function (req, res) {
  res.render('pages/login');
};

exports.logout = function (req, res) {
  req.logout();
  req.flash('flash', 'You have been disconnected');
  req.session.save(function () {
    res.redirect('/');
  });
};
