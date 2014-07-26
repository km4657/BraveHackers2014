/*! [3/24/2014] */
/* TWEAK .getScript SO SCRIPTS ARE CACHED */
$.getScript = function(url, callback, cache){
	$.ajax({
		type: "GET", 
		url: url, 
		success: callback, 
		dataType: "script", 
		cache: cache
	});
};

/* ONLOAD */
$(window).on("load", function() {
	if($('.autoSize').length != 0)					         { $.fn.setautoSize(); }	
	if($('.reset-field').length != 0) 							{ $.fn.clearField(); }
	if($('select').length != 0)									{ $.fn.wrapSelect(); }	
	if($('.btn-quantity-toggle').length != 0)					{ $.fn.qtyToggle(); }
	if($('.btn-switch').length != 0)  							{ $.fn.sliderSwitch(); }	
	if($('[data-layout-target]').length != 0)					{ $.fn.gridView(); }
	if($('.btn-facebook-like').length != 0)					{ $.fn.btnFacebook(); }
   if($('.modal').length != 0)									{ $.fn.modalScrollfix(); }
   if($('.flexslider').length != 0)								{ $.getScript('//www.att.com/styles/att/assets3.1.0/js/jquery.flexslider.min.js', $.fn.marquee, true); }
	if($('.tcal').length != 0)										{ $.getScript('//www.att.com/styles/att/assets3.1.0/js/tcal.js', $.fn.tcal(), true); }
	$.fn.IEdetect();
	
	// STAR RATING
	$('.starsCan').each(function(){
		var starPercent = $(this).find('[data-stars-percent]').attr('data-stars-percent');
		var ratingText = $(this).next('.starsRating').text();
		var newRating = ratingText.replace(/[{()} ]/g, '');
		var starQty = "";
		$(this).find('[data-stars-percent]').css({'width':starPercent+'%'});
		
		if(starPercent == "0")							{ var starQty = "0" }
		if(starPercent > "0" && starPercent <= "10")	{ var starQty = ".5" }
		if(starPercent > "10" && starPercent <= "20")	{ var starQty = "1" }
		if(starPercent > "20" && starPercent <= "30")	{ var starQty = "1.5" }
		if(starPercent > "30" && starPercent <= "40")	{ var starQty = "2" }
		if(starPercent > "40" && starPercent <= "50")	{ var starQty = "2.5" }
		if(starPercent > "50" && starPercent <= "60")	{ var starQty = "3" }
		if(starPercent > "60" && starPercent <= "70")	{ var starQty = "3.5" }
		if(starPercent > "70" && starPercent <= "80")	{ var starQty = "4" }
		if(starPercent > "80" && starPercent <= "90")	{ var starQty = "4.5" }
		if(starPercent > "90" && starPercent <= "100")	{ var starQty = "5" }
		
		$(this).next('.starsRating').next('.hidden-spoken').prepend("Rated " + starQty + " out of 5 stars based on " + newRating).append(" customer reviews.")
		
	});
	
	// max selectable number of buttons 
	$('[data-max-select]').each(function(){
		var $this = $(this);
		var $btnMax = $this.attr('data-max-select');
		
		$this.find('.btn').on('state_change',function(){		
			var countchecked = $this.find('.btn.active').length;
			if(countchecked == $btnMax) {
				$this.find('button').not(".active").attr('disabled','disabled');
			} 
			else{
				$this.find('button:disabled').removeAttr('disabled');
			}
		});	
	});
	
	// hide calendar keyboard
	$('[data-provide="datepicker"]').on('focus', function(){
		if(navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|IEMobile/i)){
			var $this = $(this);
			$('body').attr('date-scroll-position', $(document).scrollTop());
			$('html, body').animate({
				scrollTop: $this.offset().top - 29,
			},500);			
		}
		$(this).blur();
	});
	
	// USAGE INDICATOR ANIMATION
	$('.progress > [data-percentage]').each(function(){
		var barWidth = $(this).attr('data-percentage')
		$(this).css({
			'width': barWidth+'%'
		});		
	});
	
	// STEP INDICATOR
	$('.step:last-child, .step-on:last-child, .step-done:last-child, .tabs.promo-tabs > li:last-child').addClass('last');
	
	
	// ERROR MSG LINKS
	$('.alert-error a').on('click', function(e){
		var lnk = $(this).attr('href');
		var lnktemp = lnk.split("#");
		var focusTo = lnktemp[1];
		
		$('#'+focusTo).focus();
		e.preventDefault();
	});
	
	// external modal 
	$('[data-same-domain="false"]').on('click', function(e) {
		 e.preventDefault();
		 var url = $(this).attr('href');
		 var target = $(this).attr('data-target');		 
		 $(target).html('<iframe width="100%" height="100%" frameborder="0" scrolling="no" allowtransparency="true" src="'+url+'"></iframe>');
	});
	
	// TOOLTIP TWEAK	
	$('.btn-tooltip').click(function(e){
		e.preventDefault();
	});	
	
	$('a.text').on('click',function(e){e.preventDefault()});
	
	// TOOLTIP LINK ONCLICK AND FOCUS
	$('.tooltip').each(function(){		
		$(this).find('a.cssIcon-tooltip').on('click', function(e){
			var tipID = $(this).next('.tooltip-wrapper').find('.helpertext').prop('id');
			
			if($(this).find('.arrow').is(':visible')){
				$(this).removeClass('active').removeAttr('aria-describedby');
			}
			else{
				$('a.cssIcon-tooltip').removeClass('active');
				$(this).addClass('active').attr('aria-describedby',tipID);
			}
			e.preventDefault();
		});			
	});
	
	// TOOLTIP BUTTON INSIDE A TEXT FIELD
	$('.tooltip-onclick').each(function(){
		var $this = $(this);		
		$(this).find('.btn-tooltip').on('click', function(e){
			$this.find('input').toggleClass('active');
		});				
		
	});
	
	// TOOLTIP TRIGGERED AUTOMATICALLY INSIDE A TEXT FIELD
	$('.tooltip-onfocus').each(function(){
		$(this).find('input').on('focus', function(){
			$(this).addClass('active');
			$(this).parent().find('.helpertext').fadeIn()
		});
		$(this).find('input').on('focusout', function(){
			$(this).removeClass('active');
			$(this).parent().find('.helpertext').fadeOut();
		});
	});	
	
	// CHECKBOX ACTIVATES BUTTON
	$('[data-activate-button]').each(function(){
		var theBtn = $(this).attr('data-activate-button');
		$(this).on('click', function(){
			if( $(this).is(':checked') ){
				$('#'+theBtn).removeAttr('disabled');
			}
			else{
				$('#'+theBtn).attr('disabled','disabled');
			}
		});
	});
	
	// close all tooltips if clicking something else				
	$(document).on('click', function(e) {
		var clickTarget = e.target.className;
		// if not a tooltip 
		if( !$(e.target).hasClass('cssIcon-tooltip') ) { 
			// close default tooltips 
			$('a.cssIcon-tooltip').removeClass('active'); 
		}
		 
		if( !$(e.target).hasClass('btn-tooltip') ) { 
			// if not a text field tooltip
			if( !$('.tooltip-onclick input').is(':focus') ){ 
				// if tooltip-focus 
				$('.tooltip-onclick input').removeClass('active');
				$('.btn-tooltip').removeClass('active');
			}
		}			
	});
});

