<?php
	$homescreen = addslashes(file_get_contents("./template/homescreen.php"));
	$homescreen = str_replace(array("\r", "\n"), '', $homescreen);
	$chatscreen = addslashes(file_get_contents("./template/chatscreen.php"));
	$chatscreen = str_replace(array("\r", "\n"), '', $chatscreen);
	$chatbubble = addslashes(file_get_contents("./template/chatbubble.php"));
	$chatbubble = str_replace(array("\r", "\n"), '', $chatbubble);
	$header_logged_in = addslashes(file_get_contents("./template/header_logged_in.php"));
	$header_logged_in = str_replace(array("\r", "\n"), '', $header_logged_in);
	$header_logged_out = addslashes(file_get_contents("./template/header_logged_out.php"));
	$header_logged_out = str_replace(array("\r", "\n"), '', $header_logged_out);
?>