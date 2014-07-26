'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource'])
        .value('version', '0.1')
        .factory('MyURLs', function($resource) {
            return {
                urls: $resource('http://localhost:8080/r/webresources/com.att.bravehackers.redirect.urllist')
            }
        });
