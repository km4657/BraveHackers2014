'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ui.bootstrap',
  'ui.unique',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl', resolve:{
    URLs:function(MyURLs, $route){return MyURLs.myURLs.get({id:$route.current.params.id});}
  }});
  $routeProvider.when('/create', {templateUrl: 'partials/create.html', controller: 'CreateCtrl'});
  $routeProvider.when('/details/:id', {templateUrl: 'partials/details.html', controller: 'DetailsCtrl', resolve:{
    URL:function(MyURLs, $route){return MyURLs.selectedURL.get({id:$route.current.params.id});}
  }});
  $routeProvider.when('/report/:id', {templateUrl: 'partials/report.html', controller: 'ReportCtrl', resolve:{
    domains:function(MyURLs, $route){return MyURLs.getDomains.get({id:$route.current.params.id});}
  }});
  $routeProvider.when('/recommend', {templateUrl: 'partials/recommend.html', controller: 'RecommendCtrl'});
  $routeProvider.when('/redirect/:id', {templateUrl: 'partials/redirect.html', controller: 'RedirectCtrl', resolve:{
    URL:function(MyURLs, $route){return MyURLs.selectedURL.get({id:$route.current.params.id});}
  }});
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
