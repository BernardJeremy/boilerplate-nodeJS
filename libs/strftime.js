let timezone = require('../config/config.json').timezone;
let strftime = require('strftime').timezone(timezone);

module.exports.date = function (date) {
  return (strftime('%d/%m/%Y', new Date(date)));
};

module.exports.time = function (time) {
  return (strftime('%H:%M', new Date('January 01, 2000 ' + time)));
};

module.exports.init = function(app) {
  app.locals.time = module.exports.time;
  app.locals.date = module.exports.date;
}
