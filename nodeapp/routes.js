module.exports = function(app) {
	// stripe charge
	app.post('/charge', function(req, res) {
			// CORS
			//res.header('Access-Control-Allow-Origin', '*');
			//res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');

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
}
