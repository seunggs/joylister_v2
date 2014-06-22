'use strict';

angular.module('joylisterApp')
  .controller('EventsViewCtrl', function ($scope, Event, Thumb) {
		// Bind Firebase events to events variable
		$scope.events = Event.all;

		// Retrieve the thumb
		$scope.thumbs = Thumb.all;
  });
