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
                scope: {
                    user: '@'
                },
                link: function(scope, element, attrs, Entity) {
                    $().getRecommendations({
                        domain: 'tdata-offers.att.net',
                        consumptionEngine: 'ATTNET',
                        pageID: '1',
                        userID: scope.user
                    });
                }
               
            }
        });
