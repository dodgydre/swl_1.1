//init
var shouldbehash = "",
    ww = $(window).width(),   // window width
    wh = $(window).height(),  // window height
    headerheight = 60,        // header height
    footerheight = 70,        // footer height
    iah = wh - headerheight - footerheight, // image height
    siteratio = ww/iah, // site (image) ratio  -> width / image height
    minww = 1024,       // minimum width
    minwh = 500,        // minimum height
    infoh = "",          // ?
    justclose_role = false,   // ?
    justclose_row = false,    // ?
    scrollback = 0,           // ?
    projrows = 3,             // number of project rows
    projscrolling = false,    // project scrolling
    scrollapi,
    thumbswrapw,
    hrefbits = window.location.pathname.substr(1).split("/"),  // extract the parts of the href
    easing = 'swing',  // type of jquery animation (jquery easing)
    speed = 400,
    gutter = 150,
    currenturl = window.location.pathname,
    openRows = new Array();

// *********************************************************
// Analyse the href and look for people, news, etc.
// *********************************************************
if (hrefbits[0] == "people" && hrefbits[2] != ""){
	var itemexpanded = true;
} else if (hrefbits[0] == "news" && hrefbits[1] != ""){
	var itemexpanded = true;
} else {
	var itemexpanded = false;
}

// *********************************************************
// Set the current page url
// *********************************************************

function getPage(href,push){
	if (href[0] != "/"){href = "/"+href;}
	if (currenturl[0] != "/") {currenturl = "/"+currenturl;}

	var l =  href.split("/");
	var cl = currenturl.split("/");

	if (href != currenturl){
		if (l[1] == "people"){
			if (l[4]){
				toggleAccordion(href);
			} else if (l[3]){
				togglePeople(href);
			} else if (l[2]){
				getPeopleLocation(href);
			} else {
				getPeopleIntro(href);
			}
		} else if (l[1] == "news"){
			toggleAccordion(href);
		} else if (l[1] == "credits" || l[1] == "contact" || l[1] == "recruitment" || l[1] == "faq"){
			toggleAccordion(href);
		} else if (l[1] == "project" || l[1] == "publication"){
			goToProject(href)
		}
		currenturl = href;
	}
}



function showNewsYear(year){
	var tyi = $(".yearwrap.y_"+year);
	$(".yearwrap").not(tyi).animate({ height: 'toggle', opacity: 'toggle' }, 300);
	tyi.animate({ height: 'toggle', opacity: 'toggle' }, 300);
	tnl = $(".fltr.l_"+year).addClass("selected");
	$(".fltr").not(tnl).removeClass("selected");
	resizeSite();
}


function scrollToSection(section){
	var sd = $(".rowcont.s_"+section);
	if (sd.length > 0){
		var sdt = sd.offset().top;
		var adj = (sd.index() == 0) ? 0 : 90;
		$('html, body').animate({scrollTop: sdt-83+adj}, 400);
		tnl = $(".scrl.s_"+section).addClass("selected");
		$(".scrl").not(tnl).removeClass("selected");
	}
}


// Accordion - slider?
function toggleAccordion(href){
	var thistitle = $("a.ptitle[href='"+href+"']");
	var thiscontent = thistitle.nextAll(".expandable");
	var thisrow = thistitle.closest(".inforow");
	if (thiscontent.is(":visible")){
		thisrow.find(".expandable").slideUp(200);
		thistitle.removeClass("selected");
	} else {
		//thistitle.closest(".rowcont").removeClass("notsel");
		thistitle.addClass("selected");
		thisrow.find(".expandable").slideDown(200);
	}
}


// PEOPLE - SLIDE UP AND DOWN

function togglePeople(href){
	var thislink = $(".roleslist a[href='"+href+"']");
	$(".roleslist a").not(thislink).removeClass("selected");
	thislink.addClass("selected");
	var roleurl = thislink.classData("r");
	var rowcont = $(".rowcont.r_"+roleurl);
	$(".rowcont").not(rowcont).slideUp(200);
	rowcont.slideDown(200);
	resizeSite();
}


function getPeopleLocation(href){
	var link = $("#loclist li a[href='"+href+"']");
	if (link.length < 1){
		var link = $("#introppl li a[href='"+href+"']");
		var links = $("#introppl li a");
		$("#loclist li a").removeClass("selected");
	} else {
		var links = $("#loclist li a");
		$("#introppl li a").removeClass("selected");
	}
	links.removeClass("selected");

	var locurl = link.classData("l");
	var roleslist = $(".roleslist.l_"+locurl);
	$(".roleslist").not(roleslist).hide();
	roleslist.css("display","inline");
	var firstrole = roleslist.find("li a").first()
	$(".roleslist a").not(firstrole).removeClass("selected");
	firstrole.addClass("selected");
	link.addClass("selected");
	links.not(link).removeClass("selected");
	$.ajax({
		cache: false,
		type: "GET",
		url: "/inc/peopleright.php",
		dataType: "html",
		data: "x=1&href="+href,
		success: function(resultdata) {
			$("#pplloc").hide().html(resultdata);
			$("#pplloc").show();
			resizeSite();
		}
	});
}



function getPeopleIntro(href){
	var link = $("#introppl li a[href='"+href+"']");
	link.addClass("selected");
	$("#introppl li a").not(link).removeClass("selected");
	$(".roleslist").hide();
	$("#loclist li a").removeClass("selected");
	$.ajax({
		cache: false,
		type: "GET",
		url: "/inc/peopleright.php",
		dataType: "html",
		data: "x=1&href="+href,
		success: function(resultdata) {
			$("#pplloc").hide().html(resultdata);
			$("#pplloc").show();
			resizeSite();
		}
	});
}


