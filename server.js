let app = require('./libs/express');
let _ = require('./libs/strftime').init(app);

let port = require('./config/config.json').port;

require('./routes')(app);

app.listen(port, function () {
  console.log('Listening on port ' + port);
});
