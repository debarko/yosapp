//This function has to be called when 
//the ajax request for login succeeds
function loadChatscreen() {
	setSearchContainerHeight();

	$("#concactsearch").find('input').click(function(){ 
		$('#concactsearch').find('input').css("background-color","black");
	})

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
	$("#"+id+" > #mother_div > #sent_recv > .textbox > #timestamp").html(timestamp);
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
	} else {
		$("#"+id+" > #mother_div").css("float", "right");
	}
}