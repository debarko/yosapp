<?php
	//remove from production environment
	exec("./tools/mergejs ./tools/merge_files/input.txt ./js/script.js");
	//tool to merge all code in one file
	$logged_in = false;
?>

<html>
	<head>
		<link rel="stylesheet" type="text/css" href="css/reset.css">		
		<!--<link rel="stylesheet" type="text/css" media="all" href="css/home.css">-->
		<link rel="stylesheet" type="text/css" media="all" href="css/homescreen.css">
		<link rel="stylesheet" type="text/css" media="all" href="css/chatroom.css">
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
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
