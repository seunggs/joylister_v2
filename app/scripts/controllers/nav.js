'use strict';

angular.module('joylisterApp')
  .controller('NavCtrl', function ($scope) {
		// Initialize
		$scope.navItems = ['contact', 'about', 'events', 'home'];
		$scope.navActive = false;

		// Set current navItem
		$scope.setCurrent = function(navItem) {
			$scope.current = navItem;
		};

	});
