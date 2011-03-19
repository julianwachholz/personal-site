/*!
 * HTML5 Slides JavaScript
 * compatible with Firefox 3.6.*
 * (c) 2010 Julian Wachholz
 */

var yt_player_id = null;

window.onload = function(){
	var slides = $("section"),
		current = slides.first(),
		slideID = 0, proceed = true,
		subSlide = null,
		keyProtect = false,
		deleteOnNext = null,
		delay = 0;

	$("div.img").css("backgroundImage", function(i,v){
		return "url(img/"+(i+1)+".png)";
	});

	$(document).bind("keypress", function(e){
		if(e.charCode !== 32) return;

		$("#slide-box").animate({
			opacity: 1
		}, 1500);

		current.animate({
			opacity: 1
		}, 1500);

		$(document).unbind("keypress").bind("keypress", function(e){
			e.preventDefault();
			if(e.charCode == 32 && keyProtect === false) {
				switch(current.attr("id")) {
					/**
					 * FIRST SLIDE
					 */
					case "slide-0":
						current
							.find("h1,h2,hr")
							.animate({
								textIndent: 25,
								opacity: 0
							}, 750, function(){
								if(slideID !== 0) return;
								current
									.animate({
										opacity: 0
									}, 750);
								current = current
									.next()
									.delay(250)
									.animate({
										opacity: 1
									}, 750);
								slideID++;
							});
						break;

					/**
					 * DEFAULT TRANSITION
					 */
					default:
						subSlide = current.find("li:not(.shown),p:not(.shown),.show:not(.shown)");

						if(subSlide.size() >= 1) {
							if(subSlide.first().is("#yt1")) {
								deleteOnNext = subSlide.first().html('<object width= "425" height="344"><embed src="http://www.youtube.com/v/yk77VrkxL88&disablekb=1&border=0&fs=0&showsearch=0&showinfo=0&color2=0xf1f1f1&autoplay=1" width="425" height="344"></embed></object>');
							}
							if(subSlide.first().hasClass("joke")) {
								delay = 400;
								subSlide.siblings(".hide").fadeOut(400, function(){
									subSlide.parent().addClass("nobull");
								});
							}
							subSlide.first().delay(delay).animate({
								paddingTop: 0,	// only for LIs
								opacity: 1
							}, 600).addClass("shown");
							delay = 0;
							proceed = false;
						} else {
							proceed = true;
						}

						if(proceed) {
							if(deleteOnNext !== null) {
								$(deleteOnNext).html("");
								deleteOnNext = null;
							}

							current.find("h1").animate({
								textIndent: 25,
								opacity: 0
							}, 750, function(){
								if(slideID+2 == slides.size()) {
									/**
									 * LAST SLIDE
									 */
									$(document).unbind("keypress");
									current
										.parent()
										.animate({
											opacity: 0
										}, 750, function(){
											$("section#last")
												.delay(500)
												.animate({
													opacity: 1
												}, 750);
										});
									slideID = -1;
								} else {
									current = current
										.animate({
											opacity: 0
										}, 750)
										.delay(1000)
										.next()
										.animate({
											opacity: 1
										}, 750);
									slideID++;
								}
							});
						}
						break;
				}

				keyProtect = true;

				setTimeout(function(){
					keyProtect = false;
				}, 100);
			}

		});
	});

};

function onYouTubePlayerReady(id) {
	alert("ok");
	yt_player_id = id;
};