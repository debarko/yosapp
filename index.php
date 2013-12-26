<?php
//remove from production environment
exec("./tools/mergejs ./tools/merge_files/input.txt ./js/script.js");
//tool to merge all code in one file
?>

<html>
	<head>
		<link rel="stylesheet" type="text/css" href="css/reset.css">
		<link rel="stylesheet" type="text/css" media="all" href="css/chatroom.css">
<!--  	<link rel="stylesheet" type="text/css" media="all" href="css/home.css">  -->
		<link rel="stylesheet" type="text/css" media="all" href="css/testhd.css">
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
		<script language="javascript" type="text/javascript" src="js/script.js"></script>
	</head>
	<body>
	</body>
</html>