/**************************************************************************
/**************************************************************************
/**************************************************************************
/**************************************************************************
/**************************************************************************
/**************************************************************************
/*************************************************************************/

/* !DOCUMENT READY */
$(document).ready(function(){
	$(".nd,.hidden").hide();
	if (!isTouch){
		$(".hh").hide();
	}


	resizeSite();
	$(window).resize(resizeSite);


	hideHeadline($("#bgimage .headline").first());


	/* 	!PEOPLE SUBNAVIGATION */
	$("#introppl li a, #loclist li a, .roleslist li a, ").live("click",function(e){
		e.preventDefault();
		var thislink = $(this);
		var href = thislink.attr("href");
		History.pushState(null, null, href);
	});

	$("a.ptitle").live("click",function(e){
		e.preventDefault();
		var thislink = $(this);
		var thisrowscont = thislink.closest(".rowcont");
		var thisrow = thislink.closest(".inforow");
		var href = thislink.attr("href");
		var thiscontent = thislink.next(".expandable");


		if (thiscontent.is(":visible")){


			var thishrefl = href.substr(1).split("/");

			if ($("#peoplecont").length > 0){
				var href = "/"+thishrefl[0]+"/"+thishrefl[1]+"/"+thishrefl[2];
			} else {
				var href = "/"+thishrefl[0];
			}
			thisrow.find(".expandable").slideUp(200);
			thislink.removeClass("selected");
			if (thisrowscont.find("a.ptitle.selected").length < 1 && $("#newscont").length < 1){
				thisrowscont.addClass("notsel");
			}
			justclose_row = true;
		} else {
			openRows.push(href);
		}

		/* document.title = openRows; */
		History.pushState(null, null, href);
	});


	$("a.blank").attr("target","_blank");


	// TODO: Get this?
	var History = window.History;
	if (History.enabled) {
		History.Adapter.bind(window,'statechange',function(){
			var State = History.getState();
			var url = document.createElement('a');
			url.href = State.url;
			getPage(url.pathname,false);
		});
		var hash = window.location.hash;
		if(hash){
			History.Adapter.trigger(window, 'statechange')
		}
	}


	if(!$.browser.msie){
		if ($("#bgimage").length > 0){
			$("#bgimage img").hide();
			$("#bgimage img").first().load(function(){
				$(this).fadeIn(400);
			});
		}
	}



	$("a.blank").attr("target","_blank");


  // Scrolling arrows between projects for the projects index
	//!PROJECTS INDEX SCROLLING
	if ($("#projects").length > 0){
		var uparrow = $(".smlarrw.u");
		var downarrow = $(".smlarrw.d");
	    $(window).scroll(function () {
		    if($(window).scrollTop() > 0){
		        //uparrow.css("opacity",1);
		        uparrow.removeClass("disabled");
		    } else {
			    //uparrow.css("opacity",0);
		        uparrow.addClass("disabled");
		    }
		    if($(window).scrollTop() + $(window).height() >= $(document).height()) {
		       //downarrow.css("opacity",0);
		       downarrow.addClass("disabled");
			} else {
				//downarrow.css("opacity",1);
				downarrow.removeClass("disabled");
			}
		});
	}




	/* !READER */
	$(".reader").live("click",function(){
		var id = $(this).classData("id");
		var t = $(this).classData("t");
		showReader(id,t);
		return false;
	});
	$("#reader").click(function(event){
		event.stopPropagation();
	});





	$(".keyboard").hover(function(){
		$(".slide").stop().animate({opacity:0.4},100);
		$("#footer,#belowfooter").children().stop().animate({opacity:0.4},100);
		$(".arrw").css("background","transparent").stop().animate({opacity:1},100);
		if ($("#footer").hasClass("expanded")){
			$("#footer").stop().animate({height:24},{duration: 200, easing: 'jswing'});
			$("#belowfooter").stop().animate({marginTop:0},{duration: 200, easing: 'jswing'});
			$("#footer").removeClass("expanded");
		}
	},function(){
		$(".slide").stop().animate({opacity:1},100);
		$("#footer,#belowfooter").children().stop().animate({opacity:1},100);
		$(".arrw").stop().animate({opacity:0},100,function(){
			$(this).css("background","white");
		});
	});


	$(".bex").live("click",function(e){
		e.preventDefault();
		var tl = $(this)
		var inforow = tl.parent().parent();
		var toshow = inforow.find(".bexable");
		if (toshow.is(":visible")){
			$(toshow).slideUp(200);
			tl.removeClass("active");
			inforow.removeClass("selected");
		} else {
			$(toshow).slideDown(200);
			tl.addClass("active");
			inforow.addClass("selected");
		}
	});





	/* 	!FOOTER EXPAND/COLLAPSE */
	$(".expand").live("click",function(){
		var thislink = $(this);
		if ($("#footer").hasClass("expanded")){
			$("#footer").stop().animate({height:43},{duration: 200, easing: 'jswing'});
			$("#belowfooter").stop().animate({marginTop:0},{duration: 200, easing: 'jswing'});
			$("#footer").removeClass("expanded");
			thislink.find("span").text("Read more");
			if (isTouch){
				$("#belowfooter").css("position","fixed");
			}
		} else {
			adjustFooterHeight();
			if (isTouch){
				$("#belowfooter").css("position","absolute");
			}
			$("#footer").addClass("expanded");
			thislink.find("span").text("Hide text");
		}
		return false;
	});



	//!Biblio  Sorting
	$(".sortb").live("click", function(e) {
		e.preventDefault();
		var	thislink = $(this);
		var sb = thislink.classData("sb");
		var tt = thislink.closest(".rowcont");
		if (thislink.hasClass("desc")){
			var desc = true;
			thislink.removeClass("desc");
		} else {
			var desc = false;
			thislink.addClass("desc");
		}
		tt.find(".sortb").not(thislink).not(".descdef").removeClass("desc");
		tt.find(".inforow").not('.head').sortElements( function(a, b) {
			if (desc) {
				return $(a).classData(sb) < $(b).classData(sb) ? 1 : -1;
			} else {
				return $(a).classData(sb) > $(b).classData(sb) ? 1 : -1;
			}
		});
	});




	//!Project table Sorting
	$(".sort").live("click", function(e) {
		e.preventDefault();
		var	thislink = $(this),
			sb = thislink.classData("sb");
			if (thislink.hasClass("desc")){
				var desc = true;
				thislink.removeClass("desc");
			} else {
				var desc = false;
				thislink.addClass("desc");
			}
			$(".sort").not(thislink).not(".descdef").removeClass("desc");
			$("#projtable tr").not('.head').sortElements( function(a, b) {
				if (desc) {
					return $(a).classData(sb) < $(b).classData(sb) ? 1 : -1;
				} else {
					return $(a).classData(sb) > $(b).classData(sb) ? 1 : -1;
				}
			});
	});




	/* 	!HOMEPAGE SLIDERS */
  // NOTE: NEed this?
	$("#bgimage.news .arrw").click(function(e){
		var speed = 700;
		var gutter = 150;
		var thislink = $(this);
		var easing = 'easeInOutQuint';
		if ($(this).hasClass("l")){
			var direction = "l";
		} else if ($(this).hasClass("r")){
			var direction = "r";
		}
		var thisslideshow = $("#bgimage");
		var current = $(".slideshow .slide:visible");
		if (current.hasClass("video")){
			var iframe = current.find('iframe')[0];
			var player = $f(iframe);
			player.api('pause');
		}

		if (direction == "l"){
			if (current.prevAll(".slide").first().length > 0){
				var slidetoshow = current.prevAll(".slide").first();
			} else {
				var slidetoshow = $(".slideshow .slide").eq($(".slideshow .slide").length-1);
			}
     /*
			if (slidetoshow.hasClass('first')){
				$(".l").hide();
			} else {
				$(".l").show();
			}
     */
			$(".r").show();
			if (thisslideshow.hasClass("fading")){
				current.fadeOut(200);
				slidetoshow.fadeIn(300);
			} else if (thisslideshow.hasClass("sliding")){
				if (current.length > 0){
					var cl = current.offset().left;
				} else {
					var cl = 0;
				}
				current.stop().animate({left:cl+ww+gutter},{duration: speed, easing: easing}).hide(0).css("left",cl+"px");
				if (current.hasClass("hasheadline")){
					var hl = current.classData("hl");
					$(".headline_"+hl).stop().animate({left:cl+ww+gutter},{duration: speed, easing: easing}).hide(0).css("left",cl+"px");
					//current.removeClass("hasheadline");
				}

				var imgDim = imgResize(slidetoshow,ww,wh,"array",0,130,0,0);
				slidetoshow.css("left",(imgDim[2]-ww-gutter)+"px").show(0).stop().animate({left:imgDim[2]},{duration: speed, easing: easing});
				if (slidetoshow.hasClass("hasheadline")){
					var hlts = slidetoshow.classData("hl");
					var headlinets = $(".headline_"+hlts);
					headlinets.css("left",(-ww-gutter)+"px").show(0).stop().animate({left:0},{duration: speed, easing: easing});
					hideHeadline(headlinets);
				}
			}
		} else if (direction == "r"){
			if (current.nextAll(".slide").first().length > 0){
				var slidetoshow = current.nextAll(".slide").first();
			} else {
				var slidetoshow = $(".slideshow .slide:first-child");
			}
  /*
			if (slidetoshow.hasClass('last')){
				$(".r").hide();
			} else {
				$(".r").show();
			}
  */
			$(".l").show();
			if (thisslideshow.hasClass("fading")){
				current.fadeOut(200);
				slidetoshow.fadeIn(300);
			} else if (thisslideshow.hasClass("sliding")){
				if (current.length > 0){
					var cl = current.offset().left;
				} else {
					var cl = 0;
				}
				current.stop().animate({left:-(ww+gutter)},{duration: speed, easing: easing}).hide(0).css("left",cl+"px");
				if (current.hasClass("hasheadline")){
					var hl = current.classData("hl");
					$(".headline_"+hl).animate({left:-(ww+gutter)},{duration: speed, easing: easing}).hide(0).css("left",0+"px");
				}
				var imgDim = imgResize(slidetoshow,ww,wh,"array",0,130,0,0);
				slidetoshow.css("left",(imgDim[2]+ww+gutter)+"px").show(0).stop().animate({left:imgDim[2]},{duration: speed, easing: easing});
				if (slidetoshow.hasClass("hasheadline")){
					var hlts = slidetoshow.classData("hl");
					var headlinets = $(".headline_"+hlts);
					headlinets.css("left",(ww+gutter)+"px").show(0).stop().animate({left:0},{duration: speed, easing: easing});
					hideHeadline(headlinets);
				}

			}
		}
		if (slidetoshow.hasClass("video")){
			$(".arrw.l, .arrw.r").height(iah/1.5);
		} else {
			$(".arrw.l, .arrw.r").height(iah);
		}
		$("#footer").html(slidetoshow.next(".ftr").html());
		$("#belowfooter .ml").html(slidetoshow.nextAll(".blwftr").html());
		if ($("#footer").hasClass("expanded")){
			$("#footer").stop().animate({height:43},{duration: 200, easing: 'jswing'});
			$("#belowfooter").stop().animate({marginTop:0},{duration: 200, easing: 'jswing'});
			$("#footer").removeClass("expanded");
			thislink.find("span").text("Read more");
			if (isTouch){
				$("#belowfooter").css("position","fixed");
			}
		}
		$(".arrw.l, .arrw.r").css("z-index",11);
		return false;
	});



	$(".fltr").click(function(e){
		e.preventDefault();
		tl = $(this);
		justclose_row = false;
		var href = tl.attr("href");
		History.pushState(null, null, href);
	});

	$(".scrl").click(function(e){
		e.preventDefault();
		tl = $(this);
		var section = tl.classData("s");
		scrollToSection(section);
	});



	/* 	ARROW HINTS */
	$(".smlarrw").hover(function(){
		var thislink = $(this);
		if (!thislink.hasClass("disabled")){
			var hint = thislink.text();
			$("li.hint").html(hint);
		}
	}, function(){
		var thislink = $(this);
		if (!thislink.hasClass("disabled")){
			$("li.hint").html("&nbsp;");
		}
	});


	$(".smlarrw").click(function(e){
		e.preventDefault();
		var thislink = $(this);

		if (thislink.hasClass("projlist")){
			if (thislink.hasClass("d")){
				var scroll = $(document).scrollTop() - $(document).scrollTop()%270 + 270;
			} else if (thislink.hasClass("u")){
				var scroll = $(document).scrollTop() - $(document).scrollTop()%270 - 270;
			}
			$("html, body").animate({ scrollTop: scroll }, 300);

		} else {
			if (thislink.hasClass("l")){
				var bigarrw = $(".arrw.l");
			} else if (thislink.hasClass("r")){
				var bigarrw = $(".arrw.r");
			} else if (thislink.hasClass("d")){
				var bigarrw = $(".arrw.d");
			} else if (thislink.hasClass("u")){
				var bigarrw = $(".arrw.u");
			}
			if (bigarrw.hasClass("fxd")){
				bigarrw.mousedown();
			} else {
				bigarrw.click();
			}
		}

	});

	// Arrow hints
	$(".arrw").hover(function(){
		var thislink = $(this);
		if (thislink.hasClass("l")){
			var smlarrw = $(".smlarrw.l");
		} else if (thislink.hasClass("r")){
			var smlarrw = $(".smlarrw.r");
		} else if (thislink.hasClass("d")){
			var smlarrw = $(".smlarrw.d");
		} else if (thislink.hasClass("u")){
			var smlarrw = $(".smlarrw.u");
		}
		var hint = smlarrw.text();
		$("li.hint").html(hint);
		smlarrw.addClass("sel");

	}, function(){
		$(".smlarrw").removeClass("sel");
		$("li.hint").html("&nbsp;");
	});





	/* 	!PROJECT SLIDERS */

	$("#bgimage.project .arrw").click(function(){
		destroyReader();
		var thislink = $(this);

		if ($(this).hasClass("l")){
			var direction = "l";
		} else if ($(this).hasClass("r")){
			var direction = "r";
		} else if ($(this).hasClass("u")){
			var direction = "u";
		} else if ($(this).hasClass("d")){
			var direction = "d";
		}
		resizeSite();




		var thisslideshow = $("#bgimage");
		var thisproject = $(".proj.active");
		var current = $(".proj.active .slide:visible");
		if (direction == "l"){
			if (thisproject.find(".slide").length > 1){
				if (current.prevAll(".proj.active .slide").first().length > 0){
					var slidetoshow = current.prevAll(".proj.active .slide").first();
				} else {
					var slidetoshow = $(".proj.active .slide").eq($(".proj.active .slide").length-1);
				}
				if (thisslideshow.hasClass("fading")){
					current.fadeOut(200);
					slidetoshow.fadeIn(300);
				} else if (thisslideshow.hasClass("sliding")){
					var imgDim = imgResize(slidetoshow,ww,wh,"array",0,130,0,0);
					var cl = current.offset().left;
					var ncl = cl+ww+gutter;
					var nnl = (imgDim[2]-ww-gutter);
					current.stop().animate({left:ncl},{duration: speed, easing: easing}).hide(0).css("left",cl+"px");
					slidetoshow.css("left",nnl+"px").show(0).stop().animate({left:imgDim[2]},{duration: speed, easing: easing});
				}
				var captiontext = slidetoshow.next("span").html();
				$("#footer .imgcap").html(captiontext);
				if (slidetoshow.hasClass("video")){
					$(".arrw.l, .arrw.r").height(iah/2);
					$(".arrw.d").hide();
				} else {
					$(".arrw.l, .arrw.r").height(iah);
					$(".arrw.d").show();
				}

				$("#footer .ic").text(slidetoshow.index(".proj.active .slide")+1);
			}
		}
    else if (direction == "r"){
			if (thisproject.find(".slide").length > 1){
				if (current.nextAll(".proj.active .slide").first().length > 0){
					var slidetoshow = current.nextAll(".proj.active .slide").first();
				} else {
					var slidetoshow = $(".proj.active .slide:first-child");
				}
				if (thisslideshow.hasClass("fading")){
					current.fadeOut(200);
					slidetoshow.fadeIn(300);
				} else if (thisslideshow.hasClass("sliding")){
					//var imgDim = getImgDimensions(slidetoshow);
					var imgDim = imgResize(slidetoshow,ww,wh,"array",0,130,0,0);
					var ncl = -(ww+gutter);
					var nnl = (imgDim[2]+ww+gutter);
					var cl = current.offset().left;
					current.stop().animate({left:ncl},{duration: speed, easing: easing}).hide(0).css("left",cl+"px");
					slidetoshow.css("left",nnl+"px").show(0).stop().animate({left:imgDim[2]},{duration: speed, easing: easing});
				}
				var captiontext = slidetoshow.next("span").html();
				$("#footer .imgcap").html(captiontext);
				if (slidetoshow.hasClass("video")){
					$(".arrw.l, .arrw.r").height(iah/2);
					$(".arrw.d").hide();
				} else {
					$(".arrw.l, .arrw.r").height(iah);
					$(".arrw.d").show();
				}

				$("#footer .ic").text(slidetoshow.index(".proj.active .slide")+1);
			}
		}
    else if (direction == "d" || direction == "u"){


			if ($("#footer").hasClass("expanded")){
				$("#footer").stop().animate({height:43},{duration: 200, easing: 'jswing'});
				$("#belowfooter").stop().animate({marginTop:0},{duration: 200, easing: 'jswing'});
				$("#footer").removeClass("expanded");
				$("#footer a.expand").find("span").text("Read more");
				if (isTouch){
					$("#belowfooter").css("position","fixed");
				}
			}

			var href = thislink.attr("href");
			History.pushState(null, null, href);
		}

		if (direction == "l" || direction == "r"){
			if ($("#footer").hasClass("expanded")){
				$("#footer").stop().animate({height:43},{duration: 200, easing: 'jswing'});
				$("#belowfooter").stop().animate({marginTop:0},{duration: 200, easing: 'jswing'});
				$("#footer").removeClass("expanded");
				$("#footer a.expand").find("span").text("Read more");
				if (isTouch){
					$("#belowfooter").css("position","fixed");
				}
			}
		}

		return false;
	});



	//iPad

	if (isTouch){
		$(".slideshow").touchwipe({
			wipeLeft: function() { $(".arrw.r").click(); },
			wipeRight: function() { $(".arrw.l").click(); },
			wipeDown: function() { $(".arrw.d").click(); },
			wipeUp: function() { $(".arrw.u").click(); },
			min_move_x: 50,
			min_move_y: 50,
			preventDefaultEvents: false
		});
	}




	$(document).keydown(function(e) {
		if (e.which == 37 && !e.metaKey) {
			e.preventDefault()
			if ($("#projects").length > 0){
				startScrolling("l");
			} else {
				$(".arrw.l").click();
			}

		} else if (e.which == 38 && !e.metaKey){
			$(".arrw.u").click();
		} else if (e.which == 39 && !e.metaKey){
			e.preventDefault()
			if ($("#projects").length > 0){
				startScrolling("r");
			} else {
				$(".arrw.r").click();
  			}
		} else if (e.which == 40 && !e.metaKey){
			$(".arrw.d").click();
		}
	});

	if (!isTouch){
		$("#header").hoverIntent(
			function(){$("#header .hh").slideDown(50);},
			function(){$("#header .hh").slideUp(50);}
		);
	}

	$(".loc").hoverIntent(
		function(){$(this).find("img").fadeIn(100);$(this).find(".address").fadeOut(100);},
		function(){$(this).find("img").fadeOut(100);$(this).find(".address").fadeIn(100);}
	);

  /*
	$(".projtxt").each(function(){
		var th = $(this).height();
		var mt = (180-th)/2;
		$(this).css("margin-top",mt+"px");
	});
  */

	$(".projthumb").hoverIntent(
		function(){
			$(this).find(".projtxt").fadeIn(100);
		},
		function(){
			$(this).find(".projtxt").fadeOut(100);
		}
	);
	$(".projthumb").live("click",function(){
		var href = $(this).find("a").attr("href");
		window.location = href;
	});



  /* 	!FULL SIZE IMAGES */
	$("a.fs").live("click",function(e){
		e.preventDefault();
		$("body").append("<div id='fs_overlay'></div>");
		$("#fs_overlay").fadeIn(200);
		var tl = $(this);
		var image = tl.attr("href");
		var allimgs = tl.parent().find("a.fs");
		if (allimgs.length > 1){
			var lbcontent = "<div class='fsss'>";
			allimgs.each(function(){
				var img = $(this).attr("href");
				var as = (img == image)? " class='as'" : "";
				lbcontent += "<img"+as+" src='"+img+"' />";
			});
			lbcontent += "<a class='ssnavi prev' href='#'></a><a class='ssnavi next' href='#'></a><span class='closewrap'><a class='close' href='#'></a></span>";
			lbcontent += "</div>";
		}  else {
			var lbcontent = "<img class='as' src='"+image+"' />";
		}

		$("#fs_overlay").append(lbcontent);

		$("#fs_overlay").find(".ssnavi").click(function(e){
				e.stopPropagation();
				e.preventDefault();
				var slideshow = $(this).closest(".fsss");
				var direction = "next";
				if ($(this).hasClass('prev')){
					direction = "prev";
				}
				slideshowMove(slideshow,direction);
		});

		$("#fs_overlay").find("img.as").load(function() {
			resizeFSimage($("#fs_overlay").find("img"));
		});
		$("body").css("overflow","hidden");
	});
	$("#fs_overlay").live("click",function(e){
		e.preventDefault();
		$(this).fadeOut(400,function(){
			$(this).remove();
			$("body").css("overflow","scroll");
		});
	})


	$(".arrw.fxd.l").hide();
	$(".arrw.fxd").click(function(e){
		e.preventDefault();
		if ($(this).hasClass("r")){
			var direction = "r";
		} else {
			var direction = "l";
		}
        startScrolling(direction);
    });



	$('.scroll').jScrollPane({hideFocus: true,verticalGutter:9,autoReinitialise: true});
});
/* END DOC READY */