$(window).on("resize", function() {
	if($('.autoSize').length != 0){ 
		$('.autoSize-this').removeAttr('style');
		$.fn.setautoSize(); 		
	}
});

/* ON DOM READY */
!function($){
	"use strict"; 	
	
	// IE VERSION DETECTION
	$.fn.IEdetect = (function(){
		var isIE8 = document.all && document.querySelector && !document.addEventListener;			
		if(isIE8){
			$('body').addClass('ie8');					
		}	
		var isIE9 = document.all && document.addEventListener && !window.atob;
		if(isIE9){
			$('body').addClass('ie9');
		}
		var ie10plus = document.body.style.msTouchAction !== undefined;	
		if(ie10plus){
			$('sub,sup').css({'font-size':'100%'});
			$('.price sup').css({'font-size':'20px'});
			$('.price-large sup').css({'font-size':'22px'});
		}
	});
	
	// MODAL ADJUSTMENT
	$.fn.modalScrollfix = (function() {
		var $headHeight = $('.modal-header').height();
		var $footHeight = $('.modal-footer').height(); 
		var $modalHeight = $(window).height();
		
		if($headHeight == null || $headHeight == -1){$headHeight = '0'}
		if($footHeight == null || $footHeight == -1){$footHeight = '0'}
		
		var $bodyHeight = $modalHeight - (parseInt($headHeight) + parseInt($footHeight)) + 'px';
		
		$('.modal-body').css({'height':$bodyHeight});
		
		$(window).on("orientationchange", function( event ) {
			$('.modal-body').each(function(){
				$(this).css({'height': $bodyHeight});
			});
		});
		
		// media gallery modal
		var galleryIconHeight = $('.flexslider.gallery-icons').height()+13;
		var galleryBodyHeight = $modalHeight - (galleryIconHeight) + 'px';
		$('.flexslider.gallery-item').css({
			'height':galleryBodyHeight
		});		
	});
	
	$(function() {
		//$('a[href*=#]:not([href=#])').click(function() {
		$('.scroll, .searchForm input').on('click', function(){
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top
					}, 1000);
					return false;
				}
			}
		});
	});
	
	// Calculate tallest/shortest/widest/thinnest size of group of elements
	$.fn.tallest = function()			{ return this._extremities({ 'aspect' : 'height', 'max' : true  })[0] };
	$.fn.tallestSize = function()		{ return this._extremities({ 'aspect' : 'height', 'max' : true  })[1] };
	$.fn.shortest = function()			{ return this._extremities({ 'aspect' : 'height', 'max' : false })[0] };
	$.fn.shortestSize = function()	{ return this._extremities({ 'aspect' : 'height', 'max' : false })[1] };
	$.fn.widest = function()			{ return this._extremities({ 'aspect' : 'width',  'max' : true  })[0] };
	$.fn.widestSize = function()		{ return this._extremities({ 'aspect' : 'width',  'max' : true  })[1] };
	$.fn.thinnest = function()			{ return this._extremities({ 'aspect' : 'width',  'max' : false })[0] };
	$.fn.thinnestSize = function()	{ return this._extremities({ 'aspect' : 'width',  'max' : false })[1] };
	
	$.fn._extremities = function(options){
		var defaults = {aspect : 'height', max : true};	
		options = $.extend(defaults, options);	
		if (this.length < 2) {
			return [this, this[options.aspect]()];
		} 
		var bestIndex = 0, bestSize = this.eq(0)[options.aspect](), thisSize; 
		for (var i = 1; i < this.length; ++i) {
			var thisSize = this.eq(i)[options.aspect](); 
			if ( (options.max && thisSize > bestSize) || (!options.max && thisSize < bestSize) ) { 
				var bestSize = thisSize; 
				bestIndex = i;
			}
		}
		return [ this.eq(bestIndex), bestSize ];
	};	

	// FACEBOOK LIKE BUTTON
	$.fn.btnFacebook = (function(){
		var fb = '//www.facebook.com/plugins/like.php?href=';
		var canonical = escape($('link[rel=canonical]').attr('href'));
		var fbParam = '&amp;width=75&amp;height=21&amp;colorscheme=light&amp;layout=button_count&amp;action=like&amp;show_faces=false&amp;send=false';
		
		$('.btn-facebook-like').html('<iframe id="facebookFrame" src="' + fb + canonical + fbParam + '" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:auto; height:21px;" allowTransparency="true"></iframe>');
		$('iframe .pluginConnectButtonLayoutRoot').css({'background-color':'black !important'})
		
	});	
	
	// MARQUEE W/ SLIDE
	$.fn.marquee = (function(){
		var p_timeOut, 
			didTimeOut = false;
											 
		$('.flexslider').flexslider({
			animation: "slide",
			animationSpeed: 300,
			useCSS: true,
			controlNav: false,
			directionNav: false,
			pauseOnAction: false,
			slideshowSpeed: 4000,
			pauseOnHover: false,
			manualPause: false,
			pausePlay: false,
			after: function(slider){
				if (!slider.playing) {
					 p_timeOut = setTimeout(function(){
						  $('.flexslider').flexslider("pause");
						  $('.flexslider').flexslider("play");
						  didTimeOut = true;
					 }, 2500);
				} else {
					 clearTimeout(p_timeOut);
				}
			}
		});
	});
	
	// GRID VIEW TOGGLE
	$.fn.gridView = (function(){
		$('[data-layout-target]').each(function(){
			var gridTarget = $(this).attr('data-layout-target');
			if($(this).find('.show-grid-view').hasClass('active')){
				$('#'+gridTarget).removeClass('listView').addClass('gridView');
			}
			else{
				$('#'+gridTarget).removeClass('gridView').addClass('listView');								
			}
			var gridRadio = $(this).find('.show-grid-view');
			var listRadio = $(this).find('.show-list-view');
			$(gridRadio).on('click', function(){
				$('#'+gridTarget).find('.autoSize-this').attr('style','');
				$('#'+gridTarget).removeClass('listView').addClass('gridView');
				$.fn.setautoSize();				
			});
			$(listRadio).on('click', function(){
				$('#'+gridTarget).find('.autoSize-this').attr('style','');
				$('#'+gridTarget).removeClass('gridView').addClass('listView');
				$.fn.setautoSize();
			});			
		});		
	});
		
	// BUTTON QUANTITY TOGGLE
	$.fn.qtyToggle = (function(){
		$('.btn-quantity-toggle').each(function(){
			var currentVal = $(this).find('input[data-max-quantity]');

			// RESTRICT VALUE FROM GOING OVER MAX QUANTITY ALLOWABLE
			$(currentVal).on('keyup', function(){
				if($(currentVal).val() > parseInt($('[data-max-quantity]').attr('data-max-quantity')) ){
					$(currentVal).attr('value', $('[data-max-quantity]').attr('data-max-quantity'));
					$(currentVal).next().attr('disabled','disabled').addClass('disabled');
				}
				else{
					$(currentVal).next().removeAttr('disabled').removeClass('disabled');
					return false;
					
				}
			});
			// DECREMENT VALUE UNTIL 0
			$('.btn-prev').on('click', function(){
				if(currentVal.val() == "1"){
					$(currentVal).prev().attr('disabled','disabled').addClass('disabled');					
				}
				if(currentVal.val() == "0"){
					return false;
				}
				else{
					currentVal.val(parseInt(currentVal.val()) - 1);
					$(currentVal).next().removeAttr('disabled').removeClass('disabled');
				}
			});
			// INCREMENT VALUE UNTIL MAX QUANTITY REACHED
			$('.btn-next').on('click', function(){
				if(currentVal.val() == parseInt( $('[data-max-quantity]').attr('data-max-quantity') )-1){
					$(currentVal).next().attr('disabled','disabled').addClass('disabled');
				}
				if(currentVal.val() == parseInt($('[data-max-quantity]').attr('data-max-quantity'))){
					$(currentVal).next().attr('disabled','disabled').addClass('disabled');
					return false;
				}
				else{
					currentVal.val(parseInt(currentVal.val()) + 1);					
				}
				$(currentVal).prev().removeAttr('disabled').removeClass('disabled');
			})

		});
	});
	
	// tCal 
	$.fn.tcal = (function(){
		$(".tcal").on('focus', function(){
			$('body').attr('data-scroll-position', $(document).scrollTop());
			//if(navigator.userAgent.match(/iPhone/i)){ 
				$(this).blur();
			//}
			
			var tcalHeight = $(window).height();
			
			$('html, body').animate({
				scrollTop: $('.tcal').offset().top - 29,
			},500, function(){
				$('#tcal').css({'min-height':tcalHeight + 60 + "px"}).focus();
				$('html, body').css({
					'height':tcalHeight + "px",
					'overflow-y':'hidden'
				})
			});				
		});			
	});
	
	// SLIDER CONTROL
	$.fn.slider = (function(){
		$(".slideBar").noUiSlider({
			range: [0,100],
			start: [0],
			step: [1],
			handles: 1,
			slide: function(){
				var values = $(this).val();
				$('.slidebarVal').text(	values );
				$(this).find('[aria-valuenow]').attr('aria-valuenow', values);	
			}
		}).noUiSlider("disabled",false);
	});
	
	// ON/OFF SLIDE SWITCH 
	$.fn.sliderSwitch = (function(){
		$('.btn-switch > input[type="checkbox"]').each(function(){
			if( $(this).is(':checked') ){
				$(this).parent().addClass('checked');
				$(this).next('.btn-slider-on').next('.btn-slider').animate({
					'margin-left': $(this).width() / 2
				});
			}
			else{
				$(this).parent().addClass('UNchecked');
				$(this).next('.btn-slider-on').next('.btn-slider').animate({
					'margin-left': '0'
				});
			}
		});
		
		$('.btn-switch > input[type="checkbox"]').on('click', function(){
			
			if($(this).parent().hasClass('checked')){
				//$(this).addClass('checked');				
				$(this).parent().addClass('UNchecked').removeClass('checked');
				$(this).next('.btn-slider-on').next('.btn-slider').animate({
					'margin-left':'0'
				});
			}
			else{
				$(this).parent().removeClass('UNchecked').addClass('checked');
				$(this).next('.btn-slider-on').next('.btn-slider').animate({
					'margin-left': $(this).width() / 2
				});				
			}
			
		});
	});

	
	// MAKE ALL CONTAINERS SAME HEIGHT
	$.fn.setautoSize = (function(){
		$('.autoSize').each(function(){
			var autoSize = $(this).find('.autoSize-this').tallestSize() + "px";
			
			$(this).find('.autoSize-this').each(function(){
				$(this).css({'height':autoSize});
			});		
		});
	});

	// SELECT ELEMENT SKIN
	$.fn.wrapSelect = (function(){
		$('.mod-select').each(function(){
			var sel = $(this);
			var selectedText = $(':selected', $(this)).text();

			
			var is_mac_safari = navigator.userAgent.indexOf("Mac");
			var is_pc_safari = navigator.userAgent.indexOf("Safari");
			var is_chrome = navigator.userAgent.indexOf('Chrome');
			
			if((is_mac_safari > -1) && (is_chrome == -1)) { /* Mac Safari */
				var selectWidth = $(this).width() + 0;					
			}	
			else if((is_pc_safari > -1) && (is_chrome == -1)) {
				var selectWidth = $(this).width() + 24;	/* PC Safari */
			}
			else{
				var selectWidth = $(this).width() + 10;	/* modern browsers */				
			}
			
			$(this).css({
				'opacity':'0',
				'filter':'alpha(opacity=0)'
			});
			
			$(this).wrap('<span class="selectWrap"></span>');
			$(this).parent().append('<span style="min-width:'+selectWidth+'px">' + selectedText + '<i class="cssIcon-chevron-d-w"></i></span>');
			
			$(this).on('change', function(){
				var selectedText = $(':selected', $(this)).text(); 
				$(this).next().text( selectedText ).append('<i class="cssIcon-chevron-d-w"></i>');									
			});			
			
			
		});	
	});

	// CLEAR FORM FIELD
	$.fn.clearField = (function(){
		$('.reset-field').on('click', function(){
			$(this).prev().prop('value','').focus();
		});
	});
}(window.jQuery);

