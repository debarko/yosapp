<?php
require_once 'includes.php';

sec_session_start(); // Our custom secure way of starting a PHP session.

$msg = ($_GET['msg'])?$_GET['msg']:"";
$linenumber = ($_GET['linenumber'])?$_GET['linenumber']:"";
$ua = ($_GET['ua'])?$_GET['ua']:"";

$msg = urldecode($msg);
$linenumber = urldecode($linenumber);
$ua = urldecode($ua);

$now = time();
$user_id = (isset($_SESSION["user_id"]))?$_SESSION["user_id"]:0;
$error = $msg . "<br />" . $linenumber;
$ip = $_SERVER['REMOTE_ADDR'];

$mysqli->query("INSERT INTO error(user_id, time, error, ip, ua)
                                    VALUES ('$user_id', '$now', '$error', '$ip', '$ua')");
echo "Server knows about this!";
?>