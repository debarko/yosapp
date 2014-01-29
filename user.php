<?php
	require_once 'includes.php';

	sec_session_start();
	$logged_in = login_check($mysqli);

	if(!$logged_in){
		echo "noauth";
		exit();
	}

	$request = filter_input(INPUT_GET, 'request', FILTER_SANITIZE_STRING);

	if($request === "addfriend") {
		$contact = filter_input(INPUT_GET, 'contact', FILTER_SANITIZE_STRING);
		if($contact===""){
			echo "badparam";
			exit();
		}
		$user_data = getW_PassCC($mysqli);
		if(!$user_data) {
			//Empty Whatsapp password
			echo "nodata";
			exit();
		}
		$username = $_SESSION['username'];
		//add code to check whatsapp server validity
		$recv_data = ("http://localhost/m?".
										"method=sync".
										"&contact=".$contact.
										"&cc=".$user_data->cc.
										"&username=".$username.
										"&password=".$user_data->w_pass
										);
		if($recv_data) { //Check for availability of User
			//todo check mysql error
			$contactComma = ','.$contact;
			$mysqli->query("INSERT INTO friends(username, list)
                                    VALUES ('$username', '$contact')
                                    ON DUPLICATE KEY UPDATE
                                    list = CONCAT(list, '$contactComma')");
		}
	} else if($request === "friends") {
		// Using prepared statements means that SQL injection is not possible. 
	    if ($stmt = $mysqli->prepare("SELECT list FROM friends
	       WHERE username = ?
	        LIMIT 1")) {
	        $stmt->bind_param('s', $_SESSION['username']);  // Bind "$username" to parameter.
	        $stmt->execute();    // Execute the prepared query.
	        $stmt->store_result();
	 
	        // get variables from result.
	        $stmt->bind_result($list);
	        $stmt->fetch();

	        if ($stmt->num_rows == 1) {
	            $list = explode(',', $list);
	            $ret_data = '{"server":{"phone":"server","cc": 0, "name":"Yosapp Server", "messages":{}},';
	            $count = 0;
	            foreach ($list as $value) {
	            	$user_data = getW_PassCC($mysqli, $value);
	            	if(!$user_data) {
	            		$count++;
	            		continue;
	            	}
	            	$ccPhone = $user_data->cc.$value;
	            	$ret_data .= "\"$ccPhone\":{\"phone\":\"$value\",\"cc\":$user_data->cc,\"name\": \"$user_data->name\",\"messages\": {}}";
                    if((count($list)-1)>$count++){
                    	$ret_data .= ",";
                    }
	            }
	            if($ret_data===""){
	            	$ret_data = "{}";
	            }
	            echo $ret_data.'}';
	            exit();
	        } else {
	            // No user exists.
	            echo "empty";
	            exit();
	        }
	    } else {
	    	echo "sqlfail";
	    	exit();
	    }
	} else {
		echo "badparam";
		exit();
	}
?>