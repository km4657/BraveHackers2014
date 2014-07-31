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
                        if (newValue == undefined)
                            return;
                        $().getRecommendations({
                            domain: 'tdata-offers.att.net',
                            consumptionEngine: 'ATTNET',
                            pageID: '1',
                            userID: scope.user,
                            userIDType: 'CTN'
                        });
                    });
                }
            }
        })
        .directive('share', function(version) {
            return {
                replace: 'true',
                template: '<a href="https://twitter.com/share" class="twitter-share-button" data-lang="en">Tweet</a>',
                restrict: 'E',
                link: function(scope, element, attrs, Entity) {
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