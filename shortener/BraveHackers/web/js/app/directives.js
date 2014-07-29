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
                        console.log('newvalue:' + newValue);
                        $().getRecommendations({
                            domain: 'tdata-offers.att.net',
                            consumptionEngine: 'ATTNET',
                            pageID: '1',
                            userID: scope.user
                            
                        });
                    });
                }
            }
        });
