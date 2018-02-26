var imgs = ["puppy.jpg", "turtle.jpg", "jag.jpg", "duckling.jpg", "volcano.jpg","lightning.jpg","castle.jpg","waterfall.jpg","sunset.jpg","barn.jpg","coffee.jpg","owl.jpg","wall.jpg","space_shuttle.jpg","lego.jpg","cat.jpg","banana.jpg","sushi.jpg","ramen.jpg","porkbuns.jpg","panda.jpg","dragonfruit.jpg","moon.jpg","goldengate.jpg","chess.jpg","monet.jpg","dali.jpg"];

var reward_prob = [0.5,0.5,0.5,0.5]

get_iti = function(){
	return 5000
}

respond = function(chosen_image){
	
	var iti = get_iti()
	setTimeout(do_trial,iti)
}

do_trial = function(){

	$(/* first image*/).off("click").click(function(){respond(1);});	
	$(/* second image*/).off("click").click(function(){respond(2);});	
}

	
	
}

$(document).ready( function(){
	currentview = new task();
});
