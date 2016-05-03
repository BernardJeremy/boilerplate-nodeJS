var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var sequelize = require('../libs/sequelize');
var store = new SequelizeStore({ db: sequelize });

var secret = require('../config/config.json').secret;
module.exports = function (app) {
  app.use(session({
    secret: secret,
    store: store,
    resave: false,
    saveUninitialized: true,
  }));
  store.sync();

  return store;
};
