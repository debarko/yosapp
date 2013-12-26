<?php
require_once 'includes.php';

sec_session_start(); // Our custom secure way of starting a PHP session.

if (isset($_POST['username'], $_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password']; // The hashed password.
 
    if (login($username, $password, $mysqli) == true) {
        // Login success 
        echo "true";
    } else {
        // Login failed 
        echo "false";
    }
} else {
    // The correct POST variables were not sent to this page. 
    echo 'Invalid Request';
}
?>