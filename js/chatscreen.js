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
	var searchContainerHeight = $(window).height() * (80/100) - 160;
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

function sendMyMsg(message){
	var d = new Date(); // for now
	h = d.getHours(); // => 9
	m = d.getMinutes(); // =>  30
	formDivElem(0,message,formatAMPM(new Date()));
	$("#typemsg").val("");
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