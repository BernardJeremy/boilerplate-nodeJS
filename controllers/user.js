var User = require('../models/user');
var sha1 = require('sha1');

exports.new = function (req, res) {
  res.render('pages/user-register');
};

exports.register = function (req, res) {
  var newUser = req.body.user;
  if (newUser.password == '' || newUser.password2 == '') {
    req.flash('flash', 'Mot de passe vide !');
    res.redirect('/user/new');
    return;
  }

  if (newUser.password != newUser.password2) {
    req.flash('flash', 'Mot de passe différents !');
    res.redirect('/user/new');
    return;
  }

  newUser.password = sha1(newUser.password);
  delete newUser.password2;
  User.create(
    req.body.user
  ).then(function (user) {
    req.flash('flash', 'Utilisateur enregistré !');
    res.redirect('/');
  }).catch(function (err) {
    req.flash('flash', 'Erreur : ' + err);
    res.redirect('/user/new');
  });
};
