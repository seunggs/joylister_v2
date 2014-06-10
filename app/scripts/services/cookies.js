'use strict';

angular.module('joylisterApp')
  .factory('Cookies', function ($cookieStore) {

    var Cookies = {
			exist: function() {
				// Return true if the cookie exists
				return $cookieStore.get('userId') !== undefined;
			},
			get: function() {
				return $cookieStore.get('userId');
			},
			create: function(userId) {
				$cookieStore.put('userId', userId);
			},
			delete: function() {
				$cookieStore.remove('userId');
			}
		};

		return Cookies;
  });
