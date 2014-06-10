'use strict';

angular.module('joylisterApp')
  .controller('EventViewCtrl', function ($scope, $routeParams, Event, Image) {
		// Fine the specific event for this page
		$scope.event = Event.find($routeParams.eventId);

		// Retrieve the images
		$scope.images = Image.all;

  });
