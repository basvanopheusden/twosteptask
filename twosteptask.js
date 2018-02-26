var all_imgs = ["puppy.jpg", "turtle.jpg", "jag.jpg", "duckling.jpg", "volcano.jpg","lightning.jpg","castle.jpg","waterfall.jpg","sunset.jpg","barn.jpg","coffee.jpg","owl.jpg","wall.jpg","space_shuttle.jpg","lego.jpg","cat.jpg","banana.jpg","sushi.jpg","ramen.jpg","porkbuns.jpg","panda.jpg","dragonfruit.jpg","moon.jpg","goldengate.jpg","chess.jpg","monet.jpg","dali.jpg"];

var img_list
var reward_prob = [0.5,0.5,0.5,0.5]
var trans_prob = 0.7

function shuffle(array){
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex){
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

set_img_list = function(){
	img_list = shuffle(all_imgs).slice(0,6);
}

get_iti = function(){
	return 5000
}

respond = function(chosen_image){
	setTimeout(function(){$('.imgbox').hide()},500)
	
	update_rewards
	var iti = get_iti()
	setTimeout(do_trial,iti)
}

first_level = function(){
	console.log('first level')
	first_img = "url('media/" + img_list[0] + "')" //0
	second_img = "url('media/" + img_list[1] + "')" //1
	
	$('#img1').css("background-image",first_img).off("click").click(function(){
		setTimeout(second_level(0),10000);}).show();
	$('#img2').css("background-image",second_img).off("click").click(function(){
		setTimeout(second_level(1),10000);}).show();
}

second_level = function(first_level_choice){
	console.log('second level')
	transition = ((Math.random()<trans_prob)==first_level_choice)+1 //should check this logic
	first_img = "url('media/" + img_list[2*transition] + "')" //2 or 4
	second_img = "url('media/" + img_list[2*transition+1] + "')" //3 or 5
	$('#img1').css("background-image",first_img).off("click").click(function(){
		setTimeout(respond(0),10000);}).show();
	$('#img2').css("background-image",second_img).off("click").click(function(){
		setTimeout(respond(1),10000);}).show();
}

do_trial = function(){
	first_level()
}


// Standard Normal variate using Box-Muller transform.
randn_bm = function(sigma) {
    var mu = 0;
    while(mu === 0) mu = Math.random(); //Converting [0,1) to (0,1)
    while(sigma === 0) sigma = Math.random();
    return Math.sqrt( -2.0 * Math.log( mu ) ) * Math.cos( 2.0 * Math.PI * sigma );
}

// update rewards!
update_rewards = function(sigma){
	for (var i=0; i<5; i++) {
		reward_prob[i] += randn_bm(sigma);
	}
}

$(document).ready( function(){
	set_img_list()
	console.log('loading page')
	do_trial()
});
