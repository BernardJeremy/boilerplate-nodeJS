let morgan = require('morgan')

module.exports.init = function(app, type = 'dev') {
  app.use(morgan(type));
}
