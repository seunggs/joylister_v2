'use strict';

describe('Controller: LoginboxCtrl', function () {

  // load the controller's module
  beforeEach(module('joylisterApp'));

  var LoginboxCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoginboxCtrl = $controller('LoginboxCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
