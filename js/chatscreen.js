//This function has to be called when 
//the ajax request for login succeeds
function loadChatscreen() {
	setSearchContainerHeight();

	$("#concactsearch").find('input').click(function(){ 
		$('#concactsearch').find('input').css("background-color","black");
	});
}

$(window).resize(function(){
	setSearchContainerHeight();
})


function setSearchContainerHeight(){
	var searchContainerHeight = $(window).height() * (80/100) - 128;
	$('#contactscontainer').css("height", searchContainerHeight+"px");
}

function setTextboxGap(){
	
	var arr = $(".recmsg").css("height");
	arr.each(function(index) {
	    alert(This.value);
	});
}

function loadMessageDiv(divElem){
	var temp_Data = $("#msgcontainer").html()
	$("#msgcontainer").html( temp_Data + divElem );
}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function sendOtherMsg(message){
	if(message===""){
		return false;
	}
	var d = new Date(); // for now
	h = d.getHours(); // => 9
	m = d.getMinutes(); // =>  30
	formDivElem(1,message,formatAMPM(new Date()));	
}

function sendMyMsg(message, dontReplicate){	
	if(message===""){
		return false;
	}
	if(typeof dontReplicate === "undefined"){
		status = sendActualMessage(message);
		if(!status){
			return false;
		}
		storeMessage(YW.CURR_PARTNER, 0, message);
	}
	var d = new Date(); // for now
	h = d.getHours(); // => 9
	m = d.getMinutes(); // =>  30
	formDivElem(0,message,formatAMPM(new Date()));	
	$("#typemsg").val("");

	//now scroll down msg container to bottom
	autoScrollDown();
}

function formDivElem(parent, message, timestamp){
	//Parent = 0 when I wrote the message
	//Parent = 1 when he wrote the message
	loadMessageDiv(YW.CHATBUBBLE());
	
	//get hold of the newly added div by checking a list of 
	//all divs in the message bar setup
	var new_div = $("#msgcontainer > div");
	new_div = new_div[new_div.length - 1];

	var new_id = generateRandomDivId();
	//set id here to the newly added div
	$(new_div).attr("id", new_id);

	//add the class based on the paarents
	if(parent===0) {
		//It's my bubble
		tagMyBubble(new_id);
	} else {
		//It's opponents bubble
		tagOtherBubble(new_id);
	}

	//set the message in the newly added div
	setMessage(new_id, message);
	
	//set the time stamp
	setTimeStamp(new_id, timestamp);

	setOptionsWidth(new_id, parent);
}

function generateRandomDivId(){
	//create a id only numeric based on time of the client
	//time
	var dateStr=new Date().toISOString();
	dateStr = dateStr.replace(/-/g,'');
	dateStr = dateStr.replace(/:/g,'');
	return CryptoJS.MD5(dateStr).toString();
}

function tagMyBubble(id){
	//add the classes for my bubble accordingly
	$("#"+id+" > #mother_div > #sent_recv").addClass("sentmsg");
}

function tagOtherBubble(id){
	//add classes for his chat bubble
	$("#"+id+" > #mother_div > #sent_recv").addClass("recmsg");
}

function setTimeStamp(id, timestamp){
	//Add the timestamp to the appropriate place
	$("#"+id+" > #mother_div > #sent_recv > #timestamp").html(timestamp);
}

function setMessage(id, message){
	//add the message to the div
	$("#"+id+" > #mother_div > #sent_recv > .textbox").html(message+$("#"+id+" > #mother_div > #sent_recv > .textbox").html());
}

function setOptionsWidth(id, parent){
	var parent_width = $("#"+id+" > #mother_div > #sent_recv").css("width");
	$("#"+id+" > #mother_div > .shareOptionsBar").css("width", parent_width);
	$("#"+id+" > #mother_div > .shareOptionsBar > .midbar").css("width", (parseInt(parent_width)-20)+"px");
	if(parent){
		$("#"+id+" > #mother_div").css("float", "left");
		$("#"+id+" > #mother_div > .shareOptionsBar").addClass("shareOptionsBar_left");
	} else {
		$("#"+id+" > #mother_div").css("float", "right");
		$("#"+id+" > #mother_div").addClass("mother_div_right");		
	}
}


function searchConcats(){
	$("#contactSearchbar").val("");
}

function shareOption(){
	$('.shareOptionsBar').animate({top:"-1px"},800,"swing");
}

function showOverlay(callback) {
	var overlay = $('#overlay');
	overlay.css({
		opacity:'0',
		visibility:'visible'
	});
	overlay.animate({opacity:'1'},200,'swing',function(){
		if(callback){
			callback();
		}
	});
}

