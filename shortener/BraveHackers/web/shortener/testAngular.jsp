<%-- 
    Document   : testAngular
    Created on : Jul 24, 2014, 3:51:29 PM
    Author     : ML5174
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%@taglib prefix="f" uri="http://java.sun.com/jsf/core"%>
<%@taglib prefix="h" uri="http://java.sun.com/jsf/html"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<f:view>
<html ng-app>
    <head>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0-beta.16/angular.min.js"></script>
    </head>
    <body>
        <div>
            <label>Name:</label>
            <input type="text" ng-model="url" placeholder="Enter a smallURL hash">
            <hr>
            <a href="http://gardg71hh86ks1.snt.bst.bls.com:8080/r?{{url}}"><h1>http://att.com/r?{{url}}</h1></a>
            
        </div>
        
    </body>
</html>
</f:view>
