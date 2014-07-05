'use strict';

angular.module('joylisterApp')
	.config(function($httpProvider) {
		// enabling CORS
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
	})
  .controller('EventViewCtrl', function ($scope, $routeParams, Event, $location, Auth, $firebase, FIREBASE_URL, $timeout, $http, Stripe, $window, TicketCodeGenerator, Wishlist) {
		// Initialize variables
		$scope.formData = {};
		$scope.soldout = false;

		// Get firebase ref for use throughout
		var usersRef = new Firebase(FIREBASE_URL + 'users');
		var users = $firebase(usersRef);
		var eventsRef = new Firebase(FIREBASE_URL + 'events');
		var events = $firebase(eventsRef);

		// Find the specific event for this page
		$scope.event = Event.find($routeParams.eventId);

		// Set drop downs in the booking box -----------------------------		
		// Set dates
		var datesRef = new Firebase(FIREBASE_URL + 'events/' + $routeParams.eventId + '/dates');
		var dates = $firebase(datesRef);
		
		var setDatesDropdown = function() {
			var dateKeys = dates.$getIndex();

			$scope.datesList = [];
			for(var i=0; i<dateKeys.length; i++) {
				$scope.datesList[i] = dateKeys[i];
			}

			// Set default date placeholder
			$scope.formData.date = $scope.datesList[0];
		};

		events.$on('loaded', function() {
			setDatesDropdown();
		});

		events.$on('change', function() {
			setDatesDropdown();
		});

		// Set buy quantity per purchase drop down
		events.$on('loaded', function() {
			$scope.currentQty = $scope.event.dates[$scope.formData.date].currentQuantity;
		});

		events.$on('change', function() {
			$scope.currentQty = $scope.event.dates[$scope.formData.date].currentQuantity;
		});

		var setBuyQuantityDropdown = function() {
			$scope.buyQuantityList = [];

			$scope.ticketsLeft = $scope.event.maxQuantity - $scope.currentQty;
			if($scope.ticketsLeft === 0) {
				$scope.soldout = true;
			} else if($scope.event.maxQuantityPerPurchase < $scope.ticketsLeft) {
				for(var i=0; i<$scope.event.maxQuantityPerPurchase; i++) {
					$scope.buyQuantityList.push(i+1);
				}
			} else {
				for(var j=0; j<$scope.ticketsLeft; j++) {
					$scope.buyQuantityList.push(j+1);
				}
			}

			$scope.formData.buyQuantity = $scope.buyQuantityList[0]; // setting options default
		};

		events.$on('loaded', function() {
			setBuyQuantityDropdown();
		});

		events.$on('change', function() {
			setBuyQuantityDropdown();
		});

		// Change time display
		events.$on('loaded', function() {
			var eventTimeArray = $scope.event.dates[$scope.formData.date].time.split(':');
			if(eventTimeArray[0] > 12) {
				eventTimeArray[0] = eventTimeArray[0] - 12;
				$scope.eventTime = eventTimeArray.join(':') + ' PM';
			} else {
				$scope.eventTime = eventTimeArray.join(':') + ' AM';
			}
		});

		// Stripe Checkout -------------------------
		// Configure Stripe Checkout

		$scope.openCheckout = function() {
			// Add other data required for Stripe Checkout
			$scope.formData.name = $scope.event.name;
			$scope.formData.ticketPrice = $scope.event.ticketPrice;

			Stripe.buyTickets($scope.formData)
				.then(function() {
					// Increment currentQuantity by the purchase quantity
					var currentQuantityRef = new Firebase(FIREBASE_URL + 'events/' + $routeParams.eventId + '/dates/' + $scope.formData.date + '/currentQuantity');
					var currentQuantity = $firebase(currentQuantityRef);

					// grab currentQty value from Firebase again to get the existing value
					$scope.currentQty = $scope.event.dates[$scope.formData.date].currentQuantity;

					currentQuantity.$transaction(function() {
						if($scope.currentQty + $scope.formData.buyQuantity > $scope.event.maxQuantity) {
							$window.alert('Not enough tickets left');
							$location.path('/events/' + $routeParams.eventId);
						} else {
							return $scope.currentQty + $scope.formData.buyQuantity;
						}
					});

					// Add purchases (under users) to Firebase
					var buyerFullname = users.$child(Auth.user.data.uid).firstname + users.$child(Auth.user.data.uid).lastname;
					var generatedTicketCodes = TicketCodeGenerator.create($scope.currentQty, $scope.formData.buyQuantity, buyerFullname);

					var datePurchasedRef = new Firebase(FIREBASE_URL + 'users/' + Auth.user.data.uid + '/purchases/' + $routeParams.eventId + '/' + $scope.formData.date);
					var datePurchased = $firebase(datePurchasedRef);

					if (datePurchased.purchaseQty === undefined) {
						datePurchased.$update({
							purchaseQty: $scope.formData.buyQuantity
						});

						for (var i=0; i<$scope.formData.buyQuantity; i++) {
							datePurchased.$child('ticketCodes')[i] = generatedTicketCodes[i];
						}
					} else {
						datePurchased.$update({
							purchaseQty: datePurchased.purchaseQty + $scope.formData.buyQuantity
						});

						for (var j=datePurchased.purchaseQty; j<(datePurchased.purchaseQty+$scope.formData.buyQuantity); j++) {
							datePurchased.$child('ticketCodes').$add(generatedTicketCodes[j-datePurchased.purchaseQty]);
						}
					}

					// Now add purchasers (under events) to Firebase
					var purchaserIdRef = new Firebase(FIREBASE_URL + 'events/' + $routeParams.eventId + '/dates/' + $scope.formData.date + '/purchasers/' + Auth.user.data.uid);
					var purchaserId = $firebase(purchaserIdRef);

					if (purchaserId.purchaseQty === undefined) {
						purchaserId.$update({purchaseQty: $scope.formData.buyQuantity});
					} else {
						purchaserId.$update({purchaseQty: purchaserId.purchaseQty + $scope.formData.buyQuantity});
					}
					
					// Update the duplicate currentQty for the closest event date under eventId for progressbar in eventbox
					var eventRef = new Firebase(FIREBASE_URL + 'events/' + $routeParams.eventId);
					var eventFb = $firebase(eventRef);

					eventFb.$update({
						closestDateCurrentQty: eventFb.closestDateCurrentQty + $scope.formData.buyQuantity
					});

				});
		};

		// Wishlist -------------------------
		// Initialize variables
		$scope.eventAlreadyExists = false;
		$scope.addToWishlistErrorMsg = false;
		$scope.addToWishlistSuccessMsg = false;

		// Check if this event is already in the user's wishlist
		var wishlistObj = {};
		var checkExistingWishlist = function() {
			wishlistObj = users.$child(Auth.user.data.uid).$child('wishlist');

			if(wishlistObj[$routeParams.eventId] === true) {
				$scope.eventAlreadyExists = true;
			}
		};

		users.$on('loaded', function() {
			checkExistingWishlist();
		});

		users.$on('child_changed', function() {
			checkExistingWishlist();
		});

		// Add to wishlist
		// First check if the user is signed in
		$scope.addToWishlist = function() {
			if(Auth.signedIn() === true) {
				// Wait for the data to load first
				users.$on('loaded', function() {
					// Check if this event already exists
					if($scope.eventAlreadyExists === false) {
						// Then add this event's eventId to wishlist in /users/userId
						Wishlist.add(Auth.user.data.uid, $routeParams.eventId)
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
