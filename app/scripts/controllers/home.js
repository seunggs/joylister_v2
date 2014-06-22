'use strict';

angular.module('joylisterApp')
  .controller('HomeCtrl', function ($scope, Auth) {
		// expose user to scope
		$scope.user = Auth.user;

		// userSignedIn variable initialization
		$scope.userSignedIn = Auth.signedIn();

  });
