! function(e) {
    "use strict";
    e.fn.lightGallery = function(i) {
        var a, l, t, n, s, o, d, r, c, h, u, v, f, p = {
                mode: "slide",
                useCSS: !0,
                easing: "ease",
                speed: 1e3,
                closable: !0,
                loop: !1,
                auto: !1,
                pause: 4e3,
                preload: 1,
                escKey: !0,
                rel: !1,
                lang: {
                    allPhotos: "All photos"
                },
                exThumbImage: !1,
                index: !1,
                thumbnail: !0,
                caption: !1,
                captionLink: !1,
                desc: !1,
                counter: !1,
                controls: !0,
                hideControlOnEnd: !1,
                mobileSrc: !1,
                mobileSrcMaxWidth: 640,
                swipeThreshold: 50,
                vimeoColor: "CCCCCC",
                videoAutoplay: !0,
                videoMaxWidth: 855,
                dynamic: !1,
                dynamicEl: [],
                onOpen: function() {},
                onSlideBefore: function() {},
                onSlideAfter: function() {},
                onSlideNext: function() {},
                onSlidePrev: function() {},
                onBeforeClose: function() {},
                onCloseAfter: function() {}
            },
            m = e(this),
            g = !1,
            C = '<div id="lightGallery-outer"><div id="lightGallery-Gallery"><div id="lightGallery-slider"></div><a id="lightGallery-close" class="close"></a></div></div>',
            y = void 0 !== document.createTouch || "ontouchstart" in window || "onmsgesturechange" in window || navigator.msMaxTouchPoints,
            b = !1,
            S = !1,
            w = !1,
            x = e.extend(!0, {}, p, i),
            G = {
                init: function() {
                    m.each(function() {
                        var i = e(this);
                        1 == x.dynamic ? (a = x.dynamicEl, l = 0, c = l, q.init(l)) : (a = e(this).children(), a.click(function(t) {
                            if (1 == x.rel && i.data("rel")) {
                                var n = i.data("rel");
                                a = e('[data-rel="' + n + '"]').children()
                            } else a = i.children();
                            t.preventDefault(), t.stopPropagation(), l = a.index(this), c = l, q.init(l)
                        }))
                    })
                }
            },
            q = {
                init: function() {
                    this.start(), this.build()
                },
                start: function() {
                    this.structure(), this.getWidth(), this.closeSlide()
                },
                build: function() {
                    this.autoStart(), this.addCaption(), this.addDesc(), this.counter(), this.slideTo(), this.buildThumbnail(), this.keyPress(), this.slide(x.index ? x.index : l), this.touch(), this.enableTouch(), setTimeout(function() {
                        t.addClass("opacity")
                    }, 50)
                },
                structure: function() {
                    e("body").append(C).addClass("lightGallery"), n = e("#lightGallery-outer"), t = e("#lightGallery-Gallery"), s = t.find("#lightGallery-slider");
                    var i = "";
                    if (1 == x.dynamic)
                        for (var l = 0; l < x.dynamicEl.length; l++) i += '<div class="lightGallery-slide"></div>';
                    else a.each(function() {
                        i += '<div class="lightGallery-slide"></div>'
                    });
                    s.append(i), o = t.find(".lightGallery-slide")
                },
                closeSlide: function() {
                    var i = this;
                    x.closable && e(".lightGallery-slide").on("click", function(a) {
                        console.log(a.target), e(a.target).is(".lightGallery-slide") && i.destroy()
                    }), e("#lightGallery-close").bind("click touchend", function() {
                        i.destroy()
                    })
                },
                getWidth: function() {
                    var i = function() {
                        v = e(window).width()
                    };
                    e(window).bind("resize.lightGallery", i())
                },
                doCss: function() {
                    var e = function() {
                        for (var e = ["transition", "MozTransition", "WebkitTransition", "OTransition", "msTransition", "KhtmlTransition"], i = document.documentElement, a = 0; a < e.length; a++)
                            if (e[a] in i.style) return !0
                    };
                    return x.useCSS && e() ? !0 : !1
                },
                enableTouch: function() {
                    var i = this;
                    if (y) {
                        var a = {},
                            l = {};
                        e("body").on("touchstart.lightGallery", function(e) {
                            l = e.originalEvent.targetTouches[0], a.pageX = e.originalEvent.targetTouches[0].pageX, a.pageY = e.originalEvent.targetTouches[0].pageY
                        }), e("body").on("touchmove.lightGallery", function(e) {
                            var i = e.originalEvent;
                            l = i.targetTouches[0], e.preventDefault()
                        }), e("body").on("touchend.lightGallery", function() {
                            var e = l.pageX - a.pageX,
                                t = x.swipeThreshold;
                            e >= t ? (i.prevSlide(), clearInterval(f)) : -t >= e && (i.nextSlide(), clearInterval(f))
                        })
                    }
                },
                touch: function() {
                    var i, a, l = this;
                    e(".lightGallery").bind("mousedown", function(e) {
                        e.stopPropagation(), e.preventDefault(), i = e.pageX
                    }), e(".lightGallery").bind("mouseup", function(e) {
                        e.stopPropagation(), e.preventDefault(), a = e.pageX, a - i > 20 ? l.prevSlide() : i - a > 20 && l.nextSlide()
                    })
                },
                isVideo: function(e) {
                    var i = e.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9_\-]+)/i),
                        a = e.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i);
                    return i || a ? !0 : void 0
                },
                loadVideo: function(e, i) {
                    var a = e.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9_\-]+)/i),
                        l = e.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i),
                        t = "",
                        n = "";
                    return a ? (n = x.videoAutoplay === !0 && g === !1 ? "?autoplay=1&rel=0&wmode=opaque" : "?wmode=opaque", t = '<iframe id="video' + i + '" width="560" height="315" src="//www.youtube.com/embed/' + a[1] + n + '" frameborder="0" allowfullscreen></iframe>') : l && (n = x.videoAutoplay === !0 && g === !1 ? "autoplay=1&amp;" : "", t = '<iframe id="video' + i + '" width="560" height="315"  src="http://player.vimeo.com/video/' + l[1] + "?" + n + "byline=0&amp;portrait=0&amp;color=" + x.vimeoColor + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'), '<div class="video_cont" style="max-width:' + x.videoMaxWidth + 'px !important;"><div class="video">' + t + "</div></div>"
                },
                loadContent: function(e, i) {
                    {
                        var l, t = this;
                        a.length - e
                    }
                    if (x.preload > a.length && (x.preload = a.length), l = x.mobileSrc === !0 && v <= x.mobileSrcMaxWidth ? 1 == x.dynamic ? x.dynamicEl[e].mobileSrc : a.eq(e).attr("data-responsive-src") : 1 == x.dynamic ? x.dynamicEl[e].src : a.eq(e).attr("data-src"), t.isVideo(l)) {
                        if (o.eq(e).hasClass("loaded") || (i === !1 && g === !0 && 0 === x.preload ? setTimeout(function() {
                            o.eq(e).prepend(t.loadVideo(l, e))
                        }, x.speed) : o.eq(e).prepend(t.loadVideo(l, e)), o.eq(e).addClass("loaded"), x.auto && x.videoAutoplay === !0 && clearInterval(f)), i === !1) {
                            var n = !1;
                            if (o.eq(e).find("iframe")[0].complete && (n = !0), n) {
                                for (var s = e, d = 0; d <= x.preload; d++) t.loadContent(s + d, !0);
                                for (var r = 0; r <= x.preload; r++) t.loadContent(s - r, !0)
                            } else o.eq(e).find("iframe").on("load error", function() {
                                for (var i = e, l = 0; l <= x.preload && !(l >= a.length - e); l++) t.loadContent(i + l, !0);
                                for (var n = 0; n <= x.preload; n++) t.loadContent(i - n, !0)
                            })
                        }
                    } else if (o.eq(e).hasClass("loaded") || (o.eq(e).prepend('<img src="' + l + '" />'), o.eq(e).addClass("loaded")), i === !1) {
                        var n = !1;
                        if (o.eq(e).find("img")[0].complete && (n = !0), n) {
                            for (var s = e, d = 0; d <= x.preload && !(d >= a.length - e); d++) t.loadContent(s + d, !0);
                            for (var r = 0; r <= x.preload && !(0 > s - r); r++) t.loadContent(s - r, !0)
                        } else o.eq(e).find("img").on("load error", function() {
                            for (var i = e, l = 0; l <= x.preload && !(l >= a.length - e); l++) t.loadContent(i + l, !0);
                            for (var n = 0; n <= x.preload && !(0 > i - n); n++) t.loadContent(i - n, !0)
                        })
                    }
                },
                addCaption: function() {
                    if (x.caption === !0) {
                        var e, i = !1;
                        for (e = 0; e < a.length; e++)
                            if (i = 1 == x.dynamic ? x.dynamicEl[e].caption : a.eq(e).attr("data-title"), ("undefined" == typeof i || null == i) && (i = "image " + e), x.captionLink === !0) {
                                var l = a.eq(e).attr("data-link");
                                l = "undefined" != typeof l && "" !== l ? l : "#", o.eq(e).append('<div class="info group"><a href="' + l + '" class="title">' + i + "</a></div>")
                            } else o.eq(e).append('<div class="info group"><span class="title">' + i + "</span></div>")
                    }
                },
                addDesc: function() {
                    if (x.desc === !0) {
                        var e, i = !1;
                        for (e = 0; e < a.length; e++) i = 1 == x.dynamic ? x.dynamicEl[e].desc : a.eq(e).attr("data-desc"), ("undefined" == typeof i || null == i) && (i = "image " + e), x.caption === !1 ? o.eq(e).append('<div class="info group"><span class="desc">' + i + "</span></div>") : o.eq(e).find(".info").append('<span class="desc">' + i + "</span>")
                    }
                },
                counter: function() {
                    if (x.counter === !0) {
                        var i = e("#lightGallery-slider > div").length;
                        t.append("<div id='lightGallery_counter'><span id='lightGallery_counter_current'></span> / <span id='lightGallery_counter_all'>" + i + "</span></div>")
                    }
                },
                buildThumbnail: function() {
                    if (x.thumbnail === !0 && a.length > 1) {
                        var i = this;
                        t.append('<div class="thumb_cont"><div class="thumb_info"><span class="close ib"><i class="bUi-iCn-rMv-16" aria-hidden="true"></i></span></div><div class="thumb_inner"></div></div>'), h = t.find(".thumb_cont"), d.after('<a class="cLthumb"></a>'), t.find(".cLthumb").bind("click touchend", function() {
                            h.addClass("open"), i.doCss() && "slide" === x.mode && (o.eq(l).prevAll().removeClass("nextSlide").addClass("prevSlide"), o.eq(l).nextAll().removeClass("prevSlide").addClass("nextSlide"))
                        }), t.find(".close").bind("click touchend", function() {
                            h.removeClass("open")
                        });
                        var n, s = t.find(".thumb_info"),
                            r = t.find(".thumb_inner"),
                            c = "";
                        if (1 == x.dynamic)
                            for (var v = 0; v < x.dynamicEl.length; v++) n = x.dynamicEl[v].thumb, c += '<div class="thumb"><img src="' + n + '" /></div>';
                        else a.each(function() {
                            n = x.exThumbImage === !1 || "undefined" == typeof e(this).attr(x.exThumbImage) || null == e(this).attr(x.exThumbImage) ? e(this).find("img").attr("src") : e(this).attr(x.exThumbImage), c += '<div class="thumb"><img src="' + n + '" /></div>'
                        });
                        r.append(c), u = r.find(".thumb"), u.bind("click touchend", function() {
                            b = !0;
                            var a = e(this).index();
                            u.removeClass("active"), e(this).addClass("active"), i.slide(a), clearInterval(f)
                        }), s.prepend('<span class="ib count">' + x.lang.allPhotos + " (" + u.length + ")</span>")
                    }
                },
                slideTo: function() {
                    var e = this;
                    x.controls === !0 && a.length > 1 && (t.append('<div id="lightGallery-action"><a id="lightGallery-prev"></a><a id="lightGallery-next"></a></div>'), d = t.find("#lightGallery-prev"), r = t.find("#lightGallery-next"), d.bind("click", function() {
                        e.prevSlide(), clearInterval(f)
                    }), r.bind("click", function() {
                        e.nextSlide(), clearInterval(f)
                    }))
                },
                autoStart: function() {
                    var e = this;
                    x.auto === !0 && (f = setInterval(function() {
                        l = l + 1 < a.length ? l : -1, l++, e.slide(l)
                    }, x.pause))
                },
                keyPress: function() {
                    var i = this;
                    e(window).bind("keyup.lightGallery", function(e) {
                        e.preventDefault(), e.stopPropagation(), 37 === e.keyCode && (i.prevSlide(), clearInterval(f)), 38 === e.keyCode && x.thumbnail === !0 ? h.hasClass("open") || (i.doCss() && "slide" === x.mode && (o.eq(l).prevAll().removeClass("nextSlide").addClass("prevSlide"), o.eq(l).nextAll().removeClass("prevSlide").addClass("nextSlide")), h.addClass("open")) : 39 === e.keyCode && (i.nextSlide(), clearInterval(f)), 40 === e.keyCode && x.thumbnail === !0 ? h.hasClass("open") && h.removeClass("open") : x.escKey === !0 && 27 === e.keyCode && (x.thumbnail === !0 && h.hasClass("open") ? h.removeClass("open") : i.destroy())
                    })
                },
                nextSlide: function() {
                    var e = this;
                    l = o.index(o.eq(c)), l + 1 < a.length ? (l++, e.slide(l)) : x.loop ? (l = 0, e.slide(l)) : "fade" === x.mode && x.thumbnail === !0 && a.length > 1 && h.addClass("open"), x.onSlideNext.call(this)
                },
                prevSlide: function() {
                    var e = this;
                    l = o.index(o.eq(c)), l > 0 ? (l--, e.slide(l)) : x.loop ? (l = a.length - 1, e.slide(l)) : "fade" === x.mode && x.thumbnail === !0 && a.length > 1 && h.addClass("open"), x.onSlidePrev.call(this)
                },
                slide: function(i) {
                    if (this.loadContent(i, !1), g && (s.hasClass("on") || s.addClass("on"), this.doCss() && "" !== x.speed && (s.hasClass("speed") || s.addClass("speed"), w === !1 && (s.css("transition-duration", x.speed + "ms"), w = !0)), this.doCss() && "" !== x.easing && (s.hasClass("timing") || s.addClass("timing"), S === !1 && (s.css("transition-timing-function", x.easing), S = !0)), x.onSlideBefore.call(this)), "slide" === x.mode) {
                        var l = null != navigator.userAgent.match(/iPad/i);
                        !this.doCss() || s.hasClass("slide") || l ? this.doCss() && !s.hasClass("useLeft") && l && s.addClass("useLeft") : s.addClass("slide"), this.doCss() || g ? !this.doCss() && g && s.animate({
                            left: 100 * -i + "%"
                        }, x.speed, x.easing) : s.css({
                            left: 100 * -i + "%"
                        })
                    } else "fade" === x.mode && (this.doCss() && !s.hasClass("fadeM") ? s.addClass("fadeM") : this.doCss() || s.hasClass("animate") || s.addClass("animate"), this.doCss() || g ? !this.doCss() && g && (o.eq(c).fadeOut(x.speed, x.easing), o.eq(i).fadeIn(x.speed, x.easing)) : (o.fadeOut(100), o.eq(i).fadeIn(100))); if (i + 1 >= a.length && x.auto && x.loop === !1 && clearInterval(f), o.eq(c).removeClass("current"), o.eq(i).addClass("current"), this.doCss() && "slide" === x.mode && (b === !1 ? (e(".prevSlide").removeClass("prevSlide"), e(".nextSlide").removeClass("nextSlide"), o.eq(i - 1).addClass("prevSlide"), o.eq(i + 1).addClass("nextSlide")) : (o.eq(i).prevAll().removeClass("nextSlide").addClass("prevSlide"), o.eq(i).nextAll().removeClass("prevSlide").addClass("nextSlide"))), x.thumbnail === !0 && a.length > 1 && (u.removeClass("active"), u.eq(i).addClass("active")), x.controls && x.hideControlOnEnd && x.loop === !1 && a.length > 1) {
                        var t = a.length;
                        t = parseInt(t) - 1, 0 === i ? (d.addClass("disabled"), r.removeClass("disabled")) : i === t ? (d.removeClass("disabled"), r.addClass("disabled")) : d.add(r).removeClass("disabled")
                    }
                    c = i, g === !1 ? x.onOpen.call(this) : x.onSlideAfter.call(this), g = !0, b = !1, x.counter && e("#lightGallery_counter_current").text(i + 1)
                },
                destroy: function() {
                    x.onBeforeClose.call(this), g = !1, S = !1, w = !1, b = !1, clearInterval(f), e(".lightGallery").off("mousedown mouseup"), e("body").off("touchstart.lightGallery touchmove.lightGallery touchend.lightGallery"), e(window).off("resize.lightGallery keyup.lightGallery"), t.addClass("fadeM"), setTimeout(function() {
                        n.remove(), e("body").removeClass("lightGallery")
                    }, 500), x.onCloseAfter.call(this)
                }
            };
        return G.init(), this
    }
}(jQuery);