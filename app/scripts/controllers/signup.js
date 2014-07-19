'use strict';

angular.module('joylisterApp')
  .controller('SignupCtrl',
		['$scope', 'Auth', 'User', '$location', '$timeout',
		function ($scope, Auth, User, $location, $timeout) {

		// Initialize variables
		$scope.user = {};
		$scope.formErrorMsg = {};
		var registerSuccess = false; // indicates successful registration 
		$scope.register = {
			successMsg: false,
			errorMsg: false,
			loadingMsg: false
		};
		$scope.user.avatarUrl = '/images/defaultAvatar.jpg';
		
		// Check to see if password is same as confirm password
		$scope.confirmPassword = function() {
			if($scope.user.password === $scope.user.passwordConfirm) {
				$scope.passwordConfirm = true;
				$scope.passwordConfirmErrorMsg = false; // hide confirm password error msg
			} else {
				$scope.passwordConfirmErrorMsg = true; // show confirm password error msg
				$scope.passwordConfirm = false;
			}
		};

		$scope.$watch('user.passwordConfirm', function() {
			$scope.confirmPassword();
		});

		// Register the user
		$scope.registerUser = function() {
			// Show loading message
			if(!$scope.signupForm.$error.required) {
				$scope.register.loadingMsg = true;
			}

			// Attempt to register user only if confirm password matches password
			if($scope.user.password === $scope.user.passwordConfirm) {
				Auth.register($scope.user)
					.then(function() {
						// Remove loading message
						$scope.register.loadingMsg = false;

						// Log the user in
						Auth.login($scope.user)
							.then(function() {
								// Add other user data to /users in Firebase
								// this is within the login success callback to make sure uid is not null
								$scope.userData.email = $scope.user.email;
								$scope.userData.wishlist = '';
								User.create($scope.userData);
							});

						// success callback
						registerSuccess = true;
						
						$scope.register.successMsg = true; // shows register success msg when true
						$scope.register.errorMsg = false;

						// send the user back to root after the delay
						$timeout(function() {
							$location.path('/');
						}, 1500); // delays relocation until msg is shown

					},
					function() {
						// Remove loading message
						$scope.register.loadingMsg = false;
						$scope.register.errorMsg = true; // shows register error msg when true
					});
			}
		};

	}]);
