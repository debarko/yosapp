<?php
require_once 'includes.php';
 
$error_msg = "";

if (isset($_POST['name'], $_POST['username'], $_POST['email'], $_POST['cc'], $_POST['p'])) {

    // Sanitize and validate the data passed in
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_NUMBER_INT);
    $cc = filter_input(INPUT_POST, 'cc', FILTER_SANITIZE_NUMBER_INT);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $email = filter_var($email, FILTER_VALIDATE_EMAIL);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Not a valid email
        $error_msg .= 'The email address you entered is not valid';
    }

    if (!filter_input(INPUT_POST, 'username', FILTER_SANITIZE_NUMBER_INT)) {
        // Not a valid phone i.e. username
        $error_msg .= 'The Phone you entered is not valid';
    }

    if (!filter_input(INPUT_POST, 'cc', FILTER_SANITIZE_NUMBER_INT)) {
        // CC is invalid
        $error_msg .= 'Country Code (CC) is Invalid';
    }
 
    $password = filter_input(INPUT_POST, 'p', FILTER_SANITIZE_STRING);
    if (strlen($password) != 128) {
        // The hashed pwd should be 128 characters long.
        // If it's not, something really odd has happened
        $error_msg .= 'Invalid password configuration.';
    }
 
    // Username validity and password validity have been checked client side.
    // This should should be adequate as nobody gains any advantage from
    // breaking these rules.
    //
 
    $prep_stmt = "SELECT id, email FROM members WHERE username = ?  AND cc = ? LIMIT 1";
    $stmt = $mysqli->prepare($prep_stmt);
 
    if ($stmt) {
        $stmt->bind_param('si', $username, $cc);
        $stmt->execute();
        $stmt->store_result();
 
        if ($stmt->num_rows == 1) {
            $stmt->bind_result($id, $email_adr);
            $stmt->fetch();
            if($email_adr!=="" && gettype($email_adr)!== NULL){
                // A user with this email address already exists
                $error_msg .= 'A user with this phonenumber already exists.';
            } else {
                $qry = "DELETE FROM members WHERE id=".$id.";";
                $mysqli->query($qry);
            }
        }
    } else {
        $error_msg .= 'Database error';
    }
 
    // TODO: 
    // We'll also have to account for the situation where the user doesn't have
    // rights to do registration, by checking what type of user is attempting to
    // perform the operation.
 
    if (empty($error_msg)) {
        // Create a random salt
        $random_salt = hash('sha512', uniqid(openssl_random_pseudo_bytes(16), TRUE));
 
        // Create salted password 
        $password = hash('sha512', $password . $random_salt);
 
        // Insert the new user into the database 
        if ($insert_stmt = $mysqli->prepare("INSERT INTO members (username, email, password, salt, cc, name, keyVal) VALUES (?, ?, ?, ?, ?, ?, '{}')")) {
            $insert_stmt->bind_param('ssssis', $username, $email, $password, $random_salt, $cc, $name);
            // Execute the prepared query.
            if (! $insert_stmt->execute()) {
                echo('ERROR: Internal Server Error. Please try again.');
            }
        }
        echo('SUCCESS');
    }
    else {
        echo $error_msg;
    }
} else {
    echo "ERROR: Data not received properly. Please try again.";
}
?>