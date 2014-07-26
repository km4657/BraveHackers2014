/*global location, window, alert, document, localStorage, console, jQuery, getGeo, setTimeout, clearTimeout, dcsMultiTrack, Webtrends, scrollWin, CQURLInfo, g_searchResultsPage, searchSilo, g_hideSearch, getDeviceGeo, navigator, searchTerm, mobileMenu_dssName, mobileMenu_ecomName, ATTMobileGlobalFunctions, redirectToStoreLocator, regexp: false, plusplus: false*/
/* AT&T mobile app ecosystem menu utility - Andrew Burgess ab5284@att.com */
/**
 * Functionality related to mobile nav.
 *
 * @namespace Contains functionality for the mobile nav.
 * @param {jQuery} $ Global jQuery object
 */
var ATTMobileMenuShunt = (function ($) {
	"use strict";

	var init,
		prependEcomLinkLocation,
		prependDssLinkLocation,
		callRestService,
		shuntMenuContents,
		getMenuItemURLHostName,
		getMenuGroupWithTitleHTML,
		getMenuGroupWithTitleHTMLOtherDomain,
		getMenuGroupHTML,
		getFindAStoreMenuItemHTML,
		getContactUsMenuItemHTML,
		getMenuItemHTML,
		getMenuPivotHTML,
		getMenuEndHTML,
		menuBuilder,
		getUrlParams,
		closeMobileSlideMenu,
		invokeWebTrendsReporting,
		defaultHeight,
		pageHeight,
		portHeight,
		clkBlocker,
		getNativeCookie,
		requiresSupportLib = false;

	/**
	 * getMenuItemURLHostName - returns hostname depending on application name
	 * @memberOf ATTMobileMenuShunt
	 * @name getMenuItemURLHostName
	 * @private
	 * @param  {string} app type of application. app value determines returned dss, ecom or json hostname.
	 * @return {string} hostname that matches the app type.
	 */
	getMenuItemURLHostName = function (app) {
		var hostname;

		// are we dealing with the ecom application?
		if (app === 'ecom') {

			// yes, lets see if the ecom domain name is defined
			if (typeof mobileMenu_ecomName !== 'undefined') {

				// it is, so lets use it.
				hostname = mobileMenu_ecomName;

			// no, lets check if we are on localhost
			} else if (window.location.hostname === 'localhost') {

				// we are, so lets use localhost:[port]
				hostname = 'localhost' + window.location.port;

				// no, we aren't on localhost either
			} else {

				// lets use the production default (we might want to get this value from JSP/CQ)
				hostname = 'm.att.com';
			}

		// no, we are not. Are we dealing with the dss application?
		} else if (app === 'dss') {

			// yes, lets see if the dss domain name is defined
			if (typeof mobileMenu_dssName !== 'undefined') {


				// it is, so lets use it.
				hostname = mobileMenu_dssName;

			// no, the dss hostname is not defined
			} else {

				// lets use the production default (make this dynamic)
				hostname = 'm.att.com';
			}

		// no we are not. Are we dealing with a json application?
		} else if (app === 'json') {

			// yes, lets see if the ecom hostname is defined
			if (typeof mobileMenu_ecomName !== 'undefined') {

				// yes, it is. Lets use the hostname.
				hostname = mobileMenu_ecomName;

			// no, it isn't.
			} else {

				// lets use the production default (make this dynamic)
				hostname = 'm.att.com';
			}
		}
		if (hostname.indexOf('http') === -1) {
			hostname = location.protocol + '//' + hostname;
		}
		// return the hostname
		return hostname;
	};

	/**
	 * Load a JSON resource by creating a script tag and appending it to the document body.
	 *
	 * @memberOf ATTMobileMenuShunt
	 * @name callRestService
	 * @private
	 * @param  {string} resource the url of the JSON file
	 * @return {undefined}
	 */
	callRestService = function (resource, fType) {
		var script,
			style;
		if (fType === 'js') {
			// create the script element
			script = document.createElement("script");
			// set the script elements attributes
			script.setAttribute("type", "text/javascript");
			script.setAttribute("src", resource);
			// append the script element
			document.body.appendChild(script);
		} else if (fType === 'css') {
			// create the link element
			style = document.createElement("link");
			// set the link elements attributes
			style.setAttribute("rel", "stylesheet");
			style.setAttribute("href", resource);
			// append the link element
			document.body.appendChild(style);
		}
	};
	/**
	 * Web trends reporting for mobile global nav menu items
	 * dcsMultitrack call is deferred until the target URL is loaded.
	 * Call dcsMultitrack for web trends older version and Webtrends.multiTrack for version 10, i.e. for DSS.
	 * This is to prevent inaccurate reporting data due to issue of dcs.gif call getting aborted as the target URL loads before the gif load completes.
	 * @memberOf ATTMobileMenuShunt
	 * @name invokeWebTrendsReporting
	 * @private
	 * @return {undefined}
	 */
	invokeWebTrendsReporting = function () {
		var navMenuClickStreamArr = JSON.parse(localStorage.getItem('navMenuClickStream')),
			poll,
			timeout = 20;

		// Poll to see if dcsMultiTrack function is ready. If yes, call dcsMultitrack with params stored in localStorage.
		poll = function () {
			setTimeout(function () {
				timeout -= 1;
				if (typeof dcsMultiTrack !== 'undefined') {
					dcsMultiTrack.apply(this, navMenuClickStreamArr);
					//Remove navMenu reporting items from local storage after values are send to web trends server.
					localStorage.removeItem('navMenuClickStream');
				} else if (typeof Webtrends !== 'undefined') {
					Webtrends.multiTrack({
						argsa: navMenuClickStreamArr
					});
				//Remove navMenu reporting items from local storage after values are send to web trends server.
					localStorage.removeItem('navMenuClickStream');
				} else if (timeout > 0) {
					poll();
				} else {
					return;
				}
			}, 1000);
		};
		poll();
	};
	/**
	 * inject menu contents into the DOM and bind click events for the find-a-store link.
	 *
	 * @memberOf ATTMobileMenuShunt
	 * @name shuntMenuContents
	 * @private
	 * @param  {string} htmlString the parsed and ready to inject HTML for the menu contents
	 * @return {undefined}
	 */
	shuntMenuContents = function (htmlString) {
		var androidversion, menuHeight, ua;
		// restructure menu bar for side menu
		// remove existing button across apps, and replace with one of a different ID/Class name since jqm will not allow us to modify the attributes reliably
		$('.menuIcon').remove();
		$('#menuIcon').remove();
		$('div[id=logoHolder]').each(function () {
			$('<div class="menuIcon" id="menuIcon"><a href="#" class="toggleMenuMain iconMenu"><div id="iconMenu">Menu</div></a></div>').insertAfter($(this));
		});
		// inject the markup to hold the side menu
		if ($('div[data-role="page"]').length > 1) {
			$('div[data-role="page"]:first').prepend('<div id="outerMMW" style="height:0px;oveflow:scroll;display:none;"><div id="menuMainSlider"><div class="menuWedge"></div><div id="menuWrapper" role="navigation"></div></div></div>');
		} else {
			$('div[data-role="page"]').prepend('<div id="outerMMW" style="height:0px;oveflow:scroll;display:none;"><div id="menuMainSlider"><div class="menuWedge"></div><div id="menuWrapper" role="navigation"></div></div></div>');
		}

		// workaround for the indicator wedge on android 2.x, browser does not support fixed positioning
		ua = navigator.userAgent;
		if (ua.indexOf("Android") >= 0) {
			androidversion = parseFloat(ua.slice(ua.indexOf("Android") + 8));
			//if (androidversion < 3) {
			$('.menuWedge').css({'position': 'absolute'});
			//}
		}
		pageHeight = $('div[data-role="page"]').height();
		menuHeight = $('#menuWrapper').height();
		portHeight = $(window).height();
		defaultHeight = pageHeight;
		clkBlocker = function (event) {
			event.preventDefault();
		};

		// toggle for menu button
		$('.toggleMenuMain').toggleFuncs(function () {
			$('#iconMenu').html('[Menu Open]');
			$('#outerMMW').show();
			$("#menuMainSlider").animate({right: "0px" }, 300, function () {});
			$('div[data-role="page"]').animate({left: "-270px" }, 300, function () {});
			$('div[data-role="page"] a.ui-link-inherit').bind('click', clkBlocker);
			if (pageHeight > portHeight) {
				$('div[data-role="page"]').css({'min-height': portHeight, 'max-height': portHeight, 'overflow': 'hidden' });
			} else {
				$('div[data-role="page"]').css({'overflow': 'hidden' });
			}
			$('body').addClass('bodyBG');
		}, function () {
			$("#menuMainSlider").animate({right: "-270px" }, 300, function () {});
			$('div[data-role="page"]').animate({left: "0px" }, 300, function () {
				$('#iconMenu').html('[Menu]');
				$('#outerMMW').hide();
			});
			if (pageHeight > portHeight) {
				$('div[data-role="page"]').css({'min-height': defaultHeight, 'max-height': '100%', 'overflow': 'visible' });
			} else {
				$('div[data-role="page"]').css({'overflow': 'visible' });
			}
			$('div[data-role="page"] a.ui-link-inherit').unbind('click', clkBlocker);
			$('body').removeClass('bodyBG');
		});

		// inject the html into the #menuWrapper element and trigger a 'create' event to update the jQM look-and-feel.
		$('#menuWrapper').html(htmlString);
		//$('#menuWrapper').trigger("create");
		$('#outerMMW').prependTo($('body'));

		// If global nav reporting tags are in local storage, execute function for web trends reporting.
		if (localStorage.getItem('navMenuClickStream') !== null) {
			invokeWebTrendsReporting();
		}

		// On global nav menu click, store reporting tags to local storage as immediate dcsMultiTrack dcs.gif call gets aborted in new browsers.
		// Stored in local storage until it is send to webtrends server on target page load.
		$("#menuWrapper").delegate("a", "click", function () {
			var appname =  location.pathname.split('/')[1],
				navReportingTagsArray =
						["DCS.dcssip", location.hostname,
						"DCS.dcsuri", $(this).attr('href'),
						"DCS.dcsref", location.href,
						"DCSext.wtEvent", appname + "touch",
						"DCSext.wtLinkName",  $(this).text(),
						"DCSext.wtLinkLoc", "GLBN",
						"DCSext.wtNoHit", "1",
						"DCSext.wtPN", document.title
						];
			localStorage.setItem('navMenuClickStream', JSON.stringify(navReportingTagsArray));
		});

		// bind the click event for the find-a-store link to the geolocation function.
		$('#storesFindStoreLinkMenu').click(function (event) {

			// Is the geolocation function already existing?
			if (!requiresSupportLib) {

				// then lets call it
				getGeo();

			// no, it's not existing.
			} else {

				// call the mobile global version of the geolocation function
				ATTMobileGlobalFunctions.getGeoForSL();
			}
			event.preventDefault();
		});

		// bind the click event for the contactUs link to the geolocation function.
		$('#contactUsLinkMenu').click(function (event) {

			// Is the geolocation function already existing?
			if (!requiresSupportLib) {

				// then lets call it
				getDeviceGeo('state');

			// no, it's not existing.
			} else {

				// call the mobile global version of the geolocation function
				ATTMobileGlobalFunctions.getGeoForCU();
			}
			event.preventDefault();
		});


		// fire an event that lets other javascript know that the mobile menu was injected
		$('body').trigger('mobileMenuShunted');

	};



	/**
	 * html template for menu group with title
	 *
	 * @memberOf ATTMobileMenuShunt
	 * @name getMenuGroupWithTitleHTML
	 * @private
	 * @param  {string} groupUUID UUID for webtrends tracking
	 * @param  {string} domain domain for the menu group link
	 * @param  {string} groupUrl root relative url for the menu group link
	 * @param  {string} groupTitle title to display for the menu group
	 * @return {string} html for a menu group with title
	 */
	getMenuGroupWithTitleHTML = function (groupUUID, domain, groupUrl, groupTitle) {
		var html = '';
		html += '<ul class="noDivider ui-listview ui-listview-inset ui-corner-all ui-shadow" data-role="listview" data-inset="true" data-theme="c" data-dividertheme="b">';
		html += '<li class="grayMenuButton ui-btn ui-btn-up-c ui-btn-icon-right ui-li-has-arrow ui-li ui-corner-top" data-theme="c"><div class="ui-btn-inner ui-li ui-corner-top"><div class="ui-btn-text"><a style="width: 80%;" id="' + groupUUID + '" href="' + domain + groupUrl + '" data-ajax="false" class="ui-link-inherit">' + groupTitle + '</a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow"></span></div></li>';

		return html;
	};

	/**
	 * html template for menu group
	 *
	 * @memberOf ATTMobileMenuShunt
	 * @name getMenuGrouHTML
	 * @private
	 * @return {string} html for a menu group
	 */
	getMenuGroupHTML = function () {
		return '<ul class="grayListButtons ui-listview ui-listview-inset ui-corner-all ui-shadow" data-role="listview" data-inset="true" data-theme="c" data-dividertheme="b">';
	};

	/**
	 * html template for menu group on a diff. domain
	 *
	 * @memberOf ATTMobileMenuShunt
	 * @name getMenuGroupWithTitleHTMLOtherDomain
	 * @private
	 * @return {string} html for a menu group
	 */
	getMenuGroupWithTitleHTMLOtherDomain = function (groupUUID, groupUrl, groupTitle) {
		var html = '';
		html += '<ul class="noDivider ui-listview ui-listview-inset ui-corner-all ui-shadow" data-role="listview" data-inset="true" data-theme="c" data-dividertheme="b">';
		html += '<li class="grayMenuButton ui-btn ui-btn-up-c ui-btn-icon-right ui-li-has-arrow ui-li ui-corner-top" data-theme="c"><div class="ui-btn-inner ui-li ui-corner-top"><div class="ui-btn-text"><a style="width: 80%;" id="' + groupUUID + '" href="' + groupUrl + '" data-ajax="false" class="ui-link-inherit">' + groupTitle + '</a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow"></span></div></li>';

		return html;
	};

	/**
	 * html template for find-a-store menu item
	 *
	 * @memberOf ATTMobileMenuShunt
	 * @name getFindAStoreMenuItemHTML
	 * @private
	 * @param  {string} itemTitle UUID for webtrends tracking
	 * @return {string} html for a find-a-store menu item
	 */
	getFindAStoreMenuItemHTML = function (itemUrl, domain, itemTitle) {
		return '<li data-icon="false" data-theme="c" class="ui-btn ui-btn-up-c ui-btn-icon-right ui-li ui-corner-all"><div class="ui-btn-inner ui-li ui-corner-top"><div class="ui-btn-text"><a class="ui-link-inherit" style="width: 80%;" id="storesFindStoreLinkMenu" href="' + domain + itemUrl + '"data-ajax="false">' + itemTitle + '</a></div></div></li>';
	};

	/**
	 * html template for contact us menu item
	 *
	 * @memberOf ATTMobileMenuShunt
	 * @name getContactUsMenuItemHTML
	 * @private
	 * @param  {string} itemTitle UUID for webtrends tracking
	 * @return {string} html for a find-a-store menu item
	 */
	getContactUsMenuItemHTML = function (itemUrl, itemTitle) {
		return '<li data-icon="false" data-theme="c" class="ui-btn ui-btn-up-c ui-btn-icon-right ui-li ui-corner-all"><div class="ui-btn-inner ui-li ui-corner-top"><div class="ui-btn-text"><a class="ui-link-inherit" style="width: 80%;" id="contactUsLinkMenu" href="' + itemUrl + '" data-ajax="false">' + itemTitle + '</a></div></div></li>';
	};

	/**
	 * html template for menu item
	 *
	 * @memberOf ATTMobileMenuShunt
	 * @name getMenuItemHTML
	 * @private
	 * @param  {string} itemUUID UUID for webtrends tracking
	 * @param  {string} domain domain for the menu group link
	 * @param  {string} itemUrl root relative url for the menu item link
	 * @param  {string} itemTitle title to display for the item group
	 * @return {string} html for a menu item
	 */
	getMenuItemHTML = function (itemUUID, domain, itemUrl, itemTitle) {
		return '<li data-theme="c" class="ui-btn ui-btn-up-c ui-btn-icon-right ui-li ui-corner-all"><div class="ui-btn-inner ui-li ui-corner-top"><div class="ui-btn-text"><a class="ui-link-inherit" style="width: 80%;" id="' + itemUUID + '" href="' + domain + itemUrl + '"data-ajax="false">' + itemTitle + '</a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow"></span></div></li>';
	};

	/**
	 * html template for menu pivot
	 *
	 * @memberOf ATTMobileMenuShunt
	 * @name getMenuPivotHTML
	 * @private
	 * @param  {string} pivotUUID UUID for webtrends tracking
	 * @param  {string} domain domain for the menu group link
	 * @param  {string} pivotUrl root relative url for the menu item link
	 * @param  {string} pivotTitle title to display for the item group
	 * @return {string} html for a menu pivot
	 */
	getMenuPivotHTML = function (pivotUUID, domain, pivotUrl, pivotTitle) {
		return '<li data-icon="false" data-theme="c" class="ui-btn ui-btn-up-c ui-btn-icon-right ui-li ui-corner-all"><div class="ui-btn-inner ui-li ui-corner-top"><div class="ui-btn-text"><a class="ui-link-inherit" style="width: 80%;" id="' + pivotUUID + '" href="' + domain + pivotUrl + '"data-ajax="false">' + pivotTitle + '</a></div></div></li>';
	};

	/**
	 * html template for the end of the menu
	 *
	 * @memberOf ATTMobileMenuShunt
	 * @name getMenuEndHTML
	 * @private
	 * @return {string} html for the menu end
	 */
	getMenuEndHTML = function () {
		return '</ul>';
	};

	/**
	 * parse the menu JSON and build the menu HTML from it, then store the complete string in localStorage
	 * @memberOf ATTMobileMenuShunt
	 * @name menuBuilder
	 * @public
	 * @param  {object} menuContent JSON object that represents the menu content
	 * @return {undefined}
	 */
	menuBuilder = function (menuContent) {
		var menuInnerHTMLBuilder = '',
			isPivot = false,
			menuGroupUUID,
			menuGroupURL,
			menuItemUUID,
			uriPrepend,
			i,
			n;

		// loop through each menu group within the json object
		for (i = 0; i < menuContent.menu.menuGroup.length; i += 1) {

			// is this the first menu group? real questions: is this dss content?
			// !!! This should NOT rely on the menu id, what if the menu structure gets changed? !!!
			if (menuContent.menu.menuGroup[i].id === 'myATT') {

				uriPrepend = prependDssLinkLocation;


			} else {

				// no, use the ecom domain
				uriPrepend = prependEcomLinkLocation;
			}

			// create a universally unique identifier for webtrends
			menuGroupUUID = 'mg' + i + menuContent.menu.menuGroup[i].id;

			// does the menu group have a title?
			if (menuContent.menu.menuGroup[i].value) {

				// yes, set a hash as default url for the title
				menuGroupURL = '#';

				// does the menu group have an href?
				if (menuContent.menu.menuGroup[i].href) {

					// yes, set the href value as url for the title
					menuGroupURL = menuContent.menu.menuGroup[i].href;
					if (menuGroupURL.indexOf('m.att.com') !== -1) {
						uriPrepend = '';
					}
				}

				// add the html for a menu group with title
				if (menuGroupURL.indexOf('http') !== -1) {
					menuInnerHTMLBuilder += getMenuGroupWithTitleHTMLOtherDomain(menuGroupUUID, menuGroupURL, menuContent.menu.menuGroup[i].value);
				} else {
					menuInnerHTMLBuilder += getMenuGroupWithTitleHTML(menuGroupUUID, uriPrepend, menuGroupURL, menuContent.menu.menuGroup[i].value);
				}
			} else {

				// add the html for a new menu group
				menuInnerHTMLBuilder += getMenuGroupHTML();
			}

			// loop through each of the menu items under a menu group
			for (n = 0; n < menuContent.menu.menuGroup[i].menuItem.length; n += 1) {

				// is this the last menu group? What is really asked is: "Are these pivot links".
				// !!! This should NOT rely on the menu id, what if the menu structure gets changed? !!!
				if (menuContent.menu.menuGroup[i].id === 'pivots') {

					// yes, this is a pivot. lets remove the chevron and smallTextButton class
					isPivot = true;
				} else {

					// no, lets leave the chevron and make the link a act like a button
					isPivot = false;
				}

				// is this the first menu group? real questions: is this dss content?
				// !!! This should NOT rely on the menu id, what if the menu structure gets changed? !!!
				if (menuContent.menu.menuGroup[i].id === 'myATT') {

					// Is this the second (or higher) item?
					// !!! This should NOT rely on the Nth item to make a decision. Lets add some structure
					// that we can test against. !!!
					if (n > 1) {

						// yes, lets use the ecom domain
						uriPrepend = prependEcomLinkLocation;
					}
				}

				// create a universally unique identifier for webtrends
				menuItemUUID = 'mI' + menuContent.menu.menuGroup[i].id + n;

				// is this the find-a-store link? We might want to go of a different structure for this,
				// as links and link titles change.
				if (menuContent.menu.menuGroup[i].menuItem[n].id === 'findAStore') {

					// yes, lets add the find-a-store link html
					menuInnerHTMLBuilder += getFindAStoreMenuItemHTML(menuContent.menu.menuGroup[i].menuItem[n].href, uriPrepend, menuContent.menu.menuGroup[i].menuItem[n].value);

				} else if (menuContent.menu.menuGroup[i].menuItem[n].id === 'contactUs') {
					menuInnerHTMLBuilder += getContactUsMenuItemHTML(menuContent.menu.menuGroup[i].menuItem[n].href, menuContent.menu.menuGroup[i].menuItem[n].value);
				} else {

					// no, is this a pivot or a normal menu item?
					if (isPivot) {

						// yes, this is a pivot, lets add the pivot html
						menuInnerHTMLBuilder += getMenuPivotHTML(menuItemUUID, uriPrepend, menuContent.menu.menuGroup[i].menuItem[n].href, menuContent.menu.menuGroup[i].menuItem[n].value);
					} else {

						// no, this is a menu item, lets add the menu item html
						menuInnerHTMLBuilder += getMenuItemHTML(menuItemUUID, uriPrepend, menuContent.menu.menuGroup[i].menuItem[n].href, menuContent.menu.menuGroup[i].menuItem[n].value);
					}
				}
			}

			// lets close the unordered list that
			menuInnerHTMLBuilder += getMenuEndHTML();
		}

		// inject/shunt the html we just built into the menu placeholder element
		shuntMenuContents(menuInnerHTMLBuilder);

		// store the built html in the local storage
		localStorage.setItem('navMenuContents', JSON.stringify(menuInnerHTMLBuilder));
	};

	init = function () {
		var prependJSONLocation,
			langFile,
			userLang = localStorage.getItem('userLang'),
			detectedLang = (navigator.language) ? navigator.language : navigator.userLanguage,
			navJson;


		// lazy load our CSS for the side menu
		callRestService(getMenuItemURLHostName('json') + '/styles/sideMenu.m.css', 'css');
		
			// are we unable to find the mobile nav in local storage OR
			// was this page not being reached through an att.com property
		if (localStorage.getItem('userLang') !== null || localStorage.getItem('navMenuContents') === null || document.referrer.indexOf('att.com') === -1) {

			// create the schema-less domain strings for json/ecom
			prependJSONLocation = '//' + getMenuItemURLHostName('json');
			prependEcomLinkLocation = getMenuItemURLHostName('ecom');

			// create a domain string for dss
			prependDssLinkLocation = getMenuItemURLHostName('dss');

			// append https schema and seperator if it doesn't already exist
			if (prependDssLinkLocation.indexOf('https') === -1) {
				if (prependDssLinkLocation.indexOf('http://') !== -1) {
					prependDssLinkLocation = prependDssLinkLocation.replace('http://', '');
				}
				prependDssLinkLocation = 'https://' + prependDssLinkLocation;
			}

			// request the mobileMenuContent JSON and call the menuBuilder function once the call request returned.
			//callRestService(prependJSONLocation + '/scripts/mobileMenuContent-1.0.js?callback=ATTMobileMenuShunt.menuBuilder');
			//callRestService('//tst20.stage.att.com/scripts/jquery.animate-enhanced.min.js');
			if (userLang === null) {
				userLang = detectedLang;
			}
			if (userLang.toLowerCase().indexOf('es') !== -1 || window.location.href.indexOf('/es/') !== -1) {
				langFile = 'es/';
				localStorage.setItem('userLang', 'es');
			} else {
				langFile = '';
			}
			callRestService(getMenuItemURLHostName('json') + '/shopmobile/' + langFile + 'globalnav/index.json?callback=ATTMobileMenuShunt.menuBuilder', 'js');
		} else {

			// no, we can find the mobile nav data in local storage, lets get it's content and parse it into a JSON object
			navJson = JSON.parse(localStorage.getItem('navMenuContents'));

			// build the html from the json and shunt it.
			shuntMenuContents(navJson);
		}

		// is getGeo not available?
		if (typeof redirectToStoreLocator === 'undefined') {

			// no, make it known that we are using the support library
			requiresSupportLib = true;

			// load the support library
			callRestService(getMenuItemURLHostName('json') + '/scripts/ATTMobileGlobalFunctions-1.0.js', 'js');
		}
	};

	getUrlParams = function () {
		var match,

			// set a sane default as the return value
			params = {},

			// regex for plus sign (replaces space in query params)
			plus = /\+/g,

			// regex which matches key value pair (E.g. a=b)
			// lint is being a pain about ^ being insecure but I haven't found a better regex
			search = /([^&=]+)=?([^&]*)/g,

			// decodes query param strings and replaces plus signs with spaces
			decode = function (s) {
				return decodeURIComponent(s.replace(plus, " "));
			},

			// query string without the question mark.
			query = window.location.search.substring(1);

		// loop through each of the matches within the query string
		while ((match = search.exec(query)) !== null) {

			// decode and stuff the matched key/value pair into the param object.
			params[decode(match[1])] = decode(match[2]);
		}
		return params;
	};

	/**
	 * Hide the slide menu from view
	 * @memberOf ATTMobileMenuShunt
	 * @name closeMobileSlideMenu
	 * @public
	 * @return {undefined}
	 */
	closeMobileSlideMenu = function () {
		$("#menuMainSlider").animate({right: "-270px" }, 300, function () {});
		$('div[data-role="page"]').animate({left: "0px" }, 300, function () {
			$('#iconMenu').html('[Menu]');
			$('#outerMMW').hide();
		});
		if (pageHeight > portHeight) {
			$('div[data-role="page"]').css({'min-height': defaultHeight, 'max-height': '100%', 'overflow': 'visible' });
		} else {
			$('div[data-role="page"]').css({'overflow': 'visible' });
		}
		$('div[data-role="page"] a.ui-link-inherit').unbind('click', clkBlocker);
		$('body').removeClass('bodyBG');
	};

	getNativeCookie = function () {
		var nameEQ = 'accessDomain' + "=",
			ca = document.cookie.split(';'),
			i,
			c;
		for (i = 0; i < ca.length; i += 1) {
			c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1, c.length);
			}
			if (c.indexOf(nameEQ) === 0) {
				return c.substring(nameEQ.length, c.length);
			}
		}
		return null;
	};

	return {
		init: init,
		menuBuilder: menuBuilder,
		closeMobileSlideMenu: closeMobileSlideMenu,
		callRestService: callRestService,
		getUrlParams: getUrlParams,
		getMenuItemURLHostName: getMenuItemURLHostName,
		getNativeCookie: getNativeCookie
	};

}(jQuery)),

	// expose the public menuBuilder method with a non-namespaced alias to preserve existing public API
	menuBuilder = ATTMobileMenuShunt.menuBuilder;

