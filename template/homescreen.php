<div class="logintooltips" ><div id="loginbutton"></div><span>Click To Login</span></div>

<form class="form" id="loginform" name="input">
	<div id="loginheadertext">
		LOGIN
		<span></span>
	</div>
	<div id="usernameLoginDiv">
		PHONE NUMBER <input id="userfield" class="inputfields" type="text" name="user" />
		<span id="usernameLoginTooltip" class="loginformFieldTooltips">Enter Phone Number</span>
	</div>
	<div>
		PASSWORD <input id="passfield" class="inputfields" type="password" name="user" />
		<span id="passLoginTooltip" class="loginformFieldTooltips">Enter Password</span>
	</div>
	<!--<div><input id=rememberme type="checkbox" name="isrememberme" value="remember me">Keep me loggend in<br></div> -->
	<div>
		<input id="loginsubmit" type="button" value="Login" 
				onclick="formhash(document.getElementById('userfield').value,
								  document.getElementById('passfield').value,
								  document.getElementById('loginform'))" />
	</div>
	<div class="squaredTwo">
		<input type="checkbox" value="None" id="squaredTwo" name="check" />
		<label for="squaredTwo"></label><p>Remember Me</p>
	</div>
	<p id="forgotpassword">
		Forgot Password?
	</p>
</form>

<form class="form" id="regform" name="input" >
	<div id="regheadertext">
		SIGNUP
		<span></span>
	</div>
	<div class="regFormElementWrapper"><div class="regGuideText">Phone :</div><div class="regInputFieldWrapper" id="regInputFieldWrapperPhoneNumber"><input id="phone_reg" class="inputfields" type="text" name="username" /></div></div>
	<div class="regFormElementWrapper"><div class="regGuideText">Password :</div><div class="regInputFieldWrapper" id="regInputFieldWrapperPass"><input id="regpass" class="inputfields" type="password" name="password" /></div></div>
	<div class="regFormElementWrapper"><div class="regGuideText">Name :</div><div class="regInputFieldWrapper" id="regInputFieldWrapperPhoneNumber"><input id="phone_reg" class="inputfields" type="text" name="username" /></div></div>
	<div class="regFormElementWrapper"><div class="regGuideText">Email :</div><div class="regInputFieldWrapper" id="regInputFieldWrapperEmail"><input id="email" class="inputfields" type="text" name="email" /></div></div>
	<div class="regFormElementWrapper"><div class="regGuideText">Country :</div><div class="regInputFieldWrapper" id="regInputFieldWrapperPhoneNumber"><input id="phone_reg" class="inputfields" type="text" name="username" /></div></div>
	<div>
		<input id="regsubmitbutton" type="button" value="Signup" 
		onclick="
			regformhash(document.getElementById('regform'),
						document.getElementById('phone_reg'),
					 	document.getElementById('email'),
					 	document.getElementById('regpass'),
					 	document.getElementById('reregpass')
					 	)
		"/>
	</div>
</form>

<div id="errorMsgBox">
	<span id="errMsg"></span>
	<span id="closeErrMsgBox" onclick="javascript:closeErrorMgsBox();"></span>
</div>