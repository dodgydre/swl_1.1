(function($) {

//"use strict";

// Global Variables
var ww = $(window).width(),
    wh = $(window).height(),
    headerheight = $('.header-contents').height(),
    iah = wh-headerheight,
    minww = 0,
    minwh = 0,
    gutter = 0,
    easing = "jswing",
    speed = 400,
    fadeOutSpeed = 300,
    fadeInSpeed = 700,
    currenturl = window.location.pathname;

$(document).ready(function() {
  if($('.admin-bar').first().length > 0) {
    headerheight = 75+32;
  }

  resizeSite();
  $(window).resize(resizeSite);

  // Hide Images and Fade in the first one
  if(!$.browser.msie) {
    if($("#proj_img").length > 0) {
      //hide all images
      $("#proj_img img").hide();
      $('#proj_img .active img').first().fadeIn(400);

      // TODO: Check why this on load isn't working!!
      /*firstImg.on('load',function(){
        console.log('showing');
        $(this).fadeIn(400);
      });*/
    }
  }

  // Project Table Sorting?

  // Project Slider
  $("#proj_img.home .arrw").click(function(  ) {
    var thislink = $(this);

    if($(this).hasClass("left")) {
      var dir = "l";
    }
    else if ($(this).hasClass("right")) {
      var dir = "r";
    }

    resizeSite();


    var thisSlideShow = $("#proj_img");
    var thisProject = $(".proj.active");
    var current = $(".proj.active .slide:visible");

    if (dir == "l") {
      if (thisProject.find(".slide").length > 1) {
        // if the current slide is not the first then move one to the left.
        if (current.prevAll(".proj.active .slide").first().length > 0) {
          var slideToShow = current.prevAll(".proj.active .slide").first();
          //$('.moving_bg').animate({left: "-=13"}, 500);
        }
        // if the current slide IS the first one then slide to the last slide
        else {
          var slideToShow = $(".proj.active .slide").eq($(".proj.active .slide").length-1);
          //var newLeft = ($(".proj.active .slide").length-1) * 13;
          //$('.moving_bg').animate({left: newLeft}, 500);

        }
        // Fading or Sliding?
        if (thisSlideShow.hasClass("fading")){
					current.fadeOut(fadeOutSpeed);
					slideToShow.fadeIn(fadeInSpeed);
				}
        else if ( thisSlideShow.hasClass("sliding")) {
          var imgDim = imgResize(slideToShow, ww, iah, "array", 0, 0, 0, 0);
          var currentLeft = current.offset().left;
          var nextCurrentLeft = currentLeft + ww + gutter;
          var nextNextLeft = (imgDim[2]-ww-gutter);
          current.stop().animate({ left:nextCurrentLeft }, { duration: speed, easing: easing } ).hide(0).css("left",currentLeft+"px");
          slideToShow.css( "left" , nextNextLeft + "px" ).show(0).stop().animate({ left:imgDim[2] },{ duration: speed, easing: easing });
        }

        $(".arrw.left, .arrw.right").height(iah);
      }
    }
    else if (dir == "r") {
      if (thisProject.find(".slide").length > 1) {
        if (current.nextAll(".proj.active .slide").first().length > 0) {
          // If we're not on the last slide, move one forward
          var slideToShow = current.nextAll(".proj.active .slide").first();
          //$('.moving_bg').animate({left: "+=13"}, 500);
        }
        else {
          // if we are on the last slide move back to the start
          var slideToShow = $(".proj.active .slide:first-child");
          //$('.moving_bg').animate({left: 0}, 500);
        }
        if (thisSlideShow.hasClass("fading")) {
          current.fadeOut(fadeOutSpeed);
          slideToShow.fadeIn(fadeInSpeed);
        }
        else if (thisSlideShow.hasClass("sliding")) {
          var imgDim = imgResize(slideToShow,ww,iah,"array",0,0,0,0);
          var currentLeft = current.offset().left;
          var nextCurrentLeft = -(ww+gutter);
          var nextNextLeft = (imgDim[2]+ww+gutter);
          current.stop().animate({ left: nextCurrentLeft },{ duration: speed, easing: easing }).hide(0).css("left",currentLeft+"px");
          slideToShow.css("left", nextNextLeft+"px").show(0).stop().animate({ left: imgDim[2] }, { duration: speed, easing: easing });
        }
        $(".arrw.left, .arrw.right").height(iah);
      }
    }

    if (dir == "l" || dir == "r") {
      // TODO: if footer is expanded then close the footer
    }

    return false;
  }); // close >> #proj_img.proj .arrw click

  // Use Keyboard instead of Mouse
  $(document).keydown(function(e) {
    if (e.which == 37 && !e.metaKey) {
      e.preventDefault();
      $(".arrw.left").click();
    }
    else if (e.which == 39 && !e.metaKey) {
      e.preventDefault();
      $(".arrw.right").click();
    }
  });

  // NOTE: jQuery.touchSwipe.min.js
  $(".arrw").swipe( {
      //Generic swipe handler for all directions
      swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        console.log("You swiped " + direction );
        if(direction == "left") {
          $('.arrw.right').click();
        }
        if(direction == "right") {
          $('.arrw.left').click();
        }
      }
    });

});  // close >> document(ready)

/* Resize Site */
function resizeSite() {
  ww = $(window).width();
  wh = $(window).height();
  if(ww < minww) ww = minww;
  if(wh < minwh) wh = minwh;

  var iah = wh - headerheight;
  var siteratio = ww / iah;

  // resize the container
  $('#site, .site').width(ww).height(iah);
  $('#proj_img').width(ww).height(iah);
  $('#proj_img').css('width', ww + "px").css('height', iah + "px");

  // resize each picture
  $('#proj_img .slide').each(function() {
    var thisimg = $(this);
    var iR = parseFloat(thisimg.data("r"));
    var sf = thisimg.data("f");

    if (sf == 200) {
      sf = 1;
      var fit = false;
    }
    else {
      sf = parseFloat(sf / 100);
      var fit = true;
    }

    if ($(this).hasClass("full")) {
      var thisimg = $(this);
      thisimg.width(ww).height(iah);
    }
    else {
      imgResize(thisimg, ww, iah, "position", 0, 0, 0, 0)
    }
  });
  //end resize each picture

  $(".arrw.left, .arrw.right").height(iah).width(ww/2).css("top","0");
}
/* End Resize Site */

/* Resize Image */
function imgResize(el, cw, ch, prop, woff, hoff, loff, toff) {
  // element, container width, height, css prop (margin/top), width offset, height offset, left offset, top offset
  var iR = parseFloat(el.data("r"));
  var sf = el.data("f");
  if(sf == 200) {
    sf = 1;
    var fit = false;
  }
  else {
    sf = parseFloat(sf/100);
    var fit = true;
  }

  //element ratio
  var ir = parseFloat(el.data("r"));
  if (!ir) {
    ir = el.width() / el.height();
  }
  //scale factor
  if (!sf) {
    sf = 1;
  }

  // fit inside container
  if (fit) {
    var cr = (cw - woff) / (ch - hoff);
    if (cr > ir) {
      var ih = (ch - hoff) * sf;
      var iw = ih * ir;
    }
    else {
      var iw = (cw - woff) * sf;
      var ih = iw / ir;
    }
    var imt = (ch - hoff - ih) / 2;
    //var imt = 0; // over-riding to force the image to be top of screen
    var iml = (cw - woff - iw) / 2;
  }
  // fill container
  else {
    var cr = (cw / ch);
    if (ir < 1) {
      //image is portrait
      var iw = cw;
      var ih = iw/ir;
      if (ih < ch) {
        var ih = ch;
        var iw = ih * ir;
        var iml = (cw - iw) / 2 - loff;
        var imt = (ch - ih) / 2 - toff;
      }
      else {
        var imt = (ch - ih) / 2 - toff;
        var iml = (cw - iw) / 2 - loff;
      }
    }
    // image is landscape
    else {
      var ih = ch;
      var iw = ih * ir;
      console.log("ih: " + ih + " iw: " + iw + " -- cw:" + cw);

      if (iw < cw) {
        console.log('true');
        var iw = cw;
        var ih = iw/ir;
      }
      console.log("ih: " + ih + " iw: " + iw + " -- cw:" + cw);

      var iml = (cw - iw) / 2 - loff;
      var imt = (ch - ih) / 2 - toff;
      console.log("iml: " + iml + " imt: " + imt);
      //imt = 0;
    }
  }

  if(el.hasClass('full')) {
    var iw = cw;
    var ih = ch;
    var iml = 0;
    var imt = 0;

  }

  //imt = 0;
  if (prop == "margin") {
    el.width(iw).height(ih).css({marginTop:imt+"px", marginLeft:iml+"px"});
  }
  else if (prop == "position") {
    el.width(iw).height(ih).css({top:imt+"px",left:iml+"px"});
  }
  else if (prop == "array") {
    //el.width(iw).height(ih);
    var imgDim = new Array(4);
    imgDim[0] = iw;
    imgDim[1] = ih;
    imgDim[2] = iml;
    imgDim[3] = imt;
    return imgDim;
  }
}
/* End Resize Image */


})( jQuery );
