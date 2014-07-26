'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngResource'])
        .controller('HomeCtrl', function($scope, URLs) {
            $scope.categories = ['Uverse', 'Wireless', 'DigitalLife', 'Business', 'Other'];
            $scope.urls = URLs;
        })
        .controller('CreateCtrl', function($scope,$http) {
            $scope.url = {category: "test", email: "weolopez@yahoo.com", expiredurl: "http://localhost:8080/r/faces/jsf/urlList/List.xhtml", longurl: "http://localhost:8080/r/faces/jsf/urlList/List.xhtml", shorturl: "urlList", urlName: "test1", vanityurl: "urlList"};
            $scope.url2 = new Object();
            $scope.url2.urlName = "testing again";
            $scope.getURL = function() {
                    $resource('http://localhost:8080/r/webresources/com.att.bravehackers.redirect.urllist',  {}, {
                        post: {method: "POST"}
                    }).post(function(t) {
                        $scope.urls = t;
                    });
                }
            }])
        .controller('HistoryCtrl', function($scope, URL) {
            $scope.url = URL;
        })
        .controller('ReportCtrl', function($scope, clicks) {
                $scope.clicks = clicks;
            });
