'use strict';

describe('Service: ticketCodeGenerator', function () {

  // load the service's module
  beforeEach(module('joylisterApp'));

  // instantiate service
  var ticketCodeGenerator;
  beforeEach(inject(function (_ticketCodeGenerator_) {
    ticketCodeGenerator = _ticketCodeGenerator_;
  }));

  it('should do something', function () {
    expect(!!ticketCodeGenerator).toBe(true);
  });

});
