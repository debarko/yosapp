<div id="master">
		<div id="header">
			<div id="banner" >Welcome To<br>&nbsp;whatsaap</div>
			<div id="icons">
				<?php
					if(!$logged_in) {
				?>
				<div class=liketooltip><div id="like" class="icon"></div><span>Facebook Like</span></div>
				<div class=helptooltip><diiv id="help" class="icon"></diiv><span>Help</span></div>
				<div class=signuptooltip><div id="signup" class="icon"></div><span>Sign Up</span></div>
				<?php
					}
					if($logged_in)
					{
				?>
				<div class="icon" id="logout" onclick="window.location='logout.php'"></div>
				<div class="icon" id="settings"></div>
				<div class="icon" id="connectivity"></div>
				<?php
					}
				?>
			</div>
		</div>
		<div id="headsep"></div>