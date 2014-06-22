'use strict';

angular.module('joylisterApp')
  .controller('ResetpasswordCtrl', function ($scope, Auth, $timeout, $location) {
		// Initialize variables
		$scope.passwordReset = {
			successMsg: false,
			errorMsg: false,
			sendingMsg: false
		};

    $scope.sendPasswordResetEmail = function() {
			Auth.sendPasswordResetEmail($scope.user)
				.then(function() {
					$scope.passwordReset.sendingMsg = false;
					$scope.passwordReset.successMsg = true;

					$timeout(function() {
						$scope.passwordReset.successMsg = false;
						$location.path('/');
					}, 1500);
				}, function() {
					$scope.passwordReset.errorMsg = true;

					$timeout(function() {
						$scope.passwordReset.errorMsg = false;
					}, 1500);
				}, function() {
					$scope.passwordReset.sendingMsg = true;
				});
    };
  });
