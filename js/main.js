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
					$('#phone_reg').focus();
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

	//login when enter is pressed while either  of username and password field in focus
	$('#loginform').each(function() {
        $(this).find('input').keypress(function(e) {
            // Enter pressed?
            if(e.which == 10 || e.which == 13) {
                formhash(
                	document.getElementById('userfield').value,
					document.getElementById('passfield').value,
					document.getElementById('loginform')
				)
            }
        });

        $(this).find('input[type=submit]').hide();
    });

    //pointerRelativeTooltip('#usernameLoginTooltip','#userfield',125,35);
    //pointerRelativeTooltip('#passLoginTooltip','#passfield',125,60);
	

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

// This function submitts typed msg when hit enter
function msgSubmitOnEnter() {
	$('#typemsg').keypress(function(e) {
        // Enter pressed?
        if(e.which == 10 || e.which == 13) {
        	sendMyMsg($("#typemsg").val());
        }
    });
}

//This function sets the required settings so that the 
//following user becomes the current user
function setCurrentPartner(elem) {
	if(elem.children.item(2).innerHTML+elem.children.item(3).id === YW.CURR_PARTNER) {
		return;
	}
	YW.CURR_PARTNER = elem.children.item(2).innerHTML+elem.children.item(3).id;
	renderCurrent();
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

function closeFormOnEsc(e){
	if(e.keyCode == '27'){
		alert('hello');
	}
}