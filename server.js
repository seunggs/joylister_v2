'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var port = process.env.PORT || 8000;

// configure app
app.use(express.static(__dirname + '/app'));
app.use(morgan('dev'));
app.use(bodyParser()); // pull information from html in POST
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

// routes
require('./nodeapp/routes')(app);

// listen
app.listen(port);
console.log('App listening on port ' + port + '...');