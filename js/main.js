window.onerror=function(msg, url, linenumber){
	$aJX_status = $.ajax({
		        type: "GET",
		        url: "error.php?ua="+encodeURIComponent(YW.UA())+"&msg="+encodeURIComponent(msg)+"&linenumber="+encodeURIComponent(linenumber)
		        });
}

window.onload = function(){
	//Load content based on State of user
	if(YW.logged_in()==="true") {
		logged_in_start();
	}
	else {
		logged_out_start();
	}

	//changes cursor to pointer on hover over login button
	$('#loginbutton').css('cursor', 'pointer');
	//show login tooltip when hover over loginbutton
	$("#loginbutton").hover(
			function(){$(".logintooltips").find("span").animate({opacity:'1'},600);},
			function(){$(".logintooltips").find("span").animate({opacity:'0'},600);}
	);
	
	var isloginclicked = false;
	$("#loginbutton").click(
			function(){
				if(isloginclicked){
					$("#loginform").animate({'opacity':'0'},800);
					setTimeout(function() {$("#loginform").css('visibility','hidden')}, 800);
					isloginclicked = false;
				}
				else{
					$("#loginform").css('visibility','visible');
					$("#loginform").animate({'opacity':'1'},800);
					//focus username field
					$('#userfield').focus();
					isloginclicked = true;
					//virtually unclick the signup button also
					$("#regform").animate({'opacity':'0'},800);
					setTimeout(function() {$("#regform").css('visibility','hidden')}, 800);
					issignupclicked = false;

				}
			}
	);

	// change cursor into pointer when mouse over any icons (help. signup & like)
	$('.icon').css('cursor', 'pointer');

	//show signup tooltip when hover over signup
	$("#signup").hover(
			function(){$(".signuptooltip").find("span").css("z-index", "999").animate({opacity:'1'},600);},
			function(){$(".signuptooltip").find("span").css("z-index", "0").animate({opacity:'0'},600);}
	);

	var issignupclicked = false;
	$("#signup").click(
			function(){
				if(issignupclicked){
					$("#regform").animate({'opacity':'0'},800);
					setTimeout(function() {$("#regform").css('visibility','hidden')}, 800);
					issignupclicked = false;	
				}
				else{
					$("#regform").css('visibility','visible');
					$("#regform").animate({'opacity':'1'},800);
					//focus first field
					$('#regInputPhone').focus();
					issignupclicked = true;
					//disapear login form
					$("#loginform").animate({'opacity':'0'},800);
					setTimeout(function() {$("#loginform").css('visibility','hidden')}, 800);
					isloginclicked = false;
				}
			}
	);
	// dissappear signUp & error Msg box when pressed 'Esc' from within
	$('#regform').keyup(function(e){
		if(e.keyCode == '27'){
			//first check if error msg is visible and close that on first 'Esc' press
			if( $('#errorMsgBox').css('visibility') == 'visible' ){
				closeErrorMgsBox();
			}
			// otherwise disappear sign up form straight away
			else{
				$("#regform").animate({'opacity':'0'},500);
				setTimeout(function() {$("#regform").css('visibility','hidden')}, 800);
				issignupclicked = false;	
			}
		}	
	});

	$('#loginform').keyup(function(e){
		if(e.keyCode == '27'){
			//first check if error msg is visible, and if yes then close that first on 'Esc' press
			if( $('#errorMsgBox').css('visibility') == 'visible' ){
				closeErrorMgsBox();
			}
			// otherwise disappear login form straight away
			else{
				$("#loginform").animate({'opacity':'0'},500);
				setTimeout(function() {$("#regform").css('visibility','hidden')}, 800);
				isloginclicked = false;	
			}
		}	
	});



	//show help tooltip when hover over signup
	$("#help").hover(
			function(){$(".helptooltip").find("span").css("z-index", "999").animate({opacity:'1'},600);},
			function(){$(".helptooltip").find("span").css("z-index", "0").animate({opacity:'0'},600);}
	);
	//show like tooltip when hover over signup
	$("#like").hover(
			function(){$(".liketooltip").find("span").css("z-index", "999").animate({opacity:'1'},600);},
			function(){$(".liketooltip").find("span").css("z-index", "0").animate({opacity:'0'},600);}
	);

    $('#loginform').keypress(function(e) {
        // Enter pressed?
        if(e.keyCode == 10 || e.keyCode == 13) {
            formhash(
            	document.getElementById('userfield').value,
				document.getElementById('passfield').value,
				document.getElementById('countryField').value,
				document.getElementById('loginform')
			);
        }
    });

    $('#regform').keypress(function(e) {
        // Enter pressed?
        if(e.keyCode == 10 || e.keyCode == 13) {
            regformhash(document.getElementById('regform'),
						document.getElementById('regInputPhone'),
					 	document.getElementById('email'),
					 	document.getElementById('regpass'),
					 	document.getElementById('regInputCountry'),
					 	document.getElementById('name_reg')
					 	);
        }
    });

    //pointerRelativeTooltip('#usernameLoginTooltip','#userfield',125,35);
    //pointerRelativeTooltip('#passLoginTooltip','#passfield',125,60);
	$('#regsubmitbutton').click(function(){
		$('#regsubmitbutton').css('-webkit-transform','1');
	})	

	// append modal content into dom
	$("#footer").html($("#footer").html()+YW.MODAL());
	$("#footer").html($("#footer").html()+YW.PROMPT());

};

