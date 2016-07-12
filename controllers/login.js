const userModel = require('../models/user');

exports.loginOk = function (redirectTo) {
  return function (req, res) {
    res.redirect(redirectTo);
  };
}

exports.loginView = function (req, res) {
  res.render('pages/login');
};

exports.loginFail = function (req, res) {
  req.flash('error', 'Wrong password/username');
  exports.loginView(req, res);
};

exports.loginNeeded = function (req, res) {
  req.flash('error', 'You have to be connected');
  exports.loginView(req, res);
};

exports.logout = function (req, res) {
  res.clearCookie('token');
  req.flash('success', 'You have been disconnected');
  exports.loginView(req, res);
};
