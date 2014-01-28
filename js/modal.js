function addContact(){
	
	var arrow = $('#addContactAnimation').find('#arrow');
	//show contact name under the user icon
	var fName = $('#contactFirstName').val();
	var lName = $('#contactLastName').val();
	var cCode = $('#countryCode').val();
	var phNumber = $('#phNumber').val();
	var cName = $('#countryName').val();
	$('#contactNameAnimatedMsgBox').html(fName+' '+lName).animate({opacity:'1'},700, "swing");
	
	// animate the lower portion of the dialouge
	animateLoop(5);
	function animateLoop(times){
		//break recurtion condition
		if(times == 0){
			// animate "successfull" once
			animateGlow('#phonebookAnimatedMsgBox', '1', '0', 1000);
			//final state
			$('#phonebook').css('opacity','.3');
			$('#addingTextAnimatedMsgBox').css('opacity','0');
			$('#contactNameAnimatedMsgBox').css('opacity','0');			
			return;
		}
		//reset arrow position
		arrow.css({left:'0px',opacity:'0'});
		//animate(glow) user icon
		animateGlow('#user', '.7', '.3', 300);
		//animate(glow) phonebook icon
		animateGlow('#phonebook', '.3', '.7', 300);
		//animate(glow) "Adding" text under the runing arrow
		animateGlow('#addingTextAnimatedMsgBox', '1', '.3', 300);
		// animate(run) arrow icon
		arrow.animate({left:'100px',opacity:'1'},300,'linear',function(){
			arrow.animate({left:'200px',opacity:'0'},300,'linear',function(){
				times--;
				animateLoop(times);
			});
		});

		function animateGlow(element, opa1, opa2, ms){
			$(element).animate({opacity:opa1},ms,'swing',function(){
				$(element).animate({opacity:opa2},ms,'swing');
			});
		}
	}
	//the previous animation takes about 5 sec to complete
	setTimeout(function() {
		addedSuccessfullyAnimation();
	}, 5000);

	//second part of the animation
	function addedSuccessfullyAnimation(){
		//get the current state into a variable
		var currentState = $('#addContactForm').html();
		var animationContent =	'<div id="userInfoHeader">CONTACT DETAILS</div>'
								+'<div id="userInfoDiv">'
									+'<div class="userInfoDivMemberwrapper"><div class="userInfoDivMemberIcons" id="userInfoDivMemberIconsUser"></div><div class="userInfoDivMemberText" id="userInfoDivMemberTextUsername"></div></div>'
									+'<div class="userInfoDivMemberwrapper"><div class="userInfoDivMemberIcons" id="userInfoDivMemberIconsPhone"></div><div class="userInfoDivMemberText" id="userInfoDivMemberTextNumber"></div></div>'
									+'<div class="userInfoDivMemberwrapper"><div class="userInfoDivMemberIcons" id="userInfoDivMemberIconsCountry"></div><div class="userInfoDivMemberText" id="userInfoDivMemberTextCountry"></div></div>'
								+'</div>'
								+'<div id="phonebookContainter"></div>'
								+'<div id="successfullTag">Added To Phonebook Successfully</div>';
		$('#addContactForm').fadeOut(500, function(){
			$('#addContactForm').html(animationContent);
			$('#addContactForm').fadeIn(400,function(){
				//now put the name, phone number, cc and country name.
				$('#userInfoDivMemberTextUsername').html(fName+' '+lName);
				$('#userInfoDivMemberTextNumber').html('('+cCode+')'+' '+phNumber);  // format (+91) 9474070457
				$('#userInfoDivMemberTextCountry').html(cName);

			});
		});

	}
	

}