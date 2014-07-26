'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource'])
        .value('version', '0.1')
        .factory('MyURLs', function($resource) {
            return {
                getClicks: $resource('http://localhost:8080/r/webresources/com.att.bravehackers.redirect.clicks/query?idFk=:id', {idFk:'@id'}, {
                    get: {method: "GET", isArray: true}
                }),
                selectedURL: $resource('http://localhost:8080/r/webresources/com.att.bravehackers.redirect.urllist/:id', {id:'@id'}, {
                    get: {method: "GET", isArray: false}
                }),
                myURLs: $resource('http://localhost:8080/r/webresources/com.att.bravehackers.redirect.urllist/query?email=weolopez@yahoo.com', {}, {
                    get: {method: "GET", isArray: true}
                })
            }
        });
