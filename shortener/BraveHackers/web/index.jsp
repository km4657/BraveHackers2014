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
                <label>Your Domain:</label>
                <input type="text" ng-model="url" placeholder="ex: yourmachine:port" style="width: 1255px"> 
                <hr>
                <label>Mobile App:</label>
                <a href="http://{{url}}/index.htm"><h1>http://{{url}}/index.htm/h1></a>
                <br>
                <label>REST Test:</label>
                <a href="http://{{url}}/faces/shortener/testREST.jsp"><h3>http://{{url}}/faces/shortener/testREST.jsp</h3></a>
                <br>
                <label>CRUD App:</label>
                <a href="http://{{url}}/faces/shortener/index.xhtml"><h3>http://{{url}}/faces/shortener/index.xhtml</h3></a>
                <br>
                <label>Edit Presentation</label>
                <h3>/presentation/Mobilithon_Final_Presentation_Bravehackers.pptx</h3>

                <ul>
                    <li>Weo's: gacdtl03ml5174.itservices.sbc.com:8080</li>
                </ul>
            </div>

        </body>
    </html>
</f:view>
