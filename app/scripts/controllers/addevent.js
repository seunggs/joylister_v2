'use strict';

angular.module('joylisterApp')
	.controller('AddeventCtrl',
		['$scope', 'Event', '$timeout', '$window', '$firebase', 'FIREBASE_URL',
		function ($scope, Event, $timeout, $window, $firebase, FIREBASE_URL) {
		
		// Initialize 
		$scope.events = [];
		$scope.addEventSuccess = false; // when it's true, it shows a success alert msg
		$scope.addEventFail = false; // when it's true, it shows a fail alert msg
		$scope.loadingMsg = false; // when it's true, it shows a loading msg

		// Reset form function
		var resetForm = function() {
			$scope.event = {};
		};

		resetForm(); // Initially reset the form

		// Allow addition of multiple dates
		var counter = 0;
		$scope.items = [counter];
		$scope.eventDates = [];
		$scope.eventTimes = [];

		$scope.addEventDate = function() {
			counter += 1;
			$scope.items.push(counter);
		};

		$scope.deleteEventDate = function() {
			if(counter !== 0) {
				counter -= 1;
				$scope.items.pop();
				$scope.eventDates.pop();
				$scope.eventTimes.pop();
			} else {
				$window.alert('Must have at least one date');
			}
		};

		// Add paragraph tags to a body of text 
		var addParagraphTags = function(text) {
			var descPattern = /(.*)\n+/g;
			text = text + '\n';
			var descParagraphs = text.match(descPattern);
			text = '<p>' + descParagraphs.join('</p><p>') + '</p>';
			return text;
		};

		// Add an event to Firebase
		$scope.addEvent = function(event) {
			// Initialize the alert box conditions to false
			// $timeout also resets the alert box conditions to false, 
			// but this is in case someone inputs data within the delay set in $timeout
			$scope.addEventSuccess = false;
			$scope.addEventFail = false;

			// add paragraph tags to $scope.event.desc
			$scope.event.desc = addParagraphTags($scope.event.desc);

			// Add a duplicate currentQty and date for the closest event date under eventId for the progressbar in eventbox
			$scope.event.closestDate = $scope.eventDates[0];
			$scope.event.closestDateCurrentQty = 0;

			Event.create(event)
				.then(function(ref) {
					// Success callback
					resetForm();
					$scope.addEventSuccessMsg = true;

					// Add dates
					var datesRef = new Firebase(FIREBASE_URL + 'events/' + ref.name() + '/dates');
					var dates = $firebase(datesRef);

					for (var i=0; i<$scope.eventDates.length; i++) {
						dates.$child($scope.eventDates[i]).$update({currentQuantity: 0, time: $scope.eventTimes[i]});
					}

					// Loading message is set to false
					$scope.loadingMsg = false;

					// Set alert box conditions to false after a short timeout
					$timeout(function() {
						$scope.addEventSuccessMsg = false;
					}, 1000);
				}, function() {
					// Error handling
					$scope.addEventFailMsg = true;

					// Loading message is set to false
					$scope.loadingMsg = false;

					// Set alert box conditions to false after a short timeout
					$timeout(function() {
						$scope.addEventFailMsg = false;
					}, 2000);
				}, function() {
					// Progress notification
					$scope.loadingMsg = true;
				});
		};

	}]);
