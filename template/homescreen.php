<div class="logintooltips" ><div id="loginbutton"></div><span>Click To Login</span></div>

<form class="form" id="loginform" name="input">
	<div id="loginheadertext">
		LOGIN
	</div>
	<div>
		USERNAME <input id="userfield" class="inputfields" type="text" name="user" />
	</div>
	<div>
		PASSWORD <input id="passfield" class="inputfields" type="password" name="user" />
	</div>
	<!--<div><input id=rememberme type="checkbox" name="isrememberme" value="remember me">Keep me loggend in<br></div> -->
	<div>
		<input id="loginsubmit" type="button" value="Login" 
				onclick="formhash(document.getElementById('userfield').value,document.getElementById('passfield').value)"/>
	</div>
	<div class="squaredTwo">
		<input type="checkbox" value="None" id="squaredTwo" name="check" />
		<label for="squaredTwo"></label><p>Remember Me</p>
	</div>
	<p id="forgotpassword">
		Forgot Password?
	</p>
</form>

<form class="form" id="regform" name="input" action="html_form_action.asp" method="get">
	<div id="regheadertext">SIGNUP<span></span></div>
	<div>PHONE NUMBER <input class="inputfields" type="text" name="user"></div>
	<div>PASSWORD  <input id="regpass" class="inputfields" type="password" name="user"></div>
	<div>RE-PASSWORD <input id="reregpass" class="inputfields" type="password" name="user"></div>
	<!--<div><input id=rememberme type="checkbox" name="isrememberme" value="remember me">Keep me loggend in<br></div> -->
	<div><input id="regsubmitbutton" type="submit" value="signup"></div>
</form>