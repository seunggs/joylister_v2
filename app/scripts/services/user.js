'use strict';

angular.module('joylisterApp')
  .factory('User', function ($firebase, FIREBASE_URL, Auth) {
    var usersRef = new Firebase(FIREBASE_URL + 'users');
    var users = $firebase(usersRef);

    var User = {
      all: users,
      create: function(userData) {
        return users.$child(Auth.user.data.uid).$update(userData);
      },
      find: function(userId) {
        return users.$child(userId);
      },
      update: function(userId, userDataObj) {
        return users.$child(userId).$update(userDataObj);
      },
      findWishlist: function(userId) {
        return users.$child(userId).$child('wishlist');
      },
      deleteWishlistItem: function(userId, eventId) {
        return users.$child(userId).$child('wishlist').$remove(eventId);
      },
      findPurchases: function(userId) {
        return users.$child(userId).$child('purchases');
      }
    };

    return User;
  });
