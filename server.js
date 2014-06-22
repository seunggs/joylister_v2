var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var Firebase = require('firebase');
var port = process.env.port || 9000;
var stripe = require('stripe')('sk_test_BiXbus56OIaKgkp3B7ftheQp'); // update it with real one on production

// configure app
app.use(express.static(__dirname + '/app'));
app.use(morgan('dev'));
app.use(bodyParser()); // pull information from html in POST

// routes
require('./nodeapp/routes')(app);

// listen
app.listen(port);
console.log('App listening on port ' + port + '...');