let loginController = require('./controllers/login');

let adminMiddleware = require('./middlewares/admin');

module.exports = function (app) {

  /**
  ** LOGIN
  */
  app.get('/', loginController.loginView);

  app.post('/login', loginController.loginOk('/'));

  app.get('/login/fail', loginController.loginFail);

  app.get('/login/needed', loginController.loginNeeded);

  app.get('/logout', loginController.logout);

};
