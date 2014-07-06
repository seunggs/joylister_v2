'use strict';

angular.module('joylisterApp')
  .controller('EventsViewCtrl',
		['$scope', 'Event',
		function ($scope, Event) {
		
		// Bind Firebase events to events variable
		$scope.events = Event.all;

	}]);
