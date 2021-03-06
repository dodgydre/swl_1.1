(function ($) {

    "use strict";

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
        currenturl = window.location.pathname,
        centered = false;

    /*******************************************************************************/
    /* Resize Image */
    /*******************************************************************************/
    function imgResize(el, cw, ch, prop, woff, hoff, loff, toff) {
        // element, container width, height, css prop (margin/top), width offset, height offset, left offset, top offset
        var iR, sf, fit, cR, ih, iw, imt, iml,
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
        } else {
            // fill container
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

    /*******************************************************************************/
    /* imgResizeLeft
    /* Resize an image with Left justify
    /*******************************************************************************/
    function imgResizeLeft(el, cw, ch, prop, woff, hoff, loff, toff) {
        // element, container width, height, css prop (margin/top), width offset, height offset, left offset, top offset
        var iR, sf, fit, cR, ih, iw, imt, iml,
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
        } else {
            // fill container
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

        if (el.hasClass('full')) {
            if (cR > iR) {
                iw = cw;
                ih = iw / iR;
                iml = 0;
                imt = -(iw - cw) / 2;
            } else {
                ih = ch;
                iw = ih * iR;
                iml = 0; //-(ih - ch) / 2;
                imt = 0;
            }
        }

        var iml = loff; // SET THE IMAGE LEFT TO 0

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
    /* End imgResizeLeft */

    /*******************************************************************************/
    /* Resize Site */
    /*******************************************************************************/
    function resizeSite() {
        var iR, sf, fit, currentSlide;

        ww = $(window).width();
        wh = $(window).height();
        if ($('body').hasClass('mobile')) {
            headerheight = 45;
        } else {
            headerheight = 105;
        }

        iah = wh - headerheight - footerheight;
        siteratio = ww / iah;

        if (ww < minww) { ww = minww; }
        if (wh < minwh) { wh = minwh; }

        // resize the container
        $('#site, .scrollwrap, .site').width(ww).height(iah);
        //$('#proj_img').width(ww).height(iah);
        //$('#proj_img').css('width', ww + "px").css('height', iah + "px");

        // If the window is less than 769 hide the arrows and size the images.
        if ($('body').hasClass('mobile')) {
            $('.arrw').hide();
            $('#proj_img img').each(function () {
                $(this).removeClass('slide').addClass('single_project_image');
                //$(this).hide();
                $(this).css('width', ww + 'px').css('height', '').css('display', '');
            });
            $('.proj.active img').each(function () {
                $(this).css('display', 'block').show();
            });
            $('.proj_wrapper').each(function () {
                $(this).css('width', ww + 'px').height($(window).height() - 90);
            });
        } else if ($('body').hasClass('large')) {
            $('#proj_img img').each(function () {
                $(this).removeClass('single_project_image').addClass('slide');
            });
        }

        // resize each picture
        $('#proj_img .slide').each(function () {
            var thisimg = $(this),
                containerW,
                containerH,
                containerAspect,
                imageAspect,
                iw,
                ih;
            iR = parseFloat(thisimg.data("r"));
            sf = thisimg.data("f");

            if (sf === 200) {
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
                    iw = iah * imageAspect;
                    $(this)
                        .css('width', iw)
                        .css('height', iah)
                        .css('top', '0')
                        .css('left', (-(iah * imageAspect - ww) / 2));
                } else {
                    ih = ww / imageAspect;
                    $(this)
                        .css('width', ww)
                        .css('height', ih)
                        .css('top', (-(ww / imageAspect - iah) / 2))
                        .css('left', '0');
                }

            } else {
                if(centered) {
                  var imgDim = imgResize(thisimg, ww, iah, "position", 0, 0, 0, 0);
                }
                else {
                  var imgDim = imgResizeLeft(thisimg, ww, iah, "position", 135, 0, 105, 0);
                }
                //imgResize(thisimg, ww, iah, "position", 0, 0, 0, 0);
            }
        });
        //end resize each picture

        currentSlide = $(".slideshow .slide:visible");
        // If there is a video, remove the down arrow so you can control the video.  Otherwise show both up and down arrows
        if (currentSlide.length > 0 && currentSlide.hasClass("video")) {
            if ($(".arrw.down").length > 0) {
                $(".arrw.left, .arrw.right").height(iah / 2).width((ww / 2));
                $(".arrw.down").hide();
            } else {
                $(".arrw.left, .arrw.right").height(iah / 1.5).width((ww / 2));
            }
        } else {
            $(".arrw.left, .arrw.right").height(iah - iah / 4).width((ww / 2));
            $(".arrw.down").show();
        }
    }
    /* End Resize Site */


    /*******************************************************************************/
    /* Start: adjustFooterHeight */
    /*******************************************************************************/
    function adjustFooterHeight() {
        /* container height, footer height, below footer height */
        var ch, fh, bfh, bfih;

        ch = $(window).height() - footerheight - headerheight;
        fh = $('.single-footer__container').height();
        bfh = $('.single-below-footer__container').outerHeight();

        if (bfh < 33) { bfh = 0; }

        if (bfh > (ch - 150)) {
            //console.log('1');
            bfh = ch - 150;
            // below footer inner height (subtract the margins)

            bfih = bfh - 40;

            $(".single-below-footer__description").height(bfih).css('overflow-y', 'scroll');

            $(".single-below-footer__container");
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
        //console.log('2');

    }
    /* End: adjustFooterHeight */

    /*******************************************************************************
    * getNewProject
    *******************************************************************************/
    function getNewProject(thisProject, current, nextProj, dir) {
        var project_id = nextProj.data("id");

        // TODO: Add Ajax to retrieve the next project images
        $.ajax({
            url: ajaxgetprojectimgs.ajaxurl,
            type: 'post',
            data: {
                action: 'ajax_get_project_imgs',
                project_id: project_id
            },
            dataType: 'json',
            success: function (result) {
                $.each(result, function (index, value) {
                    nextProj.find('.proj_wrapper').first().append(value);
                });
                resizeSite();

            }
        });
    }
    /* End getNewProject */

    /*******************************************************************************
    * Load Previous and Next Project Images
    *******************************************************************************/
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
        if (nextProj.find('.proj_wrapper').first().html() === "") {
            getNewProject(thisProj, "", nextProj, "");
        }

        // is the previous project one back?
        if (thisProj.prevAll(".proj").first().length > 0) {
            prevProj = thisProj.prevAll(".proj").first();
        } else {
            // if not then the previous project is the last project
            prevProj = $(".proj").eq($("proj").length - 1);
        }

        // If the previous project is currently empty, load in the images
        if (prevProj.find('.proj_wrapper').first().html() === "") {
            getNewProject(thisProj, "", prevProj, "");
        }
    }
    /* End Load Previous and Next Project Images */

    /*******************************************************************************/
    /* getPrevAndNextButtons */
    /*******************************************************************************/
    function getPrevAndNextButtons(thisProj) {
        var nextProj, prevProj, table, directory, nextURL, prevURL;

        table = thisProj.parent().data("t");
        if (table === "projects") {
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
    /* End getPrevAndNextButtons */

    /*******************************************************************************
    * slideToProject
    *******************************************************************************/
    function slideToProject(thisProj, current, nextProj, dir) {
        console.log("slideToProject");
        var currentLeft, slideToShow, currentTop, directory, imgDim, table, newLeft, caption, description, imagedate, ww;

        ww = $(window).width();

        if ($('body').hasClass('large')) {
            currentLeft = current.offset().left;
            slideToShow = nextProj.find(".slide:first-child");

            imgDim = imgResize(slideToShow, ww, iah, "array", 0, 0, 0, 0);

            currentTop = current.offset().top;

            /* If the footer is epanded, shrink it */
            if ($('.single-footer__container').hasClass('expanded')) {
                $('.single-expand').click();
            }

            if (dir === "u") {
                current.stop().animate({ top: currentTop + wh + gutter }, { duration: speed - 100, easing: easing }).hide().css("top", currentTop + "px");

                slideToShow.css("top", (imgDim[3] - wh - gutter) + "px").show(0).stop().animate({ top: imgDim[3] }, { duration: speed, easing: easing });

                newLeft = ($(".proj.active .slide").length - 1) * 13;
            } else {
                current.stop().animate({ top: (currentTop - wh) }, { duration: speed - 100, easing: easing }).hide(0).css("top", currentTop + "px");
                slideToShow.css("top", (ww + imgDim[3]) + "px").show(0).stop().animate({ top: imgDim[3] }, { duration: speed, easing: easing });
            }
        } else {
            // On mobile device so slide is left and right

            slideToShow = nextProj;

            /* If the footer is epanded, shrink it */
            if ($('.single-footer__container').hasClass('expanded')) {
                $('.single-expand').click();
            }

            if (dir === "u") {
                current.stop().animate({ left: ww }, { duration: 50, easing: easing, complete: function () { $(this).hide().css("left", "0"); } });

                //slideToShow.css('height',$(window).height() - 90);
                slideToShow.css("left", "-" + ww + "px").show(0).stop().animate({ left: 0 }, { duration: 300, easing: easing });

            } else {
                current.stop().animate({ left: -ww }, { duration: 50, easing: easing, complete: function () { $(this).hide(0).css("left", "0px"); } });

                //slideToShow.css('height',$(window).height() - 90);
                slideToShow.css("left", ww + "px").show(0).stop().animate({ left: 0 }, { duration: 300, easing: easing });
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
    /* End slideToProject */


    /*******************************************************************************
    * goToProject
    * args:
    *   href - address of project to go to
    *   slug - project, etc.
    *******************************************************************************/
    function goToProject(href, slug) {
        var dir, thisSlideShow, thisProj, nextProj, current;

        thisSlideShow = $('#proj_img');
        thisProj = $(".proj.active");
        if ($('body').hasClass('large')) {
            current = $(".proj.active .slide:visible");
        } else {
            current = $(".proj.active");
        }

        nextProj = $("#p_" + slug);
        if (nextProj.index() > thisProj.index()) {
            if (thisProj.index() === 0 && nextProj.index() === $(".proj").length - 1) {
                dir = "u";
            } else {
                dir = "d";
            }
        } else {
            if (thisProj.index() === $(".proj").length - 1 && nextProj.index() === 0) {
                dir = "d";
            } else {
                dir = "u";
            }
        }

        if (nextProj.find('.proj_wrapper').first().html() === "") {
            getNewProject(thisProj, current, nextProj, dir);
            slideToProject(thisProj, current, nextProj, dir);
        } else {
            slideToProject(thisProj, current, nextProj, dir);
        }

    }
    /* End GoToProject */

    /*******************************************************************************
    * getPage
    * Get Current Page URL. If the new href state is
    * different then go to different project
    *******************************************************************************/
    function getPage(href, push) {
        var l, cl;

        if (href[0] !== "/") {
            href = "/" + href;
        }
        if (currenturl[0] !== "/") {
            currenturl = "/" + currenturl;
        }

        l = href.split("/");
        cl = currenturl.split("/");

        //console.log(l);

        if (href !== currenturl) {
            if (l[2] === "project") {
                // send the slug only
                goToProject(href, l[3]);
            } else if (l[1] === "project") {
                goToProject(href, l[2]);
            }
            currenturl = href;
        }
    }
    /* End Get Current Page URL */

    /*******************************************************************************
    * swipeProjectLeft
    * On mobile screens make a swipe to the left equal to a down arriw (next project)
    *******************************************************************************/
    function swipeProjectLeft (event, direction, distance, duration, fingerCount) {
        var href;
        event.preventDefault();
        console.log('swiped left');
        href = $('.arrw.down').attr('href');
        History.pushState(null, null, href);
    }

    /*******************************************************************************
    * swipeProjectRight
    * On mobile screens make a swipe to the right equal to an up arrow (prev project)
    *******************************************************************************/
    function swipeProjectRight (event, direction, distance, duration, fingerCount) {
        var href;
        event.preventDefault();
        console.log('swiped left');
        href = $('.arrw.up').attr('href');
        History.pushState(null, null, href);
    }

    /*******************************************************************************
    * setLargeWindowClasses / setMobileClasses
    * Add the required classes to the various divs
    *******************************************************************************/
    function setLargeWindowClasses () {
        headerheight = 105;
        iah = wh - footerheight - headerheight;
        $('body').addClass('large').removeClass('mobile');
        $('#proj_img').addClass('large').removeClass('mobile');
        $('#proj_img_container').addClass('large').removeClass('mobile');
        $('#proj_img_container').height(iah);
        $('#proj_img img').addClass('slide');
    }
    function setMobileClasses () {
        headerheight = 45;
        iah = wh - footerheight - headerheight;
        $('body').removeClass('large').addClass('mobile');
        $('#proj_img').removeClass('large').addClass('mobile');
        $('#proj_img_container').removeClass('large').addClass('mobile');
        $('#proj_img_container').height(iah);
        $('#proj_img img').removeClass('slide');
        $('.single-footer__more').text(' / Read text');
        $('.arrw').hide();
    }


    /************************************************************************************************
    * DOCREADY
    ************************************************************************************************/

    $(document).ready(function () {

        var History, hash, caption, description, imagedate, State, url, href;

        /* -------  If smaller screen add mobile class to main div --------- */
        if ($(window).width() > 769) {
            setLargeWindowClasses();
        } else {
            setMobileClasses();
        }

        resizeSite();

        /* -------  Button for footer expand --------- */
        /*if ($('body').hasClass('large'))*/
        //if (1) {

        $('.single-expand').click(function (e) {
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
                if ($('body').hasClass('large')) {
                    $('.single-footer__more').text(' / Read text');
                } else {
                    $('.single-footer__more').text(' / Read text');
                }
            } else {
                adjustFooterHeight();
                $('.single-footer__container').addClass('expanded');
                if ($('body').hasClass('large')) {
                    $('.single-footer__more').text(' / Hide text');
                } else {
                    $('.single-footer__more').text(' / Hide text');
                }
            }
        });

        //}


        /* -------  Change Browser Address Bar on Change Project --------- */
        // TODO: Check

        History = window.History;
        if (History.enabled) {
            History.Adapter.bind(window, 'statechange', function () {

                State = History.getState();
                url = document.createElement('a');
                url.href = State.url;
                getPage(url.pathname, false);
            });
            hash = window.location.hash;
            if (hash) {
                History.Adapter.trigger(window, 'statechange');
            }
        }


        // Hide Images and Fade in the first one
        if (!$.browser.msie) {

            if ($("#proj_img").length > 0) {
                if ($('body').hasClass('large')) {
                    if ($("#proj_img").length > 0) {
                        $("#proj_img img").hide();
                        $('#proj_img .active img').first().fadeIn(400);
                    }
                }
                caption = $('#proj_img .active img').first().nextAll('.single-project-caption').html();
                description = $('#proj_img .active img').first().nextAll('.single-project-description').html();
                imagedate = $('#proj_img .active img').first().nextAll('.single-project-date').html();

                $('.single-footer__caption').html(caption);
                $('.single-footer__caption-date').html(imagedate);
                $('.single-below-footer__description').html(description);
            }
        }

        /* -------  On resizing, check the screen size again --------- */
        $(window).resize(function () {
            //console.log('resized');
            //console.log($(window).width());
            if ($(window).width() > 769) {
                // If it was previously a mobile site but is now a large site:
                if ($('.mobile').length > 0) {
                    headerheight = 105;
                    iah = $(window).height() - headerheight - footerheight;
                    $('body').addClass('large').removeClass('mobile');
                    $('#proj_img').addClass('large').removeClass('mobile');
                    $('#proj_img_container').addClass('large').removeClass('mobile');

                    // When switching back to large size, first hide all images,
                    // then only show the current active project image
                    $('#proj_img img').hide();
                    $('#proj_img .active img').first().fadeIn(400);

                    // reset the footer variables for the active project
                    caption = $('#proj_img .active img').first().nextAll('.single-project-caption').first().html();
                    description = $('#proj_img .active img').first().nextAll('.single-project-description').first().html();
                    imagedate = $('#proj_img .active img').first().nextAll('.single-project-date').first().html();

                    $('.single-footer__caption').html(caption);
                    $('.single-footer__caption-date').html(imagedate);
                    $('.single-below-footer__description').html(description);

                    // Bring back the arrows if we go big again.
                    $('.arrw').show();

                    // Use Keyboard instead of Mouse
                    $(document).keydown(function (e) {
                        if (e.which === 37 && !e.metaKey) {
                            e.preventDefault();
                            $(".arrw.left").click();
                        } else if (e.which === 38 && !e.metaKey) {
                            e.preventDefault();
                            $(".arrw.up").click();
                        } else if (e.which === 39 && !e.metaKey) {
                            e.preventDefault();
                            $(".arrw.right").click();
                        } else if (e.which === 40 && !e.metaKey) {
                            e.preventDefault();
                            $(".arrw.down").click();
                        }
                    });

                    $(".arrw").swipe({
                        //Generic swipe handler for all directions
                        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                            //console.log("You swiped " + direction);
                            if (direction === "left") {
                                $('.arrw.right').click();
                            }
                            if (direction === "right") {
                                $('.arrw.left').click();
                            }
                            if (direction === "down") {
                                $('.arrw.up').click();
                            }
                            if (direction === "up") {
                                $('.arrw.down').click();
                            }
                        }
                    });

                    // Unbind the swipe function on the proj class that was applied when it was a small site.
                    $('.proj').unbind("swipe");
                }
            } else {
                // If it becomes a small site but was previously a large one unbind the arrws
                if ($('.large').length > 0) {
                    headerheight = 45;
                    iah = $(window).height() - headerheight - footerheight;

                    $('body').removeClass('large').addClass('mobile');
                    $('#proj_img').removeClass('large').addClass('mobile');
                    $('#proj_img_container').removeClass('large').addClass('mobile');
                    $('#proj_img_container').height(iah);
                    // take away the arrows when we go small.
                    $('.arrw').hide();

                    $('.proj').swipe({swipeLeft: swipeProjectLeft, swipeRight: swipeProjectRight, allowPageScroll: "vertical"});

                    $('.arrw').unbind("swipe");
                }
            }
            resizeSite();
        });

        // Project Table Sorting?

        // Project Slider (1)
        $("#proj_img.project .arrw").click(function () {

            //console.log('arrow clicked');

            var dir, thislink, thisSlideShow, slideToShow, thisProject, current,
                imgDim, currentLeft, nextCurrentLeft, nextNextLeft, caption, imagedate, description,
                cw, ch, captionText, pause_string;


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


            thisSlideShow = $("#proj_img");
            thisProject = $(".proj.active");
            current = $(".proj.active .slide:visible");

            // If the current slide is a video - make sure we stop the video before moving on.
            if (current.hasClass('video')) {
                pause_string = 'player_' + thisProject.attr('data-id') + '.pause()';
                eval(pause_string);
            }

            /*  ----- CLICK LEFT (Prev Slide) -------*/
            if (dir === "l") {
                if (thisProject.find(".slide").length > 1) {
                    // if the current slide is not the first then move one to the left.
                    if (current.prevAll(".proj.active .slide").first().length > 0) {
                        slideToShow = current.prevAll(".proj.active .slide").first();
                    } else {
                        // if the current slide IS the first one then slide to the last slide
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
                        if(centered) {
                          var imgDim = imgResize(slideToShow, ww, iah, "array", 0, 0, 0, 0);
                        }
                        else {
                          var imgDim = imgResizeLeft(slideToShow, ww, iah, "array", 135, 0, 105, 0);
                        }
                        //imgDim = imgResize(slideToShow, cw, ch, "array", 0, 0, 0, 0);
                        currentLeft = current.offset().left;
                        nextCurrentLeft = currentLeft + cw + gutter;
                        nextNextLeft = (imgDim[2] - cw - gutter);

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
            } else if (dir === "r") { /*  ----- CLICK RIGHT (Next Slide) -------*/
                //console.log('direction = right');

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
                        if(centered) {
                          var imgDim = imgResize(slideToShow, ww, iah, "array", 0, 0, 0, 0);
                        }
                        else {
                          var imgDim = imgResizeLeft(slideToShow, ww, iah, "array", 135, 0, 105, 0);
                        }

                        //imgDim = imgResize(slideToShow, cw, ch, "array", 0, 0, 0, 0);
                        currentLeft = current.offset().left;
                        nextCurrentLeft = -(ww + gutter);
                        nextNextLeft = (imgDim[2] + ww + gutter);
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
            } else if (dir === "u" || dir === "d") { /*  ----- CLICK UP OR DOWN (Next / Prev PROJECT) -------*/
                href = thislink.attr("href");
                History.pushState(null, null, href);
            }
            return false;
        }); // close >> #proj_img.project .arrw click



        // NOTE: jQuery.touchSwipe.min.js
        if ($('body').hasClass('large')) {
            // Use Keyboard instead of Mouse
            $(document).keydown(function (e) {
                if (e.which === 37 && !e.metaKey) {
                    e.preventDefault();
                    $(".arrw.left").click();
                } else if (e.which === 38 && !e.metaKey) {
                    e.preventDefault();
                    $(".arrw.up").click();
                } else if (e.which === 39 && !e.metaKey) {
                    e.preventDefault();
                    $(".arrw.right").click();
                } else if (e.which === 40 && !e.metaKey) {
                    e.preventDefault();
                    $(".arrw.down").click();
                }
            });

            $(".arrw").swipe({
                //Generic swipe handler for all directions
                swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                    //console.log("You swiped " + direction);
                    if (direction === "left") {
                        $('.arrw.right').click();
                    }
                    if (direction === "right") {
                        $('.arrw.left').click();
                    }
                    if (direction === "down") {
                        $('.arrw.up').click();
                    }
                    if (direction === "up") {
                        $('.arrw.down').click();
                    }
                }
            });
        } else { /* body doesn't have class large */
            $('.proj').swipe({swipeLeft: swipeProjectLeft, swipeRight: swipeProjectRight, allowPageScroll: "vertical"});

            /*$('.proj').swipe({
                swipe: function (event, direction, distance, duration, fingerCount, fingerData) {

                    // console.log('swipe');
                    // console.log(event);
                    // console.log(direction);
                    // console.log(distance);
                    // console.log(duration);

                    if (direction === 'left') {
                        //event.preventDefault();
                        href = $('.arrw.down').attr('href');
                        History.pushState(null, null, href);
                    }
                    if (direction === 'right') {
                        //event.preventDefault();
                        href = $('.arrw.up').attr('href');
                        History.pushState(null, null, href);
                    }
                }
            });*/
        }

        getPrevAndNextButtons($(".proj.active"));
        loadPrevAndNextProject($(".proj.active"));

    }); // close >> document(ready)

    /*$(window).load(function() {
        getPrevAndNextButtons($(".proj.active"));
        loadPrevAndNextProject($(".proj.active"));
    });*/

})(jQuery);