/**
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne <brian@cherne.net>
*/
!function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};}(window.jQuery);

/* ===================================================
	* bootstrap-transition.js v2.3.2
	* http://twitter.github.com/bootstrap/javascript.html#transitions
	* ===================================================
	* Copyright 2012 Twitter, Inc.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	* http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
* ========================================================== */
!function ($) {
	"use strict"; // jshint ;_;
	
	/* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
   * ======================================================= */

   $(function () {
      $.support.transition = (function () {
         var transitionEnd = (function () {
            var el = document.createElement('bootstrap'), 
				transEndEventNames = {
					'WebkitTransition' : 'webkitTransitionEnd',
					'MozTransition'    : 'transitionend',
					'OTransition'      : 'oTransitionEnd otransitionend',
					'transition'       : 'transitionend'
				}
				, name

        for (name in transEndEventNames){
          if (el.style[name] !== undefined) {
            return transEndEventNames[name]
          }
        }

      }())

      return transitionEnd && {
        end: transitionEnd
      }

    })()

  })

}(window.jQuery);
//
/* ==========================================================
 * bootstrap-alert.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* ALERT CLASS DEFINITION
  * ====================== */

  var dismiss = '[data-dismiss="alert"]'
    , Alert = function (el) {
        $(el).on('click', dismiss, this.close)
      }

  Alert.prototype.close = function (e) {
    var $this = $(this)
      , selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)

    e && e.preventDefault()

    $parent.length || ($parent = $this.hasClass('alert') ? $this : $this.parent())

    $parent.trigger(e = $.Event('close'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent
        .trigger('closed')
        .remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent.on($.support.transition.end, removeElement) :
      removeElement()
  }


 /* ALERT PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('alert')
      if (!data) $this.data('alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


 /* ALERT NO CONFLICT
  * ================= */

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


 /* ALERT DATA-API
  * ============== */

  $(document).on('click.alert.data-api', dismiss, Alert.prototype.close)

}(window.jQuery);
//
/* ============================================================
 * bootstrap-button.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* BUTTON PUBLIC CLASS DEFINITION
  * ============================== */

  var Button = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.button.defaults, options)
  }

  Button.prototype.setState = function (state) {
    var d = 'disabled'
      , $el = this.$element
      , data = $el.data()
      , val = $el.is('input') ? 'val' : 'html'

    state = state + 'Text'
    data.resetText || $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ? 
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d)
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons-radio"]')

    $parent && $parent
      .find('.active')
      .removeClass('active')

    this.$element.toggleClass('active');
	 this.$element.trigger('state_change');
  }


 /* BUTTON PLUGIN DEFINITION
  * ======================== */


  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('button')
        , options = typeof option == 'object' && option
      if (!data) $this.data('button', (data = new Button(this, options)))
      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.defaults = {
    loadingText: 'Loading'
  }

  $.fn.button.Constructor = Button


 /* BUTTON NO CONFLICT
  * ================== */

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }
   
  /* added by do6596 */
  $(document).on('click.button.data-api', '[data-loading-text]', function(e) {
	  var $btn = $(e.target);
	  $btn.button('loading');
  })
	
 /* BUTTON DATA-API
  * =============== */

  $(document).on('click.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
  })

}(window.jQuery);

