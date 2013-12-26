<?php
//remove from production environment
exec("./tools/mergejs ./tools/merge_files/input.txt ./js/script.js");
//tool to merge all code in one file
?>

<html>
	<head>
		<link rel="stylesheet" type="text/css" href="css/reset.css">
<!--  	<link rel="stylesheet" type="text/css" media="all" href="css/home.css">  -->
		<link rel="stylesheet" type="text/css" media="all" href="css/testhd.css">
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
		<script language="javascript" type="text/javascript" src="js/script.js"></script>
	</head>
	<body>
	<div id="master">
		<div id="header">
			<div id="banner" >Welcome To<br>&nbsp;whatsaap</div>
			<div id="icons">
				<div class=liketooltip><div id="like" class="icon"></div><span>Facebook Like</span></div>
				<div class=helptooltip><diiv id="help" class="icon"></diiv><span>Help</span></div>
				<div class=signuptooltip><div id="signup" class="icon"></div><span>Sign Up</span></div>
			</div>
		</div>

		<div id="headsep"></div>

		<div id="bodybg">
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



		</div>

		<div id="footsep"></div>

		<div id="footer">
			<div></div>
		</div>
	</div>
		<div id="copyright"><p>Copyright &copy; 2013. TD projects. All rights reserved.</p></div>
	</body>
</html>
