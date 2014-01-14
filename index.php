<?php
	require_once 'includes.php';
	require_once 'templates.php';

	sec_session_start();
	//remove from production environment
	exec("./tools/mergejs ./tools/merge_files/input.txt ./js/script.js");
	//tool to merge all code in one file
	$logged_in = login_check($mysqli);
?>

<html>
	<head>
		<link rel="stylesheet" type="text/css" href="css/reset.css">		
		<!--Assume that all the css files will be merged to one while running -->
		<link rel="stylesheet" type="text/css" media="all" href="css/homescreen.css">
		<link rel="stylesheet" type="text/css" media="all" href="css/chatroom.css">
		<!-- Third Party APIs -->
		<link href='http://fonts.googleapis.com/css?family=Lustria' rel='stylesheet' type='text/css'>
		<script language="javascript" type="text/javascript" src="js/library/jquery.min.js"></script>
		<!-- Our singleton and minified code -->
		<script language="javascript" type="text/javascript" src="js/script.js"></script>
		<script type="text/javascript">
		window.YW = {};
		(function(YW) {
		    YW.HOMESCREEN   = function() { return '<?php echo $homescreen; ?>'; };
		    YW.CHATSCREEN   = function() { return '<?php echo $chatscreen; ?>'; };
		    YW.CHATBUBBLE	= function() { return  '<div id="wrapper_bubble">'+
														'<div id="sent_recv">'+
															'<div class="textbox">'+
																'<span id="deliverystatus"></span>'+
																'<span id="timestamp"></span>'+
															'</div>'+
														'</div>'+
													'</div>'};
			YW.UA           = function() { return navigator.userAgent; };
			YW.logged_in	= function() { return '<?php echo ($logged_in)?"true":"false"; ?>'; };
		    YW.LOADED_AT    = new Date();
			YW.define = function(name, val) {
		        val = (function() { return val; })(); // To avoid execution of the constant functions repeatedly.
		        YW[name] = function() { return val; };
		    }
		})(YW);
		</script>
	</head>
	<body>
		<?php
			require_once("./template/header.php");
		?>
		<div id="bodybg">
		</div>
		<?php
			require_once("./template/footer.php");
		?>
	</body>
</html>
