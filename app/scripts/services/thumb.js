'use strict';

angular.module('joylisterApp')
  .factory('Thumb', function ($firebase, FIREBASE_URL) {
    var thumbsRef = new Firebase(FIREBASE_URL + 'thumbs');

    var thumbs = $firebase(thumbsRef);

    var Thumb = {
      all: thumbs,
      find: function(thumbId) {
				return thumbs.child(thumbId);
      }
    };

    return Thumb;
  });
