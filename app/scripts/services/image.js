'use strict';

angular.module('joylisterApp')
  .factory('Image', function ($firebase, FIREBASE_URL) {
    var imagesRef = new Firebase(FIREBASE_URL + 'images');

    var images = $firebase(imagesRef);

    var Image = {
      all: images,
      find: function(imageId) {
				return images.$child(imageId);
      }
    };

    return Image;
  });
