var $stiker = $(".sub-menu");

$stiker.waypoint ( function( direction ) {
	if (direction == 'down') {
		$stiker.addClass ('stop'); 
	} else {
		$stiker.removeClass ('stop');
	};
}, { offset: '2%' }); 