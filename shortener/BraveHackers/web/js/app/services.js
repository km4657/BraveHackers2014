'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource'])
        .value('version', '0.1')
        .factory('MyURLs', function($resource) {
            return {
                getClicks: $resource('/webresources/com.att.bravehackers.redirect.clicks/query?idFk=:id', {idFk:'@id'}, {
                    get: {method: "GET", isArray: true}
                }),
                getDomains: $resource('/webresources/com.att.bravehackers.redirect.clicks/domainInfo?idFk=:id', {idFk:'@id'}, {
                    get: {method: "GET", isArray: true}
                }),
                selectedURL: $resource('/webresources/com.att.bravehackers.redirect.urllist/:id', {id:'@id'}, {
                    get: {method: "GET", isArray: false}
                }),
                myURLs: $resource('/webresources/com.att.bravehackers.redirect.urllist', {}, {
                    get: {method: "GET", isArray: true}
                })
            }
        })
        .factory('PostGetURL', function($resource) {
            return $resource('/webresources/com.att.bravehackers.redirect.urllist',{} , {
                        post: {
                            headers: {
                                'Content-Type':'application/json'
                            }                           
                        }
                    })
            }
        )
        .factory('PostSendSms', function($resource) {
            return $resource('/webresources/com.att.bravehackers.sms.sms',{} , {
                        post: {
                            headers: {
                                'Content-Type':'application/json'
                            }                           
                        }
                    })
            }
        );
