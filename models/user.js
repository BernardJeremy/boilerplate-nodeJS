const Sequelize = require('sequelize');
const crypto = require('crypto');

let db = require('../libs/sequelize');
let salt = require('../config/config.json').secret;

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
        password: crypto.createHmac('sha256', salt).update('admin').digest('hex'),
        isAdmin: true,
      });
    }
  });
});

module.exports = User;
