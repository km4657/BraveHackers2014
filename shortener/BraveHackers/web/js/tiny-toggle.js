// TOGGLE
$.tinyToggle = (function(){
	$('.tiny-toggle').each(function() {
		var $this = $(this);
		var closed = $(this).find('.closed');
		var opened = $(this).find('.opened');
		var headers = $(this).find('.toggle-header');
		var $allNext = $(headers).next();
		var $icons  = $(headers).children('i');
		
		$(closed).slideUp(300);
		$(opened).slideDown(300);						
	
		$(headers).on('click', function(){
			var next = $(this).next();
			var icons  = $(this).children('i');
			
			if( $this.hasClass('all') ){ // if accordion style
				if( $(icons).hasClass('cssIcon-toggle-plus') ){
					$icons.removeClass('cssIcon-toggle-minus').addClass('cssIcon-toggle-plus');
					$(icons).removeClass('cssIcon-toggle-plus').addClass('cssIcon-toggle-minus');
					$allNext.slideUp(300).removeClass('opened').addClass('closed');
					$(next).slideDown(300).removeClass('closed').addClass('opened');												
				}
				else{
					$icons.removeClass('cssIcon-toggle-minus').addClass('cssIcon-toggle-plus');
					$allNext.slideUp(300).removeClass('closed');
				}	
			}
			else{	// simple toggle style
				if( $(icons).hasClass('cssIcon-toggle-plus') ){
					$(icons).removeClass('cssIcon-toggle-plus').addClass('cssIcon-toggle-minus');
					$(next).slideDown(300).addClass('opened');
				}
				else{
					$(icons).removeClass('cssIcon-toggle-minus').addClass('cssIcon-toggle-plus');
					$(next).slideUp(300).removeClass('opened').addClass('closed');
				}
			}					
		});			
	});		
});