<div class="logintooltips" ><div id="loginbutton"></div><span>Click To Login</span></div>

<form class="form" id="loginform" name="input">
	<div id="loginheadertext">
		LOGIN
		<span></span>
	</div>
	<div class="loginFormElementWrapper"><div class="loginGuideText">Phone :</div><div class="loginInputFieldWrapper"><input id="userfield" class="inputfields" type="text" name="" /></div></div>
	<div class="loginFormElementWrapper"><div class="loginGuideText">Password :</div><div class="loginInputFieldWrapper"><input id="passfield" class="inputfields" type="password" name="" /></div></div>
	<div class="loginFormElementWrapper"><div class="loginGuideText">Country :</div><div class="loginInputFieldWrapper"><input id="countryField" class="inputfields" type="text" name="" /></div></div>

	<!--<div><input id=rememberme type="checkbox" name="isrememberme" value="remember me">Keep me loggend in<br></div> -->
	<div>
		<input id="loginsubmit" type="button" value="Login" 
				onclick="formhash(document.getElementById('userfield').value,
								  document.getElementById('passfield').value,
								  document.getElementById('countryField').value,
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
	<div class="regFormElementWrapper"><div class="regGuideText">Name :</div><div class="regInputFieldWrapper" id="regInputFieldWrapperPhoneNumber"><input id="name_reg" class="inputfields" type="text" name="name" /></div></div>
	<div class="regFormElementWrapper"><div class="regGuideText">Email :</div><div class="regInputFieldWrapper" id="regInputFieldWrapperEmail"><input id="email" class="inputfields" type="text" name="email" /></div></div>
	<div class="regFormElementWrapper"><div class="regGuideText">Country :</div><div class="regInputFieldWrapper" id="regInputFieldWrapperPhoneNumber"><input id="cc_reg" class="inputfields" type="text" name="cc" /></div></div>
	<div>
		<input id="regsubmitbutton" type="button" value="Signup" 
		onclick="
			regformhash(document.getElementById('regform'),
						document.getElementById('phone_reg'),
					 	document.getElementById('email'),
					 	document.getElementById('regpass'),
					 	document.getElementById('cc_reg'),
					 	document.getElementById('name_reg')
					 	)
		"/>
	</div>
</form>

<div id="errorMsgBox">
	<span id="errMsg"></span>
	<span id="closeErrMsgBox" onclick="javascript:closeErrorMgsBox();"></span>
</div>