<div id="leftpannel">
	<div id="profileinfo"><span id="profilepic"></span><p id="profilename">Tuhin Sengupta</p><p id="editprofiletext">Edit profile</p></div>
	<div id="concactsearch"><input id="contactSearchbar" type="text" name="fname" value="Search Contacts" onclick='javascript:searchConcats();'><span></span></div>
	<div id="contactscontainer">
		<ul id="contactslist">
		</ul>
	</div>
	<div id="contactoptions">
		<div class="contactOptionsIcon" id="manualAddContact" onclick='showModal();'></div>
	</div>
</div>
<div id="rightpannel">
	<div id="msgcontainer">
		<br>
		<br>
	</div>
	<div id="createmsgbar" class="clearfix">
		<div id="attachment"></div>
		<div id="smiley" onclick='drag();'></div>
		<div id="msgtypebar"><input id="typemsg" type="text" name="typemsg" value="" onclick='msgSubmitOnEnter();'/></div>
		<div id="sendbutton" onclick='javascript:sendMyMsg($("#typemsg").val()); $("#typemsg").focus();'></div>
	</div>
</div>