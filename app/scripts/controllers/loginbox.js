'use strict';

angular.module('joylisterApp')
  .controller('LoginboxCtrl',
		['$scope', '$timeout', '$location', 'Auth',
		function ($scope, $timeout, $location, Auth) {

		// Log the user in
		$scope.loginUser = function() {
			Auth.login($scope.existingUser)
				.then(function(user) {
					// success callback
					$scope.loginSuccessMsg = true; // shows login success msg when true
					$scope.loginErrorMsg = false;

					// send the user to myaccount page after the delay
					$timeout(function() {
						$location.path('/myaccount/' + user.uid);
					}, 1500); // delays relocation until msg is shown

				}, function() {
					// error callback
					$scope.loginErrorMsg = true; // shows login error msg when true
				});
		};

	}]);
