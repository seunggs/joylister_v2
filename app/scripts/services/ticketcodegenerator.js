'use strict';

angular.module('joylisterApp')
  .factory('TicketCodeGenerator', function () {
    // Random number geneator
    var randomNumGenerator = function(numLength) {
      var randomNum = [];
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (var i=0; i<numLength; i++) {
        randomNum.push(possible.charAt(Math.floor(Math.random() * possible.length)));
      }

      return randomNum.join('');
    };

    var TicketCodeGenerator = {
      create: function(currentQty, buyQty, buyerFullname) {
        var ticketCodes = [];
        var counterStart = currentQty + 1;
        var counterEnd = currentQty + buyQty;

        for (var i=counterStart; i<=counterEnd; i++) {
          var randomNum = randomNumGenerator(6);
          ticketCodes.push(i.toString() + '-' + buyerFullname.toUpperCase() + '-' + randomNum.toString());
        }

        return ticketCodes;
      }
    };

    return TicketCodeGenerator;
  });
