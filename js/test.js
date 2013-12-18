window.onload = function(){

	//get the master div vertically alligned on startup
	verticalcenter();

	//changes cursor to pointer on hover over login button
	$('#loginbutton').css('cursor', 'pointer');
	//show login tooltip when hover over loginbutton
	$("#loginbutton").hover(
			function(){$(".logintooltips").find("span").animate({opacity:'1'},600);},
			function(){$(".logintooltips").find("span").animate({opacity:'0'},600);}
	);

	$("#loginbutton").click(


			function someFunction2() {
			    $("#loginbutton").animate(
			        {rotation: 360},
			        { duration: 500,
			          step: function(now, fx) {
			          $(this).css({"transform": "rotate("+now+"deg)"});
			        }
			}}
			//function(){$("#loginbutton").animate({rotate: '+=+180deg'}, 0);}
	);

	// change cursor into pointer when mouse over any icons (help. signup & like)
	$('.icon').css('cursor', 'pointer');




	//show signup tooltip when hover over signup
	$("#signup").hover(
			function(){$(".signuptooltip").find("span").css("z-index", "999").animate({opacity:'1'},600);},
			function(){$(".signuptooltip").find("span").css("z-index", "0").animate({opacity:'0'},600);}
	);

	//show help tooltip when hover over signup
	$("#help").hover(
			function(){$(".helptooltip").find("span").css("z-index", "999").animate({opacity:'1'},600);},
			function(){$(".helptooltip").find("span").css("z-index", "0").animate({opacity:'0'},600);}
	);
	//show like tooltip when hover over signup
	$("#like").hover(
			function(){$(".liketooltip").find("span").css("z-index", "999").animate({opacity:'1'},600);},
			function(){$(".liketooltip").find("span").css("z-index", "0").animate({opacity:'0'},600);}
	);





};

//alligns vertically when window resized
$(window).resize(function() {
	verticalcenter();
});

//vertical allignment function
function verticalcenter(){
	var height = $(window).height();
	if(height>546){
		var top=(height-546)/2;
		$("#master").css("margin-top",top);
	}
	else{
		$("#master").css("margin-top","0px");
	}
}

