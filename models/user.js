var Sequelize = require('sequelize');
var db = require('../libs/sequelize');
var sha1 = require('sha1');

var User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

User.findByUserName = function (username) {
  return User.find({
    include: [{ all: true }],
    where: { username: username },
  });
},

User.sync().then(function () {
  User.find({ where: { username: 'admin' } }).then(function (user) {
    if (!user) {
      User.create({
        username: 'admin',
        password: sha1('admin'),
        isAdmin: true,
      });
    }
  });
});

module.exports = User;
