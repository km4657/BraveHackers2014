'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
  $routeProvider.when('/create', {templateUrl: 'partials/create.html', controller: 'CreateCtrl'});
  $routeProvider.when('/history', {templateUrl: 'partials/history.html', controller: 'HistoryCtrl'});
  $routeProvider.when('/report', {templateUrl: 'partials/report.html', controller: 'ReportCtrl'});
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
