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
                
                <ul>
                 <li ng-click="url='gacdtl03ml5174.itservices.sbc.com:8080'">Click to use Weo's: gacdtl03ml5174.itservices.sbc.com:8080</li>
                 <li ng-click="url='gacdt201km4657.itservices.sbc.com:8080'">Click to use Kelley's: gacdt201km4657.itservices.sbc.com:8080</li>
                 <li ng-click="url='njcdtl02mr271r.itservices.sbc.com:8080'">Click to use Maria's: njcdtl02mr271r.itservices.sbc.com:8080</li>
                </ul>
                
                <hr>
                <label>This page with your domain:</label>
                <a href="http://{{url}}/faces/index.jsp">http://{{url}}/faces/index.jsp</a>
                <br>
                <label>Mobile App:</label>
                <a href="http://{{url}}/faces/index.html">http://{{url}}/faces/index.html</a>
                <br>
                <label>REST Test:</label>
                <a href="http://{{url}}/faces/shortener/testREST.jsp">http://{{url}}/faces/shortener/testREST.jsp</a>
                <br>
                <label>Edit Presentation</label>/presentation/Mobilithon_Final_Presentation_Bravehackers.pptx
                <br>
                <label>See Latest Commits</label><a href="https://codecloud.web.att.com/projects/ST_MCOEMT/repos/team04/commits">CodeCloud</a>

                
                TODO LIST:
                <ul>
                    <li>Remove CRUD Completely.</li>
                </ul>
            </div>

        </body>
    </html>
</f:view>
