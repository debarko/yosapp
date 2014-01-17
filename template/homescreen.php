<div class="logintooltips" ><div id="loginbutton"></div><span>Click To Login</span></div>

<form class="form" id="loginform" name="input">
	<div id="loginheadertext">
		LOGIN
		<span></span>
	</div>
	<div id="usernameLoginDiv">
		USERNAME <input id="userfield" class="inputfields" type="text" name="user" />
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

<form class="form" id="regform" name="input">
	<div id="regheadertext">
		SIGNUP
		<span></span>
	</div>
	<div>
		PHONE NUMBER <input id="phone_reg" class="inputfields" type="text" name="username" />
	</div>
	<div>
		PASSWORD  <input id="regpass" class="inputfields" type="password" name="password" />
	</div>
	<div>
		RE-PASSWORD  <input id="reregpass" class="inputfields" type="password" name="confirmpwd" />
	</div>
	<div>
		EMAIL <input id="email" class="inputfields" type="text" name="email" />
	</div>
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