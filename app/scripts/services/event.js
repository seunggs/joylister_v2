/*jshint loopfunc: true */
'use strict';

angular.module('joylisterApp')
	.factory('Event', function($firebase, FIREBASE_URL) {
		var eventsRef = new Firebase(FIREBASE_URL + 'events');

		var events = $firebase(eventsRef);

		// Initialize variables
		var Event = {
			all: events,
			create: function(event) {
				return events.$add(event);
			},
			update: function(event) {
				return events.$update(event);
			},
			find: function(eventId) {
				return events.$child(eventId);
			},
			delete: function(eventId) {
				return events.$remove(eventId);
			}
		};

		return Event;
	});