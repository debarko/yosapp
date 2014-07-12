<?php
	if ($_GET['method']==="send") {
		echo "sent";
	}
	if ($_GET['method']==="listen") {
                echo "";
        }
	if ($_GET['method']==="status") {
                echo "fine";
        }
	if ($_GET['method']==="register") {
                echo "{status: 'ok'}";
        }
	if ($_GET['method']==="sendcode") {
		echo "status: ok\nkind: ok\npw: dasdfdf3453reer34";
        }

?>
