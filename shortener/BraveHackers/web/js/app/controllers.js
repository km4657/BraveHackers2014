'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngResource'])
        .controller('HomeCtrl', function($scope, URLs) {
            $scope.categories = ['Uverse', 'Wireless', 'DigitalLife', 'Business', ''];
            $scope.urls = URLs;
        })
        .controller('CreateCtrl', function($scope, $location, PostGetURL) {
            $scope.url = {"category": "", "email": "", "expiredurl": "", "longurl": "", "urlName": "", "vanityurl": ""};
            $scope.categories = ['Uverse', 'Wireless', 'DigitalLife', 'Business', ''];
            $scope.shorturl = 'Get URL';
            var created = false;

            $scope.getURL = function() {
                if (created)
                    $location.url('home');

                var postGetURL = new PostGetURL()
                angular.copy($scope.url, postGetURL);
                postGetURL.$save(function(t) {
                    $scope.shorturl = t.shorturl;
                    created = true;
                });
            }
            $scope.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
            };

            $scope.toggleMin = function() {
                $scope.minDate = $scope.minDate ? null : new Date();
            };
            $scope.toggleMin();
        })
        .controller('HistoryCtrl', function($scope, URL) {
            $scope.url = URL;
        })
        .controller('ReportCtrl', function($scope, clicks) {
            $scope.clicks = clicks;
        });
