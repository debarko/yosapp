function closeOnEsc(e){
	if( e.keyCode == '27' ){
		closeModal();
	}
}

function isInt(n) {
   return typeof n === 'number' && n % 1 == 0;
}

function addContact(){
	
	var arrow = $('#addContactAnimation').find('#arrow');
	//show contact name under the user icon
	var fName = $('#contactFirstName').val();
	var cCode = $('#countryCode').val();
	var phNumber = $('#phNumber').val();
	var cName = $('#countryName').val();
	if(fName===""){
        showNotif("Empty Name");
        setTimeout(function(){
            hideNotif();
        }, 3000);
		return false;
	}
	if(parseInt(phNumber) != phNumber){
		showNotif("Wrong Phone Number");
        setTimeout(function(){
            hideNotif();
        }, 3000);
		return;
	}
	phNumber = parseInt(phNumber);
	if(!isInt(phNumber) || phNumber===0 || phNumber===""){
        showNotif("Wrong Phone Number");
        setTimeout(function(){
            hideNotif();
        }, 3000);
		return false;
	}
	if(parseInt(cCode) != cCode){
        showNotif("Wrong CC");
        setTimeout(function(){
            hideNotif();
        }, 3000);
		return;
	}
	cCode = parseInt(cCode);
	if(!isInt(cCode) || cCode===0 || cCode===""){
        showNotif("Wrong CC");
        setTimeout(function(){
            hideNotif();
        }, 3000);
		return false;
	}
	if(cName===""){
		cName = "Random";
	}
    itemNumber = parseInt(cCode+''+phNumber);
    if(YW.DATA[itemNumber]){
        showNotif("Duplicate Contact");
        setTimeout(function(){
            hideNotif();
        }, 3000);
        return false;
    }
	$('#contactNameAnimatedMsgBox').html(fName).animate({opacity:'1'},700, "swing");
	
	// animate the lower portion of the dialouge
	times=1;

	//todo on fail what to do?
	$aJX_status = $.ajax({
        type: "POST",
        url: "user.php?request=addfriend",
        data: {"contact": phNumber, "cc": cCode, "name": fName},
        dataType: "text"
        })
        .success(function(response) {
        	times = 0;
            if(response===true) {
            	return true;
            }
            else {
                return false;
            }
        })
        .fail(function(response) {
        	times = 0;
        	return false;
    	});

	animateLoop();
	function animateLoop(){
		//break recurtion condition
		if(times == 0){
			// animate "successfull" once
			animateGlow('#phonebookAnimatedMsgBox', '1', '0', 800);
			//final state
			$('#phonebook').css('opacity','.3');
			$('#addingTextAnimatedMsgBox').css('opacity','0');
			$('#contactNameAnimatedMsgBox').css('opacity','0');
			addedSuccessfullyAnimation();	
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
				animateLoop();
			});
		});

		function animateGlow(element, opa1, opa2, ms){
			$(element).animate({opacity:opa1},ms,'swing',function(){
				$(element).animate({opacity:opa2},ms,'swing');
			});
		}
	}

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
				$('#userInfoDivMemberTextUsername').html(fName);
				$('#userInfoDivMemberTextNumber').html('('+cCode+')'+' '+phNumber);  // format (+91) 9474070457
				$('#userInfoDivMemberTextCountry').html(cName);
				addContactElem(fName, phNumber, cCode);
				itemNumber = parseInt(cCode+''+phNumber);
				YW.DATA[itemNumber]={"phone": phNumber,"cc": cCode, "name": fName, "messages":{}, "messageTree": []};
				//glow the phoenbook icon 3 times
				glowLoop(3);
				function glowLoop(times){
					if(!times){
						return;
					}
					$('#phonebookContainter').animate({opacity:'.3'},300,'swing',function(){
						$('#phonebookContainter').animate({opacity:'.6'},300,'swing',function(){
							times--;
							glowLoop(times);
						});
					});
				}
			});
		});
	}
}

function addSearchElem(name, cc, phone){
	var searchElem = '<div class="searchElem" onclick="fillEditContact(\''+name+'\','+cc+','+phone+')">'+name+' (+'+cc+'-'+phone+')</div>';
	$('#firstNameList').append(searchElem);
}

function fillEditContact(name, cc, phone){
	$('#contactFirstNameEdit').val(name);
	$('#phNumberEdit').val(phone);
	$('#countryCodeEdit').val(cc);
	$('#countryNameEdit').val(CCtoCountry(cc));
	$('#firstNameList').html("");
}

