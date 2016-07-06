const Sequelize = require('sequelize');
const crypto = require('crypto');

const hash = require('../services/hash');
const db = require('../libs/sequelize');
const salt = require('../config/config.json').secret;

let User = db.define('user', {
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
    defaultValue: false,
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
        password: hash.sha256('admin', salt),
        isAdmin: true,
      });
    }
  });
});

module.exports = User;