function slideshowMove(slideshow,direction) {
	var slidespeed = 400;
	var effect = "fade";
	var slides = slideshow.find('img');

	var slide = slideshow.find(".as");
	if (slide.length < 1){
		slide = slides.first();
	}
	if (direction == 'prev') {
		nextslide = slide.prevAll("img").first();
		if (!nextslide.length) {
			nextslide = slides.last();
		}
	} else {
		nextslide = slide.nextAll("img").first();
		if (!nextslide.length) {
			nextslide = slides.first();
		}
	}

	slide.stop().fadeOut(slidespeed);
	nextslide.fadeIn(slidespeed);
	nextslide.addClass('as');
	slides.not(nextslide).removeClass('as');
}





function showReader(id,t){
	$.ajax({
		cache: false,
		type: "GET",
		url: "/php/gettext.php",
		dataType: "html",
		data: "t="+t+"&id="+id,
		success: function(resultdata) {
			scrollback = $(document).scrollTop();
			$("html, body").animate({ scrollTop: 0 }, 300,function(){
				$("body").css("overflow","hidden");
			});
			$("#site2").addClass("noprint");

			$("#overlay").fadeIn(300);
			$("#reader").html(resultdata).fadeIn(300,function(){
				$("#reader").jScrollPane({hideFocus: true,verticalGutter:9,autoReinitialise: true});
				scrollapi = $("#reader").data("jsp");
			});
			$("#overlay").bind("click",destroyReader);
			$("span.close").bind("click",destroyReader);
		}
	});
}