function emptyEditContact(){
	$('#contactFirstNameEdit').val("").focus();
	hideTip('#contactFirstNameEdit');
	$('#phNumberEdit').val("");
	$('#countryCodeEdit').val("");
	$('#countryNameEdit').val("");
}

function suggestNames(name){	
	$('#firstNameList').html("");
	if(name==""){
		return false;
	}
	if($('#phNumberEdit').val()!=""){
		return false;
	}
	var elements = findContactByName(name);
	elements.forEach(function(item){
		addSearchElem(item.name, item.cc, item.phone);
	});
}

function updateContact(){	
	var fName = $('#contactFirstNameEdit').val();
	var cCode = $('#countryCodeEdit').val();
	var phNumber = $('#phNumberEdit').val();
	var cName = $('#countryName').val();
	if(fName===""){
		showNotif("Empty Name.");
        setTimeout(function(){
            hideNotif();
        }, 3000);
		return false;
	}

	showNotif("Processing your update request.");
	//todo on fail what to do?
	$aJX_status = $.ajax({
        type: "POST",
        url: "user.php?request=updateFriend",
        data: {"contact": phNumber, "cc": cCode, "name": fName},
        dataType: "text"
        })
        .success(function(response) {
            if(response==="noauth"){
            	closeModal();
            	showNotif("You are not logged in.");
            	setTimeout(function(){
            		hideNotif();
            		window.location='logout.php';            		
            	}, 3000);
            }
            if(response==="badparam"){
            	closeModal();
            	showNotif("Something went wrong with updating the name. Please try again.");
            	setTimeout(function(){
            		hideNotif();
            	}, 3000);
            	return false;
            }
            if(response==="sqlfail"){
            	closeModal();
            	showNotif("Database was unreachable. Please try again after sometime.");
            	setTimeout(function(){
            		hideNotif();
            	}, 3000);
            	return false;
            }
            if(response==="success") {
            	var fName = $('#contactFirstNameEdit').val();
				var cCode = $('#countryCodeEdit').val();
				var phNumber = $('#phNumberEdit').val();
            	updateContactname(fName, cCode, phNumber);
            	YW.DATA[cCode+phNumber].name = fName;
            	emptyEditContact();
            	showNotif("Successfully updated.");
            	setTimeout(function(){
            		hideNotif();
            	}, 3000);
            	return true;
            }
            else {
            	closeModal();
            	showNotif("Some unknown error happened. Please report a feedback with details.");
            	setTimeout(function(){
            		hideNotif();
            	}, 3000);
                return false;
            }
        })
        .fail(function(response) {
        	closeModal();
        	showNotif("Network Error. Please refresh the page and try again.");
        	setTimeout(function(){
        		hideNotif();
        	}, 3000);
            return false;
    	});
}

function deleteContact(){
	var cCode = $('#countryCodeEdit').val();
	var phNumber = $('#phNumberEdit').val();
	showNotif("Processing delete request.");
	$aJX_status = $.ajax({
        type: "POST",
        url: "user.php?request=deleteFriend",
        data: {"contact": phNumber, "cc": cCode},
        dataType: "text"
        })
        .success(function(response) {
            if(response==="noauth"){
            	closeModal();
            	showNotif("You are not logged in.");
            	setTimeout(function(){
            		hideNotif();
            		window.location='logout.php';            		
            	}, 3000);            	
            }
            if(response==="badparam"){
            	closeModal();
            	showNotif("Something went wrong with deleting the name. Please try again.");
            	setTimeout(function(){
            		hideNotif();
            	}, 3000);
            	return false;
            }
            if(response==="sqlfail"){
            	closeModal();
            	showNotif("Database was unreachable. Please try again after sometime.");
            	setTimeout(function(){
            		hideNotif();
            	}, 3000);
            	return false;
            }
            if(response==="success") {
            	var cCode = $('#countryCodeEdit').val();
				var phNumber = $('#phNumberEdit').val();
				emptyEditContact();
				closeModal();
				delete YW.DATA[cCode+phNumber];
				$('[id='+phNumber+']').each(function(i, obj) {
					if( $(obj).prev().html() == cCode ){
						$(obj).parent().remove();
						showNotif("Delete successfully.");
			        	setTimeout(function(){
			        		hideNotif();
			        	}, 3000);
						return true;
					}
				});
            }
            else {
            	closeModal();
            	showNotif("Some unknown error happened. Please report a feedback with details.");
            	setTimeout(function(){
            		hideNotif();
            	}, 3000);
                return false;
            }
        })
        .fail(function(response) {
        	closeModal();
        	showNotif("Network Error. Please refresh the page and try again.");
        	setTimeout(function(){
        		hideNotif();
        	}, 3000);
            return false;
    	});
}

