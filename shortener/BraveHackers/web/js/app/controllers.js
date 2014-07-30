'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngResource'])
        .controller('HomeCtrl', function($scope, URLs) {
            $scope.categories = ['Uverse', 'Wireless', 'DigitalLife', 'Business', 'Other'];
            $scope.urls = URLs;
        })
        .controller('CreateCtrl', function($scope, $location, PostGetURL, PostSendSms) {
            $scope.url = {"category": "", "email": "", "expiredurl": "", "longurl": "", "urlName": "", "vanityurl": "", "description": "", "expireDate": ""};
            $scope.categories = ['Uverse', 'Wireless', 'DigitalLife', 'Business', ''];
            $scope.shorturl = 'Get URL';
            $scope.sms = {"tn": "4044080667", "message": "TESTING"};
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
            $scope.sendSms = function() {
                var postSendSms = new PostSendSms()
                angular.copy($scope.sms, postSendSms);
                postSendSms.$save();
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
        .controller('HistoryCtrl', function($scope, $location, URL) {
            $scope.url = URL;
            $scope.goToReport = function() {
                $location.url('report/' + $scope.url.idPk);
            }
        })
        .controller('ReportCtrl', function($scope, $location, domains) {
            $scope.domains = domains;
            ;
            $scope.goToHistory = function() {
                $location.url('history/' + $scope.clicks[0].idFkUrlList);
            }
        })
        .controller('RecommendCtrl', function($scope, $location) {
                $scope.email='';
                $scope.getRecommmendation = function() {
                    $scope.user = $scope.email;
                }
        })
        ;
