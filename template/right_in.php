<!-- add contact -->
<div id="addContactForm" class="modalRightMasterDiv">
	<div id="addContactHeader" class="modalRightHeader">ADD CONTACTS</div>
	<div class="inputFieldWraper" id="firstNameWrapper"><input id="contactFirstName" class="modalInputField" type="text" name="contactFirstName" value="" onkeyup='hideTip(this);'/><span class="inputFieldTip inputFieldTip4Cont">Ex: Thomas matheson</span></div>
	<div id="phNumberWrapper" ><input id="phNumber" class="modalInputField" type="text" name="phNumber" value="" onkeyup='hideTip(this);' /><span class="inputFieldTip inputFieldTip4Cont">Ex: 9876543210</span></div>
	<div class="inputFieldWraper" id="countryNameWrapper" ><input id="countryName" class="modalInputField" type="text" name="countryName" value="" onkeyup='hideTip(this);' /><span class="inputFieldTip inputFieldTip4Cont">Ex: India</span></div>
	<div class="inputFieldWraper" id="countryCodeWrapper" ><input id="countryCode" class="modalInputField" type="text" name="countryCode" value="" onkeyup='hideTip(this);' /><span class="inputFieldTip inputFieldTip4Cont" id="addConCCTip">Ex: 91</span></div>
	<div ><input id="addButton" class="modalRightButton" type="button" value="ADD" onclick='addContact();' /></div>
	<div id="addContactAnimation">
		<div class="animatedIcons" id="user"></div>
		<div class="animatedIcons" id="arrow"></div>
		<div class="animatedIcons" id="phonebook"></div>
		<div id="addContactAnimatedMsgBoxWrapper">
			<div class="addContactAnimatedMsgBox" id="contactNameAnimatedMsgBox"></div>
			<div class="addContactAnimatedMsgBox" id="addingTextAnimatedMsgBox">Adding...</div>
			<div class="addContactAnimatedMsgBox" id="phonebookAnimatedMsgBox">Successful</div>
		</div>
	</div>
</div>
<!-- edit contact form -->
<div id="editContactForm" class="modalRightMasterDiv">
	<div id="editContactHeader" class="modalRightHeader">EDIT CONTACTS</div>
	<div class="inputFieldWraper" id="firstNameWrapper"><input id="contactFirstNameEdit" onkeyup="suggestNames(this.value); hideTip(this);" class="modalInputField" type="text" name="contactFirstName" value="" /><span class="inputFieldTip inputFieldTip4Cont">Ex: Thomas matheson</span></div>
	<div class="inputFieldWraper" id="firstNameList"></div>
	<div id="phNumberWrapper" ><input id="phNumberEdit" class="modalInputField" type="text" name="phNumber" value="" /></div>
	<div class="inputFieldWraper" id="countryNameWrapper" ><input id="countryNameEdit" class="modalInputField" type="text" name="countryName" value="" /></div>
	<div class="inputFieldWraper" id="countryCodeWrapper" ><input id="countryCodeEdit" class="modalInputField" type="text" name="countryCode" value="" /></div>
	<div >
		<input id="updateButton" class="modalRightButton" type="button" value="Update" onclick='UpdateContact();' />&nbsp;&nbsp;
		<input id="ClearButton" class="modalRightButton" type="button" value="Clear" onclick='emptyEditContact();' />
		<div id="delButtonWrapper"><input id="deleteButton" class="modalRightButton" type="button" value="Delete" onclick=';' /></div>
	</div>
	<div id="addContactAnimation">
		<div class="animatedIcons" id="user"></div>
		<div class="animatedIcons" id="arrow"></div>
		<div class="animatedIcons" id="phonebook"></div>
		<div id="addContactAnimatedMsgBoxWrapper">
			<div class="addContactAnimatedMsgBox" id="contactNameAnimatedMsgBox"></div>
			<div class="addContactAnimatedMsgBox" id="addingTextAnimatedMsgBox">Updating...</div>
			<div class="addContactAnimatedMsgBox" id="phonebookAnimatedMsgBox">Successful</div>
		</div>
	</div>
</div>

<!-- Feedback Form -->
<div id="feedbackform" class="modalRightMasterDiv">
	<div id="feedbackHeader" class="modalRightHeader">FEEDBACK</div>
	<div id="feedbackText">Please enter your feedback</div>
	<div id="feedbackInput"><textarea id="feedbackTextArea" rows="10" cols="34" maxlength="500" name="feedbackTextArea" autofocus ></textarea></div>
	<div id="feedbackSubmit" onmouseover='showPointerOnHover(this);' onclick="sendFeedback()"><p>Send</p></div>
	<div id="feedbackIcon"></div>
</div>
<!-- settings -->
<div id="settingsForm" class="modalRightMasterDiv">
	<div id="settingsHeader" class="modalRightHeader">SETTINGS</div>
	<div id="comingSoonBannerSettings" class="comingSoonBanner"></div>
	<div id="underDevIconSettings" class="underDevIcon"></div>
	<p id="underDevTextSettings" class="underDevText">This Feature is under construction and will be available in beta realease</p>
</div>

