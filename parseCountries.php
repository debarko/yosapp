<?php

	function csvToJson($csv) {
	    $rows = explode("\n", trim($csv));
	    $csvarr = array_map(function ($row) {
	        return str_getcsv($row);
	    }, $rows);
	    $json = json_encode($csvarr);

	    return $json;
	}

	$json = csvToJson(file_get_contents("./template/countries.php"));

	header('Content-Type: application/json');
	header('Cache-Control: no-cache');
	echo $json;
?>