function destroyReader(){
	if ($("#reader").is(":visible")){
		$("body").css("overflow","visible");
		$("#site2").removeClass("noprint");
		$("html, body").animate({ scrollTop: scrollback }, 300);
		$("#overlay").fadeOut(300);
		scrollapi.destroy();
		$("#reader").fadeOut(300).empty();
		$("#overlay").unbind("click");
	}
}

function adjustProjectsIndex(){
  /*
	var numthumbs = $("#projects .thumbswrap .projthumb").length;
	var maxperrow = Math.floor(ww-40)/220;

	var perrow = Math.ceil(numthumbs/projrows);
	if (numthumbs<maxperrow){
		thumbswrapw = (numthumbs * 220) + 20;
	} else if (projrows > perrow){
		thumbswrapw = ((perrow+(projrows-perrow)) * 220) + 20;
	} else {
		thumbswrapw = (perrow * 220) + 20;
	}
	$("#projects .thumbswrap").width(thumbswrapw);

	var rightarrow = $(".arrw.fxd.r");
	var leftarrow = $(".arrw.fxd.l");
	if(window.pageXOffset > 0){
        leftarrow.show();
    } else {
	    leftarrow.hide();
    }
    if ((thumbswrapw+19-window.pageXOffset) <= ww){
	    rightarrow.hide();
    } else {
	    rightarrow.show();
    }
 */

}



