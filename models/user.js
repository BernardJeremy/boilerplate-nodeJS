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
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  lastLogin: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

User.findByUserName = function (username) {
  return User.find({
    include: [{ all: true }],
    where: { username: username },
  });
},

User.findById = function (id) {
  return User.find({
    include: [{ all: true }],
    where: { id: id },
  });
},

User.sync().then(function () {
  User.find({
    where: { username: 'admin' },
  }).then(function (user) {
    if (!user) {
      User.create({
        username: 'admin',
        password: sha1('admin'),
      });
    }
  });
});

module.exports = User;
