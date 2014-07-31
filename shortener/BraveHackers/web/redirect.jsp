<%-- 
    Document   : testAngular
    Created on : Jul 24, 2014, 3:51:29 PM
    Author     : ML5174
--%>

<%@page 
    import="com.att.bravehackers.redirect.UrlList"
    contentType="text/html" pageEncoding="UTF-8"%>

<%@taglib prefix="f" uri="http://java.sun.com/jsf/core"%>
<%@taglib prefix="h" uri="http://java.sun.com/jsf/html"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<f:view>
    <html ng-app>
        <head>
            <title>I Can Help You With That.</title>
            <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0-beta.16/angular.min.js"></script>
        </head>
        <body>
            <h1>I can help you with that.</h1>

            <h3><%=((UrlList)request.getAttribute("URL")).getDescription()%></h3>
            <form action="<%=((UrlList)request.getAttribute("URL")).getLongurl()%>">
                <input type="submit" value="Next >">
            </form>
                
            
<a href="https://twitter.com/share" class="twitter-share-button" data-lang="en">Tweet</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>    
        </body>
    </html>
</f:view>
