<div id="leftpannel">
	<div id="profileinfo">
		<span id="profilepic">
			<p></p>
		</span>
		<p id="profilename">&nbsp;</p>
		<p id="editprofiletext" onclick='showModal("editProf");'>Edit profile</p>
	</div>
	<div id="concactsearch">
		<input id="contactSearchbar" type="text" name="fname" value="" onkeyup='hideTip(this); renderSearchedContact();'/>
		<span class="" id="contactSearchTip" onclick='focusItem("#contactSearchbar");'>Search Contacts</span>
		<span id="searchIcon"></span>
	</div>
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
		<div id="msgtypebar"><input id="typemsg" type="text" name="typemsg" value=""></div>
		<div id="sendbutton" onclick='javascript:sendMyMsg($("#typemsg").val()); autoScrollDown(); $("#typemsg").focus();' onmouseover='showPointerOnHover(this);'></div>
	</div>
</div>
<div id="mediaDisplay">
	<span id="modalCloseButton" onclick="closeMediaDisplay();"></span>
	<div id="displayContent">
		<div class="mediaLoading">Loading</div>
	</div>
</div>