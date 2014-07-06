'use strict';

angular.module('joylisterApp')
  .controller('NavCtrl',
		['$scope', 'Auth', '$location', '$window',
		function ($scope, Auth, $location, $window) {
		
		// Initialize
		$scope.navItems = ['events', 'about', 'contact'];
		$scope.navItemLinks = ['events', 'aboutus', 'contactus']; // match the link names with navItem array above
		$scope.navItemTexts = ['Events', 'About', 'Contact']; // match the texts with navItem array above

		// Set current navItem (this is to make selected nav item active)
		$scope.setCurrent = function(navItem) {
			$scope.current = navItem;
		};

		// Hide a nav item for mobile
		if($window.innerWidth <= 767) {
			$scope.navItems = ['events', 'contact'];
			$scope.navItemLinks = ['events', 'contactus']; // match the link names with navItem array above
			$scope.navItemTexts = ['Events', 'Contact']; // match the texts with navItem array above
		} else {
			$scope.navItems = ['events', 'about', 'contact'];
			$scope.navItemLinks = ['events', 'aboutus', 'contactus']; // match the link names with navItem array above
			$scope.navItemTexts = ['Events', 'About', 'Contact']; // match the texts with navItem array above
		}

		// expose user to scope
		$scope.user = Auth.user;

		// userSignedIn variable initialization
		$scope.userSignedIn = Auth.signedIn();
		
		// Handle logout
		$scope.logout = function() {
			Auth.logout();
			$location.path('/');
		};

	}]);
