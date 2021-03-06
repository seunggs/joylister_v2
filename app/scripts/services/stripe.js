/* global StripeCheckout */
'use strict';

angular.module('joylisterApp')
  .factory('Stripe',
    ['$q', '$http',
    function ($q, $http) {
    
    var CHARGE_ENDPOINT = 'http://desolate-island-6060.herokuapp.com';
    var STRIPE_API = 'pk_test_iTfgLvUHP4hUc9IDg9QAlD5o';
    var ON_HST = 0.13;

    return {
      buyTickets: function(options) {
        var deferred = $q.defer();
        
        var handleToken = function(token) {
          $http.post(
            CHARGE_ENDPOINT + '/charge',
            {
              stripeToken: token.id,
              description: options.name + ': ' + options.buyQuantity + ' ticket(s)' + ' for ' + options.date,
              amount: Math.round(options.ticketPrice * 100 * options.buyQuantity * (1+ON_HST))
            }
          ).then(deferred.resolve, deferred.reject);
        };
        
        var handler = StripeCheckout.configure({
          key: STRIPE_API,
          image: 'https://s3.amazonaws.com/joylister-media/images/stripe_logo.jpg',
          token: handleToken,
          name: options.name,
          currency: 'cad',
          description: options.buyQuantity + ' ticket(s)' + ' for ' + options.date,
          amount: Math.round(options.ticketPrice * 100 * options.buyQuantity * (1+ON_HST))
        });

        handler.open();
        return deferred.promise;
      }
    };

  }]);
