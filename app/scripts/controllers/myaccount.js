'use strict';

angular.module('joylisterApp')
  .controller('MyaccountCtrl',
		['$scope', 'User', 'Event', '$routeParams', 'Wishlist',
		function ($scope, User, Event, $routeParams, Wishlist) {
		
		// Expose user data to scope
		$scope.user = User.find($routeParams.userId);

		// Edit profile - must create an object due to prototypal inheritance
		$scope.editProfile = {
			showNameEdit: false,
			showEmailEdit: false
		};

		$scope.submitNameEdit = function() {
			User.update($routeParams.userId, { firstname: $scope.editProfile.firstName, lastname: $scope.editProfile.lastName })
				.then(function() {
					$scope.editProfile.showNameEdit = false;
				});
		};

		$scope.submitEmailEdit = function() {
			User.update($routeParams.userId, { email: $scope.editProfile.email })
				.then(function() {
					$scope.editProfile.showEmailEdit = false;
				});
		};

		// Add avatar image to Firebase
		$scope.addAvatarToFirebase = function() {
			User.update($routeParams.userId, { avatarUrl: $scope.avatarUrl });
		};

		// Display wishlist items		
		$scope.wishlist = Wishlist.find($routeParams.userId); // list of user's wishlist items

		$scope.events = Event.all;

		// Remove wishlist item
		$scope.removeWishlistItem = function(wishlistItemId, e) {
			Wishlist.delete($routeParams.userId, wishlistItemId);
			e.preventDefault(); // prevent ng-href from executing and relocating to eventview of deleted wishlist item
		};

		// Display purchased items
		$scope.purchases = User.findPurchases($routeParams.userId); // list of user's purchases
				
	}]);
