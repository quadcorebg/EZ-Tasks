$(document).ready(function () {
	$('#registerForm input[type=email]').focusout(function(e){
		if($(this).val())
	});
});