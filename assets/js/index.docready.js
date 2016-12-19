(function($) {

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

    $(document).ready(function() {
        /* ------ If smaller screen add mobile class to main div ------- */
        if ($(window).width() > 769) {
            $('#proj_img').addClass('large').removeClass('mobile');
            $('#projthumb-wrap').addClass('large').removeClass('mobile');
            $('#proj_img img').addClass('slide');
            $('body').addClass('large').removeClass('mobile');
            $('.search').show();
            $('.search-icon').show();
            $('.large-menu-search').addClass('is-active');
        } else {
            $('#proj_img').removeClass('large').addClass('mobile');
            $('#projthumb-wrap').removeClass('large').addClass('mobile');
            $('#proj_img img').removeClass('slide');
            $('.arrw').hide();
            $('body').addClass('mobile').removeClass('large');

        }

        /* ------ On resizing, check the screen size again ------- */
        $(window).resize(function() {

            // Desktop Size Screens
            if ($(window).width() > 769) {
                if ($('.mobile').length > 0) {
                    $('#proj_img').addClass('large').removeClass('mobile');
                    $('#projthumb-wrap').addClass('large').removeClass('mobile');
                    $('body').addClass('large').removeClass('mobile');
                    $('#proj_img img').addClass('slide');

                    $('.search').show();
                    $('.search-icon').show();
                    $('.large-menu-search').addClass('is-active');

                    $("#proj_img img").hide();
                    $('#proj_img .active img').first().fadeIn(400);

                    var caption = $('#proj_img .active img').first().nextAll('.caption').first().html();
                    var description = $('#proj_img .active img').first().nextAll('.description').first().html();
                    var imagedate = $('#proj_img .active img').first().nextAll('.date').first().html();

                    $('.footer__caption').html(caption);
                    $('.footer__caption-date').html(imagedate);
                    $('.below-footer__description').html(description);

                }
            }
            // Mobile Screens
            else {
                $('body').removeClass('large').addClass('mobile');
                $('#proj_img').removeClass('large').addClass('mobile');
                $('#projthumb-wrap').removeClass('large').addClass('mobile');
                $('.large-menu-search').removeClass('is-active');

                $('#proj_img img').removeClass('slide');

                $('.arrw').hide();

                $(".projthumb").off('hover');
                $('.search').hide();
                $('.search-icon').hide();

            }
            resizeSite();
        });


        /* ------ Button for menu dropdown on smaller screens ------- */
        $('.header__icon').click(function(e) {
            if ($('body').hasClass('home')) {
                e.preventDefault();
                $('.header__icon').toggleClass('is-active');
                $('.large-menu').toggleClass('is-active');
                $('.large-menu-filter').toggleClass('is-active');
                $('.large-menu_mobile').toggleClass('is-active');
                $('.large-menu-search').toggleClass('is-active');
                return false;
            }
            // archive-project in mobile mode
            else if ($('body').hasClass('mobile')) {
                e.preventDefault();
                //$('.header__icon').toggleClass('is-active');
                //$('.large-menu').toggleClass('is-active');
                $('.large-menu-filter').toggleClass('is-active');
                $('.large-menu_mobile').toggleClass('is-active');
                $('.large-menu-search').toggleClass('is-active');
            }
        });

        /* Search Input Box Slideout */
        jQuery('#searchIcon').click(function() {
            if (jQuery('#searchElements').css('left') == '0px') {
                jQuery('#searchElements').stop().animate({
                    left: -302
                }, {
                    duration: 800,
                    easing: 'jswing'
                });
            } else {
                jQuery('#searchElements').stop().animate({
                    left: 0
                }, {
                    duration: 800,
                    easing: 'jswing'
                });
            }
        });


        /* ------ Button for Footer Expand ------- */
        $('.expand').click(function(e) {
            e.preventDefault();
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
                $('.footer__more').text(" / Read More");

            } else {
                adjustFooterHeight();
                $('.footer__container').addClass('expanded');
                $('.footer__more').text(" / Hide text");
            }

            //$('.below-footer__container').top
        });

        resizeSite();
        //$(window).resize(resizeSite);

        // Hide Images and Fade in the first one
        if (!$.browser.msie && $(window).width() > 769) {
            if ($("#proj_img").length > 0) {
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
        $("#proj_img.home .arrw").click(function() {
            var dir, thislink;
            var thisSlideShow, slideToShow, thisProject, current;
            var imgDim, currentLeft, nextCurrentLeft, nextNextLeft, caption, imagedate, description;

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

            //resizeSite();


            thisSlideShow = $("#proj_img");
            thisProject = $(".proj.active");
            current = $(".proj.active .slide:visible");

            if (dir == "l") {
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
                            }, speed, easing, function() {
                                $('.footer__caption').html(caption);
                                $('.footer__caption-date').html(imagedate);
                                $('.below-footer__description').html(description);
                            });
                    }
                }
            }
            /**********   SLIDE RIGHT *********/
            else if (dir == "r") {
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
                            }, speed, easing, function() {
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
        // TODO: This should do different on small screens?
        // For Index and Archive-Project it's ok
        $(document).keydown(function(e) {
            if (e.which == 37 && !e.metaKey) {
                e.preventDefault();
                $(".arrw.left").click();
            } else if (e.which == 39 && !e.metaKey) {
                e.preventDefault();
                $(".arrw.right").click();
            }
        });

        // NOTE: jQuery.touchSwipe.min.js
        $(".arrw").swipe({
            //Generic swipe handler for all directions
            swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
                if (direction == "left") {
                    $('.arrw.right').click();
                }
                if (direction == "right") {
                    $('.arrw.left').click();
                }
            }
        });


        /* NOTE: Start More button for cover images in mobile size */
        $('.more').click(function() {
            if ($(this).html() == '/ Read More') {
                $(this).html('/ Hide Text');
                $(this).nextAll('.description').first().addClass('active');
            } else {
                $(this).html('/ Read More');
                $(this).nextAll('.description').first().removeClass('active');
            }
        });

        // NOTE: If you scroll past the image then close the more info box
        $(window).scroll(function() {
            $('.description.active').each(function() {
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


    /**************************************************************************/
    /* Resize Site */
    /**************************************************************************/
    function resizeSite() {
        var ww, wh, iah, minww, minwh, siteratio;

        ww = $(window).width();
        wh = $(window).height();
        iah = wh - headerheight - footerheight;
        siteratio = ww / iah;

        if (ww < minww) ww = minww;
        if (wh < minwh) wh = minwh;

        // resize the container
        $('#site, .site').width(ww).height(iah);
        $('#proj_img').width(ww).height(iah);
        $('#proj_img').css('width', ww + "px").css('height', iah + "px");


        // If the window is less than 769px hide the arrows
        if ($('body').hasClass('mobile')) {
            $('.arrw').hide();
            $('#proj_img img').each(function() {
                $(this).removeClass('slide').addClass('project_image');
                $(this).css('width', '100%').css('display', 'block').css('height', '');
            });
        } else {
            // otherwise show them
            $('.arrw').show();
            $('#proj_img img').each(function() {
                $(this).addClass('slide').removeClass('project_image');
            });
        }

        // resize each picture
        $('#proj_img .slide').each(function() {
            var thisimg, iR, sf, fit;

            thisimg = $(this);
            iR = parseFloat(thisimg.data("r"));
            sf = thisimg.data("f");

            if (sf == 200) {
                sf = 1;
                fit = false;
            } else {
                sf = parseFloat(sf / 100);
                fit = true;
            }

            if ($(this).hasClass("full")) {

                containerW = ww;
                containerH = iah;
                containerAspect = ww / iah;
                imageAspect = iR;

                if (containerAspect < imageAspect) {
                    var iw = iah * imageAspect;
                    $(this)
                        .css('width', iw)
                        .css('height', iah)
                        .css('top', '0')
                        .css('left', (-(iw - ww) / 2));
                } else {
                    var ih = ww / imageAspect;
                    $(this)
                        .css('width', ww)
                        .css('height', ih)
                        .css('top', (-(ww / imageAspect - iah) / 2))
                        .css('left', '0');
                }
            } /*else { */
                imgResize(thisimg, ww, iah, "position", 0, 0, 0, 0);
            /*}*/
        });
        //end resize each picture

        //$(".arrw.left, .arrw.right").height(iah).width((ww / 2) - (ww / 10));
        $(".arrw.left, .arrw.right").not('.small').height(iah).width((ww/2) - (ww/10)).css("top","0");


        // Resize the projthumbs in the archive-project page
        $('.projthumb').each(function() {
            // MOBILE SITE -> Size of imges is 140x140
            if ($('body').hasClass('mobile')) {
                thisImg = $(this).find('img');
                thisText = $(this).find('.projtext');
                iR = thisImg.data('r');
                // Set the grid to be 3 squares wide on all mobiles
                var pw = (ww - (3*30) - 20) / 3;
                console.log(pw);
                // set the size of the projthumb container
                $(this).width(pw).height(pw);

                // square image
                if (iR == 1.0) {
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
                        .css('left', 0 + 'px');
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
                if (iR == 1.0) {
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
                    function() {
                        $(this).find(".projtext").fadeIn(100);
                    },
                    function() {
                        $(this).find(".projtext").fadeOut(100);
                    }
                );
            }
        });
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
        var ch = $(window).height() - headerheight - footerheight;
        var fh = $('.footer__container').height();
        var bfh = $('.below-footer__container')[0].scrollHeight;
        if (bfh < 33) bfh = 0;

        if(bfh > (ch - 150)) {
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

})(jQuery);
