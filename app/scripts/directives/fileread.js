/*jshint loopfunc: true */
'use strict';

angular.module('joylisterApp')
	.directive('scFileread', [function () {
    return {
      scope: {
        scFileread: '='
      },
      link: function (scope, element) {
        element.on('change', function (changeEvent) {
          var files = changeEvent.target.files; // FileList object; multiple files allowed
          scope.scFileread = []; // Define the binding variable that will store images data

          for (var i=0; i<files.length; i++) {
            var reader = new FileReader();
            reader.onload = function (loadEvent) {
              scope.$apply(function () {
                scope.scFileread.push(loadEvent.target.result);
              });
            };
            reader.readAsDataURL(files[i]);
          }
        });
      }
    };
	}]);