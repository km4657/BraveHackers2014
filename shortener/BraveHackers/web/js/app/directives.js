'use strict';

/* Directives */


angular.module('myApp.directives', [])
        .directive('appVersion', function(version) {
            return function(scope, elm, attrs) {
                elm.text(version);
            };
        })
        .directive('tdata', function(version) {
            return {
                restrict: 'E',
                link: function(scope, element, attrs, Entity) {
                    scope.$watch('user', function(newValue, oldValue) {
                        if (newValue == undefined)
                            return;
                        if (oldValue === newValue)
                            return;
                        console.log('newvalue:' + newValue);
                        $().getRecommendations({
                            domain: 'tdata-offers.att.net',
                            consumptionEngine: 'ATTNET',
                            pageID: '1',
                            userID: scope.user,
                            userIDType: 'CTN'
                        });
                        scope.created = false;
                        scope.hasShort = false;
                    });
                }
            }
        })
        .directive('share', function(version, PostSendSms, PostGetURL, $modal, $log, $rootScope) {
            return {
                replace: 'true',
                templateUrl: '/partials/icon-row.html',
                restrict: 'E',
                link: function(scope, element, attrs) {
                    if (scope.url === undefined)
                        scope.url = {"category": "", "email": "", "expiredurl": "", "longurl": "", "urlName": "", "vanityurl": "", "description": "", "expireDate": ""};

                    if (scope.sms === undefined)
                        scope.sms = {"tn": "4044080667", "message": "TESTING"};

                    scope.hasShort = false;


                    scope.getURL = function() {

console.log("SMSSENt: scope.shorturl:" + scope.shorturl + " scope.url.longurl:" + scope.url.longurl);
scope.hasShort = true;
return;

                        if (scope.url.longurl === "")
                            return;
                        if (!scope.hasShort) {
                            var postGetURL = new PostGetURL();
                            angular.copy(scope.url, postGetURL);
                            postGetURL.$save(function(t) {
                                scope.shorturl = t.shorturl;
                                scope.hasShort = true;
                                scope.sms.message = "Check this out, I think this is perfect for you. http://att.com/r?" + scope.shorturl;
                                console.log("SMSSENt: scope.shorturl:" + scope.shorturl + " scope.url.longurl:" + scope.url.longurl);
                            });
                        }
                    }

//########## SMS Integration               
                    scope.isSMS = false;
                    var smsSent = false;
                    scope.clickedSMS = function() {
                        scope.isSMS = !scope.isSMS;
                    };

                    scope.clickedSMS = function(size) {

                        var modalInstance = $modal.open({
                            templateUrl: 'partials/sendSMS.html',
                            controller: ModalInstanceCtrl,
                            size: size,
                            resolve: {
                                SMS: function() {
                                    return scope.sms;
                                }
                            }
                        });

                        modalInstance.result.then(function() {
console.log("SMSSENt: sms.tn:" + scope.sms.tn + " message:" + scope.sms.message);
return;
                            
                            if (smsSent)
                                return;

                            var postSendSms = new PostSendSms();
                            angular.copy(scope.sms, postSendSms);
                            postSendSms.$save();
                            smsSent = true;
                        }, function() {
                            $log.info('Modal dismissed at: ' + new Date());
                        });
                    };

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

                    var ModalInstanceCtrl = function($scope, $modalInstance, SMS, $rootScope) {

                        $scope.sms = SMS;
                        $scope.sendSMS = function() {
                            $modalInstance.close();
                        };

                        $scope.cancel = function() {
                            $modalInstance.dismiss('cancel');
                        };
                    };

//########## TWITTER Integration
                    !function(d, s, id) {
                        var js, fjs = d.getElementsByTagName(s)[0];
                        if (!d.getElementById(id)) {
                            js = d.createElement(s);
                            js.id = id;
                            js.src = "https://platform.twitter.com/widgets.js";
                            fjs.parentNode.insertBefore(js, fjs);
                        }
                    }(document, "script", "twitter-wjs");

                }
            }
        })