/* =============================================================
 * bootstrap-collapse.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* COLLAPSE PUBLIC CLASS DEFINITION
  * ================================ */
  var Collapse = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.collapse.defaults, options)

    if (this.options.parent) {
      this.$parent = $(this.options.parent)
    }

    this.options.toggle && this.toggle()
  }

  Collapse.prototype = {

    constructor: Collapse

  , dimension: function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }

  , show: function () {
      var dimension
        , scroll
        , actives
        , hasData

			if (this.transitioning || this.$element.hasClass('in')) return

      dimension = this.dimension()
      scroll = $.camelCase(['scroll', dimension].join('-'))
      actives = this.$parent && this.$parent.find('> .accordion-group > .in')

      if (actives && actives.length) {
        hasData = actives.data('collapse')
        if (hasData && hasData.transitioning) return
        actives.collapse('hide')
        hasData || actives.data('collapse', null)
      }

      this.$element[dimension](0)
      this.transition('addClass', $.Event('show'), 'shown')
      $.support.transition && this.$element[dimension](this.$element[0][scroll])
    }

  , hide: function () {
      var dimension
      if (this.transitioning || !this.$element.hasClass('in')) return
      dimension = this.dimension()
      this.reset(this.$element[dimension]())
      this.transition('removeClass', $.Event('hide'), 'hidden')
      this.$element[dimension](0)
    }

  , reset: function (size) {
      var dimension = this.dimension()

      this.$element
        .removeClass('collapse')
        [dimension](size || 'auto')
        [0].offsetWidth

      this.$element[size !== null ? 'addClass' : 'removeClass']('collapse')

      return this
    }

  , transition: function (method, startEvent, completeEvent) {
      var that = this
        , complete = function () {
            if (startEvent.type == 'show') that.reset()
            that.transitioning = 0
            that.$element.trigger(completeEvent)
          }

      this.$element.trigger(startEvent)

      if (startEvent.isDefaultPrevented()) return

      this.transitioning = 1

      this.$element[method]('in')

      $.support.transition && this.$element.hasClass('collapse') ?
        this.$element.one($.support.transition.end, complete) :
        complete()
    }

  , toggle: function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* COLLAPSE PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('collapse')
        , options = $.extend({}, $.fn.collapse.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.defaults = {
    toggle: true
  }

  $.fn.collapse.Constructor = Collapse


 /* COLLAPSE NO CONFLICT
  * ==================== */

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


 /* COLLAPSE DATA-API
  * ================= */

  $(document).on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this = $(this), href
      , target = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
      , option = $(target).data('collapse') ? 'toggle' : $this.data()
    $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    $(target).collapse(option)
  })	
	
}(window.jQuery);
/* ============================================================
 * bootstrap-dropdown.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle=dropdown]'
    , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      var $this = $(this)
        , $parent
        , isActive

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      clearMenus()

      if (!isActive) {
        if ('ontouchstart' in document.documentElement) {
          // if mobile we we use a backdrop because click events don't delegate
          $('<div class="dropdown-backdrop"/>').insertBefore($(this)).on('click', clearMenus)
        }
        $parent.toggleClass('open')
      }

      $this.focus()

      return false
    }

  , keydown: function (e) {
      var $this
        , $items
        , $active
        , $parent
        , isActive
        , index

      if (!/(38|40|27)/.test(e.keyCode)) return

      $this = $(this)

      e.preventDefault()
      e.stopPropagation()

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      if (!isActive || (isActive && e.keyCode == 27)) {
        if (e.which == 27) $parent.find(toggle).focus()
        return $this.click()
      }

      $items = $('[role=menu] li:not(.divider):visible a', $parent)

      if (!$items.length) return

      index = $items.index($items.filter(':focus'))

      if (e.keyCode == 38 && index > 0) index--                                        // up
      if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
      if (!~index) index = 0

      $items
        .eq(index)
        .focus()
    }

  }

  function clearMenus() {
    $('.dropdown-backdrop').remove()
    $(toggle).each(function () {
      getParent($(this)).removeClass('open')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = selector && $(selector)

    if (!$parent || !$parent.length) $parent = $this.parent()

    return $parent
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


 /* DROPDOWN NO CONFLICT
  * ==================== */

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(document)
    .on('click.dropdown.data-api', clearMenus)
    .on('click.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);

/* =========================================================
 * bootstrap-modal.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function ($) {

  "use strict"; // jshint ;_;


 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function (element, options) {
    this.options = options
    this.$element = $(element)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
    //this.options.remote && this.$element.find('.modal-body').load(this.options.remote)
    this.options.remote && this.$element.load(this.options.remote)
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        $('body').attr('data-scroll-position', $(document).scrollTop()); 
		  
		  var that = this
          , e = $.Event('show')

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        this.isShown = true

        this.escape()

        this.backdrop(function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          if (!that.$element.parent().length) {
            that.$element.appendTo(document.body) //don't move modals dom position
          }

          that.$element.show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element
            .addClass('in')
            .attr('aria-hidden', false)

          that.enforceFocus()

          transition ?
            that.$element.one($.support.transition.end, function () { that.$element.focus().trigger('shown') }) :
            that.$element.focus().trigger('shown')			 
		  })		  	  
      }

    , hide: function (e) {
		  e && e.preventDefault()

        var that = this

        e = $.Event('hide')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        this.escape()

        $(document).off('focusin.modal')

        this.$element
          .removeClass('in')
          .attr('aria-hidden', true)

        $.support.transition && this.$element.hasClass('fade') ?
          this.hideWithTransition() :
          this.hideModal()
			
		  $('[data-toggle="modal"]').button('reset'); 		  
      }

    , enforceFocus: function () {
        var that = this
        $(document).on('focusin.modal', function (e) {
          if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
            that.$element.focus()
          }
        })
      }

    , escape: function () {
        var that = this
        if (this.isShown && this.options.keyboard) {
          this.$element.on('keyup.dismiss.modal', function ( e ) {
            e.which == 27 && that.hide()				
          })
        } else if (!this.isShown) {
          this.$element.off('keyup.dismiss.modal')
        }
      }

    , hideWithTransition: function () {
        var that = this
          , timeout = setTimeout(function () {
              that.$element.off($.support.transition.end)
              that.hideModal()
            }, 500)

        this.$element.one($.support.transition.end, function () {
          clearTimeout(timeout)
          that.hideModal()
        })
      }

    , hideModal: function () {
        var that = this
        this.$element.hide()
        this.backdrop(function () {
          that.removeBackdrop()
          that.$element.trigger('hidden')
        })
      }

    , removeBackdrop: function () {
        this.$backdrop && this.$backdrop.remove()
        this.$backdrop = null
      }

    , backdrop: function (callback) {
        var that = this
          , animate = this.$element.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
          var doAnimate = $.support.transition && animate

          this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
            .appendTo(document.body)

          this.$backdrop.click(
            this.options.backdrop == 'static' ?
              $.proxy(this.$element[0].focus, this.$element[0])
            : $.proxy(this.hide, this)
          )

          if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

          this.$backdrop.addClass('in')

          if (!callback) return

          doAnimate ?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass('in')

          $.support.transition && this.$element.hasClass('fade')?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (callback) {
          callback()
        }
      }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.modal

  $.fn.modal = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  $.fn.modal.Constructor = Modal


 /* MODAL NO CONFLICT
  * ================= */

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


 /* MODAL DATA-API
  * ============== */

 	$(document).on('click.modal.data-api', '[data-toggle="modal"]', function (e) {
    	var $this = $(this)
      	, href = $this.attr('href')
      	, $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
      	, option = $target.data('modal') ? 'toggle' : $.extend({ remote:!/#/.test(href) && href }, $target.data(), $this.data())

    	e.preventDefault()

    	$('.modal').on('shown', function(){
			$.fn.modalScrollfix();
			$('html').css({'overflow':'hidden'});
			$('body').css({
				'overflow':'hidden',
				'position':'fixed',
				'height':$(window).height()+'px'
			});
	 	})
	 
	 	$target.modal(option).one('hidden', function () {
		 	$('html').css({'overflow':'scroll'});
			$('body').removeAttr('style');
			$(document).scrollTop($('body').attr('data-scroll-position'));
		 	$this.focus();
   	})	
		
		if( navigator.userAgent.match(/IEMobile\/9\.0/) && navigator.userAgent.match(/Windows Phone OS 7\.5/) ){
			setTimeout(function(){
				$.fn.modalScrollfix();
			}, 500);
		}

	}) 
}(window.jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#tabs
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.parent('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab'
      , relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')
	 
    function next() {
      
		$active
        .removeClass('active')
		  .not('.tab-pane').attr({
				'aria-selected' : 'false'
			})
		$active.not('.tab').attr({
				'aria-hidden':'true'
			})
			
      element.addClass('active')
		   .not('.tab-pane').attr({
				'aria-selected' : 'true'
			})
		element.not('.tab').attr({
				'aria-hidden':'false'
			})

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one($.support.transition.end, next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#affix
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)
    this.$window = $(window)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element = $(element)
    this.affixed  =
    this.unpin    = null

    this.checkPosition()
  }

  Affix.RESET = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }


  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$window.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin) this.$element.css('top', '')

    this.affixed = affix
    this.unpin   = affix == 'bottom' ? position.top - scrollTop : null

    this.$element.removeClass(Affix.RESET).addClass('affix' + (affix ? '-' + affix : ''))

    if (affix == 'bottom') {
      this.$element.offset({ top: document.body.offsetHeight - offsetBottom - this.$element.height() })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      $spy.affix(data)
    })
  })

}(window.jQuery);


