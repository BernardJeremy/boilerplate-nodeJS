exports.loginOk = function (req, res) {
  req.flash('flash', 'Vous êtes connecté.');
  var redirectTo = req.session.returnTo ? req.session.returnTo : '/home';
  delete req.session.returnTo;
  res.redirect(redirectTo);

};

exports.loginFail = function (req, res) {
  req.flash('flash', 'Nom d\'utilisateur ou mot de passe incorrecte !');
  res.redirect('/');
};

exports.loginNeeded = function (req, res) {
  req.flash('flash', 'Vous devez être connecté !');
  res.redirect('/');
};

exports.loginView = function (req, res) {
  res.render('pages/login');
};

exports.logout = function (req, res) {
  req.logout();
  req.flash('flash', 'Vous avez été déconnecté.');
  res.redirect('/');
};
