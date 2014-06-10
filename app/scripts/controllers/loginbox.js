'use strict';

angular.module('joylisterApp')
  .controller('LoginboxCtrl', function ($scope, $timeout, $location, Auth) {
		// Log the user in
		$scope.loginUser = function() {
			Auth.login($scope.existingUser)
				.then(function(user) {
					// success callback
					$scope.loginSuccessMsg = true; // shows login success msg when true
					$scope.loginErrorMsg = false;

					console.log('Auth.signedIn() inside the callback:' + Auth.signedIn());
					console.log('Auth.user inside the callback:' + Auth.user());
					console.log('user inside the callback:' + user);
			    
					// send the user back to root after the delay
					$timeout(function() {
						$location.path('/');
					}, 1500); // delays relocation until msg is shown

				}, function() {
					// error callback
					$scope.loginErrorMsg = true; // shows login error msg when true
				});
		};

		console.log('Auth.signedIn() outside the callback:' + Auth.signedIn());
		console.log('Auth.user outside the callback:' + Auth.user());
  });
