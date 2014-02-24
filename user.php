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
		$contact = filter_input(INPUT_POST, 'contact', FILTER_SANITIZE_STRING);
		$cc = filter_input(INPUT_POST, 'cc', FILTER_SANITIZE_NUMBER_INT);
		$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
		if($contact==="" || $name===""){
			echo "badparam";
			exit();
		}
		//add code to check whatsapp server validity
		$recv_data = ("http://localhost/m?".
										"method=sync".
										"&contact=".$cc.$contact.
										"&cc=".$_SESSION['cc'].
										"&username=".$_SESSION['username'].
										"&password=".$_SESSION['w_pass']
										);
		if($recv_data) { //Check for availability of User
			//todo check mysql error
			$uid_in_session = $_SESSION["user_id"];
			$contactJSON = '{"n":'.$contact.',"cc":'.$cc.', "name":"'.$name.'"}';
			$contactComma = '-'.$contactJSON;
			if(!$mysqli->query("INSERT INTO friends(id, list)
                                    VALUES ('$uid_in_session', '$contactJSON')
                                    ON DUPLICATE KEY UPDATE
                                    list = CONCAT(list, '$contactComma');")) {
				echo ("Error friends: ".$mysqli->error);
				exit();
			}
			if ($stmt = $mysqli->prepare("SELECT id, name 
                                      FROM members 
                                      WHERE username = ? 
                                      AND cc = ?
                                      LIMIT 1")) {
	            // Bind "$user_id" to parameter. 
	            $stmt->bind_param('si', $contact, $cc);
	            $stmt->execute();   // Execute the prepared query.
	            $stmt->store_result();
	 
	            if ($stmt->num_rows == 1) {
	            	//Change name if it is only number
	            	$stmt->bind_result($user_id, $name_db);
        			$stmt->fetch();

        			if($name_db === $cc.$contact){
        				if(!$mysqli->query("UPDATE members SET name='$name' WHERE id=$user_id;")) {
							echo ("Error members: ".$mysqli->error);
							exit();
						}	
        			}
	            } else {
	            	//Insert his name and all
	            	if(!$mysqli->query("INSERT INTO members(username, name, cc)
	                                    VALUES ('$contact', '$name', $cc);")) {
						echo ("Error members: ".$mysqli->error);
						exit();
					}
	            }
	        }
	        echo "SUCCESS";
		}
	} else if($request === "friends") {
		// Using prepared statements means that SQL injection is not possible. 
	    if ($stmt = $mysqli->prepare("SELECT list FROM friends
	       WHERE id = ?
	        LIMIT 1")) {
	        $stmt->bind_param('s', $_SESSION['user_id']);
	        $stmt->execute();    // Execute the prepared query.
	        $stmt->store_result();
	 
	        // get variables from result.
	        $stmt->bind_result($list);
	        $stmt->fetch();

	        if ($stmt->num_rows == 1) {
	            $list = explode('-', $list);
	            $ret_data = '{"0server":{"phone":"server","cc": 0, "name":"Yosapp Server", "messages":{}, "messageTree": []},';
	            $count = 0;
	            foreach ($list as $value) {
	            	$value = json_decode($value);
	            	$user_data = "";
	            	$friend_name = "";
	            	if(!isset($value->name)){
		            	$user_data = getUserDetails($mysqli, $value->n, $value->cc);
		            	if(!$user_data) {
		            		$count++;
		            		continue;
		            	}
		            	$friend_name = $user_data->name;
	            	} else {
	            		$friend_name = $value->name;
	            	}
	            	$ccPhone = $value->cc.$value->n;
	            	$ret_data .= "\"$ccPhone\":{\"phone\":\"$value->n\",\"cc\":$value->cc,\"name\": \"$friend_name\",\"messages\": {}, \"messageTree\": []}";
                    if((count($list)-1)>$count++){
                    	$ret_data .= ",";
                    }
	            }
	            echo $ret_data.'}';
	            exit();
	        } else {
	            // No user exists.
	            echo '{"0server":{"phone":"server","cc": 0, "name":"Yosapp Server", "messages":{}, "messageTree": []}}';
	            exit();
	        }
	    } else {
	    	echo "sqlfail";
	    	exit();
	    }
	} else if($request === "wpass_check") {
		if ($stmt = $mysqli->prepare("SELECT w_pass FROM members
	       WHERE id = ?
	        LIMIT 1")) {
	        $stmt->bind_param('s', $_SESSION['user_id']);
	        $stmt->execute();    // Execute the prepared query.
	        $stmt->store_result();
	 
	        // get variables from result.
	        $stmt->bind_result($w_pass);
	        $stmt->fetch();
	        if ($w_pass !== NULL && $w_pass !== "") {
	            echo "true";
	            exit();
	        } else {
	            // user has no w_pass.
	            echo "false";
	            exit();
	        }
	    } else {
	    	echo "sqlfail";
	    	exit();
	    }
	} else if($request === "updateFriend") {
		$contact = filter_input(INPUT_POST, 'contact', FILTER_SANITIZE_STRING);
		$cc = filter_input(INPUT_POST, 'cc', FILTER_SANITIZE_NUMBER_INT);
		$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
		if($contact==="" || $name===""){
			echo "badparam";
			exit();
		}		
		if ($stmt = $mysqli->prepare("SELECT list FROM friends
	       WHERE id = ?
	        LIMIT 1")) {
	        $stmt->bind_param('s', $_SESSION['user_id']);
	        $stmt->execute();    // Execute the prepared query.
	        $stmt->store_result();
	 
	        // get variables from result.
	        $stmt->bind_result($list);
	        $stmt->fetch();
	        
	        //update friends;
	        $list = explode('-', $list);
	        $restore = "";
	        foreach ($list as $value) {
            	$value = json_decode($value);
            	if($value->n==$contact && $value->cc==$cc){
            		//update name
            		$value->name = $name;
            	}
            	$value = json_encode($value);
            	if($restore!=""){
            		$value = '-'.$value;
            	}
            	$restore .= $value;            	
            }
            $user_id = $_SESSION['user_id'];
            if(!$mysqli->query("UPDATE friends SET list='$restore' WHERE id=$user_id;")) {
				echo ("Error members: ".$mysqli->error);
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