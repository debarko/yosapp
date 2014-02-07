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
		checkForWPass();
		setInterval(function(){checkMessage();},10000);
		$('#typemsg').keypress(function(e) {
	        // Enter pressed?
	        if(e.keyCode == 10 || e.keyCode == 13) {
	        	sendMyMsg($("#typemsg").val());
	        }
	    });
	});
}



// show example tips on input fields
function showInputTipsOnload(){ 
	//todo call this function once one chatscreen load
	var ids = $('.showTipInputFields').map(function(index) {
	    //select the input element against ID
	    var inputField =  $('#'+this.id);
	    // Get the "tip" attribute value from the input elements
	    var tip = inputField.attr('tip');
	    inputField.val(tip);
	    
	    return tip; 
	});
}
function hideInputTipsOnclick(id){
	var inputElement = $(id);
	if( inputElement.val() == inputElement.attr('tip') ){
		inputElement.removeClass('showTipInputFields');
		inputElement.val('');
	}
}
function showInputTipsOnblur(id){
	var inputElement = $(id);
	if( inputElement.val() == ''){
		inputElement.val( inputElement.attr('tip') );
		inputElement.addClass('showTipInputFields');
	}
}
