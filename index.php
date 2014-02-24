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
		<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
		<title>YOSAPP</title>
		<link rel="stylesheet" type="text/css" href="css/reset.css">		
		<!--Assume that all the css files will be merged to one while running -->
		<link rel="stylesheet" type="text/css" media="all" href="css/homescreen.css">
		<link rel="stylesheet" type="text/css" media="all" href="css/chatroom.css">
		<link rel="stylesheet" type="text/css" media="all" href="css/modal.css">
		<link rel="stylesheet" type="text/css" media="all" href="css/minEmoji.css">
		<!-- Third Party APIs -->
		<!-- <link href='http://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'> -->
		<!-- <link href='http://fonts.googleapis.com/css?family=Anton' rel='stylesheet' type='text/css'> -->
		<!-- <link href='http://fonts.googleapis.com/css?family=Sigmar+One' rel='stylesheet' type='text/css'> -->
		<!-- GoogleAnalyticsObject -->
		<script>
			// (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			// (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			// m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			// })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
			// ga('create', 'UA-48289387-1', 'yosapp.com');
			// ga('send', 'pageview');
		</script>

		<!--<script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5.js"></script> -->
		<script language="javascript" type="text/javascript" src="js/library/jquery.min.js"></script>
		<script language="javascript" type="text/javascript" src="js/library/minEmoji.js"></script>
		<script language="javascript" type="text/javascript" src="js/library/notify/notify.js"></script>
		<script LANGUAGE="JavaScript" TYPE="text/javascript" SRC="js/library/elizabot/elizabot.js"></script>
		<script LANGUAGE="JavaScript" TYPE="text/javascript" SRC="js/library/elizabot/elizadata.js"></script>
		<!-- Our singleton and minified code -->
		<script language="javascript" type="text/javascript" src="js/script.js"></script>
		<script type="text/javascript">
		window.YW = {};
		(function(YW) {
		    YW.HOMESCREEN   = function() { return '<?php echo $homescreen; ?>'; };
		    YW.CHATSCREEN   = function() { return '<?php echo $chatscreen; ?>'; };
		    YW.CHATBUBBLE	= function() { return '<?php echo $chatbubble; ?>'; };
		    YW.VERIF		= function() { return '<?php echo $verif; ?>';};
		    YW.LOGGED_IN_H	= function() { return '<?php echo $header_logged_in; ?>' };
		    YW.LOGGED_OUT_H	= function() { return '<?php echo $header_logged_out; ?>' };
		    YW.MODAL		= function() { return '<?php echo $modal_window; ?>' };
		    YW.L_IN			= function() { return '<?php echo $left_in; ?>' };
		    YW.L_OUT		= function() { return '<?php echo $left_out; ?>' };
		    YW.R_IN			= function() { return '<?php echo $right_in; ?>' };
		    YW.R_OUT		= function() { return '<?php echo $right_out; ?>' };
		    YW.CONTACT		= function() { return '<?php echo $contact; ?>' };
		    YW.RELEASECON	= function() { return '<?php echo $releaseCon; ?>' };
		    YW.VISION	    = function() { return '<?php echo $vision; ?>' };
		    YW.UA			= function() { return navigator.userAgent; };
		    YW.COUNTRIES 	= <?php echo $countries; ?>;
			
			//Game Params
			YW.logged_in	= function() { return '<?php echo ($logged_in)?"true":"false"; ?>'; };
			
			//Parameters
			YW.CURR_PARTNER	= {};
		    YW.LOADED_AT    = new Date();
		    YW.DATA			= {};
		    YW.VIA			= "sms";
		    YW.IMEI			= 0;
		    YW.LISTENER		= 0;
		    YW.NAME			= "<?php echo (isset($_SESSION['name']))?$_SESSION['name']:0; ?>";
		    YW.UNREAD		= 0;
		    YW.ELIZA 		= new ElizaBot();
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
		<div id="overlay"></div>
	</body>
</html>
