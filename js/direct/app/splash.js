$(function() {
    kickmotor.view.showGameView(), kickmotor.sound.stopMusic(), kickmotor.animation.showNativeInfo(!1);
    var a = {
            fadeIn: 1e3,
            display: 1e3,
            fadeOut: 1e3
        },
        b = [pUrl("/dff/static/img/common/logo/logo_square_enix.png")],
        c = function() {
            var c = $.Deferred(),
                d = $("#logo"),
                e = $.Deferred(),
                f = -1;
            return c.progress(function() {
                return f++, f >= b.length ? (d.hide(), void c.resolve()) : ($("#logo-image").attr("src", b[f]), void e.resolve().then(function() {
                    var b = $.Deferred();
                    return d.hide().fadeIn(a.fadeIn, function() {
                        b.resolve()
                    }), b.promise()
                }).then(function() {
                    {
                        var b = $.Deferred();
                        setTimeout(function() {
                            b.resolve()
                        }, a.display)
                    }
                    return b.promise()
                }).then(function() {
                    return $("#logo").fadeOut(a.fadeOut).promise().then(function() {
                        c.notify()
                    })
                }))
            }), $("#logo").mousedown(function() {
                e.reject(), c.notify()
            }), c.notify(), c.promise()
        };
    c().then(function() {
        var a = $("[data-app-user-id]").attr("data-app-user-id");
        kickmotor.nativefn.isNative() && kickmotor.nativefn.clientInfo(function(b) {
            b.login && a ? FF.redirect("/dff/#title") : (document.cookie = "persistent_tutorial_end=1; path=/", kickmotor.nativefn.call("syncPersistentCookie"), $(".is-bg-type-top").removeClass("di-n"), kickmotor.platform.mobageLogin("#title"))
        })
    })
});