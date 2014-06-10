'use strict';

angular.module('joylisterApp')
	.controller('AddeventCtrl', function ($scope, Event, $timeout, $location) {
		// Initialize 
		$scope.events = [];
		$scope.addEventSuccess = false; // when it's true, it shows a success alert msg
		$scope.addEventFail = false; // when it's true, it shows a fail alert msg
		$scope.loadingMsg = false; // when it's true, it shows a loading msg

		// Show the thumb image in real-time if it's being viewed in '/addevent' as a preview
		// Watch for thumb image and run eventboxAsPreview()		
		$scope.eventboxAsPreview = function() {
			if($location.url() === '/addevent') {
				return true;
			} else {
				return false;
			}
		};

		$scope.$watch('thumbsData', function() {
			$scope.eventboxAsPreview();
		});

		// Reset form function
		var resetForm = function() {
			$scope.event = {};
			$scope.event.currentQuantity = 0;
			$scope.thumbData = '';
			$scope.imagesData = [];
		};

		resetForm(); // Initially reset the form

		// Add an event to Firebase
		$scope.addEvent = function(event, thumbsData, imagesData) {
			// Initialize the alert box conditions to false
			// $timeout also resets the alert box conditions to false, 
			// but this is in case someone inputs data within the delay set in $timeout
			$scope.addEventSuccess = false;
			$scope.addEventFail = false;

			Event.create(event, thumbsData, imagesData)
				.then(function() {
					// Success callback
					resetForm();
					$scope.addEventSuccessMsg = true;

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

	});
