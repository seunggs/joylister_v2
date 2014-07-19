'use strict';

angular.module('joylisterApp')
  .controller('ResetpasswordCtrl',
		['$scope', 'Auth', '$timeout', '$location',
		function ($scope, Auth, $timeout, $location) {

		// Initialize variables
		$scope.passwordReset = {
			successMsg: false,
			errorMsg: false,
			sendingMsg: false
		};

    $scope.sendPasswordResetEmail = function() {
			$scope.passwordReset.sendingMsg = true;
			Auth.sendPasswordResetEmail($scope.user)
				.then(function() {
					$scope.passwordReset.sendingMsg = false;
					$scope.passwordReset.successMsg = true;

					$timeout(function() {
						$scope.passwordReset.successMsg = false;
						$location.path('/');
					}, 1500);
				}, function() {
					$scope.passwordReset.sendingMsg = false;
					$scope.passwordReset.errorMsg = true;
				});
    };

	}]);
