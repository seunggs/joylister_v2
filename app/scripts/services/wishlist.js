'use strict';

angular.module('joylisterApp')
  .factory('Wishlist',
    ['$firebase', 'FIREBASE_URL',
    function ($firebase, FIREBASE_URL) {
    
    var usersRef = new Firebase(FIREBASE_URL + 'users');
    var users = $firebase(usersRef);

    var Wishlist = {
      add: function(userId, eventId) {
        return users.$child(userId).$child('wishlist').$child(eventId).$set(true);
      },
      find: function(userId) {
        return users.$child(userId).$child('wishlist');
      },
      delete: function(userId, eventId) {
        return users.$child(userId).$child('wishlist').$remove(eventId);
      }
    };

    return Wishlist;
  
  }]);
