function maximize(html_val, callback){
	$("#whatsapponwebText").css("display","none");
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
	YW.logged_in = function() { return 'true'; }
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
		showServerMessages();		
		$("#feedback").css("display","block");
		YW.LISTENER = setInterval(function(){checkMessage();},10000);
		
		//$('#profilepic').css('background-image','url("profile.php?w=50&h=50&l='+YW.NAME.substr(0,1).toUpperCase()+'&time='+new Date().getTime()+'")');
		randomPicGen($('#profilepic'), YW.NAME);


		$("#profilename").html(YW.NAME);
		$('#typemsg').keypress(function(e) {
	        // Enter pressed?
	        if(e.keyCode == 10 || e.keyCode == 13) {
	        	sendMyMsg($("#typemsg").val());
	        }
	    });
	});
}

function showServerMessages(){
	jsnData=[
				["0server", formatAMPM(new Date()),"Hey you!!"],
				["0server", formatAMPM(new Date()),"Welcome to Yosapp.com. My name is Yosapp Server. You can ask me anything you want.. Hope you already know that this is an online version of Whatsapp."],
				["0server", formatAMPM(new Date()),"Below you can type messages and send them to your friends. Pretty Simple right? Lets start by doing something new., such as Adding a Friend."]
			];
	processMessage(jsnData);
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



// random int generator within range
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function countryToCC(country){
	var BreakException;
	try{
		YW.COUNTRIES.forEach(function(item, itemIndex, arr){
		    if(item[0]==country){
		        BreakException = item[1];
				throw BreakException;
		    }
		});
	} catch(e) {
		if (e!==BreakException) throw e;
	    return BreakException;
	}
}

function CCtoCountry(cc){
	var BreakException;
	try{
		YW.COUNTRIES.forEach(function(item, itemIndex, arr){
		    if(item[1]==cc){
		        BreakException = item[0];
				throw BreakException;
		    }
		});
	} catch(e) {
		if (e!==BreakException) throw e;
	    return BreakException;
	}
}

function findContactByName(name){
	name = name.toLowerCase();
	var contacts = [];
	for(var item in YW.DATA){
		if(item==="0server"){
			continue;
		}
		var subName = YW.DATA[item].name.substring(0, name.length);
		if(subName.toLowerCase() == name){			
			contacts.push(YW.DATA[item]);
		}
	}
	return contacts;
}

function focusItem(elem2Focus){
	$(elem2Focus).focus();
}