/*!
 * jQuery Steps v1.1.0 - 09/04/2014
 * Copyright (c) 2014 Rafael Staib (http://www.jquery-steps.com)
 * Licensed under MIT http://www.opensource.org/licenses/MIT
 */

!(function (a, b) {
    var complete, connected, install_success = false;

    function c(a, b) {
        o(a).push(b);
    }
    function d(d, e, f) {
        var g = d.children(e.headerTag),
            h = d.children(e.bodyTag);
        g.length > h.length ? R(Z, "contents") : g.length < h.length && R(Z, "titles");
        var i = e.startIndex;
        if (((f.stepCount = g.length), e.saveState && a.cookie)) {
            var j = a.cookie(U + q(d)),
                k = parseInt(j, 0);
            !isNaN(k) && k < f.stepCount && (i = k);
        }
        (f.currentIndex = i),
            g.each(function (e) {
                var f = a(this),
                    g = h.eq(e),
                    i = g.data("mode"),
                    j = null == i ? $.html : r($, /^\s*$/.test(i) || isNaN(i) ? i : parseInt(i, 0)),
                    k = j === $.html || g.data("url") === b ? "" : g.data("url"),
                    l = j !== $.html && "1" === g.data("loaded"),
                    m = a.extend({}, bb, { title: f.html(), content: j === $.html ? g.html() : "", contentUrl: k, contentMode: j, contentLoaded: l });
                c(d, m);
            });
    }
    function e(a) {
        a.triggerHandler("canceled");
    }
    function f(a, b) {
        return a.currentIndex - b;
    }
    function g(b, c) {
        var d = i(b);
        b.unbind(d).removeData("uid").removeData("options").removeData("state").removeData("steps").removeData("eventNamespace").find(".actions a").unbind(d), b.removeClass(c.clearFixCssClass + " vertical");
        var e = b.find(".content > *");
        e.removeData("loaded").removeData("mode").removeData("url"),
            e.removeAttr("id").removeAttr("role").removeAttr("tabindex").removeAttr("class").removeAttr("style")._removeAria("labelledby")._removeAria("hidden"),
            b.find(".content > [data-mode='async'],.content > [data-mode='iframe']").empty();
        var f = a('<{0} class="{1}"></{0}>'.format(b.get(0).tagName, b.attr("class"))),
            g = b._id();
        return null != g && "" !== g && f._id(g), f.html(b.find(".content").html()), b.after(f), b.remove(), f;
    }
    function h(a, b) {
        var c = a.find(".steps li").eq(b.currentIndex);
        a.triggerHandler("finishing", [b.currentIndex]) ? (c.addClass("done").removeClass("error"), a.triggerHandler("finished", [b.currentIndex])) : c.addClass("error");
    }
    function i(a) {
        var b = a.data("eventNamespace");
        return null == b && ((b = "." + q(a)), a.data("eventNamespace", b)), b;
    }
    function j(a, b) {
        var c = q(a);
        return a.find("#" + c + V + b);
    }
    function k(a, b) {
        var c = q(a);
        return a.find("#" + c + W + b);
    }
    function l(a, b) {
        var c = q(a);
        return a.find("#" + c + X + b);
    }
    function m(a) {
        return a.data("options");
    }
    function n(a) {
        return a.data("state");
    }
    function o(a) {
        return a.data("steps");
    }
    function p(a, b) {
        var c = o(a);
        return (0 > b || b >= c.length) && R(Y), c[b];
    }
    function q(a) {
        var b = a.data("uid");
        return null == b && ((b = a._id()), null == b && ((b = "steps-uid-".concat(T)), a._id(b)), T++, a.data("uid", b)), b;
    }
    function r(a, c) {
        if ((S("enumType", a), S("keyOrValue", c), "string" == typeof c)) {
            var d = a[c];
            return d === b && R("The enum key '{0}' does not exist.", c), d;
        }
        if ("number" == typeof c) {
            for (var e in a) if (a[e] === c) return c;
            R("Invalid enum value '{0}'.", c);
        } else R("Invalid key or value type.");
    }
    function s(a, b, c) {
        return check_action(a, b, c)
    }
    function t(a, b, c) {
        return B(a, b, c, f(c, 1));
    }
    function u(a, b, c, d) {
        if (((0 > d || d >= c.stepCount) && R(Y), !(b.forceMoveForward && d < c.currentIndex))) {
            var e = c.currentIndex;
            return (
                a.triggerHandler("stepChanging", [c.currentIndex, d])
                    ? ((c.currentIndex = d),
                        O(a, b, c),
                        E(a, b, c, e),
                        D(a, b, c),
                        A(a, b, c),
                        P(a, b, c, d, e, function () {
                            a.triggerHandler("stepChanged", [d, e]);
                        }))
                    : a.find(".steps li").eq(e).addClass("error"),
                !0
            );
        }
    }

    function v(a, b) {
        return a.currentIndex + b;
    }

    function check_action(a, b, c) {
        function throwSuccess(text) {
            Swal.fire({
                title: 'Successful!',
                text: text,
                icon: 'success'
            })
            return B(a, b, c, v(c, 1));
        }

        function throwError(text, footer) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: text,
                footer: footer,
                showCancelButton: false,
                showConfirmButton: true
            })
            return B(a, b, c, v(c, 0));
        }

        function checkEmptyValues(obj) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (!obj[key]) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Incomplete data',
                            footer: 'Please make sure all information has been provided.',
                            showCancelButton: false,
                            showConfirmButton: true
                        })
                        return false;
                    }
                }
            }
            return true;
        }

        switch (c.currentIndex) {
            case 0:
                console.log('Lets get started!')
                B(a, b, c, v(c, 1));
                break;
            case 1:
                if (!complete) {
                    console.log('Checking requirements...');

                    document.getElementsByClassName("actions")[0].style.display = "none";

                    Swal.fire({
                        title: 'Requirements check',
                        text: 'In order to install iNethi on your remote server, we need to install a few requirements on your machine.',
                        footer: 'Please enter your password when prompted.',
                        confirmButtonText: 'Check!',
                        icon: 'info',
                        showConfirmButton: true,
                        allowOutsideClick: false
                    }, { once: true }).then(function () {
                        api.send('checkRequirements', 'hello');
                        Swal.fire({
                            title: 'Checking system requirements...',
                            footer: 'Get a cup of coffee, this might take a while.',
                            html: '<div class="lds-dual-ring"></div>',
                            showConfirmButton: false,
                            allowOutsideClick: false,
                            showCancelButton: false
                        })
                    });

                    api.handle('checkRequirements', (event, data) => function (event, message) {
                        try {
                            message = JSON.parse(message);
                            console.log(message);
                            if (message.code == 0) {
                                complete = true;
                                return throwSuccess('Installing requirements complete!');
                            } else {
                                throwError('Oops! Something went wrong...', 'Please check the logs and try again or contact the iNethi team.')
                            }
                            api.close();
                        } catch {
                            console.log(message);
                        }
                    });
                } else {
                    return B(a, b, c, v(c, 1));
                }
                document.getElementsByClassName("actions")[0].style.display = "block";
                break;
            case 2:
                if (!connected) {
                    var args = {
                        'ip': document.getElementById('serverIp').value,
                        'username': document.getElementById('serverUsername').value,
                        'password': document.getElementById('serverPassword').value
                    }

                    if (!checkEmptyValues(args)) {
                        return B(a, b, c, v(c, 0));
                    }

                    console.log(args)

                    api.send('openConnection', JSON.stringify(args));

                    Swal.fire({
                        title: 'Connecting to server...',
                        html: '<div class="lds-dual-ring"></div>',
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        showCancelButton: false
                    });

                    api.handle('openConnection', (event, data) => function (event, message) {
                        try {
                            message = JSON.parse(message);
                            
                            console.log(message);

                            if (message.code == 0) {
                                connected = true;
                                throwSuccess('Connection successful!');
                            } else {
                                throwError('Connection unsuccessful', 'Check your credentials and try again.')
                            }
                            api.close();
                        } catch {
                            console.log(message);
                        }
                    });
                } else {
                    return B(a, b, c, v(c, 1));
                }
                break;
            case 3:
                var args = {
                    'storagepath': document.getElementById('storagePath').value,
                    'domainname': document.getElementById('domainName').value,
                    'https': document.getElementById('httpsCheckbox').checked.toString(),
                    'master': document.getElementById('masterPassword').value
                }

                if (args.https === "true" && args.domainname !== "inethilocal.net") {
                    try {
                        args.acme = document.getElementById('acmeFile').files[0].path;
                    } catch {
                        return throwError('Missing required fields', 'Check your inputs and try again.')
                    }
                }

                console.log(args)

                if (!checkEmptyValues(args)) {
                    return B(a, b, c, v(c, 0));
                }

                args.https = (args.https === 'true');

                api.send('saveConfig', JSON.stringify(args));

                Swal.fire({
                    title: 'Saving config...',
                    html: '<div class="lds-dual-ring"></div>',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    showCancelButton: false
                });

                api.handle('saveConfig', (event, data) => function (event, data) {
                    if (data) {
                        return throwSuccess('Your config was saved successfully!');
                    } else {
                        throwError('Saving config unsuccessful', 'Check your input for errors and try again.')
                    }
                });
                break;
            case 4:
                var args = {};

                const modules = ['docker', 'traefik', 'nginx', 'keycloak', 'nextcloud', 'jellyfin', 'wordpress', 'peertube', 'paum', 'radiusdesk', 'azuracast'];
                modules.forEach((module) => {
                    args[module] = document.getElementById(module + 'Checkbox').checked;
                });

                if (args.paum) {
                    try {
                        args.paum_args = {};
                        const paum_fields = ['limit_reset', 'usage_limit', 'cost_30', 'cost_60', 'cost_24', 'cost_1gb'];
                        paum_fields.forEach((paum_field) => {
                            args.paum_args[paum_field] = document.getElementById(paum_field).valueAsNumber;
                        });
                    } catch {
                        console.log('One or multiple PAUM fields are not available.')
                    }
                }

                console.log(args);

                api.send('saveModuleSelection', JSON.stringify(args));

                Swal.fire({
                    title: 'Saving module selection...',
                    html: '<div class="lds-dual-ring"></div>',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    showCancelButton: false
                });

                api.handle('saveModuleSelection', (event, data) => function (event, data) {
                    if (data) {

                        Swal.fire({
                            title: 'Successful!',
                            text: 'Your module selection was saved successfully!',
                            icon: 'success',
                            showConfirmButton: false,
                            allowOutsideClick: false
                        })

                        setTimeout(function () {
                            Swal.fire({
                                title: 'Installation ready',
                                text: 'The iNethi system is ready to be installed. This may take a while. Please make sure the installation is not interrupted by a disruption in internet or power.',
                                confirmButtonText: 'Start',
                                icon: 'info',
                                showConfirmButton: true,
                                allowOutsideClick: false
                            }, { once: true }).then(function () {
                                B(a, b, c, v(c, 1));
                                check_action(a, b, c);
                            })
                        }, 2000);

                    } else {
                        return throwError('Saving module selection unsuccessful', 'Check for errors and try again.');
                    }
                });
                break;
            case 5:
                console.log('Start installation!');

                document.getElementsByClassName("actions")[0].style.display = "none";

                api.send('startInstallation', 'hello')

                var logs = document.getElementsByClassName("logs")[0];

                api.handle('startInstallation', (event, data) => function (event, data) {
                    if (data) { // DO I NEED THIS ?
                        console.log(data);
                        var text = document.createTextNode(`${data}` + "\n");
                        logs.appendChild(text);
                        logs.scrollTop = logs.scrollHeight;
                    } else {
                        return throwError('Starting installation failed.', 'Please contact iNethi team or try again.')
                    }
                    if (data.code == 1) {
                        return B(a, b, c, v(c, 1));
                    } else {
                        return B(a, b, c, v(c, 0));
                    }
                });

                api.handle('progressUpdate', (event, data) => function (event, data) {
                    var progress_bar = document.getElementById("progressBar");
                    progress_bar.innerHTML = `${data}%`;
                    progress_bar.style.width = `${data}%`;
                });

                api.handle('installAbort', (event, data) => function (event, data) {
                    console.log("abort = " + data);
                    document.getElementsByClassName("actions")[0].style.display = "block";
                    document.querySelector(".actions a[href$='#previous']").style.display = "none";
                    document.querySelector(".actions a[href$='#finish']").innerHTML = "Restart";
                    document.querySelector("p.result").innerHTML = "The installation failed. Please inspect the logs below and restart the installer to try again or contact the iNethi team for support.";
                    document.getElementsByClassName("logreport")[0].innerHTML = logs.innerHTML;
                    throwError('Installation failed.', 'Please restart and retry or contact the iNethi team.')
                    return B(a, b, c, v(c, 1));
                });

                api.handle('installComplete', (event, data) => function (event, data) {
                    install_success = true;
                    console.log("complete = " + data);
                    document.getElementsByClassName("actions")[0].style.display = "block";
                    document.querySelector(".actions a[href$='#previous']").style.display = "none";
                    document.querySelector(".actions a[href$='#finish']").innerHTML = "Close";
                    document.querySelector("p.result").innerHTML = "The installation was successful. You can now close this window, or restart the installer to install additional components.";
                    document.getElementsByClassName("logreport-div")[0].style.display = "none";
                    return throwSuccess('Your iNethi installation was successful!');
                });
                break;
            // default:
            //     return B(a, b, c, v(c, 1));
        }
    }

    function w(b) {
        var c = a.extend(!0, {}, cb, b);
        return this.each(function () {
            var b = a(this),
                e = { currentIndex: c.startIndex, currentStep: null, stepCount: 0, transitionElement: null };
            b.data("options", c), b.data("state", e), b.data("steps", []), d(b, c, e), J(b, c, e), G(b, c), c.autoFocus && 0 === T && j(b, c.startIndex).focus(), b.triggerHandler("init", [c.startIndex]);
        });
    }
    function x(b, c, d, e, f) {
        (0 > e || e > d.stepCount) && R(Y), (f = a.extend({}, bb, f)), y(b, e, f), d.currentIndex !== d.stepCount && d.currentIndex >= e && (d.currentIndex++, O(b, c, d)), d.stepCount++;
        var g = b.find(".content"),
            h = a("<{0}>{1}</{0}>".format(c.headerTag, f.title)),
            i = a("<{0}></{0}>".format(c.bodyTag));
        return (
            (null == f.contentMode || f.contentMode === $.html) && i.html(f.content),
            0 === e
                ? g.prepend(i).prepend(h)
                : k(b, e - 1)
                    .after(i)
                    .after(h),
            K(b, d, i, e),
            N(b, c, d, h, e),
            F(b, c, d, e),
            e === d.currentIndex && E(b, c, d),
            D(b, c, d),
            b
        );
    }
    function y(a, b, c) {
        o(a).splice(b, 0, c);
    }
    function z(b) {
        var c = a(this),
            d = m(c),
            e = n(c);
        if (d.suppressPaginationOnFocus && c.find(":focus").is(":input")) return b.preventDefault(), !1;
        var f = { left: 37, right: 39 };
        b.keyCode === f.left ? (b.preventDefault(), t(c, d, e)) : b.keyCode === f.right && (b.preventDefault(), s(c, d, e));
    }
    function A(b, c, d) {
        if (d.stepCount > 0) {
            var e = d.currentIndex,
                f = p(b, e);
            if (!c.enableContentCache || !f.contentLoaded)
                switch (r($, f.contentMode)) {
                    case $.iframe:
                        b.find(".content > .body")
                            .eq(d.currentIndex)
                            .empty()
                            .html('<iframe src="' + f.contentUrl + '" frameborder="0" scrolling="no" />')
                            .data("loaded", "1");
                        break;
                    case $.async:
                        var g = k(b, e)
                            ._aria("busy", "true")
                            .empty()
                            .append(M(c.loadingTemplate, { text: c.labels.loading }));
                        a.ajax({ url: f.contentUrl, cache: !1 }).done(function (a) {
                            g.empty().html(a)._aria("busy", "false").data("loaded", "1"), b.triggerHandler("contentLoaded", [e]);
                        });
                }
        }
    }
    function B(a, b, c, d) {
        var e = c.currentIndex;
        if (d >= 0 && d < c.stepCount && !(b.forceMoveForward && d < c.currentIndex)) {
            var f = j(a, d),
                g = f.parent(),
                h = g.hasClass("disabled");
            return g._enableAria(), f.click(), e === c.currentIndex && h ? (g._enableAria(!1), !1) : !0;
        }
        return !1;
    }
    function C(b) {
        b.preventDefault();
        var c = a(this),
            d = c.parent().parent().parent().parent(),
            f = m(d),
            g = n(d),
            i = c.attr("href");
        switch (i.substring(i.lastIndexOf("#") + 1)) {
            case "cancel":
                e(d);
                break;
            case "finish":
                if (install_success) {
                    api.send('quitApp', true);
                    h(d, g);
                } else {
                    api.send('restartApp', true);
                    h(d, g);
                }
                break;
            case "next":
                s(d, f, g);
                break;
            case "previous":
                t(d, f, g);
        }
    }
    function D(a, b, c) {
        if (b.enablePagination) {
            var d = a.find(".actions a[href$='#finish']").parent(),
                e = a.find(".actions a[href$='#next']").parent();
            if (!b.forceMoveForward) {
                var f = a.find(".actions a[href$='#previous']").parent();
                f._enableAria(c.currentIndex > 0);
            }
            b.enableFinishButton && b.showFinishButtonAlways
                ? (d._enableAria(c.stepCount > 0), e._enableAria(c.stepCount > 1 && c.stepCount > c.currentIndex + 1))
                : (d._showAria(b.enableFinishButton && c.stepCount === c.currentIndex + 1), e._showAria(0 === c.stepCount || c.stepCount > c.currentIndex + 1)._enableAria(c.stepCount > c.currentIndex + 1 || !b.enableFinishButton));
        }
    }
    function E(b, c, d, e) {
        var f = j(b, d.currentIndex),
            g = a('<span class="current-info audible">' + c.labels.current + " </span>"),
            h = b.find(".content > .title");
        if (null != e) {
            var i = j(b, e);
            i.parent().addClass("done").removeClass("error")._selectAria(!1), h.eq(e).removeClass("current").next(".body").removeClass("current"), (g = i.find(".current-info")), f.focus();
        }
        f.prepend(g).parent()._selectAria().removeClass("done")._enableAria(), h.eq(d.currentIndex).addClass("current").next(".body").addClass("current");
    }
    function F(a, b, c, d) {
        for (var e = q(a), f = d; f < c.stepCount; f++) {
            var g = e + V + f,
                h = e + W + f,
                i = e + X + f,
                j = a.find(".title").eq(f)._id(i);
            a
                .find(".steps a")
                .eq(f)
                ._id(g)
                ._aria("controls", h)
                .attr("href", "#" + i)
                .html(M(b.titleTemplate, { index: f + 1, title: j.html() })),
                a.find(".body").eq(f)._id(h)._aria("labelledby", i);
        }
    }
    function G(a, b) {
        var c = i(a);
        a.bind("canceled" + c, b.onCanceled),
            a.bind("contentLoaded" + c, b.onContentLoaded),
            a.bind("finishing" + c, b.onFinishing),
            a.bind("finished" + c, b.onFinished),
            a.bind("init" + c, b.onInit),
            a.bind("stepChanging" + c, b.onStepChanging),
            a.bind("stepChanged" + c, b.onStepChanged),
            b.enableKeyNavigation && a.bind("keyup" + c, z),
            a.find(".actions a").bind("click" + c, C);
    }
    function H(a, b, c, d) {
        return 0 > d || d >= c.stepCount || c.currentIndex === d
            ? !1
            : (I(a, d),
                c.currentIndex > d && (c.currentIndex--, O(a, b, c)),
                c.stepCount--,
                l(a, d).remove(),
                k(a, d).remove(),
                j(a, d).parent().remove(),
                0 === d && a.find(".steps li").first().addClass("first"),
                d === c.stepCount && a.find(".steps li").eq(d).addClass("last"),
                F(a, b, c, d),
                D(a, b, c),
                !0);
    }
    function I(a, b) {
        o(a).splice(b, 1);
    }
    function J(b, c, d) {
        var e = '<{0} class="{1}">{2}</{0}>',
            f = r(_, c.stepsOrientation),
            g = f === _.vertical ? " vertical" : "",
            h = a(e.format(c.contentContainerTag, "content " + c.clearFixCssClass, b.html())),
            i = a(e.format(c.stepsContainerTag, "steps " + c.clearFixCssClass, '<ul role="tablist"></ul>')),
            j = h.children(c.headerTag),
            k = h.children(c.bodyTag);
        b
            .attr("role", "application")
            .empty()
            .append(i)
            .append(h)
            .addClass(c.cssClass + " " + c.clearFixCssClass + g),
            k.each(function (c) {
                K(b, d, a(this), c);
            }),
            j.each(function (e) {
                N(b, c, d, a(this), e);
            }),
            E(b, c, d),
            L(b, c, d);
    }
    function K(a, b, c, d) {
        var e = q(a),
            f = e + W + d,
            g = e + X + d;
        c._id(f)
            .attr("role", "tabpanel")
            ._aria("labelledby", g)
            .addClass("body")
            ._showAria(b.currentIndex === d);
    }
    function L(a, b, c) {
        if (b.enablePagination) {
            var d = '<{0} class="actions {1}"><ul role="menu" aria-label="{2}">{3}</ul></{0}>',
                e = '<li><a href="#{0}" role="menuitem">{1}</a></li>',
                f = "";
            b.forceMoveForward || (f += e.format("previous", b.labels.previous)),
                (f += e.format("next", b.labels.next)),
                b.enableFinishButton && (f += e.format("finish", b.labels.finish)),
                b.enableCancelButton && (f += e.format("cancel", b.labels.cancel)),
                a.append(d.format(b.actionContainerTag, b.clearFixCssClass, b.labels.pagination, f)),
                D(a, b, c),
                A(a, b, c);
        }
    }
    function M(a, c) {
        for (var d = a.match(/#([a-z]*)#/gi), e = 0; e < d.length; e++) {
            var f = d[e],
                g = f.substring(1, f.length - 1);
            c[g] === b && R("The key '{0}' does not exist in the substitute collection!", g), (a = a.replace(f, c[g]));
        }
        return a;
    }
    function N(b, c, d, e, f) {
        var g = q(b),
            h = g + V + f,
            j = g + W + f,
            k = g + X + f,
            l = b.find(".steps > ul"),
            m = M(c.titleTemplate, { index: f + 1, title: e.html() }),
            n = a('<li role="tab"><a id="' + h + '" href="#' + k + '" aria-controls="' + j + '">' + m + "</a></li>");
        n._enableAria(c.enableAllSteps || d.currentIndex > f),
            d.currentIndex > f && n.addClass("done"),
            e._id(k).attr("tabindex", "-1").addClass("title"),
            0 === f
                ? l.prepend(n)
                : l
                    .find("li")
                    .eq(f - 1)
                    .after(n),
            0 === f && l.find("li").removeClass("first").eq(f).addClass("first"),
            f === d.stepCount - 1 && l.find("li").removeClass("last").eq(f).addClass("last"),
            n.children("a").bind("click" + i(b), Q);
    }
    function O(b, c, d) {
        c.saveState && a.cookie && a.cookie(U + q(b), d.currentIndex);
    }
    function P(b, c, d, e, f, g) {
        var h = b.find(".content > .body"),
            i = r(ab, c.transitionEffect),
            j = c.transitionEffectSpeed,
            k = h.eq(e),
            l = h.eq(f);
        switch (i) {
            case ab.fade:
            case ab.slide:
                var m = i === ab.fade ? "fadeOut" : "slideUp",
                    o = i === ab.fade ? "fadeIn" : "slideDown";
                (d.transitionElement = k),
                    l[m](j, function () {
                        var b = a(this)._showAria(!1).parent().parent(),
                            c = n(b);
                        c.transitionElement &&
                            (c.transitionElement[o](j, function () {
                                a(this)._showAria();
                            })
                                .promise()
                                .done(g),
                                (c.transitionElement = null));
                    });
                break;
            case ab.slideLeft:
                var p = l.outerWidth(!0),
                    q = e > f ? -p : p,
                    s = e > f ? p : -p;
                a.when(
                    l.animate({ left: q }, j, function () {
                        a(this)._showAria(!1);
                    }),
                    k
                        .css("left", s + "px")
                        ._showAria()
                        .animate({ left: 0 }, j)
                ).done(g);
                break;
            default:
                a.when(l._showAria(!1), k._showAria()).done(g);
        }
    }
    function Q(b) {
        b.preventDefault();
        var c = a(this),
            d = c.parent().parent().parent().parent(),
            e = m(d),
            f = n(d),
            g = f.currentIndex;
        if (c.parent().is(":not(.disabled):not(.current)")) {
            var h = c.attr("href"),
                i = parseInt(h.substring(h.lastIndexOf("-") + 1), 0);
            u(d, e, f, i);
        }
        return g === f.currentIndex ? (j(d, g).focus(), !1) : void 0;
    }
    function R(a) {
        throw (arguments.length > 1 && (a = a.format(Array.prototype.slice.call(arguments, 1))), new Error(a));
    }
    function S(a, b) {
        null == b && R("The argument '{0}' is null or undefined.", a);
    }
    a.fn.extend({
        _aria: function (a, b) {
            return this.attr("aria-" + a, b);
        },
        _removeAria: function (a) {
            return this.removeAttr("aria-" + a);
        },
        _enableAria: function (a) {
            return null == a || a ? this.removeClass("disabled")._aria("disabled", "false") : this.addClass("disabled")._aria("disabled", "true");
        },
        _showAria: function (a) {
            return null == a || a ? this.show()._aria("hidden", "false") : this.hide()._aria("hidden", "true");
        },
        _selectAria: function (a) {
            return null == a || a ? this.addClass("current")._aria("selected", "true") : this.removeClass("current")._aria("selected", "false");
        },
        _id: function (a) {
            return a ? this.attr("id", a) : this.attr("id");
        },
    }),
        String.prototype.format ||
        (String.prototype.format = function () {
            for (var b = 1 === arguments.length && a.isArray(arguments[0]) ? arguments[0] : arguments, c = this, d = 0; d < b.length; d++) {
                var e = new RegExp("\\{" + d + "\\}", "gm");
                c = c.replace(e, b[d]);
            }
            return c;
        });
    var T = 0,
        U = "jQu3ry_5teps_St@te_",
        V = "-t-",
        W = "-p-",
        X = "-h-",
        Y = "Index out of range.",
        Z = "One or more corresponding step {0} are missing.";
    (a.fn.steps = function (b) {
        return a.fn.steps[b] ? a.fn.steps[b].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof b && b ? void a.error("Method " + b + " does not exist on jQuery.steps") : w.apply(this, arguments);
    }),
        (a.fn.steps.add = function (a) {
            var b = n(this);
            return x(this, m(this), b, b.stepCount, a);
        }),
        (a.fn.steps.destroy = function () {
            return g(this, m(this));
        }),
        (a.fn.steps.finish = function () {
            h(this, n(this));
        }),
        (a.fn.steps.getCurrentIndex = function () {
            return n(this).currentIndex;
        }),
        (a.fn.steps.getCurrentStep = function () {
            return p(this, n(this).currentIndex);
        }),
        (a.fn.steps.getStep = function (a) {
            return p(this, a);
        }),
        (a.fn.steps.insert = function (a, b) {
            return x(this, m(this), n(this), a, b);
        }),
        (a.fn.steps.next = function () {
            return s(this, m(this), n(this));
        }),
        (a.fn.steps.previous = function () {
            return t(this, m(this), n(this));
        }),
        (a.fn.steps.remove = function (a) {
            return H(this, m(this), n(this), a);
        }),
        (a.fn.steps.setStep = function () {
            throw new Error("Not yet implemented!");
        }),
        (a.fn.steps.skip = function () {
            throw new Error("Not yet implemented!");
        });
    var $ = (a.fn.steps.contentMode = { html: 0, iframe: 1, async: 2 }),
        _ = (a.fn.steps.stepsOrientation = { horizontal: 0, vertical: 1 }),
        ab = (a.fn.steps.transitionEffect = { none: 0, fade: 1, slide: 2, slideLeft: 3 }),
        bb = (a.fn.steps.stepModel = { title: "", content: "", contentUrl: "", contentMode: $.html, contentLoaded: !1 }),
        cb = (a.fn.steps.defaults = {
            headerTag: "h1",
            bodyTag: "div",
            contentContainerTag: "div",
            actionContainerTag: "div",
            stepsContainerTag: "div",
            cssClass: "wizard",
            clearFixCssClass: "clearfix",
            stepsOrientation: _.horizontal,
            titleTemplate: '<span class="number">#index#.</span> #title#',
            loadingTemplate: '<span class="spinner"></span> #text#',
            autoFocus: !1,
            enableAllSteps: !1,
            enableKeyNavigation: !0,
            enablePagination: !0,
            suppressPaginationOnFocus: !0,
            enableContentCache: !0,
            enableCancelButton: !1,
            enableFinishButton: !0,
            preloadContent: !1,
            showFinishButtonAlways: !1,
            forceMoveForward: !1,
            saveState: !1,
            startIndex: 0,
            transitionEffect: ab.none,
            transitionEffectSpeed: 200,
            onStepChanging: function () {
                return !0;
            },
            onStepChanged: function () { },
            onCanceled: function () { },
            onFinishing: function () {
                return !0;
            },
            onFinished: function () { },
            onContentLoaded: function () { },
            onInit: function () { },
            labels: { cancel: "Cancel", current: "current step:", pagination: "Pagination", finish: "Finish", next: "Next", previous: "Previous", loading: "Loading ..." },
        });
})(jQuery);