<div id="addContactForm" class="modalRightMasterDiv">
	<div id="addContactHeader" class="modalRightHeader">ADD CONTACTS</div>
	<div class="inputFieldWraper"><input id="contactFirstName" class="modalInputField" type="text" name="contactFirstName" value="First Name" /></div>
	<div class="inputFieldWraper" id="lastNameWrapper"><input id="contactLastName" class="modalInputField" type="text" name="contactFirstName" value="Last Name" /></div>
	<div id="phNumberWrapper" ><input id="phNumber" class="modalInputField" type="text" name="phNumber" value="Phone Number" /></div>
	<div class="inputFieldWraper" id="countryNameWrapper" ><input id="countryName" class="modalInputField" type="text" name="countryName" value="Country Name" /></div>
	<div class="inputFieldWraper" id="countryCodeWrapper" ><input id="countryCode" class="modalInputField" type="text" name="countryCode" value="CC" /></div>
	<div ><input id="addButton" type="button" value="ADD" onclick='addContact();' /></div>
	<div id="addContactAnimation">
		<div class="animatedIcons" id="user"></div>
		<div class="animatedIcons" id="arrow"></div>
		<div class="animatedIcons" id="phonebook"></div>
		<div id="addContactAnimatedMsgBoxWrapper">
			<div class="addContactAnimatedMsgBox" id="contactNameAnimatedMsgBox">Tuhin Sengupta</div>
			<div class="addContactAnimatedMsgBox" id="addingTextAnimatedMsgBox">Adding...</div>
			<div class="addContactAnimatedMsgBox" id="phonebookAnimatedMsgBox">Successful</div>
		</div>
	</div>
</div>
<!-- Feedback Form -->
<div id="feedbackform" class="modalRightMasterDiv">
	<div id="feedbackHeader" class="modalRightHeader">FEEDBACK</div>
	<div id="feedbackText">Please enter your feedback</div>
	<div id="feedbackInput"><textarea id="feedbackTextArea" rows="10" cols="34" maxlength="500" name="feedbackTextArea" autofocus ></textarea></div>
	<div id="feedbackSubmit" onclick="sendFeedback()"><p>Send</p></div>
	<div id="feedbackIcon"></div>
</div>

<div id="settingsForm" class="modalRightMasterDiv">
	<div id="settingsHeader" class="modalRightHeader">SETTINGS</div>
	<div id="comingSoonBannerSettings" class="comingSoonBanner"></div>
	<div id="underDevIconSettings" class="underDevIcon"></div>
	<p id="underDevTextSettings" class="underDevText">This Feature is under construction and will be available in beta realease</p>
</div>