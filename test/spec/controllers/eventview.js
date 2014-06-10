'use strict';

describe('Controller: EventviewCtrl', function () {

  // load the controller's module
  beforeEach(module('joylisterApp'));

  var EventviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventviewCtrl = $controller('EventviewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
