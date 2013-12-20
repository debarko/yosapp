function maximize(){
	$('#header').animate({height:"0px"},200,"linear",function(){
		$('#header').css("display","none");
	});
	$('#footer').animate({height:"0px"},200,"linear",function(){
		$('#footer').css("display","none");
	});
}