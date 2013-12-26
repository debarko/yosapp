<?php
	require_once 'includes.php';
	 
	sec_session_start();
	//remove from production environment
	exec("./tools/mergejs ./tools/merge_files/input.txt ./js/script.js");
	//tool to merge all code in one file
	$logged_in =  login_check($mysqli);
?>

<html>
	<head>
		<link rel="stylesheet" type="text/css" href="css/reset.css">		
		<!--Assume that all the css files will be merged to one while running -->
		<link rel="stylesheet" type="text/css" media="all" href="css/homescreen.css">
		<link rel="stylesheet" type="text/css" media="all" href="css/chatroom.css">
		<!-- Third Party APIs -->
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
		<!-- Our singleton and minified code -->
		<script language="javascript" type="text/javascript" src="js/script.js"></script>
	</head>
	<body>
		<?php
			require_once("./template/header.php");
		?>
		<div id="bodybg">
		<?php
			if(!$logged_in) {
				require_once("./template/homescreen.php");
			} else {
				require_once("./template/chatscreen.php");
			}
		?>
		</div>
		<?php
			require_once("./template/footer.php");
		?>
	</body>
</html>
