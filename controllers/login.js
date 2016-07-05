const userModel = require('../models/user');

exports.loginOk = function (redirectTo) {
  return function (req, res) {
    res.redirect(redirectTo);
  };
}

exports.loginFail = function (req, res) {
  res.redirect('/');
};

exports.loginNeeded = function (req, res) {
  res.redirect('/');
};

exports.loginView = function (req, res) {
  res.render('pages/login');
};

exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
};