function startScrolling(direction){
	if (direction == "l"){
		var param = "-=272px";
	} else if (direction == "r"){
		var param = "+=272px";
	}
	$("body").stop().animate({"scrollLeft": param}, 200, "linear", function(){});
}




// resize site
function resizeSite(){
	ww = $(window).width();
	awh = $(window).height();
	wh = awh;
	if(ww < minww)ww = minww;
	if(wh < minwh)wh = minwh;

	iah = wh-headerheight-footerheight;
	siteratio = ww/iah;
	var projrows_nr = (iah+30)/230;
	var projrows_r = Math.floor((iah+30)/230);
	var deltarows = projrows_nr - projrows_r;

	if (deltarows > 0.85){
		projrows = projrows_r+1;
		var tmb = ((iah+30) - projrows * 230) / projrows;
	} else {
		projrows = projrows_r;
	}



	adjustProjectsIndex();
	var infow = Math.min(ww-40,2000);
	//var inforw = Math.min(ww-600,Math.round((infow)/2));
	var inforw = infow-560;
	$("#infocont,.inforow").width(infow);
	//$(".inforight").width(inforw);
	$("#projtable, #projtablehead").width(ww-40);
	$("#reader").height(wh);

  // project index
	if ($("#projects").length > 0){
		$(".arrw.r, .arrw.l").width(150).height(iah+70).css("top","60px");
	} else {
		$(".arrw.r, .arrw.l").width(Math.round((ww-120)/2));
		if ($(".arrw.d").length > 0 || $(".arrw.u").length > 0){
			$(".arrw.r, .arrw.l").height(iah-240).css("top","120px");
		} else {
			$(".arrw.r, .arrw.l").height(iah).css("top","0px");
		}
	}

	$(".indx.l, .indx.r").height(iah);
	$("#site2").width(ww);
	$("#site, .scrollwrap, .site").width(ww).height(wh-headerheight);
	$("#bgimage").width(ww).height(iah);

	$("#bgimage .headline p").each(function(){
		var thisp = $(this);
		var hmt = (iah-thisp.height())/2-10;
		thisp.css("margin-top",hmt+"px");
	});





	$(".scrollwrap").height(iah);
	//$("#projects").height(wh-headerheight);



	//biblio spacer height
	if ($("#bibliocont").length > 0){
		var lastsection = $(".rowcont").last();
    /* 		var lastsectiont = lastsection.offset().top; */
		var lastsectionw = lastsection.height();
		var spcrh = wh - lastsectionw - 82 + 90 - 40;
		$(".spacer").height(spcrh);
	}
	//news spacer height
	if ($("#newscont").length > 0){
		var lastsection = $(".rowcont").last();
    /* 		var lastsectiont = lastsection.offset().top; */
		var lastsectionw = lastsection.height();
		var spcrh = wh - lastsectionw - 83 - 40;
		$(".newsspacer").height(spcrh);
	}



	$("#bgimage .slide").each(function(){
		var thisimg = $(this);
		var	iR = parseFloat(thisimg.classData("r"));
		var	sf = thisimg.classData("f");
		if (sf == 200){
			sf = 1;
			var fit = false;
		} else {
			sf = parseFloat(sf/100);
			var fit = true;
		}
		if ($(this).hasClass("full")){
			var thisimg = $(this);
			thisimg.width(ww).height(iah);
		} else {
			imgResize(thisimg,ww,wh,"position",0,130,0,0);
		}
	});

	var currentslide = $(".slideshow .slide:visible");
	if (currentslide.length > 0 && currentslide.hasClass("video")){
		if ($(".arrw.d").length > 0){
			$(".arrw.l, .arrw.r").height(iah/2);
			$(".arrw.d").hide();
		} else {
			$(".arrw.l, .arrw.r").height(iah/1.5);
		}
	} else {
		$(".arrw.l, .arrw.r").height(iah);
			$(".arrw.d").show();
	}



	resizeFSimage($("#fs_overlay").find("img"));

	if (ww < 1280){
		$(".slide p").css("font-size","39px").css("line-height","50px").css("width","840px");
	} else if (ww < 1680){
		$(".slide p").css("font-size","48px").css("line-height","62px").css("width","1024px");
	} else if (ww < 2500){
		$(".slide p").css("font-size","60px").css("line-height","78px").css("width","1290px");
	} else {
		$(".slide p").css("font-size","72px").css("line-height","90px").css("width","1550px");
	}



	$(".inforight .slide").each(function(){
		var thisimg = $(this);
		var thiscont = thisimg.closest(".inforight");
		var	iR = parseFloat(thisimg.classData("r"));
		var irw = thiscont.width();
		var ilh = thiscont.prev(".infoleft").height();
		if (iR > 1){
			//landscape => 80% of cont width
			var iw = irw * 0.8;
			var ih = iw/iR;
			var iml = irw * 0.1;
		} else {
			//portrait => 50% of cont width
			iw = irw * 0.5;
			ih = iw/iR;
			var iml = irw * 0.25;
		}

		thisimg.width(iw).height(ih).css("margin-left",iml+"px");
		var irh = Math.max((ih+6),ilh);
		thiscont.height(irh);
	});
}


