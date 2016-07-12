const jwt = require('../libs/jsonWebToken');

const debug = require('../config/config.json').debug;

module.exports.verify = function (redirectTo) {
  return function (req, res, next) {
    let token = req.cookies.token;

    if (!token || token === null || typeof token === 'undefined') {
      if (debug && typeof req.query.token !== 'undefined') {
        token = req.query.token;
      } else {

        return res.redirect(redirectTo);
      }
    }

    jwt.verify(token).then(function(decodedUser) {
      req.user = decodedUser;
      req.isAdmin = decodedUser.isAdmin;
      res.locals.userData = decodedUser;
      next();
    }).catch(function(err) {
      return res.redirect(redirectTo);
    });
  }
}

module.exports.authenticate = function (redirectTo) {
  return function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    if (!username || username === null || typeof username === 'undefined') {
      console.log('Fail to find username when trying to authenticate')
      return res.redirect(redirectTo);
    }

    if (!password || password === null || typeof password === 'undefined') {
      console.log('Fail to find password when trying to authenticate')
      return res.redirect(redirectTo);
    }

    let ret = jwt.sign(username, password).then(function(token) {
      res.cookie('token', token);
      next();
    }).catch(function(err) {
      console.log(err);
      return res.redirect(redirectTo);
    });
  }
}
