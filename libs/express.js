let express = require('express');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let secret = require('../config/config.json').secret;

let app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/../public'));
app.use(cookieParser(secret));
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;
