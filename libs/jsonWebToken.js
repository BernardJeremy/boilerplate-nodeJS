const jwt = require('jsonwebtoken');

const User = require('../models/user')
const hash = require('../services/hash');

const secret = require('../config/config.json').secret;

module.exports.verify = function (token) {
  return new Promise(function(fullfil, reject) {
    jwt.verify(token, secret, function(err, decodedUser) {
      if (err) {
        return reject('Failed to authenticate token.');
      } else {
        return fullfil(decodedUser);
      }
    });
  });
}

module.exports.sign = function (username, password) {
  return new Promise(function(fullfil, reject) {
    User.findByUserName(username)
     .then(function (user) {
       if (!user || user.password != hash.sha256(password, secret)) {
         return reject('Authentication failed. Wrong username or password.');
       }
       console.log(user.dataValues);
       let token = jwt.sign(user.dataValues, secret, {
         expiresIn: '2h'
       });
       fullfil(token);
     }).catch(function (err) {
       console.log(err);
       return reject('Authentication failed. Wrong username or password.');
     });
  });
}