/* Placeholders.js v2.1.0 */
!function(a){"use strict";function b(a,b,c){return a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):void 0}function c(a,b){var c,d;for(c=0,d=a.length;d>c;c++)if(a[c]===b)return!0;return!1}function d(a,b){var c;a.createTextRange?(c=a.createTextRange(),c.move("character",b),c.select()):a.selectionStart&&(a.focus(),a.setSelectionRange(b,b))}function e(a,b){try{return a.type=b,!0}catch(c){return!1}}a.Placeholders={Utils:{addEventListener:b,inArray:c,moveCaret:d,changeType:e}}}(this),function(a){"use strict";function b(){}function c(a){var b;return a.value===a.getAttribute(G)&&"true"===a.getAttribute(H)?(a.setAttribute(H,"false"),a.value="",a.className=a.className.replace(F,""),b=a.getAttribute(I),b&&(a.type=b),!0):!1}function d(a){var b,c=a.getAttribute(G);return""===a.value&&c?(a.setAttribute(H,"true"),a.value=c,a.className+=" "+E,b=a.getAttribute(I),b?a.type="text":"password"===a.type&&R.changeType(a,"text")&&a.setAttribute(I,"password"),!0):!1}function e(a,b){var c,d,e,f,g;if(a&&a.getAttribute(G))b(a);else for(c=a?a.getElementsByTagName("input"):o,d=a?a.getElementsByTagName("textarea"):p,g=0,f=c.length+d.length;f>g;g++)e=g<c.length?c[g]:d[g-c.length],b(e)}function f(a){e(a,c)}function g(a){e(a,d)}function h(a){return function(){q&&a.value===a.getAttribute(G)&&"true"===a.getAttribute(H)?R.moveCaret(a,0):c(a)}}function i(a){return function(){d(a)}}function j(a){return function(b){return s=a.value,"true"===a.getAttribute(H)&&s===a.getAttribute(G)&&R.inArray(C,b.keyCode)?(b.preventDefault&&b.preventDefault(),!1):void 0}}function k(a){return function(){var b;"true"===a.getAttribute(H)&&a.value!==s&&(a.className=a.className.replace(F,""),a.value=a.value.replace(a.getAttribute(G),""),a.setAttribute(H,!1),b=a.getAttribute(I),b&&(a.type=b)),""===a.value&&(a.blur(),R.moveCaret(a,0))}}function l(a){return function(){a===document.activeElement&&a.value===a.getAttribute(G)&&"true"===a.getAttribute(H)&&R.moveCaret(a,0)}}function m(a){return function(){f(a)}}function n(a){a.form&&(x=a.form,x.getAttribute(J)||(R.addEventListener(x,"submit",m(x)),x.setAttribute(J,"true"))),R.addEventListener(a,"focus",h(a)),R.addEventListener(a,"blur",i(a)),q&&(R.addEventListener(a,"keydown",j(a)),R.addEventListener(a,"keyup",k(a)),R.addEventListener(a,"click",l(a))),a.setAttribute(K,"true"),a.setAttribute(G,v),d(a)}var o,p,q,r,s,t,u,v,w,x,y,z,A,B=["text","search","url","tel","email","password","number","textarea"],C=[27,33,34,35,36,37,38,39,40,8,46],D="#ccc",E="placeholdersjs",F=new RegExp("(?:^|\\s)"+E+"(?!\\S)"),G="data-placeholder-value",H="data-placeholder-active",I="data-placeholder-type",J="data-placeholder-submit",K="data-placeholder-bound",L="data-placeholder-focus",M="data-placeholder-live",N=document.createElement("input"),O=document.getElementsByTagName("head")[0],P=document.documentElement,Q=a.Placeholders,R=Q.Utils;if(Q.nativeSupport=void 0!==N.placeholder,!Q.nativeSupport){for(o=document.getElementsByTagName("input"),p=document.getElementsByTagName("textarea"),q="false"===P.getAttribute(L),r="false"!==P.getAttribute(M),t=document.createElement("style"),t.type="text/css",u=document.createTextNode("."+E+" { color:"+D+"; }"),t.styleSheet?t.styleSheet.cssText=u.nodeValue:t.appendChild(u),O.insertBefore(t,O.firstChild),A=0,z=o.length+p.length;z>A;A++)y=A<o.length?o[A]:p[A-o.length],v=y.attributes.placeholder,v&&(v=v.nodeValue,v&&R.inArray(B,y.type)&&n(y));w=setInterval(function(){for(A=0,z=o.length+p.length;z>A;A++)y=A<o.length?o[A]:p[A-o.length],v=y.attributes.placeholder,v&&(v=v.nodeValue,v&&R.inArray(B,y.type)&&(y.getAttribute(K)||n(y),(v!==y.getAttribute(G)||"password"===y.type&&!y.getAttribute(I))&&("password"===y.type&&!y.getAttribute(I)&&R.changeType(y,"text")&&y.setAttribute(I,"password"),y.value===y.getAttribute(G)&&(y.value=v),y.setAttribute(G,v))));r||clearInterval(w)},100)}Q.disable=Q.nativeSupport?b:f,Q.enable=Q.nativeSupport?b:g}(this);