function renderProfPrev(ipElem){
	var newName = $(ipElem).val();
	$('#profPreviewName').html(newName);
	if( newName == ''){
		$('#profPreviewName').html( $('#profilename').html() );	
		randomPicGen( $('#profPreviewPic'), $('#profilename').html() );
		return;
	}
	if ( newName.length == 1 ){
		randomPicGen( $('#profPreviewPic'), newName );
	}
}

function editProfileClick(){
	var name = $('#editProfName').val();
	if(name==="")
	{
		showNotif("Name field is empty.");
    	setTimeout(function(){
    		hideNotif();
    	}, 3000);
    	return false;
	}
	showNotif("Processing your Name Update Request.");
	$aJX_status = $.ajax({
        type: "POST",
        url: "user.php?request=updateName",
        data: {"name": name},
        dataType: "text"
        })
        .success(function(response) {
            if(response==="noauth"){
            	closeModal();
            	showNotif("You are not logged in.");
            	setTimeout(function(){
            		hideNotif();
            		window.location='logout.php';            		
            	}, 3000);            	
            }
            if(response==="badparam"){
            	closeModal();
            	showNotif("Something went wrong with upgrading your name. Please try again.");
            	setTimeout(function(){
            		hideNotif();
            	}, 3000);
            	return false;
            }
            if(response==="sqlfail"){
            	closeModal();
            	showNotif("Database was unreachable. Please try again after sometime.");
            	setTimeout(function(){
            		hideNotif();
            	}, 3000);
            	return false;
            }
            if(response==="success") {
				closeModal();
				showNotif("Your name has been successfully updated.");
            	setTimeout(function(){
            		hideNotif();
            	}, 3000);
				$('#profilename').html(name);
            }
            else {
            	closeModal();
            	showNotif("Some unknown error happened. Please report a feedback with details.");
            	setTimeout(function(){
            		hideNotif();
            	}, 3000);
                return false;
            }
        })
        .fail(function(response) {
        	closeModal();
        	showNotif("Network Error. Please refresh the page and try again.");
        	setTimeout(function(){
        		hideNotif();
        	}, 3000);
            return false;
    	});
}

function changePassword(){
	var pass=$('#editProfPass').val();
	var rePass=$('#editProfPassRe').val();
	if(pass===""){
		showNotif("Password field is empty.");
    	setTimeout(function(){
    		hideNotif();
    	}, 3000);
    	return false;
	}
	if(pass!==rePass){
		showNotif("Both the passwords do not match.");
    	setTimeout(function(){
    		hideNotif();
    	}, 3000);
    	$('#editProfPassRe').val("");
    	$('#editProfPass').val("");
    	return false;
	}
	var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/; 
    if (!re.test(pass)) {
        showNotif("Passwords must contain at least one number, one lowercase and one uppercase letter.  Please try again.");
    	setTimeout(function(){
    		hideNotif();
    	}, 3000);
    	$('#editProfPassRe').val("");
    	$('#editProfPass').val("");
    	return false;
    }
    var p = hex_sha512(pass);
    $aJX_status = $.ajax({
        type: "POST",
        url: "user.php?request=updatePass",
        data: {"p": p},
        dataType: "text"
        })
        .success(function(response) {
            if(response==="noauth"){
            	closeModal();
            	showNotif("You are not logged in.");
            	setTimeout(function(){
            		hideNotif();
            		window.location='logout.php';
            	}, 3000);
            }
            if(response==="badparam"){
            	closeModal();
            	showNotif("Something went wrong with upgrading your name. Please try again.");
            	setTimeout(function(){
            		hideNotif();
            	}, 3000);
            	return false;
            }
            if(response==="sqlfail"){
            	closeModal();
            	showNotif("Database was unreachable. Please try again after sometime.");
            	setTimeout(function(){
            		hideNotif();
            	}, 3000);
            	return false;
            }
            if(response==="success") {
				closeModal();
				showNotif("Your password has been successfully updated.");
            	setTimeout(function(){
            		hideNotif();
            	}, 3000);
            }
            else {
            	closeModal();
            	showNotif("Some unknown error happened. Please report a feedback with details.");
            	setTimeout(function(){
            		hideNotif();
            	}, 3000);
                return false;
            }
        })
        .fail(function(response) {
        	closeModal();
        	showNotif("Network Error. Please refresh the page and try again.");
        	setTimeout(function(){
        		hideNotif();
        	}, 3000);
            return false;
    	});
}