'use strict';

describe('Service: Cookies', function () {

  // load the service's module
  beforeEach(module('joylisterApp'));

  // instantiate service
  var Cookies;
  beforeEach(inject(function (_Cookies_) {
    Cookies = _Cookies_;
  }));

  it('should do something', function () {
    expect(!!Cookies).toBe(true);
  });

});