function hideHeadline(headline){
	setTimeout(function(){
		headline.fadeOut(700);
	}, 2000);
}



function imgResize(el,cw,ch,prop,woff,hoff,loff,toff){
//element, container width, height, css prop (margin/top), width offset, height offsert, left offset, top offset

	var	iR = parseFloat(el.classData("r"));
	var	sf = el.classData("f");
	if (sf == 200){
		sf = 1;
		var fit = false;
	} else {
		sf = parseFloat(sf/100);
		var fit = true;
	}

	//element ratio
	var ir = parseFloat(el.classData("r"));
	if (!ir){
		ir = el.width()/el.height();
	}
	//scale factor
	if (!sf){
		sf = 1;
	}
	//fit inside container
	if (fit){
		var cr = (cw-woff)/(ch-hoff);
		if (cr > ir){
			var ih = (ch-hoff) * sf;
			var iw = ih * ir;
		} else {
			var iw = (cw-woff) * sf;
			var ih = iw / ir;
		}
		var imt = (ch-hoff-ih)/2;
		var iml = (cw-woff-iw)/2;

	//fill container
	} else {
		var cr = (cw/ch);
		if (ir < 1){
			//image is portrait
			var iw = cw;
			var ih = iw/ir;
			if (ih < ch){
				var ih = ch;
				var iw = ih * ir;
				var iml = (cw-iw)/2-loff;
				var imt = (ch-ih)/2-toff;
			} else {
				var imt = (ch-ih)/2-toff;
				var iml = (cw-iw)/2-loff;
			}
		} else {
			//image is landscape
			var ih = ch;
			var iw = ih * ir;
			if (iw < cw){
				var iw = cw;
				var ih = iw/ir;
			}
			var iml = (cw-iw)/2-loff;
			var imt = (ch-ih)/2-toff;
		}
	}

	if (prop == "margin"){
		el.width(iw).height(ih).css({marginTop:imt+"px",marginLeft:iml+"px"});
	} else if (prop == "position"){
		el.width(iw).height(ih).css({top:imt+"px",left:iml+"px"});
	} else if (prop == "array"){
		var imgDim = new Array(4);
		imgDim[0] = iw;
		imgDim[1] = ih;
		imgDim[2] = iml;
		imgDim[3] = imt;
		return imgDim;
	}

}







