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
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>I Can Help You With That.</title>
            <meta name="description" content="">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="css/normalize.css">
            <link rel="stylesheet" href="css/main.css">
            <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
            <script src="//cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.2/modernizr.js"></script>

        	
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="apple-web-app-capable" content="yes">
            <meta name="format-detection" content="telephone=no">


            <!--link href=" URL OF PAGE" rel="canonical"-->
            <!-- non-retina iPhone pre iOS 7 -->
            <link rel="apple-touch-icon" href="images/icon-57.png" sizes="57x57">
            <!-- non-retina iPad pre iOS 7 -->
            <link rel="apple-touch-icon" href="images/icon-72.png" sizes="72x72">
            <!-- non-retina iPad iOS 7 -->
            <link rel="apple-touch-icon" href="images/icon-76.png" sizes="76x76">
            <!-- retina iPhone pre iOS 7 -->
            <link rel="apple-touch-icon" href="images/icon-114.png" sizes="114x114">
            <!-- retina iPhone iOS 7 -->
            <link rel="apple-touch-icon" href="images/icon-120.png" sizes="120x120">
            <!-- retina iPad pre iOS 7 -->
            <link rel="apple-touch-icon" href="images/icon-144.png" sizes="144x144">
            <!-- retina iPad iOS 7 -->
            <link rel="apple-touch-icon" href="images/icon-152.png" sizes="152x152">
            <script>
                (function() {
                    if ("-ms-user-select" in document.documentElement.style && navigator.userAgent.match(/IEMobile\/10\.0/)) {
                        var msViewportStyle = document.createElement("style");
                        msViewportStyle.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}"));
                        document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
                    }
                })();
            </script>
            <!--[if lt IE 9]>
                <script src="js/respond.js"></script>
                <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
            <![endif]-->
            <link href="css/sandbox-styles.css" rel="stylesheet">
            <link rel="stylesheet" href="css/app.css"/>
            <script src="http://code.jquery.com/jquery-2.1.1.js"></script>
            <script src="js/global-sandbox.js"></script>
            <script src="js/mobileMenuShunt-1.0.js"></script>
            <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0-beta.16/angular.min.js"></script>
        </head>
        <body ng-app>
            <%
                String description="Default Description Text.";
                   String link="http://www.att.com";
                if (request.getAttribute("URL")!=null) {
                    description = ((UrlList)request.getAttribute("URL")).getDescription();
                    link = ((UrlList)request.getAttribute("URL")).getLongurl();
                }
            %>
            <div data-role="page" class="container">
                <header class="row navbar globalNav component header" role="banner" data-role="header" data-backbtn="false">
                    <div class="headerBack"> </div>
                    <div class="navSpans clearfix">
                        <div id="logoHolder"> <a href="/" class="cssIcon-globe" data-transition="slide">at&amp;t home</a> </div>
                    </div>
                    <nav>
                        <div class="mine">tst01.stage.att.com</div>
                        <script type="text/javascript">
                        // variables needed by the mobile nav and mobile search 
                        // Must point to prod before push.
                        //var mobileMenu_ecomName='tst01.stage.att.com', 
                        //mobileMenu_dssName='https://dssqa-m.stage.att.com', 
                        var mobileMenu_ecomName = 'm.att.com',
                        mobileMenu_dssName = 'https://m.att.com',
                        // Choose which results to display. Leave blank for all results
                        searchSilo = "shop";
                        var g_hideSearch = 'true';


                        </script>
                        <div style="display: none;" class="dssLinkConfiguration">
                            <p id="dssEntryUrl">https://dssqa-m.stage.att.com/myatt/dss.action?refId=SANDBOX_BASED_SITE</p>
                        </div>

                        <ul class="menu">
                            <li><a href="#/view1">view1</a></li>
                            <li><a href="#/view2">view2</a></li>
                        </ul>
                    </nav>
                </header>
                <!--[if lt IE 7]>
                    <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
                <![endif]-->
                <section class="row main-content">
                    <div class="span12">
                        <div class="page-header">
                            <div class="pull-left">
                            </div>
                            <h1>I can help you with that</h1>
                            
                        </div>
                        <div class="row-fluid-nowrap content-pad">
                                
                                <h3><%= description %></h3>
                                <form action="<%= link %>">
                                    <button type="submit" class="btn btn-large btn-large btn-block">
                                        Next >
                                    </button>
                                </form>
                        </div>
                    </div>
                </section>
                <footer>
                <div id="footerNav" data-role="navbar" data-theme="d" class="component">
                    <div class="ui-grid-b">
                        <div class="ui-block-a footerTab1">
                            <p> <a href="#">ATT.NET</a> </p>
                        </div>
                        <div class="ui-block-b footerTab2">
                            <p> <a href="#">BUSINESS</a> </p>
                        </div>
                        <div class="ui-block-c footerTab3">
                            <p> <a href="#">ABOUT AT&amp;T</a> </p>
                        </div>
                    </div>
                </div>
                <div id="footerBtm" class="component">
                    <ul>
                        <li><a href="//www.att.com/" data-ajax="false">FULL SITE</a></li>
                        <li><a href="//www.att.com/gen-mobile/privacy-policy?pid=2506" data-transition="slide">PRIVACY</a></li>
                        <li><a href="//www.att.com/gen-mobile/general?pid=11561" data-transition="slide">TERMS OF USE</a></li>
                    </ul>
                    <ul>
                        <li><a href="contact.m.html" data-transition="slide">CONTACT US</a></li>
                        <li><a href="//www.att.com/gen-mobile/privacy-policy?pid=2506" data-transition="slide">LEGAL</a></li>
                    </ul>
                    <p> <a href="//www.att.com/gen-mobile/privacy-policy?pid=2587">&copy; 2013 AT&amp;T Intellectual Property.</a> All rights reserved. </p>
                </div>
            </footer>
                    
                    
                    
                    
            </div>
</f:view>
