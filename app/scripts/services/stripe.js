/* global StripeCheckout */
'use strict';

angular.module('joylisterApp')
  .factory('Stripe', function ($q, $http) {
    var CHARGE_ENDPOINT = 'http://localhost:8000';
    var STRIPE_API = 'pk_test_iTfgLvUHP4hUc9IDg9QAlD5o';

    return {
      buyTickets: function(options) {
        var deferred = $q.defer();
        
        var handleToken = function(token) {
          $http.post(
            CHARGE_ENDPOINT + '/charge',
            {stripeToken: token.id}
          ).then(deferred.resolve, deferred.reject);
        };
        
        var handler = StripeCheckout.configure({
          key: STRIPE_API,
          image: '/images/stripe_logo.jpg',
          token: handleToken,
          name: options.name,
          description: options.buyQuantity + ' ticket(s)',
          amount: options.ticketPrice * 100 * options.buyQuantity
        });

        handler.open();
        return deferred.promise;
      }
    };

  });
