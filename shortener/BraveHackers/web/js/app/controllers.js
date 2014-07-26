'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngResource'])
        .controller('HomeCtrl', function($scope, $resource) {
            $resource('http://gacdtl03ml5174.itservices.sbc.com:8080/r/webresources/com.att.bravehackers.redirect.urllist', {}, {
                get: {method: "GET", isArray: true}
            }).get(function(t) {
                $scope.urls = t;
            });
        })
        .controller('CreateCtrl', ['$scope', function($scope) {
                $scope.url = {category: "test", email: "weolopez@yahoo.com", expiredurl: "http://localhost:8080/r/faces/jsf/urlList/List.xhtml", longurl: "http://localhost:8080/r/faces/jsf/urlList/List.xhtml", shorturl: "urlList", urlName: "test1", vanityurl: "urlList"};
                $scope.getURL = function() {
                    $resource('http://gacdtl03ml5174.itservices.sbc.com:8080/r/webresources/com.att.bravehackers.redirect.urllist', {}, {
                        post: {method: "POST"}
                    }).post(function(t) {
                        $scope.urls = t;
                    });
                }
            }])
        .controller('HistoryCtrl', ['$scope', function($scope) {

            }])
        .controller('ReportCtrl', ['$scope', function($scope) {

            }]);