// ACCESSIBLE ACCORDION (EXPAND/COLLAPSE)
$(document).ready(function() {

  var panel1 = new tabpanel("accordion1", true);
});

//
// keyCodes() is an object to contain keycodes needed for the application
//
function keyCodes() {
  // Define values for keycodes
  this.tab        = 9;
  this.enter      = 13;
  this.esc        = 27;

  this.space      = 32;
  this.pageup     = 33;
  this.pagedown   = 34;
  this.end        = 35;
  this.home       = 36;

  this.left       = 37;
  this.up         = 38;
  this.right      = 39;
  this.down       = 40;

} // end keyCodes

//
// tabpanel() is a class constructor to create a ARIA-enabled tab panel widget.
//
// @param (id string) id is the id of the div containing the tab panel.
//
// @param (accordion boolean) accordion is true if the tab panel should operate
//         as an accordion; false if a tab panel
//
// @return N/A
//
// Usage: Requires a div container and children as follows:
//
//         1. tabs/accordion headers have class 'tab'
//
//         2. panels are divs with class 'panel'
//
function tabpanel(id, accordion) {

  // define the class properties
  
  this.panel_id = id; // store the id of the containing div
  this.accordion = accordion; // true if this is an accordion control
  this.$panel = $('#' + id);  // store the jQuery object for the panel
  this.keys = new keyCodes(); // keycodes needed for event handlers
  this.$tabs = this.$panel.find('.toggle-header'); // Array of panel tabs.
  this.$panels = this.$panel.children('.toggle-header + div'); // Array of panel.

  // Bind event handlers
  this.bindHandlers();

  // Initialize the tab panel
  this.init();

} // end tabpanel() constructor

//
// Function init() is a member function to initialize the tab/accordion panel. Hides all panels. If a tab
// has the class 'selected', makes that panel visible; otherwise, makes first panel visible.
//
// @return N/A
//
tabpanel.prototype.init = function() {
  var $tab; // the selected tab - if one is selected

  // add aria attributes to the panels
  this.$panels.attr('aria-hidden', 'true');

  // hide all the panels
  this.$panels.hide();

  // get the selected tab
  $tab = this.$tabs.filter('.selected');

  if ($tab == undefined) {
    $tab = this.$tabs.first();
    $tab.addClass('selected');
  }

  // show the panel that the selected tab controls and set aria-hidden to false
  this.$panel.find('#' + $tab.attr('aria-controls')).show().attr('aria-hidden', 'false');

} // end init()

//
// Function switchTabs() is a member function to give focus to a new tab or accordion header.
// If it's a tab panel, the currently displayed panel is hidden and the panel associated with the new tab
// is displayed.
//
// @param ($curTab obj) $curTab is the jQuery object of the currently selected tab
//
// @param ($newTab obj) $newTab is the jQuery object of new tab to switch to
//
// @return N/A
//
tabpanel.prototype.switchTabs = function($curTab, $newTab) {

  // Remove the highlighting from the current tab
  $curTab.removeClass('selected focus');

  // remove tab from the tab order and update its aria-selected attribute
  $curTab.attr('tabindex', '-1').attr('aria-selected', 'false');

  
  // Highlight the new tab and update its aria-selected attribute
  $newTab.addClass('selected').attr('aria-selected', 'true');

  // If this is a tab panel, swap displayed tabs
  if (this.accordion == false) {
    // hide the current tab panel and set aria-hidden to true
    this.$panel.find('#' + $curTab.attr('aria-controls')).hide().attr('aria-hidden', 'true');

      // update the aria-expanded attribute for the old tab
      $curTab.attr('aria-expanded', 'false');

    // show the new tab panel and set aria-hidden to false
    this.$panel.find('#' + $newTab.attr('aria-controls')).show().attr('aria-hidden', 'false');

      // update the aria-expanded attribute for the new tab
      $newTab.attr('aria-expanded', 'true');

    // get new list of focusable elements
    this.$focusable.length = 0;
          this.$panels.find(':focusable');
  }

  // Make new tab navigable
  $newTab.attr('tabindex', '0');

  // give the new tab focus
  $newTab.focus();

} // end switchTabs()

//
// Function togglePanel() is a member function to display or hide the panel
// associated with an accordion header. Function also binds a keydown handler to the focusable items
// in the panel when expanding and unbinds the handlers when collapsing.
//
// @param ($tab obj) $tab is the jQuery object of the currently selected tab
//
// @return N/A
//
tabpanel.prototype.togglePanel = function($tab) {

  $panel = this.$panel.find('#' + $tab.attr('aria-controls'));
	if ($panel.attr('aria-hidden') == 'true') {
		$panel.attr('data-scroll-position', $(document).scrollTop());
		$panel.attr('aria-hidden', 'false');
		$panel.slideDown(300);
		$tab.find('i').removeClass().addClass('cssIcon-toggle-minus').html('expanded');
		$tab.attr('aria-expanded', 'true');
		$("html, body").animate({scrollTop:$tab.offset().top},500);
	}
	else {	
		$panel.attr('aria-hidden', 'true');
		$panel.slideUp(300);
		$tab.find('i').removeClass().addClass('cssIcon-toggle-plus').html('collapsed');    
		$tab.attr('aria-expanded', 'false');
	}
} 
// end togglePanel()

