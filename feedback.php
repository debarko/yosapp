<?php
require_once 'includes.php';

sec_session_start(); // Our custom secure way of starting a PHP session.

$msg = ($_GET['msg'])?$_GET['msg']:"";
$ua = ($_GET['ua'])?$_GET['ua']:"";

$msg = urldecode($msg);
$ua = urldecode($ua);

$now = time();
$user_id = (isset($_SESSION["user_id"]))?$_SESSION["user_id"]:0;
$ip = $_SERVER['REMOTE_ADDR'];

$mysqli->query("INSERT INTO feedback(user_id, time, msg, ip, ua)
                                    VALUES ('$user_id', '$now', '$msg', '$ip', '$ua')");
echo "Thanks for the message. We will look into it shortly!";
?>