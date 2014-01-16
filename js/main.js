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
					issignupclicked = true;
					//disapear login form
					$("#loginform").animate({'opacity':'0'},800);
					setTimeout(function() {$("#loginform").css('visibility','hidden')}, 800);
					isloginclicked = false;
				}
			}
	);


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

    usernameLoginTooltip();

};

function logged_in_start(){
	maximize( YW.CHATSCREEN(), setSearchContainerHeight);	
}

function logged_out_start(){
	$('#bodybg').html(YW.HOMESCREEN());
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


// have to also call this function on window resize yet
function usernameLoginTooltip(){
	var tooltipSpan = document.getElementById('usernameLoginTooltip');
	var absoluteCordinate = $('#userfield').offset();
	window.onmousemove = function (e) {
	    var x = e.clientX,
	        y = e.clientY;
	    tooltipSpan.style.top = (y-absoluteCordinate.top+35) + 'px';    
	    tooltipSpan.style.left = (x-absoluteCordinate.left+125) + 'px';
	}
}