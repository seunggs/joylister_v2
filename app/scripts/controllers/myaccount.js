'use strict';

angular.module('joylisterApp')
  .controller('MyaccountCtrl', function ($scope, User, Event, Thumb, $routeParams) {
		// Expose user data to scope
		$scope.user = User.find($routeParams.userId);

		// Edit profile - must create an object due to prototypical inheritance
		$scope.editProfile = {
			showNameEdit: false,
			showEmailEdit: false
		};

		$scope.submitNameEdit = function() {
			User.update($routeParams.userId, 'firstname', $scope.editProfile.firstName);
			User.update($routeParams.userId, 'lastname', $scope.editProfile.lastName);
		};

		$scope.submitEmailEdit = function() {
			User.update($routeParams.userId, 'email', $scope.editProfile.email);
		};

		// Display wishlist items		
		$scope.wishlist = User.findWishlist($routeParams.userId); // list of user's wishlist items

		$scope.events = Event.all;

		$scope.thumbs = Thumb.all;

		// Remove wishlist item
		$scope.removeWishlistItem = function(wishlistItemId) {
			User.deleteWishlistItem($routeParams.userId, wishlistItemId);
		};
  });
