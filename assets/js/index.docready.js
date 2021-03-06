(function ($) {

    //"use strict";

    // Global Variables
    var ww = $(window).width(),
        wh = $(window).height(),
        headerheight = 105, // $('.header__container').height(),
        footerheight = 45, // $('.footer__container').height(),
        iah = wh - headerheight - footerheight,
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


    /**************************************************************************/
    /* imgResize
    /*
    /* Resize an image
    /*
    /* Inputs
    /* element, container width, container height, css property (margin / top), width offet, height offset, left offset, top offset
    /**************************************************************************/
    function imgResize(el, cw, ch, prop, woff, hoff, loff, toff) {
        var iR, sf, fit,
            cR, ih, iw, imt, iml,
            imgDim = new Array(4);

        iR = parseFloat(el.data("r"));
        cR = (cw - woff) / (ch - hoff);
        sf = el.data("f");

        if (sf === 200) {
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
        } else { // fill container
            //cr = (cw / ch);
            if (iR < 1) {
                //image is portrait
                iw = cw;
                ih = iw / iR;
                if (ih < ch) {
                    ih = ch;
                    iw = ih * iR;
                    iml = (cw - iw) / 2 - loff;
                    imt = (ch - ih) / 2 - toff;
                } else {
                    imt = (ch - ih) / 2 - toff;
                    iml = (cw - iw) / 2 - loff;
                }
            } else {
                // image is landscape
                ih = ch;
                iw = ih * iR;

                if (iw < cw) {
                    iw = cw;
                    ih = iw / iR;
                }

                iml = (cw - iw) / 2 - loff;
                imt = (ch - ih) / 2 - toff;
            }
        }
        // If image is to be full screen
        if (el.hasClass('full')) {
            if (cR > iR) {
                // landscape. set width equal to container.  centre image vertically
                iw = cw;
                ih = iw / iR;
                iml = 0;
                imt = -((ih - ch) / 2);
            } else {
                // portrait. set height equal to container. centre image horizontally
                ih = ch;
                iw = ih * iR;
                iml = -((iw - cw) / 2);
                imt = 0;
            }
        }

        if (prop === "margin") {
            el.width(iw).height(ih).css({
                marginTop: imt + "px",
                marginLeft: iml + "px"
            });
        } else if (prop === "position") {
            el.width(iw).height(ih).css({
                top: imt + "px",
                left: iml + "px"
            });
        } else if (prop === "array") {
            imgDim[0] = iw;
            imgDim[1] = ih;
            imgDim[2] = iml;
            imgDim[3] = imt;
            return imgDim;
        }
    }
    /* End Resize Image */

    /**************************************************************************/
    /* resizeSite
    /*
    /* Resize the whole site and set the classes on the divs if it goes large
    /* or mobile
    /**************************************************************************/
    function resizeSite() {
        var ww, wh, iah, minww, minwh, siteratio, iR, pw,
            thisImg, thisText, width, height, imgleft, imgtop,
            sf, fit;

        ww = $(window).width();
        wh = $(window).height();
        iah = wh - headerheight - footerheight;
        siteratio = ww / iah;

        if (ww < minww) { ww = minww; }
        if (wh < minwh) { wh = minwh; }

        // resize the container
        $('#site, .site').width(ww).height(iah);
        $('#proj_img').width(ww).height(iah);
        $('#proj_img').css('width', ww + "px").css('height', iah + "px");


        // If the window is less than 769px hide the arrows
        if ($('body').hasClass('mobile')) {
            $('.arrw').hide();
            $('#proj_img img').each(function () {
                $(this).removeClass('slide').addClass('project_image');
                $(this).css('width', '100%').css('display', 'block').css('height', '');
            });
        } else {
            // otherwise show them
            $('.arrw').show();
            $('#proj_img img').each(function () {
                $(this).addClass('slide').removeClass('project_image');
            });
        }

        // resize each picture
        $('#proj_img .slide').each(function () {

            thisImg = $(this);
            iR = parseFloat(thisImg.data("r"));
            sf = thisImg.data("f");

            if (sf === 200) {
                sf = 1;
                fit = false;
            } else {
                sf = parseFloat(sf / 100);
                fit = true;
            }

            imgResize(thisImg, ww, iah, "position", 0, 0, 0, 0);
        });
        //end resize each picture

        //$(".arrw.left, .arrw.right").height(iah).width((ww / 2) - (ww / 10));
        $(".arrw.left, .arrw.right").not('.small').height(iah).width((ww / 2)).css("top", "0");


        // Resize the projthumbs in the archive-project page
        $('.projthumb').each(function () {
            // MOBILE SITE -> Size of imges is 140x140
            if ($('body').hasClass('mobile')) {
                thisImg = $(this).find('img');
                thisText = $(this).find('.projtext');
                iR = thisImg.data('r');
                // Set the grid to be 3 squares wide on all mobiles
                pw = (ww - (3 * 30) - 20) / 3;

                //console.log(pw);

                // set the size of the projthumb container
                $(this).width(pw).height(pw);

                // square image
                if (iR === 1.0) {
                    thisImg
                        .height(pw)
                        .width(pw)
                        .css('left', '0px')
                        .css('top', '0px');
                    thisText
                        .css('top', (pw + 5) + 'px')
                        .css('left', '0px');
                } else if (iR < 1.0) {
                    // portrait image
                    width = iR * pw;
                    imgleft = (pw - width) / 2;
                    thisImg
                        .height(pw)
                        .width('auto')
                        .css('left', imgleft + 'px')
                        .css('top', '0px');
                    thisText
                        .css('top', (pw + 5) + 'px')
                        //.css('left', imgleft + 'px');
                        .css('left', '0px');
                } else {
                    // landscape image
                    height = pw / iR;
                    imgtop = (pw - height) / 2;
                    thisImg
                        .height('auto')
                        .width(pw)
                        .css('left', '0px')
                        .css('top', imgtop + 'px');
                    thisText
                        .css('top', height + imgtop + 5 + 'px');
                }
                thisText.show();
            } else {
                // DESKTOP Size
                $(this).width('').height('');

                thisImg = $(this).find('img');
                thisText = $(this).find('.projtext');
                iR = thisImg.data('r');
                // square image
                if (iR === 1.0) {
                    thisImg
                        .height(270)
                        .width(270)
                        .css('left', '0px')
                        .css('top', '0px');
                    thisText
                        .css('top', '275px')
                        .css('left', '0px');
                } else if (iR < 1.0) {
                    // portrait image

                    width = iR * 270;
                    imgleft = (270 - width) / 2;
                    thisImg
                        .height(270)
                        .width('auto')
                        .css('left', imgleft + 'px')
                        .css('top', '0px');
                    thisText
                        .css('top', '275px')
                        .css('left', imgleft + 'px');
                } else {
                    // landscape image

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

                /* Add Hover to Desktop images in Project Grid*/
                $(this).hover(
                    function () {
                        $(this).find(".projtext").fadeIn(100);
                    },
                    function () {
                        $(this).find(".projtext").fadeOut(100);
                    }
                );
            }
        });
    }
    /* End Resize Site */


    /**************************************************************************/
    /* adjustFooterHeight
    /*
    /* Slide the footer up or back down
    /**************************************************************************/
    function adjustFooterHeight() {
        var ch = $(window).height() - headerheight - footerheight,
            fh = $('.footer__container').height(),
            bfh = $('.below-footer__container')[0].scrollHeight;

        if (bfh < 33) { bfh = 0; }

        if (bfh > (ch - 150)) {
            bfh = ch - 150;
            $(".below-footer__description").height(bfh).css('overflow-y', 'scroll');
            $(".below-footer__container").css('overflow-y', 'scroll');
        }

        $(".footer__container")
            .stop()
            .animate({
                height: bfh + footerheight
            }, {
                duration: 200,
                easing: 'jswing'
            });
        $(".below-footer__container").stop().animate({
            marginTop: -(bfh)
        }, {
            duration: 200,
            easing: 'jswing'
        });
        $(".below-footer__container").height(bfh);

    }
    /* End: adjustFooterHeight */


    /*******************************************************************************
    * setLargeWindowClasses / setMobileClasses
    * Add the required classes to the various divs
    *******************************************************************************/
    function setLargeWindowClasses () {
        $('#proj_img').addClass('large').removeClass('mobile');
        $('#projthumb-wrap').addClass('large').removeClass('mobile');
        $('#proj_img img').addClass('slide');
        $('body').addClass('large').removeClass('mobile');
        $('.search').show();
        $('.search-icon').show();
        $('.large-menu-search').addClass('is-active');
    }
    function setMobileClasses () {
        $('#proj_img').removeClass('large').addClass('mobile');
        $('#projthumb-wrap').removeClass('large').addClass('mobile');
        $('#proj_img img').removeClass('slide');
        $('.arrw').hide();
        $('body').addClass('mobile').removeClass('large');
        if ($('body').hasClass('post-type-archive-project')) {
          //$('.large-menu-filter').toggleClass('is-active');
          $('.large-menu-search').removeClass('is-active');
          $('.large-menu_mobile').removeClass('is-active');
          //$('.large-menu-search').toggleClass('is-active');
          $('.search').hide();
          $('.search-icon').hide();
        }
        $(".projthumb").off('hover');


    }

    /**************************************************************************/
    /* setLargeFooter
    /*
    /* Adds the text to the footer on large screens
    /**************************************************************************/
    function setLargeFooter() {
      var caption, description, imagedate;

      caption = $('#proj_img .active img').first().nextAll('.caption').first().html();
      description = $('#proj_img .active img').first().nextAll('.description').first().html();
      imagedate = $('#proj_img .active img').first().nextAll('.date').first().html();

      $('.footer__caption').html(caption);
      $('.footer__caption-date').html(imagedate);
      $('.below-footer__description').html(description);
    }

    /**************************************************************************/
    /* expandFooter
    /*
    /* When "read more" is clicked, expand the footer
    /**************************************************************************/
    function expandFooter() {
      /* If the footer is already expanded then lower it */
      if ($('.footer__container').hasClass('expanded')) {
          $('.footer__container').stop().animate({
              height: footerheight
          }, {
              duration: 20,
              easing: 'jswing'
          });
          $('.below-footer__container').stop().animate({
              marginTop: 0
          }, {
              duration: 20,
              easing: 'jswing'
          });
          $('.footer__container').removeClass('expanded');
          $('.footer__more').text(" / Read text");

      } else {
          adjustFooterHeight();
          $('.footer__container').addClass('expanded');
          $('.footer__more').text(" / Hide text");
      }

      //$('.below-footer__container').top
    }


    $(document).ready(function () {
        /* ------ If smaller screen add mobile class to main div ------- */
        if ($(window).width() > 769) {
            setLargeWindowClasses();
        } else {
            setMobileClasses();
        }

        /* ------ On resizing, check the screen size again ------- */
        $(window).resize(function () {
            setTimeout(function() { // try this... give it a short timeout to catch the maximise button
              // Desktop Size Screens
              if ($(window).width() > 769) {
                  if ($('.mobile').length > 0) {

                      setLargeWindowClasses();
                      setLargeFooter();

                      $("#proj_img img").hide();
                      $('#proj_img .active img').first().fadeIn(400);
                  }
              } else { // Mobile Screens
                  setMobileClasses()
              }
              resizeSite();
            }, 100);

        });


        /* ------ Button for menu dropdown on smaller screens ------- */
        $('.header__icon').click(function (e) {
            if ($('body').hasClass('home')) {
                e.preventDefault();
                $('.header__icon').toggleClass('is-active');
                $('.large-menu').toggleClass('is-active');
                $('.large-menu-filter').toggleClass('is-active');
                $('.large-menu_mobile').toggleClass('is-active');
                $('.large-menu-search').toggleClass('is-active');
                $('.sub_logo-large-image').toggleClass('is-hidden');
                return false;
            } else if ($('body').hasClass('mobile')) {

            }
        });

        /* Search Input Box Slideout */
        $('#searchIcon').click(function () {
            if ($('#searchElements').css('left') === '0px') {
                $('#searchElements').stop().animate({
                    left: -302
                }, {
                    duration: 800,
                    easing: 'jswing'
                });
            } else {
                $('#searchElements').stop().animate({
                    left: 0
                }, {
                    duration: 800,
                    easing: 'jswing'
                });
            }
        });


        /* ------ Button for Footer Expand ------- */
        $('.expand').click(function (e) {
            e.preventDefault();
            expandFooter();
        });

        resizeSite();
        //$(window).resize(resizeSite);

        // Hide Images and Fade in the first one
        if (!$.browser.msie && $(window).width() > 769) {
            if ($("#proj_img").length > 0) {
                //hide all images and show the first one
                $("#proj_img img").hide();
                $('#proj_img .active img').first().fadeIn(400);
                setLargeFooter();
            }
        }

        // Project Slider
        $("#proj_img.home .arrw").click(function () {
            var dir, thislink, thisSlideShow, slideToShow, thisProject, current,
                imgDim, currentLeft, nextCurrentLeft, nextNextLeft,
                caption, imagedate, description,
                ww, wh, cw, ch;

            ww = $(window).width();
            wh = $(window).height();

            cw = ww;
            ch = wh - footerheight - headerheight;

            thislink = $(this);

            if (thislink.hasClass("left")) {
                dir = "l";
            } else if (thislink.hasClass("right")) {
                dir = "r";
            }

            thisSlideShow = $("#proj_img");
            thisProject = $(".proj.active");
            current = $(".proj.active .slide:visible");

            if (dir === "l") {
                if (thisProject.find(".slide").length > 1) {
                    if (current.prevAll(".proj.active .slide").first().length > 0) {
                        // if the current slide is not the first then move one to the left.
                        slideToShow = current.prevAll(".proj.active .slide").first();
                    } else {
                        // if the current slide IS the first one then slide to the last slide
                        slideToShow = $(".proj.active .slide").eq($(".proj.active .slide").length - 1);
                    }

                    /* If the footer is expanded, shrink it */
                    if ($('.footer__container').hasClass('expanded')) {
                        $('.expand').click();
                    }
                    // Fading or Sliding?
                    if (thisSlideShow.hasClass("fading")) {
                        current.fadeOut(fadeOutSpeed);
                        slideToShow.fadeIn(fadeInSpeed);
                    } else if (thisSlideShow.hasClass("sliding")) {
                        imgDim = imgResize(slideToShow, cw, ch, "array", 0, 0, 0, 0);
                        currentLeft = current.offset().left;
                        nextCurrentLeft = currentLeft + cw + gutter;
                        nextNextLeft = (imgDim[2] - cw - gutter);

                        // Retrieve the information for the next slide
                        caption = slideToShow.nextAll('.caption').first().html();
                        imagedate = slideToShow.nextAll('.date').first().html();
                        description = slideToShow.nextAll('.description').first().html();


                        current
                            .stop()
                            .animate({
                                left: nextCurrentLeft
                            }, {
                                duration: speed,
                                easing: easing
                            })
                            .hide(0)
                            .css("left", currentLeft + "px");

                        slideToShow
                            .css("left", nextNextLeft + "px")
                            .show(0)
                            .stop()
                            .animate({
                                left: imgDim[2]
                            }, speed, easing, function () {
                                $('.footer__caption').html(caption);
                                $('.footer__caption-date').html(imagedate);
                                $('.below-footer__description').html(description);
                            });
                    }
                }
            } else if (dir === "r") {
            /**********   SLIDE RIGHT *********/

                if (thisProject.find(".slide").length > 1) {
                    if (current.nextAll(".proj.active .slide").first().length > 0) {
                        // If we're not on the last slide, move one forward
                        slideToShow = current.nextAll(".proj.active .slide").first();

                    } else {
                        // if we are on the last slide move back to the start
                        slideToShow = $(".proj.active .slide").first();
                    }

                    /* If the footer is expanded, shrink it */
                    if ($('.footer__container').hasClass('expanded')) {
                        $('.expand').click();
                    }

                    if (thisSlideShow.hasClass("fading")) {
                        current.fadeOut(fadeOutSpeed);
                        slideToShow.fadeIn(fadeInSpeed);
                    } else if (thisSlideShow.hasClass("sliding")) {
                        imgDim = imgResize(slideToShow, cw, ch, "array", 0, 0, 0, 0);
                        currentLeft = current.offset().left;
                        nextCurrentLeft = -(cw + gutter);
                        nextNextLeft = (imgDim[2] + cw + gutter);

                        caption = slideToShow.nextAll('.caption').first().html();
                        imagedate = slideToShow.nextAll('.date').first().html();
                        description = slideToShow.nextAll('.description').first().html();

                        current
                            .stop()
                            .animate({
                                left: nextCurrentLeft
                            }, {
                                duration: speed,
                                easing: easing
                            })
                            .hide(0)
                            .css("left", currentLeft + "px");
                        slideToShow
                            .css("left", nextNextLeft + "px")
                            .show(0)
                            .stop()
                            .animate({
                                left: imgDim[2]
                            }, speed, easing, function () {
                                $('.footer__caption').html(caption);
                                $('.footer__caption-date').html(imagedate);
                                $('.below-footer__description').html(description);
                            });
                    }
                }
            }

            return false;
        }); // close >> #proj_img.proj .arrw click

        // Use Keyboard instead of Mouse
        // For Index and Archive-Project it's ok
        $(document).keydown(function (e) {
            if (e.which === 37 && !e.metaKey) {
                e.preventDefault();
                $(".arrw.left").click();
            } else if (e.which === 39 && !e.metaKey) {
                e.preventDefault();
                $(".arrw.right").click();
            }
        });

        // NOTE: jQuery.touchSwipe.min.js
        // NOTE: this is just for touch screens that are large.. Not mobile pages
        $(".arrw").swipe({
            //Generic swipe handler for all directions
            swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                if (direction === "left") {
                    $('.arrw.right').click();
                }
                if (direction === "right") {
                    $('.arrw.left').click();
                }
            }
        });
        // NOTE: Change to this format?
        // $('.arrw').swipe({swipeLeft: swipeProjectLeft, swipeRight: swipeProjectRight, allowPageScroll: "vertical"});

        /* NOTE: Start More button for cover images in mobile size */
        $('.more').click(function () {
            if ($(this).html() === '/ Read text') {
                $(this).html('/ Hide text');
                $(this).nextAll('.description').first().addClass('active');
            } else {
                $(this).html('/ Read text');
                $(this).nextAll('.description').first().removeClass('active');
            }
        });

        // NOTE: If you scroll past the image then close the more info box
        $(window).scroll(function () {
            $('.description.active').each(function () {
                if ($(window).scrollTop() > $(this).nextAll('img').first().position().top) {
                    $(this).prevAll('.more').first().click();
                    $(window).scrollTop($(this).nextAll('img').first().position().top);
                } else if ($(window).scrollTop() + $(window).height() < $(this).position().top) {
                    $(this).prevAll('.more').first().click();
                }
            });
        });
        /* NOTE: End More button for cover images in mobile size */

    }); // close >> document(ready)

})(jQuery);