//
// Function bindHandlers() is a member function to bind event handlers for the tabs
//
// @return N/A
//
tabpanel.prototype.bindHandlers = function() {

  var thisObj = this; // Store the this pointer for reference

  //////////////////////////////
  // Bind handlers for the tabs / accordion headers

  // bind a tab keydown handler
  this.$tabs.keydown(function(e) {
    return thisObj.handleTabKeyDown($(this), e);
  });

  // bind a tab keypress handler
  this.$tabs.keypress(function(e) {
    return thisObj.handleTabKeyPress($(this), e);
  });

  // bind a tab click handler
  this.$tabs.click(function(e) {
    return thisObj.handleTabClick($(this), e);
  });

  // bind a tab focus handler
  this.$tabs.focus(function(e) {
    return thisObj.handleTabFocus($(this), e);
  });

  // bind a tab blur handler
  this.$tabs.blur(function(e) {
    return thisObj.handleTabBlur($(this), e);
  });

  /////////////////////////////
  // Bind handlers for the panels
  
  // bind a keydown handlers for the panel focusable elements
  this.$panels.keydown(function(e) {
    return thisObj.handlePanelKeyDown($(this), e);
  });

  // bind a keypress handler for the panel
  this.$panels.keypress(function(e) {
    return thisObj.handlePanelKeyPress($(this), e);
  });

   // bind a panel click handler
  this.$panels.click(function(e) {
    return thisObj.handlePanelClick($(this), e);
  });

} // end bindHandlers()

//
// Function handleTabKeyDown() is a member function to process keydown events for a tab
//
// @param ($tab obj) $tab is the jquery object of the tab being processed
//
// @param (e obj) e is the associated event object
//
// @return (boolean) Returns true if propagating; false if consuming event
//
tabpanel.prototype.handleTabKeyDown = function($tab, e) {

  if (e.altKey) {
    // do nothing
    return true;
  }

  switch (e.keyCode) {
    case this.keys.enter:
    case this.keys.space: {

      // Only process if this is an accordion widget
      if (this.accordion == true) {
        // display or collapse the panel
        this.togglePanel($tab);

        e.stopPropagation();
        return false;
      }

      return true;
    }
    case this.keys.left:
    case this.keys.up: {

      var thisObj = this;
      var $prevTab; // holds jQuery object of tab from previous pass
      var $newTab; // the new tab to switch to

      if (e.ctrlKey) {
        // Ctrl+arrow moves focus from panel content to the open
        // tab/accordion header.
      }
      else {
        var curNdx = this.$tabs.index($tab);

        if (curNdx == 0) {
          // tab is the first one:
          // set newTab to last tab
          $newTab = this.$tabs.last();
        }
        else {
          // set newTab to previous
          $newTab = this.$tabs.eq(curNdx - 1);
        }

        // switch to the new tab
        this.switchTabs($tab, $newTab);
      }

      e.stopPropagation();
      return false;
    }
    case this.keys.right:
    case this.keys.down: {

      var thisObj = this;
      var foundTab = false; // set to true when current tab found in array
      var $newTab; // the new tab to switch to

      var curNdx = this.$tabs.index($tab);

      if (curNdx == this.$tabs.length-1) {
        // tab is the last one:
        // set newTab to first tab
        $newTab = this.$tabs.first();
      }
      else {
        // set newTab to next tab
        $newTab = this.$tabs.eq(curNdx + 1);
      }

      // switch to the new tab
      this.switchTabs($tab, $newTab);

      e.stopPropagation();
      return false;
    }
    case this.keys.home: {

      // switch to the first tab
      this.switchTabs($tab, this.$tabs.first());

      e.stopPropagation();
      return false;
    }
    case this.keys.end: {

      // switch to the last tab
      this.switchTabs($tab, this.$tabs.last());

      e.stopPropagation();
      return false;
    }
  }
} // end handleTabKeyDown()

//
// Function handleTabKeyPress() is a member function to process keypress events for a tab.
//
//
// @param ($tab obj) $tab is the jquery object of the tab being processed
//
// @param (e obj) e is the associated event object
//
// @return (boolean) Returns true if propagating; false if consuming event
//
tabpanel.prototype.handleTabKeyPress = function($tab, e) {

  if (e.altKey) {
    // do nothing
    return true;
  }

  switch (e.keyCode) {
    case this.keys.enter:
    case this.keys.space:
    case this.keys.left:
    case this.keys.up:
    case this.keys.right:
    case this.keys.down:
    case this.keys.home:
    case this.keys.end: {
      e.stopPropagation();
      return false;
    }
    case this.keys.pageup:
    case this.keys.pagedown: {

      // The tab keypress handler must consume pageup and pagedown
      // keypresses to prevent Firefox from switching tabs
      // on ctrl+pageup and ctrl+pagedown

      if (!e.ctrlKey) {
        return true;
      }

      e.stopPropagation();
      return false;
    }
  }

  return true;

} // end handleTabKeyPress()

//
// Function handleTabClick() is a member function to process click events for tabs
//
// @param ($tab object) $tab is the jQuery object of the tab being processed
//
// @param (e object) e is the associated event object
//
// @return (boolean) returns false
//
tabpanel.prototype.handleTabClick = function($tab, e) {

  // make clicked tab navigable
  $tab.attr('tabindex', '0').attr('aria-selected', 'true').addClass('selected');

  // remove all tabs from the tab order and update their aria-selected attribute
  this.$tabs.not($tab).attr('tabindex', '-1').attr('aria-selected', 'false').removeClass('selected');

  // Expand the new panel
  this.togglePanel($tab);

  e.stopPropagation();
  return false;

} // end handleTabClick()

//
// Function handleTabFocus() is a member function to process focus events for tabs
//
// @param ($tab object) $tab is the jQuery object of the tab being processed
//
// @param (e object) e is the associated event object
//
// @return (boolean) returns true
//
tabpanel.prototype.handleTabFocus = function($tab, e) {

  // Add the focus class to the tab
  $tab.addClass('focus');

  return true;

} // end handleTabFocus()

//
// Function handleTabBlur() is a member function to process blur events for tabs
//
// @param ($tab object) $tab is the jQuery object of the tab being processed
//
// @param (e object) e is the associated event object
//
// @return (boolean) returns true
//
tabpanel.prototype.handleTabBlur = function($tab, e) {

  // Remove the focus class to the tab
  $tab.removeClass('focus');

  return true;

} // end handleTabBlur()


/////////////////////////////////////////////////////////
// Panel Event handlers
//