function logged_in_start(){
	log_in_user();
}

function logged_out_start(){
	$('#bodybg').html(YW.HOMESCREEN());
	$('#icons').html(YW.LOGGED_OUT_H());
	//flash once the login tool tip 
	showLoginTipOnLoad();
}

function showLoginTipOnLoad(){
	$(".logintooltips").find("span").animate({opacity:'1'},1600,"linear",function(){
		$(".logintooltips").find("span").animate({opacity:'0'},1600,"linear");
	});
}


// hide input field tip on keyup
function hideTip(ele) {
	var element = $(ele);
	var ipText = element.val();
	var tip = element.next();
	if(ipText != '') {
		if(tip.css('display') != 'none') {
			tip.css('display','none');
			return;
		}
		return;
	}
	else {
		tip.css('display','inline-block');
	}
}


// function that pops up error msg
function dispErrMsg(msg) {
	var dialogueBox = $('#errorMsgBox'); 
	// check and see if the Dialogue box is on 
	if ( dialogueBox.css('visibility') == "hidden" ) {
		dialogueBox.css('opacity','0');
		dialogueBox.css('visibility', 'visible');
		dialogueBox.animate({opacity:'1'},600,'swing');
	}
	//put the msg in the Dialogue Box
	$('#errMsg').html(msg);
}
function closeErrorMgsBox() {
	$('#errorMsgBox').animate({opacity:'0'},700,"swing",function(){ $('#errorMsgBox').css("visibility","hidden"); });
}

function dissectPhoneNumber(number) {
	var BreakException;

	try {
		YW.COUNTRIES.forEach(function(country){
			if(number.indexOf(country[1]) === 0){
				BreakException = country[1];
				throw BreakException;
			}
		});
	} catch(e) {
	    if (e!==BreakException) throw e;
	    return [BreakException, number.slice(BreakException.length)];
	}
}

function getFriends() {
		$aJX_status = $.ajax({
        type: "GET",
        url: "./user.php?request=friends",
        })
        .success(function(response) {
        	times = 0;
            if(response==="empty") {
            	return false;
            }
            else {
            	YW.DATA = JSON.parse(response);
				showServerMessages();
                return true;
            }
        })
        .fail(function(response) {
        	times = 0;
        	return false;
    	});
}

// verification part starts here

//bring up verification window (first step will be on bt default)
function showVerWindow(){

	$('#varifyWindow').css('display','inline-block');
	$('#varifyWindow').animate({opacity:'1'},100,function(){ //the window appears
		$(this).find('#varifyWindowContainerHeader').animate({opacity:'1'},100,function(){ //header text appears
			$('#progBarBg').animate({opacity:'1'},100,function(){ //the progress bar appears
				$('#fstStop').find('.innerDisk').animate({opacity:'1'},200); //first inner disk appears
				$('#stpDlgBox1').css({opacity:'0',display:'inline-block'});
				$('#stpDlgBox1').animate({opacity:'1'},300, function(){	// first dialouge box appears but without content
					$('#stpDlgBox1Container').animate({opacity:'1'},300, verMethodSelect('sms')); //content appears and MSG method selected by default
				}); 
			});
		});
	});
}

