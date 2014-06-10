/*jshint loopfunc: true */
'use strict';

angular.module('joylisterApp')
	.factory('Event', function($firebase, FIREBASE_URL) {
		var eventsRef = new Firebase(FIREBASE_URL + 'events');
		var imagesRef = new Firebase(FIREBASE_URL + 'images');
		var thumbsRef = new Firebase(FIREBASE_URL + 'thumbs');

		var events = $firebase(eventsRef);
		var images = $firebase(imagesRef);
		var thumbs = $firebase(thumbsRef);

		// Initialize variables
		var eventId = '';
		var imageId = '';
		var thumbId = '';
		var thumbIdArray = [];
		var imageIdArray = [];

		// Regex related variables
		var descWithoutTags;
		var descRegex;
		var descWithoutTagsArray = [];

		var Event = {
			all: events,
			create: function(event, thumbsData, imagesData) {

				// Add the event data to Firebase and retrieve the unique ID of this event
				return events.$add(event)
					.then(function(eventRef) {
						eventId = eventRef.name();

						// Create thumbs as separate endpoints and retrieve their unique IDs
						for (var i=0; i<thumbsData.length; i++) {
							thumbs.$add({thumbData: thumbsData[i]})
								.then(function(thumbRef) {
									thumbId = thumbRef.name();

									// Add eventId to thumbs
									thumbRef.update({eventId: eventId});

									// Add thumbId in events
									thumbIdArray.push(thumbId);
									eventRef.child('thumbs').update(thumbIdArray);
								});
						}

						// Create images as separate endpoints and retrieve their unique IDs
						for (var j=0; j<imagesData.length; j++) {
							images.$add({imageData: imagesData[j]})
								.then(function(imageRef) {
									imageId = imageRef.name();

									// Add eventId to images
									imageRef.update({eventId: eventId});

									// Add imageId to events
									imageIdArray.push(imageId);
									console.log(imageIdArray);
									eventRef.child('images').update(imageIdArray);
								});
						}

						// Use regex to add html elements on event.desc text
						descWithoutTags = event.desc + '\n'; // add \n at the end so regex will catch the last paragraph
						descRegex = /(.+)\s*\n+/g;
						descWithoutTagsArray = descWithoutTags.match(descRegex);
						console.log(descWithoutTagsArray);
						for (var k = 0; k < descWithoutTagsArray.length; k++) {
							descWithoutTagsArray[k] = descWithoutTagsArray[k].replace(descRegex, '$1');
						}
						var descWithTags = '<p>' + descWithoutTagsArray.join('</p><p>') + '</p>';
						console.log(descWithTags);

					});

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