//
// Function handlePanelKeyDown() is a member function to process keydown events for a panel
//
// @param ($panel obj) $panel is the jquery object of the panel being processed
//
// @param (e obj) e is the associated event object
//
// @return (boolean) Returns true if propagating; false if consuming event
//
tabpanel.prototype.handlePanelKeyDown = function($panel, e) {

  if (e.altKey) {
    // do nothing
    return true;
  }

  switch (e.keyCode) {
    case this.keys.tab: {
      var $focusable = $panel.find(':focusable');
      var curNdx = $focusable.index($(e.target));
      var panelNdx = this.$panels.index($panel);
      var numPanels = this.$panels.length

      if (e.shiftKey) {
        // if this is the first focusable item in the panel
        // find the preceding expanded panel (if any) that has
        // focusable items and set focus to the last one in that
        // panel. If there is no preceding panel or no focusable items
        // do not process.
        if (curNdx == 0 && panelNdx > 0) {

          // Iterate through previous panels until we find one that
          // is expanded and has focusable elements
          //
          for (var ndx = panelNdx - 1; ndx >= 0; ndx--) {

            var $prevPanel = this.$panels.eq(ndx);
                  var $prevTab = $('#' + $prevPanel.attr('aria-labelledby'));

            // get the focusable items in the panel
            $focusable.length = 0;
            $focusable = $prevPanel.find(':focusable');

            if ($focusable.length > 0) {
              // there are focusable items in the panel.
              // Set focus to the last item.
              $focusable.last().focus();

                     // reset the aria-selected state of the tabs
                     this.$tabs.attr('aria-selected', 'false').removeClass('selected');

                     // set the associated tab's aria-selected state
                     $prevTab.attr('aria-selected', 'true').addClass('selected');

              e.stopPropagation;
              return false;
            }
          }
        }
      }
      else if (panelNdx < numPanels) {

        // if this is the last focusable item in the panel
        // find the nearest following expanded panel (if any) that has
        // focusable items and set focus to the first one in that
        // panel. If there is no preceding panel or no focusable items
        // do not process.
        if (curNdx == $focusable.length - 1) {

          // Iterate through following panels until we find one that
          // is expanded and has focusable elements
          //
          for (var ndx = panelNdx + 1; ndx < numPanels; ndx++) {

            var $nextPanel = this.$panels.eq(ndx);
                  var $nextTab = $('#' + $nextPanel.attr('aria-labelledby'));

            // get the focusable items in the panel
            $focusable.length = 0;
            $focusable = $nextPanel.find(':focusable');

            if ($focusable.length > 0) {
              // there are focusable items in the panel.
              // Set focus to the first item.
              $focusable.first().focus();

                     // reset the aria-selected state of the tabs
                     this.$tabs.attr('aria-selected', 'false').removeClass('selected');

                     // set the associated tab's aria-selected state
                     $nextTab.attr('aria-selected', 'true').addClass('selected');

              e.stopPropagation;
              return false;
            }
          }
        }
      }

      break;
    }
    case this.keys.left:
    case this.keys.up: {

      if (!e.ctrlKey) {
        // do not process
        return true;
      }
  
      // get the jQuery object of the tab
      var $tab = $('#' + $panel.attr('aria-labelledby'));

      // Move focus to the tab
      $tab.focus();

      e.stopPropagation();
      return false;
    }
    case this.keys.pageup: {

      var $newTab;

      if (!e.ctrlKey) {
        // do not process
        return true;
      }

      // get the jQuery object of the tab
      var $tab = this.$tabs.filter('.selected');

      // get the index of the tab in the tab list
      var curNdx = this.$tabs.index($tab);

      if (curNdx == 0) {
        // this is the first tab, set focus on the last one
        $newTab = this.$tabs.last();
      }
      else {
        // set focus on the previous tab
        $newTab = this.$tabs.eq(curNdx - 1);
      }

      // switch to the new tab
      this.switchTabs($tab, $newTab);

      e.stopPropagation();
      e.preventDefault();
      return false;
    }
    case this.keys.pagedown: {

      var $newTab;

      if (!e.ctrlKey) {
        // do not process
        return true;
      }

      // get the jQuery object of the tab
      var $tab = $('#' + $panel.attr('aria-labelledby'));

      // get the index of the tab in the tab list
      var curNdx = this.$tabs.index($tab);

      if (curNdx == this.$tabs.length-1) {
        // this is the last tab, set focus on the first one
        $newTab = this.$tabs.first();
      }
      else {
        // set focus on the next tab
        $newTab = this.$tabs.eq(curNdx + 1);
      }

      // switch to the new tab
      this.switchTabs($tab, $newTab);

      e.stopPropagation();
      e.preventDefault();
      return false;
    }
  }

  return true;

} // end handlePanelKeyDown()

//
// Function handlePanelKeyPress() is a member function to process keypress events for a panel
//
// @param ($panel obj) $panel is the jquery object of the panel being processed
//
// @param (e obj) e is the associated event object
//
// @return (boolean) Returns true if propagating; false if consuming event
//
tabpanel.prototype.handlePanelKeyPress = function($panel, e) {

  if (e.altKey) {
    // do nothing
    return true;
  }

  if (e.ctrlKey && (e.keyCode == this.keys.pageup || e.keyCode == this.keys.pagedown)) {
      e.stopPropagation();
      e.preventDefault();
      return false;
  }

  switch (e.keyCode) {
    case this.keys.esc: {
      e.stopPropagation();
      e.preventDefault();
      return false;
    }
  }

  return true;

} // end handlePanelKeyPress()

//
// Function handlePanelClick() is a member function to process click events for panels
//
// @param ($panel object) $panel is the jQuery object of the panel being processed
//
// @param (e object) e is the associated event object
//
// @return (boolean) returns true
//
tabpanel.prototype.handlePanelClick = function($panel, e) {

   var $tab = $('#' + $panel.attr('aria-labelledby'));

  // make clicked panel's tab navigable
  $tab.attr('tabindex', '0').attr('aria-selected', 'true').addClass('selected');

  // remove all tabs from the tab order and update their aria-selected attribute
  this.$tabs.not($tab).attr('tabindex', '-1').attr('aria-selected', 'false').removeClass('selected');

  return true;

} // end handlePanelClick()

// focusable is a small jQuery extension to add a :focusable selector. It is used to
// get a list of all focusable elements in a panel. Credit to ajpiano on the jQuery forums.
//
$.extend($.expr[':'], {
  focusable: function(element) {
    var nodeName = element.nodeName.toLowerCase();
    var tabIndex = $(element).attr('tabindex');

    // the element and all of its ancestors must be visible
    if (($(element)[(nodeName == 'area' ? 'parents' : 'closest')](':hidden').length) == true) {
      return false;
    }

    // If tabindex is defined, its value must be greater than 0
    if (!isNaN(tabIndex) && tabIndex < 0) {
      return false;
    }

    // if the element is a standard form control, it must not be disabled
    if (/input|select|textarea|button|object/.test(nodeName) == true) {

             return !element.disabled;
    }

    // if the element is a link, href must be defined
    if ((nodeName == 'a' ||  nodeName == 'area') == true) {

      return (element.href.length > 0);
    }
            
    // this is some other page element that is not normally focusable.
    return false;
  }
});

// DIM SCREEN
		$(document).ready(function(){		
    		$("#dimScreen").css("height", $(document).height()); 		
    		$(".dimAction").click(function(){
    			$("#dimScreen").fadeIn('fast');
    			return false;
			});
    		$(".dimClose").click(function(){
    			$("#dimScreen").fadeOut('fast');
    			return false;
			});	
		});		
		$(window).bind("resize", function(){
		 	$("#dimScreen").css("height", $(window).height());
		});
