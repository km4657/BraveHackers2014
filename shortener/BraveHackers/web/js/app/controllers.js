'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngResource'])
        .controller('HomeCtrl', function($scope, URLs) {
            $scope.categories = ['Uverse', 'Wireless', 'DigitalLife', 'Business', 'Other'];
            $scope.urls = URLs;
        })
        .controller('CreateCtrl', function($scope, $location, PostGetURL, PostSendSms) {
            $scope.buttonLabel = 'Get URL';
            $scope.url = {"category": "", "email": "", "expiredurl": "", "longurl": "", "urlName": "", "vanityurl": "", "description": "", "expireDate": ""};
            $scope.categories = ['Uverse', 'Wireless', 'DigitalLife', 'Business', 'Other'];
            $scope.shorturl = 'Get URL';
            $scope.sms = {"tn": "4044080667", "message": "TESTING"};
            var created = false;
            $scope.getURL = function() {
                if (!created) {
                    var postGetURL = new PostGetURL()
                    angular.copy($scope.url, postGetURL);
                    postGetURL.$save(function(t) { 
                        $scope.shorturl = t.shorturl;
                        created = true;
                        $scope.buttonLabel = 'Preview http://att.com/'+$scope.shorturl;
                    });
                } else 
                    $location.url('/r?'+$scope.shorturl);
            }
            $scope.goHome = function() {$location.url('home')};
            
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
        .controller('DetailsCtrl', function($scope, $location, URL) {
            $scope.url = URL;
            $scope.goToReport = function() {
                $location.url('report/' + $scope.url.idPk);
            }
        })
        .controller('ReportCtrl', function($scope, $location, $route, domains) {
            $scope.domains = domains;
            $scope.goToDetails = function() {
                $location.url('details/' + $route.current.params.id);
            }
        })
        .controller('RecommendCtrl', function($scope, $location) {
            $scope.email = '';
            $scope.getRecommmendation = function() {
                $scope.user = $scope.email;
            }
        })
        ;
