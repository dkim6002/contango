$(document).ready(function(){
	$(function() {
					
		var $word		= $("#letter-container h2 a"),
			lettering 	= $word.lettering();
		
		// extend the lettering plugin	
		var extensionPlugin 	= {
			wrapper	: function() {
				var $w	= this;
				$w.children('span').each( function() {
					var $el	= $(this),
						t 	= $el.text();
					
					if( t !== ' ' ) {	
						var $newStruc	= $('<div class="twrap"><div class="tbg"><span>' + t + '</span></div><div class="tup"><div class="tfront"><span>' + t + '</span></div><div class="tback"><span>' + t + '</span></div></div><div class="tdown"><span>' + t + '</span></div></div>');
						
						$newStruc.insertAfter( $el );
						$el.remove();
					}
					
				});
			}
		};
		$.extend( true, lettering, extensionPlugin );
		lettering.wrapper();
	});
});

