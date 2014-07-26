'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngResource'])
        .controller('HomeCtrl', function($scope, URLs) {
            $scope.categories = ['Uverse', 'Wireless', 'DigitalLife', 'Business', ''];
            $scope.urls = URLs;
        })
        .controller('CreateCtrl', function($scope,$location , PostGetURL) {
            $scope.url = {"category": "Wireless", "email": "mollyjane@me.com", "expiredurl": "expiredurl", "longurl": "http://blah.com/Iamextremelylong", "urlName": "myurlname", "vanityurl": "gimme23"};
            $scope.shorturl = 'Get URL';
            var created=false;
            
            $scope.getURL = function() {
                if (created) $location.url('home');
                
                var postGetURL = new PostGetURL()
                angular.copy($scope.url, postGetURL);
                postGetURL.$save(function(t) {
                    $scope.shorturl = t.shorturl;
                    created=true;
                });
            }
        })
        .controller('HistoryCtrl', function($scope, URL) {
            $scope.url = URL;
        })
        .controller('ReportCtrl', function($scope, clicks) {
            $scope.clicks = clicks;
        });
