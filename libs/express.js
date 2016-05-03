var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('../libs/passport');
var timezone = require('../config/config.json').timezone;
var strftime = require('strftime').timezone(timezone);

var secret = require('../config/config.json').secret;

var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/../public'));

app.use(cookieParser(secret));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.userData = req.user;
  if (typeof req.user !== 'undefined') {
    req.isAdmin = req.user.isAdmin;
  }

  next();
});

app.locals.date = function (date) {
  return (strftime('%d/%m/%Y', new Date(date)));
};

app.locals.time = function (time) {
  return (strftime('%H:%M', new Date('January 01, 2000 ' + time)));
};

module.exports = app;
