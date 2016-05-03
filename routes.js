var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
var ensureLoggedOut = require('connect-ensure-login').ensureLoggedOut;

var loginController = require('./controllers/login');

var adminMiddleware = require('./middlewares/admin');

module.exports = function (app, passport) {

  /**
  ** LOGIN
  */
  app.get('/', ensureLoggedOut('/list'), loginController.loginView);

  app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login/fail/' }),
    loginController.loginOk);

  app.get('/login/fail', loginController.loginFail);

  app.get('/login/needed', loginController.loginNeeded);

  app.get('/logout', loginController.logout);

};
