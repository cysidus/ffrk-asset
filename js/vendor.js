;
define("vendor", function() {});
(function(e, bb) {
    var t, n, r = typeof bb,
        i = e.location,
        o = e.document,
        s = o.documentElement,
        a = e.jQuery,
        u = e.$,
        l = {},
        c = [],
        p = "2.0.3",
        f = c.concat,
        h = c.push,
        d = c.slice,
        g = c.indexOf,
        m = l.toString,
        y = l.hasOwnProperty,
        v = p.trim,
        x = function(e, n) {
            return new x.fn.init(e, n, t)
        },
        b = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        w = /\S+/g,
        T = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        C = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        k = /^-ms-/,
        N = /-([\da-z])/gi,
        E = function(e, t) {
            return t.toUpperCase()
        },
        S = function() {
            o.removeEventListener("DOMContentLoaded", S, !1), e.removeEventListener("load", S, !1), x.ready()
        };
    x.fn = x.prototype = {
        jquery: p,
        constructor: x,
        init: function(e, t, n) {
            var r, i;
            if (!e) return this;
            if ("string" == typeof e) {
                if (r = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : T.exec(e), !r || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                if (r[1]) {
                    if (t = t instanceof x ? t[0] : t, x.merge(this, x.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : o, !0)), C.test(r[1]) && x.isPlainObject(t))
                        for (r in t) x.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                    return this
                }
                return i = o.getElementById(r[2]), i && i.parentNode && (this.length = 1, this[0] = i), this.context = o, this.selector = e, this
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : x.isFunction(e) ? n.ready(e) : (e.selector !== bb && (this.selector = e.selector, this.context = e.context), x.makeArray(e, this))
        },
        selector: "",
        length: 0,
        toArray: function() {
            return d.call(this)
        },
        get: function(e) {
            return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
        },
        pushStack: function(e) {
            var t = x.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        },
        each: function(e, t) {
            return x.each(this, e, t)
        },
        ready: function(e) {
            return x.ready.promise().done(e), this
        },
        slice: function() {
            return this.pushStack(d.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        },
        map: function(e) {
            return this.pushStack(x.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: h,
        sort: [].sort,
        splice: [].splice
    }, x.fn.init.prototype = x.fn, x.extend = x.fn.extend = function() {
        var e, t, n, r, i, o, s = arguments[0] || {},
            a = 1,
            u = arguments.length,
            l = !1;
        for ("boolean" == typeof s && (l = s, s = arguments[1] || {}, a = 2), "object" == typeof s || x.isFunction(s) || (s = {}), u === a && (s = this, --a); u > a; a++)
            if (null != (e = arguments[a]))
                for (t in e) n = s[t], r = e[t], s !== r && (l && r && (x.isPlainObject(r) || (i = x.isArray(r))) ? (i ? (i = !1, o = n && x.isArray(n) ? n : []) : o = n && x.isPlainObject(n) ? n : {}, s[t] = x.extend(l, o, r)) : r !== bb && (s[t] = r));
        return s
    }, x.extend({
        expando: "jQuery" + (p + Math.random()).replace(/\D/g, ""),
        noConflict: function(t) {
            return e.$ === x && (e.$ = u), t && e.jQuery === x && (e.jQuery = a), x
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? x.readyWait++ : x.ready(!0)
        },
        ready: function(e) {
            (e === !0 ? --x.readyWait : x.isReady) || (x.isReady = !0, e !== !0 && --x.readyWait > 0 || (n.resolveWith(o, [x]), x.fn.trigger && x(o).trigger("ready").off("ready")))
        },
        isFunction: function(e) {
            return "function" === x.type(e)
        },
        isArray: Array.isArray,
        isWindow: function(e) {
            return null != e && e === e.window
        },
        isNumeric: function(e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? l[m.call(e)] || "object" : typeof e
        },
        isPlainObject: function(e) {
            if ("object" !== x.type(e) || e.nodeType || x.isWindow(e)) return !1;
            try {
                if (e.constructor && !y.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (t) {
                return !1
            }
            return !0
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        error: function(e) {
            throw Error(e)
        },
        parseHTML: function(e, t, n) {
            if (!e || "string" != typeof e) return null;
            "boolean" == typeof t && (n = t, t = !1), t = t || o;
            var r = C.exec(e),
                i = !n && [];
            return r ? [t.createElement(r[1])] : (r = x.buildFragment([e], t, i), i && x(i).remove(), x.merge([], r.childNodes))
        },
        parseJSON: JSON.parse,
        parseXML: function(e) {
            var t, n;
            if (!e || "string" != typeof e) return null;
            try {
                n = new DOMParser, t = n.parseFromString(e, "text/xml")
            } catch (r) {
                t = bb
            }
            return (!t || t.getElementsByTagName("parsererror").length) && x.error("Invalid XML: " + e), t
        },
        noop: function() {},
        globalEval: function(e) {
            var t, n = eval;
            e = x.trim(e), e && (1 === e.indexOf("use strict") ? (t = o.createElement("script"), t.text = e, o.head.appendChild(t).parentNode.removeChild(t)) : n(e))
        },
        camelCase: function(e) {
            return e.replace(k, "ms-").replace(N, E)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, t, n) {
            var r, i = 0,
                o = e.length,
                s = j(e);
            if (n) {
                if (s) {
                    for (; o > i; i++)
                        if (r = t.apply(e[i], n), r === !1) break
                } else
                    for (i in e)
                        if (r = t.apply(e[i], n), r === !1) break
            } else if (s) {
                for (; o > i; i++)
                    if (r = t.call(e[i], i, e[i]), r === !1) break
            } else
                for (i in e)
                    if (r = t.call(e[i], i, e[i]), r === !1) break; return e
        },
        trim: function(e) {
            return null == e ? "" : v.call(e)
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (j(Object(e)) ? x.merge(n, "string" == typeof e ? [e] : e) : h.call(n, e)), n
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : g.call(t, e, n)
        },
        merge: function(e, t) {
            var n = t.length,
                r = e.length,
                i = 0;
            if ("number" == typeof n)
                for (; n > i; i++) e[r++] = t[i];
            else
                while (t[i] !== bb) e[r++] = t[i++];
            return e.length = r, e
        },
        grep: function(e, t, n) {
            var r, i = [],
                o = 0,
                s = e.length;
            for (n = !!n; s > o; o++) r = !!t(e[o], o), n !== r && i.push(e[o]);
            return i
        },
        map: function(e, t, n) {
            var r, i = 0,
                o = e.length,
                s = j(e),
                a = [];
            if (s)
                for (; o > i; i++) r = t(e[i], i, n), null != r && (a[a.length] = r);
            else
                for (i in e) r = t(e[i], i, n), null != r && (a[a.length] = r);
            return f.apply([], a)
        },
        guid: 1,
        proxy: function(e, t) {
            var n, r, i;
            return "string" == typeof t && (n = e[t], t = e, e = n), x.isFunction(e) ? (r = d.call(arguments, 2), i = function() {
                return e.apply(t || this, r.concat(d.call(arguments)))
            }, i.guid = e.guid = e.guid || x.guid++, i) : bb
        },
        access: function(e, t, n, r, i, o, s) {
            var a = 0,
                u = e.length,
                l = null == n;
            if ("object" === x.type(n)) {
                i = !0;
                for (a in n) x.access(e, t, a, n[a], !0, o, s)
            } else if (r !== bb && (i = !0, x.isFunction(r) || (s = !0), l && (s ? (t.call(e, r), t = null) : (l = t, t = function(e, t, n) {
                    return l.call(x(e), n)
                })), t))
                for (; u > a; a++) t(e[a], n, s ? r : r.call(e[a], a, t(e[a], n)));
            return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
        },
        now: Date.now,
        swap: function(e, t, n, r) {
            var i, o, s = {};
            for (o in t) s[o] = e.style[o], e.style[o] = t[o];
            i = n.apply(e, r || []);
            for (o in t) e.style[o] = s[o];
            return i
        }
    }), x.ready.promise = function(t) {
        return n || (n = x.Deferred(), "complete" === o.readyState ? setTimeout(x.ready) : (o.addEventListener("DOMContentLoaded", S, !1), e.addEventListener("load", S, !1))), n.promise(t)
    }, x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
        l["[object " + t + "]"] = t.toLowerCase()
    });

    function j(e) {
        var t = e.length,
            n = x.type(e);
        return x.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }
    t = x(o),
        function(e, ba) {
            var t, n, r, i, o, s, a, u, l, c, p, f, h, d, g, m, y, v = "sizzle" + -new Date,
                b = e.document,
                w = 0,
                T = 0,
                C = st(),
                k = st(),
                N = st(),
                E = !1,
                S = function(e, t) {
                    return e === t ? (E = !0, 0) : 0
                },
                j = typeof ba,
                D = 1 << 31,
                A = {}.hasOwnProperty,
                L = [],
                q = L.pop,
                H = L.push,
                O = L.push,
                F = L.slice,
                P = L.indexOf || function(e) {
                    var t = 0,
                        n = this.length;
                    for (; n > t; t++)
                        if (this[t] === e) return t;
                    return -1
                },
                R = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                M = "[\\x20\\t\\r\\n\\f]",
                W = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                $ = W.replace("w", "w#"),
                B = "\\[" + M + "*(" + W + ")" + M + "*(?:([*^$|!~]?=)" + M + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + $ + ")|)|)" + M + "*\\]",
                I = ":(" + W + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + B.replace(3, 8) + ")*)|.*)\\)|)",
                z = RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"),
                _ = RegExp("^" + M + "*," + M + "*"),
                X = RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"),
                U = RegExp(M + "*[+~]"),
                Y = RegExp("=" + M + "*([^\\]'\"]*)" + M + "*\\]", "g"),
                V = RegExp(I),
                G = RegExp("^" + $ + "$"),
                J = {
                    ID: RegExp("^#(" + W + ")"),
                    CLASS: RegExp("^\\.(" + W + ")"),
                    TAG: RegExp("^(" + W.replace("w", "w*") + ")"),
                    ATTR: RegExp("^" + B),
                    PSEUDO: RegExp("^" + I),
                    CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"),
                    bool: RegExp("^(?:" + R + ")$", "i"),
                    needsContext: RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i")
                },
                Q = /^[^{]+\{\s*\[native \w/,
                K = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                Z = /^(?:input|select|textarea|button)$/i,
                et = /^h\d$/i,
                bc = /'|\\/g,
                nt = RegExp("\\\\([\\da-f]{1,6}" + M + "?|(" + M + ")|.)", "ig"),
                rt = function(e, t, n) {
                    var r = "0x" + t - 65536;
                    return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(55296 | r >> 10, 56320 | 1023 & r)
                };
            try {
                O.apply(L = F.call(b.childNodes), b.childNodes), L[b.childNodes.length].nodeType
            } catch (it) {
                O = {
                    apply: L.length ? function(e, t) {
                        H.apply(e, F.call(t))
                    } : function(e, t) {
                        var n = e.length,
                            r = 0;
                        while (e[n++] = t[r++]);
                        e.length = n - 1
                    }
                }
            }

            function ot(e, t, r, i) {
                var o, s, a, u, l, f, g, m, x, w;
                if ((t ? t.ownerDocument || t : b) !== p && c(t), t = t || p, r = r || [], !e || "string" != typeof e) return r;
                if (1 !== (u = t.nodeType) && 9 !== u) return [];
                if (h && !i) {
                    if (o = K.exec(e))
                        if (a = o[1]) {
                            if (9 === u) {
                                if (s = t.getElementById(a), !s || !s.parentNode) return r;
                                if (s.id === a) return r.push(s), r
                            } else if (t.ownerDocument && (s = t.ownerDocument.getElementById(a)) && y(t, s) && s.id === a) return r.push(s), r
                        } else {
                            if (o[2]) return O.apply(r, t.getElementsByTagName(e)), r;
                            if ((a = o[3]) && n.getElementsByClassName && t.getElementsByClassName) return O.apply(r, t.getElementsByClassName(a)), r
                        }
                    if (n.qsa && (!d || !d.test(e))) {
                        if (m = g = v, x = t, w = 9 === u && e, 1 === u && "object" !== t.nodeName.toLowerCase()) {
                            f = gt(e), (g = t.getAttribute("id")) ? m = g.replace(bc, "\\$&") : t.setAttribute("id", m), m = "[id='" + m + "'] ", l = f.length;
                            while (l--) f[l] = m + mt(f[l]);
                            x = U.test(e) && t.parentNode || t, w = f.join(",")
                        }
                        if (w) try {
                            return O.apply(r, x.querySelectorAll(w)), r
                        } catch (T) {} finally {
                            g || t.removeAttribute("id")
                        }
                    }
                }
                return kt(e.replace(z, "$1"), t, r, i)
            }

            function st() {
                var e = [];

                function t(n, r) {
                    return e.push(n += " ") > i.cacheLength && delete t[e.shift()], t[n] = r
                }
                return t
            }

            function at(e) {
                return e[v] = !0, e
            }

            function ut(e) {
                var t = p.createElement("div");
                try {
                    return !!e(t)
                } catch (n) {
                    return !1
                } finally {
                    t.parentNode && t.parentNode.removeChild(t), t = null
                }
            }

            function lt(e, t) {
                var n = e.split("|"),
                    r = e.length;
                while (r--) i.attrHandle[n[r]] = t
            }

            function ct(e, t) {
                var n = t && e,
                    r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || D) - (~e.sourceIndex || D);
                if (r) return r;
                if (n)
                    while (n = n.nextSibling)
                        if (n === t) return -1;
                return e ? 1 : -1
            }

            function pt(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return "input" === n && t.type === e
                }
            }

            function ft(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return ("input" === n || "button" === n) && t.type === e
                }
            }

            function ht(e) {
                return at(function(t) {
                    return t = +t, at(function(n, r) {
                        var i, o = e([], n.length, t),
                            s = o.length;
                        while (s--) n[i = o[s]] && (n[i] = !(r[i] = n[i]))
                    })
                })
            }
            s = ot.isXML = function(e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return t ? "HTML" !== t.nodeName : !1
            }, n = ot.support = {}, c = ot.setDocument = function(e) {
                var t = e ? e.ownerDocument || e : b,
                    r = t.defaultView;
                return t !== p && 9 === t.nodeType && t.documentElement ? (p = t, f = t.documentElement, h = !s(t), r && r.attachEvent && r !== r.top && r.attachEvent("onbeforeunload", function() {
                    c()
                }), n.attributes = ut(function(e) {
                    return e.className = "i", !e.getAttribute("className")
                }), n.getElementsByTagName = ut(function(e) {
                    return e.appendChild(t.createComment("")), !e.getElementsByTagName("*").length
                }), n.getElementsByClassName = ut(function(e) {
                    return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
                }), n.getById = ut(function(e) {
                    return f.appendChild(e).id = v, !t.getElementsByName || !t.getElementsByName(v).length
                }), n.getById ? (i.find.ID = function(e, t) {
                    if (typeof t.getElementById !== j && h) {
                        var n = t.getElementById(e);
                        return n && n.parentNode ? [n] : []
                    }
                }, i.filter.ID = function(e) {
                    var t = e.replace(nt, rt);
                    return function(e) {
                        return e.getAttribute("id") === t
                    }
                }) : (delete i.find.ID, i.filter.ID = function(e) {
                    var t = e.replace(nt, rt);
                    return function(e) {
                        var n = typeof e.getAttributeNode !== j && e.getAttributeNode("id");
                        return n && n.value === t
                    }
                }), i.find.TAG = n.getElementsByTagName ? function(e, t) {
                    return typeof t.getElementsByTagName !== j ? t.getElementsByTagName(e) : ba
                } : function(e, t) {
                    var n, r = [],
                        i = 0,
                        o = t.getElementsByTagName(e);
                    if ("*" === e) {
                        while (n = o[i++]) 1 === n.nodeType && r.push(n);
                        return r
                    }
                    return o
                }, i.find.CLASS = n.getElementsByClassName && function(e, t) {
                    return typeof t.getElementsByClassName !== j && h ? t.getElementsByClassName(e) : ba
                }, g = [], d = [], (n.qsa = Q.test(t.querySelectorAll)) && (ut(function(e) {
                    e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || d.push("\\[" + M + "*(?:value|" + R + ")"), e.querySelectorAll(":checked").length || d.push(":checked")
                }), ut(function(e) {
                    var n = t.createElement("input");
                    n.setAttribute("type", "hidden"), e.appendChild(n).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && d.push("[*^$]=" + M + "*(?:''|\"\")"), e.querySelectorAll(":enabled").length || d.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), d.push(",.*:")
                })), (n.matchesSelector = Q.test(m = f.webkitMatchesSelector || f.mozMatchesSelector || f.oMatchesSelector || f.msMatchesSelector)) && ut(function(e) {
                    n.disconnectedMatch = m.call(e, "div"), m.call(e, "[s!='']:x"), g.push("!=", I)
                }), d = d.length && RegExp(d.join("|")), g = g.length && RegExp(g.join("|")), y = Q.test(f.contains) || f.compareDocumentPosition ? function(e, t) {
                    var n = 9 === e.nodeType ? e.documentElement : e,
                        r = t && t.parentNode;
                    return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                } : function(e, t) {
                    if (t)
                        while (t = t.parentNode)
                            if (t === e) return !0;
                    return !1
                }, S = f.compareDocumentPosition ? function(e, r) {
                    if (e === r) return E = !0, 0;
                    var i = r.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(r);
                    return i ? 1 & i || !n.sortDetached && r.compareDocumentPosition(e) === i ? e === t || y(b, e) ? -1 : r === t || y(b, r) ? 1 : l ? P.call(l, e) - P.call(l, r) : 0 : 4 & i ? -1 : 1 : e.compareDocumentPosition ? -1 : 1
                } : function(e, n) {
                    var r, i = 0,
                        o = e.parentNode,
                        s = n.parentNode,
                        a = [e],
                        u = [n];
                    if (e === n) return E = !0, 0;
                    if (!o || !s) return e === t ? -1 : n === t ? 1 : o ? -1 : s ? 1 : l ? P.call(l, e) - P.call(l, n) : 0;
                    if (o === s) return ct(e, n);
                    r = e;
                    while (r = r.parentNode) a.unshift(r);
                    r = n;
                    while (r = r.parentNode) u.unshift(r);
                    while (a[i] === u[i]) i++;
                    return i ? ct(a[i], u[i]) : a[i] === b ? -1 : u[i] === b ? 1 : 0
                }, t) : p
            }, ot.matches = function(e, t) {
                return ot(e, null, null, t)
            }, ot.matchesSelector = function(e, t) {
                if ((e.ownerDocument || e) !== p && c(e), t = t.replace(Y, "='$1']"), !(!n.matchesSelector || !h || g && g.test(t) || d && d.test(t))) try {
                    var r = m.call(e, t);
                    if (r || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
                } catch (i) {}
                return ot(t, p, null, [e]).length > 0
            }, ot.contains = function(e, t) {
                return (e.ownerDocument || e) !== p && c(e), y(e, t)
            }, ot.attr = function(e, t) {
                (e.ownerDocument || e) !== p && c(e);
                var r = i.attrHandle[t.toLowerCase()],
                    o = r && A.call(i.attrHandle, t.toLowerCase()) ? r(e, t, !h) : ba;
                return o === ba ? n.attributes || !h ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null : o
            }, ot.error = function(e) {
                throw Error("Syntax error, unrecognized expression: " + e)
            }, ot.uniqueSort = function(e) {
                var t, r = [],
                    i = 0,
                    o = 0;
                if (E = !n.detectDuplicates, l = !n.sortStable && e.slice(0), e.sort(S), E) {
                    while (t = e[o++]) t === e[o] && (i = r.push(o));
                    while (i--) e.splice(r[i], 1)
                }
                return e
            }, o = ot.getText = function(e) {
                var t, n = "",
                    r = 0,
                    i = e.nodeType;
                if (i) {
                    if (1 === i || 9 === i || 11 === i) {
                        if ("string" == typeof e.textContent) return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) n += o(e)
                    } else if (3 === i || 4 === i) return e.nodeValue
                } else
                    for (; t = e[r]; r++) n += o(t);
                return n
            }, i = ot.selectors = {
                cacheLength: 50,
                createPseudo: at,
                match: J,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(e) {
                        return e[1] = e[1].replace(nt, rt), e[3] = (e[4] || e[5] || "").replace(nt, rt), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || ot.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && ot.error(e[0]), e
                    },
                    PSEUDO: function(e) {
                        var t, n = !e[5] && e[2];
                        return J.CHILD.test(e[0]) ? null : (e[3] && e[4] !== ba ? e[2] = e[4] : n && V.test(n) && (t = gt(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(e) {
                        var t = e.replace(nt, rt).toLowerCase();
                        return "*" === e ? function() {
                            return !0
                        } : function(e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t
                        }
                    },
                    CLASS: function(e) {
                        var t = C[e + " "];
                        return t || (t = RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) && C(e, function(e) {
                            return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== j && e.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(e, t, n) {
                        return function(r) {
                            var i = ot.attr(r, e);
                            return null == i ? "!=" === t : t ? (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i + " ").indexOf(n) > -1 : "|=" === t ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0
                        }
                    },
                    CHILD: function(e, t, n, r, i) {
                        var o = "nth" !== e.slice(0, 3),
                            s = "last" !== e.slice(-4),
                            a = "of-type" === t;
                        return 1 === r && 0 === i ? function(e) {
                            return !!e.parentNode
                        } : function(t, n, u) {
                            var l, c, p, f, h, d, g = o !== s ? "nextSibling" : "previousSibling",
                                m = t.parentNode,
                                y = a && t.nodeName.toLowerCase(),
                                x = !u && !a;
                            if (m) {
                                if (o) {
                                    while (g) {
                                        p = t;
                                        while (p = p[g])
                                            if (a ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) return !1;
                                        d = g = "only" === e && !d && "nextSibling"
                                    }
                                    return !0
                                }
                                if (d = [s ? m.firstChild : m.lastChild], s && x) {
                                    c = m[v] || (m[v] = {}), l = c[e] || [], h = l[0] === w && l[1], f = l[0] === w && l[2], p = h && m.childNodes[h];
                                    while (p = ++h && p && p[g] || (f = h = 0) || d.pop())
                                        if (1 === p.nodeType && ++f && p === t) {
                                            c[e] = [w, h, f];
                                            break
                                        }
                                } else if (x && (l = (t[v] || (t[v] = {}))[e]) && l[0] === w) f = l[1];
                                else
                                    while (p = ++h && p && p[g] || (f = h = 0) || d.pop())
                                        if ((a ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) && ++f && (x && ((p[v] || (p[v] = {}))[e] = [w, f]), p === t)) break; return f -= i, f === r || 0 === f % r && f / r >= 0
                            }
                        }
                    },
                    PSEUDO: function(e, t) {
                        var n, r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || ot.error("unsupported pseudo: " + e);
                        return r[v] ? r(t) : r.length > 1 ? (n = [e, e, "", t], i.setFilters.hasOwnProperty(e.toLowerCase()) ? at(function(e, n) {
                            var i, o = r(e, t),
                                s = o.length;
                            while (s--) i = P.call(e, o[s]), e[i] = !(n[i] = o[s])
                        }) : function(e) {
                            return r(e, 0, n)
                        }) : r
                    }
                },
                pseudos: {
                    not: at(function(e) {
                        var t = [],
                            n = [],
                            r = a(e.replace(z, "$1"));
                        return r[v] ? at(function(e, t, n, i) {
                            var o, s = r(e, null, i, []),
                                a = e.length;
                            while (a--)(o = s[a]) && (e[a] = !(t[a] = o))
                        }) : function(e, i, o) {
                            return t[0] = e, r(t, null, o, n), !n.pop()
                        }
                    }),
                    has: at(function(e) {
                        return function(t) {
                            return ot(e, t).length > 0
                        }
                    }),
                    contains: at(function(e) {
                        return function(t) {
                            return (t.textContent || t.innerText || o(t)).indexOf(e) > -1
                        }
                    }),
                    lang: at(function(e) {
                        return G.test(e || "") || ot.error("unsupported lang: " + e), e = e.replace(nt, rt).toLowerCase(),
                            function(t) {
                                var n;
                                do
                                    if (n = h ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-");
                                while ((t = t.parentNode) && 1 === t.nodeType);
                                return !1
                            }
                    }),
                    target: function(t) {
                        var n = e.location && e.location.hash;
                        return n && n.slice(1) === t.id
                    },
                    root: function(e) {
                        return e === f
                    },
                    focus: function(e) {
                        return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    },
                    enabled: function(e) {
                        return e.disabled === !1
                    },
                    disabled: function(e) {
                        return e.disabled === !0
                    },
                    checked: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    },
                    selected: function(e) {
                        return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                    },
                    empty: function(e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1;
                        return !0
                    },
                    parent: function(e) {
                        return !i.pseudos.empty(e)
                    },
                    header: function(e) {
                        return et.test(e.nodeName)
                    },
                    input: function(e) {
                        return Z.test(e.nodeName)
                    },
                    button: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    },
                    text: function(e) {
                        var t;
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type)
                    },
                    first: ht(function() {
                        return [0]
                    }),
                    last: ht(function(e, t) {
                        return [t - 1]
                    }),
                    eq: ht(function(e, t, n) {
                        return [0 > n ? n + t : n]
                    }),
                    even: ht(function(e, t) {
                        var n = 0;
                        for (; t > n; n += 2) e.push(n);
                        return e
                    }),
                    odd: ht(function(e, t) {
                        var n = 1;
                        for (; t > n; n += 2) e.push(n);
                        return e
                    }),
                    lt: ht(function(e, t, n) {
                        var r = 0 > n ? n + t : n;
                        for (; --r >= 0;) e.push(r);
                        return e
                    }),
                    gt: ht(function(e, t, n) {
                        var r = 0 > n ? n + t : n;
                        for (; t > ++r;) e.push(r);
                        return e
                    })
                }
            }, i.pseudos.nth = i.pseudos.eq;
            for (t in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) i.pseudos[t] = pt(t);
            for (t in {
                    submit: !0,
                    reset: !0
                }) i.pseudos[t] = ft(t);

            function dt() {}
            dt.prototype = i.filters = i.pseudos, i.setFilters = new dt;

            function gt(e, t) {
                var n, r, o, s, a, u, l, c = k[e + " "];
                if (c) return t ? 0 : c.slice(0);
                a = e, u = [], l = i.preFilter;
                while (a) {
                    (!n || (r = _.exec(a))) && (r && (a = a.slice(r[0].length) || a), u.push(o = [])), n = !1, (r = X.exec(a)) && (n = r.shift(), o.push({
                        value: n,
                        type: r[0].replace(z, " ")
                    }), a = a.slice(n.length));
                    for (s in i.filter) !(r = J[s].exec(a)) || l[s] && !(r = l[s](r)) || (n = r.shift(), o.push({
                        value: n,
                        type: s,
                        matches: r
                    }), a = a.slice(n.length));
                    if (!n) break
                }
                return t ? a.length : a ? ot.error(e) : k(e, u).slice(0)
            }

            function mt(e) {
                var t = 0,
                    n = e.length,
                    r = "";
                for (; n > t; t++) r += e[t].value;
                return r
            }

            function yt(e, t, n) {
                var i = t.dir,
                    o = n && "parentNode" === i,
                    s = T++;
                return t.first ? function(t, n, r) {
                    while (t = t[i])
                        if (1 === t.nodeType || o) return e(t, n, r)
                } : function(t, n, a) {
                    var u, l, c, p = w + " " + s;
                    if (a) {
                        while (t = t[i])
                            if ((1 === t.nodeType || o) && e(t, n, a)) return !0
                    } else
                        while (t = t[i])
                            if (1 === t.nodeType || o)
                                if (c = t[v] || (t[v] = {}), (l = c[i]) && l[0] === p) {
                                    if ((u = l[1]) === !0 || u === r) return u === !0
                                } else if (l = c[i] = [p], l[1] = e(t, n, a) || r, l[1] === !0) return !0
                }
            }

            function bd(e) {
                return e.length > 1 ? function(t, n, r) {
                    var i = e.length;
                    while (i--)
                        if (!e[i](t, n, r)) return !1;
                    return !0
                } : e[0]
            }

            function xt(e, t, n, r, i) {
                var o, s = [],
                    a = 0,
                    u = e.length,
                    l = null != t;
                for (; u > a; a++)(o = e[a]) && (!n || n(o, r, i)) && (s.push(o), l && t.push(a));
                return s
            }

            function bt(e, t, n, r, i, o) {
                return r && !r[v] && (r = bt(r)), i && !i[v] && (i = bt(i, o)), at(function(o, s, a, u) {
                    var l, c, p, f = [],
                        h = [],
                        d = s.length,
                        g = o || Ct(t || "*", a.nodeType ? [a] : a, []),
                        m = !e || !o && t ? g : xt(g, f, e, a, u),
                        y = n ? i || (o ? e : d || r) ? [] : s : m;
                    if (n && n(m, y, a, u), r) {
                        l = xt(y, h), r(l, [], a, u), c = l.length;
                        while (c--)(p = l[c]) && (y[h[c]] = !(m[h[c]] = p))
                    }
                    if (o) {
                        if (i || e) {
                            if (i) {
                                l = [], c = y.length;
                                while (c--)(p = y[c]) && l.push(m[c] = p);
                                i(null, y = [], l, u)
                            }
                            c = y.length;
                            while (c--)(p = y[c]) && (l = i ? P.call(o, p) : f[c]) > -1 && (o[l] = !(s[l] = p))
                        }
                    } else y = xt(y === s ? y.splice(d, y.length) : y), i ? i(null, s, y, u) : O.apply(s, y)
                })
            }

            function wt(e) {
                var t, n, r, o = e.length,
                    s = i.relative[e[0].type],
                    a = s || i.relative[" "],
                    l = s ? 1 : 0,
                    c = yt(function(e) {
                        return e === t
                    }, a, !0),
                    p = yt(function(e) {
                        return P.call(t, e) > -1
                    }, a, !0),
                    f = [function(e, n, r) {
                        return !s && (r || n !== u) || ((t = n).nodeType ? c(e, n, r) : p(e, n, r))
                    }];
                for (; o > l; l++)
                    if (n = i.relative[e[l].type]) f = [yt(bd(f), n)];
                    else {
                        if (n = i.filter[e[l].type].apply(null, e[l].matches), n[v]) {
                            for (r = ++l; o > r; r++)
                                if (i.relative[e[r].type]) break;
                            return bt(l > 1 && bd(f), l > 1 && mt(e.slice(0, l - 1).concat({
                                value: " " === e[l - 2].type ? "*" : ""
                            })).replace(z, "$1"), n, r > l && wt(e.slice(l, r)), o > r && wt(e = e.slice(r)), o > r && mt(e))
                        }
                        f.push(n)
                    }
                return bd(f)
            }

            function Tt(e, t) {
                var n = 0,
                    o = t.length > 0,
                    s = e.length > 0,
                    a = function(a, l, c, f, h) {
                        var d, g, m, y = [],
                            v = 0,
                            x = "0",
                            b = a && [],
                            T = null != h,
                            C = u,
                            k = a || s && i.find.TAG("*", h && l.parentNode || l),
                            N = w += null == C ? 1 : Math.random() || .1;
                        for (T && (u = l !== p && l, r = n); null != (d = k[x]); x++) {
                            if (s && d) {
                                g = 0;
                                while (m = e[g++])
                                    if (m(d, l, c)) {
                                        f.push(d);
                                        break
                                    }
                                T && (w = N, r = ++n)
                            }
                            o && ((d = !m && d) && v--, a && b.push(d))
                        }
                        if (v += x, o && x !== v) {
                            g = 0;
                            while (m = t[g++]) m(b, y, l, c);
                            if (a) {
                                if (v > 0)
                                    while (x--) b[x] || y[x] || (y[x] = q.call(f));
                                y = xt(y)
                            }
                            O.apply(f, y), T && !a && y.length > 0 && v + t.length > 1 && ot.uniqueSort(f)
                        }
                        return T && (w = N, u = C), b
                    };
                return o ? at(a) : a
            }
            a = ot.compile = function(e, t) {
                var n, r = [],
                    i = [],
                    o = N[e + " "];
                if (!o) {
                    t || (t = gt(e)), n = t.length;
                    while (n--) o = wt(t[n]), o[v] ? r.push(o) : i.push(o);
                    o = N(e, Tt(i, r))
                }
                return o
            };

            function Ct(e, t, n) {
                var r = 0,
                    i = t.length;
                for (; i > r; r++) ot(e, t[r], n);
                return n
            }

            function kt(e, t, r, o) {
                var s, u, l, c, p, f = gt(e);
                if (!o && 1 === f.length) {
                    if (u = f[0] = f[0].slice(0), u.length > 2 && "ID" === (l = u[0]).type && n.getById && 9 === t.nodeType && h && i.relative[u[1].type]) {
                        if (t = (i.find.ID(l.matches[0].replace(nt, rt), t) || [])[0], !t) return r;
                        e = e.slice(u.shift().value.length)
                    }
                    s = J.needsContext.test(e) ? 0 : u.length;
                    while (s--) {
                        if (l = u[s], i.relative[c = l.type]) break;
                        if ((p = i.find[c]) && (o = p(l.matches[0].replace(nt, rt), U.test(u[0].type) && t.parentNode || t))) {
                            if (u.splice(s, 1), e = o.length && mt(u), !e) return O.apply(r, o), r;
                            break
                        }
                    }
                }
                return a(e, f)(o, t, !h, r, U.test(e)), r
            }
            n.sortStable = v.split("").sort(S).join("") === v, n.detectDuplicates = E, c(), n.sortDetached = ut(function(e) {
                return 1 & e.compareDocumentPosition(p.createElement("div"))
            }), ut(function(e) {
                return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
            }) || lt("type|href|height|width", function(e, t, n) {
                return n ? ba : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
            }), n.attributes && ut(function(e) {
                return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
            }) || lt("value", function(e, t, n) {
                return n || "input" !== e.nodeName.toLowerCase() ? ba : e.defaultValue
            }), ut(function(e) {
                return null == e.getAttribute("disabled")
            }) || lt(R, function(e, t, n) {
                var r;
                return n ? ba : (r = e.getAttributeNode(t)) && r.specified ? r.value : e[t] === !0 ? t.toLowerCase() : null
            }), x.find = ot, x.expr = ot.selectors, x.expr[":"] = x.expr.pseudos, x.unique = ot.uniqueSort, x.text = ot.getText, x.isXMLDoc = ot.isXML, x.contains = ot.contains
        }(e);
    var D = {};

    function A(e) {
        var t = D[e] = {};
        return x.each(e.match(w) || [], function(e, n) {
            t[n] = !0
        }), t
    }
    x.Callbacks = function(e) {
        e = "string" == typeof e ? D[e] || A(e) : x.extend({}, e);
        var t, n, r, i, o, s, a = [],
            u = !e.once && [],
            l = function(p) {
                for (t = e.memory && p, n = !0, s = i || 0, i = 0, o = a.length, r = !0; a && o > s; s++)
                    if (a[s].apply(p[0], p[1]) === !1 && e.stopOnFalse) {
                        t = !1;
                        break
                    }
                r = !1, a && (u ? u.length && l(u.shift()) : t ? a = [] : c.disable())
            },
            c = {
                add: function() {
                    if (a) {
                        var n = a.length;
                        (function s(t) {
                            x.each(t, function(t, n) {
                                var r = x.type(n);
                                "function" === r ? e.unique && c.has(n) || a.push(n) : n && n.length && "string" !== r && s(n)
                            })
                        })(arguments), r ? o = a.length : t && (i = n, l(t))
                    }
                    return this
                },
                remove: function() {
                    return a && x.each(arguments, function(e, t) {
                        var n;
                        while ((n = x.inArray(t, a, n)) > -1) a.splice(n, 1), r && (o >= n && o--, s >= n && s--)
                    }), this
                },
                has: function(e) {
                    return e ? x.inArray(e, a) > -1 : !(!a || !a.length)
                },
                empty: function() {
                    return a = [], o = 0, this
                },
                disable: function() {
                    return a = u = t = bb, this
                },
                disabled: function() {
                    return !a
                },
                lock: function() {
                    return u = bb, t || c.disable(), this
                },
                locked: function() {
                    return !u
                },
                fireWith: function(e, t) {
                    return !a || n && !u || (t = t || [], t = [e, t.slice ? t.slice() : t], r ? u.push(t) : l(t)), this
                },
                fire: function() {
                    return c.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!n
                }
            };
        return c
    }, x.extend({
        Deferred: function(e) {
            var t = [
                    ["resolve", "done", x.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", x.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", x.Callbacks("memory")]
                ],
                n = "pending",
                r = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return i.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var e = arguments;
                        return x.Deferred(function(n) {
                            x.each(t, function(t, o) {
                                var s = o[0],
                                    a = x.isFunction(e[t]) && e[t];
                                i[o[1]](function() {
                                    var e = a && a.apply(this, arguments);
                                    e && x.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s + "With"](this === r ? n.promise() : this, a ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? x.extend(e, r) : r
                    }
                },
                i = {};
            return r.pipe = r.then, x.each(t, function(e, o) {
                var s = o[2],
                    a = o[3];
                r[o[1]] = s.add, a && s.add(function() {
                    n = a
                }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function() {
                    return i[o[0] + "With"](this === i ? r : this, arguments), this
                }, i[o[0] + "With"] = s.fireWith
            }), r.promise(i), e && e.call(i, i), i
        },
        when: function(e) {
            var t = 0,
                n = d.call(arguments),
                r = n.length,
                i = 1 !== r || e && x.isFunction(e.promise) ? r : 0,
                o = 1 === i ? e : x.Deferred(),
                s = function(e, t, n) {
                    return function(r) {
                        t[e] = this, n[e] = arguments.length > 1 ? d.call(arguments) : r, n === a ? o.notifyWith(t, n) : --i || o.resolveWith(t, n)
                    }
                },
                a, u, l;
            if (r > 1)
                for (a = Array(r), u = Array(r), l = Array(r); r > t; t++) n[t] && x.isFunction(n[t].promise) ? n[t].promise().done(s(t, l, n)).fail(o.reject).progress(s(t, u, a)) : --i;
            return i || o.resolveWith(l, n), o.promise()
        }
    }), x.support = function(t) {
        var n = o.createElement("input"),
            r = o.createDocumentFragment(),
            i = o.createElement("div"),
            s = o.createElement("select"),
            a = s.appendChild(o.createElement("option"));
        return n.type ? (n.type = "checkbox", t.checkOn = "" !== n.value, t.optSelected = a.selected, t.reliableMarginRight = !0, t.boxSizingReliable = !0, t.pixelPosition = !1, n.checked = !0, t.noCloneChecked = n.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !a.disabled, n = o.createElement("input"), n.value = "t", n.type = "radio", t.radioValue = "t" === n.value, n.setAttribute("checked", "t"), n.setAttribute("name", "t"), r.appendChild(n), t.checkClone = r.cloneNode(!0).cloneNode(!0).lastChild.checked, t.focusinBubbles = "onfocusin" in e, i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === i.style.backgroundClip, x(function() {
            var n, r, s = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
                a = o.getElementsByTagName("body")[0];
            a && (n = o.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", a.appendChild(n).appendChild(i), i.innerHTML = "", i.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%", x.swap(a, null != a.style.zoom ? {
                zoom: 1
            } : {}, function() {
                t.boxSizing = 4 === i.offsetWidth
            }), e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(i, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(i, null) || {
                width: "4px"
            }).width, r = i.appendChild(o.createElement("div")), r.style.cssText = i.style.cssText = s, r.style.marginRight = r.style.width = "0", i.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), a.removeChild(n))
        }), t) : t
    }({});
    var L, q, H = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        O = /([A-Z])/g;

    function F() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {}
            }
        }), this.expando = x.expando + Math.random()
    }
    F.uid = 1, F.accepts = function(e) {
        return e.nodeType ? 1 === e.nodeType || 9 === e.nodeType : !0
    }, F.prototype = {
        key: function(e) {
            if (!F.accepts(e)) return 0;
            var t = {},
                n = e[this.expando];
            if (!n) {
                n = F.uid++;
                try {
                    t[this.expando] = {
                        value: n
                    }, Object.defineProperties(e, t)
                } catch (r) {
                    t[this.expando] = n, x.extend(e, t)
                }
            }
            return this.cache[n] || (this.cache[n] = {}), n
        },
        set: function(e, t, n) {
            var r, i = this.key(e),
                o = this.cache[i];
            if ("string" == typeof t) o[t] = n;
            else if (x.isEmptyObject(o)) x.extend(this.cache[i], t);
            else
                for (r in t) o[r] = t[r];
            return o
        },
        get: function(e, t) {
            var n = this.cache[this.key(e)];
            return t === bb ? n : n[t]
        },
        access: function(e, t, n) {
            var r;
            return t === bb || t && "string" == typeof t && n === bb ? (r = this.get(e, t), r !== bb ? r : this.get(e, x.camelCase(t))) : (this.set(e, t, n), n !== bb ? n : t)
        },
        remove: function(e, t) {
            var n, r, i, o = this.key(e),
                s = this.cache[o];
            if (t === bb) this.cache[o] = {};
            else {
                x.isArray(t) ? r = t.concat(t.map(x.camelCase)) : (i = x.camelCase(t), t in s ? r = [t, i] : (r = i, r = r in s ? [r] : r.match(w) || [])), n = r.length;
                while (n--) delete s[r[n]]
            }
        },
        hasData: function(e) {
            return !x.isEmptyObject(this.cache[e[this.expando]] || {})
        },
        discard: function(e) {
            e[this.expando] && delete this.cache[e[this.expando]]
        }
    }, L = new F, q = new F, x.extend({
        acceptData: F.accepts,
        hasData: function(e) {
            return L.hasData(e) || q.hasData(e)
        },
        data: function(e, t, n) {
            return L.access(e, t, n)
        },
        removeData: function(e, t) {
            L.remove(e, t)
        },
        _data: function(e, t, n) {
            return q.access(e, t, n)
        },
        _removeData: function(e, t) {
            q.remove(e, t)
        }
    }), x.fn.extend({
        data: function(e, t) {
            var n, r, i = this[0],
                o = 0,
                s = null;
            if (e === bb) {
                if (this.length && (s = L.get(i), 1 === i.nodeType && !q.get(i, "hasDataAttrs"))) {
                    for (n = i.attributes; n.length > o; o++) r = n[o].name, 0 === r.indexOf("data-") && (r = x.camelCase(r.slice(5)), P(i, r, s[r]));
                    q.set(i, "hasDataAttrs", !0)
                }
                return s
            }
            return "object" == typeof e ? this.each(function() {
                L.set(this, e)
            }) : x.access(this, function(t) {
                var n, r = x.camelCase(e);
                if (i && t === bb) {
                    if (n = L.get(i, e), n !== bb) return n;
                    if (n = L.get(i, r), n !== bb) return n;
                    if (n = P(i, r, bb), n !== bb) return n
                } else this.each(function() {
                    var n = L.get(this, r);
                    L.set(this, r, t), -1 !== e.indexOf("-") && n !== bb && L.set(this, e, t)
                })
            }, null, t, arguments.length > 1, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                L.remove(this, e)
            })
        }
    });

    function P(e, t, n) {
        var r;
        if (n === bb && 1 === e.nodeType)
            if (r = "data-" + t.replace(O, "-$1").toLowerCase(), n = e.getAttribute(r), "string" == typeof n) {
                try {
                    n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : H.test(n) ? JSON.parse(n) : n
                } catch (i) {}
                L.set(e, t, n)
            } else n = bb;
        return n
    }
    x.extend({
        queue: function(e, t, n) {
            var r;
            return e ? (t = (t || "fx") + "queue", r = q.get(e, t), n && (!r || x.isArray(n) ? r = q.access(e, t, x.makeArray(n)) : r.push(n)), r || []) : bb
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = x.queue(e, t),
                r = n.length,
                i = n.shift(),
                o = x._queueHooks(e, t),
                s = function() {
                    x.dequeue(e, t)
                };
            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, s, o)), !r && o && o.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return q.get(e, n) || q.access(e, n, {
                empty: x.Callbacks("once memory").add(function() {
                    q.remove(e, [t + "queue", n])
                })
            })
        }
    }), x.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), n > arguments.length ? x.queue(this[0], e) : t === bb ? this : this.each(function() {
                var n = x.queue(this, e, t);
                x._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && x.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                x.dequeue(this, e)
            })
        },
        delay: function(e, t) {
            return e = x.fx ? x.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
                var r = setTimeout(t, e);
                n.stop = function() {
                    clearTimeout(r)
                }
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, r = 1,
                i = x.Deferred(),
                o = this,
                s = this.length,
                a = function() {
                    --r || i.resolveWith(o, [o])
                };
            "string" != typeof e && (t = e, e = bb), e = e || "fx";
            while (s--) n = q.get(o[s], e + "queueHooks"), n && n.empty && (r++, n.empty.add(a));
            return a(), i.promise(t)
        }
    });
    var R, M, W = /[\t\r\n\f]/g,
        $ = /\r/g,
        B = /^(?:input|select|textarea|button)$/i;
    x.fn.extend({
        attr: function(e, t) {
            return x.access(this, x.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                x.removeAttr(this, e)
            })
        },
        prop: function(e, t) {
            return x.access(this, x.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[x.propFix[e] || e]
            })
        },
        addClass: function(e) {
            var t, n, r, i, o, s = 0,
                a = this.length,
                u = "string" == typeof e && e;
            if (x.isFunction(e)) return this.each(function(t) {
                x(this).addClass(e.call(this, t, this.className))
            });
            if (u)
                for (t = (e || "").match(w) || []; a > s; s++)
                    if (n = this[s], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(W, " ") : " ")) {
                        o = 0;
                        while (i = t[o++]) 0 > r.indexOf(" " + i + " ") && (r += i + " ");
                        n.className = x.trim(r)
                    }
            return this
        },
        removeClass: function(e) {
            var t, n, r, i, o, s = 0,
                a = this.length,
                u = 0 === arguments.length || "string" == typeof e && e;
            if (x.isFunction(e)) return this.each(function(t) {
                x(this).removeClass(e.call(this, t, this.className))
            });
            if (u)
                for (t = (e || "").match(w) || []; a > s; s++)
                    if (n = this[s], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(W, " ") : "")) {
                        o = 0;
                        while (i = t[o++])
                            while (r.indexOf(" " + i + " ") >= 0) r = r.replace(" " + i + " ", " ");
                        n.className = e ? x.trim(r) : ""
                    }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : x.isFunction(e) ? this.each(function(n) {
                x(this).toggleClass(e.call(this, n, this.className, t), t)
            }) : this.each(function() {
                if ("string" === n) {
                    var t, i = 0,
                        o = x(this),
                        s = e.match(w) || [];
                    while (t = s[i++]) o.hasClass(t) ? o.removeClass(t) : o.addClass(t)
                } else(n === r || "boolean" === n) && (this.className && q.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : q.get(this, "__className__") || "")
            })
        },
        hasClass: function(e) {
            var t = " " + e + " ",
                n = 0,
                r = this.length;
            for (; r > n; n++)
                if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(W, " ").indexOf(t) >= 0) return !0;
            return !1
        },
        val: function(e) {
            var t, n, r, i = this[0]; {
                if (arguments.length) return r = x.isFunction(e), this.each(function(n) {
                    var i;
                    1 === this.nodeType && (i = r ? e.call(this, n, x(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : x.isArray(i) && (i = x.map(i, function(e) {
                        return null == e ? "" : e + ""
                    })), t = x.valHooks[this.type] || x.valHooks[this.nodeName.toLowerCase()], t && "set" in t && t.set(this, i, "value") !== bb || (this.value = i))
                });
                if (i) return t = x.valHooks[i.type] || x.valHooks[i.nodeName.toLowerCase()], t && "get" in t && (n = t.get(i, "value")) !== bb ? n : (n = i.value, "string" == typeof n ? n.replace($, "") : null == n ? "" : n)
            }
        }
    }), x.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = e.attributes.value;
                    return !t || t.specified ? e.value : e.text
                }
            },
            select: {
                get: function(e) {
                    var t, n, r = e.options,
                        i = e.selectedIndex,
                        o = "select-one" === e.type || 0 > i,
                        s = o ? null : [],
                        a = o ? i + 1 : r.length,
                        u = 0 > i ? a : o ? i : 0;
                    for (; a > u; u++)
                        if (n = r[u], !(!n.selected && u !== i || (x.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && x.nodeName(n.parentNode, "optgroup"))) {
                            if (t = x(n).val(), o) return t;
                            s.push(t)
                        }
                    return s
                },
                set: function(e, t) {
                    var n, r, i = e.options,
                        o = x.makeArray(t),
                        s = i.length;
                    while (s--) r = i[s], (r.selected = x.inArray(x(r).val(), o) >= 0) && (n = !0);
                    return n || (e.selectedIndex = -1), o
                }
            }
        },
        attr: function(e, t, n) {
            var i, o, s = e.nodeType;
            if (e && 3 !== s && 8 !== s && 2 !== s) return typeof e.getAttribute === r ? x.prop(e, t, n) : (1 === s && x.isXMLDoc(e) || (t = t.toLowerCase(), i = x.attrHooks[t] || (x.expr.match.bool.test(t) ? M : R)), n === bb ? i && "get" in i && null !== (o = i.get(e, t)) ? o : (o = x.find.attr(e, t), null == o ? bb : o) : null !== n ? i && "set" in i && (o = i.set(e, n, t)) !== bb ? o : (e.setAttribute(t, n + ""), n) : (x.removeAttr(e, t), bb))
        },
        removeAttr: function(e, t) {
            var n, r, i = 0,
                o = t && t.match(w);
            if (o && 1 === e.nodeType)
                while (n = o[i++]) r = x.propFix[n] || n, x.expr.match.bool.test(n) && (e[r] = !1), e.removeAttribute(n)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!x.support.radioValue && "radio" === t && x.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(e, t, n) {
            var r, i, o, s = e.nodeType;
            if (e && 3 !== s && 8 !== s && 2 !== s) return o = 1 !== s || !x.isXMLDoc(e), o && (t = x.propFix[t] || t, i = x.propHooks[t]), n !== bb ? i && "set" in i && (r = i.set(e, n, t)) !== bb ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    return e.hasAttribute("tabindex") || B.test(e.nodeName) || e.href ? e.tabIndex : -1
                }
            }
        }
    }), M = {
        set: function(e, t, n) {
            return t === !1 ? x.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, x.each(x.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = x.expr.attrHandle[t] || x.find.attr;
        x.expr.attrHandle[t] = function(e, t, r) {
            var i = x.expr.attrHandle[t],
                o = r ? bb : (x.expr.attrHandle[t] = bb) != n(e, t, r) ? t.toLowerCase() : null;
            return x.expr.attrHandle[t] = i, o
        }
    }), x.support.optSelected || (x.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        }
    }), x.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        x.propFix[this.toLowerCase()] = this
    }), x.each(["radio", "checkbox"], function() {
        x.valHooks[this] = {
            set: function(e, t) {
                return x.isArray(t) ? e.checked = x.inArray(x(e).val(), t) >= 0 : bb
            }
        }, x.support.checkOn || (x.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var I = /^key/,
        z = /^(?:mouse|contextmenu)|click/,
        _ = /^(?:focusinfocus|focusoutblur)$/,
        X = /^([^.]*)(?:\.(.+)|)$/;

    function U() {
        return !0
    }

    function Y() {
        return !1
    }

    function V() {
        try {
            return o.activeElement
        } catch (e) {}
    }
    x.event = {
        global: {},
        add: function(e, t, n, i, o) {
            var s, a, u, l, c, p, f, h, d, g, m, y = q.get(e);
            if (y) {
                n.handler && (s = n, n = s.handler, o = s.selector), n.guid || (n.guid = x.guid++), (l = y.events) || (l = y.events = {}), (a = y.handle) || (a = y.handle = function(e) {
                    return typeof x === r || e && x.event.triggered === e.type ? bb : x.event.dispatch.apply(a.elem, arguments)
                }, a.elem = e), t = (t || "").match(w) || [""], c = t.length;
                while (c--) u = X.exec(t[c]) || [], d = m = u[1], g = (u[2] || "").split(".").sort(), d && (f = x.event.special[d] || {}, d = (o ? f.delegateType : f.bindType) || d, f = x.event.special[d] || {}, p = x.extend({
                    type: d,
                    origType: m,
                    data: i,
                    handler: n,
                    guid: n.guid,
                    selector: o,
                    needsContext: o && x.expr.match.needsContext.test(o),
                    namespace: g.join(".")
                }, s), (h = l[d]) || (h = l[d] = [], h.delegateCount = 0, f.setup && f.setup.call(e, i, g, a) !== !1 || e.addEventListener && e.addEventListener(d, a, !1)), f.add && (f.add.call(e, p), p.handler.guid || (p.handler.guid = n.guid)), o ? h.splice(h.delegateCount++, 0, p) : h.push(p), x.event.global[d] = !0);
                e = null
            }
        },
        remove: function(e, t, n, r, i) {
            var o, s, a, u, l, c, p, f, h, d, g, m = q.hasData(e) && q.get(e);
            if (m && (u = m.events)) {
                t = (t || "").match(w) || [""], l = t.length;
                while (l--)
                    if (a = X.exec(t[l]) || [], h = g = a[1], d = (a[2] || "").split(".").sort(), h) {
                        p = x.event.special[h] || {}, h = (r ? p.delegateType : p.bindType) || h, f = u[h] || [], a = a[2] && RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = o = f.length;
                        while (o--) c = f[o], !i && g !== c.origType || n && n.guid !== c.guid || a && !a.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (f.splice(o, 1), c.selector && f.delegateCount--, p.remove && p.remove.call(e, c));
                        s && !f.length && (p.teardown && p.teardown.call(e, d, m.handle) !== !1 || x.removeEvent(e, h, m.handle), delete u[h])
                    } else
                        for (h in u) x.event.remove(e, h + t[l], n, r, !0);
                x.isEmptyObject(u) && (delete m.handle, q.remove(e, "events"))
            }
        },
        trigger: function(t, n, r, i) {
            var s, a, u, l, c, p, f, h = [r || o],
                d = y.call(t, "type") ? t.type : t,
                g = y.call(t, "namespace") ? t.namespace.split(".") : [];
            if (a = u = r = r || o, 3 !== r.nodeType && 8 !== r.nodeType && !_.test(d + x.event.triggered) && (d.indexOf(".") >= 0 && (g = d.split("."), d = g.shift(), g.sort()), c = 0 > d.indexOf(":") && "on" + d, t = t[x.expando] ? t : new x.Event(d, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = g.join("."), t.namespace_re = t.namespace ? RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = bb, t.target || (t.target = r), n = null == n ? [t] : x.makeArray(n, [t]), f = x.event.special[d] || {}, i || !f.trigger || f.trigger.apply(r, n) !== !1)) {
                if (!i && !f.noBubble && !x.isWindow(r)) {
                    for (l = f.delegateType || d, _.test(l + d) || (a = a.parentNode); a; a = a.parentNode) h.push(a), u = a;
                    u === (r.ownerDocument || o) && h.push(u.defaultView || u.parentWindow || e)
                }
                s = 0;
                while ((a = h[s++]) && !t.isPropagationStopped()) t.type = s > 1 ? l : f.bindType || d, p = (q.get(a, "events") || {})[t.type] && q.get(a, "handle"), p && p.apply(a, n), p = c && a[c], p && x.acceptData(a) && p.apply && p.apply(a, n) === !1 && t.preventDefault();
                return t.type = d, i || t.isDefaultPrevented() || f._default && f._default.apply(h.pop(), n) !== !1 || !x.acceptData(r) || c && x.isFunction(r[d]) && !x.isWindow(r) && (u = r[c], u && (r[c] = null), x.event.triggered = d, r[d](), x.event.triggered = bb, u && (r[c] = u)), t.result
            }
        },
        dispatch: function(e) {
            e = x.event.fix(e);
            var t, n, r, i, o, s = [],
                a = d.call(arguments),
                u = (q.get(this, "events") || {})[e.type] || [],
                l = x.event.special[e.type] || {};
            if (a[0] = e, e.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, e) !== !1) {
                s = x.event.handlers.call(this, e, u), t = 0;
                while ((i = s[t++]) && !e.isPropagationStopped()) {
                    e.currentTarget = i.elem, n = 0;
                    while ((o = i.handlers[n++]) && !e.isImmediatePropagationStopped())(!e.namespace_re || e.namespace_re.test(o.namespace)) && (e.handleObj = o, e.data = o.data, r = ((x.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, a), r !== bb && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()))
                }
                return l.postDispatch && l.postDispatch.call(this, e), e.result
            }
        },
        handlers: function(e, t) {
            var n, r, i, o, s = [],
                a = t.delegateCount,
                u = e.target;
            if (a && u.nodeType && (!e.button || "click" !== e.type))
                for (; u !== this; u = u.parentNode || this)
                    if (u.disabled !== !0 || "click" !== e.type) {
                        for (r = [], n = 0; a > n; n++) o = t[n], i = o.selector + " ", r[i] === bb && (r[i] = o.needsContext ? x(i, this).index(u) >= 0 : x.find(i, this, null, [u]).length), r[i] && r.push(o);
                        r.length && s.push({
                            elem: u,
                            handlers: r
                        })
                    }
            return t.length > a && s.push({
                elem: this,
                handlers: t.slice(a)
            }), s
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, t) {
                var n, r, i, s = t.button;
                return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || o, r = n.documentElement, i = n.body, e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), e.which || s === bb || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), e
            }
        },
        fix: function(e) {
            if (e[x.expando]) return e;
            var t, n, r, i = e.type,
                s = e,
                a = this.fixHooks[i];
            a || (this.fixHooks[i] = a = z.test(i) ? this.mouseHooks : I.test(i) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, e = new x.Event(s), t = r.length;
            while (t--) n = r[t], e[n] = s[n];
            return e.target || (e.target = o), 3 === e.target.nodeType && (e.target = e.target.parentNode), a.filter ? a.filter(e, s) : e
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    return this !== V() && this.focus ? (this.focus(), !1) : bb
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === V() && this.blur ? (this.blur(), !1) : bb
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return "checkbox" === this.type && this.click && x.nodeName(this, "input") ? (this.click(), !1) : bb
                },
                _default: function(e) {
                    return x.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    e.result !== bb && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function(e, t, n, r) {
            var i = x.extend(new x.Event, n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? x.event.trigger(i, null, t) : x.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
        }
    }, x.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    }, x.Event = function(e, t) {
        return this instanceof x.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.getPreventDefault && e.getPreventDefault() ? U : Y) : this.type = e, t && x.extend(this, t), this.timeStamp = e && e.timeStamp || x.now(), this[x.expando] = !0, bb) : new x.Event(e, t)
    }, x.Event.prototype = {
        isDefaultPrevented: Y,
        isPropagationStopped: Y,
        isImmediatePropagationStopped: Y,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = U, e && e.preventDefault && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = U, e && e.stopPropagation && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = U, this.stopPropagation()
        }
    }, x.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(e, t) {
        x.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this,
                    i = e.relatedTarget,
                    o = e.handleObj;
                return (!i || i !== r && !x.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), x.support.focusinBubbles || x.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = 0,
            r = function(e) {
                x.event.simulate(t, e.target, x.event.fix(e), !0)
            };
        x.event.special[t] = {
            setup: function() {
                0 === n++ && o.addEventListener(e, r, !0)
            },
            teardown: function() {
                0 === --n && o.removeEventListener(e, r, !0)
            }
        }
    }), x.fn.extend({
        on: function(e, t, n, r, i) {
            var o, s;
            if ("object" == typeof e) {
                "string" != typeof t && (n = n || t, t = bb);
                for (s in e) this.on(s, t, n, e[s], i);
                return this
            }
            if (null == n && null == r ? (r = t, n = t = bb) : null == r && ("string" == typeof t ? (r = n, n = bb) : (r = n, n = t, t = bb)), r === !1) r = Y;
            else if (!r) return this;
            return 1 === i && (o = r, r = function(e) {
                return x().off(e), o.apply(this, arguments)
            }, r.guid = o.guid || (o.guid = x.guid++)), this.each(function() {
                x.event.add(this, e, r, n, t)
            })
        },
        one: function(e, t, n, r) {
            return this.on(e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, x(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if ("object" == typeof e) {
                for (i in e) this.off(i, t, e[i]);
                return this
            }
            return (t === !1 || "function" == typeof t) && (n = t, t = bb), n === !1 && (n = Y), this.each(function() {
                x.event.remove(this, e, n, t)
            })
        },
        trigger: function(e, t) {
            return this.each(function() {
                x.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            return n ? x.event.trigger(e, t, n, !0) : bb
        }
    });
    var G = /^.[^:#\[\.,]*$/,
        J = /^(?:parents|prev(?:Until|All))/,
        Q = x.expr.match.needsContext,
        K = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    x.fn.extend({
        find: function(e) {
            var t, n = [],
                r = this,
                i = r.length;
            if ("string" != typeof e) return this.pushStack(x(e).filter(function() {
                for (t = 0; i > t; t++)
                    if (x.contains(r[t], this)) return !0
            }));
            for (t = 0; i > t; t++) x.find(e, r[t], n);
            return n = this.pushStack(i > 1 ? x.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
        },
        has: function(e) {
            var t = x(e, this),
                n = t.length;
            return this.filter(function() {
                var e = 0;
                for (; n > e; e++)
                    if (x.contains(this, t[e])) return !0
            })
        },
        not: function(e) {
            return this.pushStack(et(this, e || [], !0))
        },
        filter: function(e) {
            return this.pushStack(et(this, e || [], !1))
        },
        is: function(e) {
            return !!et(this, "string" == typeof e && Q.test(e) ? x(e) : e || [], !1).length
        },
        closest: function(e, t) {
            var n, r = 0,
                i = this.length,
                o = [],
                s = Q.test(e) || "string" != typeof e ? x(e, t || this.context) : 0;
            for (; i > r; r++)
                for (n = this[r]; n && n !== t; n = n.parentNode)
                    if (11 > n.nodeType && (s ? s.index(n) > -1 : 1 === n.nodeType && x.find.matchesSelector(n, e))) {
                        n = o.push(n);
                        break
                    }
            return this.pushStack(o.length > 1 ? x.unique(o) : o)
        },
        index: function(e) {
            return e ? "string" == typeof e ? g.call(x(e), this[0]) : g.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            var n = "string" == typeof e ? x(e, t) : x.makeArray(e && e.nodeType ? [e] : e),
                r = x.merge(this.get(), n);
            return this.pushStack(x.unique(r))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    });

    function Z(e, t) {
        while ((e = e[t]) && 1 !== e.nodeType);
        return e
    }
    x.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return x.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return x.dir(e, "parentNode", n)
        },
        next: function(e) {
            return Z(e, "nextSibling")
        },
        prev: function(e) {
            return Z(e, "previousSibling")
        },
        nextAll: function(e) {
            return x.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return x.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return x.dir(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return x.dir(e, "previousSibling", n)
        },
        siblings: function(e) {
            return x.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return x.sibling(e.firstChild)
        },
        contents: function(e) {
            return e.contentDocument || x.merge([], e.childNodes)
        }
    }, function(e, t) {
        x.fn[e] = function(n, r) {
            var i = x.map(this, t, n);
            return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = x.filter(r, i)), this.length > 1 && (K[e] || x.unique(i), J.test(e) && i.reverse()), this.pushStack(i)
        }
    }), x.extend({
        filter: function(e, t, n) {
            var r = t[0];
            return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? x.find.matchesSelector(r, e) ? [r] : [] : x.find.matches(e, x.grep(t, function(e) {
                return 1 === e.nodeType
            }))
        },
        dir: function(e, t, n) {
            var r = [],
                i = n !== bb;
            while ((e = e[t]) && 9 !== e.nodeType)
                if (1 === e.nodeType) {
                    if (i && x(e).is(n)) break;
                    r.push(e)
                }
            return r
        },
        sibling: function(e, t) {
            var n = [];
            for (; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    });

    function et(e, t, n) {
        if (x.isFunction(t)) return x.grep(e, function(e, r) {
            return !!t.call(e, r, e) !== n
        });
        if (t.nodeType) return x.grep(e, function(e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (G.test(t)) return x.filter(t, e, n);
            t = x.filter(t, e)
        }
        return x.grep(e, function(e) {
            return g.call(t, e) >= 0 !== n
        })
    }
    var bc = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        nt = /<([\w:]+)/,
        rt = /<|&#?\w+;/,
        it = /<(?:script|style|link)/i,
        ot = /^(?:checkbox|radio)$/i,
        st = /checked\s*(?:[^=]|=\s*.checked.)/i,
        at = /^$|\/(?:java|ecma)script/i,
        ut = /^true\/(.*)/,
        lt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        ct = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    ct.optgroup = ct.option, ct.tbody = ct.tfoot = ct.colgroup = ct.caption = ct.thead, ct.th = ct.td, x.fn.extend({
        text: function(e) {
            return x.access(this, function(e) {
                return e === bb ? x.text(this) : this.empty().append((this[0] && this[0].ownerDocument || o).createTextNode(e))
            }, null, e, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = pt(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = pt(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        remove: function(e, t) {
            var n, r = e ? x.filter(e, this) : this,
                i = 0;
            for (; null != (n = r[i]); i++) t || 1 !== n.nodeType || x.cleanData(mt(n)), n.parentNode && (t && x.contains(n.ownerDocument, n) && dt(mt(n, "script")), n.parentNode.removeChild(n));
            return this
        },
        empty: function() {
            var e, t = 0;
            for (; null != (e = this[t]); t++) 1 === e.nodeType && (x.cleanData(mt(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
                return x.clone(this, e, t)
            })
        },
        html: function(e) {
            return x.access(this, function(e) {
                var t = this[0] || {},
                    n = 0,
                    r = this.length;
                if (e === bb && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !it.test(e) && !ct[(nt.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = e.replace(bc, "<$1></$2>");
                    try {
                        for (; r > n; n++) t = this[n] || {}, 1 === t.nodeType && (x.cleanData(mt(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (i) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = x.map(this, function(e) {
                    return [e.nextSibling, e.parentNode]
                }),
                t = 0;
            return this.domManip(arguments, function(n) {
                var r = e[t++],
                    i = e[t++];
                i && (r && r.parentNode !== i && (r = this.nextSibling), x(this).remove(), i.insertBefore(n, r))
            }, !0), t ? this : this.remove()
        },
        detach: function(e) {
            return this.remove(e, !0)
        },
        domManip: function(e, t, n) {
            e = f.apply([], e);
            var r, i, o, s, a, u, l = 0,
                c = this.length,
                p = this,
                h = c - 1,
                d = e[0],
                g = x.isFunction(d);
            if (g || !(1 >= c || "string" != typeof d || x.support.checkClone) && st.test(d)) return this.each(function(r) {
                var i = p.eq(r);
                g && (e[0] = d.call(this, r, i.html())), i.domManip(e, t, n)
            });
            if (c && (r = x.buildFragment(e, this[0].ownerDocument, !1, !n && this), i = r.firstChild, 1 === r.childNodes.length && (r = i), i)) {
                for (o = x.map(mt(r, "script"), ft), s = o.length; c > l; l++) a = r, l !== h && (a = x.clone(a, !0, !0), s && x.merge(o, mt(a, "script"))), t.call(this[l], a, l);
                if (s)
                    for (u = o[o.length - 1].ownerDocument, x.map(o, ht), l = 0; s > l; l++) a = o[l], at.test(a.type || "") && !q.access(a, "globalEval") && x.contains(u, a) && (a.src ? x._evalUrl(a.src) : x.globalEval(a.textContent.replace(lt, "")))
            }
            return this
        }
    }), x.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        x.fn[e] = function(e) {
            var n, r = [],
                i = x(e),
                o = i.length - 1,
                s = 0;
            for (; o >= s; s++) n = s === o ? this : this.clone(!0), x(i[s])[t](n), h.apply(r, n.get());
            return this.pushStack(r)
        }
    }), x.extend({
        clone: function(e, t, n) {
            var r, i, o, s, a = e.cloneNode(!0),
                u = x.contains(e.ownerDocument, e);
            if (!(x.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || x.isXMLDoc(e)))
                for (s = mt(a), o = mt(e), r = 0, i = o.length; i > r; r++) yt(o[r], s[r]);
            if (t)
                if (n)
                    for (o = o || mt(e), s = s || mt(a), r = 0, i = o.length; i > r; r++) gt(o[r], s[r]);
                else gt(e, a);
            return s = mt(a, "script"), s.length > 0 && dt(s, !u && mt(e, "script")), a
        },
        buildFragment: function(e, t, n, r) {
            var i, o, s, a, u, l, c = 0,
                p = e.length,
                f = t.createDocumentFragment(),
                h = [];
            for (; p > c; c++)
                if (i = e[c], i || 0 === i)
                    if ("object" === x.type(i)) x.merge(h, i.nodeType ? [i] : i);
                    else if (rt.test(i)) {
                o = o || f.appendChild(t.createElement("div")), s = (nt.exec(i) || ["", ""])[1].toLowerCase(), a = ct[s] || ct._default, o.innerHTML = a[1] + i.replace(bc, "<$1></$2>") + a[2], l = a[0];
                while (l--) o = o.lastChild;
                x.merge(h, o.childNodes), o = f.firstChild, o.textContent = ""
            } else h.push(t.createTextNode(i));
            f.textContent = "", c = 0;
            while (i = h[c++])
                if ((!r || -1 === x.inArray(i, r)) && (u = x.contains(i.ownerDocument, i), o = mt(f.appendChild(i), "script"), u && dt(o), n)) {
                    l = 0;
                    while (i = o[l++]) at.test(i.type || "") && n.push(i)
                }
            return f
        },
        cleanData: function(e) {
            var t, n, r, i, o, s, a = x.event.special,
                u = 0;
            for (;
                (n = e[u]) !== bb; u++) {
                if (F.accepts(n) && (o = n[q.expando], o && (t = q.cache[o]))) {
                    if (r = Object.keys(t.events || {}), r.length)
                        for (s = 0;
                            (i = r[s]) !== bb; s++) a[i] ? x.event.remove(n, i) : x.removeEvent(n, i, t.handle);
                    q.cache[o] && delete q.cache[o]
                }
                delete L.cache[n[L.expando]]
            }
        },
        _evalUrl: function(e) {
            return x.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
            })
        }
    });

    function pt(e, t) {
        return x.nodeName(e, "table") && x.nodeName(1 === t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function ft(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function ht(e) {
        var t = ut.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function dt(e, t) {
        var n = e.length,
            r = 0;
        for (; n > r; r++) q.set(e[r], "globalEval", !t || q.get(t[r], "globalEval"))
    }

    function gt(e, t) {
        var n, r, i, o, s, a, u, l;
        if (1 === t.nodeType) {
            if (q.hasData(e) && (o = q.access(e), s = q.set(t, o), l = o.events)) {
                delete s.handle, s.events = {};
                for (i in l)
                    for (n = 0, r = l[i].length; r > n; n++) x.event.add(t, i, l[i][n])
            }
            L.hasData(e) && (a = L.access(e), u = x.extend({}, a), L.set(t, u))
        }
    }

    function mt(e, t) {
        var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return t === bb || t && x.nodeName(e, t) ? x.merge([e], n) : n
    }

    function yt(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && ot.test(e.type) ? t.checked = e.checked : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
    }
    x.fn.extend({
        wrapAll: function(e) {
            var t;
            return x.isFunction(e) ? this.each(function(t) {
                x(this).wrapAll(e.call(this, t))
            }) : (this[0] && (t = x(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                var e = this;
                while (e.firstElementChild) e = e.firstElementChild;
                return e
            }).append(this)), this)
        },
        wrapInner: function(e) {
            return x.isFunction(e) ? this.each(function(t) {
                x(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = x(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = x.isFunction(e);
            return this.each(function(n) {
                x(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                x.nodeName(this, "body") || x(this).replaceWith(this.childNodes)
            }).end()
        }
    });
    var bd, xt, bt = /^(none|table(?!-c[ea]).+)/,
        wt = /^margin/,
        Tt = RegExp("^(" + b + ")(.*)$", "i"),
        Ct = RegExp("^(" + b + ")(?!px)[a-z%]+$", "i"),
        kt = RegExp("^([+-])=(" + b + ")", "i"),
        Nt = {
            BODY: "block"
        },
        Et = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        St = {
            letterSpacing: 0,
            fontWeight: 400
        },
        jt = ["Top", "Right", "Bottom", "Left"],
        Dt = ["Webkit", "O", "Moz", "ms"];

    function At(e, t) {
        if (t in e) return t;
        var n = t.charAt(0).toUpperCase() + t.slice(1),
            r = t,
            i = Dt.length;
        while (i--)
            if (t = Dt[i] + n, t in e) return t;
        return r
    }

    function Lt(e, t) {
        return e = t || e, "none" === x.css(e, "display") || !x.contains(e.ownerDocument, e)
    }

    function qt(t) {
        return e.getComputedStyle(t, null)
    }

    function Ht(e, t) {
        var n, r, i, o = [],
            s = 0,
            a = e.length;
        for (; a > s; s++) r = e[s], r.style && (o[s] = q.get(r, "olddisplay"), n = r.style.display, t ? (o[s] || "none" !== n || (r.style.display = ""), "" === r.style.display && Lt(r) && (o[s] = q.access(r, "olddisplay", Rt(r.nodeName)))) : o[s] || (i = Lt(r), (n && "none" !== n || !i) && q.set(r, "olddisplay", i ? n : x.css(r, "display"))));
        for (s = 0; a > s; s++) r = e[s], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[s] || "" : "none"));
        return e
    }
    x.fn.extend({
        css: function(e, t) {
            return x.access(this, function(e, t, n) {
                var r, i, o = {},
                    s = 0;
                if (x.isArray(t)) {
                    for (r = qt(e), i = t.length; i > s; s++) o[t[s]] = x.css(e, t[s], !1, r);
                    return o
                }
                return n !== bb ? x.style(e, t, n) : x.css(e, t)
            }, e, t, arguments.length > 1)
        },
        show: function() {
            return Ht(this, !0)
        },
        hide: function() {
            return Ht(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                Lt(this) ? x(this).show() : x(this).hide()
            })
        }
    }), x.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = bd(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, s, a = x.camelCase(t),
                    u = e.style;
                return t = x.cssProps[a] || (x.cssProps[a] = At(u, a)), s = x.cssHooks[t] || x.cssHooks[a], n === bb ? s && "get" in s && (i = s.get(e, !1, r)) !== bb ? i : u[t] : (o = typeof n, "string" === o && (i = kt.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(x.css(e, t)), o = "number"), null == n || "number" === o && isNaN(n) || ("number" !== o || x.cssNumber[a] || (n += "px"), x.support.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), s && "set" in s && (n = s.set(e, n, r)) === bb || (u[t] = n)), bb)
            }
        },
        css: function(e, t, n, r) {
            var i, o, s, a = x.camelCase(t);
            return t = x.cssProps[a] || (x.cssProps[a] = At(e.style, a)), s = x.cssHooks[t] || x.cssHooks[a], s && "get" in s && (i = s.get(e, !0, n)), i === bb && (i = bd(e, t, r)), "normal" === i && t in St && (i = St[t]), "" === n || n ? (o = parseFloat(i), n === !0 || x.isNumeric(o) ? o || 0 : i) : i
        }
    }), bd = function(e, t, n) {
        var r, i, o, s = n || qt(e),
            a = s ? s.getPropertyValue(t) || s[t] : bb,
            u = e.style;
        return s && ("" !== a || x.contains(e.ownerDocument, e) || (a = x.style(e, t)), Ct.test(a) && wt.test(t) && (r = u.width, i = u.minWidth, o = u.maxWidth, u.minWidth = u.maxWidth = u.width = a, a = s.width, u.width = r, u.minWidth = i, u.maxWidth = o)), a
    };

    function Ot(e, t, n) {
        var r = Tt.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function Ft(e, t, n, r, i) {
        var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0,
            s = 0;
        for (; 4 > o; o += 2) "margin" === n && (s += x.css(e, n + jt[o], !0, i)), r ? ("content" === n && (s -= x.css(e, "padding" + jt[o], !0, i)), "margin" !== n && (s -= x.css(e, "border" + jt[o] + "Width", !0, i))) : (s += x.css(e, "padding" + jt[o], !0, i), "padding" !== n && (s += x.css(e, "border" + jt[o] + "Width", !0, i)));
        return s
    }

    function Pt(e, t, n) {
        var r = !0,
            i = "width" === t ? e.offsetWidth : e.offsetHeight,
            o = qt(e),
            s = x.support.boxSizing && "border-box" === x.css(e, "boxSizing", !1, o);
        if (0 >= i || null == i) {
            if (i = bd(e, t, o), (0 > i || null == i) && (i = e.style[t]), Ct.test(i)) return i;
            r = s && (x.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0
        }
        return i + Ft(e, t, n || (s ? "border" : "content"), r, o) + "px"
    }

    function Rt(e) {
        var t = o,
            n = Nt[e];
        return n || (n = Mt(e, t), "none" !== n && n || (xt = (xt || x("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (xt[0].contentWindow || xt[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = Mt(e, t), xt.detach()), Nt[e] = n), n
    }

    function Mt(e, t) {
        var n = x(t.createElement(e)).appendTo(t.body),
            r = x.css(n[0], "display");
        return n.remove(), r
    }
    x.each(["height", "width"], function(e, t) {
        x.cssHooks[t] = {
            get: function(e, n, r) {
                return n ? 0 === e.offsetWidth && bt.test(x.css(e, "display")) ? x.swap(e, Et, function() {
                    return Pt(e, t, r)
                }) : Pt(e, t, r) : bb
            },
            set: function(e, n, r) {
                var i = r && qt(e);
                return Ot(e, n, r ? Ft(e, t, r, x.support.boxSizing && "border-box" === x.css(e, "boxSizing", !1, i), i) : 0)
            }
        }
    }), x(function() {
        x.support.reliableMarginRight || (x.cssHooks.marginRight = {
            get: function(e, t) {
                return t ? x.swap(e, {
                    display: "inline-block"
                }, bd, [e, "marginRight"]) : bb
            }
        }), !x.support.pixelPosition && x.fn.position && x.each(["top", "left"], function(e, t) {
            x.cssHooks[t] = {
                get: function(e, n) {
                    return n ? (n = bd(e, t), Ct.test(n) ? x(e).position()[t] + "px" : n) : bb
                }
            }
        })
    }), x.expr && x.expr.filters && (x.expr.filters.hidden = function(e) {
        return 0 >= e.offsetWidth && 0 >= e.offsetHeight
    }, x.expr.filters.visible = function(e) {
        return !x.expr.filters.hidden(e)
    }), x.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        x.cssHooks[e + t] = {
            expand: function(n) {
                var r = 0,
                    i = {},
                    o = "string" == typeof n ? n.split(" ") : [n];
                for (; 4 > r; r++) i[e + jt[r] + t] = o[r] || o[r - 2] || o[0];
                return i
            }
        }, wt.test(e) || (x.cssHooks[e + t].set = Ot)
    });
    var be = /%20/g,
        $t = /\[\]$/,
        Bt = /\r?\n/g,
        It = /^(?:submit|button|image|reset|file)$/i,
        zt = /^(?:input|select|textarea|keygen)/i;
    x.fn.extend({
        serialize: function() {
            return x.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = x.prop(this, "elements");
                return e ? x.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !x(this).is(":disabled") && zt.test(this.nodeName) && !It.test(e) && (this.checked || !ot.test(e))
            }).map(function(e, t) {
                var n = x(this).val();
                return null == n ? null : x.isArray(n) ? x.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Bt, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(Bt, "\r\n")
                }
            }).get()
        }
    }), x.param = function(e, t) {
        var n, r = [],
            i = function(e, t) {
                t = x.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        if (t === bb && (t = x.ajaxSettings && x.ajaxSettings.traditional), x.isArray(e) || e.jquery && !x.isPlainObject(e)) x.each(e, function() {
            i(this.name, this.value)
        });
        else
            for (n in e) _t(n, e[n], t, i);
        return r.join("&").replace(be, "+")
    };

    function _t(e, t, n, r) {
        var i;
        if (x.isArray(t)) x.each(t, function(t, i) {
            n || $t.test(e) ? r(e, i) : _t(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
        });
        else if (n || "object" !== x.type(t)) r(e, t);
        else
            for (i in t) _t(e + "[" + i + "]", t[i], n, r)
    }
    x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        x.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), x.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        },
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    });
    var bf, Ut, Yt = x.now(),
        Vt = /\?/,
        Gt = /#.*$/,
        Jt = /([?&])_=[^&]*/,
        Qt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        Kt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Zt = /^(?:GET|HEAD)$/,
        en = /^\/\//,
        tn = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        nn = x.fn.load,
        rn = {},
        on = {},
        sn = "*/".concat("*");
    try {
        Ut = i.href
    } catch (an) {
        Ut = o.createElement("a"), Ut.href = "", Ut = Ut.href
    }
    bf = tn.exec(Ut.toLowerCase()) || [];

    function un(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, i = 0,
                o = t.toLowerCase().match(w) || [];
            if (x.isFunction(n))
                while (r = o[i++]) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function ln(e, t, n, r) {
        var i = {},
            o = e === on;

        function s(a) {
            var u;
            return i[a] = !0, x.each(e[a] || [], function(e, a) {
                var l = a(t, n, r);
                return "string" != typeof l || o || i[l] ? o ? !(u = l) : bb : (t.dataTypes.unshift(l), s(l), !1)
            }), u
        }
        return s(t.dataTypes[0]) || !i["*"] && s("*")
    }

    function cn(e, t) {
        var n, r, i = x.ajaxSettings.flatOptions || {};
        for (n in t) t[n] !== bb && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && x.extend(!0, e, r), e
    }
    x.fn.load = function(e, t, n) {
        if ("string" != typeof e && nn) return nn.apply(this, arguments);
        var r, i, o, s = this,
            a = e.indexOf(" ");
        return a >= 0 && (r = e.slice(a), e = e.slice(0, a)), x.isFunction(t) ? (n = t, t = bb) : t && "object" == typeof t && (i = "POST"), s.length > 0 && x.ajax({
            url: e,
            type: i,
            dataType: "html",
            data: t
        }).done(function(e) {
            o = arguments, s.html(r ? x("<div>").append(x.parseHTML(e)).find(r) : e)
        }).complete(n && function(e, t) {
            s.each(n, o || [e.responseText, t, e])
        }), this
    }, x.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        x.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), x.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Ut,
            type: "GET",
            isLocal: Kt.test(bf[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": sn,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": x.parseJSON,
                "text xml": x.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? cn(cn(e, x.ajaxSettings), t) : cn(x.ajaxSettings, e)
        },
        ajaxPrefilter: un(rn),
        ajaxTransport: un(on),
        ajax: function(e, t) {
            "object" == typeof e && (t = e, e = bb), t = t || {};
            var n, r, i, o, s, a, u, l, c = x.ajaxSetup({}, t),
                p = c.context || c,
                f = c.context && (p.nodeType || p.jquery) ? x(p) : x.event,
                h = x.Deferred(),
                d = x.Callbacks("once memory"),
                g = c.statusCode || {},
                m = {},
                y = {},
                v = 0,
                b = "canceled",
                T = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (2 === v) {
                            if (!o) {
                                o = {};
                                while (t = Qt.exec(i)) o[t[1].toLowerCase()] = t[2]
                            }
                            t = o[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return 2 === v ? i : null
                    },
                    setRequestHeader: function(e, t) {
                        var n = e.toLowerCase();
                        return v || (e = y[n] = y[n] || e, m[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return v || (c.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (2 > v)
                                for (t in e) g[t] = [g[t], e[t]];
                            else T.always(e[T.status]);
                        return this
                    },
                    abort: function(e) {
                        var t = e || b;
                        return n && n.abort(t), k(0, t), this
                    }
                };
            if (h.promise(T).complete = d.add, T.success = T.done, T.error = T.fail, c.url = ((e || c.url || Ut) + "").replace(Gt, "").replace(en, bf[1] + "//"), c.type = t.method || t.type || c.method || c.type, c.dataTypes = x.trim(c.dataType || "*").toLowerCase().match(w) || [""], null == c.crossDomain && (a = tn.exec(c.url.toLowerCase()), c.crossDomain = !(!a || a[1] === bf[1] && a[2] === bf[2] && (a[3] || ("http:" === a[1] ? "80" : "443")) === (bf[3] || ("http:" === bf[1] ? "80" : "443")))), c.data && c.processData && "string" != typeof c.data && (c.data = x.param(c.data, c.traditional)), ln(rn, c, t, T), 2 === v) return T;
            u = c.global, u && 0 === x.active++ && x.event.trigger("ajaxStart"), c.type = c.type.toUpperCase(), c.hasContent = !Zt.test(c.type), r = c.url, c.hasContent || (c.data && (r = c.url += (Vt.test(r) ? "&" : "?") + c.data, delete c.data), c.cache === !1 && (c.url = Jt.test(r) ? r.replace(Jt, "$1_=" + Yt++) : r + (Vt.test(r) ? "&" : "?") + "_=" + Yt++)), c.ifModified && (x.lastModified[r] && T.setRequestHeader("If-Modified-Since", x.lastModified[r]), x.etag[r] && T.setRequestHeader("If-None-Match", x.etag[r])), (c.data && c.hasContent && c.contentType !== !1 || t.contentType) && T.setRequestHeader("Content-Type", c.contentType), T.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + ("*" !== c.dataTypes[0] ? ", " + sn + "; q=0.01" : "") : c.accepts["*"]);
            for (l in c.headers) T.setRequestHeader(l, c.headers[l]);
            if (c.beforeSend && (c.beforeSend.call(p, T, c) === !1 || 2 === v)) return T.abort();
            b = "abort";
            for (l in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) T[l](c[l]);
            if (n = ln(on, c, t, T)) {
                T.readyState = 1, u && f.trigger("ajaxSend", [T, c]), c.async && c.timeout > 0 && (s = setTimeout(function() {
                    T.abort("timeout")
                }, c.timeout));
                try {
                    v = 1, n.send(m, k)
                } catch (C) {
                    if (!(2 > v)) throw C;
                    k(-1, C)
                }
            } else k(-1, "No Transport");

            function k(e, t, o, a) {
                var l, m, y, b, w, C = t;
                2 !== v && (v = 2, s && clearTimeout(s), n = bb, i = a || "", T.readyState = e > 0 ? 4 : 0, l = e >= 200 && 300 > e || 304 === e, o && (b = pn(c, T, o)), b = fn(c, b, T, l), l ? (c.ifModified && (w = T.getResponseHeader("Last-Modified"), w && (x.lastModified[r] = w), w = T.getResponseHeader("etag"), w && (x.etag[r] = w)), 204 === e || "HEAD" === c.type ? C = "nocontent" : 304 === e ? C = "notmodified" : (C = b.state, m = b.data, y = b.error, l = !y)) : (y = C, (e || !C) && (C = "error", 0 > e && (e = 0))), T.status = e, T.statusText = (t || C) + "", l ? h.resolveWith(p, [m, C, T]) : h.rejectWith(p, [T, C, y]), T.statusCode(g), g = bb, u && f.trigger(l ? "ajaxSuccess" : "ajaxError", [T, c, l ? m : y]), d.fireWith(p, [T, C]), u && (f.trigger("ajaxComplete", [T, c]), --x.active || x.event.trigger("ajaxStop")))
            }
            return T
        },
        getJSON: function(e, t, n) {
            return x.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return x.get(e, bb, t, "script")
        }
    }), x.each(["get", "post"], function(e, t) {
        x[t] = function(e, n, r, i) {
            return x.isFunction(n) && (i = i || r, r = n, n = bb), x.ajax({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: r
            })
        }
    });

    function pn(e, t, n) {
        var r, i, o, s, a = e.contents,
            u = e.dataTypes;
        while ("*" === u[0]) u.shift(), r === bb && (r = e.mimeType || t.getResponseHeader("Content-Type"));
        if (r)
            for (i in a)
                if (a[i] && a[i].test(r)) {
                    u.unshift(i);
                    break
                }
        if (u[0] in n) o = u[0];
        else {
            for (i in n) {
                if (!u[0] || e.converters[i + " " + u[0]]) {
                    o = i;
                    break
                }
                s || (s = i)
            }
            o = o || s
        }
        return o ? (o !== u[0] && u.unshift(o), n[o]) : bb
    }

    function fn(e, t, n, r) {
        var i, o, s, a, u, l = {},
            c = e.dataTypes.slice();
        if (c[1])
            for (s in e.converters) l[s.toLowerCase()] = e.converters[s];
        o = c.shift();
        while (o)
            if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift())
                if ("*" === o) o = u;
                else if ("*" !== u && u !== o) {
            if (s = l[u + " " + o] || l["* " + o], !s)
                for (i in l)
                    if (a = i.split(" "), a[1] === o && (s = l[u + " " + a[0]] || l["* " + a[0]])) {
                        s === !0 ? s = l[i] : l[i] !== !0 && (o = a[0], c.unshift(a[1]));
                        break
                    }
            if (s !== !0)
                if (s && e["throws"]) t = s(t);
                else try {
                    t = s(t)
                } catch (p) {
                    return {
                        state: "parsererror",
                        error: s ? p : "No conversion from " + u + " to " + o
                    }
                }
        }
        return {
            state: "success",
            data: t
        }
    }
    x.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(e) {
                return x.globalEval(e), e
            }
        }
    }), x.ajaxPrefilter("script", function(e) {
        e.cache === bb && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), x.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function(r, i) {
                    t = x("<script>").prop({
                        async: !0,
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", n = function(e) {
                        t.remove(), n = null, e && i("error" === e.type ? 404 : 200, e.type)
                    }), o.head.appendChild(t[0])
                },
                abort: function() {
                    n && n()
                }
            }
        }
    });
    var bg = [],
        dn = /(=)\?(?=&|$)|\?\?/;
    x.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = bg.pop() || x.expando + "_" + Yt++;
            return this[e] = !0, e
        }
    }), x.ajaxPrefilter("json jsonp", function(t, n, r) {
        var i, o, s, a = t.jsonp !== !1 && (dn.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && dn.test(t.data) && "data");
        return a || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = x.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, a ? t[a] = t[a].replace(dn, "$1" + i) : t.jsonp !== !1 && (t.url += (Vt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function() {
            return s || x.error(i + " was not called"), s[0]
        }, t.dataTypes[0] = "json", o = e[i], e[i] = function() {
            s = arguments
        }, r.always(function() {
            e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, bg.push(i)), s && x.isFunction(o) && o(s[0]), s = o = bb
        }), "script") : bb
    }), x.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest
        } catch (e) {}
    };
    var bh = x.ajaxSettings.xhr(),
        mn = {
            0: 200,
            1223: 204
        },
        yn = 0,
        vn = {};
    e.ActiveXObject && x(e).on("unload", function() {
        for (var e in vn) vn[e]();
        vn = bb
    }), x.support.cors = !!bh && "withCredentials" in bh, x.support.ajax = bh = !!bh, x.ajaxTransport(function(e) {
        var t;
        return x.support.cors || bh && !e.crossDomain ? {
            send: function(n, r) {
                var i, o, s = e.xhr();
                if (s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                    for (i in e.xhrFields) s[i] = e.xhrFields[i];
                e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                for (i in n) s.setRequestHeader(i, n[i]);
                t = function(e) {
                    return function() {
                        t && (delete vn[o], t = s.onload = s.onerror = null, "abort" === e ? s.abort() : "error" === e ? r(s.status || 404, s.statusText) : r(mn[s.status] || s.status, s.statusText, "string" == typeof s.responseText ? {
                            text: s.responseText
                        } : bb, s.getAllResponseHeaders()))
                    }
                }, s.onload = t(), s.onerror = t("error"), t = vn[o = yn++] = t("abort"), s.send(e.hasContent && e.data || null)
            },
            abort: function() {
                t && t()
            }
        } : bb
    });
    var bi, bn, wn = /^(?:toggle|show|hide)$/,
        Tn = RegExp("^(?:([+-])=|)(" + b + ")([a-z%]*)$", "i"),
        Cn = /queueHooks$/,
        kn = [An],
        Nn = {
            "*": [function(e, t) {
                var n = this.createTween(e, t),
                    r = n.cur(),
                    i = Tn.exec(t),
                    o = i && i[3] || (x.cssNumber[e] ? "" : "px"),
                    s = (x.cssNumber[e] || "px" !== o && +r) && Tn.exec(x.css(n.elem, e)),
                    a = 1,
                    u = 20;
                if (s && s[3] !== o) {
                    o = o || s[3], i = i || [], s = +r || 1;
                    do a = a || ".5", s /= a, x.style(n.elem, e, s + o); while (a !== (a = n.cur() / r) && 1 !== a && --u)
                }
                return i && (s = n.start = +s || +r || 0, n.unit = o, n.end = i[1] ? s + (i[1] + 1) * i[2] : +i[2]), n
            }]
        };

    function En() {
        return setTimeout(function() {
            bi = bb
        }), bi = x.now()
    }

    function Sn(e, t, n) {
        var r, i = (Nn[t] || []).concat(Nn["*"]),
            o = 0,
            s = i.length;
        for (; s > o; o++)
            if (r = i[o].call(n, t, e)) return r
    }

    function jn(e, t, n) {
        var r, i, o = 0,
            s = kn.length,
            a = x.Deferred().always(function() {
                delete u.elem
            }),
            u = function() {
                if (i) return !1;
                var t = bi || En(),
                    n = Math.max(0, l.startTime + l.duration - t),
                    r = n / l.duration || 0,
                    o = 1 - r,
                    s = 0,
                    u = l.tweens.length;
                for (; u > s; s++) l.tweens[s].run(o);
                return a.notifyWith(e, [l, o, n]), 1 > o && u ? n : (a.resolveWith(e, [l]), !1)
            },
            l = a.promise({
                elem: e,
                props: x.extend({}, t),
                opts: x.extend(!0, {
                    specialEasing: {}
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: bi || En(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var r = x.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                    return l.tweens.push(r), r
                },
                stop: function(t) {
                    var n = 0,
                        r = t ? l.tweens.length : 0;
                    if (i) return this;
                    for (i = !0; r > n; n++) l.tweens[n].run(1);
                    return t ? a.resolveWith(e, [l, t]) : a.rejectWith(e, [l, t]), this
                }
            }),
            c = l.props;
        for (Dn(c, l.opts.specialEasing); s > o; o++)
            if (r = kn[o].call(l, e, c, l.opts)) return r;
        return x.map(c, Sn, l), x.isFunction(l.opts.start) && l.opts.start.call(e, l), x.fx.timer(x.extend(u, {
            elem: e,
            anim: l,
            queue: l.opts.queue
        })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
    }

    function Dn(e, t) {
        var n, r, i, o, s;
        for (n in e)
            if (r = x.camelCase(n), i = t[r], o = e[n], x.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), s = x.cssHooks[r], s && "expand" in s) {
                o = s.expand(o), delete e[r];
                for (n in o) n in e || (e[n] = o[n], t[n] = i)
            } else t[r] = i
    }
    x.Animation = x.extend(jn, {
        tweener: function(e, t) {
            x.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            var n, r = 0,
                i = e.length;
            for (; i > r; r++) n = e[r], Nn[n] = Nn[n] || [], Nn[n].unshift(t)
        },
        prefilter: function(e, t) {
            t ? kn.unshift(e) : kn.push(e)
        }
    });

    function An(e, t, n) {
        var r, i, o, s, a, u, l = this,
            c = {},
            p = e.style,
            f = e.nodeType && Lt(e),
            h = q.get(e, "fxshow");
        n.queue || (a = x._queueHooks(e, "fx"), null == a.unqueued && (a.unqueued = 0, u = a.empty.fire, a.empty.fire = function() {
            a.unqueued || u()
        }), a.unqueued++, l.always(function() {
            l.always(function() {
                a.unqueued--, x.queue(e, "fx").length || a.empty.fire()
            })
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === x.css(e, "display") && "none" === x.css(e, "float") && (p.display = "inline-block")), n.overflow && (p.overflow = "hidden", l.always(function() {
            p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
        }));
        for (r in t)
            if (i = t[r], wn.exec(i)) {
                if (delete t[r], o = o || "toggle" === i, i === (f ? "hide" : "show")) {
                    if ("show" !== i || !h || h[r] === bb) continue;
                    f = !0
                }
                c[r] = h && h[r] || x.style(e, r)
            }
        if (!x.isEmptyObject(c)) {
            h ? "hidden" in h && (f = h.hidden) : h = q.access(e, "fxshow", {}), o && (h.hidden = !f), f ? x(e).show() : l.done(function() {
                x(e).hide()
            }), l.done(function() {
                var t;
                q.remove(e, "fxshow");
                for (t in c) x.style(e, t, c[t])
            });
            for (r in c) s = Sn(f ? h[r] : 0, r, l), r in h || (h[r] = s.start, f && (s.end = s.start, s.start = "width" === r || "height" === r ? 1 : 0))
        }
    }

    function Ln(e, t, n, r, i) {
        return new Ln.prototype.init(e, t, n, r, i)
    }
    x.Tween = Ln, Ln.prototype = {
        constructor: Ln,
        init: function(e, t, n, r, i, o) {
            this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (x.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = Ln.propHooks[this.prop];
            return e && e.get ? e.get(this) : Ln.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = Ln.propHooks[this.prop];
            return this.pos = t = this.options.duration ? x.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Ln.propHooks._default.set(this), this
        }
    }, Ln.prototype.init.prototype = Ln.prototype, Ln.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = x.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
            },
            set: function(e) {
                x.fx.step[e.prop] ? x.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[x.cssProps[e.prop]] || x.cssHooks[e.prop]) ? x.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, Ln.propHooks.scrollTop = Ln.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, x.each(["toggle", "show", "hide"], function(e, t) {
        var n = x.fn[t];
        x.fn[t] = function(e, r, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(qn(t, !0), e, r, i)
        }
    }), x.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(Lt).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function(e, t, n, r) {
            var i = x.isEmptyObject(e),
                o = x.speed(t, n, r),
                s = function() {
                    var t = jn(this, x.extend({}, e), o);
                    (i || q.get(this, "finish")) && t.stop(!0)
                };
            return s.finish = s, i || o.queue === !1 ? this.each(s) : this.queue(o.queue, s)
        },
        stop: function(e, t, n) {
            var r = function(e) {
                var t = e.stop;
                delete e.stop, t(n)
            };
            return "string" != typeof e && (n = t, t = e, e = bb), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                var t = !0,
                    i = null != e && e + "queueHooks",
                    o = x.timers,
                    s = q.get(this);
                if (i) s[i] && s[i].stop && r(s[i]);
                else
                    for (i in s) s[i] && s[i].stop && Cn.test(i) && r(s[i]);
                for (i = o.length; i--;) o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
                (t || !n) && x.dequeue(this, e)
            })
        },
        finish: function(e) {
            return e !== !1 && (e = e || "fx"), this.each(function() {
                var t, n = q.get(this),
                    r = n[e + "queue"],
                    i = n[e + "queueHooks"],
                    o = x.timers,
                    s = r ? r.length : 0;
                for (n.finish = !0, x.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                for (t = 0; s > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
                delete n.finish
            })
        }
    });

    function qn(e, t) {
        var n, r = {
                height: e
            },
            i = 0;
        for (t = t ? 1 : 0; 4 > i; i += 2 - t) n = jt[i], r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e), r
    }
    x.each({
        slideDown: qn("show"),
        slideUp: qn("hide"),
        slideToggle: qn("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        x.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r)
        }
    }), x.speed = function(e, t, n) {
        var r = e && "object" == typeof e ? x.extend({}, e) : {
            complete: n || !n && t || x.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !x.isFunction(t) && t
        };
        return r.duration = x.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in x.fx.speeds ? x.fx.speeds[r.duration] : x.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function() {
            x.isFunction(r.old) && r.old.call(this), r.queue && x.dequeue(this, r.queue)
        }, r
    }, x.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, x.timers = [], x.fx = Ln.prototype.init, x.fx.tick = function() {
        var e, t = x.timers,
            n = 0;
        for (bi = x.now(); t.length > n; n++) e = t[n], e() || t[n] !== e || t.splice(n--, 1);
        t.length || x.fx.stop(), bi = bb
    }, x.fx.timer = function(e) {
        e() && x.timers.push(e) && x.fx.start()
    }, x.fx.interval = 13, x.fx.start = function() {
        bn || (bn = setInterval(x.fx.tick, x.fx.interval))
    }, x.fx.stop = function() {
        clearInterval(bn), bn = null
    }, x.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, x.fx.step = {}, x.expr && x.expr.filters && (x.expr.filters.animated = function(e) {
        return x.grep(x.timers, function(t) {
            return e === t.elem
        }).length
    }), x.fn.offset = function(e) {
        if (arguments.length) return e === bb ? this : this.each(function(t) {
            x.offset.setOffset(this, e, t)
        });
        var t, n, i = this[0],
            o = {
                top: 0,
                left: 0
            },
            s = i && i.ownerDocument;
        if (s) return t = s.documentElement, x.contains(t, i) ? (typeof i.getBoundingClientRect !== r && (o = i.getBoundingClientRect()), n = Hn(s), {
            top: o.top + n.pageYOffset - t.clientTop,
            left: o.left + n.pageXOffset - t.clientLeft
        }) : o
    }, x.offset = {
        setOffset: function(e, t, n) {
            var r, i, o, s, a, u, l, c = x.css(e, "position"),
                p = x(e),
                f = {};
            "static" === c && (e.style.position = "relative"), a = p.offset(), o = x.css(e, "top"), u = x.css(e, "left"), l = ("absolute" === c || "fixed" === c) && (o + u).indexOf("auto") > -1, l ? (r = p.position(), s = r.top, i = r.left) : (s = parseFloat(o) || 0, i = parseFloat(u) || 0), x.isFunction(t) && (t = t.call(e, n, a)), null != t.top && (f.top = t.top - a.top + s), null != t.left && (f.left = t.left - a.left + i), "using" in t ? t.using.call(e, f) : p.css(f)
        }
    }, x.fn.extend({
        position: function() {
            if (this[0]) {
                var e, t, n = this[0],
                    r = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === x.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), x.nodeName(e[0], "html") || (r = e.offset()), r.top += x.css(e[0], "borderTopWidth", !0), r.left += x.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - r.top - x.css(n, "marginTop", !0),
                    left: t.left - r.left - x.css(n, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var e = this.offsetParent || s;
                while (e && !x.nodeName(e, "html") && "static" === x.css(e, "position")) e = e.offsetParent;
                return e || s
            })
        }
    }), x.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, n) {
        var r = "pageYOffset" === n;
        x.fn[t] = function(i) {
            return x.access(this, function(t, i, o) {
                var s = Hn(t);
                return o === bb ? s ? s[n] : t[i] : (s ? s.scrollTo(r ? e.pageXOffset : o, r ? o : e.pageYOffset) : t[i] = o, bb)
            }, t, i, arguments.length, null)
        }
    });

    function Hn(e) {
        return x.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
    }
    x.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        x.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, r) {
            x.fn[r] = function(r, i) {
                var o = arguments.length && (n || "boolean" != typeof r),
                    s = n || (r === !0 || i === !0 ? "margin" : "border");
                return x.access(this, function(t, n, r) {
                    var i;
                    return x.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : r === bb ? x.css(t, n, s) : x.style(t, n, r, s)
                }, t, o ? r : bb, o, null)
            }
        })
    }), x.fn.size = function() {
        return this.length
    }, x.fn.andSelf = x.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = x : "function" == typeof define && define.amd && define("jquery", [], function() {
        return x
    }), "object" == typeof e && "object" == typeof e.document && (e.jQuery = e.$ = x)
})(window);
(function() {
    function n(n, r, t) {
        t = (t || 0) - 1;
        for (var e = n ? n.length : 0; ++t < e;)
            if (n[t] === r) return t;
        return -1
    }

    function r(n, r) {
        var t = n.m,
            e = r.m;
        if (t !== e) {
            if (t > e || typeof t == "undefined") return 1;
            if (t < e || typeof e == "undefined") return -1
        }
        return n.n - r.n
    }

    function t(n) {
        return "\\" + vr[n]
    }

    function e() {}

    function u(n) {
        return n instanceof u ? n : new o(n)
    }

    function o(n, r) {
        this.__chain__ = !!r, this.__wrapped__ = n
    }

    function i(n, r, t) {
        if (typeof n != "function") return Q;
        if (typeof r == "undefined") return n;
        switch (t) {
            case 1:
                return function(t) {
                    return n.call(r, t)
                };
            case 2:
                return function(t, e) {
                    return n.call(r, t, e)
                };
            case 3:
                return function(t, e, u) {
                    return n.call(r, t, e, u)
                };
            case 4:
                return function(t, e, u, o) {
                    return n.call(r, t, e, u, o)
                }
        }
        return J(n, r)
    }

    function f(n, r, t, e) {
        e = (e || 0) - 1;
        for (var u = n ? n.length : 0, o = []; ++e < u;) {
            var i = n[e];
            if (i && typeof i == "object" && typeof i.length == "number" && (bc(i) || y(i))) {
                r || (i = f(i, r, t));
                var a = -1,
                    l = i.length,
                    c = o.length;
                for (o.length += l; ++a < l;) o[c++] = i[a]
            } else t || o.push(i)
        }
        return o
    }

    function a(n, r, t, e) {
        if (n === r) return 0 !== n || 1 / n == 1 / r;
        if (n === n && !(n && hr[typeof n] || r && hr[typeof r])) return !1;
        if (null == n || null == r) return n === r;
        var o = Br.call(n),
            i = Br.call(r);
        if (o != i) return !1;
        switch (o) {
            case fr:
            case ar:
                return +n == +r;
            case lr:
                return n != +n ? r != +r : 0 == n ? 1 / n == 1 / r : n == +r;
            case pr:
            case sr:
                return n == r + ""
        }
        if (i = o == ir, !i) {
            if (Ar.call(n, "__wrapped__") || r instanceof u) return a(n.__wrapped__ || n, r.__wrapped__ || r, t, e);
            if (o != cr) return !1;
            var o = n.constructor,
                f = r.constructor;
            if (o != f && !(j(o) && o instanceof o && j(f) && f instanceof f)) return !1
        }
        for (t || (t = []), e || (e = []), o = t.length; o--;)
            if (t[o] == n) return e[o] == r;
        var l = !0,
            c = 0;
        if (t.push(n), e.push(r), i) {
            if (c = r.length, l = c == n.length)
                for (; c-- && (l = a(n[c], r[c], t, e)););
            return l
        }
        return Xr(r, function(r, u, o) {
            return Ar.call(o, u) ? (c++, !(l = Ar.call(n, u) && a(n[u], r, t, e)) && rr) : void 0
        }), l && Xr(n, function(n, r, t) {
            return Ar.call(t, r) ? !(l = -1 < --c) && rr : void 0
        }), l
    }

    function l(n, r, t) {
        for (var e = -1, u = v(), o = n ? n.length : 0, i = [], f = t ? [] : i; ++e < o;) {
            var a = n[e],
                l = t ? t(a, e, n) : a;
            (r ? !e || f[f.length - 1] !== l : 0 > u(f, l)) && (t && f.push(l), i.push(a))
        }
        return i
    }

    function c(n) {
        return function(r, t, e) {
            var u = {};
            t = K(t, e, 3), e = -1;
            var o = r ? r.length : 0;
            if (typeof o == "number")
                for (; ++e < o;) {
                    var i = r[e];
                    n(u, i, t(i, e, r), r)
                } else Yr(r, function(r, e, o) {
                    n(u, r, t(r, e, o), o)
                });
            return u
        }
    }

    function p(n, r, t, e, u, o) {
        var i = 1 & r,
            f = 2 & r,
            a = 4 & r,
            l = 8 & r,
            c = 16 & r,
            h = 32 & r,
            v = n;
        if (!f && !j(n)) throw new TypeError;
        if (c && !t.length && (r &= -17, c = t = !1), h && !e.length && (r &= -33, h = e = !1), !i || f || a || h || !(bb.fastBind || Rr && c)) y = function() {
            var g = arguments,
                m = i ? u : this;
            return (a || c || h) && (g = zr.call(g), c && Nr.apply(g, t), h && Sr.apply(g, e), a && g.length < o) ? (r |= 16, p(n, l ? r : -4 & r, g, null, u, o)) : (f && (n = m[v]), this instanceof y ? (m = s(n.prototype), g = n.apply(m, g), x(g) ? g : m) : n.apply(m, g))
        };
        else {
            if (c) {
                var g = [u];
                Sr.apply(g, t)
            }
            var y = c ? Rr.apply(n, g) : Rr.call(n, u)
        }
        return y
    }

    function s(n) {
        return x(n) ? kr(n) : {}
    }

    function h(n) {
        return Jr[n]
    }

    function v() {
        var r = (r = u.indexOf) === U ? n : r;
        return r
    }

    function g(n) {
        return Kr[n]
    }

    function y(n) {
        return n && typeof n == "object" && typeof n.length == "number" && Br.call(n) == or || !1
    }

    function m(n) {
        if (!n) return n;
        for (var r = 1, t = arguments.length; r < t; r++) {
            var e = arguments[r];
            if (e)
                for (var u in e) n[u] = e[u]
        }
        return n
    }

    function _(n) {
        if (!n) return n;
        for (var r = 1, t = arguments.length; r < t; r++) {
            var e = arguments[r];
            if (e)
                for (var u in e) "undefined" == typeof n[u] && (n[u] = e[u])
        }
        return n
    }

    function d(n) {
        var r = [];
        return Xr(n, function(n, t) {
            j(n) && r.push(t)
        }), r.sort()
    }

    function b(n) {
        for (var r = -1, t = Hr(n), e = t.length, u = {}; ++r < e;) {
            var o = t[r];
            u[n[o]] = o
        }
        return u
    }

    function w(n) {
        if (!n) return !0;
        if (bc(n) || T(n)) return !n.length;
        for (var r in n)
            if (Ar.call(n, r)) return !1;
        return !0
    }

    function j(n) {
        return typeof n == "function"
    }

    function x(n) {
        return !(!n || !hr[typeof n])
    }

    function E(n) {
        return typeof n == "number" || Br.call(n) == lr
    }

    function T(n) {
        return typeof n == "string" || Br.call(n) == sr
    }

    function A(n) {
        for (var r = -1, t = Hr(n), e = t.length, u = Array(e); ++r < e;) u[r] = n[t[r]];
        return u
    }

    function O(n, r) {
        var t = v(),
            e = n ? n.length : 0,
            u = !1;
        return e && typeof e == "number" ? u = -1 < t(n, r) : Yr(n, function(n) {
            return (u = n === r) && rr
        }), u
    }

    function S(n, r, t) {
        var e = !0;
        r = K(r, t, 3), t = -1;
        var u = n ? n.length : 0;
        if (typeof u == "number")
            for (; ++t < u && (e = !!r(n[t], t, n)););
        else Yr(n, function(n, t, u) {
            return !(e = !!r(n, t, u)) && rr
        });
        return e
    }

    function B(n, r, t) {
        var e = [];
        r = K(r, t, 3), t = -1;
        var u = n ? n.length : 0;
        if (typeof u == "number")
            for (; ++t < u;) {
                var o = n[t];
                r(o, t, n) && e.push(o)
            } else Yr(n, function(n, t, u) {
                r(n, t, u) && e.push(n)
            });
        return e
    }

    function N(n, r, t) {
        r = K(r, t, 3), t = -1;
        var e = n ? n.length : 0;
        if (typeof e != "number") {
            var u;
            return Yr(n, function(n, t, e) {
                return r(n, t, e) ? (u = n, rr) : void 0
            }), u
        }
        for (; ++t < e;) {
            var o = n[t];
            if (r(o, t, n)) return o
        }
    }

    function R(n, r, t) {
        var e = -1,
            u = n ? n.length : 0;
        if (r = r && typeof t == "undefined" ? r : i(r, t, 3), typeof u == "number")
            for (; ++e < u && r(n[e], e, n) !== rr;);
        else Yr(n, r)
    }

    function k(n, r) {
        var t = n ? n.length : 0;
        if (typeof t == "number")
            for (; t-- && false !== r(n[t], t, n););
        else {
            var e = Hr(n),
                t = e.length;
            Yr(n, function(n, u, o) {
                return u = e ? e[--t] : --t, false === r(o[u], u, o) && rr
            })
        }
    }

    function F(n, r, t) {
        var e = -1,
            u = n ? n.length : 0;
        if (r = K(r, t, 3), typeof u == "number")
            for (var o = Array(u); ++e < u;) o[e] = r(n[e], e, n);
        else o = [], Yr(n, function(n, t, u) {
            o[++e] = r(n, t, u)
        });
        return o
    }

    function q(n, r, t) {
        var e = -1 / 0,
            u = e,
            o = -1,
            i = n ? n.length : 0;
        if (r || typeof i != "number") r = K(r, t, 3), R(n, function(n, t, o) {
            t = r(n, t, o), t > e && (e = t, u = n)
        });
        else
            for (; ++o < i;) t = n[o], t > u && (u = t);
        return u
    }

    function D(n, r) {
        var t = -1,
            e = n ? n.length : 0;
        if (typeof e == "number")
            for (var u = Array(e); ++t < e;) u[t] = n[t][r];
        return u || F(n, r)
    }

    function M(n, r, t, e) {
        if (!n) return t;
        var u = 3 > arguments.length;
        r = i(r, e, 4);
        var o = -1,
            f = n.length;
        if (typeof f == "number")
            for (u && (t = n[++o]); ++o < f;) t = r(t, n[o], o, n);
        else Yr(n, function(n, e, o) {
            t = u ? (u = !1, n) : r(t, n, e, o)
        });
        return t
    }

    function $(n, r, t, e) {
        var u = 3 > arguments.length;
        return r = i(r, e, 4), k(n, function(n, e, o) {
            t = u ? (u = !1, n) : r(t, n, e, o)
        }), t
    }

    function I(n) {
        var r = -1,
            t = n ? n.length : 0,
            e = Array(typeof t == "number" ? t : 0);
        return R(n, function(n) {
            var t = Y(++r);
            e[r] = e[t], e[t] = n
        }), e
    }

    function W(n, r, t) {
        var e;
        r = K(r, t, 3), t = -1;
        var u = n ? n.length : 0;
        if (typeof u == "number")
            for (; ++t < u && !(e = r(n[t], t, n)););
        else Yr(n, function(n, t, u) {
            return (e = r(n, t, u)) && rr
        });
        return !!e
    }

    function z(n, r, t) {
        return t && w(r) ? Z : (t ? N : B)(n, r)
    }

    function C(n) {
        for (var r = -1, t = v(), e = n.length, u = f(arguments, !0, !0, 1), o = []; ++r < e;) {
            var i = n[r];
            0 > t(u, i) && o.push(i)
        }
        return o
    }

    function P(n, r, t) {
        var e = 0,
            u = n ? n.length : 0;
        if (typeof r != "number" && null != r) {
            var o = -1;
            for (r = K(r, t, 3); ++o < u && r(n[o], o, n);) e++
        } else if (e = r, null == e || t) return n ? n[0] : Z;
        return zr.call(n, 0, Ir($r(0, e), u))
    }

    function U(r, t, e) {
        if (typeof e == "number") {
            var u = r ? r.length : 0;
            e = 0 > e ? $r(0, u + e) : e || 0
        } else if (e) return e = G(r, t), r[e] === t ? e : -1;
        return n(r, t, e)
    }

    function V(n, r, t) {
        if (typeof r != "number" && null != r) {
            var e = 0,
                u = -1,
                o = n ? n.length : 0;
            for (r = K(r, t, 3); ++u < o && r(n[u], u, n);) e++
        } else e = null == r || t ? 1 : $r(0, r);
        return zr.call(n, e)
    }

    function G(n, r, t, e) {
        var u = 0,
            o = n ? n.length : u;
        for (t = t ? K(t, e, 1) : Q, r = t(r); u < o;) e = u + o >>> 1, t(n[e]) < r ? u = e + 1 : o = e;
        return u
    }

    function H(n, r, t, e) {
        return typeof r != "boolean" && null != r && (t = (e = t) && e[r] === n ? null : r, r = !1), null != t && (t = K(t, e, 3)), l(n, r, t)
    }

    function J(n, r) {
        return 2 < arguments.length ? p(n, 17, zr.call(arguments, 2), null, r) : p(n, 1, null, null, r)
    }

    function K(n, r, t) {
        var e = typeof n;
        if (null == n || "function" == e) return i(n, r, t);
        if ("object" != e) return function(r) {
            return r[n]
        };
        var u = Hr(n);
        return function(r) {
            for (var t = u.length, e = !1; t-- && (e = r[u[t]] === n[u[t]]););
            return e
        }
    }

    function L(n, r, t) {
        var e, u, o, i, f, a, l, c = 0,
            p = !1,
            s = !0;
        if (!j(n)) throw new TypeError;
        if (r = $r(0, r) || 0, true === t) var h = !0,
            s = !1;
        else x(t) && (h = t.leading, p = "maxWait" in t && ($r(r, t.maxWait) || 0), s = "trailing" in t ? t.trailing : s);
        var v = function() {
                var t = r - (Or() - i);
                0 < t ? a = setTimeout(v, t) : (u && clearTimeout(u), t = l, u = a = l = Z, t && (c = Or(), o = n.apply(f, e)))
            },
            g = function() {
                a && clearTimeout(a), u = a = l = Z, (s || p !== r) && (c = Or(), o = n.apply(f, e))
            };
        return function() {
            if (e = arguments, i = Or(), f = this, l = s && (a || !h), false === p) var t = h && !a;
            else {
                u || h || (c = i);
                var y = p - (i - c);
                0 < y ? u || (u = setTimeout(g, y)) : (u && (u = clearTimeout(u)), c = i, o = n.apply(f, e))
            }
            return a || r === p || (a = setTimeout(v, r)), t && (o = n.apply(f, e)), o
        }
    }

    function Q(n) {
        return n
    }

    function X(n) {
        R(d(n), function(r) {
            var t = u[r] = n[r];
            u.prototype[r] = function() {
                var n = [this.__wrapped__];
                return Sr.apply(n, arguments), n = t.apply(u, n), this.__chain__ ? new o(n, !0) : n
            }
        })
    }

    function Y(n, r) {
        return null == n && null == r && (r = 1), n = +n || 0, null == r ? (r = n, n = 0) : r = +r || 0, n + Tr(Wr() * (r - n + 1))
    }
    var Z, nr = 0,
        rr = {},
        tr = +new Date + "",
        er = /($^)/,
        ur = /['\n\r\t\u2028\u2029\\]/g,
        or = "[object Arguments]",
        ir = "[object Array]",
        fr = "[object Boolean]",
        ar = "[object Date]",
        lr = "[object Number]",
        cr = "[object Object]",
        pr = "[object RegExp]",
        sr = "[object String]",
        hr = {
            "boolean": !1,
            "function": !0,
            object: !0,
            number: !1,
            string: !1,
            undefined: !1
        },
        vr = {
            "\\": "\\",
            "'": "'",
            "\n": "n",
            "\r": "r",
            "\t": "t",
            "\u2028": "u2028",
            "\u2029": "u2029"
        },
        gr = hr[typeof window] && window || this,
        yr = hr[typeof exports] && exports && !exports.nodeType && exports,
        mr = hr[typeof module] && module && !module.nodeType && module,
        _r = mr && mr.exports === yr && yr,
        dr = hr[typeof global] && global;
    !dr || dr.global !== dr && dr.window !== dr || (gr = dr);
    var ba = [],
        wr = Object.prototype,
        jr = gr._,
        xr = RegExp("^" + (wr.valueOf + "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/valueOf|for [^\]]+/g, ".+?") + "$"),
        Er = Math.ceil,
        Tr = Math.floor,
        Ar = wr.hasOwnProperty,
        Or = xr.test(Or = Date.now) && Or || function() {
            return +new Date
        },
        Sr = ba.push,
        Br = wr.toString,
        Nr = ba.unshift,
        Rr = xr.test(Rr = Br.bind) && Rr,
        kr = xr.test(kr = Object.create) && kr,
        Fr = xr.test(Fr = Array.isArray) && Fr,
        qr = gr.isFinite,
        Dr = gr.isNaN,
        Mr = xr.test(Mr = Object.keys) && Mr,
        $r = Math.max,
        Ir = Math.min,
        Wr = Math.random,
        zr = ba.slice,
        Cr = xr.test(gr.attachEvent),
        Pr = Rr && !/\n|true/.test(Rr + Cr);
    o.prototype = u.prototype;
    var bb = {};
    ! function() {
        var n = {
            0: 1,
            length: 1
        };
        bb.fastBind = Rr && !Pr, bb.spliceObjects = (ba.splice.call(n, 0, 1), !n[0])
    }(1), u.templateSettings = {
        escape: /<%-([\s\S]+?)%>/g,
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        variable: ""
    }, kr || (s = function(n) {
        if (x(n)) {
            e.prototype = n;
            var r = new e;
            e.prototype = null
        }
        return r || {}
    }), y(arguments) || (y = function(n) {
        return n && typeof n == "object" && typeof n.length == "number" && Ar.call(n, "callee") || !1
    });
    var bc = Fr || function(n) {
            return n && typeof n == "object" && typeof n.length == "number" && Br.call(n) == ir || !1
        },
        Gr = function(n) {
            var r, t = [];
            if (!n || !hr[typeof n]) return t;
            for (r in n) Ar.call(n, r) && t.push(r);
            return t
        },
        Hr = Mr ? function(n) {
            return x(n) ? Mr(n) : []
        } : Gr,
        Jr = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;"
        },
        Kr = b(Jr),
        Lr = RegExp("(" + Hr(Kr).join("|") + ")", "g"),
        Qr = RegExp("[" + Hr(Jr).join("") + "]", "g"),
        Xr = function(n, r) {
            var t;
            if (!n || !hr[typeof n]) return n;
            for (t in n)
                if (r(n[t], t, n) === rr) break;
            return n
        },
        Yr = function(n, r) {
            var t;
            if (!n || !hr[typeof n]) return n;
            for (t in n)
                if (Ar.call(n, t) && r(n[t], t, n) === rr) break;
            return n
        };
    j(/x/) && (j = function(n) {
        return typeof n == "function" && "[object Function]" == Br.call(n)
    });
    var bd = c(function(n, r, t) {
            Ar.call(n, t) ? n[t]++ : n[t] = 1
        }),
        nt = c(function(n, r, t) {
            (Ar.call(n, t) ? n[t] : n[t] = []).push(r)
        }),
        rt = c(function(n, r, t) {
            n[t] = r
        });
    u.after = function(n, r) {
        if (!j(r)) throw new TypeError;
        return function() {
            return 1 > --n ? r.apply(this, arguments) : void 0
        }
    }, u.bind = J, u.bindAll = function(n) {
        for (var r = 1 < arguments.length ? f(arguments, !0, !1, 1) : d(n), t = -1, e = r.length; ++t < e;) {
            var u = r[t];
            n[u] = p(n[u], 1, null, null, n)
        }
        return n
    }, u.chain = function(n) {
        return n = new o(n), n.__chain__ = !0, n
    }, u.compact = function(n) {
        for (var r = -1, t = n ? n.length : 0, e = []; ++r < t;) {
            var u = n[r];
            u && e.push(u)
        }
        return e
    }, u.compose = function() {
        for (var n = arguments, r = n.length; r--;)
            if (!j(n[r])) throw new TypeError;
        return function() {
            for (var r = arguments, t = n.length; t--;) r = [n[t].apply(this, r)];
            return r[0]
        }
    }, u.countBy = bd, u.debounce = L, u.defaults = _, u.defer = function(n) {
        if (!j(n)) throw new TypeError;
        var r = zr.call(arguments, 1);
        return setTimeout(function() {
            n.apply(Z, r)
        }, 1)
    }, u.delay = function(n, r) {
        if (!j(n)) throw new TypeError;
        var t = zr.call(arguments, 2);
        return setTimeout(function() {
            n.apply(Z, t)
        }, r)
    }, u.difference = C, u.filter = B, u.flatten = function(n, r) {
        return f(n, r)
    }, u.forEach = R, u.functions = d, u.groupBy = nt, u.indexBy = rt, u.initial = function(n, r, t) {
        var e = 0,
            u = n ? n.length : 0;
        if (typeof r != "number" && null != r) {
            var o = u;
            for (r = K(r, t, 3); o-- && r(n[o], o, n);) e++
        } else e = null == r || t ? 1 : r || e;
        return zr.call(n, 0, Ir($r(0, u - e), u))
    }, u.intersection = function(n) {
        var r = arguments,
            t = r.length,
            e = -1,
            u = v(),
            o = n ? n.length : 0,
            i = [];
        n: for (; ++e < o;) {
            var f = n[e];
            if (0 > u(i, f)) {
                for (var a = t; --a;)
                    if (0 > u(r[a], f)) continue n;
                i.push(f)
            }
        }
        return i
    }, u.invert = b, u.invoke = function(n, r) {
        var t = zr.call(arguments, 2),
            e = -1,
            u = typeof r == "function",
            o = n ? n.length : 0,
            i = Array(typeof o == "number" ? o : 0);
        return R(n, function(n) {
            i[++e] = (u ? r : n[r]).apply(n, t)
        }), i
    }, u.keys = Hr, u.map = F, u.max = q, u.memoize = function(n, r) {
        var t = {};
        return function() {
            var e = r ? r.apply(this, arguments) : tr + arguments[0];
            return Ar.call(t, e) ? t[e] : t[e] = n.apply(this, arguments)
        }
    }, u.min = function(n, r, t) {
        var e = 1 / 0,
            u = e,
            o = -1,
            i = n ? n.length : 0;
        if (r || typeof i != "number") r = K(r, t, 3), R(n, function(n, t, o) {
            t = r(n, t, o), t < e && (e = t, u = n)
        });
        else
            for (; ++o < i;) t = n[o], t < u && (u = t);
        return u
    }, u.omit = function(n) {
        var r = v(),
            t = f(arguments, !0, !1, 1),
            e = {};
        return Xr(n, function(n, u) {
            0 > r(t, u) && (e[u] = n)
        }), e
    }, u.once = function(n) {
        var r, t;
        if (!j(n)) throw new TypeError;
        return function() {
            return r ? t : (r = !0, t = n.apply(this, arguments), n = null, t)
        }
    }, u.pairs = function(n) {
        for (var r = -1, t = Hr(n), e = t.length, u = Array(e); ++r < e;) {
            var o = t[r];
            u[r] = [o, n[o]]
        }
        return u
    }, u.partial = function(n) {
        return p(n, 16, zr.call(arguments, 1))
    }, u.pick = function(n) {
        for (var r = -1, t = f(arguments, !0, !1, 1), e = t.length, u = {}; ++r < e;) {
            var o = t[r];
            o in n && (u[o] = n[o])
        }
        return u
    }, u.pluck = D, u.range = function(n, r, t) {
        n = +n || 0, t = +t || 1, null == r && (r = n, n = 0);
        var e = -1;
        r = $r(0, Er((r - n) / t));
        for (var u = Array(r); ++e < r;) u[e] = n, n += t;
        return u
    }, u.reject = function(n, r, t) {
        return r = K(r, t, 3), B(n, function(n, t, e) {
            return !r(n, t, e)
        })
    }, u.rest = V, u.shuffle = I, u.sortBy = function(n, t, e) {
        var u = -1,
            o = n ? n.length : 0,
            i = Array(typeof o == "number" ? o : 0);
        for (t = K(t, e, 3), R(n, function(n, r, e) {
                i[++u] = {
                    m: t(n, r, e),
                    n: u,
                    o: n
                }
            }), o = i.length, i.sort(r); o--;) i[o] = i[o].o;
        return i
    }, u.tap = function(n, r) {
        return r(n), n
    }, u.throttle = function(n, r, t) {
        var e = !0,
            u = !0;
        if (!j(n)) throw new TypeError;
        return false === t ? e = !1 : x(t) && (e = "leading" in t ? t.leading : e, u = "trailing" in t ? t.trailing : u), t = {}, t.leading = e, t.maxWait = r, t.trailing = u, L(n, r, t)
    }, u.times = function(n, r, t) {
        n = -1 < (n = +n) ? n : 0;
        var e = -1,
            u = Array(n);
        for (r = i(r, t, 1); ++e < n;) u[e] = r(e);
        return u
    }, u.toArray = function(n) {
        return bc(n) ? zr.call(n) : n && typeof n.length == "number" ? F(n) : A(n)
    }, u.union = function() {
        return l(f(arguments, !0, !0))
    }, u.uniq = H, u.values = A, u.where = z, u.without = function(n) {
        return C(n, zr.call(arguments, 1))
    }, u.wrap = function(n, r) {
        if (!j(r)) throw new TypeError;
        return function() {
            var t = [n];
            return Sr.apply(t, arguments), r.apply(this, t)
        }
    }, u.zip = function() {
        for (var n = -1, r = q(D(arguments, "length")), t = Array(0 > r ? 0 : r); ++n < r;) t[n] = D(arguments, n);
        return t
    }, u.collect = F, u.drop = V, u.each = R, u.extend = m, u.methods = d, u.object = function(n, r) {
        for (var t = -1, e = n ? n.length : 0, u = {}; ++t < e;) {
            var o = n[t];
            r ? u[o] = r[t] : o && (u[o[0]] = o[1])
        }
        return u
    }, u.select = B, u.tail = V, u.unique = H, u.clone = function(n) {
        return x(n) ? bc(n) ? zr.call(n) : m({}, n) : n
    }, u.contains = O, u.escape = function(n) {
        return null == n ? "" : (n + "").replace(Qr, h)
    }, u.every = S, u.find = N, u.has = function(n, r) {
        return n ? Ar.call(n, r) : !1
    }, u.identity = Q, u.indexOf = U, u.isArguments = y, u.isArray = bc, u.isBoolean = function(n) {
        return true === n || false === n || Br.call(n) == fr
    }, u.isDate = function(n) {
        return n ? typeof n == "object" && Br.call(n) == ar : !1
    }, u.isElement = function(n) {
        return n ? 1 === n.nodeType : !1
    }, u.isEmpty = w, u.isEqual = function(n, r) {
        return a(n, r)
    }, u.isFinite = function(n) {
        return qr(n) && !Dr(parseFloat(n))
    }, u.isFunction = j, u.isNaN = function(n) {
        return E(n) && n != +n
    }, u.isNull = function(n) {
        return null === n
    }, u.isNumber = E, u.isObject = x, u.isRegExp = function(n) {
        return n && hr[typeof n] ? Br.call(n) == pr : !1
    }, u.isString = T, u.isUndefined = function(n) {
        return typeof n == "undefined"
    }, u.lastIndexOf = function(n, r, t) {
        var e = n ? n.length : 0;
        for (typeof t == "number" && (e = (0 > t ? $r(0, e + t) : Ir(t, e - 1)) + 1); e--;)
            if (n[e] === r) return e;
        return -1
    }, u.mixin = X, u.noConflict = function() {
        return gr._ = jr, this
    }, u.random = Y, u.reduce = M, u.reduceRight = $, u.result = function(n, r) {
        if (n) {
            var t = n[r];
            return j(t) ? n[r]() : t
        }
    }, u.size = function(n) {
        var r = n ? n.length : 0;
        return typeof r == "number" ? r : Hr(n).length
    }, u.some = W, u.sortedIndex = G, u.template = function(n, r, e) {
        var o = u,
            i = o.templateSettings;
        n || (n = ""), e = _({}, e, i);
        var f = 0,
            a = "__p+='",
            i = e.variable;
        n.replace(RegExp((e.escape || er).source + "|" + (e.interpolate || er).source + "|" + (e.evaluate || er).source + "|$", "g"), function(r, e, u, o, i) {
            return a += n.slice(f, i).replace(ur, t), e && (a += "'+_.escape(" + e + ")+'"), o && (a += "';" + o + ";__p+='"), u && (a += "'+((__t=(" + u + "))==null?'':__t)+'"), f = i + r.length, r
        }), a += "';\n", i || (i = "obj", a = "with(" + i + "||{}){" + a + "}"), a = "function(" + i + "){var __t,__p='',__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}" + a + "return __p}";
        try {
            var l = Function("_", "return " + a)(o)
        } catch (c) {
            throw c.source = a, c
        }
        return r ? l(r) : (l.source = a, l)
    }, u.unescape = function(n) {
        return null == n ? "" : (n + "").replace(Lr, g)
    }, u.uniqueId = function(n) {
        var r = ++nr + "";
        return n ? n + r : r
    }, u.all = S, u.any = W, u.detect = N, u.findWhere = function(n, r) {
        return z(n, r, !0)
    }, u.foldl = M, u.foldr = $, u.include = O, u.inject = M, u.first = P, u.last = function(n, r, t) {
        var e = 0,
            u = n ? n.length : 0;
        if (typeof r != "number" && null != r) {
            var o = u;
            for (r = K(r, t, 3); o-- && r(n[o], o, n);) e++
        } else if (e = r, null == e || t) return n ? n[u - 1] : Z;
        return zr.call(n, $r(0, u - e))
    }, u.sample = function(n, r, t) {
        var e = n ? n.length : 0;
        return typeof e != "number" && (n = A(n)), null == r || t ? n ? n[Y(e - 1)] : Z : (n = I(n), n.length = Ir($r(0, r), n.length), n)
    }, u.take = P, u.head = P, X(u), u.VERSION = "2.2.1", u.prototype.chain = function() {
        return this.__chain__ = !0, this
    }, u.prototype.value = function() {
        return this.__wrapped__
    }, R("pop push reverse shift sort splice unshift".split(" "), function(n) {
        var r = ba[n];
        u.prototype[n] = function() {
            var n = this.__wrapped__;
            return r.apply(n, arguments), bb.spliceObjects || 0 !== n.length || delete n[0], this
        }
    }), R(["concat", "join", "slice"], function(n) {
        var r = ba[n];
        u.prototype[n] = function() {
            var n = r.apply(this.__wrapped__, arguments);
            return this.__chain__ && (n = new o(n), n.__chain__ = !0), n
        }
    }), typeof define == "function" && typeof define.amd == "object" && define.amd ? (gr._ = u, define('underscore', [], function() {
        return u
    })) : yr && mr ? _r ? (mr.exports = u)._ = u : yr._ = u : gr._ = u
}).call(this);
(function() {
    var m = this;
    var n = m.Backbone;
    var o = [];
    var p = o.push;
    var q = o.slice;
    var r = o.splice;
    var s;
    if (typeof exports !== "undefined") {
        s = exports
    } else {
        s = m.Backbone = {}
    }
    s.VERSION = "1.0.0";
    var _ = m._;
    if (!_ && typeof require !== "undefined") _ = require("underscore");
    s.$ = m.jQuery || m.Zepto || m.ender || m.$;
    s.noConflict = function() {
        m.Backbone = n;
        return this
    };
    s.emulateHTTP = false;
    s.emulateJSON = false;
    var t = s.Events = {
        on: function(a, b, c) {
            if (!v(this, "on", a, [b, c]) || !b) return this;
            this._events || (this._events = {});
            var d = this._events[a] || (this._events[a] = []);
            d.push({
                callback: b,
                context: c,
                ctx: c || this
            });
            return this
        },
        once: function(a, b, c) {
            if (!v(this, "once", a, [b, c]) || !b) return this;
            var d = this;
            var e = _.once(function() {
                d.off(a, e);
                b.apply(this, arguments)
            });
            e._callback = b;
            return this.on(a, e, c)
        },
        off: function(a, b, c) {
            var d, ev, events, names, i, l, j, k;
            if (!this._events || !v(this, "off", a, [b, c])) return this;
            if (!a && !b && !c) {
                this._events = {};
                return this
            }
            names = a ? [a] : _.keys(this._events);
            for (i = 0, l = names.length; i < l; i++) {
                a = names[i];
                if (events = this._events[a]) {
                    this._events[a] = d = [];
                    if (b || c) {
                        for (j = 0, k = events.length; j < k; j++) {
                            ev = events[j];
                            if (b && b !== ev.callback && b !== ev.callback._callback || c && c !== ev.context) {
                                d.push(ev)
                            }
                        }
                    }
                    if (!d.length) delete this._events[a]
                }
            }
            return this
        },
        trigger: function(a) {
            if (!this._events) return this;
            var b = q.call(arguments, 1);
            if (!v(this, "trigger", a, b)) return this;
            var c = this._events[a];
            var d = this._events.all;
            if (c) w(c, b);
            if (d) w(d, arguments);
            return this
        },
        stopListening: function(a, b, c) {
            var d = this._listeners;
            if (!d) return this;
            var e = !b && !c;
            if (typeof b === "object") c = this;
            if (a)(d = {})[a._listenerId] = a;
            for (var f in d) {
                d[f].off(b, c, this);
                if (e) delete this._listeners[f]
            }
            return this
        }
    };
    var u = /\s+/;
    var v = function(a, b, c, d) {
        if (!c) return true;
        if (typeof c === "object") {
            for (var e in c) {
                a[b].apply(a, [e, c[e]].concat(d))
            }
            return false
        }
        if (u.test(c)) {
            var f = c.split(u);
            for (var i = 0, l = f.length; i < l; i++) {
                a[b].apply(a, [f[i]].concat(d))
            }
            return false
        }
        return true
    };
    var w = function(a, b) {
        var c, i = -1,
            l = a.length,
            a1 = b[0],
            a2 = b[1],
            a3 = b[2];
        switch (b.length) {
            case 0:
                while (++i < l)(c = a[i]).callback.call(c.ctx);
                return;
            case 1:
                while (++i < l)(c = a[i]).callback.call(c.ctx, a1);
                return;
            case 2:
                while (++i < l)(c = a[i]).callback.call(c.ctx, a1, a2);
                return;
            case 3:
                while (++i < l)(c = a[i]).callback.call(c.ctx, a1, a2, a3);
                return;
            default:
                while (++i < l)(c = a[i]).callback.apply(c.ctx, b)
        }
    };
    var x = {
        listenTo: "on",
        listenToOnce: "once"
    };
    _.each(x, function(f, g) {
        t[g] = function(a, b, c) {
            var d = this._listeners || (this._listeners = {});
            var e = a._listenerId || (a._listenerId = _.uniqueId("l"));
            d[e] = a;
            if (typeof b === "object") c = this;
            a[f](b, c, this);
            return this
        }
    });
    t.bind = t.on;
    t.unbind = t.off;
    _.extend(s, t);
    var y = s.Model = function(a, b) {
        var c;
        var d = a || {};
        b || (b = {});
        this.cid = _.uniqueId("c");
        this.attributes = {};
        _.extend(this, _.pick(b, z));
        if (b.parse) d = this.parse(d, b) || {};
        if (c = _.result(this, "defaults")) {
            d = _.defaults({}, d, c)
        }
        this.set(d, b);
        this.changed = {};
        this.initialize.apply(this, arguments)
    };
    var z = ["url", "urlRoot", "collection"];
    _.extend(y.prototype, t, {
        changed: null,
        validationError: null,
        idAttribute: "id",
        initialize: function() {},
        toJSON: function(a) {
            return _.clone(this.attributes)
        },
        sync: function() {
            return s.sync.apply(this, arguments)
        },
        get: function(a) {
            return this.attributes[a]
        },
        escape: function(a) {
            return _.escape(this.get(a))
        },
        has: function(a) {
            return this.get(a) != null
        },
        set: function(a, b, c) {
            var d, attrs, unset, changes, silent, changing, prev, current;
            if (a == null) return this;
            if (typeof a === "object") {
                attrs = a;
                c = b
            } else {
                (attrs = {})[a] = b
            }
            c || (c = {});
            if (!this._validate(attrs, c)) return false;
            unset = c.unset;
            silent = c.silent;
            changes = [];
            changing = this._changing;
            this._changing = true;
            if (!changing) {
                this._previousAttributes = _.clone(this.attributes);
                this.changed = {}
            }
            current = this.attributes, prev = this._previousAttributes;
            if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];
            for (d in attrs) {
                b = attrs[d];
                if (!_.isEqual(current[d], b)) changes.push(d);
                if (!_.isEqual(prev[d], b)) {
                    this.changed[d] = b
                } else {
                    delete this.changed[d]
                }
                unset ? delete current[d] : current[d] = b
            }
            if (!silent) {
                if (changes.length) this._pending = true;
                for (var i = 0, l = changes.length; i < l; i++) {
                    this.trigger("change:" + changes[i], this, current[changes[i]], c)
                }
            }
            if (changing) return this;
            if (!silent) {
                while (this._pending) {
                    this._pending = false;
                    this.trigger("change", this, c)
                }
            }
            this._pending = false;
            this._changing = false;
            return this
        },
        unset: function(a, b) {
            return this.set(a, void 0, _.extend({}, b, {
                unset: true
            }))
        },
        clear: function(a) {
            var b = {};
            for (var c in this.attributes) b[c] = void 0;
            return this.set(b, _.extend({}, a, {
                unset: true
            }))
        },
        hasChanged: function(a) {
            if (a == null) return !_.isEmpty(this.changed);
            return _.has(this.changed, a)
        },
        changedAttributes: function(a) {
            if (!a) return this.hasChanged() ? _.clone(this.changed) : false;
            var b, changed = false;
            var c = this._changing ? this._previousAttributes : this.attributes;
            for (var d in a) {
                if (_.isEqual(c[d], b = a[d])) continue;
                (changed || (changed = {}))[d] = b
            }
            return changed
        },
        previous: function(a) {
            if (a == null || !this._previousAttributes) return null;
            return this._previousAttributes[a]
        },
        previousAttributes: function() {
            return _.clone(this._previousAttributes)
        },
        fetch: function(b) {
            b = b ? _.clone(b) : {};
            if (b.parse === void 0) b.parse = true;
            var c = this;
            var d = b.success;
            b.success = function(a) {
                if (!c.set(c.parse(a, b), b)) return false;
                if (d) d(c, a, b);
                c.trigger("sync", c, a, b)
            };
            W(this, b);
            return this.sync("read", this, b)
        },
        save: function(c, d, e) {
            var f, method, xhr, attributes = this.attributes;
            if (c == null || typeof c === "object") {
                f = c;
                e = d
            } else {
                (f = {})[c] = d
            }
            if (f && (!e || !e.wait) && !this.set(f, e)) return false;
            e = _.extend({
                validate: true
            }, e);
            if (!this._validate(f, e)) return false;
            if (f && e.wait) {
                this.attributes = _.extend({}, attributes, f)
            }
            if (e.parse === void 0) e.parse = true;
            var g = this;
            var h = e.success;
            e.success = function(a) {
                g.attributes = attributes;
                var b = g.parse(a, e);
                if (e.wait) b = _.extend(f || {}, b);
                if (_.isObject(b) && !g.set(b, e)) {
                    return false
                }
                if (h) h(g, a, e);
                g.trigger("sync", g, a, e)
            };
            W(this, e);
            method = this.isNew() ? "create" : e.patch ? "patch" : "update";
            if (method === "patch") e.attrs = f;
            xhr = this.sync(method, this, e);
            if (f && e.wait) this.attributes = attributes;
            return xhr
        },
        destroy: function(b) {
            b = b ? _.clone(b) : {};
            var c = this;
            var d = b.success;
            var e = function() {
                c.trigger("destroy", c, c.collection, b)
            };
            b.success = function(a) {
                if (b.wait || c.isNew()) e();
                if (d) d(c, a, b);
                if (!c.isNew()) c.trigger("sync", c, a, b)
            };
            if (this.isNew()) {
                b.success();
                return false
            }
            W(this, b);
            var f = this.sync("delete", this, b);
            if (!b.wait) e();
            return f
        },
        url: function() {
            var a = _.result(this, "urlRoot") || _.result(this.collection, "url") || V();
            if (this.isNew()) return a;
            return a + (a.charAt(a.length - 1) === "/" ? "" : "/") + encodeURIComponent(this.id)
        },
        parse: function(a, b) {
            return a
        },
        clone: function() {
            return new this.constructor(this.attributes)
        },
        isNew: function() {
            return this.id == null
        },
        isValid: function(a) {
            return this._validate({}, _.extend(a || {}, {
                validate: true
            }))
        },
        _validate: function(a, b) {
            if (!b.validate || !this.validate) return true;
            a = _.extend({}, this.attributes, a);
            var c = this.validationError = this.validate(a, b) || null;
            if (!c) return true;
            this.trigger("invalid", this, c, _.extend(b || {}, {
                validationError: c
            }));
            return false
        }
    });
    var A = ["keys", "values", "pairs", "invert", "pick", "omit"];
    _.each(A, function(b) {
        y.prototype[b] = function() {
            var a = q.call(arguments);
            a.unshift(this.attributes);
            return _[b].apply(_, a)
        }
    });
    var B = s.Collection = function(a, b) {
        b || (b = {});
        if (b.url) this.url = b.url;
        if (b.model) this.model = b.model;
        if (b.comparator !== void 0) this.comparator = b.comparator;
        this._reset();
        this.initialize.apply(this, arguments);
        if (a) this.reset(a, _.extend({
            silent: true
        }, b))
    };
    var C = {
        add: true,
        remove: true,
        merge: true
    };
    var D = {
        add: true,
        merge: false,
        remove: false
    };
    _.extend(B.prototype, t, {
        model: y,
        initialize: function() {},
        toJSON: function(b) {
            return this.map(function(a) {
                return a.toJSON(b)
            })
        },
        sync: function() {
            return s.sync.apply(this, arguments)
        },
        add: function(a, b) {
            return this.set(a, _.defaults(b || {}, D))
        },
        remove: function(a, b) {
            a = _.isArray(a) ? a.slice() : [a];
            b || (b = {});
            var i, l, index, model;
            for (i = 0, l = a.length; i < l; i++) {
                model = this.get(a[i]);
                if (!model) continue;
                delete this._byId[model.id];
                delete this._byId[model.cid];
                index = this.indexOf(model);
                this.models.splice(index, 1);
                this.length--;
                if (!b.silent) {
                    b.index = index;
                    model.trigger("remove", model, this, b)
                }
                this._removeReference(model)
            }
            return this
        },
        set: function(a, b) {
            b = _.defaults(b || {}, C);
            if (b.parse) a = this.parse(a, b);
            if (!_.isArray(a)) a = a ? [a] : [];
            var i, l, model, attrs, existing, sort;
            var c = b.at;
            var d = this.comparator && c == null && b.sort !== false;
            var e = _.isString(this.comparator) ? this.comparator : null;
            var f = [],
                toRemove = [],
                modelMap = {};
            for (i = 0, l = a.length; i < l; i++) {
                if (!(model = this._prepareModel(a[i], b))) continue;
                if (existing = this.get(model)) {
                    if (b.remove) modelMap[existing.cid] = true;
                    if (b.merge) {
                        existing.set(model.attributes, b);
                        if (d && !sort && existing.hasChanged(e)) sort = true
                    }
                } else if (b.add) {
                    f.push(model);
                    model.on("all", this._onModelEvent, this);
                    this._byId[model.cid] = model;
                    if (model.id != null) this._byId[model.id] = model
                }
            }
            if (b.remove) {
                for (i = 0, l = this.length; i < l; ++i) {
                    if (!modelMap[(model = this.models[i]).cid]) toRemove.push(model)
                }
                if (toRemove.length) this.remove(toRemove, b)
            }
            if (f.length) {
                if (d) sort = true;
                this.length += f.length;
                if (c != null) {
                    r.apply(this.models, [c, 0].concat(f))
                } else {
                    p.apply(this.models, f)
                }
            }
            if (sort) this.sort({
                silent: true
            });
            if (b.silent) return this;
            for (i = 0, l = f.length; i < l; i++) {
                (model = f[i]).trigger("add", model, this, b)
            }
            if (sort) this.trigger("sort", this, b);
            return this
        },
        reset: function(a, b) {
            b || (b = {});
            for (var i = 0, l = this.models.length; i < l; i++) {
                this._removeReference(this.models[i])
            }
            b.previousModels = this.models;
            this._reset();
            this.add(a, _.extend({
                silent: true
            }, b));
            if (!b.silent) this.trigger("reset", this, b);
            return this
        },
        push: function(a, b) {
            a = this._prepareModel(a, b);
            this.add(a, _.extend({
                at: this.length
            }, b));
            return a
        },
        pop: function(a) {
            var b = this.at(this.length - 1);
            this.remove(b, a);
            return b
        },
        unshift: function(a, b) {
            a = this._prepareModel(a, b);
            this.add(a, _.extend({
                at: 0
            }, b));
            return a
        },
        shift: function(a) {
            var b = this.at(0);
            this.remove(b, a);
            return b
        },
        slice: function(a, b) {
            return this.models.slice(a, b)
        },
        get: function(a) {
            if (a == null) return void 0;
            return this._byId[a.id != null ? a.id : a.cid || a]
        },
        at: function(a) {
            return this.models[a]
        },
        where: function(c, d) {
            if (_.isEmpty(c)) return d ? void 0 : [];
            return this[d ? "find" : "filter"](function(a) {
                for (var b in c) {
                    if (c[b] !== a.get(b)) return false
                }
                return true
            })
        },
        findWhere: function(a) {
            return this.where(a, true)
        },
        sort: function(a) {
            if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
            a || (a = {});
            if (_.isString(this.comparator) || this.comparator.length === 1) {
                this.models = this.sortBy(this.comparator, this)
            } else {
                this.models.sort(_.bind(this.comparator, this))
            }
            if (!a.silent) this.trigger("sort", this, a);
            return this
        },
        sortedIndex: function(b, c, d) {
            c || (c = this.comparator);
            var e = _.isFunction(c) ? c : function(a) {
                return a.get(c)
            };
            return _.sortedIndex(this.models, b, e, d)
        },
        pluck: function(a) {
            return _.invoke(this.models, "get", a)
        },
        fetch: function(c) {
            c = c ? _.clone(c) : {};
            if (c.parse === void 0) c.parse = true;
            var d = c.success;
            var e = this;
            c.success = function(a) {
                var b = c.reset ? "reset" : "set";
                e[b](a, c);
                if (d) d(e, a, c);
                e.trigger("sync", e, a, c)
            };
            W(this, c);
            return this.sync("read", this, c)
        },
        create: function(b, c) {
            c = c ? _.clone(c) : {};
            if (!(b = this._prepareModel(b, c))) return false;
            if (!c.wait) this.add(b, c);
            var d = this;
            var e = c.success;
            c.success = function(a) {
                if (c.wait) d.add(b, c);
                if (e) e(b, a, c)
            };
            b.save(null, c);
            return b
        },
        parse: function(a, b) {
            return a
        },
        clone: function() {
            return new this.constructor(this.models)
        },
        _reset: function() {
            this.length = 0;
            this.models = [];
            this._byId = {}
        },
        _prepareModel: function(a, b) {
            if (a instanceof y) {
                if (!a.collection) a.collection = this;
                return a
            }
            b || (b = {});
            b.collection = this;
            var c = new this.model(a, b);
            if (!c._validate(a, b)) {
                this.trigger("invalid", this, a, b);
                return false
            }
            return c
        },
        _removeReference: function(a) {
            if (this === a.collection) delete a.collection;
            a.off("all", this._onModelEvent, this)
        },
        _onModelEvent: function(a, b, c, d) {
            if ((a === "add" || a === "remove") && c !== this) return;
            if (a === "destroy") this.remove(b, d);
            if (b && a === "change:" + b.idAttribute) {
                delete this._byId[b.previous(b.idAttribute)];
                if (b.id != null) this._byId[b.id] = b
            }
            this.trigger.apply(this, arguments)
        }
    });
    var E = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain"];
    _.each(E, function(b) {
        B.prototype[b] = function() {
            var a = q.call(arguments);
            a.unshift(this.models);
            return _[b].apply(_, a)
        }
    });
    var F = ["groupBy", "countBy", "sortBy"];
    _.each(F, function(e) {
        B.prototype[e] = function(b, c) {
            var d = _.isFunction(b) ? b : function(a) {
                return a.get(b)
            };
            return _[e](this.models, d, c)
        }
    });
    var G = s.View = function(a) {
        this.cid = _.uniqueId("view");
        this._configure(a || {});
        this._ensureElement();
        this.initialize.apply(this, arguments);
        this.delegateEvents()
    };
    var H = /^(\S+)\s*(.*)$/;
    var I = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
    _.extend(G.prototype, t, {
        tagName: "div",
        $: function(a) {
            return this.$el.find(a)
        },
        initialize: function() {},
        render: function() {
            return this
        },
        remove: function() {
            this.$el.remove();
            this.stopListening();
            return this
        },
        setElement: function(a, b) {
            if (this.$el) this.undelegateEvents();
            this.$el = a instanceof s.$ ? a : s.$(a);
            this.el = this.$el[0];
            if (b !== false) this.delegateEvents();
            return this
        },
        delegateEvents: function(a) {
            if (!(a || (a = _.result(this, "events")))) return this;
            this.undelegateEvents();
            for (var b in a) {
                var c = a[b];
                if (!_.isFunction(c)) c = this[a[b]];
                if (!c) continue;
                var d = b.match(H);
                var e = d[1],
                    selector = d[2];
                c = _.bind(c, this);
                e += ".delegateEvents" + this.cid;
                if (selector === "") {
                    this.$el.on(e, c)
                } else {
                    this.$el.on(e, selector, c)
                }
            }
            return this
        },
        undelegateEvents: function() {
            this.$el.off(".delegateEvents" + this.cid);
            return this
        },
        _configure: function(a) {
            if (this.options) a = _.extend({}, _.result(this, "options"), a);
            _.extend(this, _.pick(a, I));
            this.options = a
        },
        _ensureElement: function() {
            if (!this.el) {
                var a = _.extend({}, _.result(this, "attributes"));
                if (this.id) a.id = _.result(this, "id");
                if (this.className) a["class"] = _.result(this, "className");
                var b = s.$("<" + _.result(this, "tagName") + ">").attr(a);
                this.setElement(b, false)
            } else {
                this.setElement(_.result(this, "el"), false)
            }
        }
    });
    s.sync = function(b, c, d) {
        var e = J[b];
        _.defaults(d || (d = {}), {
            emulateHTTP: s.emulateHTTP,
            emulateJSON: s.emulateJSON
        });
        var f = {
            type: e,
            dataType: "json"
        };
        if (!d.url) {
            f.url = _.result(c, "url") || V()
        }
        if (d.data == null && c && (b === "create" || b === "update" || b === "patch")) {
            f.contentType = "application/json";
            f.data = JSON.stringify(d.attrs || c.toJSON(d))
        }
        if (d.emulateJSON) {
            f.contentType = "application/x-www-form-urlencoded";
            f.data = f.data ? {
                model: f.data
            } : {}
        }
        if (d.emulateHTTP && (e === "PUT" || e === "DELETE" || e === "PATCH")) {
            f.type = "POST";
            if (d.emulateJSON) f.data._method = e;
            var g = d.beforeSend;
            d.beforeSend = function(a) {
                a.setRequestHeader("X-HTTP-Method-Override", e);
                if (g) return g.apply(this, arguments)
            }
        }
        if (f.type !== "GET" && !d.emulateJSON) {
            f.processData = false
        }
        if (f.type === "PATCH" && window.ActiveXObject && !(window.external && window.external.msActiveXFilteringEnabled)) {
            f.xhr = function() {
                return new ActiveXObject("Microsoft.XMLHTTP")
            }
        }
        var h = d.xhr = s.ajax(_.extend(f, d));
        c.trigger("request", c, h, d);
        return h
    };
    var J = {
        create: "POST",
        update: "PUT",
        patch: "PATCH",
        "delete": "DELETE",
        read: "GET"
    };
    s.ajax = function() {
        return s.$.ajax.apply(s.$, arguments)
    };
    var K = s.Router = function(a) {
        a || (a = {});
        if (a.routes) this.routes = a.routes;
        this._bindRoutes();
        this.initialize.apply(this, arguments)
    };
    var L = /\((.*?)\)/g;
    var M = /(\(\?)?:\w+/g;
    var N = /\*\w+/g;
    var O = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    _.extend(K.prototype, t, {
        initialize: function() {},
        route: function(c, d, e) {
            if (!_.isRegExp(c)) c = this._routeToRegExp(c);
            if (_.isFunction(d)) {
                e = d;
                d = ""
            }
            if (!e) e = this[d];
            var f = this;
            s.history.route(c, function(a) {
                var b = f._extractParameters(c, a);
                e && e.apply(f, b);
                f.trigger.apply(f, ["route:" + d].concat(b));
                f.trigger("route", d, b);
                s.history.trigger("route", f, d, b)
            });
            return this
        },
        navigate: function(a, b) {
            s.history.navigate(a, b);
            return this
        },
        _bindRoutes: function() {
            if (!this.routes) return;
            this.routes = _.result(this, "routes");
            var a, routes = _.keys(this.routes);
            while ((a = routes.pop()) != null) {
                this.route(a, this.routes[a])
            }
        },
        _routeToRegExp: function(c) {
            c = c.replace(O, "\\$&").replace(L, "(?:$1)?").replace(M, function(a, b) {
                return b ? a : "([^/]+)"
            }).replace(N, "(.*?)");
            return new RegExp("^" + c + "$")
        },
        _extractParameters: function(b, c) {
            var d = b.exec(c).slice(1);
            return _.map(d, function(a) {
                return a ? decodeURIComponent(a) : null
            })
        }
    });
    var P = s.History = function() {
        this.handlers = [];
        _.bindAll(this, "checkUrl");
        if (typeof window !== "undefined") {
            this.location = window.location;
            this.history = window.history
        }
    };
    var Q = /^[#\/]|\s+$/g;
    var R = /^\/+|\/+$/g;
    var S = /msie [\w.]+/;
    var T = /\/$/;
    P.started = false;
    _.extend(P.prototype, t, {
        interval: 50,
        getHash: function(a) {
            var b = (a || this).location.href.match(/#(.*)$/);
            return b ? b[1] : ""
        },
        getFragment: function(a, b) {
            if (a == null) {
                if (this._hasPushState || !this._wantsHashChange || b) {
                    a = this.location.pathname;
                    var c = this.root.replace(T, "");
                    if (!a.indexOf(c)) a = a.substr(c.length)
                } else {
                    a = this.getHash()
                }
            }
            return a.replace(Q, "")
        },
        start: function(a) {
            if (P.started) throw new Error("Backbone.history has already been started");
            P.started = true;
            this.options = _.extend({}, {
                root: "/"
            }, this.options, a);
            this.root = this.options.root;
            this._wantsHashChange = this.options.hashChange !== false;
            this._wantsPushState = !!this.options.pushState;
            this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
            var b = this.getFragment();
            var c = document.documentMode;
            var d = S.exec(navigator.userAgent.toLowerCase()) && (!c || c <= 7);
            this.root = ("/" + this.root + "/").replace(R, "/");
            if (d && this._wantsHashChange) {
                this.iframe = s.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow;
                this.navigate(b)
            }
            if (this._hasPushState) {
                s.$(window).on("popstate", this.checkUrl)
            } else if (this._wantsHashChange && "onhashchange" in window && !d) {
                s.$(window).on("hashchange", this.checkUrl)
            } else if (this._wantsHashChange) {
                this._checkUrlInterval = setInterval(this.checkUrl, this.interval)
            }
            this.fragment = b;
            var e = this.location;
            var f = e.pathname.replace(/[^\/]$/, "$&/") === this.root;
            if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !f) {
                this.fragment = this.getFragment(null, true);
                this.location.replace(this.root + this.location.search + "#" + this.fragment);
                return true
            } else if (this._wantsPushState && this._hasPushState && f && e.hash) {
                this.fragment = this.getHash().replace(Q, "");
                this.history.replaceState({}, document.title, this.root + this.fragment + e.search)
            }
            if (!this.options.silent) return this.loadUrl()
        },
        stop: function() {
            s.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl);
            clearInterval(this._checkUrlInterval);
            P.started = false
        },
        route: function(a, b) {
            this.handlers.unshift({
                route: a,
                callback: b
            })
        },
        checkUrl: function(e) {
            var a = this.getFragment();
            if (a === this.fragment && this.iframe) {
                a = this.getFragment(this.getHash(this.iframe))
            }
            if (a === this.fragment) return false;
            if (this.iframe) this.navigate(a);
            this.loadUrl() || this.loadUrl(this.getHash())
        },
        loadUrl: function(b) {
            var c = this.fragment = this.getFragment(b);
            var d = _.any(this.handlers, function(a) {
                if (a.route.test(c)) {
                    a.callback(c);
                    return true
                }
            });
            return d
        },
        navigate: function(a, b) {
            if (!P.started) return false;
            if (!b || b === true) b = {
                trigger: b
            };
            a = this.getFragment(a || "");
            if (this.fragment === a) return;
            this.fragment = a;
            var c = this.root + a;
            if (this._hasPushState) {
                this.history[b.replace ? "replaceState" : "pushState"]({}, document.title, c)
            } else if (this._wantsHashChange) {
                this._updateHash(this.location, a, b.replace);
                if (this.iframe && a !== this.getFragment(this.getHash(this.iframe))) {
                    if (!b.replace) this.iframe.document.open().close();
                    this._updateHash(this.iframe.location, a, b.replace)
                }
            } else {
                return this.location.assign(c)
            }
            if (b.trigger) this.loadUrl(a)
        },
        _updateHash: function(a, b, c) {
            if (c) {
                var d = a.href.replace(/(javascript:|#).*$/, "");
                a.replace(d + "#" + b)
            } else {
                a.hash = "#" + b
            }
        }
    });
    s.history = new P;
    var U = function(a, b) {
        var c = this;
        var d;
        if (a && _.has(a, "constructor")) {
            d = a.constructor
        } else {
            d = function() {
                return c.apply(this, arguments)
            }
        }
        _.extend(d, c, b);
        var e = function() {
            this.constructor = d
        };
        e.prototype = c.prototype;
        d.prototype = new e;
        if (a) _.extend(d.prototype, a);
        d.__super__ = c.prototype;
        return d
    };
    y.extend = B.extend = K.extend = G.extend = P.extend = U;
    var V = function() {
        throw new Error('A "url" property or function must be specified')
    };
    var W = function(b, c) {
        var d = c.error;
        c.error = function(a) {
            if (d) d(b, a, c);
            b.trigger("error", b, a, c)
        }
    }
}).call(this);
define("backbone", ["underscore", "jquery"], (function(b) {
    return function() {
        var a, fn;
        return a || b.Backbone
    }
}(this)));
var sprintf = (function() {
    function get_type(a) {
        return Object.prototype.toString.call(a).slice(8, -1).toLowerCase()
    }

    function str_repeat(a, b) {
        for (var c = []; b > 0; c[--b] = a) {}
        return c.join('')
    }
    var d = function() {
        if (!d.cache.hasOwnProperty(arguments[0])) {
            d.cache[arguments[0]] = d.parse(arguments[0])
        }
        return d.format.call(null, d.cache[arguments[0]], arguments)
    };
    d.format = function(a, b) {
        var c = 1,
            tree_length = a.length,
            node_type = '',
            arg, output = [],
            i, k, match, pad, pad_character, pad_length;
        for (i = 0; i < tree_length; i++) {
            node_type = get_type(a[i]);
            if (node_type === 'string') {
                output.push(a[i])
            } else if (node_type === 'array') {
                match = a[i];
                if (match[2]) {
                    arg = b[c];
                    for (k = 0; k < match[2].length; k++) {
                        if (!arg.hasOwnProperty(match[2][k])) {
                            throw (sprintf('[sprintf] property "%s" does not exist', match[2][k]));
                        }
                        arg = arg[match[2][k]]
                    }
                } else if (match[1]) {
                    arg = b[match[1]]
                } else {
                    arg = b[c++]
                }
                if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
                    throw (sprintf('[sprintf] expecting number but found %s', get_type(arg)));
                }
                switch (match[8]) {
                    case 'b':
                        arg = arg.toString(2);
                        break;
                    case 'c':
                        arg = String.fromCharCode(arg);
                        break;
                    case 'd':
                        arg = parseInt(arg, 10);
                        break;
                    case 'e':
                        arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential();
                        break;
                    case 'f':
                        arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg);
                        break;
                    case 'o':
                        arg = arg.toString(8);
                        break;
                    case 's':
                        arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg);
                        break;
                    case 'u':
                        arg = Math.abs(arg);
                        break;
                    case 'x':
                        arg = arg.toString(16);
                        break;
                    case 'X':
                        arg = arg.toString(16).toUpperCase();
                        break
                }
                arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+' + arg : arg);
                pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
                pad_length = match[6] - String(arg).length;
                pad = match[6] ? str_repeat(pad_character, pad_length) : '';
                output.push(match[5] ? arg + pad : pad + arg)
            }
        }
        return output.join('')
    };
    d.cache = {};
    d.parse = function(a) {
        var b = a,
            match = [],
            parse_tree = [],
            arg_names = 0;
        while (b) {
            if ((match = /^[^\x25]+/.exec(b)) !== null) {
                parse_tree.push(match[0])
            } else if ((match = /^\x25{2}/.exec(b)) !== null) {
                parse_tree.push('%')
            } else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(b)) !== null) {
                if (match[2]) {
                    arg_names |= 1;
                    var c = [],
                        replacement_field = match[2],
                        field_match = [];
                    if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                        c.push(field_match[1]);
                        while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                            if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                                c.push(field_match[1])
                            } else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
                                c.push(field_match[1])
                            } else {
                                throw ('[sprintf] huh?');
                            }
                        }
                    } else {
                        throw ('[sprintf] huh?');
                    }
                    match[2] = c
                } else {
                    arg_names |= 2
                }
                if (arg_names === 3) {
                    throw ('[sprintf] mixing positional and named placeholders is not (yet) supported');
                }
                parse_tree.push(match)
            } else {
                throw ('[sprintf] huh?');
            }
            b = b.substring(match[0].length)
        }
        return parse_tree
    };
    return d
})();
var vsprintf = function(a, b) {
    b.unshift(a);
    return sprintf.apply(null, b)
};
define("sprintf", (function(b) {
    return function() {
        var a, fn;
        return a || b.sprintf
    }
}(this)));
(function(k, l) {
    var m = 'fastCss';

    function _fastCss(a, b) {
        var c = this;
        var d = c.length;
        var e = typeof a;
        if (d < 1) {
            return this
        } else if (b === l && e === 'string') {
            return k.getComputedStyle(c[0])
        }
        var f = null;
        var i = 0;
        var j = 0;
        var g;
        if (a && e === 'object') {
            var h = Object.keys(a);
            for (i = 0; i < d; ++i) {
                f = c[i].style;
                for (; h[j]; ++j) {
                    g = h[j];
                    f[g] = a[g]
                }
            }
        } else if (e === 'string') {
            for (i = 0; i < d; ++i) {
                c[i].style[a] = b
            }
        }
        return this
    }
    $.fn[m] = $.fn[m] || _fastCss
})(this.self || global, void 0);
define("jq.fastCss", ["jquery"], function() {});