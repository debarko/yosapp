function maximize(html_val){
	$('#header').animate({height:"0px"},500,"linear",function(){
		$('#header').css("display","none");
	});
	$('#footer').animate({height:"0px"},500,"linear",function(){
		$('#footer').css("display","none");
	});
	$('#bodybg').animate({height:"100%"},500);
	$('#bodybg').fadeOut(500, function(){
		$('#bodybg').html(html_val);
		$('#bodybg').fadeIn(400);
	});
}