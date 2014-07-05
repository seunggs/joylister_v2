'use strict';

angular.module('joylisterApp')
  .controller('EventsViewCtrl', function ($scope, Event) {
		// Bind Firebase events to events variable
		$scope.events = Event.all;

  });
