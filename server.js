let app = require('./libs/express');
let _ = require('./libs/strftime').init(app);

let port = require('./config/config.json').port;

require('./routes')(app);

let server = app.listen(port, function () {
  console.log('Listening on port ' + port);
});

let io = require('./libs/socket.io').init(server);
