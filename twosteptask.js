var all_imgs = ["puppy.jpg", "turtle.jpg", "jag.jpg", "duckling.jpg", "volcano.jpg","lightning.jpg","castle.jpg","waterfall.jpg","sunset.jpg","barn.jpg","coffee.jpg","owl.jpg","wall.jpg","space_shuttle.jpg","lego.jpg","cat.jpg","banana.jpg","sushi.jpg","ramen.jpg","porkbuns.jpg","panda.jpg","dragonfruit.jpg","moon.jpg","goldengate.jpg","chess.jpg","monet.jpg","dali.jpg"];

var img_list
var reward_prob = [0.5,0.5,0.5,0.5]
var trans_prob = 0.7
var sigma = 0.025
var upper = 0.75
var lower = 0.25
var total_reward
var data
var trials_completed

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
	return 1000
}

respond = function(n){
	var iti = get_iti()
	console.log('respond')
	reward = Math.random()<reward_prob[n]
	total_reward += reward
	console.log('reward:',reward)
	console.log(n,reward_prob)
	data[trials_completed]["second_level_choice"]=n
	data[trials_completed]["reward_prob"]=reward_prob.slice()
	data[trials_completed]["reward"]=reward
	trials_completed++
	$('#feedback').text((reward ? "You received 1 point" : "No reward") + 
	", total reward: " + total_reward.toString());	
	setTimeout(function(){
		update_rewards()
		$('#feedback').text("");
		do_trial()
	},iti)
}

first_level = function(){
	console.log('first level')
	first_img = "url('media/" + img_list[0] + "')" //0
	second_img = "url('media/" + img_list[1] + "')" //1
	
$('#img1').css({"background-image" : first_img, "cursor" : "pointer"}).off("click").click(function(){
		$('#img2').hide()
		setTimeout(function(){second_level(0)},500)
		$('.imgbox').css("cursor","default")
	}).show();
	$('#img2').css({"background-image" : second_img, "cursor" : "pointer"}).off("click").click(function(){
		$('#img1').hide()
		setTimeout(function(){second_level(1)},500)
		$('.imgbox').css("cursor","default")
	}).show();}

second_level = function(first_level_choice){
	data[trials_completed]={"first_level_choice" : first_level_choice}
	console.log('second level')
	transition = ((Math.random()<trans_prob)==first_level_choice) //should check this logic
	first_img = "url('media/" + img_list[2*transition+2] + "')" //2 or 4
	second_img = "url('media/" + img_list[2*transition+3] + "')" //3 or 5
	$('#img1').css({"background-image" : first_img, "cursor" : "pointer"}).off("click").click(function(){
		$('#img2').hide()
		setTimeout(function(){respond(2*transition)},500)
		$('.imgbox').css("cursor","default")
	}).show();
	$('#img2').css({"background-image" : second_img, "cursor" : "pointer"}).off("click").click(function(){
		$('#img1').hide()
		setTimeout(function(){respond(2*transition+1)},500)
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
	console.log('updating')
	for (var i=0; i<4; i++) {
		reward_prob[i] += sigma*randn_bm();
		reward_prob[i] = Math.min(Math.max(reward_prob[i],lower),upper);
	}
}

function save(filename){
    var blob = new Blob([JSON.stringify(data)], {type: 'text/csv'});
	var elem = window.document.createElement('a');
	elem.href = window.URL.createObjectURL(blob);
	elem.download = filename;        
	document.body.appendChild(elem);
	elem.click();
	document.body.removeChild(elem);
}

do_inst = function() {
	$(".overlayed").show();
	$('.instructions').show();
	
	for (var i=1; i<=6; i++) {
		$('#inst'+i.toString()).css({"background-image" : "url('media/" + img_list[i-1] + "')"})
	}
	
	$('.mybutton').click(function(){
		$('.instructions').hide();
		$(".overlayed").hide();
		do_trial();
	});
}

$(document).ready( function(){
	set_img_list()
	total_reward = 0
	trials_completed = 0
	console.log('loading page')
	do_inst()
	data = []
	window.onbeforeunload = function(e) {
		save('Twostepdata' + Date.now().toString() + '.txt');	
	};
});


