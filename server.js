var passport = require('./libs/passport');

var app = require('./libs/express');
var sessionStore = require('./libs/sequelizeSession')(app);
var flash = require('./libs/flash')(app);

var port = require('./config/config.json').port;

require('./routes')(app, passport);

app.listen(port, function () {
  console.log('Listening on port ' + port);
});
