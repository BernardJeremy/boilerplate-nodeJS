const userModel = require('../models/user');

exports.loginOk = function (redirectTo) {
  return function (req, res) {
    res.redirect(redirectTo + '?ok');
  };
}

exports.loginFail = function (req, res) {
  res.redirect('/?fail');
};

exports.loginNeeded = function (req, res) {
  res.redirect('/?needed');
};

exports.loginView = function (req, res) {
  res.render('pages/login');
};

exports.logout = function (req, res) {
  res.redirect('/?logout');
};
