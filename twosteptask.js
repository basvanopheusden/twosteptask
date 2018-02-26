var all_imgs = ["puppy.jpg", "turtle.jpg", "jag.jpg", "duckling.jpg", "volcano.jpg","lightning.jpg","castle.jpg","waterfall.jpg","sunset.jpg","barn.jpg","coffee.jpg","owl.jpg","wall.jpg","space_shuttle.jpg","lego.jpg","cat.jpg","banana.jpg","sushi.jpg","ramen.jpg","porkbuns.jpg","panda.jpg","dragonfruit.jpg","moon.jpg","goldengate.jpg","chess.jpg","monet.jpg","dali.jpg"];

var img_list
var reward_prob = [0.5,0.5,0.5,0.5]
var trans_prob = 0.7
var sigma = 0.025;

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
	$('.imgbox').css("cursor","default")
	setTimeout(function(){$('.imgbox').hide()},500)
	console.log('respond')
	update_rewards()
	$('#feedback').text(reward_prob.toString());
	var iti = get_iti()
	setTimeout(do_trial,iti)
}

first_level = function(){
	console.log('first level')
	first_img = "url('media/" + img_list[0] + "')" //0
	second_img = "url('media/" + img_list[1] + "')" //1
	
$('#img1').css({"background-image" : first_img, "cursor" : "pointer"}).off("click").click(function(){
		setTimeout(function(){second_level(0)},1000)
		$('.imgbox').css("cursor","default")
	}).show();
	$('#img2').css({"background-image" : second_img, "cursor" : "pointer"}).off("click").click(function(){
		setTimeout(function(){second_level(0)},1000)
		$('.imgbox').css("cursor","default")
	}).show();}

second_level = function(first_level_choice){
	console.log('second level')
	transition = ((Math.random()<trans_prob)==first_level_choice)+1 //should check this logic
	first_img = "url('media/" + img_list[2*transition] + "')" //2 or 4
	second_img = "url('media/" + img_list[2*transition+1] + "')" //3 or 5
	$('#img1').css({"background-image" : first_img, "cursor" : "pointer"}).off("click").click(function(){
		setTimeout(function(){respond(0)},1000)
		$('.imgbox').css("cursor","default")
	}).show();
	$('#img2').css({"background-image" : second_img, "cursor" : "pointer"}).off("click").click(function(){
		setTimeout(function(){respond(0)},1000)
		$('.imgbox').css("cursor","default")
	}).show();
}

do_trial = function(){
	first_level()
}


// Standard Normal variate using Box-Muller transform.
randn_bm = function(sigma) {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

// update rewards!
update_rewards = function() {
	for (var i=0; i<4; i++) {
		reward_prob[i] += sigma*randn_bm();
	}
}

$(document).ready( function(){
	set_img_list()
	console.log('loading page')
	do_trial()
});
