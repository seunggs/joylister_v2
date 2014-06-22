'use strict';

angular.module('joylisterApp')
  .controller('ChangepasswordCtrl', function ($scope, Auth, $timeout, $location) {
		// Initialize variables
		$scope.passwordChange = {
			successMsg: false,
			errorMsg: false,
			loadingMsg: false
		};

		$scope.changePassword = function() {
			Auth.changePassword($scope.user)
				.then(function() {
					$scope.passwordChange.loadingMsg = false;
					$scope.passwordChange.successMsg = true;

					$timeout(function() {
						$scope.passwordChange.successMsg = false;
						$location.path('/');
					}, 1500);
				}, function() {
					$scope.passwordChange.errorMsg = true;

					$timeout(function() {
						$scope.passwordChange.errorMsg = false;
					}, 1500);
				}, function() {
					$scope.passwordChange.loadingMsg = true;
				});
		};
  });
