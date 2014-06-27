'use strict';

var stripe = require('stripe')('sk_test_BiXbus56OIaKgkp3B7ftheQp'); // update it with real one on production

module.exports = function(app) {
	// stripe charge
	app.post('/charge', function(req, res) {
			var stripeToken = req.body.stripeToken;
			console.log('stripeToken');

			var amount = 1000;
			var description = 'some event';

			var chargeObj = {
				card: stripeToken,
				currency: 'cad',
				amount: amount,
				description: description
			};

			console.log(chargeObj);

			stripe.charges.create(chargeObj, function(err, charge) {
				if(err) {
					res.send(500, err);
				} else {
					res.send(204);
				}
			});

		});

	// application
	app.get('*', function(req, res) {
		res.sendfile('../app/index.html'); // have Angular handle all front-end routing
	});
};