//  select verification method function
function verMethodSelect(method){
	if( method == 'sms' ){
		// clear whatever set for voice first
		$('#verVoiceWrapper').css('opacity','');
		$('#selectVOICE').css('background-image','');
		//set css for sms
		$('#verSMSWrapper').css('opacity','1');
		$('#selectSMS').css('background-image','url("./icons/check_20x20.png")')
		$('#verSelectedIcon').css('background-image', 'url("./icons/msg2_min.png")');
		$('#verStp1LeftBottom').find('p').html('Code will be sent via SMS');
		YW.VIA = method;
	}
	else if( method == 'voice' ){
		// clear whatever set for voice first
		$('#verSMSWrapper').css('opacity','');
		$('#selectSMS').css('background-image','')	
		//set css for sms
		$('#verVoiceWrapper').css('opacity','1');
		$('#selectVOICE').css('background-image','url("./icons/check_20x20.png")');
		$('#verSelectedIcon').css('background-image', 'url("./icons/voiceCall_min.png")');
		$('#verStp1LeftBottom').find('p').html('Code will be sent via Voice Call');
		YW.VIA = method;
	}
}

//show codeEnterWindow
function enterVerCode(){
	// fade out the content of first dialouge 
	$('#stpDlgBox1Container').animate({opacity:'0'},300,function(){
		$('#stpDlgBox1').animate({left:'71px'},400, function(){	// move the window to next position
			// put inner disk in the progress bar
			$('#sndStop').find('.innerDisk').css('opacity','1');
			// make right shifted first window disappear
			$('#stpDlgBox1').css('display','none');
			//make 2nd dialouge appear but not the content
			$('#stpDlgBox2').css('display','inline-block');
			//now fade in the content of the 2nd dialouge box
			$('#stpDlgBox2Container').animate({opacity:'1'},300,function(){
				//focus on Enter Code input box
				$('#verCodeField').focus(); // todo not working
			});
		});
		// put check mark for previous step
		$('#fstStop').find('.innerDisk').css('background-color','transparent');
		$('#fstStop').find('.innerDisk').css('background-image','url("./icons/check.png")');
	});
}

// shows the last step of varification
function successDialougeBox(){
	// fade out the content of second dialouge 
	$('#stpDlgBox2Container').animate({opacity:'0'},300, function(){
		$('#stpDlgBox2').animate({left:'71px'},400, function(){	// move the window to next position
			// put inner disk in the progress bar
			$('#trdStop').find('.innerDisk').css('opacity','1');
			// make right shifted first window disappear
			$('#stpDlgBox2').css('display','none');
			//make 2nd dialouge appear but not the content
			$('#stpDlgBox3').css('display','inline-block');
			//now fade in the content of the 2nd dialouge box
			$('#stpDlgBox3Container').animate({opacity:'1'},300);

			//animate glow the icon recursive
			glowSuccessIcon(5);
			function glowSuccessIcon(times){
				if (!times){
					return;
				}
				$('#verStp3Icon').animate({opacity:'.2'}, 500, function(){
					$('#verStp3Icon').animate({opacity:'.6'}, 500, function(){
						times--;
						glowSuccessIcon(times);
					});
				});
			}
			//---glowing ends

		});
		// put check mark for previous step
		$('#sndStop').find('.innerDisk').css('background-color','transparent');
		$('#sndStop').find('.innerDisk').css('background-image','url("./icons/check.png")');
	});
}


//dialouge box loading animation
function DlBoxLoading(msg,stepNumber){
	// elements to be manipulated
	var leftCol = '';
	var rightCol = '';
	var nextArrow = '';
	var animatingObj = '';

	if (stepNumber == 1) {
		leftCol = '#verStp1Left';
		rightCol = '#verStp1Right';
		nextArrow = '#nextArrow1';
		animatingObj = '#verLoadingIcon1';
	}
	else if (stepNumber == 2) {
		leftCol = '#verStp2Left';
		rightCol = '#verStp2Right';
		nextArrow = '#nextArrow2';
		animatingObj = '#verLoadingIcon2';
	}
	
	$(leftCol+','+rightCol+','+nextArrow).animate({opacity:'0'},300,function(){
			$(this).css('display','none');
			$(animatingObj).css({opacity:'0', display:'block'});
			$(animatingObj).find('p').html(msg);
			$(animatingObj).animate({opacity:'.6'},300);

			
	});
}



