var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var strftime = require('strftime').timezone(120);
var User = require('../models/user');
var sha1 = require('sha1');

passport.use(new Strategy(
  function (username, password, cb) {
    User.findByUserName(username)
    .then(function (user) {
      if (!user || user.password != sha1(password) || !user.active) {
        return cb(null, false);
      }

      user.lastLogin = strftime('%Y-%m-%d', new Date());
      user.save();
      return cb(null, user);
    }).catch(function (err) {
      return cb(err);
    });
  }));

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
  });

passport.deserializeUser(function (id, cb) {
    User.findById(id)
    .then(function (user) {
      cb(null, user);
    }).catch(function (err) {
      return cb(err);
    });
  });

module.exports = passport;
