$(function(){
	unFocus.History.addEventListener('historyChange', historyListener);
    window.setTimeout(function(){
		historyListener(unFocus.History.getCurrent());
    }, 350);

    $("#content div").hide();
    $("#navigation li a").mousedown(function(){
		$("#navbar").css("background", "#922");
	}).mouseup(function(){
		$("#navbar").css("background", "#999");
    }).click(function(){
		unFocus.History.addHistory($(this).attr("href").substring(1));
		$(this).blur();
		// return false;
	}).hover(function(){
		$("#navbar").stop().animate({
			width: $(this).parent().width()+"px",
			left: ($(this).position().left+11)+"px"
		}, 500);
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
			marginLeft: "10px"
		}, 350);
	}, function(){
		$(this).children("div").fadeOut(150);
		$("a img", this).animate({
			marginLeft: "0px"
		}, 200);
	});
});

var dTitle = document.title;

function navbarMoveActive() {
	$("#navbar").stop().animate({
		width: $(".active").width()+"px",
		left: ($(".active").position().left+11)+"px"
	}, 500);
};

function historyListener (historyHash) {
	if(!historyHash) {
        historyHash = $("#navigation li:first a").attr("href").substring(1);
    } else if($("#" + historyHash).length != 1) {
        alert("Oops, it seems that there was a problem with your request...");
        history.go(-1);
        return;
    }
	document.title = dTitle+" - "+historyHash.substring(0,1).toUpperCase()+historyHash.substring(1);
    $(".active").removeClass("active");
    $("#navigation li a[href=\"#" + historyHash+"\"]").parent().addClass("active");
	navbarMoveActive();
	$("#content").stop().css("height", $("#content").height()+"px");
    $("#content div").stop().fadeOut(800);
	$("#content").animate({
		height: ($("#" + historyHash).height()+7)+"px"
	}, 800, function(){
		$("#" + historyHash).fadeIn(500);
	});
};
