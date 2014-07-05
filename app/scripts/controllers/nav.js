'use strict';

angular.module('joylisterApp')
  .controller('NavCtrl', function ($scope, Auth, $location) {
		// Initialize
		$scope.navItems = ['contact', 'about', 'events', 'home'];
		$scope.navItemLinks = ['contactus', 'aboutus', 'events', 'home']; // match the link names with navItem array above
		$scope.navItemTexts = ['Contact Us', 'About Us', 'Events', 'Home']; // match the texts with navItem array above

		// Set current navItem (this is to make selected nav item active)
		$scope.setCurrent = function(navItem) {
			$scope.current = navItem;
		};

		// expose user to scope
		$scope.user = Auth.user;

		// userSignedIn variable initialization
		$scope.userSignedIn = Auth.signedIn();
		
		// Handle logout
		$scope.logout = function() {
			Auth.logout();
			$location.path('/');
		};

		//

	});
