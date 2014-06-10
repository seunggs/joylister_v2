'use strict';

describe('Service: thumb', function () {

  // load the service's module
  beforeEach(module('joylisterApp'));

  // instantiate service
  var thumb;
  beforeEach(inject(function (_thumb_) {
    thumb = _thumb_;
  }));

  it('should do something', function () {
    expect(!!thumb).toBe(true);
  });

});
