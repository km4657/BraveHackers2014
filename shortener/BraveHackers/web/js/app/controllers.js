'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngResource'])
        .controller('HomeCtrl', function($scope, URLs) {
            $scope.categories = ['Uverse', 'Wireless', 'DigitalLife', 'Business', 'Other'];
            $scope.urls = URLs;
        })
        .controller('CreateCtrl', function($scope, $location, PostGetURL, PostSendSms) {
            $scope.categories = ['Uverse', 'Wireless', 'DigitalLife', 'Business', 'Other'];
            $scope.sms = {"tn": "", "message": "Check this out, I think this is perfect for you."};
            $scope.url === undefined
            
            $scope.goHome = function() {
                $location.url('home')
            };            

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
            $scope.sms = {"tn": "", "message": "Check this out, I think this is perfect for you."};
            $scope.url = URL;           
            $scope.shorturl=$scope.url.shorturl;
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
        .controller('RecommendCtrl', function($scope, $location, PostGetURL) {
            $scope.url = {"category": "Other", "longurl": $("#link").attr("href"), "urlName": "Recommendation", "description": "This product is tailored to you."};
            $scope.sms = {"tn": "", "message": "Check this out, I think this is perfect for you."};
            $scope.getRecommmendation = function() {
                $scope.user = $scope.sms.tn;
            }
            $scope.$watch(function() {
                return $("#link").attr("href")
            }, function(newValue, oldValue) {
                if (newValue == undefined)
                    return;
                if (oldValue === newValue)
                    return;
                console.log('newvalue:' + newValue);
            })

        })
        ;
