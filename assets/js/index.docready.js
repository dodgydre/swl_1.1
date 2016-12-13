(function($) {

//"use strict";

// Global Variables
var ww = $(window).width(),
    wh = $(window).height(),
    headerheight = 105, // $('.header__container').height(),
    footerheight = 45, // $('.footer__container').height(),
    iah = wh-headerheight-footerheight,
    siteratio = ww / iah,
    minww = 0,
    minwh = 0,
    gutter = 0,
    easing = "jswing",
    speed = 400,
    fadeOutSpeed = 300,
    fadeInSpeed = 700,
    currenturl = window.location.pathname,
    centered = true;

$(document).ready(function() {
    /* ------ If smaller screen add mobile class to main div ------- */
    if($(window).width() > 769) {
      $('#proj_img').addClass('large').removeClass('mobile');
      $('#projthumb-wrap').addClass('large').removeClass('mobile');
      $('#proj_img img').addClass('slide');
      $('body').addClass('large').removeClass('mobile');
    }
    else {
      $('#proj_img').removeClass('large').addClass('mobile');
      $('#projthumb-wrap').removeClass('large').addClass('mobile');
      $('#proj_img img').removeClass('slide');
      $('.arrw').hide();
      $('body').addClass('mobile').removeClass('large');

    }

    /* ------ On resizing, check the screen size again ------- */
    $(window).resize(function() {

      // Desktop Size Screens
      if($(window).width() > 769) {
        if($('.mobile').length > 0) {
          $('#proj_img').addClass('large').removeClass('mobile');
          $('#projthumb-wrap').addClass('large').removeClass('mobile');
          $('body').addClass('large').removeClass('mobile');

          $("#proj_img img").hide();
          $('#proj_img .active img').first().fadeIn(400);

          var caption = $('#proj_img .active img').first().nextAll('.caption').first().html();
          var description = $('#proj_img .active img').first().nextAll('.description').first().html();
          var imagedate = $('#proj_img .active img').first().nextAll('.date').first().html();

          $('.footer__caption').html(caption);
          $('.footer__caption-date').html(imagedate);
          $('.below-footer__description').html(description);

          $(".large").find(".projthumb").hover(
              function(){
                  $(this).find(".projtext").fadeIn(100);
              },
              function(){
                  $(this).find(".projtext").fadeOut(100);
              }
          );
        }
      }
      // Mobile Screens
      else {
        $('#proj_img').removeClass('large').addClass('mobile');
        $('#projthumb-wrap').removeClass('large').addClass('mobile');
        $('body').removeClass('large').addClass('mobile');


        $(".projthumb").off('hover');

        //$('.caption__overlay').hide();
      }
      resizeSite();
    });


    /* ------ Button for menu dropdown on smaller screens ------- */
    $('.header__icon').click(function(e) {
        if( $('body').hasClass('home') ) {
            console.log('1');
            e.preventDefault();
            $('.header__icon').toggleClass('is-active');
            $('.large-menu').toggleClass('is-active');
            $('.large-menu-filter').toggleClass('is-active');
            $('.large-menu_mobile').toggleClass('is-active');
            $('.large-menu-search').toggleClass('is-active');
            return false;
        }
        // archive-project in mobile mode
        else if( $('body').hasClass('mobile') ) {
            console.log('2');

          e.preventDefault();
          $('.header__icon').toggleClass('is-active');
          $('.large-menu').toggleClass('is-active');
          $('.large-menu-filter').toggleClass('is-active');
          $('.large-menu_mobile').toggleClass('is-active');
          $('.large-menu-search').toggleClass('is-active');
        }
    });

    // archive-project in desktop mode
    if($('body').hasClass('large')){
        jQuery('.search').show();
        jQuery('.search-icon').show();

        jQuery('#searchIcon').click(function() {
            console.log('opening');
          if(jQuery('#searchElements').css('left') == '0px' ) {
            jQuery('#searchElements').stop().animate( { left: -302 }, {duration: 800, easing: 'jswing' });
          }
          else {
            jQuery('#searchElements').stop().animate( { left: 0 }, {duration: 800, easing: 'jswing' });
          }
        });

        jQuery('.large-menu-search').addClass('is-active');
    }

  /*
  $('.header__overlay-icon').click(function(e) {
    $('#header__overlay-menu').toggleClass('is-active').fadeOut(400);
    return false;
  });
  */


  /* ------ Button for Footer Expand ------- */
  $('.expand').click(function(e) {
    e.preventDefault();
    /* If the footer is already expanded then lower it */
    if( $('.footer__container').hasClass('expanded') ) {
      $('.footer__container').stop().animate( { height: footerheight }, {duration: 20, easing: 'jswing' });
      $('.below-footer__container').stop().animate( { marginTop:0}, {duration: 20, easing: 'jswing'});
      $('.footer__container').removeClass('expanded');
      $('.footer__more').text(" / Read More");

    }
    else {
      adjustFooterHeight();
      $('.footer__container').addClass('expanded');
      $('.footer__more').text(" / Hide text");
    }

    //$('.below-footer__container').top
  });

  resizeSite();
  //$(window).resize(resizeSite);

  // Hide Images and Fade in the first one
  if(!$.browser.msie && $(window).width() > 769) {
    if($("#proj_img").length > 0) {
      //hide all images
      $("#proj_img img").hide();
      //$('#proj_img .active img').first().load(function() {
        //$(this).fadeIn(400);
        $('#proj_img .active img').first().fadeIn(400);
        var caption = $('#proj_img .active img').first().nextAll('.caption').first().html();
        var description = $('#proj_img .active img').first().nextAll('.description').first().html();
        var imagedate = $('#proj_img .active img').first().nextAll('.date').first().html();

        $('.footer__caption').html(caption);
        $('.footer__caption-date').html(imagedate);
        $('.below-footer__description').html(description);
      //});

    }
  }

  // Project Slider
  $("#proj_img.home .arrw").click(function(  ) {
     ww = $(window).width();
     wh = $(window).height();
    //TODO: Add this to remove the "read more" footer
    //destroyReader();
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

        /* If the footer is expanded, shrink it */
        if( $('.footer__container').hasClass('expanded') ) {
          $('.expand').click();
        }
        // Fading or Sliding?
        if (thisSlideShow.hasClass("fading")){
					current.fadeOut(fadeOutSpeed);
					slideToShow.fadeIn(fadeInSpeed);
				}
        else if ( thisSlideShow.hasClass("sliding")) {
          if(centered) {
            var imgDim = imgResize(slideToShow, ww, iah, "array", 0, 0, 0, 0);
          }
          else {
            var imgDim = imgResizeLeft(slideToShow, ww, iah, "array", 45, 0, 45, 0);
          }
          var currentLeft = current.offset().left;
          var nextCurrentLeft = currentLeft + ww + gutter;
          var nextNextLeft = (imgDim[2]-ww-gutter);
          //console.log(nextCurrentLeft);

          /* Retrieve the information for the next slide */
          var caption = slideToShow.nextAll('.caption').first().html();
          var imagedate = slideToShow.nextAll('.date').first().html();
          var description = slideToShow.nextAll('.description').first().html();

          //$('.caption__overlay').fadeOut();

          current
            .stop()
            .animate({ left:nextCurrentLeft }, { duration: speed, easing: easing } )
            .hide(0)
            .css("left",currentLeft+"px");

          slideToShow
            .css( "left" , nextNextLeft + "px" )
            .show(0)
            .stop()
            .animate({ left:imgDim[2] }, speed, easing, function() {
              $('.footer__caption').html(caption);
              $('.footer__caption-date').html(imagedate);
              $('.below-footer__description').html(description);

          });
        }
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
          var slideToShow = $(".proj.active .slide").first();
          //$('.moving_bg').animate({left: 0}, 500);
        }

        /* If the footer is expanded, shrink it */
        if( $('.footer__container').hasClass('expanded') ) {
          $('.expand').click();
        }

        if (thisSlideShow.hasClass("fading")) {
          current.fadeOut(fadeOutSpeed);
          slideToShow.fadeIn(fadeInSpeed);
        }
        else if (thisSlideShow.hasClass("sliding")) {
          if (centered) {
            var imgDim = imgResize(slideToShow,ww,iah,"array",0,0,0,0);
          }
          else {
            var imgDim = imgResizeLeft(slideToShow,ww,iah,"array",45,0,45,0);
          }
          var currentLeft = current.offset().left;
          var nextCurrentLeft = -(ww+gutter);
          var nextNextLeft = (imgDim[2]+ww+gutter);
          var caption = slideToShow.nextAll('.caption').first().html();
          var imagedate = slideToShow.nextAll('.date').first().html();
          var description = slideToShow.nextAll('.description').first().html();

          $('.caption__overlay').fadeOut();

          current.stop().animate({ left: nextCurrentLeft },{ duration: speed, easing: easing }).hide(0).css("left",currentLeft+"px");
          slideToShow
            .css("left", nextNextLeft+"px")
            .show(0)
            .stop()
            .animate({ left: imgDim[2] }, speed, easing, function() {
              $('.footer__caption').html(caption);
              $('.footer__caption-date').html(imagedate);
              $('.below-footer__description').html(description);

            });
        }
        $(".arrw.left, .arrw.right").not('.small').height(iah);
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

  /* NOTE: Start Hover for description */
  jQuery(".large").find(".projthumb").hover(
    function(){
      jQuery(this).find(".projtext").fadeIn(100);
    },
    function(){
      jQuery(this).find(".projtext").fadeOut(100);
    }
  );
  /* NOTE: End Hover for description */

  /* NOTE: Start More button for cover images in mobile size */
  $('.more').click(function() {
    if( $(this).html() == '/ Read More') {
      $(this).html('/ Hide Text');
      $(this).nextAll('.description').first().addClass('active');
    } else {
      $(this).html('/ Read More');
      $(this).nextAll('.description').first().removeClass('active');
    }
  });

  $(window).scroll(function() {
    $('.description.active').each(function() {
      if( $(window).scrollTop() > $(this).nextAll('img').first().position().top ) {
        $(this).prevAll('.more').first().click();
        $(window).scrollTop($(this).nextAll('img').first().position().top);
      }
      else if ( $(window).scrollTop() + $(window).height() < $(this).position().top ) {
        $(this).prevAll('.more').first().click();
      }
    })
  });
  /* NOTE: End More button for cover images in mobile size */


});  // close >> document(ready)

/* Resize Site */
function resizeSite() {
   ww = $(window).width();
   wh = $(window).height();
   //headerheight = $('.header__container').height();
   //footerheight = $('.footer__container').height();
   iah = wh-headerheight-footerheight;
   siteratio = ww / iah;

  if(ww < minww) ww = minww;
  if(wh < minwh) wh = minwh;

  // resize the container
  $('#site, .site').width(ww).height(iah);
  $('#proj_img').width(ww).height(iah);
  $('#proj_img').css('width', ww + "px").css('height', iah + "px");


  // If the window is less than 769px hide the arrows
  if($('.mobile').length == 1) {
    $('.arrw').hide();
    $('#proj_img img').each(function() {
      $(this).removeClass('slide').addClass('project_image');
      $(this).css('width','100%').css('display','block').css('height','');
    });
  }
  // otherwise show them
  else {
    $('.arrw').show();
    $('#proj_img img').each(function() {
      $(this).addClass('slide').removeClass('project_image');
    });
  }

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
      containerW = ww;
      containerH = iah;
      containerAspect = ww / iah;
      imageAspect = iR;

      if ( containerAspect < imageAspect ) {
          var iw = iah * imageAspect;
          $(this)
            .css('width', iw)
            .css('height', iah)
            .css('top', '0')
            .css('left', (-(iah*imageAspect-ww)/2));
      } else {
          var ih = ww / imageAspect;
          $(this)
            .css('width', ww)
            .css('height', ih)
            .css('top', (-(ww/imageAspect-iah)/2))
            .css('left', '0');
      }

    }
    else {
      if(centered) {
        imgResize(thisimg, ww, iah, "position", 0, 0, 0, 0);
      }
      else {
        imgResizeLeft(thisimg, ww, iah, "position", 45, 0, 45, 0);
      }
    }
  });
  //end resize each picture
  // NOTE: splash3
  $(".arrw.left, .arrw.right").not('.small').height(iah).width(ww/2 - ww/10).css("top","0");

  $('.projthumb').each(function() {
      // MOBILE SITE -> Size of imges is 140x140
      if($('body').hasClass('mobile')) {
          thisImg = $(this).find('img');
          thisText = $(this).find('.projtext');
          iR = thisImg.data('r');
          // square image
          if( iR == 1.0 ) {
              console.log('square');
              thisImg
                .height(140)
                .width(140)
                .css('left', '0px')
                .css('top', '0px');
              thisText
                .css('top', '145px')
                .css('left', '0px');
          }
          // portrait image
          else if ( iR < 1.0 ) {
              width = iR * 140;
              imgleft = (140 - width) / 2
              thisImg
                .height(140)
                .width('auto')
                .css('left', imgleft + 'px')
                .css('top','0px');
              thisText
                .css('top', '145px')
                .css('left', imgleft + 'px');
          }
          // landscape image
          else {
              height = 140 / iR;
              imgtop = (140 - height) / 2;
              thisImg
                .height('auto')
                .width(140)
                .css('left', '0px')
                .css('top', imgtop + 'px');
              thisText
                .css('top', height + imgtop + 5 + 'px');
          }
      }
      // DESKTOP Size
      else {
          thisImg = $(this).find('img');
          thisText = $(this).find('.projtext');
          iR = thisImg.data('r');
          // square image
          if( iR == 1.0 ) {
              console.log('square');
              thisImg
                .height(270)
                .width(270)
                .css('left', '0px')
                .css('top', '0px');
              thisText
                .css('top', '275px')
                .css('left', '0px');
          }
          // portrait image
          else if ( iR < 1.0 ) {
              width = iR * 270;
              imgleft = (270 - width) / 2
              thisImg
                .height(270)
                .width('auto')
                .css('left', imgleft + 'px')
                .css('top','0px');
              thisText
                .css('top', '275px')
                .css('left', imgleft + 'px');
          }
          // landscape image
          else {
              height = 270 / iR;
              imgtop = (270 - height) / 2;
              thisImg
                .height('auto')
                .width(270)
                .css('left', '0px')
                .css('top', imgtop + 'px');
              thisText
                .css('top', height + imgtop + 5 + 'px');
          }
      }
  })

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

      if (iw < cw) {
        var iw = cw;
        var ih = iw/ir;
      }

      var iml = (cw - iw) / 2 - loff;
      var imt = (ch - ih) / 2 - toff;
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

/* Start: adjustFooterHeight */
function adjustFooterHeight() {
  var fh = $('.footer__container').height();
  var bfh = $('.below-footer__container').outerHeight();
  if (bfh < 33) bfh = 0;
  $(".footer__container")
    .stop()
    .animate( {height: bfh + footerheight}, {duration: 200, easing: 'jswing'} );
  $(".below-footer__container").stop().animate({marginTop:-(bfh)},{duration: 200, easing: 'jswing'});

}
/* End: adjustFooterHeight */

})( jQuery );
