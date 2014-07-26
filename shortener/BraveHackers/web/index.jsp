<%-- 
    Document   : index
    Created on : Jul 25, 2014, 10:29:39 AM
    Author     : ML5174
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%@taglib prefix="f" uri="http://java.sun.com/jsf/core"%>
<%@taglib prefix="h" uri="http://java.sun.com/jsf/html"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<f:view>
    <html lang="en">
        <head>
            <title>{{PAGE_TITLE}}</title>	
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="apple-web-app-capable" content="yes">
            <meta name="format-detection" content="telephone=no">


            <link href="{{ URL OF PAGE }}" rel="canonical">
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
            <script src="js/jquery.min.js"></script>
            <script src="js/global-sandbox.js"></script>
            <script src="js/mobileMenuShunt-1.0.js"></script>
            <script src="js/list.min.js"></script>

        </head>
        <body>
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
                    </nav>
                </header>
                <section class="row main-content">
                    <div class="span12">
                        <div class="page-header">
                            <h1>URL Shortener</h1>
                            <div class="pull-right">
                                <p>{{Label:}} <a href="#">{{Link}}</a></p>
                            </div>
                        </div>
                        <hr class="hr-large">

                        <div class="row-fluid-nowrap content-pad">
                            <div class="span12">
                                <button class="btn btn-large btn-large btn-block" type="button">Create URL</button>
                            </div>

                        </div>
                        <hr class="hr-large">
                        <div class="row-fluid" id="link-list"> 

                            <div style="background-color: #f2f2f2; padding:10px 15px">
                                <input type="text" placeholder="Filter Links" class="search searchInput ui-input-text ui-body-c" />
                            </div>				 

                            <hr class="hr-large">

                            <ul class="list">
                                <li class="section-heading">AT&amp;T</li>
                                <li><a href="#" class="shorturl">link1</a></li>
                                <li><a href="#" class="shorturl">link2</a></li>
                                <li class="section-heading">Section heading</li>
                                <li><a href="#" class="shorturl">link1</a></li>
                                <li><a href="#" class="shorturl">link2</a></li>
                            </ul>


                        </div>
                        <script type="text/javascript">


                            var options = {
                                valueNames: ['shorturl']
                            };

                            var shorturlList = new List('link-list', options);

                        </script>
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
        </body>
    </html>
</f:view>