function showModal(defaultSelectedMenu){
	var modal = $('#modal');
	
	if(YW.logged_in()){
		$('#modalMenuBar').html(YW.L_IN());
		$('#modalRightPanel').html(YW.R_IN());
	}
	else
	{
		$('#modalMenuBar').html(YW.L_OUT());
		$('#modalRightPanel').html(YW.R_OUT());		
	}
	showOverlay(function(){
		//now bring up the modal
		modal.css({
			width:'0px',
			height:'0px',
			top:'50%',
			left:'50%',
			margin:'0px',
			border:'0px',
			visibility:'visible'
		});
		modal.animate({
			width: '600px',
			height: '400px',
			top: '50%',
			left: '50%',
			margin:'-200px 0px 0px -300px'
		},300,"swing",function(){
			$('#modalCloseButton').css('visibility','visible');
			$('#modalContent').css('visibility','visible');
		});
	})
}

function closeModal(){
	var modalDialogue = $('#modal');	
	$('#modalContent').css('visibility','hidden')
	//anumate and close the modal
	modalDialogue.animate({
		width:'0px',
		height:'0px',
		top:'50%',
		left:'50%',
		margin:'0px',
		border:'0px'
	},300,'swing',function() {
		$('#modalCloseButton').css('visibility','hidden');		
		closeOverlay();
	});
}

function closeOverlay(){
	var overlay = $('#overlay');
	overlay.animate({opacity:"0"},200,"swing",function(){overlay.css('visibility','hidden');})
}

function renderData() {
	$.each(YW.DATA, function(id, elem){
		addContactElem(elem.name, elem.phone, elem.cc);
	});
}

function addContactElem(name, phone, cc, image){
	$('#contactslist').append(YW.CONTACT())[$('#contactslist').length - 1];
	var currentContact;
	$('#contactslist li:last #name').html(name);
	$('#contactslist li:last #cc').html(cc);
	$('#contactslist li:last #number').attr("id",phone);
	return currentContact;
}

function selectMenuItem(selectedMenuItem){
	// clear previously selected menu item background color
	$('.modalMenuItem').css('background-color','');
	//change the selected menu item background
	$(selectedMenuItem).css('background-color','#2AB200');
}

function setLastChat () {
	YW.CURR_PARTNER = "0server";
}

