function maximize(html_val, callback){
	$('#header').animate({height:"6%"},500,"linear",function(){
		//change content here
	});
	$('#footer').animate({height:"6%"},500,"linear",function(){
		//change content here
	});
	$('#bodybg').animate({height:"88%"},500);
	$('#bodybg').fadeOut(500, function(){
		$('#bodybg').html(html_val);
		$('#bodybg').css('background-color','white');
		$('#bodybg').fadeIn(400);
		if(callback) {
			callback();
		}
	});
	
}



//Logs in a user upon successful login
function log_in_user() {
	maximize(YW.CHATSCREEN());
	//this part not working for some resson
	//$('#typemsg').select2('focus');
}