function DlBoxFinalMsg(msg, stepNumber){
	var prevObj = '';
	var newObjIcon = '';
	var newText = '';
	
	if( stepNumber == 1 ) {
		prevObj = '#verLoadingIcon1';
		newObjIcon = '#verFaildMsg1Ref';
		newText = '#verFaildMsg1Text';
	}
	else if( stepNumber == 2 ) {
		prevObj = '#verLoadingIcon2';
		newObjIcon = '#verFaildMsg2Ref';
		newText = '#verFaildMsg2Text';
	}
	
	$(prevObj).animate({opacity:'0'}, 300, function(){
		$(this).css('display','none')
		$(newText).html(msg);
		$(newObjIcon+','+newText).css({opacity:'0', display:'block'});
		$(newObjIcon+','+newText).animate({opacity:'1'},300);
	});

}
function showVersionWindow(callback){
	$('#varifyWindow').css({opacity: '0', display: 'block'});
	$('#varifyWindow').animate({opacity:'1'},100,function(){ //the window appears
		$('#varifyWindow').html(YW.RELEASECON());
		if(callback){
			callback();
		}
	});
}
function showPointerOnHover(elem){
	$(elem).css('cursor', 'pointer');
}
function showNotif(msg){
	var notif = $('#notify');
	var notifMsg = notif.find('p');
	notif.css({display: 'block', height: '0px'});
	notifMsg.html(msg).css('opacity','0');
	notif.animate({height: '50px'}, 500, function(){
		notifMsg.animate({opacity:'1'},400);
	});
}
function hideNotif(){
	var notif = $('#notify');
	var notifMsg = notif.find('p');
	notifMsg.animate({opacity:'0'}, 400, function(){
		notif.animate({height: '0px'}, 500, function(){
			notif.css('display','none');
		});
	});
}

function showPrompt(message, yesCB, noCB){
	showOverlay();
	var prompt = $('#prompt');
	var msgBox = $('#prompMsg').find('p');
	$('#promptYes').click(function(){
							event.preventDefault();
							if(typeof yesCB==="function")
								yesCB();
						  });
	$('#promptNo').click(function(){
							event.preventDefault();
							if(typeof noCB==="function")
								noCB();
						  });
	msgBox.html(message);
	prompt.css({opacity:'0', display:'block'});
	prompt.animate({opacity:'1'},400, function(){
		
	});
}

function closePrompt(){
	var prompt = $('#prompt');
	prompt.animate({opacity:'0'}, 400, function(){
		prompt.css('display','none');
		closeOverlay();
	});
}

function suggestCountries( elem ){
	var ipFiled = $(elem);
	var suggestBox = ipFiled.parent().children().eq( ipFiled.parent().children().length - 1 ); // select last child of ipFields parent
	var searchString = ipFiled.val();
	var result = countrySuggest(searchString);
	suggestBox.html('');
	if( searchString == '' ){
		suggestBox.css('display','none');
		$('#addConCCTip').prev().val('');
		$('#addConCCTip').html('CC');
		return;
	}
	else{
		suggestBox.css('display','block');
	}
	if( result.length == 0 ){

		suggestBox.append('<div class="suggestedElem"><p>No such country</p></div>');
		$('#addConCCTip').prev().val('');
		$('#addConCCTip').html('CC');
		return;
	}
	for ( var i=0; i < result.length; i++  ){
		//console.log(result[i][0])
		suggestBox.append('<div class="suggestedElem" onclick=\'selectCountry('+'"'+result[i][0]+'","'+countryToCC(result[i][0])+'", this);\'><p>'+result[i][0]+' '+'(+'+countryToCC(result[i][0])+')</p></div>');
	}
}
//regex		var matches = str.match(/([a-zA-Z]+) \(+/); to get country name
//regex     var matches = str.match(/\+([0-9]+)\)/);  to get country code
function selectCountry( country, cc , thisElem ){
	var suggestBox = $(thisElem).parent();
	var countryField = suggestBox.parent().children().eq(0); // select first sibling
	suggestBox.css('display','none');
	if ( countryField.attr('name') == 'AddConCountryName' ){ // if from add contact
		countryField.val( country );
		var ccIpField = countryField.parent().next().children().eq(0);
		ccIpField.val( '+'+cc );
		$('#addConCCTip').html('');
		return;
	}
	countryField.val(country+' (+'+cc+')');
	
}

function extractCC(str){
	var matches = str.match(/\+([0-9]+)\)/);
	return matches[1];
}