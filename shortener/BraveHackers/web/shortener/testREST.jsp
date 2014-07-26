<%-- 
    Document   : testREST
    Created on : Jul 25, 2014, 8:39:36 AM
    Author     : ML5174
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%@taglib prefix="f" uri="http://java.sun.com/jsf/core"%>
<%@taglib prefix="h" uri="http://java.sun.com/jsf/html"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<f:view>
<html>
    <head>
        <title>Test RESTful Web Services</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <link rel="stylesheet" href="test-resbeans.css" type="text/css"/>
        <link rel="stylesheet" href="css_master-all.css" type="text/css"/>
        <script type="text/javascript">
            //___ BASE_URL ___ will get replaced by the base url of application
            //whose resource beans needs to be tested For eg:- http://localhost:8080/SimpleServlet/
            var baseURL = "http://GACDTL03ML5174.ITServices.sbc.com:8080/webresources";
        </script>
        <script type="text/javascript" src="test-resbeans.js"></script>
    </head>
    <body>
        <div class="outerBorder">
            <div class="header">
                <div id="subheader" class="subheader"></div> <!-- sub-header -->
                <div class="banner"><img src="./images/pname.png"/></div>
            </div> <!-- header -->
            <div id="main" class="main hide">
                <table width="100%">
                    <tr>
                        <td id="leftSidebar" valign="top" colspan="4"></td>
                        <td class="seperator" valign="top"></td>
                        <td id="content" class="content" valign="top" colspan="12">
                                <div id="navigation" class="details"></div><hr>
                                <div id="request">Select a node on the navigation bar (on the left side of this page) to test.</div><hr>
                                <div id="testaction" class="ConMgn_sun4"></div>
                                <div id="testinput" class="ConMgn_sun4"></div>
                                <hr>
                                <div class="ConMgn_sun4">
                                    <table class="details">
                                        <tr><td><div id="result"></div></td></tr><tr><td height="10">&nbsp;</td></tr>
                                        <tr><td><div id="resultheaders" class="ml20"></div></td></tr><tr><td height="10">&nbsp;</td></tr>
                                    </table>
                                </div>
                        </td>
                    </tr>
                </table>
            </div> <!-- main -->
        </div> <!-- outerborder -->
	<!--<script type="text/javascript">
            var rjsConfig = {
                    isDebug: true
            };
	</script>-->
        <script language="Javascript">
            var ts = new TestSupport();
            ts.init();
        </script>
    </body>
</html>

</f:view>
