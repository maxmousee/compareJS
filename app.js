var express = require('express');
var lokijs = require('lokijs');
var app = express();
var config = require('./config');
var apiController = require('./controllers/apiController');

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

apiController(app);

app.listen(port);