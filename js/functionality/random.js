function maximize(html_val){
	$('#header').animate({height:"6%"},500,"linear",function(){
		//change content here
	});
	$('#footer').animate({height:"6%"},500,"linear",function(){
		//change content here
	});
	$('#bodybg').animate({height:"88%"},500);
	$('#bodybg').fadeOut(500, function(){
		$('#bodybg').html(html_val);
		$('#bodybg').fadeIn(400);
	});
}

//Logs in a user upon successful login
function log_in_user() {
	maximize(YW.CHATSCREEN())
}