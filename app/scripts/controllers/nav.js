'use strict';

angular.module('joylisterApp')
  .controller('NavCtrl', function ($scope, Auth) {
		// Initialize
		$scope.navItems = ['contact', 'about', 'events', 'home'];
		$scope.navActive = false;

		// Set current navItem (this is to make selected nav item active)
		$scope.setCurrent = function(navItem) {
			$scope.current = navItem;
		};

		// expose user to scope
		$scope.user = Auth.user;

		// userSignedIn variable initialization
		console.log('Auth.signedIn() in nav.js: ' + Auth.signedIn());
		$scope.userSignedIn = Auth.signedIn();
		
		// Cookies variable initialization
		// $scope.cookiesExist = Cookies.exist();

		// Handle logout
		$scope.logout = function() {
			Auth.logout();
			console.log('Auth.signedIn() after logout(): ' + Auth.signedIn());
			$scope.$on('firebaseSimpleLogin:logout', function() {
				console.log('Auth.signedIn() after logout(): ' + Auth.signedIn());
			});
		};

	});
