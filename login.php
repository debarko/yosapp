<?php
require_once 'includes.php';

sec_session_start(); // Our custom secure way of starting a PHP session.

if (isset($_POST['username'], $_POST['cc'], $_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password']; // The hashed password.
    $cc = $_POST['cc'];
 
    if (login($username, $password, $cc, $mysqli) == true) {
        // Login success
        $name_of_user = $_SESSION['name'];
        echo "{\"status\": true, \"name\": \"$name_of_user\"}";
    } else {
        // Login failed 
        echo "{\"status\": \"false\", \"reason\": \"Username and Password do not match.\"}";
    }
} else {
    // The correct POST variables were not sent to this page. 
    echo 'Invalid Request';
}
?>