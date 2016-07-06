const loginController = require('./controllers/login');

const adminMiddleware = require('./middlewares/admin');
const authenticate = require('./middlewares/auth').authenticate;
const ensureIsLogIn = require('./middlewares/auth').verify;

module.exports = function (app) {

  /**
  ** LOGIN
  */
  app.get('/', loginController.loginView);

  app.post('/login', authenticate('/login/fail') ,loginController.loginOk('/home'));

  app.get('/login/fail' , loginController.loginFail);

  app.get('/login/needed', loginController.loginNeeded);

  app.get('/logout', loginController.logout);

  /**
  ** HOME
  */

  app.get('/home', ensureIsLogIn('/login/needed'), loginController.loginView);
};