function processMessage(responseJSON) {
	responseJSON.forEach(function(item){
		if(!YW.DATA[item[0]]) {
			var ccPhone = dissectPhoneNumber(item[0]);
			addContactElem(item[0], ccPhone[1], ccPhone[0]);
			YW.DATA[item[0]]={"phone": ccPhone[1],"cc": ccPhone[0], "name": item[0], "messages":{}, "messageTree": []};
			$aJX_status = $.ajax({
		        type: "POST",
		        url: "user.php?request=addfriend",
		        data: {"contact": ccPhone[1], "cc": ccPhone[0], "name": item[0]},
		        dataType: "text"
		        })
		        .success(function(response) {
		        	times = 0;
		            if(response==="SUCCESS") {		            	
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
		}
		if(YW.DATA[item[0]].messages.unreadCount) {
			YW.DATA[item[0]].messages.unreadCount++;
		} else {
			YW.DATA[item[0]].messages.unreadCount = 1;
		}
		if(!YW.DATA[item[0]].messages.list) {
			YW.DATA[item[0]].messages.list = [];
		}
		YW.DATA[item[0]].messages.list.push([item[2],1])
	});
	renderCurrent();
}

//This function sets the required settings so that the 
//following user becomes the current user
function setCurrentPartner(elem) {
	if(elem.children.item(2).innerHTML+elem.children.item(3).id === YW.CURR_PARTNER) {
		return;
	}
	YW.CURR_PARTNER = elem.children.item(2).innerHTML+elem.children.item(3).id;
	$("#msgcontainer").html("<br /><br />");
	renderMessages();
	renderCurrent();
}

function renderCurrent() {
	if(YW.CURR_PARTNER==="0server"){
		return false;
	}
	if(!YW.DATA[YW.CURR_PARTNER]){
		return false;
	}
	if(!YW.DATA[YW.CURR_PARTNER].messages.list){
		return false;
	}
	YW.DATA[YW.CURR_PARTNER].messages.list.forEach(function(message){
		if(message[1]){
			sendOtherMsg(message[0]);
			storeMessage(YW.CURR_PARTNER, 1, message[0]);
			autoScrollDown();
		} else {
			//currently this scenario can't happen
			sendMyMsg(message[0]);
		}
	});
	YW.DATA[YW.CURR_PARTNER].messages.list=[];
	YW.DATA[YW.CURR_PARTNER].messages.unreadCount = 0;
}

function autoScrollDown(){
	// todo call this function when msg arrives as well
	$('#msgcontainer').animate({scrollTop: $('#msgcontainer').get(0).scrollHeight}, 50);
}

function storeMessage(whos, parent, message){
	if(whos==="0server"){
		return false;
	}
	var tmp_msg_obj = {};
	tmp_msg_obj.message = message;
	tmp_msg_obj.parent = parent;
	YW.DATA[whos].messageTree.push(tmp_msg_obj);
}

function renderMessages() {
	if(YW.CURR_PARTNER==="0server"){
		return false;
	}
	if(!YW.DATA[YW.CURR_PARTNER].messageTree){
		return false;
	}
	var tree = YW.DATA[YW.CURR_PARTNER].messageTree;
	tree.forEach(function(item){
		if(item.parent===0){
			sendMyMsg(item.message, 1);
		} else {
			sendOtherMsg(item.message);
		}
	});
}

function checkForWPass() {
	$aJX_status = $.ajax({
		        type: "GET",
		        url: "user.php?request=wpass_check"
		        })
		        .success(function(response) {
		        	response = response.trim();
		            if(response==="false") {
		            	clearInterval(YW.LISTENER);
		            	$("#bodybg").html($("#bodybg").html()+YW.VERIF());
		            	showOverlay();
		            	showVerWindow();
		            	return true;            	
		            }
		            else {
		                return false;		                
		            }
		        })
		        .fail(function(response) {
		        	return false;
		    	});	
}

function requestCode() {
	DlBoxLoading("Please Wait. Sending your code.",1);
	YW.IMEI = imei_gen();
	$aJX_status = $.ajax({
		        type: "GET",
		        url: "transactor.php?method=codereq&via="+YW.VIA+"&id_user="+YW.IMEI
		        })
		        .success(function(response) {
		            if(response==="noauth") {		            	
		            	DlBoxFinalMsg("You are not logged in. Please refresh and retry.", 1);
		            	return false;
		            } else if(response==="badparam"){
		            	DlBoxFinalMsg("We regret. Internal server error happened. Please refresh and try again. If it doesn't solve please contact us via Feedback.", 1);
		                return false;		                
		            } else {		            	
		            	var patt1 = /status: ([a-z]*)/i;
		            	var result = response.match(patt1);
		            	if(result && result[1]!=="fail"){
		            		enterVerCode();
		            	} else {
		            		console.log(response);
		            		var patt2 = /status: ([a-z]*)\nretry_after: ([0-9]*)/i;
		            		var result2 = response.match(patt2);
		            		if(result2 && result2[2]){
		            			DlBoxFinalMsg("Trying too soon. Please try after "+Math.floor(result2[2]/60)+" minutes.", 1);
		            		}
		            	} 	
		            }
		        })
		        .fail(function(response) {
		        	return false;
		    	});	
}

function sendCode() {
	code = $("#verCodeField").val();
	if(code==="" || code===undefined){
		return false;
	}
	DlBoxLoading("Please Wait. Confirming your code.",2);
	$aJX_status = $.ajax({
		        type: "GET",
		        url: "transactor.php?method=sendcode&code="+code+"&id_user="+YW.IMEI
		        })
		        .success(function(response) {
		            if(response==="noauth") {
		            	DlBoxFinalMsg("You are not logged in. Please refresh and retry.", 2);
		            	return false;		            	
		            } else if(response==="badparam"){
		            	DlBoxFinalMsg("We regret. Some Internal server error happened. Please refresh and try again. If it doesn't solve please contact us via Feedback.", 2);
		                return false;		                
		            } else {
		            	if(response==="success"){
		            		successDialougeBox();
		            	} else {
		            		DlBoxFinalMsg("Wrong Code. Please try again.", 2);
		            		return false;
		            	}
		            }
		        })
		        .fail(function(response) {
		        	return false;
		    	});	
}

function clearVerif(){
	$("#varifyWindow").css("display","none");
	closeOverlay();
	YW.LISTENER = setInterval(function(){checkMessage();},10000);
}

function sendFeedback(){
	$aJX_status = $.ajax({
		        type: "GET",
		        url: "feedback.php?ua="+encodeURIComponent(YW.UA())+"&msg="+encodeURIComponent($("#feedbackTextArea").value)});
}