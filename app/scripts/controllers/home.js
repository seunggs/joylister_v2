'use strict';

angular.module('joylisterApp')
  .controller('HomeCtrl',
		['$scope', 'Auth',
		function ($scope, Auth) {
	
		// expose user to scope
		$scope.user = Auth.user;

		// userSignedIn variable initialization
		$scope.userSignedIn = Auth.signedIn();

	}]);
