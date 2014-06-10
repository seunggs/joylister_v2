'use strict';

angular
  .module('joylisterApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'firebase',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/events', {
        templateUrl: 'views/eventsview.html',
        controller: 'EventsViewCtrl'
      })
      .when('/addevent', {
        templateUrl: 'views/addevent.html',
        controller: 'AddeventCtrl'
      })
      .when('/events/:eventId', {
        templateUrl: 'views/eventview.html',
        controller: 'EventViewCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .constant('FIREBASE_URL', 'https://joylister.firebaseio.com/');
