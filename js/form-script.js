$ ('[type="submit"]').click(function() {
	$.post("../php/mail.php", {
		name: $('[name="name"]').val(),
		phone: $('[name="phone"]').val(),
		email: $('[name="email"]').val(),
		message: $('[name="message"]').val()
	},
	function( data ){
		$(".result").html(data);
	});
 });
