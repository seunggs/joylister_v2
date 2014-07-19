'use strict';

angular.module('joylisterApp')
  .controller('ChangepasswordCtrl',
		['$scope', 'Auth', '$timeout', '$location',
		function ($scope, Auth, $timeout, $location) {
		
		// Initialize variables
		$scope.fromForgotPassword = false;
		$scope.passwordChange = {
			successMsg: false,
			errorMsg: false,
			loadingMsg: false
		};

		// Get parameter from URL
		if(($location.search()).forgotPassword) {
			$scope.fromForgotPassword = true;
		}

		$scope.changePassword = function() {
			$scope.passwordChange.loadingMsg = true;
			Auth.changePassword($scope.user)
				.then(function() {
					$scope.passwordChange.loadingMsg = false;
					$scope.passwordChange.successMsg = true;

					$timeout(function() {
						$scope.passwordChange.successMsg = false;
						$location.path('/');
					}, 1500);
				}, function() {
					$scope.passwordChange.loadingMsg = false;
					$scope.passwordChange.errorMsg = true;

					$timeout(function() {
						$scope.passwordChange.errorMsg = false;
					}, 1500);
				});
		};
		
  }]);
