'use strict';

angular.module('joylisterApp')
	.config(function($httpProvider) {
		// enabling CORS
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    //Reset headers to avoid OPTIONS request (aka preflight)
    /*
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
    */
	})
  .controller('EventViewCtrl', function ($scope, $routeParams, Event, Image, $location, Auth, $firebase, FIREBASE_URL, $timeout, $http, Stripe) {
		// Fine the specific event for this page
		$scope.event = Event.find($routeParams.eventId);

		// Retrieve the images -------------------------
		$scope.images = Image.all;

		// Stripe Checkout -------------------------
		
		// Set buy quantity per purchase
		var eventsRef = new Firebase(FIREBASE_URL + 'events');
		var events = $firebase(eventsRef);

		$scope.formData = {};
		$scope.buyQuantityList = [];

		events.$on('loaded', function() {
			for(var i=0; i<$scope.event.maxQuantityPerPurchase; i++) {
				$scope.buyQuantityList.push(i+1);
			}

			$scope.formData.buyQuantity = $scope.buyQuantityList[0]; // setting options default
		});

		// Configure Stripe Checkout
		$scope.openCheckout = function() {
			Stripe.buyTickets($scope.formData);
		};


		// Wishlist -------------------------
		// Initialize variables
		$scope.eventAlreadyExists = false;
		$scope.addToWishlistErrorMsg = false;
		$scope.addToWishlistSuccessMsg = false;

		var usersRef = new Firebase(FIREBASE_URL + 'users');
		var users = $firebase(usersRef);

		// Initialize variables and functions
		var wishlistObj = {};
		var checkExistingWishlist = function() {
			wishlistObj = users.$child(Auth.user.data.uid).$child('wishlist');

			if(wishlistObj[$routeParams.eventId] === true) {
				$scope.eventAlreadyExists = true;
			}
		};


		// Check if this event is already in the user's wishlist
		users.$on('loaded', function() {
			checkExistingWishlist();
		});

		users.$on('child_changed', function() {
			checkExistingWishlist();
		});

		// Add to wishlist
		$scope.addToWishlist = function() {
			// First check if the user is signed in
			if(Auth.signedIn() === true) {
				// Wait for the data to load first
				users.$on('loaded', function() {
					// Check if this event already exists
					if($scope.eventAlreadyExists === false) {
						// Then add this event's eventId to wishlist in /users/userId
						users.$child(Auth.user.data.uid).$child('wishlist').$child($routeParams.eventId).$set(true)
							.then(function() {
								// Success callback
								$scope.addToWishlistSuccessMsg = true;
								
								// Erase the msg after a delay
								$timeout(function() {
									$scope.addToWishlistSuccessMsg = false;
								}, 2000);

							}, function() {
								// Error callback
								$scope.addToWishlistErrorMsg = true;

								// Erase the msg after a delay
								$timeout(function() {
									$scope.addToWishlistErrorMsg = false;
								}, 2000);
							});
					}
				});
			} else {
				// Relocate the user to signin page
				$location.path('/signin');
			}
		};

  });
