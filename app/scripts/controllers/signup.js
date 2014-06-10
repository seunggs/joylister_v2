'use strict';

angular.module('joylisterApp')
  .controller('SignupCtrl', function ($scope, Auth, Cookies, $location, $timeout) {

		// Initialize variables
		$scope.user = {};
		$scope.formErrorMsg = {};
		var registerSuccess = false; // indicates successful registration 
		
		// Check to see if password is same as confirm password
		$scope.confirmPassword = function() {
			if($scope.user.password === $scope.user.confirmPassword) {
				$scope.confirmPassword = true;
			} else {
				$scope.confirmPasswordErrorMsg = true; // show confirm password error msg
				$scope.confirmPassword = false;
			}
		};

		// Register the user
		$scope.registerUser = function() {
			// Attempt to register user only if confirm password matches password
			if($scope.user.password === $scope.user.confirmPassword) {
				Auth.register($scope.user)
					.then(function(user) {
						// Log the user in
						Auth.login($scope.user);

						// success callback
						registerSuccess = true;
						
						$scope.registerSuccessMsg = true; // shows register success msg when true
						$scope.registerErrorMsg = false;

						// Create cookies and set the userId to user's uid
						Cookies.create(user.uid);

						// send the user back to root after the delay
						$timeout(function() {
							$location.path('/');
						}, 1000); // delays relocation until msg is shown

					},
					function() {
						// error callback
						$scope.registerErrorMsg = true; // shows register error msg when true
					});
			}
		};

  });
