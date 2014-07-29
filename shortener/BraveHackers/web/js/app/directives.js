'use strict';

/* Directives */


angular.module('myApp.directives', [])
        .directive('appVersion', function(version) {
            return function(scope, elm, attrs) {
                elm.text(version);
            };
        })
        .directive('tdata', function(version) {
            return function(scope, elm, attrs) {
                $().getRecommendations({
                    domain: 'tdata-offers.att.net',
                    consumptionEngine: 'ATTNET',
                    pageID: '1',
                    userID: email;
                }
                );
            };
        })
        ;
