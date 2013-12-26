<?php
include 'includes.php';
 
sec_session_start(); // Our custom secure way of starting a PHP session.

if (isset($_POST['email'], $_POST['p'])) {
    $email = $_POST['email'];
    $password = $_POST['p']; // The hashed password.
 
    if (login($email, $password, $mysqli) == true) {
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
