<?php
	header('Content-type: text/html; charset=utf-8');
	require_once 'includes.php';
	require_once 'templates.php';

	sec_session_start();
	//Combines all files together
	if(DEBUG){
		exec("./tools/mergejs ./tools/merge_files/input.txt ./js/script.js");
		exec("./tools/mergecss");
	}
	//tool to merge all code in one file
	$logged_in = login_check($mysqli);	
?>

<html>
	<head>
		<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
		<title>Yosapp</title>
		<meta name="description" content="Yosapp brings the power of Whatsapp to desktop browsers. Whatsapp on web has never been easier.">
		<META NAME="ROBOTS" CONTENT="INDEX, FOLLOW">
		<meta name="keywords" content="Yosapp,Whatsapp on web, Whatsapp, Landline Whatsapp, Online messenger, Cross platform, Encrypted, Secure, Safe">
		<meta name="author" content="Folks Freak">
		<!--Assume that all the css files will be merged to one while running -->
		<link rel="stylesheet" type="text/css" media="all" href="css/design.min.css">
		<!-- Third Party APIs -->
		<link href='http://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'>
		<link href='http://fonts.googleapis.com/css?family=Anton' rel='stylesheet' type='text/css'>
		<link href='http://fonts.googleapis.com/css?family=Sigmar+One' rel='stylesheet' type='text/css'>		
		<script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
		<script language="javascript" type="text/javascript" src="js/library/buzz.min.js"></script>
		<script language="javascript" type="text/javascript" src="js/library/notify/notify.js"></script>
		<script LANGUAGE="JavaScript" TYPE="text/javascript" SRC="js/library/elizabot/elizabot.min.js"></script>
		<script LANGUAGE="JavaScript" TYPE="text/javascript" SRC="js/library/elizabot/elizadata.min.js"></script>
		<!-- Our singleton and minified code -->
		<script language="javascript" type="text/javascript" src="js/script.min.js"></script>
		<!-- GoogleAnalyticsObject -->
		<script>
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
			ga('create', 'UA-48289387-1', 'yosapp.com');
			ga('require', 'linkid', 'linkid.js');
			ga('send', 'pageview');
		</script>
		<!--Our site script-->
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
		    YW.PROMPT		= function() { return '<?php echo $prompt; ?>' };
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
		    YW.KEYVAL		= JSON.parse(decodeURIComponent('<?php echo (isset($_SESSION["keyVal"]))?$_SESSION["keyVal"]:"{}"; ?>'));
		    YW.UNREAD		= 0;
		    YW.ELIZA 		= new ElizaBot();
		    YW.NOTIFSOUND	= new buzz.sound("sound/notif", {
							    formats: [ "ogg", "mp3" ],
							    preload: true,
							    autoplay: false,
							    loop: false
							  });
		    YW.KEYDEF		= {
		    					"askNotifPerm":1
		    				  };
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
