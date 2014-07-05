'use strict';

angular
  .module('joylisterApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'firebase',
    'ui.bootstrap',
    'ngS3upload'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
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
      .when('/myaccount/:userId', {
        templateUrl: 'views/myaccount.html',
        controller: 'MyaccountCtrl'
      })
      .when('/resetpassword', {
        templateUrl: 'views/resetpassword.html',
        controller: 'ResetpasswordCtrl'
      })
      .when('/changepassword', {
        templateUrl: 'views/changepassword.html',
        controller: 'ChangepasswordCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .constant('FIREBASE_URL', 'https://joylister.firebaseio.com/');
