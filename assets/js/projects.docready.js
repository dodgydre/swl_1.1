(function($) {

    //"use strict";

    // Global Variables
    var ww = $(window).width(),
        wh = $(window).height(),
        headerheight = 105,
        footerheight = 45,
        iah = wh - headerheight - footerheight,
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


        /* -------  If smaller screen add mobile class to main div --------- */
        if ($(window).width() > 769) {
            $('body').addClass('large').removeClass('mobile');
            $('#proj_img').addClass('large').removeClass('mobile');
            $('#proj_img_container').addClass('large').removeClass('mobile');
            $('#proj_img img').addClass('slide');
        } else {
            $('body').removeClass('large').addClass('mobile');
            $('#proj_img').removeClass('large').addClass('mobile');
            $('#proj_img_container').removeClass('large').addClass('mobile');
            $('#proj_img img').removeClass('slide');
            $('.single-footer__more').text(' / More');
            $('.arrw').hide();
        }

        resizeSite();

        /* -------  Button for footer expand --------- */
        if(/*$('body').hasClass('large')*/1) {
            $('.single-expand').click(function(e) {
                e.preventDefault();
                /* IF the footer is already expanded then lower it */
                if ($('.single-footer__container').hasClass('expanded')) {
                    $('.single-footer__container').stop().animate({
                        height: footerheight
                    }, {
                        duration: 20,
                        easing: 'jswing'
                    });
                    $('.single-below-footer__container').stop().animate({
                        marginTop: 0
                    }, {
                        duration: 20,
                        easing: 'jswing'
                    });
                    $('.single-footer__container').removeClass('expanded');
                    if($('body').hasClass('large')) {
                        $('.single-footer__more').text(' / Read More');
                    } else {
                        $('.single-footer__more').text(' / More');
                    }
                } else {
                    adjustFooterHeight();
                    $('.single-footer__container').addClass('expanded');
                    if($('body').hasClass('large')) {
                        $('.single-footer__more').text(' / Hide Text');
                    } else {
                        $('.single-footer__more').text(' / Hide');
                    }
                }
            });
        }


        /* -------  Change Browser Address Bar on Change Project --------- */
        // TODO: Check
        var History = window.History;
        if (History.enabled) {
            History.Adapter.bind(window, 'statechange', function() {
                var State = History.getState();
                var url = document.createElement('a');
                url.href = State.url;
                getPage(url.pathname, false);
            });
            var hash = window.location.hash;
            if (hash) {
                History.Adapter.trigger(window, 'statechange');
            }
        }


        // Hide Images and Fade in the first one
        if (!$.browser.msie) {
            if($('body').hasClass('large')) {
                if ($("#proj_img").length > 0) {
                    $("#proj_img img").hide();
                    $('#proj_img .active img').first().fadeIn(400);
                }
            } else {
                if ($("#proj_img").length > 0) {
                    var caption = $('#proj_img .active img').first().nextAll('.single-project-caption').html();
                    var description = $('#proj_img .active img').first().nextAll('.single-project-description').html();
                    var imagedate = $('#proj_img .active img').first().nextAll('.single-project-date').html();

                    $('.single-footer__caption').html(caption);
                    $('.single-footer__caption-date').html(imagedate);
                    $('.single-below-footer__description').html(description);
                }
            }
        }

        /* -------  On resizing, check the screen size again --------- */
        $(window).resize(function() {
            if ($(window).width() > 769) {
                if ($('.mobile').length > 0) {
                    $('body').addClass('large').removeClass('mobile');
                    $('#proj_img').addClass('large').removeClass('mobile');
                    $('#proj_img_container').addClass('large').removeClass('mobile');

                    // When switching back to large size, first hide all images,
                    // then only show the current active project image
                    $('#proj_img img').hide();
                    $('#proj_img .active img').first().fadeIn(400);

                    // reset the footer variables for the active project
                    var caption = $('#proj_img .active img').first().nextAll('.single-project-caption').first().html();
                    var description = $('#proj_img .active img').first().nextAll('.single-project-description').first().html();
                    var imagedate = $('#proj_img .active img').first().nextAll('.single-project-date').first().html();

                    $('.single-footer__caption').html(caption);
                    $('.single-footer__caption-date').html(imagedate);
                    $('.single-below-footer__description').html(description);

                    // Bring back the arrows if we go big again.
                    $('.arrw').show();
                }
            } else {
                $('body').removeClass('large').addClass('mobile');
                $('#proj_img').removeClass('large').addClass('mobile');
                $('#proj_img_container').removeClass('large').addClass('mobile');

                // take away the arrows when we go small.
                $('.arrw').hide();
            }
            resizeSite();
        });

        // Project Table Sorting?

        // Project Slider
        $("#proj_img.project .arrw").click(function() {
            var dir, thislink;
            var thisSlideShow, slideToShow, thisProject, current;
            var imgDim, currentLeft, nextCurrentLeft, nextNextLeft, caption, imagedate, description;

            ww = $(window).width();
            wh = $(window).height();

            cw = ww;
            ch = wh - footerheight - headerheight;

            thislink = $(this);

            if ($(this).hasClass("left")) {
                dir = "l";
            } else if ($(this).hasClass("right")) {
                dir = "r";
            } else if ($(this).hasClass("up")) {
                dir = "u";
            } else if ($(this).hasClass("down")) {
                dir = "d";
            }

            resizeSite();


            var thisSlideShow = $("#proj_img");
            var thisProject = $(".proj.active");
            var current = $(".proj.active .slide:visible");
            var imgDim, slideToShow, currentLeft, nextCurrentLeft, nextNextLeft;
            var captionText;

            /*  ----- CLICK LEFT (Prev Slide) -------*/
            if (dir == "l") {
                if (thisProject.find(".slide").length > 1) {
                    // if the current slide is not the first then move one to the left.
                    if (current.prevAll(".proj.active .slide").first().length > 0) {
                        slideToShow = current.prevAll(".proj.active .slide").first();
                    }
                    // if the current slide IS the first one then slide to the last slide
                    else {
                        slideToShow = $(".proj.active .slide").eq($(".proj.active .slide").length - 1);
                    }

                    /* If the footer is epanded, shrink it */
                    if ($('.single-footer__container').hasClass('expanded')) {
                        $('.single-expand').click();
                    }

                    if (thisSlideShow.hasClass("fading")) {
                        current.fadeOut(fadeOutSpeed);
                        slideToShow.fadeIn(fadeInSpeed);
                    } else if (thisSlideShow.hasClass("sliding")) {
                        imgDim = imgResize(slideToShow, cw, ch, "array", 0, 0, 0, 0);
                        currentLeft = current.offset().left;
                        nextCurrentLeft = currentLeft + cw + gutter;
                        nextNextLeft = ($imgDim[2] - cw - gutter);

                        current.stop().animate({
                            left: nextCurrentLeft
                        }, {
                            duration: speed,
                            easing: easing
                        }).hide(0).css("left", currentLeft + "px");
                        slideToShow.css("left", nextNextLeft + "px").show(0).stop().animate({
                            left: imgDim[2]
                        }, {
                            duration: speed,
                            easing: easing
                        });
                    }
                    captionText = slideToShow.next("span").html();
                    $("footer .imgcap").html(captionText);
                    if (slideToShow.hasClass("video")) {
                        $(".arrw.left, .arrw.right").height(ch / 2);
                        $(".arrw.down").hide();
                    } else {
                        $("arrw.left, .arrw.right").height(ch - 120);
                        $("arrw.down").show();
                    }
                    // If we want the image numebr...
                    // TODO: Add the diagram to the bottom right showing image boxes and update
                    //$("#footer .ic").text(slideToShow.index(".proj.active .slide")+1);
                }
            }

            /*  ----- CLICK RIGHT (Next Slide) -------*/
            else if (dir == "r") {
                if (thisProject.find(".slide").length > 1) {
                    if (current.nextAll(".proj.active .slide").first().length > 0) {
                        // If we're not on the last slide, move one forward
                        slideToShow = current.nextAll(".proj.active .slide").first();
                    } else {
                        // if we are on the last slide move back to the start
                        slideToShow = $(".proj.active .slide:first-child");
                    }

                    /* If the footer is expanded, shrink it */
                    if ($('.single-footer__container').hasClass('expanded')) {
                        $('.single-expand').click();
                    }

                    if (thisSlideShow.hasClass("fading")) {
                        current.fadeOut(fadeOutSpeed);
                        slideToShow.fadeIn(fadeInSpeed);
                    } else if (thisSlideShow.hasClass("sliding")) {

                        imgDim = imgResize(slideToShow, cw, ch, "array", 0, 0, 0, 0);
                        currentLeft = current.offset().left;
                        nextCurrentLeft = -(ww + gutter);
                        nextNextLeft = ($imgDim[2] + ww + gutter);
                        current.stop().animate({
                            left: nextCurrentLeft
                        }, {
                            duration: speed,
                            easing: easing
                        }).hide(0).css("left", currentLeft + "px");
                        slideToShow.css("left", nextNextLeft + "px").show(0).stop().animate({
                            left: imgDim[2]
                        }, {
                            duration: speed,
                            easing: easing
                        });
                    }

                    captionText = slideToShow.next("span").html();
                    $("#footer .imgcap").html(captionText);
                    if (slideToShow.hasClass("video")) {
                        $(".arrw.left, .arrw.right").height(ch / 2);
                        $(".arrw.down").hide();
                    } else {
                        $(".arrw.left, .arrw.right").height(ch - 120);
                        $(".arrw.down").show();
                    }
                }
            }
            /*  ----- CLICK UP OR DOWN (Next / Prev PROJECT) -------*/
            else if (dir == "u" || dir == "d") {
                var href = thislink.attr("href");
                History.pushState(null, null, href);
            }
            return false;
        }); // close >> #proj_img.project .arrw click

        // Use Keyboard instead of Mouse
        $(document).keydown(function(e) {
            if (e.which == 37 && !e.metaKey) {
                e.preventDefault();
                $(".arrw.left").click();
            } else if (e.which == 38 && !e.metaKey) {
                e.preventDefault();
                $(".arrw.up").click();
            } else if (e.which == 39 && !e.metaKey) {
                e.preventDefault();
                $(".arrw.right").click();
            } else if (e.which == 40 && !e.metaKey) {
                e.preventDefault();
                $(".arrw.down").click();
            }
        });

        // NOTE: jQuery.touchSwipe.min.js
        if($('body').hasClass('large')) {
            $(".arrw").swipe({
                //Generic swipe handler for all directions
                swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
                    console.log("You swiped " + direction);
                    if (direction == "left") {
                        $('.arrw.right').click();
                    }
                    if (direction == "right") {
                        $('.arrw.left').click();
                    }
                    if (direction == "down") {
                        $('.arrw.up').click();
                    }
                    if (direction == "up") {
                        $('.arrw.down').click();
                    }
                }
            });
        } else {
            /*$('.proj').swipe({
                swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
                    console.log("You swiped " + direction);
                    if(direction == "left") {
                        var href = $('.arrw.down').attr('href');
                        History.pushState(null, null, href);
                    }
                    if(direction == "right") {
                        var href = $('.arrw.up').attr('href');
                        History.pushState(null, null, href);

                    }
                }
            })*/
            $('.proj').on("swiperight",function(e) {
                e.preventDefault();
                var href = $('.arrw.up').attr('href');
                History.pushState(null, null, href);
            }).on("swipeleft", function(e) {
                e.preventDefault();
                var href = $('.arrw.down').attr('href');
                History.pushState(null, null, href);
            });
        }

        getPrevAndNextButtons($(".proj.active"));
        loadPrevAndNextProject($(".proj.active"));

    }); // close >> document(ready)

    /*$(window).load(function() {
        getPrevAndNextButtons($(".proj.active"));
        loadPrevAndNextProject($(".proj.active"));
    });*/


    /* Resize Site */
    function resizeSite() {
        ww = $(window).width();
        wh = $(window).height();
        iah = wh - headerheight - footerheight;
        siteratio = ww / iah;

        if (ww < minww) ww = minww;
        if (wh < minwh) wh = minwh;

        var iR, sf, fit;

        // resize the container
        $('#site, .scrollwrap, .site').width(ww).height(iah);
        $('#proj_img').width(ww).height(iah);
        $('#proj_img').css('width', ww + "px").css('height', iah + "px");

        // If the window is less than 769 hide the arrows and size the images.
        if ($('body').hasClass('mobile')) {
            $('.arrw').hide();
            $('#proj_img img').each(function() {
                $(this).removeClass('slide').addClass('single_project_image');
                //$(this).hide();
                $(this).css('width', ww + 'px').css('height', '').css('display', '');
            });
            /*$('.proj.active img').each(function() {
                $(this).css('display', 'block').show();
            });*/
            $('.proj_wrapper').each(function() {
                $(this).css('width', ww + 'px');
            });
        } else if ($('body').hasClass('large')) {
            $('#proj_img img').each(function() {
                $(this).removeClass('single_project_image').addClass('slide');
            });
        }

        // resize each picture
        $('#proj_img .slide').each(function() {
            var thisimg = $(this);
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
                //thisimg = $(this);
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
                        .css('left', (-(iah * imageAspect - ww) / 2));
                } else {
                    var ih = ww / imageAspect;
                    $(this)
                        .css('width', ww)
                        .css('height', ih)
                        .css('top', (-(ww / imageAspect - iah) / 2))
                        .css('left', '0');
                }

            } else {
                imgResize(thisimg, ww, iah, "position", 0, 0, 0, 0);
            }
        });
        //end resize each picture

        var currentSlide = $(".slideshow .slide:visible");
        if (currentSlide.length > 0 && currentSlide.hasClass("video")) {
            if ($(".arrw.down").length > 0) {
                $(".arrw.left, .arrw.right").height(iah / 2).width((ww / 2) - (ww / 10));
                $(".arrw.down").hide();
            } else {
                $(".arrw.left, .arrw.right").height(iah / 1.5).width((ww / 2) - (ww / 10));
            }
        } else {
            $(".arrw.left, .arrw.right").height(iah - iah / 4).width((ww / 2) - (ww / 10));
            $(".arrw.down").show();
        }
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
        var ch = $(window).height() - footerheight - headerheight;
        var fh = $('.single-footer__container').height();
        var bfh = $('.single-below-footer__container').outerHeight();
        if (bfh < 33) bfh = 0;

        if(bfh > (ch - 150)) {
            bfh = ch - 150;
            $(".single-below-footer__description").height(bfh).css('overflow-y', 'scroll');
            $(".single-below-footer__container").css('overflow-y', 'scroll');
        }

        $('.single-footer__container')
            .stop()
            .animate({
                height: bfh + footerheight
            }, {
                duration: 200,
                easing: 'jswing'
            });
        $('.single-below-footer__container')
            .stop()
            .animate({
                marginTop: -(bfh)
            }, {
                duration: 200,
                easing: 'jswing'
            });
        $(".single-below-footer__container").height(bfh);
    }
    /* End: adjustFooterHeight */

    /* Get Current Page URL. If the new href state is
     * different then go to different project */
    function getPage(href, push) {
        if (href[0] != "/") {
            href = "/" + href;
        }
        if (currenturl[0] != "/") {
            currenturl = "/" + currenturl;
        }

        var l = href.split("/");
        var cl = currenturl.split("/");

        if (href != currenturl) {
            if (l[2] == "project") {
                // send the slug only
                goToProject(href, l[3]);
            }
            currenturl = href;
        }
    }
    /* End Get Current Page URL */

    /* Go to Project */
    function goToProject(href, slug) {
        var dir;
        var thisSlideShow = $('#proj_img');
        var thisProj = $(".proj.active");
        if($('body').hasClass('large')) {
            var current = $(".proj.active .slide:visible");
        } else {
            var current = $(".proj.active");
        }

        nextProj = $("#p_" + slug);
        if (nextProj.index() > thisProj.index()) {
            if (thisProj.index() === 0 && nextProj.index() == $(".proj").length - 1) {
                dir = "u";
            } else {
                dir = "d";
            }
        } else {
            if (thisProj.index() == $(".proj").length - 1 && nextProj.index() === 0) {
                dir = "d";
            } else {
                dir = "u";
            }
        }

        if (nextProj.find('.proj_wrapper').first().html() === "") {
            getNewProject(thisProj, current, nextProj, dir, true);
        } else {
            slideToProject(thisProj, current, nextProj, dir);
        }

    }

    function getNewProject(thisProject, current, nextProj, dir, doSlide) {
        var project_id = nextProj.data("id");

        // TODO: Add Ajax to retrieve the next project images
        jQuery.ajax({
            url: ajaxgetprojectimgs.ajaxurl,
            type: 'post',
            data: {
                action: 'ajax_get_project_imgs',
                project_id: project_id,
            },
            dataType: 'json',
            success: function(result) {
                jQuery.each(result, function(index, value) {
                    nextProj.append(value);
                });
                resizeSite();

                if (doSlide) {
                    slideToProject(thisProject, current, nextProj, dir);
                }
            }
        });
    }

    /* Load Previous and Next Project Images */
    function loadPrevAndNextProject(thisProj) {
        // is the next project the next one along?
        var nextProj, prevProj;

        if (thisProj.next(".proj").first().length > 0) {
            nextProj = thisProj.nextAll(".proj").first();
        } else {
            // if not then the next project is the first project
            nextProj = $(".proj:first-child");
        }
        // If the next project is currently empty, load in the images
        if (nextProj.html() === "") {
            getNewProject(thisProj, "", nextProj, "", false);
        }

        // is the previous project one back?
        if (thisProj.prevAll(".proj").first().length > 0) {
            prevProj = thisProj.prevAll(".proj").first();
        } else {
            // if not then the previous project is the last project
            prevProj = $(".proj").eq($("proj").length - 1);
        }

        // If the previous project is currently empty, load in the images
        if (prevProj.html() === "") {
            getNewProject(thisProj, "", prevProj, "", false);
        }
    }
    /* End Load Previous and Next Project Images */

    function slideToProject(thisProj, current, nextProj, dir) {
        var currentLeft, slideToShow, currentTop, directory, imgDim, table, newLeft;
        var caption, description, imagedate;

        var ww = $(window).width();

        if($('body').hasClass('large')) {
            currentLeft = current.offset().left;
            slideToShow = nextProj.find(".slide:first-child");

            imgDim = imgResize(slideToShow, ww, iah, "array", 0, 0, 0, 0);

            currentTop = current.offset().top;

            /* If the footer is epanded, shrink it */
            if ($('.single-footer__container').hasClass('expanded')) {
                $('.single-expand').click();
            }

            if (dir == "u") {
                current.stop().animate({
                    top: currentTop + wh + gutter
                }, {
                    duration: speed - 100,
                    easing: easing
                }).hide().css("top", currentTop + "px");

                slideToShow.css("top", (imgDim[3] - wh - gutter) + "px").show(0).stop().animate({
                    top: imgDim[3]
                }, {
                    duration: speed,
                    easing: easing
                });

                newLeft = ($(".proj.active .slide").length - 1) * 13;
            } else {
                current.stop().animate({
                    top: (currentTop - wh)
                }, {
                    duration: speed - 100,
                    easing: easing
                }).hide(0).css("top", currentTop + "px");
                slideToShow.css("top", (ww + imgDim[3]) + "px").show(0).stop().animate({
                    top: imgDim[3]
                }, {
                    duration: speed,
                    easing: easing
                });
            }
        } else {
            // On mobile device so slide is left and right

            slideToShow = nextProj;

            /* If the footer is epanded, shrink it */
            if ($('.single-footer__container').hasClass('expanded')) {
                $('.single-expand').click();
            }

            if (dir == "u") {
                current.stop().animate({
                    left: ww
                }, {
                    duration: 500,
                    easing: easing
                }).hide().css("left", "0px");

                slideToShow.css("left", "-" + ww + "px").show(0).stop().animate({
                    left: 0
                }, {
                    duration: 500,
                    easing: easing
                });

            } else {
                current.stop().animate({
                    left: -ww
                }, {
                    duration: 500,
                    easing: easing
                }).hide(0).css("left", "0px");

                slideToShow.css("left", ww + "px").show(0).stop().animate({
                    left: 0
                }, {
                    duration: 500,
                    easing: easing
                });
            }
        }

        thisProj.removeClass("active");
        thisProj.find('.single-project-caption').addClass('inactive');
        thisProj.find('.single-project-description').addClass('inactive');
        thisProj.find('.single-project-date').addClass('inactive');

        nextProj.addClass("active");
        nextProj.find('.single-project-caption').removeClass('inactive');
        nextProj.find('.single-project-description').removeClass('inactive');
        nextProj.find('.single-project-date').removeClass('inactive');

        caption = $('#proj_img .active img').first().nextAll('.single-project-caption').first().html();
        description = $('#proj_img .active img').first().nextAll('.single-project-description').first().html();
        imagedate = $('#proj_img .active img').first().nextAll('.single-project-date').first().html();

        $('.single-footer__caption').html(caption);
        $('.single-footer__caption-date').html(imagedate);
        $('.single-below-footer__description').html(description);

        getPrevAndNextButtons(nextProj);
        document.title = (nextProj.data("title")) + "- Structure Workshop";
        loadPrevAndNextProject(nextProj);
    }

    function getPrevAndNextButtons(thisProj) {
        var nextProj, prevProj, table, directory, nextURL, prevURL;

        table = thisProj.parent().data("t");
        if (table == "projects") {
            directory = "project";
        }

        if (thisProj.next(".proj").first().length > 0) {
            nextProj = thisProj.nextAll(".proj").first();
        } else {
            // if not then the next project is the first project
            nextProj = $(".proj:first-child");
        }

        // is the previous project one back?
        if (thisProj.prevAll(".proj").first().length > 0) {
            prevProj = thisProj.prevAll(".proj").first();
        } else {
            // if not then the previous project is the last project
            prevProj = $(".proj").eq($("proj").length - 1);
        }

        nextURL = siteUrl + "/" + directory + "/" + nextProj.attr("id").replace("p_", "");
        prevURL = siteUrl + "/" + directory + "/" + prevProj.attr("id").replace("p_", "");

        $(".arrw.down").attr("href", nextURL).attr("data-id", nextProj.data("id"));
        $(".arrw.up").attr("href", prevURL).attr("data-id", prevProj.data("id"));
    }
})(jQuery);