function adjustFooterHeight(){
	var fh = $("#footer").height();
	var bfh = $("#belowfooter").outerHeight();
	if (bfh < 33)bfh = 0;
	$("#footer").stop().animate({height:bfh + 43},{duration: 200, easing: 'jswing'});
	$("#belowfooter").stop().animate({marginTop:-(bfh)},{duration: 200, easing: 'jswing'});
}


// FS image?
function resizeFSimage(img){
	img.each(function(){
		var ti = $(this);
		var iw = ti.width();
		var ih = ti.height();
		if ((ww/wh) > iw/ih){
			var nih = wh;
			var niw = iw/ih*nih;
		} else {
			var niw = ww;
			var nih = ih/iw*niw;
		}

		var postop = Math.round((wh-nih)/2);
		var posleft = Math.round((ww-niw)/2);
		ti.width(niw).height(nih).css("top",postop+"px").css("left",posleft+"px");
		if (ti.hasClass("as")){
			ti.fadeIn(300);
		}
	});
}


// NOTE: Need this one
function goToProject(href){
	var thisslideshow = $("#bgimage");
	var thisproject = $(".proj.active");
	var current = $(".proj.active .slide:visible");

	var projurlname = href.replace("/project/","").replace("/publication/","");
	nextproj = $("#p_"+projurlname);

	if (nextproj.index() > thisproject.index()){
		if (thisproject.index() == 0 && nextproj.index() == $(".proj").length-1){
			var direction = "u";
		} else {
			var direction = "d";
		}
	} else {
		if (thisproject.index() == $(".proj").length-1 && nextproj.index() == 0){
			var direction = "d";
		} else {
			var direction = "u";
		}
	}
	if(nextproj.html() == ""){
		getNewProject(thisproject,current,nextproj,direction,true);
	} else {
		slideToProject(thisproject,current,nextproj,direction);
	}
}


