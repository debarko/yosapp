<?php
	$homescreen = addslashes(file_get_contents("./template/homescreen.php"));
	$homescreen = str_replace(array("\r", "\n"), '', $homescreen);
	$chatscreen = addslashes(file_get_contents("./template/chatscreen.php"));
	$chatscreen = str_replace(array("\r", "\n"), '', $chatscreen);
?>