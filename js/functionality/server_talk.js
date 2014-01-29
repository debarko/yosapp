function sendActualMessage(message) {
	if(YW.CURR_PARTNER==="" || YW.CURR_PARTNER==="server"){
		return false;
	}
	$aJX_status = $.ajax({
        type: "GET",
        url: "./transactor.php?method=send&to="+YW.CURR_PARTNER+"&message="+message,
        })
        .success(function(response) {
        	times = 0;
            if(response==="sent") {
            	return true;
            }
            else {
                return false;
            }
        })
        .fail(function(response) {
        	times = 0;
        	return false;
    	});

    return $aJX_status;
}

function checkMessage() {
	$aJX_status = $.ajax({
        type: "GET",
        url: "./transactor.php?method=listen",
        })
        .success(function(response) {
        	times = 0;
            if(response==="empty") {
            	return false;
            } else if(response==="nomessage") {
                return false;
            } else if(response==="noconnect") {
                return false;
            } else {
            	processMessage(response);
                return true;
            }
        })
        .fail(function(response) {
        	times = 0;
        	return false;
    	});

    return $aJX_status;
}