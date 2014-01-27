/*function addContact(){
	//animation part
	var arrow = $('#addContactAnimation').find('#arrow');
	for (var i=0; i<5; i++){ 
		arrow.animate({left:'200px',opacity:'0'},300,'swing',function(){
			arrow.css('left','0px');
			arrow.css('opacity','1');
		});
	}
}
*/
function addContact(){
	//animation part
	var arrow = $('#addContactAnimation').find('#arrow');
	animate(5);
	function animate(times){
		if(times == 0){
			return;
		}
		arrow.css({left:'0px',opacity:'0'});
		//arrow.css('opacity','0');
		arrow.animate({left:'100px',opacity:'1'},300,'linear',function(){
			arrow.animate({left:'200px',opacity:'0'},300,'linear',function(){
				times--;
				animate(times);
			});
		});
	}

	
}