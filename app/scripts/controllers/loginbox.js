'use strict';

angular.module('joylisterApp')
  .controller('LoginboxCtrl',
		['$scope', '$timeout', '$location', 'Auth',
		function ($scope, $timeout, $location, Auth) {

		// initialize variables
		$scope.loginbox = {
			loginErrorMsg: false,
			loginSuccessMsg: false,
			loginLoadingMsg: false
		};
		
		// Log the user in
		$scope.loginUser = function() {
			$scope.loginbox.loginLoadingMsg = true;
			Auth.login($scope.existingUser)
				.then(function(user) {
					$scope.loginbox.loginLoadingMsg = false;
					$scope.loginbox.loginSuccessMsg = true; // shows login success msg when true

					// send the user to myaccount page after the delay
					$timeout(function() {
						$location.path('/myaccount/' + user.uid);
					}, 1500); // delays relocation until msg is shown

				}, function() {
					$scope.loginbox.loginLoadingMsg = false;
					$scope.loginbox.loginErrorMsg = true; // shows login error msg when true
				});
		};

	}]);
