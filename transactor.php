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
	
	if($_SESSION['w_pass']==="noauth" && $method!=="codereq" && 
										  $method!=="sendcode"){
		echo "emptyauth";
		exit();
	}

	if($method==="send"){
		$to = filter_input(INPUT_GET, 'to', FILTER_SANITIZE_NUMBER_INT);
		$message = filter_input(INPUT_GET, 'message', FILTER_SANITIZE_ENCODED, FILTER_FLAG_ENCODE_HIGH);		
		$recv_data = file_get_contents("http://localhost/m?".
										"method=send".
										"&to=".$to.
										"&message=".$message.
										"&cc=".$_SESSION['cc'].
										"&username=".$username.
										"&password=".$_SESSION['w_pass']
										);
		echo $recv_data;
	} else if($method==="codereq") {
		$id_user = filter_input(INPUT_GET, 'id_user', FILTER_SANITIZE_STRING);
		$via = filter_input(INPUT_GET, 'via', FILTER_SANITIZE_STRING);
		if($via=="voice"){
			$via = "voice";
		} else if($via=="sms"){
			$via = "sms";
		} else {
			echo "badparam";
			exit();
		}
		$recv_data = file_get_contents("http://localhost/m?".
										"method=register".
										"&cc=".$_SESSION['cc'].
										"&username=".$username.
										"&id_user=".$id_user.
										"&via=".$via
										);
		echo $recv_data;
	} else if($method==="sendcode") {
		$id_user = filter_input(INPUT_GET, 'id_user', FILTER_SANITIZE_STRING);
		$code = filter_input(INPUT_GET, 'code', FILTER_SANITIZE_NUMBER_INT);
		$recv_data = file_get_contents("http://localhost/m?".
										"method=sendcode".
										"&cc=".$_SESSION['cc'].
										"&username=".$username.
										"&id_user=".$id_user.
										"&code=".$code
										);
		$pattern = "/status: ([a-z]*)\nkind: [a-z]*\npw: ([A-Za-z_+-=]*)/";
		preg_match($pattern, $recv_data, $matches);
		if(isset($matches[1]) && $matches[1]==="ok"){
			$mysqli->query("UPDATE members
							SET w_pass='$matches[2]'
							WHERE id={$_SESSION['user_id']};");
			$_SESSION['w_pass']=$matches[2];
			echo "success";
			exit();
		} else {
			echo "fail";
			exit();
		}
	} else if($method==="listen") {
		$recv_data = file_get_contents("http://localhost/m?".
										"method=listen".
										"&cc=".$_SESSION['cc'].
										"&username=".$username.
										"&password=".$_SESSION['w_pass']
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