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

	//this will show all the input field tips on page load
	showInputTipsOnload();

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

// have to also call this function on window resize yet
function pointerRelativeTooltip(tooltipSpan, hoverElement, xOffset, yOffset){
	var tooltipSpan = $(tooltipSpan);
	var absoluteCordinate = $(hoverElement).offset();
	window.onmousemove = function (e) {
	    var x = e.clientX,
	        y = e.clientY;
		tooltipSpan.css('left', (x-absoluteCordinate.left+xOffset) + 'px');   //+125
	    tooltipSpan.css('top',  (y-absoluteCordinate.top+yOffset) + 'px');    //+35
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
	}
}

//show codeEnterWindow
function enterVerCode(){
	//
}
