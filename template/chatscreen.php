<div id="leftpannel">
	<div id="profileinfo"><span id="profilepic"></span><p id="profilename">&nbsp;</p><p id="editprofiletext">Edit profile</p></div>
	<!-- todo can not call hideInputTipsOnclick() & showInputTipsOnblur from here-->
	<div id="concactsearch"><input id="contactSearchbar" type="text" name="fname" value="Search Contacts" onfocus='hideInputTipsOnclick("#contactSearchbar");' onblur='showInputTipsOnblur("#contactSearchbar");'/><span></span></div>
	<div id="contactscontainer">
		<ul id="contactslist">
		</ul>
	</div>
	<div id="contactoptions">
		<div class="contactOptionsIcon" id="manualAddContact" onmouseover='showPointerOnHover(this);' onclick='showModal("addCon");'></div>
	</div>
</div>
<div id="rightpannel">
	<div id="msgcontainer">
		<br>
		<br>
	</div>
	<div id="createmsgbar" class="clearfix">
		<div id="msgtypebar"><input id="typemsg" type="text" name="typemsg" value="" onclick='sendMyMsg($("#typemsg").val());'/></div>
		<div id="sendbutton" onclick='javascript:sendMyMsg($("#typemsg").val()); autoScrollDown(); $("#typemsg").focus();' onmouseover='showPointerOnHover(this);'></div>
	</div>
</div>