/**
 * Functionality for mobile search widget.
 *
 * @namespace Contains functionality for mobile search widget..
 * @param {jQuery} $ Global jQuery object
 */

var ATTMobileSearchWidget = (function ($) {

	'use strict';

	var injectSearchWidgetHarness,
		setARIADesc,
		shouldRepopulate = true,
		clearSearchFieldValues,
		runSearch,
		autoCompleteCallback,
		p_vals,
		currFormVal,
		loadedPrevSearches = false,
		sliderIsOpen = false,
		hasDoneInjection = false,
		didClickIcon = false,
		initialized = false;

	/**
	 * queries for autosuggest terms and injects then into the DOM
	 *
	 * @memberOf ATTMobileSearchWidget
	 * @name autoCompleteCallback
	 * @public
	 * @return {undefined}
	 */
	autoCompleteCallback = function (data) {
		var i,
			suggestResult;
		if (data.response.docs.length > 0) {
			$('#predicitonBucket').html('');
			if ($('#m_search').val() !== '') {
				$('.autoSearchVat').slideDown(250);
			}
			for (i = 0; i < data.response.docs.length; i += 1) {
				if (i < 5) {
					suggestResult = '<li role="option" id="suggestItem_' + i + '" onfocus="ATTMobileSearchWidget.setARIADesc(\'predicitonBucket\',  \'suggestItem_' + i + '\')" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-corner-top ui-btn-up-c"><div class="ui-btn-inner ui-li ui-corner-top"><div class="ui-btn-text"><a href="javascript: ATTMobileSearchWidget.runSearch(\'' + data.response.docs[i].userQuery + '\', \'autoSuggestInd\');" data-ajax="false" class="ui-link-inherit">' + data.response.docs[i].userQuery + '</a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow"></span></div></li>';
					$('#predicitonBucket').append(suggestResult);
				}
			}
		} else {
			currFormVal = $('#search').val();
		}
	};

	/**
	 * cleans user input, stores the new value and redirects to the search results page
	 *
	 * @memberOf ATTMobileSearchWidget
	 * @name runSearch
	 * @param {String} s_val - the raw user inputted value to be searched for
	 * @param {String} source - to check if user clicked auto suggested items
	 * @public
	 * @return {false}
	 */

	runSearch = function (s_val, source) {
		var searchTerm = '',
			searchSource = '',
			homePageMarker = '',
			previousSearchRack = localStorage.getItem('prevSearches'),
			previousSearchValues,
			m_rack;
		//Hide the prediction amd previous terms widget and the device keyboard
		$('.autoSearchVat').hide();
		document.activeElement.blur();
		$("input").blur();

		if (!s_val) {
			searchTerm = $('#m_search').val();
		} else {
			searchTerm = s_val;
		}
		if (typeof source !== 'undefined') {
			searchSource = '&autoSuggestInd=Y';
		}
		if (searchTerm.match(/:|#|%|\^|\*|\(|\)|\[|\]|\/|\\/g)) {
            searchTerm = searchTerm.replace(/:|#|%|\^|\*|\(|\)|\[|\]|\/|\\/g, '');
        }
		if (searchTerm !== '') {
			//Check if user clicks search icon without entering any term and default results text remains in search textbox.
			if (searchTerm.indexOf("for:") !== -1) {
				// Get the search term from local storage.
				searchTerm = localStorage.getItem('search');
				if (previousSearchRack !== null) {
					previousSearchRack = previousSearchRack.toLowerCase();
					if (previousSearchRack.indexOf(searchTerm.toLowerCase()) === -1) {
						previousSearchValues = localStorage.getItem("prevSearches").split('|');
						previousSearchValues.unshift(searchTerm);
						if (previousSearchValues.length > 5) {
							previousSearchValues.pop();
						}
						m_rack = previousSearchValues.join('|');
						localStorage.setItem("prevSearches", m_rack);
					}
				} else {
					localStorage.setItem("prevSearches", searchTerm);
				}
			}
			searchTerm = searchTerm.replace('&', '%26');
			if (typeof CQURLInfo !== 'undefined' && CQURLInfo.requestPath === '/content/att/shopmobile/homepage/en/index') {
				homePageMarker = 'home';
			}
			if (typeof searchSilo !== 'undefined') {
				if (typeof homePageMarker !== 'undefined') {
					window.location = ATTMobileMenuShunt.getMenuItemURLHostName('json') + '/mobilesearch/search-results.html?m_search=' + searchTerm + '&m_silo=' + searchSilo + searchSource + '&m_source=' + homePageMarker;
				} else {
					window.location = ATTMobileMenuShunt.getMenuItemURLHostName('json') + '/mobilesearch/search-results.html?m_search=' + searchTerm + '&m_silo=' + searchSilo + searchSource;
				}
			} else {
				if (typeof homePageMarker !== 'undefined') {
					window.location = ATTMobileMenuShunt.getMenuItemURLHostName('json') + '/mobilesearch/search-results.html?m_search=' + searchTerm + searchSource + '&m_source=' + homePageMarker;
				} else {
					window.location = ATTMobileMenuShunt.getMenuItemURLHostName('json') + '/mobilesearch/search-results.html?m_search=' + searchTerm + searchSource;
				}
			}
		} else {
			alert('Please enter a search term.');
		}
	};
	/**
	 * Clear search field values.
	 *
	 *
	 * @memberOf ATTMobileMenuShunt
	 * @name clearSearchFieldValues
	 * @public
	 */
	clearSearchFieldValues = function () {
		var e, element = $('#m_search');
		if (element.val() !== '') {
			element.closest('div').find('#clearSearchText').show();
		} else {
			element.closest('div').find('#clearSearchText').hide();
		}
		$('#clearSearchText').click(function () {
			element.val('');
			//localStorage.removeItem('search');
			shouldRepopulate = false;
			element.focus();
			$('#clearSearchText').hide();
			//$('.autoSearchVat').slideUp(250);
			//sliderIsOpen = false;
			$('#predicitonBucket').html('');
			var i,
				iter;
			if (localStorage.getItem("prevSearches") !== null) {
				p_vals = localStorage.getItem("prevSearches").split('|');
				for (i = 0; i < p_vals.length; i += 1) {
					if (i < 5) {
						iter = '<li role="option" onfocus="ATTMobileSearchWidget.setARIADesc(\'predicitonBucket\',  \'prevItem_' + p_vals[i] + '\')" id="prevItem_' + p_vals[i] + '" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-corner-top ui-btn-up-c"><div class="ui-btn-inner ui-li ui-corner-top"><div class="ui-btn-text"><a href="javascript: ATTMobileSearchWidget.runSearch(\'' + p_vals[i] + '\', \'autoSuggestInd\');" data-ajax="false" class="ui-link-inherit">' + p_vals[i] + '</a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow"></span></div></li>';
						$('#predicitonBucket').append(iter);
					}
				}
				loadedPrevSearches = true;
			}
		});
		element.keyup(function () {
			e = $(this);
			if (e.val() !== '') {
				e.closest('div').find('#clearSearchText').show();
			} else {
				e.closest('div').find('#clearSearchText').hide();
			}
			$('#clearSearchText').click(function () {
				element.val('');
				$('#clearSearchText').hide();
				//$('.autoSearchVat').slideUp(250);
				//sliderIsOpen = false;
				$('#predicitonBucket').html('');
				var i,
					iter;
				if (localStorage.getItem("prevSearches") !== null) {
					p_vals = localStorage.getItem("prevSearches").split('|');
					for (i = 0; i < p_vals.length; i += 1) {
						if (i < 5) {
							iter = '<li role="option" onfocus="ATTMobileSearchWidget.setARIADesc(\'predicitonBucket\',  \'prevItem_' + p_vals[i] + '\')" id="prevItem_' + p_vals[i] + '" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-corner-top ui-btn-up-c"><div class="ui-btn-inner ui-li ui-corner-top"><div class="ui-btn-text"><a href="javascript: ATTMobileSearchWidget.runSearch(\'' + p_vals[i] + '\');" data-ajax="false" class="ui-link-inherit">' + p_vals[i] + '</a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow"></span></div></li>';
							$('#predicitonBucket').append(iter);
						}
					}
					loadedPrevSearches = true;
				}
			});
		});
		$('#m_search').attr('placeholder', '');
	};

	/**
	 * controls hook for ARAI accessibility
	 *
	 * @memberOf ATTMobileSearchWidget
	 * @name setARIADesc
	 * @public
	 * @return {undefined}
	 */
	setARIADesc = function (parentToSet, idToSet) {
		console.log('li ' + idToSet + ' has focus');
		$('#' + parentToSet).attr('aria-activedescendant', idToSet);
	};

	/**
	 * determines based on CQ params where to display itself, then add the search widget to the DOM
	 *
	 * @memberOf ATTMobileSearchWidget
	 * @name injectSearchWidgetHarness
	 * @public
	 * @return {false}
	 */
	injectSearchWidgetHarness = function () {
		var i,
			currentScreen,
			currentScreenSearchWidgetLength,
		// string reps. of widget
			widgetBasic = '<div id="resultsSearch" class="searchWidget" style="background-color: #f2f2f2;"><form class="searchForm" role="search" style="background-color: #f2f2f2;" id="subSearch" method="get" action="/mobilesearch/search-results.html?m_search=true" onsubmit="return ATTMobileSearchWidget.runSearch();" data-ajax="false"><div id="inp_wrap" class="ui-input-search ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-icon-searchfield ui-body-c ui-focus"><input title="search" role="combobox" aria-autocomplete="list" aria-owns="predicitonBucket" type="text" autocorrect="off" data-type="search" name="m_search" id="m_search" class="searchInput ui-input-text ui-body-c" placeholder="Search AT&amp;T"><a href="#" id="clearSearchText" class="ui-input-clear ui-btn ui-btn-up-c ui-btn-icon-notext ui-btn-corner-all ui-shadow ui-input-clear-hidden" title="clear text" data-theme="c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">clear text</span><span class="ui-icon ui-icon-delete ui-icon-shadow"></span></span></a><a href="javascript:didClickIcon = true;ATTMobileSearchWidget.runSearch();" class="searchClick hidden-text-spoken">Tap to search</a></div><div class="autoSearchVat" style="display: none;"><ul id="predicitonBucket" data-role="listview" data-inset="true" data-theme="c" data-dividertheme="b" class="ui-listview ui-listview-inset ui-corner-all ui-shadow"></ul></div></form></div>',
			
			widgetBasicNoBg = '<div id="resultsSearch" class="searchWidget"><form class="searchForm" role="search" id="subSearch" method="get" action="/mobilesearch/search-results.html?m_search=true" onsubmit="return ATTMobileSearchWidget.runSearch();" data-ajax="false"><div id="inp_wrap" class="ui-input-search ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-icon-searchfield ui-body-c ui-focus"><input title="search" role="combobox" aria-autocomplete="list" aria-owns="predicitonBucket" type="text" autocorrect="off" data-type="search" name="m_search" id="m_search" class="searchInput ui-input-text ui-body-c" placeholder="Search AT&amp;T"><a href="#" id="clearSearchText" class="ui-input-clear ui-btn ui-btn-up-c ui-btn-icon-notext ui-btn-corner-all ui-shadow ui-input-clear-hidden" title="clear text" data-theme="c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">clear text</span><span class="ui-icon ui-icon-delete ui-icon-shadow"></span></span></a><a href="javascript:didClickIcon = true;ATTMobileSearchWidget.runSearch();" class="searchClick hidden-text-spoken">Tap to search</a></div><div class="autoSearchVat" style="display: none;"><ul id="predicitonBucket" data-role="listview" data-inset="true" data-theme="c" data-dividertheme="b" class="ui-listview ui-listview-inset ui-corner-all ui-shadow"></ul></div></form></div>',
			
			widgetThickBorder = '<div id="resultsSearch" class="searchWidget dividerBefore" style="background-color: #f2f2f2;"><form class="searchForm" role="search" id="subSearch" method="get" action="/mobilesearch/search-results.html?m_search=true" onsubmit="return ATTMobileSearchWidget.runSearch();" data-ajax="false"><div id="inp_wrap" class="ui-input-search ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-icon-searchfield ui-body-c ui-focus"><input title="search" role="combobox" aria-autocomplete="list" aria-owns="predicitonBucket" type="text" autocorrect="off" data-type="search" name="m_search" id="m_search" class="searchInput ui-input-text ui-body-c" placeholder="Search AT&amp;T"><a href="#" id="clearSearchText" class="ui-input-clear ui-btn ui-btn-up-c ui-btn-icon-notext ui-btn-corner-all ui-shadow ui-input-clear-hidden" title="clear text" data-theme="c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">clear text</span><span class="ui-icon ui-icon-delete ui-icon-shadow"></span></span></a><a href="javascript:didClickIcon = true;ATTMobileSearchWidget.runSearch();" class="searchClick hidden-text-spoken">Tap to search</a></div><div class="autoSearchVat" style="display: none;"><ul id="predicitonBucket" data-role="listview" data-inset="true" data-theme="c" data-dividertheme="b" class="ui-listview ui-listview-inset ui-corner-all ui-shadow"></ul></div></form></div>',
			
			widgetThinBorder = '<div style="border-bottom: 1px solid #DADADA;" id="resultsSearch" class="searchWidget"><form class="searchForm" role="search" style="background: #F2F2F2;" id="subSearch" method="get" action="/mobilesearch/search-results.html?m_search=true" onsubmit="return ATTMobileSearchWidget.runSearch();" data-ajax="false"><div id="inp_wrap" class="ui-input-search ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-icon-searchfield ui-body-c ui-focus"><input title="search" role="combobox" aria-autocomplete="list" aria-owns="predicitonBucket" type="text" autocorrect="off" data-type="search" name="m_search" id="m_search" class="searchInput ui-input-text ui-body-c" placeholder="Search AT&amp;T"><a href="#" id="clearSearchText" class="ui-input-clear ui-btn ui-btn-up-c ui-btn-icon-notext ui-btn-corner-all ui-shadow ui-input-clear-hidden" title="clear text" data-theme="c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">clear text</span><span class="ui-icon ui-icon-delete ui-icon-shadow"></span></span></a><a href="javascript:didClickIcon = true;ATTMobileSearchWidget.runSearch();" class="searchClick hidden-text-spoken">Tap to search</a></div><div class="autoSearchVat" style="display: none;"><ul id="predicitonBucket" data-role="listview" data-inset="true" data-theme="c" data-dividertheme="b" class="ui-listview ui-listview-inset ui-corner-all ui-shadow"></ul></div></form></div>',
			
			widgetThinBorderWithBottom = '<div style="border-bottom: 1px solid #DADADA;" id="resultsSearch" class="searchWidget"><form class="searchForm" role="search" style="background: #F2F2F2;" id="subSearch" method="get" action="/mobilesearch/search-results.html?m_search=true" onsubmit="return ATTMobileSearchWidget.runSearch();" data-ajax="false"><div id="inp_wrap" class="ui-input-search ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-icon-searchfield ui-body-c ui-focus"><input title="search" role="combobox" aria-autocomplete="list" aria-owns="predicitonBucket" type="text" autocorrect="off" data-type="search" name="m_search" id="m_search" class="searchInput ui-input-text ui-body-c" placeholder="Search AT&amp;T"><a href="#" id="clearSearchText" class="ui-input-clear ui-btn ui-btn-up-c ui-btn-icon-notext ui-btn-corner-all ui-shadow ui-input-clear-hidden" title="clear text" data-theme="c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">clear text</span><span class="ui-icon ui-icon-delete ui-icon-shadow"></span></span></a><a href="javascript:didClickIcon = true;ATTMobileSearchWidget.runSearch();" class="searchClick hidden-text-spoken">Tap to search</a></div><div class="autoSearchVat" style="display: none;"><ul id="predicitonBucket" data-role="listview" data-inset="true" data-theme="c" data-dividertheme="b" class="ui-listview ui-listview-inset ui-corner-all ui-shadow"></ul></div></form></div><div class="dividerBefore"></div>',
			
			widgetBasic100 = '<div id="resultsSearch" class="searchWidget" style="background-color: #f2f2f2;"><form class="searchForm" role="search" style="background-color: #f2f2f2;" id="subSearch" method="get" action="/mobilesearch/search-results.html?m_search=true" onsubmit="return ATTMobileSearchWidget.runSearch();" data-ajax="false"><div id="inp_wrap" class="ui-input-search ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-icon-searchfield ui-body-c ui-focus"><input title="search" role="combobox" aria-autocomplete="list" aria-owns="predicitonBucket" type="text" autocorrect="off" data-type="search" name="m_search" id="m_search" class="searchInput ui-input-text ui-body-c" placeholder="Search AT&amp;T" style="width: 100%;"><a href="#" id="clearSearchText" class="ui-input-clear ui-btn ui-btn-up-c ui-btn-icon-notext ui-btn-corner-all ui-shadow ui-input-clear-hidden" title="clear text" data-theme="c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">clear text</span><span class="ui-icon ui-icon-delete ui-icon-shadow"></span></span></a><a href="javascript:didClickIcon = true;ATTMobileSearchWidget.runSearch();" class="searchClick hidden-text-spoken">Tap to search</a></div><div class="autoSearchVat" style="display: none;"><ul id="predicitonBucket" data-role="listview" data-inset="true" data-theme="c" data-dividertheme="b" class="ui-listview ui-listview-inset ui-corner-all ui-shadow"></ul></div></form></div>';

		$('#resultsSearch').remove();
		$('.searchClick').remove();
		$('#footerSearch').remove();

		// Flag to  inject search widget only once.
		initialized = true;

		$('.searchClick').click(function (e) {
			e.preventDefault();
			runSearch();
		});

		// figure out how to place widget on page
		// results page
		if (!hasDoneInjection) {
			if (typeof CQURLInfo !== 'undefined') {
				// we're in mHR
				if (CQURLInfo.requestPath.indexOf('/content/att/shopmobile/en/wireless/devices/') !== -1 || CQURLInfo.requestPath.indexOf('/content/att/shopmobile/en/wireless/plans/') !== -1 || CQURLInfo.requestPath.indexOf('/content/att/shopmobile/en/wireless/services/') !== -1) {
					// buyflow pages
					if ($('.morelinks').length > 0) {
						//$(widgetBasic).insertBefore($('footer'));
						$(widgetBasic).appendTo($('.morelinks'));
					} else {
						//$(widgetBasic).insertBefore($('footer'));
						$(widgetBasic).appendTo($('.linklist'));
					}
				} else if (CQURLInfo.requestPath === '/content/att/shopmobile/en/wireless/accessories' || CQURLInfo.requestPath === '/content/att/shopmobile/en/wireless/plans' || CQURLInfo.requestPath === '/content/att/shopmobile/en/wireless/services') {
					// top level pages
					$(widgetBasic).appendTo($('.linklist'));
					//$(widgetBasic).insertBefore($('footer'));
				} else if (CQURLInfo.requestPath === '/content/att/shopmobile/homepage/en/index') {
					// homepage
					$(widgetThickBorder).appendTo($('.marquee:first'));
				} else if (CQURLInfo.requestPath === '/content/att/mobilesearch/en/search-results') {
					// search results page
					$(widgetBasicNoBg).prependTo($('.baseMenuPage'));
				} else if (CQURLInfo.requestPath === '/content/att/shopmobile/en/login/login') {
					// login page
					// no widget here
				} else {
					// other mHR pages
					//$(widgetBasic).insertBefore($('footer'));
					if (ATTMobileMenuShunt.getNativeCookie('accessDomain') === 'native') {
						$(widgetThinBorderWithBottom).insertBefore($('footer'));
					} else {
						$(widgetBasic).prependTo($('footer'));
					}
				}
			} else {
				// we're in DSS or Support
				if ($("meta[name='DCSext.wtPN']").attr('content') === 'Mbl-eSup Support Pg') {
					// support homepage
					$(widgetThinBorder).appendTo($("ul[data-role='listview']")[$("ul[data-role='listview']").length - 1]);
				} else if ($("meta[name='DCSext.wtPN']").attr('content') === 'Mbl-eSup Article Pg') {
					// support article
					if ($('#socialIconsContainer').length > 0) {
						$(widgetThinBorderWithBottom).prependTo($('#socialIconsContainer').prev());
					} else {
						$(widgetThinBorderWithBottom).insertBefore($('footer'));
					}
				} else if (window.location.href.indexOf('newLogin.action') !== -1 || window.location.href.indexOf('newAccountSelection.action') !== -1 || window.location.href.indexOf('newPasscode.action') !== -1) {
					// login page
					// no widget here
				} else if (window.location.href.indexOf('newHome.action') !== -1) {
					// the usage page takes some time to render, so we have to wait for it... pageInit() is unreliable here
					if (ATTMobileMenuShunt.getNativeCookie('accessDomain') === 'native') {
						// this part handles the transition states of DSS rebrand
						$('div').on('pageshow', function (event, ui) {
							currentScreen = $.mobile.activePage.attr("id");
							currentScreenSearchWidgetLength = $("#" + currentScreen).find('#m_search').length;
							// Check if search widget already exists in view. If not inject it to the view.
							if (currentScreenSearchWidgetLength === 0) {
								if (currentScreen === 'wirelessContainer') {
									$(widgetBasic).appendTo($('#wirelessfooter'));
								} else if (currentScreen === 'UVIPTVContainer') {
									$(widgetBasic).appendTo($('#UVIPTVfooter'));
								} else if (currentScreen === 'sdgDataContainer') {
									$(widgetBasic).appendTo($('#sdgfooter'));
								} else if (currentScreen === 'UVVoiceContainer') {
									$(widgetBasic).appendTo($('#UVfooter'));
								} else if (currentScreen === 'container') {
									$(widgetBasic).appendTo($('#content:visible'));
								}
							}
						});
						$("div").on("pagehide", function (event, ui) {
							$('.searchClick').remove();
							$('#resultsSearch').remove();
						});
						setTimeout(function () {
							// this part handles the initial load states of DSS rebrand
							// Check if it already exists in DOM, if not inject it. 
							if ($('#mainContent .searchForm').length === 0) {
								currentScreen = $.mobile.activePage.attr("id");
								currentScreenSearchWidgetLength = $("#" + currentScreen).find('#m_search').length;
								if (currentScreenSearchWidgetLength === 0) {
									if (currentScreen === 'wirelessContainer') {
										$(widgetBasic).appendTo($('#wirelessfooter'));
									} else if (currentScreen === 'UVIPTVContainer') {
										$(widgetBasic).appendTo($('#UVIPTVfooter'));
									} else if (currentScreen === 'sdgDataContainer') {
										$(widgetBasic).appendTo($('#sdgfooter'));
									} else if (currentScreen === 'UVVoiceContainer') {
										$(widgetBasic).appendTo($('#UVfooter'));
									} else if (currentScreen === 'container') {
										$(widgetBasic).appendTo($('#content:visible'));
									}
								}
							}
						}, 3000);
					} else {
						$('div').on('pageshow', function (event, ui) {
							currentScreen = $.mobile.activePage.attr("id");
							currentScreenSearchWidgetLength = $("#" + currentScreen).find('#m_search').length;
							// Check if search widget already exists in view. If not inject it to the view.
							if (currentScreenSearchWidgetLength === 0) {
								if (currentScreen === 'wirelessContainer') {
									$(widgetBasic).prependTo($('footer:visible'));
								} else if (currentScreen === 'UVIPTVContainer') {
									$(widgetBasic).prependTo($('footer:visible'));
								} else if (currentScreen === 'sdgDataContainer') {
									$(widgetBasic).prependTo($('footer:visible'));
								} else if (currentScreen === 'UVVoiceContainer') {
									$(widgetBasic).prependTo($('footer:visible'));
								} else if (currentScreen === 'container') {
									$(widgetBasic).prependTo($('footer:visible'));
								}
							}
						});
						$("div").on("pagehide", function (event, ui) {
							$('.searchClick').remove();
							$('#resultsSearch').remove();
						});
						setTimeout(function () {
							// Check if it already exists in DOM, if not inject it. 
							if ($('footer .searchForm').length === 0) {
								$(widgetBasic).prependTo($('footer:visible'));
							}
						}, 3000);
					}
				} else if (window.location.href.indexOf('newBillnpay.action?np_=mng_pyp') !== -1) {
					$(widgetBasic100).insertBefore($('footer'));
				} else {
					// other Support & DSS pages
					if ($('footer').length > 1) {
						// some DSS pages have multiple footer elements
						if (ATTMobileMenuShunt.getNativeCookie('accessDomain') === 'native') {
							if (window.location.search.indexOf('usPg') !== -1) {
								$(widgetBasic).insertBefore($('footer')[1]);
							} else {
								for (i = 0; i < $('footer').length; i += 1) {
									$(widgetBasic).insertBefore($('footer')[i]);
								}
							}
						} else {
							if (window.location.search.indexOf('usPg') !== -1) {
								$(widgetBasic).prependTo($('footer')[1]);
							} else {
								for (i = 0; i < $('footer').length; i += 1) {
									$(widgetBasic).prependTo($('footer')[i]);
								}
							}
						}
					} else if ($('footer').length === 0) {
						if ($('#footerdiv').length) {
							$(widgetBasic).prependTo($('#footerdiv'));
						}
					} else {
						if (window.location.href.indexOf('newForgotcreds.action') === -1) {
							$(widgetBasic).insertBefore($('footer'));
						}
					}
					//If page is loaded as jQM page then inject search widget if it does not exist in the current view. (For DSS inner pages)
					$('div').on('pageshow', function (event, ui) {
						currentScreen = $.mobile.activePage.attr("id");
						currentScreenSearchWidgetLength = $("#" + currentScreen).find('#m_search').length;
						// Check if search widget already exists in view. If not inject it to the view.
						if (currentScreenSearchWidgetLength === 0) {
							if ($("#" + currentScreen + " #footerdiv").length > 0) {
								$(widgetBasic).prependTo($("#" + currentScreen + " #footerdiv"));
							}
						}
					});
				}
			}
			hasDoneInjection = true;
		}

		// bind to click on the injected widget for these, since we need to govern the hide/show for previous AND auto complete with this same interaction
		$('.searchWidget').on('click', function () {
			if (!didClickIcon) {
				$('.autoSearchVat').slideDown(250, function () {
					sliderIsOpen = true;
					$('#predicitonBucket').attr('aria-expanded', 'true');
					$('#predicitonBucket').attr('aria-hidden', 'false');
					var i,
						iter;
					if (localStorage.getItem("prevSearches") !== null && !loadedPrevSearches) {
						p_vals = localStorage.getItem("prevSearches").split('|');
						for (i = 0; i < p_vals.length; i += 1) {
							if (i < 5) {
								iter = '<li role="option" onfocus="ATTMobileSearchWidget.setARIADesc(\'predicitonBucket\',  \'prevItem_' + p_vals[i] + '\')" id="prevItem_' + p_vals[i] + '" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-corner-top ui-btn-up-c"><div class="ui-btn-inner ui-li ui-corner-top"><div class="ui-btn-text"><a href="javascript: ATTMobileSearchWidget.runSearch(\'' + p_vals[i] + '\', \'autoSuggestInd\');" data-ajax="false" class="ui-link-inherit">' + p_vals[i] + '</a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow"></span></div></li>';
								$('#predicitonBucket').append(iter);
							}
						}
						loadedPrevSearches = true;
					}
				});
				// scroll so the user can see the previous/auto terms
				jQuery('html, body').animate({
					scrollTop: $('.searchWidget').offset().top
				}, 1000);
				//Activate clear input fields button for Search widget
				clearSearchFieldValues();

				// bind blur event to trigger ARIA flags
				$('#m_search').bind('blur', function () {
					$('.autoSearchVat').slideUp(250);
					$('#predicitonBucket').attr('aria-expanded', 'false');
					$('#predicitonBucket').attr('aria-hidden', 'true');
				});

				// Prevent <form> from being submitted. Additional parameters will be lost if form submit event is triggered.
				$('#subSearch').submit(function (e) {
					e.preventDefault();
				});

				// if we are on the search results page, bind handler to prefill the form with the last term and make it editable
				if (typeof g_searchResultsPage !== 'undefined') {
					if (shouldRepopulate) {
						$('#m_search').val(localStorage.getItem('search'));
					}
				}

				// utility timer for auto complete
				var delay = (function () {
					var timer = 0;
					return function (callback, ms) {
						clearTimeout(timer);
						timer = setTimeout(callback, ms);
					};
				}());
				// when user stops typing for 1000ms, run auto suggest query, avoid binding keyup for android 4.0.4 per mHR (documented conflict)
				if (navigator.userAgent.indexOf('4.0.4') === -1) {
					$('#m_search').keyup(function () {
						delay(function () {
							currFormVal = $('#m_search').val();
							// limit char set for autocomplete query
							if (currFormVal.match(/[^a-zA-Z0-9 ]/g)) {
					            currFormVal = currFormVal.replace(/[^a-zA-Z0-9 ]/g, '');
					        }
							if (currFormVal !== '') {
								// if we have a term to query, lets  do it
								$.ajax({
									dataType: "jsonp",
									url: ATTMobileMenuShunt.getMenuItemURLHostName('json') + '/searchservice/GlobalSearch_AutoSuggest/select?q=userQuery:' + currFormVal.toLowerCase() + '&indent=true&fl=userQuery&wt=json&fq=data_source_name:%22Popular%20Search%20Terms%22&sort=lookupCount%20desc&rows=5&json.wrf=ATTMobileSearchWidget.autoCompleteCallback'
								});
							} else {
								// otherwise flush the container
								$('#predicitonBucket').html('');
							}
						}, 1000);
					});
				}
			}
		});
	};

	return {
		runSearch: runSearch,
		autoCompleteCallback: autoCompleteCallback,
		injectSearchWidgetHarness: injectSearchWidgetHarness,
		clearSearchFieldValues: clearSearchFieldValues,
		setARIADesc: setARIADesc,
		/**
		 * Flag that tells if search widget component has been initialized on this page or not.
		 *
		 * @memberOf ATTMobileSearchWidget
		 * @name isInitialized
		 * @function
		 * @public
		 *
		 * @returns true if component has already been initialized.
		 */

		isInitialized : function () { return initialized; }
	};
}(jQuery));


/**
 * Perform pageinit initialization task.
 */
(function ($) {
	'use strict';

	// Check if the page is called from native app. If yes, call 'nativeAppId' +_AppRules.js, which will hide page header and footer to avoid double header and footer as the native app already has it. 

	//If nativeAppId already in localstorage
	if (localStorage.nativeAppId) {
		ATTMobileMenuShunt.callRestService(ATTMobileMenuShunt.getMenuItemURLHostName('json') + '/scripts/' + localStorage.nativeAppId + '_AppRules.js', 'js');
	} else {
		// Check if URL contains nativeAppId param
		var urlParams = ATTMobileMenuShunt.getUrlParams();
		if (urlParams.nativeAppId && urlParams.nativeAppId !== '') {
			// nativeAppId found in URL. Store it in localStorage.
			localStorage.nativeAppId = urlParams.nativeAppId;
			// call AppRules.js to hide the header and footer.
			ATTMobileMenuShunt.callRestService(ATTMobileMenuShunt.getMenuItemURLHostName('json') + '/scripts/' + urlParams.nativeAppId + '_AppRules.js', 'js');
		} else {
			if (ATTMobileMenuShunt.getNativeCookie() === 'native') {
				ATTMobileMenuShunt.callRestService(ATTMobileMenuShunt.getMenuItemURLHostName('json') + '/scripts/MyATTDSS_AppRules.js', 'js');
				$(document).ready(function () {
					 ATTMobileMenuShunt.callRestService(ATTMobileMenuShunt.getMenuItemURLHostName('json') + '/styles/sideMenu.m.css', 'css');
					
					if ((typeof g_hideSearch === 'undefined' || !g_hideSearch) && !ATTMobileSearchWidget.isInitialized()) {
						ATTMobileSearchWidget.injectSearchWidgetHarness();
					}
				});
			} else {
				//No nativeAppId found in URL or localstorage. Inject mobile nav(ATTMobileMenuShunt) and mobile search widget.
				$(document).ready(function () {
					ATTMobileMenuShunt.init();
					// Inject search widget only if 'g_hideSearch' is not set to true. Search widget will not be added to pages where 'g_hideSearch' is set to true.
					if ((typeof g_hideSearch === 'undefined' || !g_hideSearch) && !ATTMobileSearchWidget.isInitialized()) {
						ATTMobileSearchWidget.injectSearchWidgetHarness();
					}
				});
			}
		}
	}
}(jQuery));

// this provides the functionality of the old toggle() that was depricated in jq 1.9
$.fn.toggleFuncs = function() {
    var functions = Array.prototype.slice.call(arguments),
    _this = this.click(function(){
        var i = _this.data('func_count') || 0;
        functions[i%functions.length]();
        _this.data('func_count', i+1);
    });
};