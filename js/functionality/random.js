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
		$('#bodybg').fadeIn(400, function(){
			if(callback) {
				callback();
			}
		});
	});
	
}

//Logs in a user upon successful login
function log_in_user() {
	getFriends();
	maximize(YW.CHATSCREEN()+YW.MODAL(), function(){
		$('#typemsg').focus();
		$('#icons').html(YW.LOGGED_IN_H());
		$('#icons').css("top","2px");
		$('#icons').css("right","2px");		
		setSearchContainerHeight();
		renderData();
		setLastChat();
		setInterval(function(){checkMessage();},10000);
	});
}
