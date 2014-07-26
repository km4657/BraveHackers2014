$.fn.tinyToggle = (function(){
	$('.tiny-toggle').each(function(){
		var $closed 	= $(this).attr('data-closed-icon'); // CLOSED ICON CLASS
		var $opened 	= $(this).attr('data-opened-icon'); // OPENED ICON CLASS
		
		$(this).find('.header').not('.opened').addClass('closed').next().slideUp(300);
		$(this).find('.header').not('.closed').next().slideDown(300);
		$(this).find('.header > i').addClass($closed);
		$(this).find('.header.opened').find('i').addClass($opened);
		
		var thisToggle = $(this);
		var allHeaders = $('.header', $(this));
		var allContent = $('.header +', $(this));
		
		if($(this).hasClass('all')){
			$('.header', $(this)).on('click', function(e){
				if($(this).hasClass('closed')){
					$('i', $(thisToggle)).removeClass($opened).addClass($closed);
					$(this).find('i').removeClass($closed).addClass($opened);
					
					$(allHeaders).removeClass('opened').addClass('closed');
					$(this).removeClass('closed').addClass('opened');
					$(allContent).slideUp(300);
					$(this).next().slideDown(300);
				}
				else{
					$(this).find('i').removeClass($opened).addClass($closed);
					$(this).removeClass('opened').addClass('closed')
					$(this).next().slideUp(300);
				}				
				e.preventDefault();	
			});
		}
		else{
			$('.header', $(this)).on('click', function(e){
				if($(this).hasClass('closed')){
					$(this).find('i').removeClass($closed).addClass($opened);
					$(this).removeClass('closed').addClass('opened');
					$(this).next().slideDown(300);
				}
				else{
					$(this).find('i').removeClass($opened).addClass($closed);
					$(this).removeClass('opened').addClass('closed')
					$(this).next().slideUp(300);
				}				
				e.preventDefault();	
			});
		}
		
	});
});