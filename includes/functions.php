<?php
// Function to convert CSV into associative array
function csvToArray($string, $delimiter) {
    for($i=0;$i<count($string)-1;$i++){
        $lineArray = str_getcsv($string[$i], $delimiter);
        for ($j = 0; $j < count($lineArray); $j++) {
            if($j==0){
                $lineArray[$j] = filter_number($lineArray[$j]);
            }
            $arr[$i][$j] = $lineArray[$j]; 
        }
    }
    return $arr;
}

function filter_number($badNumer){
    if($badNumer===""){
        return false;
    }
    $goodNumber = explode("@", $badNumer);
    if($goodNumber[1]!="s.whatsapp.net"){
        reportAnomaly("Whatsapp Server is different for the number sent to our server. Server is: ".
                      $goodNumber[1]." Number is: ".$goodNumber[0]);
    }
    return $goodNumber[0];
}

function reportAnomaly($message) {
    //todo: save this in database
    return;
}

function getUserDetails($mysqli, $username="default", $cc="default") {
    ($username==="default")?$username=$_SESSION['username']:1;
    ($cc==="default")?$cc=$_SESSION['cc']:1;
    // Using prepared statements means that SQL injection is not possible. 
    if ($stmt = $mysqli->prepare("SELECT name, email FROM members
       WHERE username = ?
       AND cc = ?
        LIMIT 1")) {
        $stmt->bind_param('si', $username, $cc);  // Bind "$username" to parameter.
        $stmt->execute();    // Execute the prepared query.
        $stmt->store_result();
 
        // get variables from result.
        $stmt->bind_result($name, $email);
        $stmt->fetch();

        if ($stmt->num_rows == 1) {
            return json_decode("{\"name\":\"$name\",\"email\": \"$email\"}");
        } else {
            // No user exists.
            return false;
        }
    }
}

//A function which checks for validity of $_POST or $_GET variable
//existance
function isDataEqual($srv, $var_name, $val="notused") {
    if(!isset($srv)) {
        //Internal check
        return false;
    }
    if(!isset($srv[$var_name])){
        //Variable is not set
        return false;
    }
    if($val === "notused") {
        //Variable exists
        return true;
    } else if($srv[$var_name]===$val) {
        //Value same
        return true;
    } else {
        //Not matching
        return false;
    }
}

function sec_session_start() {
    $session_name = 'sec_session_id';   // Set a custom session name
    $secure = SECURE;
    // This stops JavaScript being able to access the session id.
    $httponly = true;
    // Forces sessions to only use cookies.
    ini_set('session.use_only_cookies', 1);
    // Gets current cookies params.
    $cookieParams = session_get_cookie_params();
    session_set_cookie_params($cookieParams["lifetime"],
        $cookieParams["path"], 
        $cookieParams["domain"], 
        $secure,
        $httponly);
    // Sets the session name to the one set above.
    session_name($session_name);
    session_start();            // Start the PHP session 
    session_regenerate_id();    // regenerated the session, delete the old one. 
}

function login($username, $password, $cc, $mysqli) {
    // Using prepared statements means that SQL injection is not possible. 
    if ($stmt = $mysqli->prepare("SELECT id, username, password, salt, name, w_pass 
        FROM members
        WHERE username = ?
        AND cc = ?
        LIMIT 1")) {
        $stmt->bind_param('si', $username, $cc);  // Bind "$username" to parameter.
        $stmt->execute();    // Execute the prepared query.
        $stmt->store_result();
 
        // get variables from result.
        $stmt->bind_result($user_id, $username, $db_password, $salt, $name, $w_pass);
        $stmt->fetch();
 
        // hash the password with the unique salt.
        $password = hash('sha512', $password . $salt);
        if ($stmt->num_rows == 1) {
            // If the user exists we check if the account is locked
            // from too many login attempts 
 
            if (checkbrute($user_id, $mysqli) == true) {
                // Account is locked 
                // Send an email to user saying their account is locked
                return false;
            } else {
                // Check if the password in the database matches
                // the password the user submitted.
                if ($db_password == $password) {
                    // Password is correct!
                    // Get the user-agent string of the user.
                    $user_browser = $_SERVER['HTTP_USER_AGENT'];
                    // XSS protection as we might print this value
                    $user_id = preg_replace("/[^0-9]+/", "", $user_id);
                    $_SESSION['user_id'] = $user_id;
                    // XSS protection as we might print this value
                    $username = preg_replace("/[^a-zA-Z0-9_\-]+/", 
                                                                "", 
                                                                $username);
                    $_SESSION['username'] = $username;
                    $_SESSION['w_pass'] = (isset($w_pass))?$w_pass:"noauth";
                    $_SESSION['name'] = $name;
                    $_SESSION['cc'] = $cc;
                    $_SESSION['login_string'] = hash('sha512', 
                              $password . $user_browser);
                    // Login successful.
                    return true;
                } else {
                    // Password is not correct
                    // We record this attempt in the database
                    $now = time();
                    $mysqli->query("INSERT INTO login_attempts(user_id, time)
                                    VALUES ('$user_id', '$now')");
                    return false;
                }
            }
        } else {
            // No user exists.
            return false;
        }
    }
}

function checkbrute($user_id, $mysqli) {
    // Get timestamp of current time 
    $now = time();
 
    // All login attempts are counted from the past 2 hours. 
    $valid_attempts = $now - (2 * 60 * 60);
 
    if ($stmt = $mysqli->prepare("SELECT time 
                             FROM login_attempts <code><pre>
                             WHERE user_id = ? 
                            AND time > '$valid_attempts'")) {
        $stmt->bind_param('i', $user_id);
 
        // Execute the prepared query. 
        $stmt->execute();
        $stmt->store_result();
 
        // If there have been more than LOGIN_ATTEMPTS failed logins 
        if ($stmt->num_rows > LOGIN_ATTEMPTS) {
            return true;
        } else {
            return false;
        }
    }
}

function login_check($mysqli) {
    // Check if all session variables are set 
    if (isset($_SESSION['user_id'], 
                        $_SESSION['username'],
                        $_SESSION['name'],
                        $_SESSION['w_pass'],
                        $_SESSION['cc'], 
                        $_SESSION['login_string'])) {
 
        $user_id = $_SESSION['user_id'];
        $login_string = $_SESSION['login_string'];
        $username = $_SESSION['username'];
 
        // Get the user-agent string of the user.
        $user_browser = $_SERVER['HTTP_USER_AGENT'];
 
        if ($stmt = $mysqli->prepare("SELECT password 
                                      FROM members 
                                      WHERE id = ? LIMIT 1")) {
            // Bind "$user_id" to parameter. 
            $stmt->bind_param('i', $user_id);
            $stmt->execute();   // Execute the prepared query.
            $stmt->store_result();
 
            if ($stmt->num_rows == 1) {
                // If the user exists get variables from result.
                $stmt->bind_result($password);
                $stmt->fetch();
                $login_check = hash('sha512', $password . $user_browser);
 
                if ($login_check == $login_string) {
                    // Logged In!!!! 
                    return true;
                } else {
                    // Not logged in 
                    return false;
                }
            } else {
                // Not logged in 
                return false;
            }
        } else {
            // Not logged in 
            return false;
        }
    } else {
        // Not logged in 
        return false;
    }
}
?>