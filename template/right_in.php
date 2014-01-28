<div id="addContactForm">
	<div id="addContactHeader">ADD CONTACTS</div>
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