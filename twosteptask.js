var imgs = ["puppy.jpg", "turtle.jpg", "jag.jpg", "duckling.jpg", "volcano.jpg","lightning.jpg","castle.jpg","waterfall.jpg","sunset.jpg","barn.jpg","coffee.jpg","owl.jpg","wall.jpg","space_shuttle.jpg","lego.jpg","cat.jpg","banana.jpg","sushi.jpg","ramen.jpg","porkbuns.jpg","panda.jpg","dragonfruit.jpg","moon.jpg","goldengate.jpg","chess.jpg","monet.jpg","dali.jpg"];

var reward_prob = [0.5,0.5,0.5,0.5]

get_iti = function(){
	return 5000
}

respond = function(chosen_image){
	setTimeout(function(){$('.imgbox').hide()},500)
	
	var iti = get_iti()
	setTimeout(do_trial,iti)
}

first_level = function(){
	
	first_img = "url('media/" + imgs_block[l[0]] + "')" //0
	second_img = "url('media/" + imgs_block[l[1]] + "')" //1
	
	$('#img1').css("background-image",first_img).off("click").click(function(){
		setTimeout(second_level(0),500);}).show();
	$('#img2').css("background-image",second_img).off("click").click(function(){
		setTimeout(second_level(1),500);}).show();}

second_level = function(first_level_choice){
	
	transition = (Math.random()<0.8)==first_level_choice //should check this logic
	
	first_img = "url('media/" + imgs_block[l[2*transition]] + "')" //2 or 4
	second_img = "url('media/" + imgs_block[l[2*transition+1]] + "')" //3 or 5
	$('#img1').css("background-image",first_img).off("click").click(function(){
		setTimeout(respond(0),500);}).show();
	$('#img2').css("background-image",second_img).off("click").click(function(){
		setTimeout(respond(1),500);}).show();}
}

do_trial = function(){
	

	
}

$(document).ready( function(){
	currentview = new task();
});
