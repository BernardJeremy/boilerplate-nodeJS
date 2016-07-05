let express = require('express');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let secret = require('../config/config.json').secret;

let app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/../public'));

app.use('/jquery', express.static(__dirname + '/../node_modules/jquery/dist/'));
app.use('/bootstrap', express.static(__dirname + '/../node_modules/bootstrap/dist/'));
app.use('/socket.io', express.static(__dirname + '/../node_modules/socket.io-client/'));

app.use(cookieParser(secret));
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;
