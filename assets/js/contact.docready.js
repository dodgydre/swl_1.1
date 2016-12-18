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
    currenturl = window.location.pathname;

$(document).ready(function() {

  $('#map').height(iah - 30);
  initMap();

  if($('.admin-bar').first().length > 0) {
    //headerheight = 105+32;
  }

  /* ------ Button for menu dropdown on smaller screens ------- */
  $('.header__icon').click(function(e) {
    $('.header__icon').toggleClass('is-active');
    $('.large-menu').toggleClass('is-active');
    $('.large-menu-filter').toggleClass('is-active');
    $('.large-menu_mobile').toggleClass('is-active');
    //$('.large-menu-search').toggleClass('is-active');
    return false;
  });

  /* ------ If smaller screen add mobile class to main div ------- */
  if($(window).width() > 769) {
    $('#page__container').addClass('large').removeClass('mobile');
  }
  else {
    $('#page__container').removeClass('large').addClass('mobile');
  }

  /* ------ On resizing, check the screen size again ------- */
  $(window).resize(function() {
    $('#map').height(iah - 30);

    if($(window).width() > 769) {
      if($('.mobile').length > 0) {
        $('#page__container').addClass('large').removeClass('mobile');

      }
    }
    else {
      $('#page__container').removeClass('large').addClass('mobile');

    }
    resizeSite();
  });

  resizeSite();


});  // close >> document(ready)

/* Google Map */

function initMap() {
  var swl = {
    lat: 51.4897363,
    lng: -0.1001635
  };

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: swl,
    styles: [
      {
          "stylers": [
              {
                  "saturation": -100
              },
              {
                  "gamma": 1
              }
          ]
      },
      {
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "water",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "saturation": 50
              },
              {
                  "gamma": 0
              },
              {
                  "hue": "#50a5d1"
              }
          ]
      },
      {
          "featureType": "administrative.neighborhood",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#333333"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "labels.text",
          "stylers": [
              {
                  "weight": 0.5
              },
              {
                  "color": "#333333"
              }
          ]
      },
      {
          "featureType": "transit.station",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "gamma": 1
              },
              {
                  "saturation": 50
              }
          ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.all",
        "stylers": [
          { "visibility": "off" }
        ]
      }
]
  });
  var marker = new google.maps.Marker({
    position: swl,
    map: map
  });
}
/* End Google Map */

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



  //var iah = wh - headerheight - footerheight;
  //var siteratio = ww / iah;


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
      imgResize(thisimg, ww, iah, "position", 0, 0, 0, 0);
    }
  });
  //end resize each picture
  // NOTE: splash3
  $(".arrw.left, .arrw.right").not('.small').height(iah).width((ww/2)-(ww/10)).css("top","0");

}
/* End Resize Site */

/* Resize Image */
function imgResize(el, cw, ch, prop, woff, hoff, loff, toff) {
    // element, container width, height, css prop (margin/top), width offset, height offset, left offset, top offset
    var iR, sf, fit;
    var cR, ih, iw, imt, iml;

    iR = parseFloat(el.data("r"));
    cR = (cw - woff) / (ch - hoff);
    sf = el.data("f");

    if (sf == 200) {
        sf = 1;
        fit = false;
    } else {
        sf = parseFloat(sf / 100);
        fit = true;
    }

    //element ratio
    if (!iR) {
        iR = el.width() / el.height();
    }
    //scale factor
    if (!sf) {
        sf = 1;
    }

    // fit inside container
    if (fit) {
        //cR = (cw - woff) / (ch - hoff);
        if (cR > iR) {
            ih = (ch - hoff) * sf;
            iw = ih * iR;
        } else {
            iw = (cw - woff) * sf;
            ih = iw / iR;
        }
        imt = (ch - hoff - ih) / 2;
        iml = (cw - woff - iw) / 2;
    }
    else {
        // fill container
        //cr = (cw / ch);
        if (ir < 1) {
            //image is portrait
            iw = cw;
            ih = iw / iR;
            if (ih < ch) {
                ih = ch;
                iw = ih * ir;
                iml = (cw - iw) / 2 - loff;
                imt = (ch - ih) / 2 - toff;
            } else {
                imt = (ch - ih) / 2 - toff;
                iml = (cw - iw) / 2 - loff;
            }
        } else {
            // image is landscape
            ih = ch;
            iw = ih * ir;

            if (iw < cw) {
                iw = cw;
                ih = iw / ir;
            }

            iml = (cw - iw) / 2 - loff;
            imt = (ch - ih) / 2 - toff;
        }
    }

    if (el.hasClass('full')) {
        console.log('resizing');
        if (cR > iR) {
            iw = cw;
            ih = iw / iR;
            iml = 0;
            imt = -(iw - cw) / 2;
        } else {
            ih = ch;
            iw = ih * iR;
            iml = -(ih - ch) / 2;
            imt = 0;
        }
    }

    if (prop == "margin") {
        el.width(iw).height(ih).css({
            marginTop: imt + "px",
            marginLeft: iml + "px"
        });
    } else if (prop == "position") {
        el.width(iw).height(ih).css({
            top: imt + "px",
            left: iml + "px"
        });
    } else if (prop == "array") {
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
