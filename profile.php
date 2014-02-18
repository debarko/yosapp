<?php
$Width = $_GET['w'];
$Height = $_GET['h'];

$Image = imagecreate($Width, $Height);

imagecolorallocate($Image,mt_rand(75,195),mt_rand(75,195),mt_rand(75,195));
$color_black = imagecolorallocate($Image,255,255,255);
imagettftext($Image, 0.7*$_GET['w'], 0, mt_rand(0.15*$_GET['w'],0.25*$_GET['w']), mt_rand(0.8*$_GET['h'],0.96*$_GET['h']), $color_black, './KOMIKAX_.ttf', $_GET['l']);


header('Content-type: image/png');
imagepng($Image);
imagedestroy($Image);
?>