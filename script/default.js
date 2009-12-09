$(function(){
    unFocus.History.addEventListener('historyChange', historyListener);
    window.setTimeout(function(){
        historyListener(unFocus.History.getCurrent());
		$("#navbar").fadeIn(350);
    }, 350);

    $("#content div").hide();
    $("#navigation li a").mousedown(function(){
		$("#navbar").css("background", "#922");
	}).mouseup(function(){
		$("#navbar").css("background", "#999");
    }).click(function(){
		unFocus.History.addHistory($(this).attr("href").substring(1));
		$(this).blur();
		return false;
	}).hover(function(){
		$("#navbar").stop().animate({
			width: $(this).parent().width(),
			left: $(this).position().left+11
		}, {duration: 500, easing: "easeOutBack"});
	}, function(){
		navbarMoveActive();
	});
	
	$(".networks li").each(function(){
		$('<div class="networkfade" />').hide().prependTo(this);
	}).mouseenter(function(){
		$(this).css("background", "none");
	}).hover(function(){
		$(this).children("div").fadeIn(300);
		$("a img", this).animate({
			marginLeft: 10
		}, {duration: 350, easing: "easeOutCirc"});
	}, function(){
		$(this).children("div").fadeOut(150);
		$("a img", this).animate({
			marginLeft: 0
		}, {duration: 200, easing: "easeOutCirc"});
	});
	
	$(".tooltip").each(function(){
		$(this).tooltip($(this).children("ins").html(), {
			// width: "auto",
			mode: "bl"
		});
	});
	$("#ft-xhtml").tooltip('Valid XHTML 1.1', {
		width: "auto",
		mode: "tr"
	});
	$("#ft-css").tooltip('Valid CSS 3', {
		width: "auto",
		mode: "tr"
	});
	$("#ft-tvd").tooltip('Inspired by Tim van Damme <img src="files/emoticon_grin.png" />', {
		width: "auto",
		mode: "tr"
	});
	
});

var dTitle = document.title;

function navbarMoveActive() {
	$("#navbar").stop().animate({
		width: $(".active").width(),
		left: $(".active").position().left+11
	}, {duration: 500, easing: "easeOutBack"});
};

function historyListener (historyHash) {
	if(!historyHash) {
        historyHash = $("#navigation li:first a").attr("href").substring(1);
    } else if($("#" + historyHash).length != 1) {
        alert("Oops, it seems that there was a problem with your request...");
        history.go(-1);
        return;
    }
	document.title = dTitle+" - "+historyHash[0].toUpperCase()+historyHash.substring(1);
    $(".active").removeClass("active");
    $("#navigation li a[href=\"#" + historyHash+"\"]").parent().addClass("active");
	navbarMoveActive();
	$("#content").stop().css("height", $("#content").height());
    $("#content div").stop().fadeOut(800);
	$("#content").animate({
		height: $("#" + historyHash).height()+7
	}, {duration: 1000, easing: "easeInOutBack", complete: function(){
		$("#" + historyHash).fadeIn(500);
	}});
};
