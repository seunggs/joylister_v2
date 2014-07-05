/* jshint unused:false */
'use strict';

var stripe = require('stripe')('sk_test_BiXbus56OIaKgkp3B7ftheQp'); // update it with real one on production
var crypto = require('crypto'); // for AWS S3
var config = require('../config.js'); // for AWS S3 credentials
var moment = require('moment');
var AWS_BUCKET = 'joylister-media';

module.exports = function(app) {
	// stripe charge
	app.post('/charge', function(req, res) {
		var stripeToken = req.body.stripeToken;
		var amount = parseInt(req.body.amount);
		var description = req.body.description;

		var chargeObj = {
			card: stripeToken,
			currency: 'cad',
			amount: amount,
			description: description
		};

		stripe.charges.create(chargeObj, function(err, charge) {
			if(err) {
				res.send(500, err);
			} else {
				res.send(204);
			}
		});

	});

	//2014-12-01T12:00:00.000Z

	// AWS S3 credentials
	app.get('/s3credentials', function(req, res) {
		var s3Policy = {
			'expiration': moment().add('hours', 1).toISOString(),
			'conditions': [
				['starts-with', '$key', ''],
				{'bucket': AWS_BUCKET},
				{'acl': 'public-read'},
				['starts-with', '$Content-Type', '']
			]
		};

		// stringify and encode the policy
		var stringPolicy = JSON.stringify(s3Policy);
		var base64Policy = new Buffer(stringPolicy, 'utf8').toString('base64');
		console.log(stringPolicy);
		console.log(base64Policy);

		// sign the base64 encoded policy
		var signature = crypto.createHmac('sha1', config.AWS_SECRET_ACCESS_KEY)
			.update(new Buffer(base64Policy, 'utf8')).digest('base64');

		// build the results object and return it
		res.json({
			policy: base64Policy,
			signature: signature,
			key: config.AWS_KEY
		});
	});

	// application
	app.get('*', function(req, res) {
		res.sendfile('../app/index.html'); // have Angular handle all front-end routing
	});
};