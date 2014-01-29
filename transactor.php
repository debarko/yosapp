<?php
	require_once 'includes.php';

	sec_session_start();
	$logged_in = login_check($mysqli);

	if(!$logged_in){
		echo "noauth";
		exit();
	}

	$method = filter_input(INPUT_GET, 'method', FILTER_SANITIZE_STRING);
	$username = $_SESSION['username'];
	$user_data = getW_PassCC($mysqli); //Password for Whatsapp Server
	
	if(!$user_data) {
		//Empty Whatsapp password
		echo "nodata";
		exit();
	}
	if($method==="send"){
		$to = filter_input(INPUT_GET, 'to', FILTER_SANITIZE_NUMBER_INT);
		$message = filter_input(INPUT_GET, 'message', FILTER_SANITIZE_ENCODED, FILTER_FLAG_ENCODE_HIGH);		
		$recv_data = file_get_contents("http://localhost/m?".
										"method=send".
										"&to=".$to.
										"&message=".$message.
										"&cc=".$user_data->cc.
										"&username=".$username.
										"&password=".$user_data->w_pass
										);
		echo $recv_data;
	} else if($method==="listen") {
		$recv_data = file_get_contents("http://localhost/m?".
										"method=listen".
										"&cc=".$user_data->cc.
										"&username=".$username.
										"&password=".$user_data->w_pass
										);
		if($recv_data==="FAIL"){
			echo "noconnect";
			exit();
		}
		if($recv_data===""){
			echo "nomessage";
			exit();
		}
		header('Content-type: application/json');
		// Arrays we'll use later
		$keys = array();
		$newArray = array();
		
		$recv_data = explode("\n", $recv_data);
		// Do it
		$data = csvToArray($recv_data, ',');
		 
		// Set number of elements (minus 1 because we shift off the first row)
		$count = count($data);

		/*// Bring it all together
		for ($i = 0; $i < $count; $i++) {
		  $data[$i] = json_encode($data[$i]);
		}*/
		 
		// Print it out as JSON
		echo json_encode($data);
		//echo $recv_data;
	} else {
		echo "badparam";
		exit();
	}
?>