/* !PROJECT FUNCTIONS */
// NOTE: Need this one
function getNewProject(thisproject,current,nextproj,direction,doslide){
	var urlname = nextproj.attr("id").replace("p_","");
	var table = nextproj.parent().classData("t");
	$.ajax({
		cache: false,
		type: "GET",
		url: "/php/getproject.php",
		dataType: "html",
		data: "urlname="+urlname+"&table="+table,
		success: function(resultdata) {
			$("#p_"+urlname).html(resultdata);
			resizeSite();
			if (doslide){
				slideToProject(thisproject,current,nextproj,direction);
			}
		}
	});
}


// NOTE: Need this one to pre-load images for next project
function loadPrevAndNextProject(thisproject){
	if (thisproject.next(".proj").first().length > 0){
		var nextproj = thisproject.nextAll(".proj").first();
	} else {
		var nextproj = $(".proj:first-child");
	}
	if(nextproj.html() == ""){
		getNewProject(thisproject,"",nextproj,"",false)
	}


	if (thisproject.prevAll(".proj").first().length > 0){
		var prevproj = thisproject.prevAll(".proj").first();
	} else {
		var prevproj = $(".proj").eq($(".proj").length-1);
	}
	if(prevproj.html() == ""){
		getNewProject(thisproject,"",prevproj,"",false)
	}
}



// NOTE: Need this for going to the next project...
function slideToProject(thisproject,current,nextproj,direction){

	var cl = current.offset().left; // ok
	var slidetoshow = nextproj.find(".slide:first-child"); //ok
	var imgDim = imgResize(slidetoshow,ww,wh,"array",0,130,0,0); //ok
	var table = nextproj.parent().classData("t"); //ok
	if (table == "projects"){ //ok
		var dir = "project";
	} else if (table == "bibliography"){
		var dir = "publication";
	}
	var ct = current.offset().top; // ok
	if (direction == "u"){
		current.stop().animate({top:ct+wh+gutter},{duration: speed-100, easing: easing}).hide(0).css("top",ct+"px");
		slidetoshow.css("top",(imgDim[3]-wh-gutter)+"px").show(0).stop().animate({ top:imgDim[3] },{duration: speed, easing: easing});
	} else {
		current.stop().animate({top:(ct-wh)},{duration: speed-100, easing: easing}).hide(0).css("top",ct+"px");
		slidetoshow.css("top",(ww+imgDim[3])+"px").show(0).stop().animate({top:imgDim[3]},{duration: speed, easing: easing});
	}


	thisproject.removeClass("active");
	nextproj.addClass("active");

	$("#footer").html(nextproj.find(".ftr").html());
	$("#belowfooter").html(nextproj.find(".blwftr").html());
	if ($("#footer").hasClass("expanded")){
		$("#footer a.expand").find("span").text("Hide text");
		adjustFooterHeight();
	}

	if (nextproj.next(".proj").first().length > 0){
		var nextnextproj = nextproj.nextAll(".proj").first();
	} else {
		var nextnextproj = $(".proj:first-child");
	}
	var nexturl = "/"+dir+"/"+nextnextproj.attr("id").replace("p_","");
	if (nextproj.prevAll(".proj").first().length > 0){
		var prevprevproj = nextproj.prevAll(".proj").first();
	} else {
		var prevprevproj = $(".proj").eq($(".proj").length-1);
	}
	var prevurl = "/"+dir+"/"+prevprevproj.attr("id").replace("p_","");

	$(".arrw.d").attr("href",nexturl);
	$(".arrw.u").attr("href",prevurl);

	var urlname = nextproj.attr("id").replace("p_","");
	var projtitle = $(".ftr a.expand").text();
	loadPrevAndNextProject(nextproj);
}








// NOTE: Copied
$(window).load(function(){
	runBackgroundSlideShow();
	loadPrevAndNextProject($(".proj.active"));
});

// NOTE: Not Copied
var cur = 0;
function runBackgroundSlideShow(){
	var ss = $(".slideshow");
	var autoplay = (ss.hasClass("autoplay")) ? true : false;
	if (autoplay){
		var interval = parseInt(ss.classData("interval"));
		var speed = parseInt(ss.classData("speed"));
		var totimgs = $(".slideshow img").length;
		setInterval(function(){
			var curimg = $(".slideshow img").eq(cur);
			if (cur < totimgs-1){
				var imgtoshow = curimg.next("img");
			} else {
				var imgtoshow = $(".slideshow img").eq(0);
			}
			curimg.fadeOut(speed);
			imgtoshow.fadeIn(speed);
			cur = imgtoshow.index();
		}, interval);
	}
}
