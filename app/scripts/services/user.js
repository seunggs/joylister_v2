'use strict';

angular.module('joylisterApp')
  .factory('User',
    ['$firebase', 'FIREBASE_URL', 'Auth',
    function ($firebase, FIREBASE_URL, Auth) {
  
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
      findPurchases: function(userId) {
        return users.$child(userId).$child('purchases');
      }
    };

    return User;

  }]);
