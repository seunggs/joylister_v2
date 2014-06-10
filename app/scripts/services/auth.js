'use strict';

angular.module('joylisterApp')
  .factory('Auth', function (FIREBASE_URL, $firebaseSimpleLogin) {

    var rootRef = new Firebase(FIREBASE_URL);
    var loginObj = $firebaseSimpleLogin(rootRef);

    var Auth = {
      user: function() {
        loginObj.$getCurrentUser().then(function(user) {return user;});
      },
      register: function(user) {
        return loginObj.$createUser(user.email, user.password);
      },
      signedIn: function() {
        // loginObj's user property is set to null if the user is not logged in
        return loginObj.user !== null;
      },
      login: function(user) {
        return loginObj.$login('password', {email: user.email, password: user.password, rememberMe: true});
      },
      logout: function() {
        loginObj.$logout();
      },
      delete: function(user) {
        return loginObj.$removeUser(user.email, user.password);
      }
    };

    return Auth;
  });
