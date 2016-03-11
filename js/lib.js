define("lib", function() {}), define("lib/ab/kickmotor/Stream", ["require", "exports"], function(e, t) {
        var n = function() {
            function e() {
                this._stream = []
            }
            return e.prototype.add = function(e) {
                return this._stream.push(e), this
            }, e.prototype.process = function() {
                return this._stream.length > 0 && (kickmotor.animation.processAnimation(this._stream), this._stream = []), this
            }, e
        }();
        return n
    }), define("lib/ab/kickmotor/LayerFactory", ["require", "exports", "underscore", "./Stream"], function(e, t, n, r) {
        var i = function() {
            function e() {
                this._layers = {}, this._stream = new r, this.verbose = !1
            }
            return e.getInstance = function() {
                return e._instance || (e._instance = new e), e._instance
            }, e.prototype.create = function(e, t, r, i, s) {
                r === void 0 && (r = void 0), i === void 0 && (i = {}), s === void 0 && (s = {});
                if (this.isExist(e)) {
                    if (!s.ignoreSameNameLayer) throw this.dump(), new Error("can not create. layerName:" + e + " already exists.");
                    FF.logger.warn("layer " + e + " already exists.")
                }
                var o = {
                    exec: "createLayer",
                    layer: e,
                    abproj: t,
                    autoDestroy: !0,
                    useParsedJsonCache: !0
                };
                FF.logger.debug("createLayer :" + e, o), n.extend(o, i), r && this._stream.add({
                    exec: "loadBundle",
                    bundle: r
                }), this._stream.add(o).process(), this._layers[e] = {
                    name: e,
                    command: o
                }, this.verbose && this.dump()
            }, e.prototype.destroy = function(e, t) {
                t === void 0 && (t = {});
                if (!this.isExist(e)) {
                    this.dump(), FF.logger.warn("can not destroy. layerName:" + e + " is not created.");
                    return
                }
                FF.logger.debug("destroyLayer :" + e);
                var r = {
                    exec: "destroyLayer",
                    layer: e
                };
                n.extend(r, t), this._stream.add(r).process(), delete this._layers[e], this.verbose && this.dump()
            }, e.prototype.destoroyAll = function(e) {
                var t = this;
                n.each(this._layers, function(n, r) {
                    t.destroy(r, e)
                })
            }, e.prototype.isExist = function(e) {
                return this._layers[e] !== void 0
            }, e.prototype.changeCurrentLayer = function(e) {
                if (!this.isExist(e)) throw this.dump(), new Error("can not change current layer. layerName:" + e + " is not created.");
                FF.logger.debug("changeCurrentLayer :" + e), this._stream.add({
                    exec: "changeCurrentLayer",
                    layer: e
                }).process(), this._defaultLayerName = e
            }, e.prototype.getCurrentLayerName = function() {
                return this._defaultLayerName
            }, e.prototype.dump = function() {
                FF.logger.debug("layers____"), n.each(this._layers, function(e, t) {
                    FF.logger.debug(t, e)
                }), FF.logger.debug("__________")
            }, e.prototype.nativeDump = function(e) {
                e === void 0 && (e = !1), kickmotor.nativefn.isNative() && kickmotor.nativefn.call("dumpABInfo", {
                    isVisualTree: e
                })
            }, e
        }();
        return i
    }), define("lib/Watchdog", [], function() {
        var e = {},
            t = 1;
        return {
            registerDeferred: function(n, r) {
                return r = r || {}, e[t] = {
                    deferred: n,
                    timeout: r.timeout || 1e4,
                    elapsedTime: 0,
                    id: t
                }, t++
            },
            resolve: function(t) {
                e[t] && delete e[t]
            },
            update: function(t) {
                var n = [];
                _.each(e, function(e, r) {
                    e.elapsedTime += t, e.elapsedTime >= e.timeout && n.push(e)
                });
                for (var r = 0, i = n.length; r < i; r++) {
                    var s = n[r],
                        o = s.deferred;
                    o.state() === "pending" && (FF.logger.error("watchdog"), o.resolve()), delete e[s.id]
                }
            }
        }
    }), define("lib/Events", ["backbone"], function(e) {
        return e.Events
    }), define("lib/api", ["jquery", "underscore", "sprintf", "util"], function(e, t, n, r) {
        var i = {
                PAYMENT_ERROR_CODE_OF: {
                    PURCHASING_COIN_FAILED: 10002,
                    PURCHASING_COIN_CANCELED: 10003
                }
            },
            s = {
                GET: {
                    TIMEOUT: 1e4,
                    RETRY: 1
                },
                POST: {
                    TIMEOUT: 3e4,
                    RETRY: 0
                }
            };
        return {
            RETRY_INTERVAL_MSEC: 500,
            requestDeferred: function(t, n, r) {
                var i = e.Deferred();
                r = r ? r : {};
                var o = r.type ? r.type.toUpperCase() : "GET",
                    u = s[o],
                    a = {
                        url: t,
                        dataType: "json",
                        data: n,
                        type: r.type || "GET",
                        timeout: r.timeout || u.TIMEOUT,
                        headers: r.headers || {},
                        traditional: !0
                    };
                a.headers["User-Session"] = FF.env.userSessionKey || "UNDEFINED_IN_API_JS", r.noLogin || FF.env.checkMobageLoginDeferred().then(function(e) {
                    if (!e) {
                        var t = r.backUrl || "#";
                        kickmotor.platform.mobageLogin(t), i.reject();
                        return
                    }
                }), o === "POST" && (a.data = JSON.stringify(n), a.contentType = "application/json", a.headers["X-CSRF-Token"] = FF.env.csrfToken, r.hashFunc && (a.headers["Ff-Chk"] = r.hashFunc(a.data)));
                var f = r.retryCount >= 1 ? r.retryCount : u.RETRY;
                return this._requestDeferred(a, i, f), i.promise()
            },
            _requestDeferred: function(t, n, r) {
                var i = this;
                e.ajax(t).done(function(e, r, s) {
                    FF.logger.debug("api.js : " + t.url, t.data, e), i._updateServerTimeDiff(e), e.success ? n.resolve(e, r, s) : n.reject(s, r, e)
                }).fail(function(e, s, o) {
                    FF.logger.debug(e, s, o);
                    if (r <= 0) {
                        n.reject(e, s, o);
                        return
                    }
                    r--;
                    var u = setTimeout(function() {
                        clearTimeout(u), i._requestDeferred(t, n, r)
                    }, i.RETRY_INTERVAL_MSEC)
                })
            },
            _updateServerTimeDiff: function(e) {
                if (!e.hasOwnProperty("SERVER_TIME")) return;
                FF.env.serverTimeDiffMsec = FF.env.calcServerTimeDiffMsec(e.SERVER_TIME), delete e.SERVER_TIME
            },
            purchaseItem: function(e, t) {
                var n = kickmotor.nativefn,
                    r = n.call,
                    i = n.autoUnregisterCallback(function(e) {
                        t(e.err, e.resultString)
                    });
                r("purchaseItem", {
                    create_transaction_path: "payment/create",
                    close_transaction_path: "payment/update",
                    billing_params: encodeURIComponent(JSON.stringify(e)),
                    callback: i,
                    method: "POST"
                })
            },
            purchaseItemDeferred: function(t) {
                var n = e.Deferred();
                return this.purchaseItem(t, function(e, t) {
                    if (e) {
                        switch (e.errorCode) {
                            case i.PAYMENT_ERROR_CODE_OF.PURCHASING_COIN_FAILED:
                                e.isPurchasingFailed = !0;
                                break;
                            case i.PAYMENT_ERROR_CODE_OF.PURCHASING_COIN_CANCELED:
                                e.isPurchasingCanceled = !0
                        }
                        n.reject(e)
                    } else n.resolve(t)
                }), n.promise()
            },
            getBalanceDeferred: function(t) {
                if (FF.env.isWWRegion()) return this.lcdGetBalanceDeferred(t);
                var n = e.Deferred(),
                    r = setTimeout(function() {
                        kickmotor.platform.getBalance(function(e) {
                            e.success ? n.resolve(e.balance) : n.reject()
                        }), clearTimeout(r)
                    }, 1500);
                return n.promise()
            },
            errorDeferred: function(e) {
                return this.requestDeferred("/dff/js/log", {
                    msg: e,
                    type: "error"
                }, {
                    type: "POST",
                    noLogin: !0
                })
            },
            infoDeferred: function(e) {
                return this.requestDeferred("/dff/js/log", {
                    msg: e,
                    type: "info"
                }, {
                    type: "POST",
                    noLogin: !0
                })
            },
            warnDeferred: function(e) {
                return this.requestDeferred("/dff/js/log", {
                    msg: e,
                    type: "warn"
                }, {
                    type: "POST",
                    noLogin: !0
                })
            },
            logRemoteNotificationDeferred: function(e) {
                return this.requestDeferred("/dff/logger/remote_notification", {
                    cs: e
                }, {
                    type: "POST"
                })
            },
            lcdGetBalanceDeferred: function(e) {
                return e && e.handleRetry ? (e.callingFunction = "getBalanceDeferred", this.callDeferredWithRetry(this._getLcdBalanceDeferred.bind(this), e)) : this._getLcdBalanceDeferred()
            },
            _getLcdBalanceDeferred: function() {
                var t = e.Deferred(),
                    n = this;
                return kickmotor.platform.getBalance(function(e) {
                    t && (e.success ? t.resolve(e.balance) : t.reject(), t = null)
                }), t.promise()
            },
            _getRequestTimeout: function(e) {
                var t = 4e3,
                    n = 12e3,
                    r = (e.retryCount || 0) + 1,
                    i = t * r;
                return i > n ? n : i
            },
            callDeferredWithRetry: function(t, n) {
                var r = e.Deferred(),
                    i = this,
                    s = this._getRequestTimeout(n),
                    o = n && n.callingFunction || "unknown function",
                    u = !1,
                    a = setTimeout(function() {
                        clearTimeout(a);
                        if (!!u) return;
                        u = !0, n && n.handleRetry && n.ModalRetry ? i.handleRetryErrorDeferred(t, n).then(function(e) {
                            r && r.resolve(e)
                        }, function(e) {
                            r && r.reject(e)
                        }) : r.reject("Network Error")
                    }, s);
                return t.call(i, n).done(function(e) {
                    if (!!u) return;
                    u = !0, r && (FF.modalView && (FF.modalView.close(), FF.modalView = null), clearTimeout(a), i.infoDeferred("request succeeded after retryCount: " + (n.retryCount || 0) + " after requestTime: " + s + " from function: " + o + " with path: " + Backbone.history.fragment), r.resolve(e), r = null)
                }).fail(function(e) {
                    if (!!u) return;
                    u = !0, r && (clearTimeout(a), n && n.handleRetry && n.ModalRetry ? i.handleRetryErrorDeferred(t, n).then(function(e) {
                        r && r.resolve(e)
                    }, function(e) {
                        r && r.reject(e)
                    }) : (r.reject("Network Error"), r = null))
                }), r.promise()
            },
            handleRetryErrorDeferred: function(t, n) {
                var r = e.Deferred();
                if (FF.modalView) return;
                var i = new n.ModalRetry("");
                FF.modalView = i;
                var s = this,
                    o = this._getRequestTimeout(n),
                    u = n && n.callingFunction || "unknown function";
                return s.errorDeferred("timeout after retryCount: " + (n.retryCount || 0) + " after requestTime: " + o + " from function: " + u + " with path: " + Backbone.history.fragment), FF.router.overlay.registerChildren(FF.modalView), FF.modalView.render(), FF.modalView.open(), FF.modalView.listenToOnce(FF.modalView, "onClickRetry", function() {
                    FF.modalView = null, FF.router.loading.show(), n.retryCount = (n.retryCount || 0) + 1, s.callDeferredWithRetry(t, n).done(function(e) {
                        r.resolve(e)
                    }).fail(function(e) {
                        r.reject(e)
                    })
                }), FF.modalView.listenToOnce(FF.modalView, "closeNotify", function() {
                    FF.modalView = null
                }), r.promise()
            }
        }
    }), define("lib/Ticker", ["./Events", "util"], function(e, t) {
        var n = {
                fps: 10,
                interval: 100,
                lastStartUpdateTime: 0,
                timerId: void 0,
                callback: void 0,
                isReset: !1
            },
            r = _.extend({
                start: function() {
                    n.lastStartUpdateTime = t.getTime(), r._setupTick(n.interval)
                },
                reset: function() {
                    n.timerId && clearTimeout(n.timerId), n.isReset = !0
                },
                setFPS: function(e) {
                    n.fps = e, n.interval = Math.floor(1e3 / e)
                },
                _setupTick: function(e) {
                    if (n.isReset) {
                        n.isReset = !1;
                        return
                    }
                    n.timerId = setTimeout(r._handler, e)
                },
                _handler: function() {
                    var e = void 0,
                        i = void 0,
                        s = t.getTime(),
                        o = s - n.lastStartUpdateTime;
                    n.lastStartUpdateTime = s, r.trigger("tick", o), i = t.getTime(), e = n.interval - (i - s), e < 0 && (e = 0), r._setupTick(e)
                }
            }, e);
        return r.start(), r
    }), define("lib/ErrorHandler", ["./Events", "./api", "./Ticker", "require"], function(e, t, n, r) {
        var i = 5e3,
            s = _.extend({
                bindTryCatch: function(e, t) {
                    var n = this;
                    return function() {
                        try {
                            return e.apply(t, arguments)
                        } catch (r) {
                            n.onErrorSend(r), n.onError(r)
                        }
                    }
                },
                bindTryCatchDeferred: function(e, t) {
                    var n = this;
                    return function() {
                        try {
                            return e.apply(t, arguments)
                        } catch (r) {
                            return n.onErrorSend(r), $.Deferred().reject(r).promise()
                        }
                    }
                },
                onError: function(e) {
                    FF.env.isDevelop() && window.alert(e.message + "\n" + e.stack)
                },
                onErrorSend: function(e) {
                    this._queue.push(e)
                },
                _queue: [],
                _elapsedTime: 0,
                _send: function(e) {
                    var t = this;
                    this._elapsedTime += e;
                    if (this._elapsedTime < i) return;
                    if (this._queue.length === 0) return;
                    var n = {};
                    _.each(this._queue, function(e) {
                        var t = e.message;
                        if (_.has(n, t)) return;
                        n[t] = e
                    }, this), n.href = location.href, this._queue = [], this._elapsedTime = 0, this._sendRemoteDeferred(n)
                },
                _sendRemoteDeferred: function(e) {
                    if (FF.env.isNative()) return t.errorDeferred(JSON.stringify(e))
                }
            }, e);
        return s.listenTo(n, "tick", s._send), s
    }), define("lib/ab/ABNode", ["underscore", "lib/Watchdog", "lib/ErrorHandler"], function(e, t, n) {
        var r = function(e) {
            this.name = e.name || "node_nul", this.callbacks = {}, this.layer = e.layer || "layer", this.visualParentLayer = e.layer || "layer", this.stream = [], this.children = {}, this.parentNodeName = e.parentNodeName, this.visualParentNodeName = e.parentNodeName, this.topNodeName = e.topNodeName, this.visualTopNodeName = e.topNodeName, this.touchNodeName = e.touchNodeName || this.name, this.callbackIds = {}, this.currentTag = void 0, this.isDuplicated = !1;
            var t = {};
            e.duplicateFrom ? (t = e.duplicateFromOptions || {}, t.visualParentLayer && (this.visualParentLayer = t.visualParentLayer), t.visualParentNode && (this.visualParentNodeName = t.visualParentNode), t.layer && (this.layer = t.layer), this.createNode(e.duplicateFrom, t)) : e.visualParentTo && (t = e.visualParentToOptions || {}, t.visualParentLayer && (this.visualParentLayer = t.visualParentLayer), this.visualParentNodeName = e.visualParentTo, this.setVisualParent(this.visualParentLayer, e.visualParentTo, t))
        };
        return r.prototype = {
            duplicateNode: function(t, n) {
                n = n || {};
                var r = {
                    exec: "duplicateNode",
                    layer: this.layer,
                    node: t,
                    name: this.name
                };
                return this.topNodeName && e.extend(r, {
                    topNode: this.topNodeName
                }), e.extend(r, n), this.stream.push(r), this.isDuplicated = !0, this
            },
            createNode: function(t, n) {
                n = n || {};
                var r = {
                    exec: "createNode",
                    layer: this.layer,
                    node: t,
                    name: this.name
                };
                return this.topNodeName && e.extend(r, {
                    topNode: this.topNodeName
                }), n.parentTopNode && (n.parentNode = sprintf("%s %s", n.parentTopNode, n.parentNode), delete n.parentTopNode), e.extend(r, n), this.stream.push(r), this.isDuplicated = !0, this
            },
            setVisualParent: function(t, n, r) {
                r = r || {};
                var i = {
                    exec: "setVisualParent",
                    layer: this.layer,
                    node: this.name,
                    visualParentLayer: t,
                    visualParentNode: n
                };
                return this.topNodeName && e.extend(i, {
                    topNode: this.topNodeName
                }), e.extend(i, r), this.stream.push(i), this
            },
            setVisible: function(t, n) {
                n = n || {};
                var r = {
                    exec: "setVisible",
                    layer: this.layer,
                    node: this.name,
                    visible: t
                };
                return this.topNodeName && e.extend(r, {
                    topNode: this.topNodeName
                }), e.extend(r, n), this.stream.push(r), this
            },
            setVisibleByNode: function(t, n, r) {
                r = r || {};
                var i = {
                    exec: "setVisible",
                    layer: this.layer,
                    node: t,
                    topNode: this.name,
                    visible: n
                };
                return this.topNodeName && e.extend(i, {
                    topNode: this.topNodeName
                }), e.extend(i, r), this.stream.push(i), this
            },
            setIsAntiAlias: function(t, n) {
                n = n || {};
                var r = {
                    exec: "setIsAntiAlias",
                    layer: this.layer,
                    node: this.name,
                    isAntiAlias: t
                };
                return this.topNodeName && e.extend(r, {
                    topNode: this.topNodeName
                }), e.extend(r, n), this.stream.push(r), this
            },
            setParam: function(t, n) {
                n = n || {};
                var r = {
                    exec: "setParam",
                    layer: this.layer,
                    node: this.name,
                    param: t
                };
                return this.topNodeName && e.extend(r, {
                    topNode: this.topNodeName
                }), e.extend(r, n), this.stream.push(r), this
            },
            play: function(t, n, r) {
                n = n || {}, r = r ? " " + r : "";
                var i = {
                    exec: "play",
                    layer: this.layer,
                    node: this.name + r,
                    autoRemove: !0,
                    name: t
                };
                return this.topNodeName && e.extend(i, {
                    topNode: this.topNodeName
                }), e.extend(i, n), this.stream.push(i), this.currentTag = t, this
            },
            playFrame: function(t, n, r, i, s) {
                i = i || {}, s = s ? " " + s : "";
                var o = {
                    exec: "playFrame",
                    layer: this.layer,
                    node: this.name + s,
                    name: t,
                    start: n,
                    end: r
                };
                return this.topNodeName && e.extend(o, {
                    topNode: this.topNodeName
                }), e.extend(o, i), this.stream.push(o), this.currentTag = t, this
            },
            stop: function() {
                var e = {
                    exec: "stop",
                    node: this.name,
                    layer: this.layer
                };
                return this.stream.push(e), this
            },
            suspendPlay: function(t) {
                var n = {
                    exec: "suspendPlay",
                    node: this.name,
                    layer: this.layer
                };
                return e.extend(n, t), this.stream.push(n), this
            },
            resumePlay: function(t) {
                var n = {
                    exec: "resumePlay",
                    node: this.name,
                    layer: this.layer
                };
                return e.extend(n, t), this.stream.push(n), this
            },
            suspendParticle: function(t) {
                var n = {
                    exec: "suspendParticle",
                    node: this.name,
                    layer: this.layer,
                    descendant: !0
                };
                return e.extend(n, t), this.stream.push(n), this
            },
            resumeParticle: function(t) {
                var n = {
                    exec: "resumeParticle",
                    node: this.name,
                    layer: this.layer
                };
                return e.extend(n, t), this.stream.push(n), this
            },
            stopParticle: function(t) {
                var n = {
                    exec: "stopParticle",
                    node: this.name,
                    layer: this.layer
                };
                return e.extend(n, t), this.stream.push(n), this
            },
            pauseParticle: function(t) {
                var n = {
                    exec: "pauseParticle",
                    node: this.name,
                    layer: this.layer
                };
                return e.extend(n, t), this.stream.push(n), this
            },
            suspendSpriteAnime: function(t) {
                var n = {
                    exec: "suspendSpriteAnime",
                    node: this.name,
                    layer: this.layer
                };
                return e.extend(n, t), this.stream.push(n), this
            },
            resumeSpriteAnime: function(t) {
                var n = {
                    exec: "resumeSpriteAnime",
                    node: this.name,
                    layer: this.layer
                };
                return e.extend(n, t), this.stream.push(n), this
            },
            continueParticle: function(t) {
                var n = {
                    exec: "continueParticle",
                    node: this.name,
                    layer: this.layer
                };
                return e.extend(n, t), this.stream.push(n), this
            },
            sequence: function(t, n, r) {
                r = r || {};
                var i = {
                    exec: "sequence",
                    layer: this.layer,
                    node: this.name,
                    seq: t
                };
                return typeof n == "function" && (i.callback = $.nativefn.autoUnregisterCallback(n)), e.extend(i, r), this.stream.push(i), this
            },
            setSASpeed: function(t, n) {
                n = n || {};
                var r = {
                    exec: "setSASpeed",
                    layer: this.layer,
                    node: this.name,
                    descendant: !0,
                    speed: t
                };
                return this.topNodeName && e.extend(r, {
                    topNode: this.topNodeName
                }), e.extend(r, n), this.stream.push(r), this
            },
            setPosition: function(t, n) {
                n = n || {};
                var r = {
                    exec: "setPosition",
                    layer: this.layer,
                    node: this.name,
                    point: t
                };
                return this.topNodeName && e.extend(r, {
                    topNode: this.topNodeName
                }), e.extend(r, n), this.stream.push(r), this
            },
            getNodePos: function(t, n) {
                var r = "action_getNodePos",
                    i = void 0;
                this.addCallbackOnce(r, t), e.any(this.callbackIds, function(e, t) {
                    return t.indexOf(r + "_") === 0 ? (i = e, !0) : !1
                });
                if (!i) {
                    t({
                        err: "not found callbackId"
                    });
                    return
                }
                var s = {
                    exec: "getNodePos",
                    callback: i,
                    layer: this.layer,
                    topNode: this.name,
                    nodes: [this.name]
                };
                this.topNodeName && e.extend(s, {
                    topNode: this.topNodeName
                }), e.extend(s, n), this.stream.push(s), this.process()
            },
            setScale: function(t, n) {
                n = n || {};
                var r = {
                    exec: "setScale",
                    layer: this.layer,
                    node: this.name,
                    scale: t
                };
                return this.topNodeName && e.extend(r, {
                    topNode: this.topNodeName
                }), e.extend(r, n), this.stream.push(r), this
            },
            setRot: function(t, n) {
                n = n || {};
                var r = {
                    exec: "setRot",
                    layer: this.layer,
                    node: this.name,
                    z: t
                };
                return this.topNodeName && e.extend(r, {
                    topNode: this.topNodeName
                }), e.extend(r, n), this.stream.push(r), this
            },
            setImage: function(t, n, r) {
                r = r || {};
                var i = {
                    exec: "setImage",
                    layer: this.layer,
                    node: t,
                    topNode: this.name,
                    file: n
                };
                return this.topNodeName && e.extend(i, {
                    topNode: this.topNodeName
                }), e.extend(i, r), this.stream.push(i), this
            },
            setText: function(t, n, r) {
                r = r || {};
                var i = {
                    exec: "setText",
                    layer: this.layer,
                    node: t,
                    topNode: this.name,
                    text: n + ""
                };
                return this.topNodeName && e.extend(i, {
                    topNode: this.topNodeName
                }), e.extend(i, r), this.stream.push(i), this
            },
            setAlpha: function(t, n, r) {
                r = r || {};
                var i = {
                    exec: "setAlpha",
                    layer: this.layer,
                    node: t,
                    topNode: this.name,
                    alpha: n
                };
                return this.topNodeName && e.extend(i, {
                    topNode: this.topNodeName
                }), e.extend(i, r), this.stream.push(i), this
            },
            setSpriteAnime: function(t, n) {
                n = n || {};
                var r = {
                    exec: "setSpriteAnime",
                    layer: this.layer,
                    node: this.name,
                    topNode: this.name,
                    file: t
                };
                return e.extend(r, n), this.stream.push(r), this
            },
            setSpriteAnimeByNode: function(t, n, r) {
                r = r || {};
                var i = {
                    exec: "setSpriteAnime",
                    layer: this.layer,
                    node: t,
                    topNode: this.name,
                    file: n
                };
                return this.topNodeName && e.extend(i, {
                    topNode: this.topNodeName
                }), e.extend(i, r), this.stream.push(i), this
            },
            setSpriteAction: function(t, n) {
                n = n || {};
                var r = {
                    exec: "setSpriteAction",
                    layer: this.layer,
                    node: this.name,
                    topNode: this.name,
                    action: t
                };
                return e.extend(r, n), this.stream.push(r), this
            },
            setSpriteActionByNode: function(t, n, r) {
                r = r || {};
                var i = {
                    exec: "setSpriteAction",
                    layer: this.layer,
                    node: t,
                    topNode: this.name,
                    action: n
                };
                return this.topNodeName && e.extend(i, {
                    topNode: this.topNodeName
                }), e.extend(i, r), this.stream.push(i), this
            },
            setParticleTexture: function(t, n, r) {
                r = r || {};
                var i = {
                    exec: "setParticleTexture",
                    layer: this.layer,
                    node: t,
                    topNode: this.name,
                    file: n
                };
                return e.extend(i, r), this.stream.push(i), this
            },
            addCallback: function(e, t, r, i) {
                r = r || {}, i = i ? " " + i : "";
                var s = n.bindTryCatch(t),
                    o = kickmotor.nativefn.registerCallback(s);
                if (this.callbackIds.hasOwnProperty(e)) throw "callback for this event has been already registered. event:" + e;
                return this.callbackIds[e] = o, this._addCallback.apply(this, [e, o, r, i])
            },
            addCallbackOnce: function(t, r, i, s) {
                var o = this,
                    u;
                i = i || {}, s = s ? " " + s : "", i = e.extend(i, {
                    count: 1
                });
                var a = n.bindTryCatch(function() {
                    o.removeCallback(u).process(), r.apply(null, arguments)
                });
                u = kickmotor.nativefn.autoUnregisterCallback(a);
                if (this.callbackIds.hasOwnProperty(t)) throw "callback for this event has been already registered. event:" + t;
                var f = (new Date).getTime().toString();
                return this.callbackIds[t + "_" + f] = u, this._addCallback.apply(this, [t, u, i, s])
            },
            _addCallback: function(t, n, r, i) {
                var s = {
                    exec: "addCallback",
                    layer: this.layer,
                    node: this.name + i,
                    callback: n,
                    event: t,
                    autoDelete: !0
                };
                return this.topNodeName && e.extend(s, {
                    topNode: this.topNodeName
                }), e.extend(s, r), this.stream.push(s), this
            },
            removeAllCallback: function() {
                var t = this,
                    n = e.values(this.callbackIds);
                return e.each(n, function(e) {
                    t.removeCallback(e)
                }), this
            },
            removeCallback: function(e) {
                var t = {
                    exec: "removeCallback",
                    callback: e
                };
                this.stream.push(t), kickmotor.nativefn.unregisterCallback(e);
                for (var n in this.callbackIds) this.callbackIds.hasOwnProperty(n) && this.callbackIds[n] === e && delete this.callbackIds[n];
                return this
            },
            setAttractor: function(t, n, r) {
                r = r || {};
                var i = {
                    exec: "setAttractor",
                    layer: this.layer,
                    node: t,
                    topNode: this.name,
                    attractorNode: n
                };
                return e.extend(i, r), this.stream.push(i), this
            },
            addTouchRect: function(t, n) {
                n = n || {};
                var r = {
                    exec: "addTouchRect",
                    layer: this.layer,
                    node: this.name,
                    rect: t,
                    isHitTestEnable: !0
                };
                return this.topNodeName && e.extend(r, {
                    topNode: this.topNodeName
                }), e.extend(r, n), this.stream.push(r), this
            },
            clearTouchRect: function(t) {
                t = t || {};
                var n = {
                    exec: "clearTouchRect",
                    layer: this.layer,
                    node: this.name
                };
                return this.topNodeName && e.extend(n, {
                    topNode: this.topNodeName
                }), e.extend(n, t), this.stream.push(n), this
            },
            setDragEnable: function(t, n, r) {
                r = r || {};
                var i = {
                    exec: "setDragEnable",
                    layer: this.layer,
                    node: this.name,
                    dragArea: t,
                    isEnable: n
                };
                return this.topNodeName && e.extend(i, {
                    topNode: this.topNodeName
                }), e.extend(i, r), this.stream.push(i), this
            },
            setZOrder: function(t, n) {
                n = n || {};
                var r = {
                    exec: "setZOrder",
                    layer: this.layer,
                    node: this.name,
                    z: t
                };
                return this.topNodeName && e.extend(r, {
                    topNode: this.topNodeName
                }), e.extend(r, n), this.stream.push(r), this
            },
            loadBundle: function(e) {
                return this.stream.push({
                    exec: "loadBundle",
                    bundle: e
                }), this
            },
            deleteNode: function() {
                return this.isDuplicated ? (this.stream.push({
                    exec: "deleteNode",
                    layer: this.layer,
                    node: this.name
                }), this.removeAllCallback(), this) : this
            },
            getAllChildArray: function() {
                var t = function(n, r) {
                    if (r.length === 0) return n;
                    var i = [];
                    return e.each(r, function(t) {
                        i = e.values(t.children).concat(i), n.push(t)
                    }), t(n, i)
                };
                return t([], e.values(this.children))
            },
            process: function() {
                return this.stream.length > 0 && (kickmotor.animation.processAnimation(this.stream), FF.Debug.processCount++, this.stream = []), this
            },
            processDeferred: function(e, n) {
                var r = $.Deferred(),
                    i = t.registerDeferred(r),
                    s = this._getProcessDeferredCallback(r, i);
                return this.addCallbackOnce(e, s, n), this._prepareBackKeyHandler(s), this.process(), r.promise()
            },
            _getProcessDeferredCallback: function(e, n) {
                var r = this;
                return function() {
                    FF.env.isUsingWWBackKeyHandler() && event == "action_touch_ended" && (kickmotor.nativefn.onBackKeyHandler.off("System::onBackKey", null, r), kickmotor.nativefn.onBackKeyHandler.hasModal = !1), t.resolve(n), e.resolve()
                }
            },
            _prepareBackKeyHandler: function(e) {
                FF.env.isUsingWWBackKeyHandler() && event == "action_touch_ended" && (kickmotor.nativefn.onBackKeyHandler.hasModal = !0, kickmotor.nativefn.onBackKeyHandler.on("System::onBackKey", e, that))
            },
            createVirtualNode: function(t, n) {
                var i = {
                    name: t,
                    layer: this.layer,
                    topNodeName: this.name,
                    isVirtual: !0
                };
                return e.extend(i, n), new r(i)
            },
            createChildNode: function(t, n) {
                var i = {
                    name: t,
                    layer: this.layer,
                    topNodeName: this.name
                };
                return this.topNodeName && e.extend(i, {
                    topNodeName: this.topNodeName
                }), e.extend(i, n), new r(i)
            },
            setStream: function(t) {
                var n = {
                    node: this.name,
                    layer: this.layer
                };
                return this.topNodeName && e.extend(n, {
                    topNode: this.topNodeName
                }), e.extend(n, t), this.stream.push(n), this
            }
        }, r
    }), define("lib/ab/ABLayer", ["underscore", "./kickmotor/LayerFactory", "./ABNode"], function(e, t, n) {
        var r = function(e) {
            if (!e || !e.layerName) throw new Error("ABLayer constructor requires layerName parameter");
            this.layerName = e.layerName, this.stream = []
        };
        return r.prototype = {
            createNode: function(t, r) {
                var i = {
                    name: t,
                    layer: this.layerName
                };
                return e.extend(i, r), new n(i)
            },
            activate: function() {
                var e = this;
                this.changeCurrentLayer(), kickmotor.animation.processAnimation(this.stream), this.stream = [], kickmotor.nativefn.isNative() && $.nativefn.call("dumpABInfo", {})
            },
            changeCurrentLayer: function() {
                return t.getInstance().changeCurrentLayer(this.layerName), this
            },
            createLayer: function(e, n, r, i) {
                return r = r || {}, i = i || {}, t.getInstance().create(this.layerName, e, n, r, i), this
            },
            destroyLayer: function(e) {
                return e = e || {}, t.getInstance().destroy(this.layerName, e), this
            },
            setIsAllocMaxParticle: function() {
                return this.stream.push({
                    exec: "setIsAllocMaxParticle",
                    isAllocMax: !0
                }), this
            },
            setUpdateTimeSpeed: function(e) {
                return this.stream.push({
                    exec: "setUpdateTimeSpeed",
                    speed: e
                }), this
            },
            suspendAnime: function() {
                kickmotor.animation.processAnimation([{
                    exec: "suspendAnime"
                }])
            },
            resumeAnime: function() {
                kickmotor.animation.processAnimation([{
                    exec: "resumeAnime"
                }])
            },
            setZOrder: function(e) {
                var t = {
                    exec: "setZOrder",
                    layer: this.layerName,
                    node: "AnimationBuilderRoot",
                    z: e
                };
                return this.stream.push(t), this
            },
            setVisible: function(e) {
                var t = {
                    exec: "setVisible",
                    layer: this.layerName,
                    node: "AnimationBuilderRoot",
                    visible: !!e
                };
                return this.stream.push(t), this
            },
            process: function() {
                return this.stream.length > 0 && (kickmotor.animation.processAnimation(this.stream), this.stream = []), this
            }
        }, r
    }), define("lib/EventBase", ["underscore", "backbone"], function(e, t) {
        var n = function() {
            this.initialize.apply(this, arguments)
        };
        return e.extend(n.prototype, {
            initialize: function() {
                this._attributes = {}
            },
            dispose: function() {},
            get: function(e) {
                return this._attributes[e]
            },
            set: function(e, t) {
                this._attributes[e] = t
            },
            has: function(t) {
                return e.has(this._attributes, t)
            }
        }), e.extend(n.prototype, t.Events), n.extend = t.View.extend, n
    }), define("lib/ab/ABNodeButton", ["underscore", "jquery", "backbone", "util", "lib/EventBase", "lib/ab/ABNode"], function(e, t, n, r, i, s) {
        var o = "command_tap_start",
            u = "command_tap_cancel",
            a = "command_tap_end",
            f = {},
            l = {},
            c = {},
            h = /^.+_(\d{2})$/,
            p = /^.+_nul$/,
            d = i.extend({
                userOption: void 0,
                initialize: function(e, t, n, r) {
                    this._tid = void 0, this._isBeingPressed = !1, this._isTouchEntered = !1, this._playingTapEndAnimation = !1, this._ignoreTouchEnter = !1, this._ignoreTouchDuringTouchEndAnimation = !1, this._ignoreFrequentlyTouchMilliSec = 0, this._lastTouchStartTime = 0, this.baseNode = e, this.topNodeName = t, this.groupName = n, c[this.groupName] === void 0 && (c[this.groupName] = []), c[this.groupName].push(this), this.baseName = "", this.touchNodeName = "", r ? this.touchNodeName = r : this._setNodeNames(this.baseNode), this.touchNode = this.baseNode.createChildNode(this.touchNodeName), this.longPressMilliSec = 2e3, this.checkEnabledFunc = void 0, this._initTouchHandler(), this.baseNode.process(), this.setEnabled(!0)
                },
                _setNodeNames: function(e) {
                    var t = e.name;
                    this.suffix = "", this.baseName = t, h.test(t) && (this.suffix = t.slice(-3), this.baseName = this.baseName.slice(0, t.length - 3)), p.test(t) && (this.baseName = this.baseName.slice(0, t.length - 4)), this.touchNodeName = this.baseName + "_visible_touch" + this.suffix
                },
                tagTapEnd: a,
                tagTapStart: o,
                tagTapCnacel: u,
                setButtonStateTags: function(e, t, n) {
                    return this.tagTapStart = e, this.tagTapEnd = t, this.tagTapCancel = n, this
                },
                setTouchHandler: function(e) {
                    return this.touchHandler = e, this
                },
                setTouchHandlerAfterAnimation: function(e) {
                    return this.touchHandlerAfterAnimation = e, this
                },
                setTouchEnterHandler: function(e) {
                    return this.touchEnterHandler = e, this
                },
                setTouchStartHandler: function(e) {
                    return this.touchStartHandler = e, this
                },
                setTouchCancelHandler: function(e) {
                    return this.touchCancelHandler = e, this
                },
                setBasicTouchHandlers: function(e, t, n, r) {
                    return this.setTouchHandler(e), this.setTouchEnterHandler(t), this.setTouchStartHandler(n), this.setTouchCancelHandler(r), this
                },
                setLongPressHandler: function(t, n) {
                    return this.longPressHandler = t, e.isNumber(n) && (this.longPressMilliSec = n), this
                },
                setVisible: function(e, t) {
                    return this._isVisible = e, this.baseNode.setVisible(e), t = t === void 0 ? !0 : t, t && this.baseNode.process(), this
                },
                ignoreTouchEnter: function() {
                    return this._ignoreTouchEnter = !0, this
                },
                ignoreTouchDuringTouchEndAnimation: function() {
                    return this._ignoreTouchDuringTouchEndAnimation = !0, this
                },
                ignoreFrequentlyTouch: function(e) {
                    return this._ignoreFrequentlyTouchMilliSec = e, this
                },
                isVisible: function() {
                    return this._isVisible
                },
                _isGroupLocked: function() {
                    return !!l[this.groupName]
                },
                _isInnerLocked: function() {
                    var e;
                    return this.groupName === void 0 ? e = !1 : f[this.groupName] === this ? e = !1 : e = !!f[this.groupName], e && FF.logger.debug("ABButton(", this.groupName, ") locked!"), e
                },
                _isFrequentlyTouch: function() {
                    if (this._ignoreFrequentlyTouchMilliSec <= 0) return !1;
                    var e = r.getTime();
                    return e - this._lastTouchStartTime < this._ignoreFrequentlyTouchMilliSec ? !0 : (this._lastTouchStartTime = e, !1)
                },
                _resetOthersInGroup: function() {
                    var t = this,
                        n = d.getButtonsByGroupName(this.groupName);
                    e.each(n, function(e) {
                        e !== t && e._isBeingPressed && e.reset()
                    })
                },
                _lock: function() {
                    if (this.groupName === void 0) return;
                    f[this.groupName] = this
                },
                _unlock: function() {
                    if (this.groupName === void 0) return;
                    delete f[this.groupName]
                },
                _clearTimer: function() {
                    this._tid !== void 0 && (clearTimeout(this._tid), this._tid = void 0)
                },
                _resetTimer: function() {
                    var e = this;
                    this._clearTimer(), this._tid = setTimeout(function() {
                        e._tid = void 0, e.longPressHandler && e.longPressHandler(e)
                    }, this.longPressMilliSec)
                },
                _initTouchHandler: function() {
                    var e = this,
                        t = this.touchNode;
                    t.addCallback("action_touch_ended", function(t) {
                        if (!e.enabled) return;
                        if (!e._checkEnabledByUserFunc(t)) return;
                        if (!e._isBeingPressed) return;
                        if (e._isGroupLocked()) return;
                        if (e._isInnerLocked()) return;
                        if (e._ignoreTouchDuringTouchEndAnimation && e._playingTapEndAnimation) return;
                        e._clearTimer(), e._unlock();
                        var n = e._ignoreTouchEnter && e._isTouchEntered;
                        n || (e.tagTapEnd && (e._playingTapEndAnimation = !0, e.baseNode.play(e.tagTapEnd).processDeferred("action_stop", {
                            tag: e.tagTapEnd
                        }).then(function() {
                            e._playingTapEndAnimation = !1, e.touchHandlerAfterAnimation && e.touchHandlerAfterAnimation(e, t)
                        })), e.touchHandler && e.touchHandler(e, t)), e._isTouchEntered = !1, e._isBeingPressed = !1
                    }), t.addCallback("action_touch_began", function(t) {
                        FF && FF.eventNotifier && FF.eventNotifier.trigger("abnodebutton:onTouchBegan", t, e);
                        if (!e.enabled) return;
                        if (!e._checkEnabledByUserFunc(t)) return;
                        if (e._isBeingPressed) return;
                        if (e._isGroupLocked()) return;
                        e._isInnerLocked() && e._resetOthersInGroup();
                        if (e._isFrequentlyTouch()) return;
                        e._resetTimer(), e._lock(), e.tagTapStart && e.baseNode.play(e.tagTapStart).process(), e.touchStartHandler && e.touchStartHandler(e, t), e._isTouchEntered = !1, e._isBeingPressed = !0
                    }), t.addCallback("action_touch_enterd", function(t) {
                        if (!e.enabled) return;
                        if (!e._checkEnabledByUserFunc(t)) return;
                        if (e._isBeingPressed) return;
                        if (e._isGroupLocked()) return;
                        e._isInnerLocked() && e._resetOthersInGroup(), e._resetTimer(), e._lock(), e._ignoreTouchEnter || (e.tagTapStart && e.baseNode.play(e.tagTapStart).process(), e.touchEnterHandler && e.touchEnterHandler(e, t)), e._isTouchEntered = !0, e._isBeingPressed = !0
                    }), t.addCallback("action_touch_exited", function(t) {
                        if (!e.enabled) return;
                        if (!e._checkEnabledByUserFunc(t)) return;
                        if (!e._isBeingPressed) return;
                        if (e._isGroupLocked()) return;
                        if (e._isInnerLocked()) return;
                        e._clearTimer(), e._unlock(), e.tagTapCancel && e.baseNode.play(e.tagTapCancel).process(), e.touchCancelHandler && e.touchCancelHandler(e, t), e._isTouchEntered = !1, e._isBeingPressed = !1
                    })
                },
                setLabel: function(e) {
                    return this.setLabelWithDetail(e), this
                },
                setLabelWithDetail: function(t, n, r, i) {
                    r = r || this.baseName + "_txt" + this.suffix, n = n === void 0 ? !0 : n;
                    var s = {};
                    return this.topNodeName && (s.topNode = this.topNodeName), e.extend(s, i), this.baseNode.setText(this.baseNode.name + " " + r, t, s), n && this.baseNode.process(), this
                },
                insertImage: function(e) {
                    return this.insertImageWithDetail(e), this
                },
                insertImageWithDetail: function(t, n, r, i) {
                    r = r || this.baseName + "_img" + this.suffix, n = n === void 0 ? !0 : n;
                    var s = {};
                    return this.topNodeName && (s.topNode = this.topNodeName), e.extend(s, i), this.baseNode.loadBundle(t.bundle).setImage(r, t.assetPath, s), n && this.baseNode.process(), this
                },
                setEnabled: function(e) {
                    return this.enabled === e ? this : (this.enabled = e, this._updateView(), this._clearTimer(), this)
                },
                isEnabled: function() {
                    return this.enabled
                },
                setCheckEnabledFunction: function(e) {
                    return this.checkEnabledFunc = e, this
                },
                _checkEnabledByUserFunc: function(e) {
                    return this.checkEnabledFunc ? this.checkEnabledFunc(this, e) : !0
                },
                _updateView: function() {
                    this.touchNode && (this.touchNode.setVisible(this.enabled), this.touchNode.process())
                },
                reset: function(e) {
                    (e === void 0 || e) && this._unlock(), this._clearTimer(), this._isBeingPressed && this.tagTapCancel && this.baseNode.play(this.tagTapCancel).process(), this._isBeingPressed = !1, this._playingTapEndAnimation = !1, this._lastTouchStartTime = 0
                },
                dispose: function(e) {
                    this.reset(e), this.touchNode && this.touchNode.removeAllCallback(), this.baseNode = void 0, this.touchNodeName = void 0, this.touchNode = void 0, this.touchHandler = void 0, this.longPressHandler = void 0, this.touchEnterHandler = void 0, this.touchStartHandler = void 0, this.touchCancelHandler = void 0, this.checkEnabledFunc = void 0, this.userOption = void 0;
                    var t = c[this.groupName],
                        n = t.indexOf(this);
                    n >= 0 && t.splice(n, 1)
                },
                debugInfo: function() {
                    return ["__ ABNodeButton INFO ____", "groupName:" + (this.groupName ? this.groupName : "N/A"), "baseNode:" + (this.baseNode ? this.baseNode.name : "NO BASE NODE"), "topNodeName:" + (this.topNodeName ? this.topNodeName : "NO_TOP_NODE"), "touchNode:" + (this.touchNode ? this.touchNode.name : "NO TOUCH NODE"), "touchHandler:" + (this.touchHandler === void 0 ? "N/A" : "exist"), "longPressHandler:" + (this.longPressHandler === void 0 ? "N/A" : "exist"), "tagTapStart:" + (this.tagTapStart ? this.tagTapStart : "N/A"), "tagTapEnd:" + (this.tagTapEnd ? this.tagTapEnd : "N/A"), "tagTapCancel:" + (this.tagTapCancel ? this.tagTapCancel : "N/A"), "isBeingPressed:" + this._isBeingPressed].join("\n")
                }
            }, {
                getButtonsByGroupName: function(e) {
                    if (!e) return void 0;
                    var t = c[e];
                    return !t || t.length === 0 ? void 0 : t.slice()
                },
                isGroupLocked: function(e) {
                    return !!f[e] || !!l[e]
                },
                lockByGroupName: function(e) {
                    l[e] = !0
                },
                unlockByGroupName: function(e) {
                    delete f[e], delete l[e]
                },
                unlockAll: function() {
                    f = {}, l = {}
                }
            });
        return d
    }), define("lib/ab/BattleAssetsManager", ["underscore", "jquery", "backbone", "util", "./kickmotor/LayerFactory"], function(e, t, n, r, i) {
        var s = 2,
            o = n.Model.extend({
                defaults: function() {
                    return {
                        registry: {}
                    }
                },
                initialize: function() {
                    kickmotor.animation.setKeepJsonCache(!0), this.layerNames = [], this.commonLayerNames = []
                },
                populateAssetsDeferred: function(n, r) {
                    var i = this;
                    r = r || {}, FF.logger.debug("BattleAssetsManager: populateAssetsDeferred", n);
                    var s = t.Deferred(),
                        o = {},
                        u = {},
                        a = r.restriction;
                    e.each(n, function(t, n) {
                        u[n] = {
                            assetPath: t.assetPath,
                            layerName: "layer_" + n,
                            bundle: t.bundle
                        }, e.extend(o, t.bundle)
                    });
                    var f = this.get("registry");
                    e.extend(f, u), this.set("registry", f);
                    var l = 0,
                        c = this._getCommonLayerAssets(f, r);
                    return this._hasDownloadCommonAssetsDeferred(c).then(function(e) {
                        e.needDownload && (FF.logger.debug("clearAllParsedJsonCache"), kickmotor.animation.clearUnusedJsonCache()), i._populateAssetsDeferred(o, f, s, l, r)
                    }), s.promise()
                },
                _hasDownloadCommonAssetsDeferred: function(n) {
                    var r = {},
                        i = t.Deferred();
                    return e.each(n, function(t, n) {
                        e.extend(r, t.bundle)
                    }), kickmotor.animation.isDownloadAssets(r, function(e, t) {
                        e ? i.resolve({
                            needDownload: !1
                        }) : i.resolve({
                            needDownload: !0
                        })
                    }), i.promise()
                },
                _getCommonLayerAssets: function(t, n) {
                    var r = {};
                    return e.each(t, function(e, t) {
                        if (!/^\/Content\/lang\/(|ww\/(|compile\/)(en|es|fr)\/)ab\/.*\.json$/.test(e.assetPath)) return;
                        if (/^ability/.test(t)) return;
                        if (n.restriction && !n.restriction[t]) return;
                        r[t] = e
                    }), r
                },
                _populateAssetsDeferred: function(t, n, r, o, u) {
                    var a = this;
                    e.isNumber(o) || (o = 0);
                    var f = u && u.isPreloadEffect ? !0 : !1;
                    if (!this._canProceedToPopulate()) return;
                    kickmotor.animation.precacheAssets(t, function(l, c) {
                        if (!a._canProceedToPopulate()) return;
                        if (l) {
                            o < s ? (++o, a._populateAssetsDeferred(t, n, r, o, u)) : r.reject();
                            return
                        }
                        var h = [];
                        h.push({
                            exec: "setIsAllocMaxParticle",
                            isAllocMax: !0
                        }), h.push({
                            exec: "setIsEnableFiltering",
                            isFiltering: !0
                        }), kickmotor.animation.processAnimation(h);
                        var p = a._getCommonLayerAssets(n, u);
                        e.each(n, function(t, n) {
                            if (!/^\/Content\/lang\/(|ww\/(|compile\/)(en|es|fr)\/)ab\/.*\.json$/.test(t.assetPath)) return !1;
                            if (/^ability/.test(n)) return !1;
                            if (e.contains(a.layerNames, t.layerName)) return !1;
                            i.getInstance().create(t.layerName, t.assetPath, t.bundle, {
                                autoDestroy: !0,
                                isVisible: u.isVisible !== void 0 ? u.isVisible : !0
                            }, {
                                ignoreSameNameLayer: !0
                            }), a.layerNames.push(t.layerName), p[n] && a.commonLayerNames.push(t.layerName)
                        }), FF.logger.debug(a.layerNames), f && a.preloadEffect(t), r.resolve()
                    })
                },
                getAssetInfo: function(e, t) {
                    t = r.option({
                        error: !0
                    }, t);
                    var n = this.get("registry"),
                        i = n[e];
                    if (!i && t.error) throw new Error("asset not found.id=" + e);
                    return i
                },
                destroyAllLayer: function() {
                    var t = [];
                    e(this.layerNames).each(function(e) {
                        i.getInstance().destroy(e)
                    }), this.layerNames = void 0
                },
                destroyLayersWithoutTargetLayers: function(t) {
                    var n = this;
                    e.each(this.layerNames, function(r) {
                        if (!e.contains(t, r)) {
                            var s = e.contains(n.commonLayerNames, r);
                            i.getInstance().destroy(r, {
                                clearParsedJsonCache: !s,
                                forced: !s
                            })
                        }
                    })
                },
                preloadEffect: function(t) {
                    if (!FF.env.canUseDealSound()) return;
                    var n = [];
                    e.each(t, function(e, t) {
                        var r = t.match(/\/se_ogg\/(se_ability_\w+)\.ogg$/);
                        r && r[1] && n.push(r[1])
                    }), n.length > 0 && (FF.logger.debug("preloadEffect", n), kickmotor.sound.preloadEffects(n))
                },
                _canProceedToPopulate: function() {
                    return !this._disposed && this.layerNames !== void 0
                },
                dispose: function() {
                    this._disposed = !0
                }
            });
        return o
    }), define("lib/ReleaseControl", ["util"], function(e) {
        return {
            isReleasedByKey: function(t) {
                var n = FF.datastore.stash.releaseKeyToReleasedAt,
                    r = this._getReleasedAtByReleaseKey(t);
                return r < e.getTimeAsSec() ? !0 : !1
            },
            isOpen: function(t, n) {
                var r = e.getTimeAsSec(),
                    i = this._getReleasedAtByReleaseKey(t),
                    s = this._getReleasedAtByReleaseKey(n);
                return r >= i && r < s
            },
            isReleasedById: function(t) {
                var n = FF.datastore.stash.releaseIdToReleasedAt;
                return n[t] && +n[t] < e.getTimeAsSec() ? !0 : !1
            },
            _getReleasedAtByReleaseKey: function(e) {
                var t = FF.datastore.stash.releaseKeyToReleasedAt;
                if (!t[e]) throw new Error("undefined release key. KEY:" + e);
                return +t[e]
            },
            isReleasedDressRecord: function() {
                return this.isReleasedByKey("DRESS_RECORD")
            },
            isReleasedExtremeDungeons: function() {
                return this.isReleasedByKey("EXTREME_DUNGEONS")
            },
            isReleasedRecordMateriaSort: function() {
                return this.isReleasedByKey("RECORD_MATERIA_SORT")
            }
        }
    }), define("scenes/common/view_helper/ViewHelper", ["underscore", "jquery"], function(e, t) {
        var n = {
            getStatusBonusFontColorClass: function(e, t, n) {
                if (!n) return "";
                if (n.hasOwnProperty("aurable")) {
                    var r = n.aurable;
                    if (!r) return ""
                }
                var i = e.isRisenBySeriesBonus(t, n),
                    s = e.isRisenByRoleBonus(t, n),
                    o = s ? "fc-role-bonus" : i ? "fc-up" : "";
                return o = this._insertEmpty(o, n), o
            },
            getStatusBonusCellClass: function(t, n) {
                if (e.isEmpty(t)) return "";
                if (n.hasOwnProperty("aurable")) {
                    var r = n.aurable;
                    if (!r) return ""
                }
                var i = n.seriesId,
                    s = t.hasSeriesBonus(i),
                    o = n.hasRoleBonus,
                    u;
                if (s) switch (n.size) {
                    case "s":
                        u = "is-same-series-s";
                        break;
                    case "m":
                    default:
                        u = "is-same-series-m";
                        break;
                    case "l":
                        u = "is-same-series-l"
                } else if (o) switch (n.size) {
                    case "s":
                        u = "is-role-bonus-s";
                        break;
                    case "m":
                    default:
                        u = "is-role-bonus-m";
                        break;
                    case "l":
                        u = "is-role-bonus-l"
                } else u = "";
                return u = this._insertEmpty(u, n), u
            },
            _insertEmpty: function(e, t) {
                return !t.omitSpace && e.length > 0 && e.indexOf(" ") !== 0 && (e = " " + e), e
            },
            isSeriesIconDefined: function(e) {
                var t = FF.CONST.SERVER.SERIES;
                return e === +t.EMPTY_SERIES_ID ? !1 : e === +t.NAME_TO_ID.EXTREME ? !1 : !0
            }
        };
        return n
    }), define("lib/ClassBase", ["underscore", "backbone"], function(e, t) {
        var n = function() {
            this.initialize.apply(this, arguments)
        };
        return e.extend(n.prototype, {
            initialize: function() {
                this._attributes = {}
            },
            dispose: function() {},
            get: function(e) {
                return this._attributes[e]
            },
            set: function(e, t) {
                this._attributes[e] = t
            },
            has: function(t) {
                return e.has(this._attributes, t)
            }
        }), n.extend = t.View.extend, n
    }), define("lib/TextMaster", ["jquery", "underscore", "sprintf", "lib/ClassBase"], function(e, t, n, r) {
        var i = {
                MOBACOIN_UNIT_ID: "mobacoin",
                GEM_UNIT_ID: "gem"
            },
            s = r.extend({
                initialize: function() {
                    this._properties = {}, this._source = e("script#text-master").text(), this.append(this._parseText(this._source))
                },
                append: function(e) {
                    t.extend(this._properties, e)
                },
                get: function(e) {
                    var t = this.safeGet(e);
                    if (t) return t;
                    if (!this._source) return "text: " + e;
                    throw new Error("not found such text id: " + e)
                },
                safeGet: function(e) {
                    var n = this._properties[e];
                    return t.isString(n) ? (n = n.replace("{NICKNAME}", FF.env.nickname), n) : void 0
                },
                getf: function(e, r) {
                    var i = this.get(e),
                        s = [i].concat(t.rest(arguments));
                    return n.apply(this, s)
                },
                safeGetf: function(e, r) {
                    var i = this.safeGet(e);
                    if (!i) return void 0;
                    var s = [i].concat(t.rest(arguments));
                    return n.apply(this, s)
                },
                _parseText: function(n) {
                    var r = {},
                        i = n ? e.parseJSON(n) : {};
                    return t.extend(r, i), r
                },
                getMobacoinUnit: function() {
                    return FF.env.isWWRegion() ? this.get(i.GEM_UNIT_ID) : FF.env.isMobacoinClient() ? this.get(i.MOBACOIN_UNIT_ID) : this.get(i.GEM_UNIT_ID)
                }
            }),
            o = void 0;
        return {
            getInstance: function() {
                return o || (o = new s), o
            }
        }
    }), define("lib/TemplateRenderer", ["underscore", "jquery", "util", "lib/ReleaseControl", "scenes/common/view_helper/ViewHelper", "lib/TextMaster"], function(e, t, n, r, i, s) {
        return {
            process: function(e, t) {
                return t = t ? t : {}, t.util = n, t.releaseControl = r, t.helper = i, t.textMaster = s, FF.partialTemplate && (t.include = function(e, t) {
                    return FF.partialTemplate.render(e, t)
                }), e(t)
            }
        }
    }),
    function(e) {
        define("components/ComponentBase", ["backbone", "jq.fastCss"], function(t, n) {
            var r = navigator.userAgent,
                i = /iP(hone|ad|od)/.test(r),
                s = /Android/.test(r),
                o = "ontouchend" in e,
                u = {
                    st: o ? "touchstart" : "mousedown",
                    mv: o ? "touchmove" : "mousemove",
                    ed: o ? "touchend" : "mouseup",
                    cc: o ? "touchcancel" : undefined
                };
            return t.View.extend({
                _viewName: "",
                _options: undefined,
                _checkOptions: function() {
                    this._options = $.extend({}, this._defaults, this.options)
                },
                _getPadTxt: function(e, t) {
                    if (typeof e != "number" || typeof t != "number" || t <= ("" + e).length) return "" + e;
                    var n = "",
                        r = t;
                    for (; r--;) n += "0";
                    return (n + e).slice(-1 * t)
                },
                _getTwoDecimals: function(e) {
                    return Math.ceil(e * 100) / 100
                },
                _getHypotenuse: function(e, t) {
                    return Math.sqrt(e * e + t * t)
                },
                _getAverage: function() {
                    var e = arguments.length,
                        t = 0,
                        n = 0,
                        r = 0;
                    for (; t < e; t++) typeof arguments[t] == "number" && (r += arguments[t], n++);
                    return r / n
                },
                addTouchBehavior: function() {
                    var e = this;
                    this.__initializeVariables(), this.__boundTouchEvents = !0, this.$el.on(u.st, function(t) {
                        e.__st(t)
                    }).on(u.mv, function(t) {
                        e.__mv(t)
                    }).on(u.ed, function(t) {
                        e.__ed(t)
                    }), u.cc && this.$el.on(u.cc, function(t) {
                        e.__ed(t)
                    })
                },
                __initializeVariables: function() {
                    this.__isMoved = !1, this.__isStarted = !1, this.__startX = undefined, this.__startY = undefined, this.__diffX = undefined, this.__diffY = undefined, this.__validDistance = 5, this.__boundTouchEvents = !1
                },
                __st: function(e) {
                    var t = this._getAxis(e);
                    this.__isMoved = !1, this.__isStarted = !0, this.__startX = t.x, this.__startY = t.y, this.trigger("touchstarted", {
                        x: this.__startX,
                        y: this.__startY,
                        e: e
                    }), this.$el.on("click", function(e) {
                        e.preventDefault(), e.stopPropagation()
                    })
                },
                __mv: function(e) {
                    if (this.__isStarted) {
                        var t = this._getAxis(e),
                            n = t.x,
                            r = t.y;
                        this.__isMoved = !0, this.__diffX = n - this.__startX, this.__diffY = r - this.__startY, this.trigger("touchmoved", {
                            x: n,
                            y: r,
                            diffX: this.__diffX,
                            diffY: this.__diffY,
                            e: e
                        }), s && e.preventDefault()
                    }
                },
                __ed: function(e) {
                    if (this.__isMoved && (this.__validDistance < Math.abs(this.__diffX) || this.__validDistance < Math.abs(this.__diffY))) {
                        var t = this._getDirection(this.__diffX, this.__diffY);
                        this.trigger("swipeend", {
                            direction: t
                        })
                    }
                    this.trigger("touchended"), this.$el.off("click"), this.__isMoved || this.trigger("tap", e), this.__isMoved = !1, this.__isStarted = !1
                },
                _getAxis: function(e) {
                    return {
                        x: e.clientX || e.originalEvent.touches[0].clientX || undefined,
                        y: e.clientY || e.originalEvent.touches[0].clientY || undefined
                    }
                },
                _getDirection: function(e, t) {
                    var n = Math.atan2(t, e) * 180 / Math.PI;
                    return -45 < n && n <= 45 ? "right" : 45 < n && n <= 135 ? "down" : 135 < n || n <= -135 ? "left" : "up"
                },
                _parseJSON: function(e) {
                    if (!e) return {};
                    if (typeof e == "object") return e;
                    var t;
                    try {
                        return t = JSON.parse(e), t
                    } catch (n) {}
                    try {
                        t = (new Function("return" + e))()
                    } catch (r) {
                        throw new Error("Cannot parse text to json")
                    }
                    return t
                },
                __previousTouch: 0,
                throttle: function(e, t) {
                    if (!this.__previousTouch) this.__previousTouch = this.now(), e();
                    else {
                        var n = this.now();
                        t < n - this.__previousTouch && (e(), this.__previousTouch = n)
                    }
                },
                now: function() {
                    var e = Date.now() || function() {
                        return +(new Date)
                    };
                    return e
                },
                forceRepaintView: function(e) {
                    if (!e && !mbga.Env.android) return;
                    var t = this;
                    this.$el.fastCss("opacity", .99), window.setTimeout(function() {
                        t.$el.fastCss("opacity", 1)
                    }, 0)
                },
                dispose: function() {
                    this.disposeFunctionality(), this.disposeElement()
                },
                disposeElement: function() {
                    this.$el.empty()
                },
                disposeFunctionality: function() {
                    var e = this._options;
                    _.forEach(e, function(t, n) {
                        t instanceof $ && (e[n] = null, delete e[n])
                    }), this.__boundTouchEvents && (this.$el.off([u.st, u.mv, u.ed, u.cc].join(" ")), this.__boundTouchEvents = !1), this.el && (this.el = null), this.stopListening(), this.undelegateEvents()
                },
                getViewName: function() {
                    return this._viewName
                },
                getViewElement: function() {
                    return this.$el
                }
            })
        })
    }(this.self || global), define("components/ImageWatcher", ["underscore", "jquery", "components/ComponentBase"], function(e, t, n) {
        return n.extend({
            _viewName: "ImageWatcher",
            _defaults: {
                list: null,
                spriteClassName: null,
                isCrawlImgTag: !1,
                checkInterval: 200,
                throughTimes: 1,
                maximumRetryTimes: 50
            },
            initialize: function() {
                n.prototype.initialize.apply(this, arguments), this._hasCaught = !1, this._timer = null, this._counter = this._length = 0, this._images = [], this._srcs = [], this._id = +(new Date), this._checkOptions(), this._collect(), this._startCrawling()
            },
            _collect: function() {
                var n = this,
                    r = [],
                    i = [],
                    s, o, u, a;
                if (this._options.list) {
                    s = this._options.list, o = s.length;
                    for (; o--;) u = new Image, a = s[o], u.src = a, a && this._srcs.indexOf(a) < 0 && (this._srcs.push(a), this._images.push(u))
                }
                if (this._options.isCrawlImgTag) {
                    s = document.getElementsByTagName("img"), o = s.length;
                    for (; o--;) u = s[o], a = u.getAttribute("src"), a && this._srcs.indexOf(a) < 0 && (this._srcs.push(a), this._images.push(u))
                }
                if (this._options.spriteClassName) {
                    var f = t(this._options.spriteClassName.join(" ")),
                        l;
                    o = f.length;
                    for (; o--;) l = f.eq(o).css("background-image"), l && this._srcs.indexOf(l) < 0 && (u = new Image, u.src = l, this._srcs.push(l), this._images.push(l))
                }
                var c = t('[class^="is-bg-"]');
                c.length && e.each(c, function(e) {
                    i.push(t(e).css("background-image"))
                }), i.push(this.$el.css("background-image")), i.length && e.each(i, function(e) {
                    -1 < e.indexOf("),") ? r = e.split(", ") : r[0] = e, o = r.length;
                    for (; o--;) {
                        if (r[o] === "none" || r[o] === "") continue;
                        u = new Image, a = r[o].match(/url\((.*)\)/)[1], u.src = a, n._srcs.push(a), n._images.push(u)
                    }
                }), this._length = this._images.length
            },
            _startCrawling: function() {
                this._timer = window.setInterval(t.proxy(this._crawl, this), this._options.checkInterval), setTimeout(t.proxy(this._crawl, this), 0)
            },
            _stopCrawling: function(e) {
                window.clearInterval(this._timer), this.trigger(e ? "allImagesAreCompleted" : "someImagesAreCompleted"), this._timer = null
            },
            _crawl: function() {
                var e = this._length;
                !this._hasCaught && this._options.throughTimes < this._counter + 1 && (this._hasCaught = !0, this.trigger("takingTime"));
                if (this._counter < this._options.maximumRetryTimes)
                    if (e) {
                        var t = !1;
                        for (; e--;) {
                            var n = this._images[e];
                            if (!n) throw new Error("Missing image");
                            t = n.complete, t && (this._images.splice(e, 1), this._length--)
                        }
                        this._length === 0 && this._stopCrawling(!0)
                    } else this._stopCrawling(!0);
                else this._stopCrawling(e ? !1 : !0);
                this._counter++
            },
            dispose: function() {
                this._timer && window.clearInterval(this._timer), this.disposeFunctionality()
            }
        })
    }), define("lib/ModalBase", ["backbone", "underscore", "util", "lib/TemplateRenderer", "components/ImageWatcher"], function(e, t, n, r, i) {
        var s = FF.env.isIOS(),
            o = FF.env.isAndroid();
        return e.View.extend({
            events: {
                "anchorsbeforejump [data-app-modal-close]": "onEnd"
            },
            initialize: function() {
                this._is_opened = !1, this._is_empty = !0, this._template = $("#modal-template")
            },
            putContent: function(e) {
                this._is_empty || this.empty(), this.$el.html(e), this._is_empty = !1
            },
            renderContent: function(e, t) {
                t = t || {}, t.isWWRegion = FF.env.isWWRegion();
                var n = r.process(e, t);
                this.putContent(n)
            },
            empty: function() {
                if (this._is_opened) return;
                this.$el.empty(), this._is_empty = !0
            },
            open: function(e) {
                if (this._is_empty) return;
                this.$el.addClass("open").one("webkitTransitionEnd webkitAnimationEnd", function() {
                    this._triggerEvents("openAnimationEnd"), $(document).trigger("hideLoading", e)
                }.bind(this)), window.setTimeout(function() {
                    this.trigger("openAnimationEnd"), $(document).trigger("hideLoading", e)
                }.bind(this), 100), this._is_opened = !0, $("#content").addClass("pe-n").find("input, select").addClass("di-n"), this.updateCssIfScrollIsNative("hidden"), this._triggerEvents("openNotify")
            },
            openAfterImageLoad: function(e) {
                FF.router.loading.lock(), e = n.option({
                    el: this.$el,
                    isCrawlImgTag: !1
                }, e);
                var t = new i(e);
                this.listenTo(t, "takingTime", function() {
                    FF.router.loading.show()
                }).listenTo(t, "allImagesAreCompleted someImagesAreCompleted", this.processAfterContentLoad), this.imagewatcher = t
            },
            processAfterContentLoad: function() {
                this.stopListening(this.imagewatcher, "takingTime"), this.imagewatcher.dispose(), this.imagewatcher = null, FF.router.loading.hide(!0), this.open()
            },
            close: function(e) {
                this.$el.removeClass("open").one("webkitTransitionEnd", function() {
                    this._triggerEvents("closeAnimationEnd"), $(document).trigger("unlockLoading")
                }.bind(this)), window.setTimeout(function() {
                    this.trigger("closeAnimationEnd"), $(document).trigger("unlockLoading")
                }.bind(this), 100), $("#content").removeClass("pe-n").find("input, select").removeClass("di-n"), this.updateCssIfScrollIsNative("scroll"), this._is_opened = !1, e || this._triggerEvents("closeNotify")
            },
            end: function(e) {
                this.close(e), this.dispose()
            },
            onEnd: function() {
                this.end()
            },
            disableUserTouch: function() {
                $("[data-app-modal] [data-mbgaui-anchors]").addClass("mbgaui-disabled")
            },
            enableUserTouch: function() {
                $("[data-app-modal] [data-mbgaui-anchors]").removeClass("mbgaui-disabled")
            },
            updateCssIfScrollIsNative: function(e) {
                $("#content [data-ui-freescroll]").attr("data-ui-freescroll-init-as") === "native" && $("#content [data-ui-freescroll]").fastCss("overflow-y", e)
            },
            _forceUpdateSelf: function() {
                if (!o) return;
                this.$el.fastCss("opacity", .99), window.setTimeout(function() {
                    this.$el.fastCss("opacity", 1)
                }.bind(this), 0)
            },
            _triggerEvents: function(e) {
                FF.eventNotifier.trigger("modal:" + e, this), this.trigger(e)
            },
            dispose: function() {
                this.$el.hasClass("open") && this.$el.removeClass("open"), this.imagewatcher && this.imagewatcher.dispose(), this.$el.empty(), this.stopListening(), this.undelegateEvents()
            }
        }, {
            isModalOpening: function() {
                return $(".modal").hasClass("open")
            }
        })
    }), define("templates/common/ModalRetry", [], function() {
        return function(a) {
            a || (a = {});
            var b, __p = "",
                __e = _.escape;
            with(a) __p += '<div class="c-modal-window">\n    <div class="c-modal-window__inner">\n        <h1 class="c-ttl-scene"><span class="c-ttl-scene__inner">Connection Timed Out</span></h1>\n        <div class="c-description-center">\n            A connection error has occurred. Retry?<br>\n        </div>\n\n        <div class="c-btn-container">\n            <a class="c-btn is-main-lead mb-b2 mlr-a" data-mbgaui-anchors data-app-sound="choose" data-app-modal-btn-retry><span class="c-btn__inner">Retry</span></a>\n            <a class="c-btn is-sub-lead mlr-a ta-c" data-mbgaui-anchors data-app-sound="choose" data-app-modal-btn-reload><span class="c-btn__inner">Back to Title</span></a>\n        </div>\n    </div>\n</div>\n';
            return __p
        }
    }), define("scenes/common/views/ModalRetry", ["underscore", "jquery", "backbone", "lib/ModalBase", "templates/common/ModalRetry"], function(e, t, n, r, i) {
        return r.extend({
            el: "[data-app-modal]",
            events: {
                "anchorsbeforejump [data-app-modal-btn-retry]": "onClickRetry",
                "anchorsbeforejump [data-app-modal-btn-reload]": "onClickReload"
            },
            overlayStayOnEnd: !0,
            render: function(e) {
                this.renderContent(i, {
                    error: e
                })
            },
            onClickRetry: function() {
                this._triggerEvents("onClickRetry"), this.end(this.overlayStayOnEnd)
            },
            onClickReload: function() {
                FF.router.loading.show(), location.hash = "title", location.reload(), this.end()
            },
            onClickContact: function() {
                t.nativefn.call("mobageContact")
            }
        })
    }), define("lib/ab/CommonAssetsManager", ["require", "exports", "underscore", "jquery", "./kickmotor/LayerFactory", "scenes/common/views/ModalRetry"], function(e, t, n, r, i, s) {
        var o = /^\/Content\/lang\/(|ww\/(|compile\/)(en|es|fr)\/)ab\/.*\.json$/,
            u = {
                isVisible: !0,
                maxRetryNum: 3,
                retryIntervalMilliSec: 3e3,
                retryDialog: !1,
                showLoadingAfterRetryDialog: !0
            },
            a = "onClickRetry",
            f = "assetsManager:closeRetryModal",
            l = "assetsManager:openRetryModal",
            c = function() {
                function e() {
                    this._taskQueue = []
                }
                return e.getInstance = function() {
                    return this._instance || (this._instance = new e), this._instance
                }, e.prototype.toString = function() {
                    return "[CommonAssetsManager:Precacher]"
                }, e.prototype.getInfoString = function() {
                    return "queue length:" + this._taskQueue.length
                }, e.prototype.addTask = function(e) {
                    this._taskQueue.push(e), this.nextTask()
                }, e.prototype.retryCurrentTask = function() {
                    this._currentTask && this._precacheAssets(this._currentTask, 0)
                }, e.prototype.removeCurrentTask = function() {
                    this._currentTask && (this._currentTask.dispose(), this._currentTask = void 0), this.nextTask()
                }, e.prototype.removeTaskByAssetManager = function(e) {
                    var t = this._taskQueue.length;
                    while (t--) {
                        var n = this._taskQueue[t];
                        n.assetsManager === e && (this._taskQueue.splice(t, 1), n.dispose())
                    }
                    this._currentTask && this._currentTask.assetsManager === e && this.removeCurrentTask()
                }, e.prototype.isBusy = function() {
                    return !!this._currentTask
                }, e.prototype.nextTask = function() {
                    var e = this;
                    if (this.isBusy()) return;
                    if (this._taskQueue.length === 0) return;
                    var t = this._currentTask = this._taskQueue.shift();
                    FF.logger.debug(t + " start...", t.layerAssetInfoMap, t.bundleDataMap), FF.logger.debug(this + " - " + this.getInfoString()), this._checkDownloadAssetsDeferred(t.layerAssetInfoMap).then(function(e) {
                        e && (FF.logger.debug("clearAllParsedJsonCache"), kickmotor.animation.clearUnusedJsonCache())
                    }).then(function() {
                        e._precacheAssets(t, 0)
                    })
                }, e.prototype._checkDownloadAssetsDeferred = function(e) {
                    var t = r.Deferred(),
                        i = {};
                    return n.each(e, function(e, t) {
                        n.extend(i, e.bundle)
                    }), kickmotor.animation.isDownloadAssets(i, function(e, n) {
                        var r = !e;
                        t.resolve(r)
                    }), t.promise()
                }, e.prototype._precacheAssets = function(e, t) {
                    var n = this;
                    if (e.isDisposed()) return;
                    kickmotor.animation.precacheAssets(e.bundleDataMap, function(r, i) {
                        FF.logger.debug("precacheAssets responce : ", r);
                        if (e.isDisposed()) return;
                        if (r) {
                            t < e.options.maxRetryNum ? (++t, e.waitForRetryIntervalDeferred().then(function() {
                                FF.logger.debug(e + " retry precache retryCnt:" + t), n._precacheAssets(e, t)
                            })) : e.callback(!1);
                            return
                        }
                        e.callback(!0)
                    })
                }, e
            }(),
            h = function() {
                function e(t, n, r, i, s) {
                    this._disposed = !1, this._tid = -1, this._instanceId = ++e._taskCnt, this.assetsManager = t, this.callback = n, this.layerAssetInfoMap = r, this.bundleDataMap = i, this.options = s
                }
                return e.prototype.toString = function() {
                    return "[CommonAssetsManager:PrecacherTask#" + this._instanceId + "]"
                }, e.prototype.waitForRetryIntervalDeferred = function() {
                    var e = this,
                        t = r.Deferred();
                    return this._tid = setTimeout(function() {
                        if (e._disposed) return;
                        e._tid = -1, t.resolve()
                    }, this.options.retryIntervalMilliSec), t.promise()
                }, e.prototype.dispose = function() {
                    FF.logger.debug(this + " disposed."), this.assetsManager = void 0, this.callback = void 0, this.layerAssetInfoMap = void 0, this.bundleDataMap = void 0, this.options = void 0, this._tid >= 0 && (clearTimeout(this._tid), this._tid = -1), this._disposed = !0
                }, e.prototype.isDisposed = function() {
                    return this._disposed
                }, e._taskCnt = 0, e
            }(),
            p = function() {
                function e() {
                    this.EVENTS = {
                        MODAL_OPEN_EVENT: l,
                        MODAL_CLOSE_EVENT: f
                    }, this._disposed = !1, this._layerNames = [], this._registry = {}, e._initializeKickmotor()
                }
                return e._initializeKickmotor = function() {
                    if (this._initialized) return;
                    this._initialized = !0, kickmotor.animation.setKeepJsonCache(!0);
                    var e = [];
                    e.push({
                        exec: "setIsAllocMaxParticle",
                        isAllocMax: !0
                    }), e.push({
                        exec: "setIsEnableFiltering",
                        isFiltering: !0
                    }), kickmotor.animation.processAnimation(e)
                }, e.prototype.dispose = function() {
                    c.getInstance().removeTaskByAssetManager(this), this._disposed = !0
                }, e.prototype.isDisposed = function() {
                    return this._disposed
                }, e.prototype.destroyAllLayer = function(e) {
                    n.each(this._layerNames, function(t) {
                        i.getInstance().destroy(t, e)
                    }), this._layerNames = [], this.dispose()
                }, e.prototype.getCreatedLayerNames = function() {
                    return this._layerNames ? this._layerNames.slice() : []
                }, e.prototype.getLayerNameByAssetId = function(e) {
                    var t = this._registry[e];
                    return t ? t.layerName : void 0
                }, e.prototype.getAssetInfo = function(e, t) {
                    t === void 0 && (t = {
                        error: !0
                    });
                    var n = this._registry[e];
                    if (!n && t.error) throw new Error("asset not found.id=" + e);
                    return n
                }, e.prototype.populateAssetsDeferred = function(e, t) {
                    var i = this;
                    t === void 0 && (t = {});
                    var s = {};
                    n.extend(s, u), n.extend(s, t);
                    var o = {},
                        a = {};
                    n.each(e, function(e, t) {
                        o[t] = {
                            assetId: t,
                            assetPath: e.assetPath,
                            layerName: "layer_" + t,
                            bundle: e.bundle
                        }, n.extend(a, e.bundle)
                    }), n.extend(this._registry, o);
                    var f = this._getLayerAssetInfoMap(this._registry, s),
                        l = r.Deferred(),
                        p = function(e) {
                            e ? (i._populateAssets(a, s), l.resolve(), c.getInstance().removeCurrentTask()) : s.retryDialog ? i._showRetryDialogDeferred().then(function() {
                                s.showLoadingAfterRetryDialog && FF.router.loading.show(), c.getInstance().retryCurrentTask()
                            }) : (c.getInstance().removeCurrentTask(), l.reject())
                        },
                        d = new h(this, p, f, a, s);
                    return c.getInstance().addTask(d), l.promise()
                }, e.prototype._getLayerAssetInfoMap = function(e, t) {
                    var r = this,
                        i = {};
                    return n.each(e, function(e, n) {
                        r._isLayerAssetCreatable(e, t) && (i[n] = e)
                    }), i
                }, e.prototype._populateAssets = function(e, t) {
                    var r = this,
                        i = [];
                    n.each(this._registry, function(e, s) {
                        if (!r._isLayerAssetCreatable(e)) return;
                        if (n.contains(r._layerNames, e.layerName)) return;
                        r._createLayer(e, t), i.push(e)
                    }), this._createLayerHook(i, e, this._registry, t)
                }, e.prototype._createLayer = function(e, t) {
                    i.getInstance().create(e.layerName, e.assetPath, e.bundle, {
                        isVisible: t.isVisible !== void 0 ? t.isVisible : !0
                    }), this._layerNames.push(e.layerName)
                }, e.prototype._showRetryDialogDeferred = function() {
                    var e = r.Deferred(),
                        t = new s;
                    t.render(), FF.router.overlay.registerChildren(t), t.open();
                    var n = function() {
                        t.off(a, n), FF.eventNotifier.trigger(f), e.resolve()
                    };
                    return t.on(a, n), FF.eventNotifier.trigger(l), e.promise()
                }, e.prototype._isLayerAssetCreatable = function(e, t) {
                    return o.test(e.assetPath) ? !0 : !1
                }, e.prototype._createLayerHook = function(e, t, n, r) {}, e._initialized = !1, e
            }();
        return p
    }), define("lib/ab/ScrollableTextNode", ["underscore", "jquery", "lib/ab/ABNode"], function(e, t, n) {
        var r = function(e) {
            n.apply(this, arguments), this._x = 0, this._y = 0, this.actualWidth = void 0, this.actualHeight = void 0, this.didReceivedActualSize = !1
        };
        r.prototype = Object.create(n.prototype);
        var i = {
            setText: function(t, r) {
                return r = r || {}, this.didReceivedActualSize = !1, n.prototype.setText.call(this, this.name, t, r), this.addCallbackOnce("action_label_preferrerd_size_changed", e.bind(function(t) {
                    this.actualWidth = t.width, this.actualHeight = t.height, this.didReceivedActualSize = !0, e.isFunction(r.callback) && r.callback({
                        width: this.actualWidth,
                        height: this.actualHeight
                    })
                }, this)), this
            },
            scrollDeferred: function(n) {
                var r = this,
                    i = t.Deferred(),
                    s = 0,
                    o = this._x,
                    u = this._y;
                if (!e.isObject(n)) throw new Error("argument must be an object.");
                n = e.extend({
                    x: 0,
                    y: 0,
                    duration: .3
                }, n);
                var a = n.x - o,
                    f = n.y - u;
                return this.sequence([{
                    action: "moveBy",
                    duration: n.duration,
                    layer: this.layer,
                    pos: [a, f]
                }], e.bind(function() {
                    this._x = n.x, this._y = n.y, i.resolve()
                }, this)).process(), i.promise()
            }
        };
        return e.extend(r.prototype, i), r
    }), define("lib/Storage", ["jquery", "kickmotor"], function(e, t) {
        var n = {
                init: function(e) {
                    e || (e = function() {});
                    if (!FF.env.isNative()) return e();
                    t.util.localStorageInit(function(t) {
                        e(t), e = void 0
                    })
                },
                setItem: function(e, n, r) {
                    r || (r = function() {});
                    if (!FF.env.isNative()) return r({
                        result: !0
                    });
                    t.util.localStorageSetItem(e, n, function(e) {
                        r(e), r = void 0
                    })
                },
                getItem: function(e, n) {
                    if (!FF.env.isNative()) return n({
                        result: !1
                    });
                    t.util.localStorageGetItem(e, function(e) {
                        n(e), n = void 0
                    })
                },
                getAllKeys: function(e) {
                    e || (e = function() {});
                    if (!FF.env.isNative()) return e({
                        result: !0
                    });
                    t.util.localStorageGetAllKeys(e)
                },
                removeItem: function(e, n) {
                    n || (n = function() {});
                    if (!FF.env.isNative()) return n({
                        result: !0
                    });
                    t.util.localStorageRemoveItem(e, n)
                },
                removeAllItems: function(t) {
                    var n = this,
                        r = [],
                        i;
                    t || (t = function() {});
                    if (!FF.env.isNative()) return t({
                        result: !0
                    });
                    this.getAllKeysDeferred().then(function(t) {
                        return i = t.value.split(", "), _.each(i, function(e) {
                            var t = n.removeItemDeferred(e);
                            r.push(t)
                        }), e.when.apply(null, r)
                    }).then(function() {
                        t({
                            result: !0,
                            keys: i
                        }), t = void 0
                    }, function() {
                        t({
                            result: !1,
                            keys: i
                        }), t = void 0
                    })
                }
            },
            r = function(t) {
                return function() {
                    var r = Array.prototype.slice.call(arguments);
                    return e.Deferred(function(e) {
                        r.push(function(t) {
                            e.resolve(t)
                        }), t.apply(n, r)
                    }).promise()
                }
            };
        return _.each(["init", "setItem", "getItem", "removeItem", "getAllKeys", "removeAllItems"], function(e) {
            n[e + "Deferred"] = r(n[e])
        }), n
    }), define("lib/WorldConfig", ["backbone", "./Storage"], function(e, t) {
        var n = "world_config";
        return {
            loadConfigDeferred: function() {
                var e = $.Deferred();
                return t.init(function() {
                    t.getItemDeferred(n, function(t) {
                        var n = t.result ? JSON.parse(t.value) : {};
                        e.resolve(n)
                    })
                }), e.promise()
            },
            saveConfigDeferred: function(e) {
                if (!_.isObject(e)) throw new Error("invalid world_config");
                var r = $.Deferred(),
                    i = JSON.stringify(e);
                return t.setItemDeferred(n, i, function(e) {
                    r.resolve(e)
                }), r.promise()
            }
        }
    }), define("lib/AnimationCut", ["jquery", "underscore", "lib/WorldConfig"], function(e, t, n) {
        var r = {
                DISABLE_CLASS_NAME: "g-disable-animation"
            },
            i = !1,
            s;
        return {
            initDeferred: function() {
                var t = this,
                    r = e.Deferred();
                return s = e("body"), n.loadConfigDeferred().done(function(e) {
                    e.is_disable_animation !== undefined && (i = e.is_disable_animation), r.resolve()
                }), r.promise()
            },
            apply: function() {
                return i ? s.addClass(r.DISABLE_CLASS_NAME) : s.removeClass(r.DISABLE_CLASS_NAME), this
            },
            changeDeferred: function(t) {
                var r = e.Deferred(),
                    s = this,
                    o = {
                        is_disable_animation: t
                    };
                return n.saveConfigDeferred(o).done(function() {
                    i = t, r.resolve()
                }), r.promise()
            },
            isDisabled: function() {
                return i
            }
        }
    }), define("lib/CharaJsonFormatter", [], function() {
        return {
            stringify: function(e) {
                var t = {
                    ct: e.ciphertext.toString(Chara.enc.Base64)
                };
                return e.iv && (t.iv = e.iv.toString()), e.salt && (t.s = e.salt.toString()), JSON.stringify(t)
            },
            parse: function(e) {
                var t = JSON.parse(e),
                    n = Chara.lib.CipherParams.create({
                        ciphertext: Chara.enc.Base64.parse(t.ct)
                    });
                return t.iv && (n.iv = Chara.enc.Hex.parse(t.iv)), t.s && (n.salt = Chara.enc.Hex.parse(t.s)), n
            }
        }
    }),
    function(e) {
        e.Chara = e.Chara || function(e, t) {
                var n = {},
                    r = n.lib = {},
                    i = function() {},
                    s = r.Base = {
                        extend: function(e) {
                            i.prototype = this;
                            var t = new i;
                            return e && t.mixIn(e), t.hasOwnProperty("init") || (t.init = function() {
                                t.$super.init.apply(this, arguments)
                            }), t.init.prototype = t, t.$super = this, t
                        },
                        create: function() {
                            var e = this.extend();
                            return e.init.apply(e, arguments), e
                        },
                        init: function() {},
                        mixIn: function(e) {
                            for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                            e.hasOwnProperty("toString") && (this.toString = e.toString)
                        },
                        clone: function() {
                            return this.init.prototype.extend(this)
                        }
                    },
                    o = r.WordArray = s.extend({
                        init: function(e, n) {
                            e = this.words = e || [], this.sigBytes = n != t ? n : 4 * e.length
                        },
                        toString: function(e) {
                            return (e || a).stringify(this)
                        },
                        concat: function(e) {
                            var t = this.words,
                                n = e.words,
                                r = this.sigBytes;
                            e = e.sigBytes, this.clamp();
                            if (r % 4)
                                for (var i = 0; i < e; i++) t[r + i >>> 2] |= (n[i >>> 2] >>> 24 - 8 * (i % 4) & 255) << 24 - 8 * ((r + i) % 4);
                            else if (65535 < n.length)
                                for (i = 0; i < e; i += 4) t[r + i >>> 2] = n[i >>> 2];
                            else t.push.apply(t, n);
                            return this.sigBytes += e, this
                        },
                        clamp: function() {
                            var t = this.words,
                                n = this.sigBytes;
                            t[n >>> 2] &= 4294967295 << 32 - 8 * (n % 4), t.length = e.ceil(n / 4)
                        },
                        clone: function() {
                            var e = s.clone.call(this);
                            return e.words = this.words.slice(0), e
                        },
                        random: function(t) {
                            for (var n = [], r = 0; r < t; r += 4) n.push(4294967296 * e.random() | 0);
                            return new o.init(n, t)
                        }
                    }),
                    u = n.enc = {},
                    a = u.Hex = {
                        stringify: function(e) {
                            var t = e.words;
                            e = e.sigBytes;
                            for (var n = [], r = 0; r < e; r++) {
                                var i = t[r >>> 2] >>> 24 - 8 * (r % 4) & 255;
                                n.push((i >>> 4).toString(16)), n.push((i & 15).toString(16))
                            }
                            return n.join("")
                        },
                        parse: function(e) {
                            for (var t = e.length, n = [], r = 0; r < t; r += 2) n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << 24 - 4 * (r % 8);
                            return new o.init(n, t / 2)
                        }
                    },
                    f = u.Latin1 = {
                        stringify: function(e) {
                            var t = e.words;
                            e = e.sigBytes;
                            for (var n = [], r = 0; r < e; r++) n.push(String.fromCharCode(t[r >>> 2] >>> 24 - 8 * (r % 4) & 255));
                            return n.join("")
                        },
                        parse: function(e) {
                            for (var t = e.length, n = [], r = 0; r < t; r++) n[r >>> 2] |= (e.charCodeAt(r) & 255) << 24 - 8 * (r % 4);
                            return new o.init(n, t)
                        }
                    },
                    l = u.Utf8 = {
                        stringify: function(e) {
                            try {
                                return decodeURIComponent(escape(f.stringify(e)))
                            } catch (t) {
                                throw Error("Malformed UTF-8 data")
                            }
                        },
                        parse: function(e) {
                            return f.parse(unescape(encodeURIComponent(e)))
                        }
                    },
                    c = r.BufferedBlockAlgorithm = s.extend({
                        reset: function() {
                            this._data = new o.init, this._nDataBytes = 0
                        },
                        _append: function(e) {
                            "string" == typeof e && (e = l.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes
                        },
                        _process: function(t) {
                            var n = this._data,
                                r = n.words,
                                i = n.sigBytes,
                                s = this.blockSize,
                                u = i / (4 * s),
                                u = t ? e.ceil(u) : e.max((u | 0) - this._minBufferSize, 0);
                            t = u * s, i = e.min(4 * t, i);
                            if (t) {
                                for (var a = 0; a < t; a += s) this._doProcessBlock(r, a);
                                a = r.splice(0, t), n.sigBytes -= i
                            }
                            return new o.init(a, i)
                        },
                        clone: function() {
                            var e = s.clone.call(this);
                            return e._data = this._data.clone(), e
                        },
                        _minBufferSize: 0
                    });
                r.Hasher = c.extend({
                    cfg: s.extend(),
                    init: function(e) {
                        this.cfg = this.cfg.extend(e), this.reset()
                    },
                    reset: function() {
                        c.reset.call(this), this._doReset()
                    },
                    update: function(e) {
                        return this._append(e), this._process(), this
                    },
                    finalize: function(e) {
                        return e && this._append(e), this._doFinalize()
                    },
                    blockSize: 16,
                    _createHelper: function(e) {
                        return function(t, n) {
                            return (new e.init(n)).finalize(t)
                        }
                    },
                    _createHmacHelper: function(e) {
                        return function(t, n) {
                            return (new h.HMAC.init(e, n)).finalize(t)
                        }
                    }
                });
                var h = n.algo = {};
                return n
            }(Math),
            function() {
                var e = Chara,
                    t = e.lib.WordArray;
                e.enc.Base64 = {
                    stringify: function(e) {
                        var t = e.words,
                            n = e.sigBytes,
                            r = this._map;
                        e.clamp(), e = [];
                        for (var i = 0; i < n; i += 3)
                            for (var s = (t[i >>> 2] >>> 24 - 8 * (i % 4) & 255) << 16 | (t[i + 1 >>> 2] >>> 24 - 8 * ((i + 1) % 4) & 255) << 8 | t[i + 2 >>> 2] >>> 24 - 8 * ((i + 2) % 4) & 255, o = 0; 4 > o && i + .75 * o < n; o++) e.push(r.charAt(s >>> 6 * (3 - o) & 63));
                        if (t = r.charAt(64))
                            for (; e.length % 4;) e.push(t);
                        return e.join("")
                    },
                    parse: function(e) {
                        var n = e.length,
                            r = this._map,
                            i = r.charAt(64);
                        i && (i = e.indexOf(i), -1 != i && (n = i));
                        for (var i = [], s = 0, o = 0; o < n; o++)
                            if (o % 4) {
                                var u = r.indexOf(e.charAt(o - 1)) << 2 * (o % 4),
                                    a = r.indexOf(e.charAt(o)) >>> 6 - 2 * (o % 4);
                                i[s >>> 2] |= (u | a) << 24 - 8 * (s % 4), s++
                            }
                        return t.create(i, s)
                    },
                    _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
                }
            }(),
            function(e) {
                function t(e, t, n, r, i, s, o) {
                    return e = e + (t & n | ~t & r) + i + o, (e << s | e >>> 32 - s) + t
                }

                function n(e, t, n, r, i, s, o) {
                    return e = e + (t & r | n & ~r) + i + o, (e << s | e >>> 32 - s) + t
                }

                function r(e, t, n, r, i, s, o) {
                    return e = e + (t ^ n ^ r) + i + o, (e << s | e >>> 32 - s) + t
                }

                function i(e, t, n, r, i, s, o) {
                    return e = e + (n ^ (t | ~r)) + i + o, (e << s | e >>> 32 - s) + t
                }
                for (var s = Chara, o = s.lib, u = o.WordArray, a = o.Hasher, o = s.algo, f = [], l = 0; 64 > l; l++) f[l] = 4294967296 * e.abs(e.sin(l + 1)) | 0;
                o = o.MD5 = a.extend({
                    _doReset: function() {
                        this._hash = new u.init([1732584193, 4023233417, 2562383102, 271733878])
                    },
                    _doProcessBlock: function(e, s) {
                        for (var o = 0; 16 > o; o++) {
                            var u = s + o,
                                a = e[u];
                            e[u] = (a << 8 | a >>> 24) & 16711935 | (a << 24 | a >>> 8) & 4278255360
                        }
                        var o = this._hash.words,
                            u = e[s + 0],
                            a = e[s + 1],
                            l = e[s + 2],
                            c = e[s + 3],
                            h = e[s + 4],
                            v = e[s + 5],
                            m = e[s + 6],
                            g = e[s + 7],
                            y = e[s + 8],
                            w = e[s + 9],
                            E = e[s + 10],
                            S = e[s + 11],
                            x = e[s + 12],
                            T = e[s + 13],
                            N = e[s + 14],
                            C = e[s + 15],
                            k = o[0],
                            L = o[1],
                            A = o[2],
                            O = o[3],
                            k = t(k, L, A, O, u, 7, f[0]),
                            O = t(O, k, L, A, a, 12, f[1]),
                            A = t(A, O, k, L, l, 17, f[2]),
                            L = t(L, A, O, k, c, 22, f[3]),
                            k = t(k, L, A, O, h, 7, f[4]),
                            O = t(O, k, L, A, v, 12, f[5]),
                            A = t(A, O, k, L, m, 17, f[6]),
                            L = t(L, A, O, k, g, 22, f[7]),
                            k = t(k, L, A, O, y, 7, f[8]),
                            O = t(O, k, L, A, w, 12, f[9]),
                            A = t(A, O, k, L, E, 17, f[10]),
                            L = t(L, A, O, k, S, 22, f[11]),
                            k = t(k, L, A, O, x, 7, f[12]),
                            O = t(O, k, L, A, T, 12, f[13]),
                            A = t(A, O, k, L, N, 17, f[14]),
                            L = t(L, A, O, k, C, 22, f[15]),
                            k = n(k, L, A, O, a, 5, f[16]),
                            O = n(O, k, L, A, m, 9, f[17]),
                            A = n(A, O, k, L, S, 14, f[18]),
                            L = n(L, A, O, k, u, 20, f[19]),
                            k = n(k, L, A, O, v, 5, f[20]),
                            O = n(O, k, L, A, E, 9, f[21]),
                            A = n(A, O, k, L, C, 14, f[22]),
                            L = n(L, A, O, k, h, 20, f[23]),
                            k = n(k, L, A, O, w, 5, f[24]),
                            O = n(O, k, L, A, N, 9, f[25]),
                            A = n(A, O, k, L, c, 14, f[26]),
                            L = n(L, A, O, k, y, 20, f[27]),
                            k = n(k, L, A, O, T, 5, f[28]),
                            O = n(O, k, L, A, l, 9, f[29]),
                            A = n(A, O, k, L, g, 14, f[30]),
                            L = n(L, A, O, k, x, 20, f[31]),
                            k = r(k, L, A, O, v, 4, f[32]),
                            O = r(O, k, L, A, y, 11, f[33]),
                            A = r(A, O, k, L, S, 16, f[34]),
                            L = r(L, A, O, k, N, 23, f[35]),
                            k = r(k, L, A, O, a, 4, f[36]),
                            O = r(O, k, L, A, h, 11, f[37]),
                            A = r(A, O, k, L, g, 16, f[38]),
                            L = r(L, A, O, k, E, 23, f[39]),
                            k = r(k, L, A, O, T, 4, f[40]),
                            O = r(O, k, L, A, u, 11, f[41]),
                            A = r(A, O, k, L, c, 16, f[42]),
                            L = r(L, A, O, k, m, 23, f[43]),
                            k = r(k, L, A, O, w, 4, f[44]),
                            O = r(O, k, L, A, x, 11, f[45]),
                            A = r(A, O, k, L, C, 16, f[46]),
                            L = r(L, A, O, k, l, 23, f[47]),
                            k = i(k, L, A, O, u, 6, f[48]),
                            O = i(O, k, L, A, g, 10, f[49]),
                            A = i(A, O, k, L, N, 15, f[50]),
                            L = i(L, A, O, k, v, 21, f[51]),
                            k = i(k, L, A, O, x, 6, f[52]),
                            O = i(O, k, L, A, c, 10, f[53]),
                            A = i(A, O, k, L, E, 15, f[54]),
                            L = i(L, A, O, k, a, 21, f[55]),
                            k = i(k, L, A, O, y, 6, f[56]),
                            O = i(O, k, L, A, C, 10, f[57]),
                            A = i(A, O, k, L, m, 15, f[58]),
                            L = i(L, A, O, k, T, 21, f[59]),
                            k = i(k, L, A, O, h, 6, f[60]),
                            O = i(O, k, L, A, S, 10, f[61]),
                            A = i(A, O, k, L, l, 15, f[62]),
                            L = i(L, A, O, k, w, 21, f[63]);
                        o[0] = o[0] + k | 0, o[1] = o[1] + L | 0, o[2] = o[2] + A | 0, o[3] = o[3] + O | 0
                    },
                    _doFinalize: function() {
                        var t = this._data,
                            n = t.words,
                            r = 8 * this._nDataBytes,
                            i = 8 * t.sigBytes;
                        n[i >>> 5] |= 128 << 24 - i % 32;
                        var s = e.floor(r / 4294967296);
                        n[(i + 64 >>> 9 << 4) + 15] = (s << 8 | s >>> 24) & 16711935 | (s << 24 | s >>> 8) & 4278255360, n[(i + 64 >>> 9 << 4) + 14] = (r << 8 | r >>> 24) & 16711935 | (r << 24 | r >>> 8) & 4278255360, t.sigBytes = 4 * (n.length + 1), this._process(), t = this._hash, n = t.words;
                        for (r = 0; 4 > r; r++) i = n[r], n[r] = (i << 8 | i >>> 24) & 16711935 | (i << 24 | i >>> 8) & 4278255360;
                        return t
                    },
                    clone: function() {
                        var e = a.clone.call(this);
                        return e._hash = this._hash.clone(), e
                    }
                }), s.MD5 = a._createHelper(o), s.HmacMD5 = a._createHmacHelper(o)
            }(Math),
            function() {
                var e = Chara,
                    t = e.lib,
                    n = t.Base,
                    r = t.WordArray,
                    t = e.algo,
                    i = t.EvpKDF = n.extend({
                        cfg: n.extend({
                            keySize: 4,
                            hasher: t.MD5,
                            iterations: 1
                        }),
                        init: function(e) {
                            this.cfg = this.cfg.extend(e)
                        },
                        compute: function(e, t) {
                            for (var n = this.cfg, i = n.hasher.create(), s = r.create(), o = s.words, u = n.keySize, n = n.iterations; o.length < u;) {
                                a && i.update(a);
                                var a = i.update(e).finalize(t);
                                i.reset();
                                for (var f = 1; f < n; f++) a = i.finalize(a), i.reset();
                                s.concat(a)
                            }
                            return s.sigBytes = 4 * u, s
                        }
                    });
                e.EvpKDF = function(e, t, n) {
                    return i.create(n).compute(e, t)
                }
            }(), Chara.lib.Cipher || function(e) {
                var t = Chara,
                    n = t.lib,
                    r = n.Base,
                    i = n.WordArray,
                    s = n.BufferedBlockAlgorithm,
                    o = t.enc.Base64,
                    u = t.algo.EvpKDF,
                    a = n.Cipher = s.extend({
                        cfg: r.extend(),
                        createEncryptor: function(e, t) {
                            return this.create(this._ENC_XFORM_MODE, e, t)
                        },
                        createDecryptor: function(e, t) {
                            return this.create(this._DEC_XFORM_MODE, e, t)
                        },
                        init: function(e, t, n) {
                            this.cfg = this.cfg.extend(n), this._xformMode = e, this._key = t, this.reset()
                        },
                        reset: function() {
                            s.reset.call(this), this._doReset()
                        },
                        process: function(e) {
                            return this._append(e), this._process()
                        },
                        finalize: function(e) {
                            return e && this._append(e), this._doFinalize()
                        },
                        keySize: 4,
                        ivSize: 4,
                        _ENC_XFORM_MODE: 1,
                        _DEC_XFORM_MODE: 2,
                        _createHelper: function(e) {
                            return {
                                banish: function(t, n, r) {
                                    return ("string" == typeof n ? d : p).banish(e, t, n, r)
                                },
                                dispel: function(t, n, r) {
                                    return ("string" == typeof n ? d : p).dispel(e, t, n, r)
                                }
                            }
                        }
                    });
                n.StreamCipher = a.extend({
                    _doFinalize: function() {
                        return this._process(!0)
                    },
                    blockSize: 1
                });
                var f = t.mode = {},
                    l = function(t, n, r) {
                        var i = this._iv;
                        i ? this._iv = e : i = this._prevBlock;
                        for (var s = 0; s < r; s++) t[n + s] ^= i[s]
                    },
                    c = (n.BlockCipherMode = r.extend({
                        createEncryptor: function(e, t) {
                            return this.Encryptor.create(e, t)
                        },
                        createDecryptor: function(e, t) {
                            return this.Decryptor.create(e, t)
                        },
                        init: function(e, t) {
                            this._cipher = e, this._iv = t
                        }
                    })).extend();
                c.Encryptor = c.extend({
                    processBlock: function(e, t) {
                        var n = this._cipher,
                            r = n.blockSize;
                        l.call(this, e, t, r), n.encryptBlock(e, t), this._prevBlock = e.slice(t, t + r)
                    }
                }), c.Decryptor = c.extend({
                    processBlock: function(e, t) {
                        var n = this._cipher,
                            r = n.blockSize,
                            i = e.slice(t, t + r);
                        n.decryptBlock(e, t), l.call(this, e, t, r), this._prevBlock = i
                    }
                }), f = f.CBC = c, c = (t.pad = {}).Pkcs7 = {
                    pad: function(e, t) {
                        for (var n = 4 * t, n = n - e.sigBytes % n, r = n << 24 | n << 16 | n << 8 | n, s = [], o = 0; o < n; o += 4) s.push(r);
                        n = i.create(s, n), e.concat(n)
                    },
                    unpad: function(e) {
                        e.sigBytes -= e.words[e.sigBytes - 1 >>> 2] & 255
                    }
                }, n.BlockCipher = a.extend({
                    cfg: a.cfg.extend({
                        mode: f,
                        padding: c
                    }),
                    reset: function() {
                        a.reset.call(this);
                        var e = this.cfg,
                            t = e.iv,
                            e = e.mode;
                        if (this._xformMode == this._ENC_XFORM_MODE) var n = e.createEncryptor;
                        else n = e.createDecryptor, this._minBufferSize = 1;
                        this._mode = n.call(e, this, t && t.words)
                    },
                    _doProcessBlock: function(e, t) {
                        this._mode.processBlock(e, t)
                    },
                    _doFinalize: function() {
                        var e = this.cfg.padding;
                        if (this._xformMode == this._ENC_XFORM_MODE) {
                            e.pad(this._data, this.blockSize);
                            var t = this._process(!0)
                        } else t = this._process(!0), e.unpad(t);
                        return t
                    },
                    blockSize: 4
                });
                var h = n.CipherParams = r.extend({
                        init: function(e) {
                            this.mixIn(e)
                        },
                        toString: function(e) {
                            return (e || this.formatter).stringify(this)
                        }
                    }),
                    f = (t.format = {}).OpenSSL = {
                        stringify: function(e) {
                            var t = e.ciphertext;
                            return e = e.salt, (e ? i.create([1398893684, 1701076831]).concat(e).concat(t) : t).toString(o)
                        },
                        parse: function(e) {
                            e = o.parse(e);
                            var t = e.words;
                            if (1398893684 == t[0] && 1701076831 == t[1]) {
                                var n = i.create(t.slice(2, 4));
                                t.splice(0, 4), e.sigBytes -= 16
                            }
                            return h.create({
                                ciphertext: e,
                                salt: n
                            })
                        }
                    },
                    p = n.SerializableCipher = r.extend({
                        cfg: r.extend({
                            format: f
                        }),
                        banish: function(e, t, n, r) {
                            r = this.cfg.extend(r);
                            var i = e.createEncryptor(n, r);
                            return t = i.finalize(t), i = i.cfg, h.create({
                                ciphertext: t,
                                key: n,
                                iv: i.iv,
                                algorithm: e,
                                mode: i.mode,
                                padding: i.padding,
                                blockSize: e.blockSize,
                                formatter: r.format
                            })
                        },
                        dispel: function(e, t, n, r) {
                            return r = this.cfg.extend(r), t = this._parse(t, r.format), e.createDecryptor(n, r).finalize(t.ciphertext)
                        },
                        _parse: function(e, t) {
                            return "string" == typeof e ? t.parse(e, this) : e
                        }
                    }),
                    t = (t.kdf = {}).OpenSSL = {
                        execute: function(e, t, n, r) {
                            return r || (r = i.random(8)), e = u.create({
                                keySize: t + n
                            }).compute(e, r), n = i.create(e.words.slice(t), 4 * n), e.sigBytes = 4 * t, h.create({
                                key: e,
                                iv: n,
                                salt: r
                            })
                        }
                    },
                    d = n.PasswordBasedCipher = p.extend({
                        cfg: p.cfg.extend({
                            kdf: t
                        }),
                        banish: function(e, t, n, r) {
                            return r = this.cfg.extend(r), n = r.kdf.execute(n, e.keySize, e.ivSize), r.iv = n.iv, e = p.banish.call(this, e, t, n.key, r), e.mixIn(n), e
                        },
                        dispel: function(e, t, n, r) {
                            return r = this.cfg.extend(r), t = this._parse(t, r.format), n = r.kdf.execute(n, e.keySize, e.ivSize, t.salt), r.iv = n.iv, p.dispel.call(this, e, t, n.key, r)
                        }
                    })
            }(),
            function() {
                for (var e = Chara, t = e.lib.BlockCipher, n = e.algo, r = [], i = [], s = [], o = [], u = [], a = [], f = [], l = [], c = [], h = [], p = [], d = 0; 256 > d; d++) p[d] = 128 > d ? d << 1 : d << 1 ^ 283;
                for (var v = 0, m = 0, d = 0; 256 > d; d++) {
                    var g = m ^ m << 1 ^ m << 2 ^ m << 3 ^ m << 4,
                        g = g >>> 8 ^ g & 255 ^ 99;
                    r[v] = g, i[g] = v;
                    var y = p[v],
                        b = p[y],
                        w = p[b],
                        E = 257 * p[g] ^ 16843008 * g;
                    s[v] = E << 24 | E >>> 8, o[v] = E << 16 | E >>> 16, u[v] = E << 8 | E >>> 24, a[v] = E, E = 16843009 * w ^ 65537 * b ^ 257 * y ^ 16843008 * v, f[g] = E << 24 | E >>> 8, l[g] = E << 16 | E >>> 16, c[g] = E << 8 | E >>> 24, h[g] = E, v ? (v = y ^ p[p[p[w ^ y]]], m ^= p[p[m]]) : v = m = 1
                }
                var S = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
                    n = n.GOLBEZ = t.extend({
                        _doReset: function() {
                            for (var e = this._key, t = e.words, n = e.sigBytes / 4, e = 4 * ((this._nRounds = n + 6) + 1), i = this._keySchedule = [], s = 0; s < e; s++)
                                if (s < n) i[s] = t[s];
                                else {
                                    var o = i[s - 1];
                                    s % n ? 6 < n && 4 == s % n && (o = r[o >>> 24] << 24 | r[o >>> 16 & 255] << 16 | r[o >>> 8 & 255] << 8 | r[o & 255]) : (o = o << 8 | o >>> 24, o = r[o >>> 24] << 24 | r[o >>> 16 & 255] << 16 | r[o >>> 8 & 255] << 8 | r[o & 255], o ^= S[s / n | 0] << 24), i[s] = i[s - n] ^ o
                                }
                            t = this._invKeySchedule = [];
                            for (n = 0; n < e; n++) s = e - n, o = n % 4 ? i[s] : i[s - 4], t[n] = 4 > n || 4 >= s ? o : f[r[o >>> 24]] ^ l[r[o >>> 16 & 255]] ^ c[r[o >>> 8 & 255]] ^ h[r[o & 255]]
                        },
                        encryptBlock: function(e, t) {
                            this._doCryptBlock(e, t, this._keySchedule, s, o, u, a, r)
                        },
                        decryptBlock: function(e, t) {
                            var n = e[t + 1];
                            e[t + 1] = e[t + 3], e[t + 3] = n, this._doCryptBlock(e, t, this._invKeySchedule, f, l, c, h, i), n = e[t + 1], e[t + 1] = e[t + 3], e[t + 3] = n
                        },
                        _doCryptBlock: function(e, t, n, r, i, s, o, u) {
                            for (var a = this._nRounds, f = e[t] ^ n[0], l = e[t + 1] ^ n[1], c = e[t + 2] ^ n[2], h = e[t + 3] ^ n[3], p = 4, d = 1; d < a; d++) var v = r[f >>> 24] ^ i[l >>> 16 & 255] ^ s[c >>> 8 & 255] ^ o[h & 255] ^ n[p++],
                                m = r[l >>> 24] ^ i[c >>> 16 & 255] ^ s[h >>> 8 & 255] ^ o[f & 255] ^ n[p++],
                                g = r[c >>> 24] ^ i[h >>> 16 & 255] ^ s[f >>> 8 & 255] ^ o[l & 255] ^ n[p++],
                                h = r[h >>> 24] ^ i[f >>> 16 & 255] ^ s[l >>> 8 & 255] ^ o[c & 255] ^ n[p++],
                                f = v,
                                l = m,
                                c = g;
                            v = (u[f >>> 24] << 24 | u[l >>> 16 & 255] << 16 | u[c >>> 8 & 255] << 8 | u[h & 255]) ^ n[p++], m = (u[l >>> 24] << 24 | u[c >>> 16 & 255] << 16 | u[h >>> 8 & 255] << 8 | u[f & 255]) ^ n[p++], g = (u[c >>> 24] << 24 | u[h >>> 16 & 255] << 16 | u[f >>> 8 & 255] << 8 | u[l & 255]) ^ n[p++], h = (u[h >>> 24] << 24 | u[f >>> 16 & 255] << 16 | u[l >>> 8 & 255] << 8 | u[c & 255]) ^ n[p++], e[t] = v, e[t + 1] = m, e[t + 2] = g, e[t + 3] = h
                        },
                        keySize: 8
                    });
                e.GOLBEZ = t._createHelper(n)
            }()
    }(this.self || global),
    function(e) {
        e.Chara = e.Chara || function(e, t) {
                var n = {},
                    r = n.lib = {},
                    i = function() {},
                    s = r.Base = {
                        extend: function(e) {
                            i.prototype = this;
                            var t = new i;
                            return e && t.mixIn(e), t.hasOwnProperty("init") || (t.init = function() {
                                t.$super.init.apply(this, arguments)
                            }), t.init.prototype = t, t.$super = this, t
                        },
                        create: function() {
                            var e = this.extend();
                            return e.init.apply(e, arguments), e
                        },
                        init: function() {},
                        mixIn: function(e) {
                            for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                            e.hasOwnProperty("toString") && (this.toString = e.toString)
                        },
                        clone: function() {
                            return this.init.prototype.extend(this)
                        }
                    },
                    o = r.WordArray = s.extend({
                        init: function(e, n) {
                            e = this.words = e || [], this.sigBytes = n != t ? n : 4 * e.length
                        },
                        toString: function(e) {
                            return (e || a).stringify(this)
                        },
                        concat: function(e) {
                            var t = this.words,
                                n = e.words,
                                r = this.sigBytes;
                            e = e.sigBytes, this.clamp();
                            if (r % 4)
                                for (var i = 0; i < e; i++) t[r + i >>> 2] |= (n[i >>> 2] >>> 24 - 8 * (i % 4) & 255) << 24 - 8 * ((r + i) % 4);
                            else if (65535 < n.length)
                                for (i = 0; i < e; i += 4) t[r + i >>> 2] = n[i >>> 2];
                            else t.push.apply(t, n);
                            return this.sigBytes += e, this
                        },
                        clamp: function() {
                            var t = this.words,
                                n = this.sigBytes;
                            t[n >>> 2] &= 4294967295 << 32 - 8 * (n % 4), t.length = e.ceil(n / 4)
                        },
                        clone: function() {
                            var e = s.clone.call(this);
                            return e.words = this.words.slice(0), e
                        },
                        random: function(t) {
                            for (var n = [], r = 0; r < t; r += 4) n.push(4294967296 * e.random() | 0);
                            return new o.init(n, t)
                        }
                    }),
                    u = n.enc = {},
                    a = u.Hex = {
                        stringify: function(e) {
                            var t = e.words;
                            e = e.sigBytes;
                            for (var n = [], r = 0; r < e; r++) {
                                var i = t[r >>> 2] >>> 24 - 8 * (r % 4) & 255;
                                n.push((i >>> 4).toString(16)), n.push((i & 15).toString(16))
                            }
                            return n.join("")
                        },
                        parse: function(e) {
                            for (var t = e.length, n = [], r = 0; r < t; r += 2) n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << 24 - 4 * (r % 8);
                            return new o.init(n, t / 2)
                        }
                    },
                    f = u.Latin1 = {
                        stringify: function(e) {
                            var t = e.words;
                            e = e.sigBytes;
                            for (var n = [], r = 0; r < e; r++) n.push(String.fromCharCode(t[r >>> 2] >>> 24 - 8 * (r % 4) & 255));
                            return n.join("")
                        },
                        parse: function(e) {
                            for (var t = e.length, n = [], r = 0; r < t; r++) n[r >>> 2] |= (e.charCodeAt(r) & 255) << 24 - 8 * (r % 4);
                            return new o.init(n, t)
                        }
                    },
                    l = u.Utf8 = {
                        stringify: function(e) {
                            try {
                                return decodeURIComponent(escape(f.stringify(e)))
                            } catch (t) {
                                throw Error("Malformed UTF-8 data")
                            }
                        },
                        parse: function(e) {
                            return f.parse(unescape(encodeURIComponent(e)))
                        }
                    },
                    c = r.BufferedBlockAlgorithm = s.extend({
                        reset: function() {
                            this._data = new o.init, this._nDataBytes = 0
                        },
                        _append: function(e) {
                            "string" == typeof e && (e = l.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes
                        },
                        _process: function(t) {
                            var n = this._data,
                                r = n.words,
                                i = n.sigBytes,
                                s = this.blockSize,
                                u = i / (4 * s),
                                u = t ? e.ceil(u) : e.max((u | 0) - this._minBufferSize, 0);
                            t = u * s, i = e.min(4 * t, i);
                            if (t) {
                                for (var a = 0; a < t; a += s) this._doProcessBlock(r, a);
                                a = r.splice(0, t), n.sigBytes -= i
                            }
                            return new o.init(a, i)
                        },
                        clone: function() {
                            var e = s.clone.call(this);
                            return e._data = this._data.clone(), e
                        },
                        _minBufferSize: 0
                    });
                r.Hasher = c.extend({
                    cfg: s.extend(),
                    init: function(e) {
                        this.cfg = this.cfg.extend(e), this.reset()
                    },
                    reset: function() {
                        c.reset.call(this), this._doReset()
                    },
                    update: function(e) {
                        return this._append(e), this._process(), this
                    },
                    finalize: function(e) {
                        return e && this._append(e), this._doFinalize()
                    },
                    blockSize: 16,
                    _createHelper: function(e) {
                        return function(t, n) {
                            return (new e.init(n)).finalize(t)
                        }
                    },
                    _createHmacHelper: function(e) {
                        return function(t, n) {
                            return (new h.HMAC.init(e, n)).finalize(t)
                        }
                    }
                });
                var h = n.algo = {};
                return n
            }(Math),
            function(e) {
                for (var t = Chara, n = t.lib, r = n.WordArray, i = n.Hasher, n = t.algo, s = [], o = [], u = function(e) {
                        return 4294967296 * (e - (e | 0)) | 0
                    }, a = 2, f = 0; 64 > f;) {
                    var l;
                    e: {
                        l = a;
                        for (var c = e.sqrt(l), h = 2; h <= c; h++)
                            if (!(l % h)) {
                                l = !1;
                                break e
                            }
                        l = !0
                    }
                    l && (8 > f && (s[f] = u(e.pow(a, .5))), o[f] = u(e.pow(a, 1 / 3)), f++), a++
                }
                var p = [],
                    n = n.SHA256 = i.extend({
                        _doReset: function() {
                            this._hash = new r.init(s.slice(0))
                        },
                        _doProcessBlock: function(e, t) {
                            for (var n = this._hash.words, r = n[0], i = n[1], s = n[2], u = n[3], a = n[4], f = n[5], l = n[6], c = n[7], h = 0; 64 > h; h++) {
                                if (16 > h) p[h] = e[t + h] | 0;
                                else {
                                    var d = p[h - 15],
                                        v = p[h - 2];
                                    p[h] = ((d << 25 | d >>> 7) ^ (d << 14 | d >>> 18) ^ d >>> 3) + p[h - 7] + ((v << 15 | v >>> 17) ^ (v << 13 | v >>> 19) ^ v >>> 10) + p[h - 16]
                                }
                                d = c + ((a << 26 | a >>> 6) ^ (a << 21 | a >>> 11) ^ (a << 7 | a >>> 25)) + (a & f ^ ~a & l) + o[h] + p[h], v = ((r << 30 | r >>> 2) ^ (r << 19 | r >>> 13) ^ (r << 10 | r >>> 22)) + (r & i ^ r & s ^ i & s), c = l, l = f, f = a, a = u + d | 0, u = s, s = i, i = r, r = d + v | 0
                            }
                            n[0] = n[0] + r | 0, n[1] = n[1] + i | 0, n[2] = n[2] + s | 0, n[3] = n[3] + u | 0, n[4] = n[4] + a | 0, n[5] = n[5] + f | 0, n[6] = n[6] + l | 0, n[7] = n[7] + c | 0
                        },
                        _doFinalize: function() {
                            var t = this._data,
                                n = t.words,
                                r = 8 * this._nDataBytes,
                                i = 8 * t.sigBytes;
                            return n[i >>> 5] |= 128 << 24 - i % 32, n[(i + 64 >>> 9 << 4) + 14] = e.floor(r / 4294967296), n[(i + 64 >>> 9 << 4) + 15] = r, t.sigBytes = 4 * n.length, this._process(), this._hash
                        },
                        clone: function() {
                            var e = i.clone.call(this);
                            return e._hash = this._hash.clone(), e
                        }
                    });
                t.SHA256 = i._createHelper(n), t.ZEROMUS = i._createHmacHelper(n)
            }(Math),
            function() {
                var e = Chara,
                    t = e.enc.Utf8;
                e.algo.HMAC = e.lib.Base.extend({
                    init: function(e, n) {
                        e = this._hasher = new e.init, "string" == typeof n && (n = t.parse(n));
                        var r = e.blockSize,
                            i = 4 * r;
                        n.sigBytes > i && (n = e.finalize(n)), n.clamp();
                        for (var o = this._oKey = n.clone(), u = this._iKey = n.clone(), a = o.words, f = u.words, l = 0; l < r; l++) a[l] ^= 1549556828, f[l] ^= 909522486;
                        o.sigBytes = u.sigBytes = i, this.reset()
                    },
                    reset: function() {
                        var e = this._hasher;
                        e.reset(), e.update(this._iKey)
                    },
                    update: function(e) {
                        return this._hasher.update(e), this
                    },
                    finalize: function(e) {
                        var t = this._hasher;
                        return e = t.finalize(e), t.reset(), t.finalize(this._oKey.clone().concat(e))
                    }
                })
            }()
    }(this.self || global), define("lib/Chara", function() {}), define("lib/BattleStorage", ["jquery", "./ClassBase", "./api", "./Storage", "./CharaJsonFormatter", "lib/Chara"], function(e, t, n, r, i) {
        var s = void 0,
            o = t.extend({
                initialize: function(e) {
                    t.prototype.initialize.apply(this, arguments), _.extend(this._attributes, e)
                },
                getSessionKey: function() {
                    return this.get("sessionKey")
                },
                setSessionKey: function(e) {
                    this.set("sessionKey", e)
                },
                getResumeData: function() {
                    return this.get("resumeData") || {}
                },
                setResumeData: function(e) {
                    this.set("resumeData", e)
                },
                saveDeferred: function() {
                    var t = e.Deferred();
                    if (FF.env.isTutorial()) return t.resolve().promise();
                    var n = JSON.stringify(this._attributes),
                        s = o.a(),
                        u = Chara.GOLBEZ.banish(n, s, {
                            format: i
                        }).toString();
                    return r.setItem("battle", u, function(e) {
                        e.result ? t.resolve() : t.reject()
                    }), t.promise()
                },
                reset: function() {
                    this._attributes = {}
                }
            }, {
                getInstance: function() {
                    return s
                },
                loadDeferredIfNeed: function() {
                    return s ? e.Deferred().resolve(s).promise() : o.loadDeferred()
                },
                initDeferred: function() {
                    var t = e.Deferred();
                    return r.init(function(e) {
                        t.resolve()
                    }), t.promise()
                },
                loadDeferred: function() {
                    var t = o.a();
                    return o.initDeferred().then(function() {
                        var n = e.Deferred();
                        return r.getItem("battle", function(e) {
                            if (!e.result || FF.env.isTutorial()) {
                                s = new o({}), n.resolve(s);
                                return
                            }
                            try {
                                var r = Chara.GOLBEZ.dispel(e.value, t, {
                                        format: i
                                    }).toString(Chara.enc.Utf8),
                                    u = JSON.parse(r);
                                FF.logger.debug("loadStorage", u), s = new o(u), n.resolve(s)
                            } catch (a) {
                                FF.logger.debug(a), o.removeDataDeferred().then(function() {
                                    n.reject()
                                })
                            }
                        }), n.promise()
                    })
                },
                removeDataDeferred: function() {
                    var t = e.Deferred();
                    return r.removeItem("battle", function(e) {
                        e.result ? t.resolve() : t.reject()
                    }), t.promise()
                },
                a: function() {
                    var e = "" + FF.env.userId + FF.env.a;
                    return e
                }
            });
        return o
    }), define("lib/Battle", ["backbone", "./api", "./BattleStorage"], function(e, t, n) {
        return {
            checkSessionAndUpdateDeferred: function(e) {
                return n.loadDeferred().then(function(t) {
                    var r = $.Deferred();
                    return FF.logger.debug(e, t.getSessionKey()), e && t.getSessionKey() === e ? r.resolve() : n.removeDataDeferred().then(function() {
                        r.reject()
                    }, function() {
                        r.reject()
                    }), r.promise()
                })
            }
        }
    }), define("lib/BattleConfig", ["backbone", "./Storage"], function(e, t) {
        var n = {
                ATB: 1,
                NO: 2
            },
            r = {
                speed: 100,
                skipOrder: n.ATB,
                isAutoEnabledAtBattleStart: !1
            },
            i = {
                1: 35,
                2: 50,
                3: 100,
                4: 150,
                5: 200
            },
            s = _.invert(i);
        return {
            loadBattleConfigDeferred: function() {
                var e = $.Deferred();
                return t.init(function() {
                    t.getItem("battleConfig", function(t) {
                        var n = t.result ? JSON.parse(t.value) : {};
                        FF.logger.debug(n), e.resolve(_.defaults(n, r))
                    })
                }), e.promise()
            },
            saveBattleConfigDeferred: function(e) {
                if (!_.isObject(e)) throw new Error("invalid battle_config");
                var n = $.Deferred(),
                    r = JSON.stringify(e);
                return t.setItem("battleConfig", r, function(e) {
                    FF.logger.debug(r, e), n.resolve()
                }), n.promise()
            },
            getBattleSpeedCandidates: function() {
                return i
            },
            getBattleSpeedIndex: function(e) {
                return s[e]
            },
            getSkipOrderCandidates: function() {
                return n
            }
        }
    }), define("lib/Collection", ["backbone"], function(e) {
        return e.Collection.extend({
            getDatastore: function() {
                return FF.datastore
            },
            hasData: function() {
                return this.length ? !0 : !1
            },
            getOrError: function(e) {
                var t = this.get(e);
                if (!t) throw new Error("missing : " + e);
                return t
            },
            dispose: function() {
                this.stopListening(), this.models.forEach(function(e) {
                    e.dispose()
                })
            }
        })
    }), define("lib/CProxyFileLoader", [], function() {
        return {
            loadDeferred: function(e, t) {
                t = t || {};
                var n = kickmotor.options,
                    r = n.fcache.port,
                    i = n.fcache.downloadTimeoutMsec,
                    s = n.clientrContentDirectoryPath,
                    o = n.serverStaticContentUrl,
                    u = new RegExp("^" + s),
                    a = e.replace(u, o),
                    f = _.extend({
                        url: a
                    }, t);
                return $.ajax({
                    url: "http://127.0.0.1:" + r + "/cache",
                    type: "GET",
                    data: f,
                    timeout: i,
                    cache: !1
                })
            }
        }
    }), define("lib/debugApi", ["jquery", "underscore"], function(e, t) {
        var n = function(t, n, r) {
            var i = e.Deferred();
            r = r ? r : {};
            var s = r.type ? r.type.toUpperCase() : "GET",
                o = {
                    url: t,
                    dataType: "json",
                    data: n,
                    type: s,
                    headers: r.headers || {},
                    traditional: !0
                };
            return o.type.toUpperCase() === "POST" && (o.data = JSON.stringify(n), o.contentType = "application/json", o.headers["X-CSRF-Token"] = FFEnv.csrfToken), e.ajax(o).done(function(e) {
                FF.logger.debug(e);
                if (!e.success) {
                    if (e.error && e.error === "UNKNOWN") throw new Error(e.message);
                    i.reject(e)
                } else i.resolve(e)
            }).fail(function(e, t) {
                FF.logger.debug(e, t), i.reject(), alert(e.responseText)
            }), i.promise()
        };
        return {
            debugMenuGetDataDeferred: function(e) {
                return n("/dff/debug/get_data", {})
            },
            debugGetMasterDataDeferred: function(e) {
                return n("/dff/debug/get_master", {
                    table: e
                })
            },
            debugAnimationDataDeferred: function(e) {
                return n("/dff/debug/animation/get_data", {})
            },
            debugGetAbilityData: function(e) {
                return n("/dff/debug/animation/get_abilities", {
                    animation_ids: e
                })
            },
            debugBattleInitDataDeferred: function(e) {
                return n("/dff/debug/animation/battle_init_data", {
                    buddy_ids: e.buddyIds,
                    enemy_id: e.enemyId,
                    bg_id: e.bgId
                })
            },
            debugAbilityUpgradeDeferred: function(e) {
                return n("/dff/debug/ability/upgrade", {
                    id: e
                })
            },
            debugEquipmentChangeLvDeferred: function(e, t) {
                return n("/dff/debug/equipment/change_lv", {
                    user_equipment_id: e,
                    lv: t
                })
            },
            debugEquipmentAddExpDeferred: function(e, t, r) {
                return n("/dff/debug/equipment/add_exp", {
                    user_equipment_id: e,
                    exp: t,
                    hammered_num: r
                })
            },
            debugEquipmentEvolveDeferred: function(e) {
                return n("/dff/debug/equipment/evolve", {
                    user_equipment_id: e
                })
            },
            debugBuddyChangeLvDeferred: function(e, t) {
                return n("/dff/debug/buddy/change_lv", {
                    user_buddy_id: e,
                    lv: t
                })
            },
            debugBuddyAddExpDeferred: function(e, t) {
                return n("/dff/debug/buddy/add_exp", {
                    user_buddy_id: e,
                    exp: t
                })
            },
            debugBuddyRemoveDeferred: function(e) {
                return n("/dff/debug/buddy/remove", {
                    user_buddy_id: e
                })
            },
            debugBuddyUpdateSsExpDeferred: function(e, t, r) {
                return n("/dff/debug/buddy/update_ss_exp", {
                    user_buddy_id: e,
                    soul_strike_id: t,
                    exp: r
                }, {
                    type: "POST"
                })
            },
            debugBuddyMasterSsDeferred: function(e) {
                return n("/dff/debug/buddy/master_all_dedicated_ss", {
                    user_buddy_id: e
                })
            },
            debugBuddyForgetSsDeferred: function(e) {
                return n("/dff/debug/buddy/forget_all_dedicated_ss", {
                    user_buddy_id: e
                })
            },
            debugGachaAssetDeferred: function() {
                return n("/dff/debug/gacha/get_gacha_ab_data")
            },
            debugGachaProbabilityDeferred: function(e) {
                return n("/dff/debug/gacha/probability", {
                    series_id: e
                })
            },
            debugGachaDropHistoriesDeferred: function() {
                return n("/dff/debug/gacha/get_drop_histories")
            },
            debugLoginBonusResetDeferred: function(e) {
                return n("/dff/debug/reset_login_bonus", {
                    id: e
                })
            },
            debugGachaSeriesResetDeferred: function(e) {
                return n("/dff/debug/reset_gacha_series", {
                    id: e
                })
            },
            debugGachaChangeApplyLosingCountDeferred: function(e, t) {
                return n("/dff/debug/gacha/reduced_losing/change_apply_losing_count", {
                    box_id: e,
                    apply_losing_count: t
                })
            },
            debugGiveItemByIdToNumDeferred: function(e) {
                return n("/dff/debug/give_item_by_id_to_num", {
                    id_to_num: e
                }, {
                    type: "POST"
                })
            },
            debugGiveAllItemsDeferred: function(e) {
                return n("/dff/debug/give_all_items", {
                    type: e
                })
            },
            debugGiveVariousItemForGiftboxDeferred: function() {
                return n("/dff/debug/add_various_item_for_giftbox")
            },
            debugSubtractItemDeferred: function(e, t) {
                return n("/dff/debug/subtract_item", {
                    id: e,
                    num: t
                })
            },
            debugCopyUserDataDeferred: function(e) {
                return n("/dff/debug/copy_user_data", {
                    id: e
                })
            },
            debugLoadPlayDataDeferred: function(e) {
                return n("/dff/debug/load_play_data", {
                    file_path: e
                })
            },
            debugDeletePlayDataDeferred: function(e) {
                return n("/dff/debug/delete_play_data", {
                    file_path: e
                })
            },
            debugExportJsonDataDeferred: function(e) {
                return n("/dff/debug/export_json_data", {
                    file_path: e
                })
            },
            debugImportJsonDataDeferred: function(e) {
                return n("/dff/debug/import_json_data", {
                    json_data: e
                }, {
                    type: "POST"
                })
            },
            debugMovieListDeferred: function() {
                return n("/dff/debug/movie_list", {})
            },
            debugMovieDataDeferred: function(e) {
                return n("/dff/debug/movie_data", {
                    file: e
                })
            },
            debugEventSelectPrizeDataDeferred: function() {
                return n("/dff/debug/event/select_prize/get_data", {})
            },
            debugQuestAchieveDeferred: function(e) {
                return n("/dff/debug/quest_achieve", {
                    ids: e
                }, {
                    type: "POST"
                })
            },
            debugQuestDeleteDeferred: function(e) {
                return n("/dff/debug/quest_delete", {
                    ids: e
                }, {
                    type: "POST"
                })
            },
            debugAchieveMissionDeferred: function(e) {
                return n("/dff/debug/achieve_mission", {
                    ids: e
                }, {
                    type: "POST"
                })
            },
            debugDeleteMissionDeferred: function(e) {
                return n("/dff/debug/delete_mission", {
                    ids: e
                }, {
                    type: "POST"
                })
            },
            debugAchieveMissionByTypeDeferred: function(e) {
                return n("/dff/debug/achieve_mission_by_type", {
                    type: e
                }, {
                    type: "POST"
                })
            },
            debugDeleteMissionByTypeDeferred: function(e) {
                return n("/dff/debug/delete_mission_by_type", {
                    type: e
                }, {
                    type: "POST"
                })
            },
            debugBattleEnemyItemDropExpectedValueDeferred: function(e) {
                return n("/dff/debug/get_battle_enemy_drop_item_expected_value", {
                    battle_id: e
                })
            },
            debugBattleEnemyDeferred: function() {
                return n("/dff/debug/battle/get_battle_debug_info", {})
            },
            debugGetUserStrengthDeferred: function(e) {
                var t = {};
                return e && (t.dungeon_id = e), n("/dff/debug/get_user_strength", t, {
                    type: "POST"
                })
            },
            debugGetProgressMapDeferred: function() {
                return n("/dff/debug/progress_map/get_progress_map", {})
            },
            debugClearDungeonDeferred: function(e) {
                return n("/dff/debug/progress_map/clear_dungeons", {
                    ids: e
                }, {
                    type: "POST"
                })
            },
            debugGetTipDownloadDeferred: function(e) {
                return n("/dff/debug/get_tip_download", {
                    tip_download_ids: e
                })
            }
        }
    }), define("lib/Download", ["backbone"], function(e) {
        return {
            hasFileNeededToDownloadDeferred: function(e, t) {
                var n = $.Deferred();
                t = t || {};
                if (!_.isArray(e) || e.length === 0) return n.resolve({
                    needDownload: !1
                }).promise();
                var r = this.convertAssetsToBundle(e);
                return kickmotor.fcache.hasDownloadPrecacheBundle(r, _.bind(function(e) {
                    FF.logger.debug("hasDownloadPrecacheBundle: ", e), e ? n.resolve({
                        needDownload: !1
                    }) : (FF.datastore.stash.download = {}, FF.datastore.stash.download.referer = t.url, FF.datastore.stash.download.isBootstrapTransition = t.isBootstrapTransition, FF.datastore.stash.download.bundle = r, FF.datastore.stash.download.force = t.forceDownload === !0, n.resolve({
                        needDownload: !0
                    }))
                }, this)), n.promise()
            },
            convertAssetsToBundle: function(e) {
                var t = {};
                return _.each(e, function(e) {
                    _.extend(t, e.bundle)
                }), t
            }
        }
    }), define("lib/EventNotifier", ["backbone", "underscore", "lib/EventBase"], function(e, t, n) {
        return n.extend({
            initialize: function() {}
        })
    }), define("lib/Mutex", ["./ClassBase"], function(e) {
        return e.extend({
            _isLocked: !1,
            lock: function() {
                this._isLocked = !0
            },
            unlock: function() {
                this._isLocked = !1
            },
            isLocked: function() {
                return this._isLocked
            }
        })
    }), define("lib/ExternalUserAuth", ["jquery", "underscore", "lib/Storage", "lib/Mutex"], function(e, t, n, r) {
        var i = {
                DONE: 1
            },
            s = "externalUserAuthRequest";
        return {
            _transitionMutex: new r,
            checkExternalUserAuthCallDeferred: function() {
                var t = this,
                    n = e.Deferred();
                return this._transitionMutex.isLocked() ? n.reject().promise() : (this._transitionMutex.lock(), this._fetchExternalQueryDeferred().then(this._checkAndSaveLastExternalRequestDeferred).then(this._callCreateHashApiDeferred).then(this._openExternalSiteDeferred).always(function(e) {
                    t._transitionMutex.unlock(), e && e.hasCallbackUrlOpened ? n.reject() : n.resolve()
                }), n.promise())
            },
            _fetchExternalQueryDeferred: function() {
                var t = this,
                    n = e.Deferred();
                return kickmotor.nativefn.getUrlSchemeLog(function() {
                    if (arguments.length && arguments[0] instanceof Object) {
                        var e = arguments[0],
                            r = t._parseQuery(e);
                        r ? n.resolve(r) : n.reject()
                    } else n.reject()
                }), n.promise()
            },
            _parseQuery: function(e) {
                if (!e || !e.hasOwnProperty("query")) return null;
                var t = e.query;
                return t instanceof Object ? !t.hasOwnProperty("cmd") || t.cmd != "authorizeExternalRequest" ? null : t.hasOwnProperty("requestId") ? t.hasOwnProperty("guestId") ? t.hasOwnProperty("callbackUrl") ? t : null : null : null : null
            },
            _checkAndSaveLastExternalRequestDeferred: function(t) {
                var r = e.Deferred(),
                    o = t.requestId;
                return o ? (n.init(function(e) {
                    n.getItem(s, function(e) {
                        var u = e.result ? JSON.parse(e.value) : {},
                            a = u[o] === i.DONE;
                        a ? r.reject() : (u[o] = i.DONE, n.setItem(s, JSON.stringify(u), function(e) {
                            r.resolve(t)
                        }))
                    })
                }), r.promise()) : r.reject().promise()
            },
            _callCreateHashApiDeferred: function(e) {
                throw new Error("implement me")
            },
            _openExternalSiteDeferred: function(t) {
                var n = e.Deferred(),
                    r = decodeURIComponent(t.callbackUrl),
                    i;
                try {
                    i = t.hasOwnProperty("callbackParams") ? JSON.parse(decodeURIComponent(t.callbackParams)) : {}
                } catch (s) {
                    return n.reject().promise()
                }
                i.i = t.inviteId, i.h = t.hash;
                var o = [];
                for (var u in i) o.push(u + "=" + i[u]);
                var a = r + "?" + o.join("&");
                return t.hasCallbackUrlOpened = !0, kickmotor.platform.openExternalURL(a), n.resolve(t).promise()
            }
        }
    }), define("lib/FFView", ["underscore", "jquery", "backbone"], function(e, t, n) {
        var r = n.View.extend({
            initialize: function() {
                this.ab = {}, this.abv = {}
            },
            dispose: function() {
                var t = this;
                e.each(this.ab, function(e, n) {
                    e.deleteNode().process(), t.ab[n] = null
                }), this.remove()
            }
        });
        return r
    }), define("lib/GooglePlayGameService", ["jquery", "underscore"], function(e, t) {
        var n = {
            sendAchievement: function(e) {
                if (!FF.env.isAndroid()) return;
                var n = this;
                kickmotor.googleplaygame.isConnected(function(n) {
                    n.isConnected && t.each(e, function(e) {
                        FF.logger.debug("Unlock Achievement: " + e.achievementId), kickmotor.googleplaygame.unlockAchievement(e.achievementId)
                    })
                })
            },
            loginCheckDeferred: function() {
                var t = e.Deferred();
                return FF.env.isAndroid() ? (kickmotor.googleplaygame.isConnected(function(e) {
                    e.isConnected ? (FF.logger.debug("Connected to Google Plus !!"), t.resolve()) : (FF.logger.debug("Not Connect !!"), t.reject())
                }), t.promise()) : t.resolve().promise()
            },
            loginDeferred: function() {
                var t = e.Deferred();
                return FF.env.isAndroid() ? (kickmotor.googleplaygame.signIn(function(e) {
                    e.isConnected ? (FF.logger.debug("Login Success!!"), t.resolve()) : (FF.logger.debug("Login Failed."), t.reject())
                }), t.promise()) : t.resolve().promise()
            },
            logout: function() {
                if (!FF.env.isAndroid()) return;
                kickmotor.googleplaygame.signOut()
            },
            openAchievement: function() {
                if (!FF.env.isAndroid()) return;
                kickmotor.googleplaygame.openAchievementUI()
            }
        };
        return n
    }), define("lib/JsLoader", ["require"], function(e) {
        return {
            makeUrl: function(e) {
                var t = FF.env.staticDir,
                    n = t + "/js/direct/" + e + ".js";
                return FF.logger.debug("dynamicload", n), FF.env.isOptimized ? pUrl(n) : n
            },
            load: function(t, n) {
                var r = this;
                t = _.map(t, function(e) {
                    return r.makeUrl(e)
                }), e(t, function() {
                    n.apply(void 0, arguments)
                })
            }
        }
    }), define("lib/LayoutBase", ["underscore", "jquery", "backbone", "sprintf", "util", "lib/ModalBase", "lib/TemplateRenderer", "components/ImageWatcher"], function(e, t, n, r, i, s, o, u) {
        var a = {
            BACKGROUND_TYPE: {
                GAME_TOP: "is-bg-type-top",
                WORLD_HISTORY: "is-bg-type-history",
                WORLD_FORCE: "is-bg-type-force"
            },
            BTN_BACK_TRIGGER_EVENT: "onClickBack"
        };
        return n.View.extend({
            el: t("#content"),
            events: {},
            backgroundType: undefined,
            categoryType: undefined,
            contentType: undefined,
            designType: undefined,
            _isMoved: !1,
            _isStarted: !1,
            _sensitivity: 5,
            _startPoint: {},
            _movedPoint: {},
            _diffPoint: {},
            initialize: function() {
                this.setupLayout(), this.backEventHandlerFunc = this.getBackEventHandlerFunc() ? this.getBackEventHandlerFunc().bind(this) : void 0
            },
            getBackEventHandlerFunc: function() {
                return this[a.BTN_BACK_TRIGGER_EVENT]
            },
            onBackEvent: function() {
                if (!this.backEventHandlerFunc) return;
                t("[data-app-btn-back]").on("anchorsbeforejump", this.backEventHandlerFunc)
            },
            offBackEvent: function() {
                if (!this.backEventHandlerFunc) return;
                t("[data-app-btn-back]").off("anchorsbeforejump", this.backEventHandlerFunc)
            },
            registerInOverlay: function(e) {
                FF.router.overlay.registerChildren(e)
            },
            setupLayout: function() {
                if (this.contentType || this.designType) FF.router.globalcontrol.apply(this.contentType, this.designType), FF.router.globalcontrol.updateGlobalHilight(this.categoryType);
                this.setupBackgroundType(), this.showDeco()
            },
            setupBackgroundType: function() {
                var n = this,
                    r = this.$el[0].className.split(" "),
                    i = r.length;
                e.each(r, function(n) {
                    e.find(a.BACKGROUND_TYPE, function(e) {
                        e === n && t("[data-app-layer-bg]").removeClass(e)
                    })
                }), this.backgroundType && t("[data-app-layer-bg]").addClass(a.BACKGROUND_TYPE[this.backgroundType])
            },
            startUpSlideInAnimation: function() {
                window.setTimeout(function() {
                    var e = t(".anim-slide-in-parent li"),
                        n = "animate",
                        r = 50,
                        i = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)";
                    t.each(e, function(n) {
                        e.eq(n).css({
                            "-webkit-transition-delay": n * r + "ms",
                            "transition-delay": n * r + "ms",
                            "-webkit-transform": i,
                            transform: i
                        }).one("webkitTransitioinEnd transitionend", function() {
                            t(this).removeClass("animate").removeAttr("style").css({
                                "-webkit-transform": "initial",
                                transform: "initial"
                            })
                        })
                    }), t(".anim-slide-in-parent").addClass(n)
                }, 10)
            },
            render: function(e, n) {
                t(document).trigger("checkModalIsExist"), n = n || {}, n.isWWRegion = FF.env.isWWRegion();
                var r = o.process(e, n);
                this.$el.css("position", "").css("visibility", "").html(r), this.onBackEvent()
            },
            processAfterRender: function(e) {
                FF.router.loading.lock();
                var t = this;
                e = i.option({
                    notShowDeshi: !1,
                    isCrawlImgTag: !1,
                    el: this.$el
                }, e);
                var n = new u(e),
                    r = e.notShowDeshi ? "lock" : "show";
                this.listenTo(n, "takingTime", function() {
                    FF.router.loading[r]()
                }).listenTo(n, "allImagesAreCompleted someImagesAreCompleted", this.processAfterContentLoad.bind(this)), this.imagewatcher = n
            },
            processAfterContentLoad: function() {
                this.stopListening(this.imagewatcher, "takingTime"), this.imagewatcher && this.imagewatcher.dispose(), this.imagewatcher = null, this.enableUserTouch(), FF.router.loading.hide(s.isModalOpening()), FF.router.toast && FF.router.toast.bake()
            },
            setCurrentLocationHash: function() {
                FF.datastore.stash.backPageHash = window.location.hash
            },
            getCurrentLocationHash: function() {
                var e = FF.datastore.stash.backPageHash;
                return e && delete FF.datastore.stash.backPageHash, e
            },
            showDeco: function() {
                t("#headDeco, #footDeco").removeClass("is-disable")
            },
            setBackgroundImage: function(e) {
                var n = t("[data-app-layer-bg]");
                !n.length || n.css("background", "url(" + pUrl(e) + ") 0 50% no-repeat").css("background-size", "100% auto")
            },
            resetBackgroundImage: function() {
                var e = t("[data-app-layer-bg]");
                !e.length || e.css("background", "").css("background-size", "")
            },
            blurSelectorOrder: function() {
                if (!t("[data-app-selector-order]").length) return;
                t("[data-app-selector-order]").blur()
            },
            hide: function() {
                this.$el.hide()
            },
            show: function() {
                this.$el.show()
            },
            onCommonTouchStart: function(e) {
                this._isStarted = !0, this._isMoved = !1, this._startPoint = {
                    x: e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0].clientX : e.touches.clientX ? e.touches[0].clientX : e,
                    y: e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0].clientY : e.touches.clientY ? e.touches[0].clientY : e
                }, this.disableUserTouch(), t(e.currentTarget).one("anchorsonmove", t.proxy(this.onCommonAnchorsMove, this)).one("anchorsonend", t.proxy(this.onCommonTouchEnd, this))
            },
            onCommonTouchMove: function(e) {
                this._movedPoint = {
                    x: e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0].clientX : e.touches.clientX ? e.touches[0].clientX : e,
                    y: e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0].clientY : e.touches.clientY ? e.touches[0].clientY : e
                }, this._diffPoint = {
                    x: Math.abs(this._startPoint.x - this._movedPoint.x),
                    y: Math.abs(this._startPoint.y - this._movedPoint.y)
                }, !this._isMoved && this._isStarted && (this._sensitivity < this._diffPoint.x || this._sensitivity < this._diffPoint.y) && (this._isMoved = !0), this.enableUserTouch()
            },
            onCommonAnchorsMove: function(e) {
                t(e.currentTarget).off("anchorsonend")
            },
            onCommonTouchEnd: function(e) {
                var t = this._isStarted && !this._isMoved ? "disableUserTouch" : "enableUserTouch";
                this[t]()
            },
            disableUserTouch: function() {
                t(document).trigger("disableUserTouch")
            },
            enableUserTouch: function() {
                t(document).trigger("enableUserTouch")
            },
            lockScreenBeforeGoExternalLink: function() {
                FF.env.isAndroid() && (FF.router.loading.lock(), kickmotor.nativefn.onApplicationForeground = function() {
                    FF.router.loading.unlock(), FF.router.setupOnApplicationForeground()
                })
            },
            moveCursorToEndOf: function(e) {
                window.setTimeout(function() {
                    var t = e.value.length;
                    e.setSelectionRange(t, t)
                }, 0)
            },
            forceUpdateBySelector: function(e) {
                if (!FF.env.isAndroid()) return;
                var n = t(e);
                n.fastCss("opacity", .99), window.setTimeout(function() {
                    n.fastCss("opacity", 1)
                }, 0)
            },
            dispose: function() {
                FF.router.toast && !FF.router.toast.hasTopping() && FF.router.toast.eatAll(), this.imagewatcher && this.imagewatcher.dispose(), this.backEventHandlerFunc && (this.offBackEvent(), this.backEventHandlerFunc = null), this.$el.empty(), this.stopListening(), this.undelegateEvents()
            }
        })
    }), define("lib/MemoryCache", ["underscore", "util", "lib/ClassBase"], function(e, t, n) {
        return n.extend({
            get: function(r) {
                var i = n.prototype.get.call(this, r);
                return e.isUndefined(i) ? null : t.getTimeAsSec() <= i.expires ? i.value : null
            },
            set: function(e, r, i) {
                n.prototype.set.call(this, e, {
                    value: r,
                    expires: t.getTimeAsSec() + i
                })
            },
            cacheableDeferred: function(t, n, r) {
                var i = this,
                    s = i.get(t);
                return e.isNull(s) ? n().then(function(e) {
                    return i.set(t, e, r), $.Deferred().resolve(e).promise()
                }) : $.Deferred().resolve(s).promise()
            }
        })
    }), define("lib/ModalStack", ["jquery", "underscore", "backbone", "./EventBase"], function(e, t, n, r) {
        return r.extend({
            ModalStackNode: {
                initializer: void 0,
                initDeferred: void 0,
                renderer: void 0,
                opener: void 0,
                onStack: void 0,
                onPop: void 0,
                onResume: void 0,
                totem: !1,
                _modalClass: void 0,
                _modal: void 0
            },
            initialize: function() {
                this._stack = [], this._head = -1, this._autoDispose = !0, this._guardMultiplePush = !0, this._onComplete = void 0, this._isHidden = !1
            },
            setAutoDispose: function(e) {
                this._autoDispose = e
            },
            setGuardMultiplePushMode: function(e) {
                this._guardMultiplePush = e
            },
            setOnComplete: function(e) {
                this._onComplete = e
            },
            setIsHidden: function(e) {
                this._isHidden = e
            },
            isHidden: function() {
                return this._isHidden
            },
            push: function(e, n) {
                var r = this;
                if (!e) throw new Error("ModalStack :: modal class must be required.");
                if (this._guardMultiplePush && this._isEqualToCurrentModalClass(e)) return;
                var i = new t.defaults(n, this.ModalStackNode);
                i._modalClass = e, this._onStack(this._head), this._exitDeferred(this._head).then(function() {
                    return r._forwardHead(i), r._enterDeferred(r._head)
                })
            },
            pop: function(t) {
                var n = this;
                if (this._isEmpty()) return;
                this._exitDeferred(this._head).then(function() {
                    var r = e.Deferred();
                    return n._backHead(t), n._isEmpty() ? (n._finalize(t), r.reject().promise()) : r.resolve().promise()
                }).then(function() {
                    return n._enterDeferred(n._head)
                }).then(function() {
                    n._onResume(n._head, t)
                })
            },
            popToTotem: function(t, n) {
                var r = this;
                if (this._isEmpty()) return;
                this._exitDeferred(this._head).then(function() {
                    var i = e.Deferred();
                    return r._backHeadToTotem(t, n), r._isEmpty() ? (r._finalize(n), i.reject().promise()) : i.resolve().promise()
                }).then(function() {
                    return r._enterDeferred(r._head)
                }).then(function() {
                    r._onResume(r._head, n)
                })
            },
            popAll: function(e) {
                if (this._isEmpty()) return;
                this._exitDeferred(this._head).then(function() {
                    while (this._head >= 0) this._backHead(e);
                    this._finalize(e)
                }.bind(this))
            },
            dispose: function() {
                this.stopListening(), this._disposeNodes(), this._stack = [], this._head = -1, this._onComplete = void 0, this._isHidden = !1
            },
            _initModal: function(e) {
                var t = e._modalClass,
                    n;
                return e.initializer ? n = e.initializer(t) : n = new t, e._modal = n, n
            },
            _disposeNodes: function() {
                t.each(this._stack, function(e) {
                    e._modal && e._modal.end()
                })
            },
            _finalize: function(e) {
                this._onComplete && this._onComplete(e), this._autoDispose && this.dispose()
            },
            _isEmpty: function() {
                return this._stack.length === 0
            },
            _hasTotem: function(e) {
                var t = this._nodeAt(e);
                return t ? t.totem : !1
            },
            _nodeAt: function(e) {
                return e === -1 ? void 0 : this._stack[e]
            },
            _modalAt: function(e) {
                var t = this._nodeAt(e);
                return t ? t._modal : void 0
            },
            _isEqualToCurrentModalClass: function(e) {
                if (this._head === -1) return !1;
                var t = this._nodeAt(this._head);
                return e === t._modalClass
            },
            _onStack: function(e) {
                var t = this._nodeAt(e);
                if (!t) return;
                t.onStack && t.onStack(t._modal)
            },
            _onResume: function(e, t) {
                var n = this._nodeAt(e);
                if (!n) return;
                n.onResume && n.onResume(n._modal, t)
            },
            _forwardHead: function(e) {
                this._stack.push(e), this._head = this._stack.length - 1
            },
            _backHead: function(e) {
                var t = this._stack.pop();
                this._head = this._stack.length - 1, t.onPop && t.onPop(t._modal, e)
            },
            _backHeadToTotem: function(e, t) {
                e = e || 1;
                var n = 0;
                while (this._head >= 0 && n < e) this._backHead(t), this._hasTotem(this._head) && ++n
            },
            _enterDeferred: function(t) {
                var n = this,
                    r = e.Deferred(),
                    i = this._nodeAt(t);
                if (!i) return r.resolve().promise();
                var s = this._initModal(i),
                    o = i.initDeferred || this._initDeferred;
                return o(s).then(function() {
                    i.renderer && i.renderer(s), n._openModal(i), n._isHidden = !1, r.resolve()
                }), r.promise()
            },
            _openModal: function(e) {
                var t = e._modal;
                e.opener ? e.opener(t) : (FF.router.overlay.registerChildren(t), t.open())
            },
            _exitDeferred: function(t) {
                var n = e.Deferred(),
                    r = this._modalAt(t);
                return r ? (this._closeModalDeferred(n, r), n.promise()) : n.resolve().promise()
            },
            _closeModalDeferred: function(e, t) {
                e.resolve(), t.end()
            },
            _initDeferred: function(t) {
                return e.Deferred().resolve().promise()
            }
        })
    }), define("lib/Model", ["backbone", "util"], function(e, t) {
        return e.Model.extend({
            getDatastore: function() {
                return FF.datastore
            },
            hasAttributes: function() {
                return Object.keys(this.attributes).length ? !0 : !1
            },
            dispose: function() {
                this.stopListening()
            }
        })
    }), define("lib/NameConventionFsm", ["util", "lib/EventBase"], function(e, t) {
        function n(t, n, r) {
            var i = e.camelize(["process_for_state", n, r].join("_"), {
                forceLower: !0
            });
            t[i] && t[i]()
        }
        return t.extend({
            update: function() {
                n(this, this.get("state"), "update")
            },
            changeState: function(e) {
                var t = this.get("state");
                t && n(this, t, "exit"), this.set("state", e), n(this, e, "entry")
            },
            isState: function(e) {
                return this.get("state") === e
            }
        })
    }), define("lib/PartialTemplate", ["lib/ClassBase", "lib/TemplateRenderer"], function(e, t) {
        return e.extend({
            initialize: function() {
                this._templates = {}
            },
            render: function(e, n) {
                var r = this.get(e);
                return t.process(r, n)
            },
            load: function(e, t) {
                var n = this;
                require(e, function() {
                    for (var r = 0; r < e.length; r++) n._templates[e[r]] = arguments[r];
                    t && t(n)
                })
            },
            get: function(e) {
                var t = this._templates[e];
                if (!t) throw new Error("Missing parial template : " + e);
                return t
            }
        })
    }), define("lib/RemoteLogger", ["jquery", "underscore", "lib/api"], function(e, t, n) {
        var r = {
            _remoteNotificationInfomations: [],
            pushRemoteNotificationInfomation: function(e) {
                return e.extras = e.extras || {}, this._remoteNotificationInfomations.push({
                    st: e.status,
                    k1: e.extras.key1,
                    k2: e.extras.key2,
                    k3: e.extras.key3,
                    k4: e.extras.key4,
                    k5: e.extras.key5
                }), this
            },
            logRemoteNotificationIfNeedDeferred: function() {
                var t = e.Deferred();
                if (this._remoteNotificationInfomations.length > 0) {
                    var r = this._remoteNotificationInfomations;
                    this._remoteNotificationInfomations = [], n.logRemoteNotificationDeferred(r).then(function() {
                        t.resolve(this)
                    }, function() {
                        t.reject(this)
                    })
                } else t.reject(this);
                return t.promise()
            }
        };
        return r
    }), define("lib/Scene", ["underscore", "lib/ErrorHandler", "lib/Events", "lib/ClassBase"], function(e, t, n, r) {
        var i = r.extend({});
        return e.extend(i.prototype, n), i.extend({
            needsRipple: !0,
            setupDeferred: function() {},
            start: function() {},
            dispose: function() {
                this.layoutView && (this.layoutView.dispose(), this.layoutView = null), $("#content").empty(), $("#content").unbind(), this.stopListening()
            },
            getErrorHandler: function() {
                return t
            }
        })
    }), define("lib/SeparatedModel", ["./Model"], function(e) {
        var t = e.extend({
                constructor: function(t, n) {
                    this._originalAttributes = {}, e.apply(this, arguments)
                },
                definedAttributesSchema: function() {
                    return this.attributeSchema && _.keys(this.attributeSchema).length > 0
                },
                getAttributes: function() {
                    return _.extend(this.attributes, this._originalAttributes)
                },
                get: function(t) {
                    return this.definedAttributesSchema() ? _.has(this.attributeSchema, t) ? this.attributes[t] : this._originalAttributes[t] : e.prototype.get.apply(this, arguments)
                },
                set: function() {
                    return this.definedAttributesSchema() ? this._set.apply(this, arguments) : e.prototype.set.apply(this, arguments)
                },
                _set: function(t, n, r) {
                    var i = this,
                        s;
                    typeof t == "object" ? (s = t, r = n) : (s = {})[t] = n, r = r || {};
                    var o = {};
                    _.each(i.attributeSchema, function(e, t) {
                        _.has(s, t) && (o[t] = s[t])
                    }), this._originalAttributes = _.extend(this._originalAttributes, s), e.prototype.set.apply(this, [o, r])
                },
                clone: function() {
                    return new this.constructor(this.getAttributes())
                }
            }),
            n = ["keys", "values", "pairs", "invert", "pick", "omit"];
        return _.each(n, function(e) {
            t.prototype[e] = function() {
                var t = Array.prototype.slice.call(arguments);
                return t.unshift(this.getAttributes()), _[e].apply(_, t)
            }
        }), t
    }), define("lib/SoundMgr", ["util", "lib/ClassBase", "lib/CProxyFileLoader"], function(e, t, n) {
        var r = {
            BGM_DEFAULT: "bgm_12_001",
            BGM_CID_BLACKSMITH: "bgm_04_024",
            BGM_AIRSHIP_BLACKJACK: "bgm_06_040",
            SE_CHOOSE: "se_common_100001",
            SE_DECIDE: "se_common_100003",
            SE_UNDERSTAND: "se_common_100004",
            SE_CANCEL: "se_common_100006",
            SE_NG: "se_common_100005",
            SE_PAY_GIL: "se_common_100028",
            SE_ENCOUNT: "se_common_100038",
            SE_ESCAPE: "se_common_100025"
        };
        return t.extend({
            initialize: function() {
                t.prototype.initialize.apply(this, arguments), this._bgm = void 0
            },
            playMusic: function(t, r) {
                FF.logger.debug("play music ", t, r);
                if (!FF.env.isNative()) return;
                if (!t) return FF.logger.warn("missing bgm parameter"), this.playDefaultBgm();
                var i = this;
                r = e.option({
                    force: !1,
                    fade: !1,
                    oneshot: !1,
                    callback: !1
                }, r);
                if (!r.force && this._bgm === t) return;
                this._bgm = t;
                if (FF.env.canUseDealSound()) this._playMusicByUsingDealSound(t, r);
                else {
                    var s = "/Content/lang/bgm/bgm_m4a/" + t + ".json";
                    n.loadDeferred(s).done(function(e) {
                        FF.logger.debug("intro-loop-data ", e), kickmotor.sound.playIntroLoopMusic(t, e.start, e.end, function(e) {
                            e.isFileExist ? FF.logger.debug("cached_bgm is loaded successfully.") : (FF.logger.error("cached_bgm is not found. default_bgm will play."), i._bgm = void 0, i.playDefaultBgm())
                        })
                    }).fail(function(e) {
                        FF.logger.error(e), i._bgm = void 0, i.playDefaultBgm()
                    })
                }
            },
            _playMusicByUsingDealSound: function(e, t) {
                var n = this;
                kickmotor.sound.playMusic(e, t.fade, t.oneshot, function(e) {
                    e.isFileExist ? FF.logger.debug("cached_bgm is loaded successfully.") : (FF.logger.error("cached_bgm is not found. default_bgm will play."), n._bgm = void 0, n.playDefaultBgm())
                })
            },
            stopMusic: function(e) {
                FF.logger.debug("stop music", e), _.isObject(e) || (e = {});
                if (!FF.env.isNative()) return;
                this._bgm = void 0, kickmotor.sound.stopMusic(!!e.fade)
            },
            playEffect: function(e, t) {
                _.isObject(t) || (t = {});
                if (!FF.env.isNative()) return;
                kickmotor.sound.playEffect(e, !!t.loop)
            },
            stopEffect: function() {
                if (!FF.env.isNative()) return;
                kickmotor.sound.stopEffect()
            },
            playDefaultBgm: function() {
                this.playMusic(r.BGM_DEFAULT)
            },
            playCidBlacksmithBgm: function() {
                this.playMusic(r.BGM_CID_BLACKSMITH)
            },
            playAirshipBlackjackBgm: function() {
                this.playMusic(r.BGM_AIRSHIP_BLACKJACK)
            },
            playChooseEffect: function() {
                this.playEffectByType("SE_CHOOSE")
            },
            playDecideEffect: function() {
                this.playEffectByType("SE_DECIDE")
            },
            playUnderstandEffect: function() {
                this.playEffectByType("SE_UNDERSTAND")
            },
            playCancelEffect: function() {
                this.playEffectByType("SE_CANCEL")
            },
            playNgEffect: function() {
                this.playEffectByType("SE_NG")
            },
            playPayGilEffect: function() {
                this.playEffectByType("SE_PAY_GIL")
            },
            playEncountEffect: function() {
                this.playEffectByType("SE_ENCOUNT")
            },
            playEscapeEffect: function() {
                this.playEffectByType("SE_ESCAPE")
            },
            playEffectByType: function(e, t) {
                var n = r[e];
                if (!n) throw new Error("Sound effect not found. type:" + e);
                if (!FF.env.isNative()) return;
                this.playEffect(n, t)
            },
            pause: function() {
                if (!FF.env.isNative()) return;
                kickmotor.sound.pause()
            },
            resume: function() {
                if (!FF.env.isNative()) return;
                kickmotor.sound.resume()
            }
        })
    }), define("lib/TimeMeasure", [], function() {
        var e = {},
            t = {},
            n = function() {
                return (new Date).getTime()
            },
            r = {
                start: function(t) {
                    FF.logger.time(t), e[t] = n()
                },
                end: function(r) {
                    var i = e[r];
                    if (!i) return -1;
                    delete e[r], FF.logger.timeEnd(r);
                    var s = t[r] = n() - i;
                    return s
                },
                clearResults: function() {
                    t = {}
                },
                getResult: function(e) {
                    var n = t[e];
                    return n === void 0 ? -1 : n
                }
            };
        return r
    }), define("lib/ValidatorLite", [], function() {
        function i(e, t, n) {
            var r = this;
            r.object = t, r.accepted = {}, r.schema = e, r.errors = [], _.each(n, function(e, t) {
                r[t] = e
            })
        }

        function s(e, t, n) {
            var r;
            return n = n || s.options, n = n || {}, r = (new i(e, t, n)).run(), !n.noException && r.hasError() && r.exception(), r
        }

        function o(e) {
            return !_.isUndefined(e)
        }
        var e = /^[0-9]+$/,
            t = /^[+-]?[0-9]+$/,
            n = /^[+-]?[0-9]*[\.]?[0-9]+$/,
            r = /^(true|false|0|1)$/;
        return s.re = {}, s.ValidatorLite = i, i.prototype.hasError = function() {
            return this.errors.length ? !0 : !1
        }, i.prototype.valid = function() {
            return this.accepted
        }, i.prototype.error = function() {
            return this.errors
        }, i.prototype.exception = function() {
            throw new Error(this.error())
        }, i.prototype.defaultMessage = "Error : ", i.prototype.malformedMessage = "The data is not Object", i.prototype.walk = function(e, t, n) {
            var r = this;
            return e = e || r.schema, t = t || r.object, n = n || r.accepted, _.isObject(t) ? (_.each(e, function(e, i) {
                var s = t[i];
                r.validate(i, e, s) && (e.type === "uint" || e.type === "number" || e.type === "float" ? n[i] = +s || 0 : e.type === "boolean" ? n[i] = /^(true|1)$/.test(s) ? !0 : !1 : e.type === "object" ? n[i] = s ? s : {} : e.type === "array" ? n[i] = s ? s : [] : n[i] = s)
            }, r), r) : (r.errors.push(new Error(r.malformedMessage)), r)
        }, i.prototype.run = i.prototype.walk, i.prototype.validate = function(e, t, n, r) {
            var i = this,
                s = (t.message || i.message || i.defaultMessage) + " " + e + " : " + n,
                u = !1,
                a = !0;
            if (!o(n) && !t.optional) return i.errors.push(new Error(s)), !1;
            for (var f in t) {
                u = ["message", "values", "norecursive", "optional"].indexOf(f) >= 0, a = i[f] && i[f](t[f], n);
                if (u || a) continue;
                if (t.optional && !n) continue;
                return r || i.errors.push(new Error(s)), !1
            }
            return !0
        }, i.prototype.max = function(e, t) {
            return t <= e
        }, i.prototype.min = function(e, t) {
            return t >= e
        }, i.prototype.len = function(e, t) {
            return t.length === e
        }, i.prototype.minLen = function(e, t) {
            return t.length >= e
        }, i.prototype.maxLen = function(e, t) {
            return t.length <= e
        }, i.prototype.match = function(e, t) {
            return e.test(t)
        }, i.prototype.type = function(i, s) {
            switch (i) {
                case "number":
                    return t.test(s);
                case "string":
                    return _.isString(s);
                case "boolean":
                    return r.test(s);
                case "object":
                    return _.isObject(s);
                case "array":
                    return _.isArray(s);
                case "regexp":
                    return _.isRegExp(s);
                case "date":
                    return _.isDate(s);
                case "uint":
                    return e.test(s);
                case "float":
                    return n.test(s);
                case "function":
                    return _.isFunction(s);
                case "date":
                    return _.isDate(s);
                default:
                    return _.isString(i) ? typeof s === i : s instanceof i
            }
        }, i.prototype.custom = function(e, t) {
            return e.call(this, t)
        }, i.prototype.required = function(e, t) {
            return !!t
        }, i.prototype.any = function(e, t) {
            var n = !1;
            return _.each(e, function(e) {
                if (t === e) return n = !0, !0
            }), n
        }, i.prototype.equal = function(e, t) {
            return e === t
        }, i.prototype.between = function(e, t) {
            return t >= e[0] && t <= e[1]
        }, s
    }), define("lib/Xpromo", ["jquery", "underscore", "kickmotor", "lib/api"], function(e, t, n, r) {
        var i = function(t) {
                var n = e.Deferred();
                return s(t).then(function(e) {
                    o(t)
                }).then(function(e) {
                    n.resolve(e)
                }), n.promise()
            },
            s = function(t) {
                var r = e.Deferred();
                return n.platform.sendAdCustomEvent(t, function(e) {
                    e.success ? r.resolve(e) : r.reject(e)
                }), r.promise()
            },
            o = function(e) {
                return r.requestDeferred("/dff/xpromo/complete_sending", {
                    custom_event_name: e
                }, {
                    type: "POST"
                })
            };
        return {
            SendCustomEventIfNeed: function() {
                var e = FF.datastore.xpromoCustomEventCollection.first();
                if (e) {
                    var t = e.get("custom_event_name");
                    i(t).done(function(e) {
                        FF.logger.debug("Success Send CustomEvent"), FF.datastore.xpromoCustomEventCollection.remove(t)
                    })
                }
            }
        }
    }), define("components/Accordion", ["components/ComponentBase"], function(e) {
        return e.extend({
            _viewName: "Accordion",
            _defaults: {
                parentSelector: undefined,
                childrenSelector: undefined,
                isSingleView: !0
            },
            initialize: function() {
                e.prototype.initialize.apply(this, arguments), this._checkOptions(), this._initializeVariables(), this._bindEvents()
            },
            _initializeVariables: function() {
                this._parents = $(this._options.parentSelector), this._children = $(this._options.childrenSelector)
            },
            _bindEvents: function() {
                var e = this;
                this._parents.on("anchorsbeforejump.accordion", function(t) {
                    e._onTapParent(t)
                })
            },
            _onTapParent: function(e) {
                var t = $(e.originalEvent.target),
                    n = this._parents.index(t),
                    r = this._children,
                    i = r.eq(n),
                    s = i.css("display") !== "none",
                    o = s ? "hide" : "show";
                this._options.isSingleView && this._children.hide(), this._children.eq(n)[o](), this.trigger("displayChange")
            },
            dispose: function() {
                this._parents.off(".accordion"), e.prototype.dispose.apply(this, arguments)
            }
        })
    }), define("components/AllCheck", ["jquery", "components/ComponentBase"], function(e, t) {
        return t.extend({
            _viewName: "AllCheck",
            initialize: function() {
                this._initializeVariables(), this._collectElements(), this._setDefaultState(), this._addEventListener()
            },
            _initializeVariables: function() {
                this._is_allChecked = !1, this._elements = {
                    master: undefined,
                    slave: undefined
                }
            },
            _collectElements: function() {
                this._elements.master = this.$el.find("[data-ui-allcheck-master]"), this._elements.slave = this.$el.find("[data-ui-allcheck-slave]")
            },
            _setDefaultState: function() {
                this._elements.master.eq(0).prop("checked") && (this._is_allChecked = !0)
            },
            _addEventListener: function() {
                var e = this;
                if (!this._elements.master.size() || !this._elements.slave.size()) return;
                this._eventHandler = {
                    master: function(t) {
                        e._onChangeMaster(t)
                    },
                    slave: function(t) {
                        e._onChangeSlave(t)
                    }
                }, this._elements.master.on("change", this._eventHandler.master), this._elements.slave.on("change", this._eventHandler.slave)
            },
            _onChangeMaster: function(t) {
                var n = !this._is_allChecked;
                this._elements.slave.each(function(t, r) {
                    var i = e(this);
                    i.prop("disabled") || i.prop("checked", n)
                }), this._is_allChecked = n, this._check(t)
            },
            _onChangeSlave: function(t) {
                var n = this._elements.slave.map(function() {
                        if (!e(this).prop("disabled")) return e(this).prop("checked")
                    }),
                    r = n.toArray().indexOf(!1) !== -1 ? !1 : !0;
                this._is_allChecked = r, this._check(t)
            },
            _check: function(t) {
                var n = this._is_allChecked;
                this._elements.master.each(function(t, r) {
                    e(r).prop("checked", n)
                }), t.preventDefault(), t.stopPropagation()
            },
            dispose: function() {
                this._eventHandler && (this._elements.master.off("change", this._eventHandler.master), this._elements.slave.off("change", this._eventHandler.slave), this._eventHandler = null), this._elements.master = null, this._elements.slave = null, t.prototype.dispose.call(this)
            }
        })
    }), define("components/AutoScroll", ["components/ComponentBase"], function(e) {
        return e.extend({
            _viewName: "AutoScroll",
            _defaults: {
                scrollTo: undefined,
                immediate: !1,
                adjust: 0
            },
            initialize: function() {
                this._checkOptions(), this._setOffsetAsStatic(), this._setScrollPosition(), this._options.immediate && this.doScroll()
            },
            _setOffsetAsStatic: function() {
                this._offsetTop = this._options.scrollTo.offset().top
            },
            _setScrollPosition: function() {
                typeof this._options.scrollTo != "object" ? this._scrollTo = parseInt(this._options.scrollTo, 10) : this._scrollTo = this._offsetTop, this._scrollTo += this._options.adjust
            },
            doScroll: function() {
                this.$el.scrollTop(this._scrollTo)
            }
        })
    }), define("components/Button", ["components/ComponentBase"], function(e) {
        return e.extend({
            _viewName: "Button",
            _defaults: {
                message: undefined,
                disableClasses: "is-disable mbgaui-disabled"
            },
            events: {
                "anchorsbeforejump .button": "triggerMessage"
            },
            initialize: function() {
                e.prototype.initialize.apply(this, arguments), this._initializeVariables(), this._defineButton(), this._checkOptions()
            },
            _initializeVariables: function() {
                this._button = undefined
            },
            _defineButton: function() {
                var e = this.$el.find(".button");
                this._button = e.size() ? e : this.$el
            },
            triggerMessage: function(e) {
                this.trigger("message", {
                    message: this._options.message,
                    originalEvent: e
                })
            },
            disable: function() {
                this._button.addClass(this._options.disableClasses)
            },
            enable: function() {
                this._button.removeClass(this._options.disableClasses)
            }
        })
    }), define("components/Carousel", ["jquery", "components/ComponentBase"], function(e, t) {
        var n = "webkitTransitionEnd transitionend";
        return t.extend({
            _viewName: "Carousel",
            _defaults: {
                isLoop: !1,
                isRepeat: !1,
                autoPlay: !1,
                autoPlayDelay: 3e3,
                startUp: 0,
                direction: 1,
                btnPrev: undefined,
                btnNext: undefined
            },
            initialize: function() {
                t.prototype.initialize.apply(this, arguments), this._initializeVariables(), this._setParent(), this._setChildren(), this._length < 2 ? this._unbind() : (this._isEventReady = !0, this._checkOptions(), this._options.isRepeat && this._initRepeatCarousel(), this._getItemGap(), this._checkIsHorizontal(), this._addEventListener(), this.addTouchBehavior(), this._unlock(), this._startUp(), this._options.autoPlay && this._activateTimer())
            },
            _initializeVariables: function() {
                this._length = 0, this._current = 0, this._offsetTop = 0, this._parent = undefined, this._children = undefined, this._itemGap = undefined, this._timer = undefined, this._isLocked = !0, this._isHorizontal = !1, this._isEventReady = !1
            },
            _setParent: function() {
                this._parent = this.$el.find("[data-ui-carousel-parent]")
            },
            _setChildren: function() {
                this._children = this._parent.find("[data-ui-carousel-children]");
                if (this._children.size() < 2) return this._length = 1, this.trigger("noScrollNecessary"), !1;
                this._length = this._children.size()
            },
            _initRepeatCarousel: function() {
                this._options.isLoop = !1, this._options.startUp = this._options.startUp || 2, this._parent.prepend(this._children[this._length - 1].outerHTML).prepend(this._children[this._length - 2].outerHTML).append(this._children[0].outerHTML).append(this._children[1].outerHTML), this._setChildren()
            },
            _getItemGap: function() {
                var e = this._options.direction,
                    t = e ? "offsetTop" : "offsetLeft";
                this._itemGap = this._children[1][t] - this._children[0][t] || 0
            },
            _checkIsHorizontal: function() {
                this._isHorizontal = this._options.direction ? !1 : !0
            },
            _onSwipeEndEvent: function(e) {
                if (this._isHorizontal && (e.direction === "up" || e.direction === "down") || !this._isHorizontal && (e.direction === "left" || e.direction === "right")) return;
                var t;
                switch (e.direction) {
                    case "up":
                    case "left":
                        t = 1;
                        break;
                    case "right":
                    case "down":
                        t = -1
                }
                this._moveTo(t)
            },
            _onTap: function(t) {
                var n = t.originalEvent,
                    r = e(n.srcElement).closest("[data-ui-carousel-children]").index(),
                    i;
                this._current !== r ? (i = r - this._current, this._moveTo(i), n.preventDefault(), n.stopPropagation()) : n.srcElement.tagName.toLowerCase() === "a" && (location.href = n.srcElement.href)
            },
            _moveTo: function(e) {
                if (!this._isEventReady) return;
                if (this._isLocked) return;
                var t = this._current,
                    r = this,
                    i, s;
                this._parent.off(n), this._updateCurrent(e), this._options.autoPlay && this._parent.one(n, function(e) {
                    r._activateTimer(e)
                });
                if (t === this._current) {
                    if (!this._options.isLoop) return;
                    this._updateCurrent((t ? -1 : 1) * this._length)
                }
                this._deactivateTimer(), i = this._isHorizontal ? 0 : -1 * this._current * this._itemGap, s = this._isHorizontal ? -1 * this._current * this._itemGap : 0, this._parent.fastCss({
                    webkitTransform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, " + s + ", " + i + ", 0, 1)"
                }).one(n, function() {
                    r._options.isRepeat && (r._current === r._length - 2 ? (r._current = 2, r._staticMove(r._current)) : r._current === 1 && (r._current = r._length - 3, r._staticMove(r._current))), r.trigger("moved", r._current)
                }), this._updateScroll(), this.trigger("moveTo", this._current);
                if (this._options.isRepeat) {
                    var o = this._current === 1,
                        u = this._current === this._length - 2;
                    (u || o) && this.trigger("loopStarted", {
                        isRightLoop: u,
                        isLeftLoop: o,
                        index: this._current
                    })
                }
            },
            _updateCurrent: function(e) {
                var t = this._current + e;
                t < 0 ? t = 0 : this._length <= t && (t = this._length - 1), this._current = t
            },
            _updateScroll: function() {
                var e = 100 / this._length * this._current;
                this.trigger("scrollchange", {
                    percent: e,
                    index: this._getCurrentIndex(),
                    isFirst: this.isFirst(),
                    isLast: this.isLast()
                })
            },
            _unbind: function() {
                e(".touch-area", this.$el).off()
            },
            _addEventListener: function() {
                this._options.btnPrev && this.listenTo(this._options.btnPrev, "message", this._onMessage), this._options.btnNext && this.listenTo(this._options.btnNext, "message", this._onMessage), this.listenTo(this, "tap", this._onTap).listenTo(this, "swipeend", this._onSwipeEndEvent)
            },
            _onMessage: function(e) {
                this._moveTo(e.message)
            },
            __st: function() {
                t.prototype.__st.apply(this, arguments), this._options.autoPlay && this._deactivateTimer()
            },
            _startUp: function() {
                var e = this._parent.css("-webkit-transition-duration"),
                    t = this,
                    n, r;
                this._updateCurrent(this._options.startUp), r = this._isHorizontal ? 0 : -1 * this._current * this._itemGap, n = this._isHorizontal ? -1 * this._current * this._itemGap : 0, this._parent.fastCss({
                    webkitTransitionDuration: "0",
                    webkitTransform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, " + n + ", " + r + ", 0, 1)"
                }), window.setTimeout(function() {
                    if (!t._parent) return;
                    t._updateScroll(), t._parent.fastCss({
                        webkitTransitionDuration: e
                    }), t.trigger("startedUp", t._current)
                }, 0)
            },
            _lock: function() {
                this._isLocked = !0
            },
            _unlock: function() {
                this._isLocked = !1
            },
            _deactivateTimer: function() {
                if (!this._isEventReady) return;
                window.clearTimeout(this._timer), this._timer = null
            },
            _activateTimer: function() {
                if (!this._isEventReady) return;
                if (!this._timer) {
                    var e = this;
                    this._timer = window.setTimeout(function() {
                        e._moveTo(1)
                    }, this._options.autoPlayDelay)
                }
            },
            _staticMove: function(t) {
                var n = e.Deferred(),
                    r = this,
                    i = r._isHorizontal ? -1 * t * r._itemGap : 0;
                return r._parent.addClass("g-disable-animation-for-spot-use").fastCss({
                    webkitTransform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, " + i + ", 0, 0, 1)"
                }), window.setTimeout(function() {
                    return r._parent.removeClass("g-disable-animation-for-spot-use"), n.resolve()
                }, 0), n.promise()
            },
            _getCurrentIndex: function() {
                var e = this._current;
                return this._options.isRepeat && (this._current === this._length - 1 ? e = 0 : this._current === 0 ? e = this._length - 3 : e -= 2), e
            },
            restartTimer: function() {
                this._options && this._options.autoPlay && (this._deactivateTimer(), this._activateTimer())
            },
            activateTimer: function() {
                this._options && this._options.autoPlay && this._activateTimer()
            },
            deactivateTimer: function() {
                this._options && this._options.autoPlay && this._deactivateTimer()
            },
            lock: function() {
                this._lock()
            },
            unlock: function() {
                this._unlock()
            },
            directlyMoveTo: function(e) {
                this._options && this._options.isRepeat && e++, e -= this._current, this._moveTo(e)
            },
            moveTo: function(e) {
                this._moveTo(e)
            },
            getChildrenNum: function() {
                return this._length
            },
            isFirst: function() {
                return this._current === 0
            },
            isLast: function() {
                return this._current === this._length - 1
            },
            dispose: function() {
                this._options && this._options.autoPlay && (this._parent.off(n), this._deactivateTimer()), this._parent = null, this._children = null, t.prototype.dispose.call(this)
            }
        })
    }), define("components/CookieMania", ["components/ComponentBase"], function(e) {
        var t = 1e3,
            n = 60 * t,
            r = 60 * n,
            i = 24 * r;
        return e.extend({
            _viewName: "CookieMania",
            _defaults: {
                path: "/",
                expire_days: 30,
                prefix: "cm_"
            },
            initialize: function() {
                this._checkOptions()
            },
            _genKey: function(e) {
                return this._options.prefix + e
            },
            get: function(e) {
                e = this._genKey(e);
                var t = document.cookie;
                if (t.length) {
                    var n = t.indexOf(e + "="),
                        r;
                    if (-1 < n) return n = n + e.length + 1, r = t.indexOf(";", n), r === -1 && (r = t.length), window.unescape(t.substring(n, r))
                }
                return ""
            },
            set: function(e, t, n) {
                e = this._genKey(e);
                var r = +(new Date),
                    s = new Date(r + (n || this._options.expire_days) * i),
                    o = s.toUTCString(),
                    u;
                u = e + "=" + window.escape(t) + ";", u += "path=" + this._options.path + ";", u += "expires=" + o, document.cookie = u
            },
            unset: function(e) {
                this.set(e, "", -1)
            },
            unsetAllCookie: function() {
                if (document.cookie === "") return;
                var e = document.cookie.split(";"),
                    t = this.now() - 1,
                    n = (new Date(t)).toUTCString(),
                    r = e.length,
                    i = new RegExp("([_0-9A-Za-z:]+)="),
                    s = new RegExp("^" + this._options.prefix);
                for (; r--;) {
                    var o = $.trim(e[r]),
                        u = i.exec(o);
                    if (u && u[1]) {
                        var a = u[1];
                        s.test(a) && (document.cookie = a + "=;path=/;expires=" + n)
                    }
                }
            }
        })
    }), define("components/Counter", ["jquery", "components/ComponentBase"], function(e, t) {
        return t.extend({
            _endMS: 1e3,
            _delay: 1e3 / 30,
            _viewName: "Counter",
            _defaults: {
                watch: undefined,
                parent: undefined,
                list: []
            },
            initialize: function() {
                this._initializeVariables(), this._checkOptions(), this._setup()
            },
            _initializeVariables: function() {
                this._from = undefined, this._to = undefined, this._diff = undefined, this._step = undefined, this._timer = undefined, this._current = undefined, this._percent = undefined, this._values = undefined, this._count = 0
            },
            _setup: function() {
                this._values = this.options.list, this._setNumbers(), this._options.watch ? this.listenToOnce(this._options.watch, "countend", this._start) : this._options.wait ? this.listenToOnce(this._options.wait, "message", this._start) : this._start()
            },
            _setNumbers: function() {
                this._from = +this._values[0].from, this._to = +this._values[0].to, this._diff = this._to - this._from, this._step = this._diff / (this._endMS / this._delay)
            },
            _start: function() {
                if (!this._diff && this._values.length === 1) {
                    this.$el.html(this._values[0].max), this.trigger("countend");
                    return
                }
                var e = this;
                this._timer = setInterval(function() {
                    e._stepUp()
                }, this._delay)
            },
            _stepUp: function() {
                this._count++, this._count * this._delay >= this._endMS ? (this._current = this._to, window.clearInterval(this._timer), 1 < this._values.length ? (this._values.shift(), this._count = 0, this._setNumbers(), this._options.parent ? this.trigger("countmax") : this._countNext()) : this.trigger("countend")) : this._current = this._from + this._step * this._count, this.$el.html(Math.floor(this._current)), this.trigger("countchange", {
                    percent: this._current,
                    to: this._to
                })
            },
            _countNext: function() {
                var e = this;
                this.trigger("countnext", {
                    max: this._values[0].max,
                    to: this._values[0].to
                }), window.setTimeout(function() {
                    e._start()
                }, 50)
            },
            startNextCount: function() {
                this._countNext()
            },
            setNumbers: function(e, t) {
                if (!e || !t) return;
                this._setNumbers(e, t)
            }
        })
    }), define("components/CyclicButton", ["components/Button"], function(e) {
        var t = -1 < navigator.userAgent.indexOf("Android 4.0");
        return e.extend({
            _viewName: "CyclicButton",
            _defaults: {
                message: undefined,
                longtapDuration: 200,
                pressInterval: 200,
                extendDurationSteps: [1e3, 1e3, 1e3],
                exntendIntervalCoefficient: 2,
                disableClassName: "mbgaui-disabled",
                parentDisableClassName: "mbgaui-disabled",
                parent: undefined
            },
            initialize: function() {
                this._checkOptions(), e.prototype.initialize.apply(this, arguments), this.addTouchBehavior(), this._initializeVariables(), this._defineButton(), this._bindEvents()
            },
            _initializeVariables: function() {
                this._timeoutTimer = null, this._intervalTimer = null, this.__validDistance = 9, this._currentStep = 0, this._extendLength = this._options.extendDurationSteps.length, this._keepDefaultValues()
            },
            _keepDefaultValues: function() {
                this._originalPressInterval = this._options.pressInterval, this._originalLongtapDuration = this._options.longtapDuration, this._originalExtendDurationSteps = this._options.extendDurationSteps.concat()
            },
            _resetDefaultValues: function() {
                this._options.pressInterval = this._originalPressInterval, this._options.longtapDuration = this._originalLongtapDuration, this._options.extendDurationSteps = this._originalExtendDurationSteps.concat(), this._currentStep = 0
            },
            _defineButton: function() {
                var e = this.$el.find(".button");
                this._button = e.size() ? e : this.$el
            },
            _bindEvents: function() {
                var e = this;
                this.listenTo(this._options.parent, "scrollchange", function() {
                    e._expireTimer()
                }), $(document).on("documentanchorsnotify.CyclicButton", function() {
                    e._expireTimer()
                })
            },
            __st: function(t) {
                if (!this._isBtnEnable()) return;
                this.trigger("startNewTimer"), e.prototype.__st.apply(this, arguments), this._resetDefaultValues(), this._startTimer(t), this._button.addClass("mbgaui-active")
            },
            __mv: function() {
                if (!this._isBtnEnable()) return;
                e.prototype.__mv.apply(this, arguments), this.__isStarted && (this.__validDistance < Math.abs(this.__diffX) || this.__validDistance < Math.abs(this.__diffY)) && (this._expireTimer(), this._button.removeClass("mbgaui-active"))
            },
            __ed: function() {
                if (!this._isBtnEnable()) return;
                this._button.removeClass("mbgaui-active"), this.__isMoved || this._intervalTimer !== null ? this._expireTimer() : this._expireAndTriggerMessage(), e.prototype.__ed.apply(this, arguments)
            },
            _startTimer: function(e) {
                if (!this._isBtnEnable()) return;
                if (this._timeoutTimer || this._intervalTimer) return;
                if (t) return;
                var n = this;
                this._timeoutTimer = window.setTimeout(function() {
                    n._expireTimeoutTimer(), n._countDownPastDuration(n._options.longtapDuration), n._intervalTimer = window.setInterval(function() {
                        n._countDownPastDuration(n._options.pressInterval), n._isParentEnable() ? n._isBtnEnable() ? n.triggerMessage(e) : n._expireIntervalTimer() : n._expireTimer()
                    }, n._options.pressInterval)
                }, this._options.longtapDuration)
            },
            _expireTimer: function() {
                this._expireTimeoutTimer(), this._expireIntervalTimer(), this.__isStarted = !1
            },
            _expireTimeoutTimer: function() {
                window.clearTimeout(this._timeoutTimer), this._timeoutTimer = null
            },
            _expireIntervalTimer: function() {
                window.clearInterval(this._intervalTimer), this._intervalTimer = null, this._button.removeClass("mbgaui-active")
            },
            _expireAndTriggerMessage: function() {
                this._expireTimer(), this.triggerMessage()
            },
            _isBtnEnable: function() {
                return !this.$el.hasClass(this._options.disableClassName) && this.$el.find(this._options.disableClassName).size() === 0
            },
            _isParentEnable: function() {
                return this.options.parent ? !this._options.parent.$el.hasClass(this._options.parentDisableClassName) : !0
            },
            _countDownPastDuration: function(e) {
                var t = this._currentStep,
                    n = this._options.extendDurationSteps,
                    r;
                if (n[t] === undefined) return;
                r = n[t], 0 < r ? (r -= e, n[t] = r) : this.updateCounterSpeed()
            },
            expireTimer: function() {
                this._expireTimer()
            },
            updateCounterSpeed: function() {
                this._currentStep++, this._options.longtapDuration = 0, this._options.pressInterval = Math.ceil(this._options.pressInterval / this._options.exntendIntervalCoefficient), this._expireTimer(), this.__isStarted = !0, this._startTimer()
            },
            dispose: function() {
                this._expireTimer(), $(document).off(".CyclicButton"), e.prototype.dispose.apply(this, arguments)
            }
        })
    }), define("components/Draggable", ["jquery", "components/ComponentBase"], function(e, t) {
        var n = "ontouchend" in window,
            r = {
                s: n ? "touchstart" : "mousedown",
                m: n ? "touchmove" : "mousemove",
                d: n ? "touchend" : "mouseup"
            };
        return t.extend({
            _viewName: "Draggable",
            _defaults: {
                className: "floating",
                container: document
            },
            initialize: function() {
                this._initializeVariables(), this._checkOptions(), this._checkLimit(), this._addEventListener()
            },
            _initializeVariables: function() {
                this._isStart = !1, this._hasLimit = !1, this._startX = null, this._startY = null, this._diffX = null, this._diffY = null, this._lastX = null, this._lastY = null, this._matrix = undefined, this._options = undefined, this._limitX = undefined, this._limitY = undefined, this._originX = undefined, this._originY = undefined
            },
            _checkLimit: function() {
                if (this._options.limit) {
                    var e = this._options.limit,
                        t = e.get(0).getBoundingClientRect(),
                        n = this.$el,
                        r = n.get(0).getBoundingClientRect(),
                        i, s;
                    s = r.left - t.left - parseInt(e.css("border-left-width"), 10), i = r.top - t.top - parseInt(e.css("border-top-width"), 10), this._limitY = e.innerHeight() - this.$el.outerHeight(), this._limitX = e.innerWidth() - this.$el.outerWidth(), this._originY = i, this._originX = s, this._hasLimit = !0
                }
            },
            _addEventListener: function() {
                var e = this,
                    t = this._options,
                    n = t.handle ? t.handle : this.$el,
                    i = t.snapX ? "w-resize" : t.snapY ? "n-resize" : "move",
                    s;
                s = this._eventHandler = function(t) {
                    switch (t.type) {
                        case r.m:
                            e._onMove(t);
                            break;
                        case r.s:
                            e._onStart(t);
                            break;
                        case r.d:
                            e._onEnd(t)
                    }
                }, n.fastCss("cursor", i).on(r.s, s).on(r.m, s).on(r.d, s)
            },
            _onStart: function(t) {
                this._isStart = !0;
                var n = this,
                    i = this._getAxis(t);
                this._setStartAxis(i), this._matrix = this._getMatrix(this.$el), this.$el.addClass(this._options.className), e(this._options.container).on(r.m, function(e) {
                    n._onMove(e)
                }).on(r.d, function(e) {
                    n._onEnd(e)
                })
            },
            _onMove: function(e) {
                if (this._isStart) {
                    var t = this._getAxis(e),
                        n;
                    this._setDiffAxis(t), n = this._getFixedAxis(this._matrix), this.$el.fastCss("webkitTransform", "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, " + n.x + ", " + n.y + ", 0, 1)"), this._setLastAxis(t), this.$el.fastCss("pointer-events", "none"), this.trigger("dragmove", {
                        context: this,
                        element: this._getElementFromPoint(this._lastX, this._lastY)
                    }), this.$el.fastCss("pointer-events", "auto"), e.preventDefault(), e.stopPropagation()
                }
            },
            _onEnd: function() {
                this._isStart && (this._isStart = !1, this.$el.fastCss("pointer-events", "none").removeClass(this._options.className), this.trigger("dragdrop", {
                    context: this,
                    element: this._getElementFromPoint(this._lastX, this._lastY)
                }), this.$el.fastCss("pointer-events", "auto"), e(this._options.container).off(r.m).off(r.d))
            },
            _setStartAxis: function(e) {
                this._startX = e.x, this._startY = e.y
            },
            _setDiffAxis: function(e) {
                this._diffX = e.x - this._startX, this._diffY = e.y - this._startY
            },
            _setLastAxis: function(e) {
                this._lastX = this._options.snapY ? this._startX : e.x, this._lastY = this._options.snapX ? this._startY : e.y
            },
            _getAxis: function(e) {
                if (e) return {
                    x: e.clientX || (e.originalEvent.touches ? e.originalEvent.touches[0].clientX : undefined),
                    y: e.clientY || (e.originalEvent.touches ? e.originalEvent.touches[0].clientY : undefined)
                }
            },
            _getFixedAxis: function(e) {
                var t = this._options.snapY ? 0 : e.e + this._diffX,
                    n = this._options.snapX ? 0 : e.f + this._diffY;
                return this._hasLimit && (this._originX + t < 0 ? t = -this._originX : this._limitX < this._originX + t && (t = this._limitX - this._originX), this._originY + n < 0 ? n = -this._originY : this._limitY < this._originY + n && (n = this._limitY - this._originY)), {
                    x: t,
                    y: n
                }
            },
            _getElementFromPoint: function(e, t) {
                return !e || !t ? !1 : document.elementFromPoint(e, t)
            },
            _getMatrix: function(e) {
                var t = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)";
                return e && e[0] && (t = e[0].style.webkitTransform), new WebKitCSSMatrix(t)
            },
            dispose: function() {
                var e = this._options,
                    n = e.handle ? e.handle : this.$el,
                    i = this._eventHandler;
                i && (n.off(r.s, i), n.off(r.m, i), n.off(r.d, i), this._eventHandler = null), t.prototype.dispose.call(this)
            }
        })
    }), define("components/FixedPosition", ["components/ComponentBase"], function(e) {
        return e.extend({
            _viewName: "FixedPosition",
            _defaults: {
                parent: $("body"),
                left: 0,
                top: 0
            },
            initialize: function() {
                this._checkOptions(), this._setPosition(), this._addEventListner()
            },
            _addEventListner: function() {
                var e = this,
                    t = this._options.parent;
                !t instanceof $ && (t = $(t)), this._parent = t, this._eventHandler = function() {
                    e._onScroll()
                }, t.on("scroll", this._eventHandler)
            },
            _onScroll: function() {
                var e = this._options,
                    t = this._parent,
                    n = t.scrollLeft(),
                    r = t.scrollTop(),
                    i = e.left + n,
                    s = e.top + r;
                this._setPosition(i, s)
            },
            _setPosition: function(e, t) {
                this.$el.fastCss({
                    left: (e || this._options.left) + "px",
                    top: (t || this._options.top) + "px"
                })
            },
            dispose: function() {
                this._parent && this._eventHandler && (this._parent.off("scroll", this._eventHandler), this._parent = null, this._eventHandler = null), e.prototype.dispose.call(this)
            }
        })
    }), define("components/Fluctuator", ["jquery", "components/ComponentBase"], function(e, t) {
        return t.extend({
            _viewName: "Fluctuator",
            _defaults: {
                increase: undefined,
                decrease: undefined,
                maximize: undefined,
                reset: undefined,
                max: undefined
            },
            initialize: function() {
                this._initializeVariables(), this._checkOptions(), this._checkElement(), this._pickCurrentValue(), this._addEventListener()
            },
            _initializeVariables: function() {
                this._original = 0, this._current = undefined
            },
            _checkElement: function() {
                if (this.$el.get(0).tagName.toLowerCase() !== "input") throw new Error("Source element must be <input>")
            },
            _pickCurrentValue: function() {
                this._original = +this.$el.val(), this._setCurrentValue(this._options.current || this._original)
            },
            _getCurrentValue: function() {
                return this._current
            },
            _setCurrentValue: function(e) {
                this._current = e, this.trigger("valueChanged", {
                    value: e,
                    isZero: e === 0,
                    isMax: e === this._options.max
                })
            },
            _updateDisplay: function(e) {
                this.$el.val(e)
            },
            _addEventListener: function() {
                var e = this;
                this._options.increase && this.listenTo(this._options.increase, "message", this._changeValue), this._options.decrease && this.listenTo(this._options.decrease, "message", this._changeValue), this._options.maximize && this.listenTo(this._options.maximize, "message", this._changeValue), this._options.reset && this.listenTo(this._options.reset, "message", this.resetValue), this.$el.on("change", function(t) {
                    e._onUserChange(t)
                })
            },
            _changeValue: function(e) {
                var t;
                if (typeof e.message == "string") t = this._options.max;
                else {
                    var n = this._getCurrentValue();
                    t = n + e.message, t < 0 ? t = 0 : this._options.max < t && (t = this._options.max)
                }
                this._setCurrentValue(t), this._updateDisplay(t)
            },
            _onUserChange: function() {
                var e = this.$el.val();
                e.length ? e = parseInt(e, 10) : e = 0, e === "" || e < 0 ? e = 0 : isNaN(e) && (e = this._current), this._options.max < e && (e = this._options.max), this._setCurrentValue(e), this._updateDisplay(e)
            },
            getIncreaseButton: function() {
                return this._options.increase
            },
            getDecreaseButton: function() {
                return this._options.decrease
            },
            getValue: function() {
                return +this.$el.val()
            },
            setValue: function(e) {
                this._setCurrentValue(e), this._updateDisplay(e)
            },
            getMax: function() {
                return this._options.max
            },
            changeMax: function(e) {
                this._options.max = e, e < this._current && (this._setCurrentValue(e), this._updateDisplay(e))
            },
            resetValue: function() {
                this._setCurrentValue(this._original), this._updateDisplay(this._original)
            },
            dispose: function() {
                this.$el.off("change"), t.prototype.dispose.call(this)
            }
        })
    }), define("components/LazyLoad", ["components/ComponentBase"], function(e) {
        return e.extend({
            _viewName: "LazyLoad",
            _defaults: {
                parent: undefined,
                throttleTime: 83.3,
                sensorHeight: 200,
                dataSelector: "data-ui-lazyload-src"
            },
            initialize: function() {
                this._checkOptions(), this._initializeVariables(), this._initializeItems(), this._bindEvents(), this._updateDisplay()
            },
            _initializeItems: function() {
                var e = this,
                    t = this._parentElement,
                    n = t.size() && t.offset().top;
                if (!n && n !== 0) return;
                this._itemsOffsetTop = [], this._items = t.find("[" + this._options.dataSelector + "]").toArray(), $.each(this._items, function(t) {
                    e._itemsOffsetTop.push($(e._items[t]).offset().top - n)
                })
            },
            _initializeVariables: function() {
                this._parentElement = this._options.parent.getViewElement()
            },
            _bindEvents: function() {
                var e = this;
                this._parentElement.on("scroll.lazyload", function() {
                    e._onTriggerEvent()
                }), this.listenTo(this._options.parent, "contentUpdated", this._updateContent)
            },
            _unbindEvents: function() {
                this._parentElement.off(".lazyload"), this.stopListening()
            },
            _onTriggerEvent: function() {
                if (this._items.length) {
                    var e = this;
                    this.throttle(function() {
                        e._updateDisplay()
                    }, this._options.throttleTime)
                }
            },
            _updateDisplay: function() {
                var e = this,
                    t = this._getCurrentScroll(),
                    n = this._options.dataSelector,
                    r = this._itemsOffsetTop.lastIndexOf(!0) + 1,
                    i = this._itemsOffsetTop.length,
                    s = this._itemsOffsetTop.slice(r, i),
                    o, u;
                $.each(s, function(i) {
                    o = $(e._items[r + i]), u = o.attr(n), e._itemsOffsetTop[i] < t && (o.attr("src", u).get(0).addEventListener("load", function(e) {
                        e.removeClass("js-hide").removeAttr(n)
                    }(o), !1), e._itemsOffsetTop[i] = !0)
                }), this._itemsOffsetTop[i - 1] <= t && (this._unbindEvents(), this.dispose())
            },
            _getParentStartAxis: function() {
                var e = this._parentElement,
                    t = e.offset().top + parseInt(e.css("margin-top"), 10) + parseInt(e.css("padding-top"), 10);
                return t
            },
            _getCurrentScroll: function() {
                var e = this._parentElement;
                return e.scrollTop() + e.height() + this._options.sensorHeight
            },
            _updateContent: function() {
                this._initializeItems(), this._updateDisplay()
            },
            updateContent: function() {
                this._updateContent()
            },
            dispose: function() {
                this._unbindEvents(), e.prototype.dispose.apply(this, arguments)
            }
        })
    }), define("components/FreeScroll", ["jquery", "components/ComponentBase", "components/LazyLoad"], function(e, t, n) {
        var r = "ontouchend" in window,
            i = {
                st: r ? "touchstart" : "mousedown",
                mv: r ? "touchmove" : "mousemove",
                ed: r ? "touchend" : "mouseup",
                cc: r ? "touchcancel" : undefined
            },
            s = "webkitTransitionEnd transitionend",
            o = FF.env.isAndroid(),
            u = FF.env.isAndroid2_x(),
            a = FF.env.isAndroidVersionGreaterThanOrEqualTo(5, 0),
            f = o && a ? 60 : o && !u ? 33 : 12;
        return t.extend({
            _friction: .25,
            _baseSpeed: 750,
            _backSpeed: Math.round(1250 / 4.2),
            _validRatio: 3,
            _validDistance: 10,
            _minSpeed: 10,
            _minScrollTime: 100,
            _contentSelector: "[data-ui-freescroll-content]",
            _viewName: "FreeScroll",
            _defaults: {
                useNativeScroll: !0,
                useLazyLoad: !0
            },
            initialize: function() {
                this._initializeVariables(), this._setContent(), this._setProperties(), this._checkOptions();
                if (FF.env.isIOS() && this._options.useNativeScroll) {
                    this._initializeNativeScroll(), this._options.useLazyLoad ? this._initializeLazyLoad() : this._removeLazyLoad(), this._options.startUp && (this._startUp(this._options.startUp), this.trigger("startedUp")), this.$el.attr("data-ui-freescroll-init-as", "native"), this._initializeAfterNativeScrollBind();
                    return
                }
                this._options.useNativeScroll = !1, this._removeLazyLoad(), this._parentH < this._contentH ? (this._bindEvent(), this._options.startUp ? this._startUp(this._options.startUp) : this._content.fastCss("webkitTransform", "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"), this._hasBuilt = !0) : (window.setTimeout(e.proxy(function() {
                    this.trigger("noScrollNecessary")
                }, this), 10), this._options.startUp && this.trigger("startedUp"))
            },
            _initializeVariables: function() {
                this._parentH = undefined, this._content = undefined, this._contentH = undefined, this._maxScroll = undefined, this._maxOverScroll = undefined, this._start = undefined, this._diff = undefined, this._prev1 = undefined, this._prev2 = undefined, this._prev3 = undefined, this._prevTime1 = undefined, this._prevTime2 = undefined, this._prevTime3 = undefined, this._isStarted = !1, this._isMoving = !1, this._hasBuilt = !1, this._isScrollable = !1, this._isCancelScroll = !1, this._currentScroll = 0, this._currentY = 0
            },
            _initializeNativeScroll: function() {
                if (!this.$el.size()) return;
                var t = this.$el.outerHeight(),
                    n = this.$el.get(0).scrollHeight;
                this._maxScroll = -(n - t), this.$el.fastCss({
                    "overflow-y": "scroll",
                    "-webkit-overflow-scrolling": "touch",
                    "pointer-events": "auto"
                }), window.setTimeout(e.proxy(function() {
                    this.trigger("noScrollNecessary")
                }, this), 10)
            },
            _initializeLazyLoad: function() {
                this._lazyLoad && this._lazyLoad.disposeFunctionality(), this._lazyLoad = new n({
                    parent: this
                })
            },
            _initializeAfterNativeScrollBind: function() {
                if (!FF.env.isIOS6_x()) return;
                var e = this;
                this.$el.fastCss("overflow-y", "hidden"), window.setTimeout(function() {
                    e.$el.fastCss("overflow-y", "scroll")
                }, 0)
            },
            _removeLazyLoad: function() {
                e(".js-lazyload").each(function() {
                    e(this).attr("src", e(this).attr("data-ui-lazyload-src")).removeClass("js-lazyload js-hide")
                })
            },
            _setContent: function() {
                this._content = e(this._contentSelector, this.$el), this._contentH = this._content.outerHeight()
            },
            _setProperties: function() {
                this._parentH = this.$el.height(), this._validOverScroll = this._parentH / this._validRatio, this._minScroll = this._validOverScroll, this._maxScroll = this._parentH - this._contentH, this._maxOverScroll = this._maxScroll - this._validOverScroll, this._isScrollable = this._parentH < this._contentH ? !0 : !1, this._isScrollable || this.trigger("noScrollNecessary")
            },
            _bindEvent: function() {
                var e = this,
                    t = this.$el.get(0),
                    n;
                n = this._eventHandler = function(t) {
                    switch (t.type) {
                        case i.mv:
                            e._mv(t);
                            break;
                        case i.st:
                            e._st(t);
                            break;
                        case i.ed:
                        case i.cc:
                            e._ed(t)
                    }
                }, t.addEventListener(i.st, n, !0), t.addEventListener(i.mv, n, !0), t.addEventListener(i.ed, n, !0), i.cc && this.$el.on(i.cc, n)
            },
            _startUp: function(t) {
                window.setTimeout(e.proxy(function() {
                    var e;
                    typeof t == "string" && (t = t.toLowerCase() === "max" ? this._maxScroll : 0), FF.env.isIOS() && this._options.useNativeScroll ? (this.$el.scrollTop(-t), e = Math.round(t / this._maxScroll * 100)) : (this._scroll(t), e = Math.round(t / (this._maxScroll - this._parentH) * 100)), this.trigger("scrollchange", {
                        percent: e,
                        speed: "0ms"
                    }), this.forceRepaintView(!0), this.trigger("startedUp")
                }, this), 0)
            },
            _scroll: function(e, t) {
                var n = this._isMoveDirectionUp === undefined ? 0 : this._isMoveDirectionUp ? this._validDistance : -this._validDistance,
                    r = this._currentY + e + n,
                    i;
                0 < r || this._contentH < this._parentH ? (r = (e + this._currentY) / this._validRatio, this._validOverScroll < r && (r = this._validOverScroll)) : r < this._maxScroll && (r = this._maxScroll + (r - this._maxScroll) / this._validRatio, r < this._maxScroll - this._validOverScroll && (r = this._maxScroll - this._validOverScroll)), i = this._getTransCSS(0, r, t), this._content.fastCss(i)
            },
            _set: function() {
                var e = this;
                FF.env.isIOS() && this._options.useNativeScroll ? (this.$el.css("overflow", "hidden"), window.setTimeout(function() {
                    e.$el.scrollTop(0).css("overflow-y", "scroll"), e.trigger("allTransitionEnd")
                }, 0)) : this._content.fastCss({
                    webkitTransitionDuration: "0ms",
                    webkitTransform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0.01, 0, 1)"
                }).one(s, function() {
                    e.trigger("allTransitionEnd"), e._content.fastCss({
                        webkitTransform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
                    })
                }), this.trigger("scrollchange", {
                    percent: 0,
                    speed: "0ms"
                })
            },
            _getPreviousAxis: function() {
                return this._getAverage(this._prev1, this._prev2, this._prev3)
            },
            _getPreviousTime: function(e) {
                return this._minScrollTime < e - this._prevTime1 ? e : this._getAverage(this._prevTime1, this._prevTime2, this._prevTime3)
            },
            _getInertialValue: function(e, t, n, r) {
                var i = this._baseSpeed * this._friction * r,
                    s = t - n;
                return s ? e.f + Math.floor(i / s) : e.f
            },
            _inertial: function(e) {
                var t = this,
                    n = this._getElementMatrix(this._content),
                    r = e.timeStamp || this.now(),
                    i = this._getPreviousAxis(n),
                    o = this._getPreviousTime(r),
                    u = Math.abs(n.f - i) < this._minSpeed ? 0 : n.f - i,
                    a = this._getInertialValue(n, r, o, u),
                    f = this._getValidTargetAxis(a),
                    l = this._getTransCSS(this._baseSpeed, f, n);
                !this._isMoving && Math.abs(u) < this._minSpeed && this.trigger("tappedScrollArea");
                if (this._minSpeed < Math.abs(u) && this._parentH < this._contentH) l.webkitTransitionDuration === "0ms" && (l.webkitTransitionDuration = "1ms"), this._content.fastCss(l).one(s, function() {
                    t._afterScroll(f)
                });
                else if (0 <= n.f || this._contentH < this._parentH) {
                    var c = 0 <= n.f ? "return:top" : "return:top:verylast:up";
                    this.trigger(c, {
                        y: 0,
                        speed: this._backSpeed
                    }), this._forceTriggerReturnEvents(), this._content.fastCss(this._getTransCSS(this._backSpeed, 0, n)).one(s, function() {
                        t.trigger("allTransitionEnd")
                    })
                } else n.f <= this._maxScroll && (this.trigger("return:bottom", {
                    y: this._maxScroll,
                    speed: this._backSpeed
                }), this._forceTriggerReturnEvents(), this._content.fastCss(this._getTransCSS(this._backSpeed, this._maxScroll, n)).one(s, function() {
                    t.trigger("allTransitionEnd")
                }))
            },
            _afterScroll: function(e) {
                var t = this,
                    n = 0 < e ? this._getTransCSS(this._backSpeed, 0) : e < this._maxScroll ? this._getTransCSS(this._backSpeed, this._maxScroll) : undefined;
                0 < e ? this.trigger("return:top", {
                    y: 0,
                    speed: this._backSpeed
                }) : e < this._maxScroll ? this.trigger("return:bottom", {
                    y: this._maxScroll,
                    speed: this._backSpeed
                }) : this.trigger("ontrail", {
                    y: e,
                    speed: this._baseSpeed
                }), n && this._content.fastCss(n).one(s, function() {
                    t.trigger("allTransitionEnd")
                }), this._forceTriggerReturnEvents()
            },
            _st: function(t) {
                if (!this._isScrollable) return;
                var n = this._getElementMatrix(this._content),
                    r;
                this._isStarted = !0, this._isMoving = !1, this._isCancelScroll = !1, this._start = this._getAxis(t), this._currentY = n.f, this._prev1 = this._currentY, this._prev2 = this._prev1, this._prev3 = this._prev1, this._prevTime1 = t.timeStamp || this.now(), this._prevTime2 = this._prevTime1, this._prevTime3 = this._prevTime1, this._isMoveDirectionUp = undefined, this._isStartedFromUpperEdge = this._currentY === 0 ? !0 : !1, this._isStartedFromLowerEdge = this._currentY === this._maxScroll ? !0 : !1, r = this._getTransCSS(0, Math.floor(this._currentY), n), this._content.fastCss(r).off(s);
                if (o) {
                    var i = t.target.tagName.toLowerCase();
                    i !== "select" && i !== "input" && i !== "textarea" && !e(t.target).closest(".button").size() && t.preventDefault()
                }
            },
            _mv: function(e) {
                var t = this;
                t._isStarted && this.throttle(function() {
                    if (t._isScrollable && !t._isCancelScroll) {
                        var n = t._getAxis(e),
                            r = n - t._start;
                        if (!t._isMoving && Math.abs(r) < t._validDistance) return;
                        t._isMoving || (t._isMoveDirectionUp = r < 0), t._isMoving = !0;
                        var i = t._getElementMatrix(t._content);
                        t._resetPrevAxis(i, e), t._scroll(r, i), e.preventDefault()
                    }
                }, f)
            },
            _ed: function(e) {
                if (!this._isScrollable || this._isCancelScroll) {
                    this._isStarted = !1, this._isMoving = !1;
                    return
                }
                this._isStarted && (this._isMoving ? (e.preventDefault(), e.stopPropagation()) : this.trigger("allTransitionEnd")), this._inertial(e), this._isStarted = !1, this._isMoving = !1, this._start = undefined, this._currentY = undefined
            },
            _getElementMatrix: function(e) {
                var t = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)";
                return e && e[0] && (t = e[0].style.webkitTransform), new WebKitCSSMatrix(t)
            },
            _getAxis: function(e) {
                return e.clientY || e.touches[0].clientY || 0
            },
            _getValidTargetAxis: function(e) {
                return this._minScroll <= e ? e = this._minScroll : e <= this._maxOverScroll && (e = this._maxOverScroll), e
            },
            _getTransCSS: function(e, t, n) {
                var r = n || this._getElementMatrix(this._content),
                    i = (+e === 0 ? "0" : e) + "ms",
                    s, o;
                return t = Math.floor(t), e && (0 <= t || t <= this._maxScroll) && (i = this._backSpeed + "ms"), Math.floor(r.f * 1e3) === Math.floor(t * 1e3) && (t += .001, i = "1ms"), i === "1ms" && this._isMoving && (i = "0ms"), s = {
                    webkitTransitionDuration: i,
                    webkitTransform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + t + ", 0, 1)"
                }, o = Math.round(t / (this._maxScroll - this._parentH) * 100), this.trigger("scrollchange", {
                    percent: o,
                    speed: this._isStarted ? "200ms" : i,
                    y: t,
                    isTouching: this._isStarted
                }), this._currentScroll = t, s
            },
            _resetPrevAxis: function(e, t) {
                e = e || this._getElementMatrix(this._content), this._prev3 = this._prev2, this._prev2 = this._prev1, this._prev1 = e.f, this._prevTime3 = this._prevTime2, this._prevTime2 = this._prevTime1, this._prevTime1 = t.timeStamp || this.now()
            },
            _checkScrollPosition: function() {
                var e;
                isNaN(this._currentScroll) && (this._currentScroll = this._getElementMatrix(this._content).f), this._currentScroll < this._maxScroll && this._parentH < this._contentH ? (e = this._getTransCSS(0, this._maxScroll), this._content.fastCss(e)) : this._currentScroll < this._maxScroll && (e = this._getTransCSS(this._baseSpeed, 0), this._content.fastCss(e))
            },
            _forceTriggerReturnEvents: function() {
                var e = this;
                window.setTimeout(function() {
                    e._content && e._content.trigger(s), window.setTimeout(function() {
                        e._content && e.trigger("allTransitionEnd")
                    }, e._backSpeed)
                }, e._backSpeed)
            },
            startUp: function(e) {
                this._startUp(e)
            },
            cancelScroll: function() {
                this._isCancelScroll = !0, this._afterScroll()
            },
            getParentHeight: function() {
                return this._parentH
            },
            getContentHeight: function() {
                return this._contenH
            },
            getMaxScroll: function() {
                return this._maxScroll
            },
            getCurrentScroll: function() {
                if (this._options.useNativeScroll) return -this.$el.scrollTop();
                var e = this._getElementMatrix(this._content);
                return e.f
            },
            getIsScrollable: function() {
                return this._isScrollable
            },
            getMovingState: function() {
                return this._isMoving
            },
            getScrollbarHeight: function() {
                return Math.floor(this._parentH / this._contentH * 100) + 1
            },
            getOverScrollHeight: function() {
                return this._validOverScroll
            },
            getIsNativeScrollAvailable: function() {
                return this._options.useNativeScroll
            },
            restartLazyLoad: function() {
                this._initializeLazyLoad()
            },
            updateContent: function() {
                this._hasBuilt ? (this._setContent(), this._setProperties(), this._checkScrollPosition(), this._removeLazyLoad()) : this.initialize()
            },
            scrollBySelector: function(t, n) {
                n = n || {};
                var r = e(t, this.$el);
                if (!r.size()) return;
                var i = this.$el.offset().top,
                    s = parseInt(this.$el.css("padding-top"), 10),
                    o = r.offset().top,
                    u = i + s - o + n.adjustY;
                this._startUp(u)
            },
            reset: function() {
                this._set(), this._isScrollable || this.trigger("noScrollNecessary")
            },
            dispose: function() {
                var e = this._eventHandler,
                    n = this.$el.get(0);
                e && n && (n.removeEventListener(i.st, e, !0), n.removeEventListener(i.mv, e, !0), n.removeEventListener(i.ed, e, !0), i.cc && this.$el.off(i.cc, e), this._eventHandler = null), this._content && (this._content.off(s), this._content = null), this._lazyLoad && this._lazyLoad.dispose(), t.prototype.dispose.call(this)
            }
        })
    }), define("components/FreeScrollX", ["jquery", "components/ComponentBase"], function(e, t) {
        var n = "ontouchend" in window,
            r = {
                st: n ? "touchstart" : "mousedown",
                mv: n ? "touchmove" : "mousemove",
                ed: n ? "touchend" : "mouseup",
                cc: n ? "touchcancel" : undefined
            },
            i = "webkitTransitionEnd transitionend",
            s = FF.env.isAndroid(),
            o = FF.env.isAndroid2_x(),
            u = FF.env.isAndroidVersionGreaterThanOrEqualTo(5, 0),
            a = s && u ? 60 : s && !o ? 33 : 12;
        return t.extend({
            _friction: .0085,
            _baseSpeed: 1250,
            _backSpeed: 1250 / 4.2,
            _validRatio: 3,
            _minSpeed: 3,
            _contentSelector: "[data-ui-freescroll-content]",
            _viewName: "FreeScrollX",
            initialize: function() {
                this._initializeVariables(), this._setContent(), this._setProperties(), this._checkOptions(), this._parentW < this._contentW ? (this._bindEvent(), this._options.startUp ? this._startUp(this._options.startUp) : this._content.fastCss("webkitTransform", "translate3d(0px, 0px, 0px)"), this._hasBuilt = !0) : (window.setTimeout(e.proxy(function() {
                    this.trigger("noScrollNecessary")
                }, this), 10), this._options.startUp && this.trigger("startedUp"))
            },
            _initializeVariables: function() {
                this._parentW = undefined, this._content = undefined, this._contentW = undefined, this._maxScroll = undefined, this._maxOverScroll = undefined, this._start = undefined, this._diff = undefined, this._prev = undefined, this._isStarted = !1, this._isMoving = !1, this._hasBuilt = !1, this._isScrollable = !1, this._isCancelScroll = !1, this._currentScroll = 0, this._currentX = 0
            },
            _setContent: function() {
                this._content = e(this._contentSelector, this.$el), this._contentW = this._content.outerWidth()
            },
            _setProperties: function() {
                this._parentW = this.$el.width(), this._validOverScroll = this._parentW / this._validRatio, this._minScroll = this._validOverScroll, this._maxScroll = this._parentW - this._contentW, this._maxOverScroll = this._maxScroll - this._validOverScroll, this._isScrollable = this._parentW < this._contentW ? !0 : !1, this._isScrollable || this.trigger("noScrollNecessary")
            },
            _bindEvent: function() {
                var e = this,
                    t = this.$el.get(0),
                    n;
                n = this._eventHandler = function(t) {
                    switch (t.type) {
                        case r.mv:
                            e._mv(t);
                            break;
                        case r.st:
                            e._st(t);
                            break;
                        case r.ed:
                        case r.cc:
                            e._ed(t)
                    }
                }, t.addEventListener(r.st, n, !0), t.addEventListener(r.mv, n, !0), t.addEventListener(r.ed, n, !0), r.cc && this.$el.on(r.cc, n)
            },
            _startUp: function(t) {
                window.setTimeout(e.proxy(function() {
                    typeof t == "string" && (t = t.toLowerCase() === "max" ? this._maxScroll : 0), this._scroll(t), this.trigger("scrollchange", {
                        percent: Math.round(t / (this._maxScroll - this._parentW) * 100),
                        speed: "0ms"
                    }), this.trigger("startedUp")
                }, this), 0)
            },
            _scroll: function(e, t) {
                var n = this._currentX + e,
                    r;
                0 < n ? (n = e / this._validRatio, this._validOverScroll <= n && (n = this._validOverScroll)) : n < this._maxScroll && (n = this._maxScroll + (n - this._maxScroll) / this._validRatio), r = this._getTransCSS(0, n, t), this._content.fastCss(r)
            },
            _set: function() {
                var e = this;
                this._content.fastCss({
                    webkitTransitionDuration: "0s",
                    webkitTransform: "translate3d(0px, 0px, 0px)"
                }).one(i, function() {
                    e.trigger("allTransitionEnd")
                }), this.trigger("scrollchange", {
                    percent: 0,
                    speed: "0ms"
                })
            },
            _inertial: function() {
                var t = this,
                    n = this._getElementMatrix(this._content),
                    r = Math.abs(n.e - this._prev) < this._minSpeed ? 0 : n.e - this._prev,
                    s = Math.floor(n.e + r * this._baseSpeed * this._friction),
                    o = this._getValidTargetAxis(s),
                    u = this._getTransCSS(this._baseSpeed, o, n);
                if (this._options.snapWidth) {
                    0 < o && (o = 0);
                    var a = Math.abs(o),
                        f = 0,
                        l = this._options.snapWidth;
                    if (!isNaN(a)) {
                        while (a) l < a ? (a -= l, f += l) : (l / 2 < a && (f += l), a = 0);
                        o = -f, u = this._getTransCSS(this._baseSpeed / 3, o, n)
                    }
                }
                this._minSpeed < Math.abs(r) ? (this.trigger("allTransitionEnd"), this._content.fastCss(u).one(i, function() {
                    t._afterScroll(o)
                })) : 0 <= n.e ? (this.trigger("return:top", {
                    x: 0,
                    speed: this._backSpeed
                }), window.setTimeout(function() {
                    t._content && t._content.trigger(i)
                }, this._backSpeed), this._content.fastCss(this._getTransCSS(this._backSpeed, 0, n))) : n.e <= this._maxScroll ? (this.trigger("return:bottom", {
                    x: this._maxScroll,
                    speed: this._backSpeed
                }), window.setTimeout(function() {
                    t._content && t._content.trigger(i)
                }, this._backSpeed), this._content.fastCss(this._getTransCSS(this._backSpeed, this._maxScroll, n))) : this._content.fastCss(u).one(i, e.proxy(this._backSpeed / 3, this, o))
            },
            _afterScroll: function(e) {
                var t = this,
                    n = 0 < e ? this._getTransCSS(this._backSpeed, 0) : e < this._maxScroll ? this._getTransCSS(this._backSpeed, this._maxScroll) : undefined;
                0 < e ? this.trigger("return:top", {
                    x: 0,
                    speed: this._backSpeed
                }) : e < this._maxScroll ? this.trigger("return:bottom", {
                    x: this._maxScroll,
                    speed: this._backSpeed
                }) : this.trigger("ontrail", {
                    x: e,
                    speed: this._baseSpeed
                }), n && this._content.fastCss(n).one(i, function() {
                    t.trigger("allTransitionEnd")
                })
            },
            _st: function(e) {
                if (!this._isScrollable) return;
                var t = this._getElementMatrix(this._content),
                    n;
                this._isStarted = !0, this._isMoving = !1, this._isCancelScroll = !1, this._start = this._getAxis(e), this._currentX = t.e, this._prev = undefined, n = this._getTransCSS(0, Math.floor(this._currentX), t), this._content.fastCss(n).unbind(i)
            },
            _mv: function(e) {
                var t = this;
                this._isStarted && this._isScrollable && !this._isCancelScroll && this.throttle(function() {
                    var n = t._getElementMatrix(t._content),
                        r = t._getAxis(e),
                        i = r - t._start;
                    t._resetPrevAxis(n), t._scroll(i, n), t._isMoving = !0, e.preventDefault()
                }, a)
            },
            _ed: function(e) {
                if (!this._isScrollable || this._isCancelScroll) {
                    this._isStarted = !1, this._isMoving = !1;
                    return
                }
                this._isStarted && this._isMoving && (this._isMoving ? (e.preventDefault(), e.stopPropagation()) : this.trigger("allTransitionEnd")), this._isStarted = !1, this._isMoving = !1, this._start = undefined, this._currentX = undefined, this._inertial()
            },
            _getElementMatrix: function(e) {
                var t = "translate3d(0px , 0px, 0px)";
                return e && e[0] && (t = e[0].style.webkitTransform), new WebKitCSSMatrix(t)
            },
            _getAxis: function(e) {
                return e.clientX || e.touches[0].clientX || 0
            },
            _getValidTargetAxis: function(e) {
                return this._minScroll <= e ? e = this._minScroll : e <= this._maxOverScroll && (e = this._maxOverScroll), e
            },
            _getTransCSS: function(e, t, n) {
                var r = n || this._getElementMatrix(this._content),
                    i = +e === 0 ? "0" : e + "ms",
                    s, o;
                return e && (0 <= t || t <= this._maxScroll) && (i = this._backSpeed + "ms"), Math.floor(r.e * 1e3) === Math.floor(t * 1e3) && (t += .001, i = "1ms"), this.options.disableOverscroll && (t > 0 && (t = 0), t < this._maxScroll && (t = this._maxScroll)), s = {
                    webkitTransitionDuration: i,
                    webkitTransform: "translate3d(" + t + "px, 0px, 0px)"
                }, o = Math.round(t / (this._maxScroll - this._parentW) * 100), this.trigger("scrollchange", {
                    percent: o,
                    speed: this._isStarted ? "200ms" : i,
                    x: t,
                    isTouching: this._isStarted
                }), this._currentScroll = t, s
            },
            _resetPrevAxis: function(e) {
                e = e || this._getElementMatrix(this._content), this._prev = e.e
            },
            _checkScrollPosition: function() {
                var e;
                this._currentScroll < this._maxScroll && this._parentW < this._contentW ? (e = this._getTransCSS(this._baseSpeed, this._maxScroll), this._content.fastCss(e)) : this._currentScroll < this._maxScroll && (e = this._getTransCSS(this._baseSpeed, 0), this._content.fastCss(e))
            },
            cancelScroll: function() {
                this._isCancelScroll = !0, this._afterScroll()
            },
            getCurrentScroll: function() {
                var e = this._getElementMatrix(this._content);
                return e.e
            },
            getIsScrollable: function() {
                return this._isScrollable
            },
            getMovingState: function() {
                return this._isMoving
            },
            getScrollbarWidth: function() {
                return Math.floor(this._parentW / this._contentW * 100) + 1
            },
            getOverScrollHeight: function() {
                return this._validOverScroll
            },
            updateContent: function() {
                this._hasBuilt ? (this._setContent(), this._setProperties(), this._checkScrollPosition()) : this.initialize()
            },
            reset: function() {
                this._set(), this._isScrollable || this.trigger("noScrollNecessary")
            },
            dispose: function() {
                var e = this._eventHandler,
                    n = this.$el.get(0);
                e && n && (n.removeEventListener(r.st, e, !0), n.removeEventListener(r.mv, e, !0), n.removeEventListener(r.ed, e, !0), r.cc && this.$el.off(r.cc, e), this._eventHandler = null), this._content && (this._content.off(i), this._content = null), t.prototype.dispose.call(this)
            }
        })
    }), define("components/GlobalControl", ["underscore", "jquery", "components/ComponentBase", "lib/AnimationCut"], function(e, t, n, r) {
        var i = FF.env.isIOS6_x(),
            s = FF.env.isIOS7_0(),
            o = {
                VISIBILITY_METHOD_NAMES: {
                    SHOW: "show",
                    HIDE: "hide"
                },
                REGEX_WORLD: "^(world|event).*",
                REGEX_OTHER_THAN_GLOBAL_MENU: "^(world|event|party|gacha).*"
            };
        return n.extend({
            _viewName: "GlobalControl",
            _defaults: {
                classNames: []
            },
            CONTENT_TYPE: {
                BASE: "is-base-type",
                NO_NAVI: "is-no-navi-type",
                NO_FOOTER: "is-no-footer-type",
                NO_STATUS: "is-no-status-type",
                NO_BASE: "is-no-base-type",
                ONLY_BTN: "is-only-btn-type",
                ONLY_NEXT_BTN: "is-only-next-btn-type",
                ONLY_MITHRIL_STATUS: "is-only-mithril-status-type",
                HOME: "is-home-type",
                WORLD: "is-world-type",
                FOOTER_ON_BTN: "is-footer-on-btn-type"
            },
            DESIGN_TYPE: {
                MODERN: "is-modern-design",
                CLASSIC: "is-classic-design"
            },
            initialize: function() {
                var e = this;
                this._initializeVariables(), this._initAnimationCut(), this.anchorsEventHandlerFunc = function(t) {
                    e._onClickGlobalNavigation(t)
                }, this._checkOptions(), this._defineElements(), this._addEventListener(), this._onUpdateBadge(), this._loadPUrlImages()
            },
            _initializeVariables: function() {
                this._currentDesignType = undefined, this._applyVisibilityInElementsTimerId = undefined, this._statusElement = undefined, this._globalElement = undefined
            },
            _initAnimationCut: function() {
                r.initDeferred().done(function() {
                    r.apply()
                })
            },
            _defineElements: function() {
                this._statusElement = t("#fixed-top-status"), this._globalElement = t(".g-navigation")
            },
            _addEventListener: function() {
                var e = this;
                t(document).on("anchorsbeforejump", "[data-app-sound]:not(.g-navigation [data-app-sound])", function(t) {
                    e._onSoundEvent(t)
                }).on("updateBadge", function(t) {
                    e._onUpdateBadge(t)
                }).on("focusInput", this._onFocusInput).on("blurInput", this._onBlurInput).on("checkModalIsExist", this._checkModalIsExist).on("disableUserTouch", function(t) {
                    e.disableUserTouch(t)
                }).on("enableUserTouch", function(t) {
                    e.enableUserTouch(t)
                }), t(".g-navigation [data-mbgaui-anchors]").on("anchorsbeforejump", this.anchorsEventHandlerFunc)
            },
            _onClickGlobalNavigation: function(e) {
                if (e.type === "click") {
                    e.preventDefault(), e.stopPropagation();
                    return
                }
                if (!FF.router.loading.lock()) return;
                var n = t(e.currentTarget).attr("data-app-href"),
                    r = location.hash.substr(1);
                return r !== n ? (FF.datastore.stash.backPageHash && delete FF.datastore.stash.backPageHash, this._onSoundEvent(e), e.preventDefault(), FF.eventNotifier.trigger("globalnavi:changeLocation"), FF.router.loading.show(), window.setTimeout(function() {
                    location.hash = n
                }, 250)) : FF.router.loading.unlock(), !1
            },
            offAnchorsEventInGlobalNavigation: function() {
                t(".g-navigation [data-mbgaui-anchors]").off("anchorsbeforejump", this.anchorsEventHandlerFunc)
            },
            onAnchorsEventInGlobalNavigation: function() {
                this.offAnchorsEventInGlobalNavigation(), t(".g-navigation [data-mbgaui-anchors]").on("anchorsbeforejump", this.anchorsEventHandlerFunc)
            },
            _onSoundEvent: function(e) {
                var n = t(e.currentTarget),
                    r = "data-app-sound",
                    i = n.attr(r) || n.closest("[" + r + "]").attr(r),
                    s = i.toLowerCase() === "choose" ? "playChooseEffect" : i.toLowerCase() === "cancel" ? "playCancelEffect" : i.toLowerCase() === "ng" ? "playNgEffect" : i.toLowerCase() === "pay-gil" ? "playPayGilEffect" : "playDecideEffect";
                FF.SoundMgr[s]()
            },
            _addNewClass: function(e) {
                this._options.classNames.push(e)
            },
            apply: function(e, n) {
                var r = this,
                    i = e ? this.CONTENT_TYPE[e] : "",
                    s = n ? this.DESIGN_TYPE[n] : "",
                    o = i + " " + s;
                this._statusElement.show(), this._globalElement.show(), this._clearApplyVisibilityInElementsTimerId(), this._currentDesignType !== n && t("#headDeco, #footDeco").fastCss({
                    webkitTransitionDuration: ".01s"
                }).one("webkitTransitionEnd transitionend", function() {
                    t("#headDeco, #footDeco").fastCss({
                        webkitTransitionDuration: ".3s"
                    }), r._setApplyVisibilityInElementsTimer()
                }), this._currentContentType = e, this._currentDesignType = n, this._apply(o)
            },
            _apply: function(t) {
                if (!t) throw new Error("class name is not given or incorrect");
                var n = t.split(" "),
                    r = n.length;
                if (0 < r)
                    for (; r--;) this._options.classNames.indexOf(n[r]) < 0 && this._addNewClass(n[r]);
                var i = e.values(this.CONTENT_TYPE).join(" "),
                    s = e.values(this.DESIGN_TYPE).join(" ");
                this.$el.removeClass(i + " " + s), this.$el.addClass(t)
            },
            _setApplyVisibilityInElementsTimer: function() {
                var e = this;
                this._clearApplyVisibilityInElementsTimerId(), this._applyVisibilityInElementsTimerId = window.setTimeout(function() {
                    e._applyVisibilityInElements(e._currentContentType)
                }, 500)
            },
            _clearApplyVisibilityInElementsTimerId: function() {
                this._applyVisibilityInElementsTimerId && (window.clearTimeout(this._applyVisibilityInElementsTimerId), this._applyVisibilityInElementsTimerId = undefined)
            },
            _applyVisibilityInElements: function(e) {
                var t, n;
                switch (e) {
                    case "BASE":
                        t = "SHOW", n = "SHOW";
                        break;
                    case "NO_NAVI":
                        t = "SHOW", n = "HIDE";
                        break;
                    case "NO_STATUS":
                        t = "HIDE", n = "SHOW";
                        break;
                    case "NO_BASE":
                    case "ONLY_BTN":
                    case "ONLY_NEXT_BTN":
                        t = "HIDE", n = "HIDE";
                        break;
                    default:
                        t = "SHOW", n = "SHOW"
                }
                this._statusElement[o.VISIBILITY_METHOD_NAMES[t]](), this._globalElement[o.VISIBILITY_METHOD_NAMES[n]]()
            },
            updateGlobalHilight: function(e) {
                var n = "is-active";
                t("[data-app-globalnavi]").removeClass(n).filter(function() {
                    var t = this.getAttribute("data-app-globalnavi");
                    if (t === e) return !0
                }).addClass(n)
            },
            _onUpdateBadge: function(e, n) {
                n = n || {};
                var r = n.gift_box_num || FF.datastore.stash.giftBoxNum,
                    i = n.unchecked_notification_num || FF.datastore.notificationCollection.uncheckedNum(),
                    s = 0 < r + i;
                FF.datastore.stash.giftBoxNum = r, t("[data-app-gift-num]").html(r)[r ? "removeClass" : "addClass"]("vi-h"), t("[data-app-notify-num]").html(i)[i ? "removeClass" : "addClass"]("vi-h"), t("[data-app-footer-badge]").html(r + i)[s ? "removeClass" : "addClass"]("vi-h")
            },
            _onFocusInput: function() {
                FF.env.isIOS() && (i && t("[data-app-variation-onfocus]").addClass("po-a"), s && t("[data-app-eliminate-onfocus]").hide())
            },
            _onBlurInput: function() {
                FF.env.isIOS() && (i && t("[data-app-variation-onfocus]").removeClass("po-a"), s && t("[data-app-eliminate-onfocus]").show()), window.setTimeout(function() {
                    window.scrollTo(0, 1)
                }, 0)
            },
            _loadPUrlImages: function(e) {
                var t = document.querySelectorAll("[data-app-purl-img]"),
                    n = t.length,
                    r, i;
                for (; n--;) r = t[n], i = pUrl(r.getAttribute("data-purl-src")), r.setAttribute("src", i), r.removeAttribute("data-purl-src"), r.removeAttribute("data-app-purl-img")
            },
            disableUserTouch: function(e) {
                this.$el.addClass("pe-n ui-lock"), t("[data-mbgaui-anchors], [data-ui-components]").addClass("pe-n mbgaui-disabled")
            },
            enableUserTouch: function(e) {
                this.$el.removeClass("pe-n ui-lock"), t("[data-mbgaui-anchors], [data-ui-components]").removeClass("pe-n mbgaui-disabled")
            },
            _checkModalIsExist: function() {
                t(".modal").hasClass("open") && (t(".modal").removeClass("open").empty(), t(".overlay").addClass("hide"))
            },
            dispose: function() {
                t(".g-navigation [data-mbgaui-anchors]").off(), t(document).off(), n.prototype.dispose.apply(this, arguments)
            }
        })
    }), define("components/Indicator", ["jquery", "components/ComponentBase"], function(e, t) {
        return t.extend({
            _viewName: "Indicator",
            _defaults: {
                watch: undefined,
                enableTouch: !1
            },
            initialize: function() {
                this._setChildren(), this._checkOptions(), this._validate(), this._options.enableTouch && (this.addTouchBehavior(), this._bindEvents()), this._startWatching()
            },
            _setChildren: function() {
                this._children = this.$el.find("[data-ui-indicator-children]")
            },
            _validate: function() {
                if (!this._options.watch) throw new Error("Indicator.js: View to watch is not defined")
            },
            _startWatching: function() {
                this.listenTo(this._options.watch, "scrollchange", this._onScrollChange)
            },
            _onScrollChange: function(e) {
                var t = +e.index,
                    n = this._options.className;
                this._children.removeClass(n).eq(t).addClass(n)
            },
            _bindEvents: function() {
                var e = this;
                this.listenTo(this, "touchstarted touchmoved", function(t) {
                    e._onTouchEvent(t)
                })
            },
            _onTouchEvent: function(e) {
                var t = this;
                e.e.type === "touchstart" && (this._staticYAxis = e.y), this.throttle(function() {
                    t.trigger("pointElement", {
                        element: document.elementFromPoint(e.x, t._staticYAxis)
                    })
                }, 33)
            },
            getFirstChild: function() {
                return this._children.first()
            },
            getLastChild: function() {
                return this._children.last()
            },
            dispose: function() {
                this._children = null, t.prototype.dispose.call(this)
            }
        })
    }), define("components/LimitCheck", ["jquery", "components/ComponentBase"], function(e, t) {
        return t.extend({
            _viewName: "LimitCheck",
            initialize: function() {
                this._initializeVariabes(), this._setLimit(), this._checkOptions(), this._collectElements(), this._addEventListener(), this._updateState()
            },
            _initializeVariabes: function() {
                this._currentNum = 0, this._limitNum = 0
            },
            _setLimit: function() {
                this._limit = +this.$el.attr("data-ui-limitcheck-limit")
            },
            _collectElements: function() {
                this._children = this.$el.find("[data-ui-limitcheck-children]"), this._leftText = this._options.leftText || undefined
            },
            _addEventListener: function() {
                var e = this;
                this._children.on("change", function(t) {
                    e._updateState(t)
                })
            },
            _updateState: function() {
                this._updateCurrentNum(), this._updateCheckBoxes(), this._leftText && this._updateLeftText()
            },
            _updateCurrentNum: function() {
                var t = this._children.map(function() {
                    return e(this).prop("checked")
                });
                this._currentNum = t.toArray().sort().reverse().indexOf(!1), this._currentNum === -1 && (this._currentNum = this._children.size())
            },
            _updateCheckBoxes: function() {
                var t = this._limit <= this._currentNum ? !0 : !1,
                    n = this._limit - this._currentNum;
                this._children.each(function() {
                    e(this).prop("checked") || e(this).prop("disabled", t)
                }), this.trigger("changelimit", {
                    left: n
                })
            },
            _updateLeftText: function() {
                this._leftText.html(this._limit - this._currentNum)
            },
            dispose: function() {
                this._children.off("change"), this._children = null, t.prototype.dispose.call(this)
            }
        })
    }), define("components/Loading", ["components/ComponentBase"], function(e) {
        return e.extend({
            _viewName: "Loading",
            initialize: function() {
                this._isLocked = !1, this._addEventListener()
            },
            _addEventListener: function() {
                var e = this,
                    t;
                t = this._eventHandler = function(t) {
                    switch (t.type) {
                        case "showLoading":
                            e.show(t);
                            break;
                        case "hideLoading":
                            e.hide(t);
                            break;
                        case "lockLoading":
                            e.lock(t);
                            break;
                        case "unlockLoading":
                            e.unlock(t)
                    }
                }, $(document).on("showLoading", t).on("hideLoading", t).on("lockLoading", t).on("unlockLoading", t)
            },
            show: function() {
                this.lock(), this.$el.removeClass("hide"), this.trigger("openNotify")
            },
            showDeferred: function() {
                var e = $.Deferred(),
                    t = this.$el.hasClass("hide") ? FF.router.overlay.getOriginalSpeed() : 0;
                return window.setTimeout(function() {
                    e.resolve()
                }, t), this.show(), e.promise()
            },
            justHide: function() {
                this.$el.addClass("hide")
            },
            hide: function(e) {
                this.$el.addClass("hide"), e || this.trigger("closeNotify"), this.unlock()
            },
            isLocked: function() {
                return this._isLocked
            },
            lock: function() {
                if (this._isLocked) return;
                return this._isLocked = !0, $("body").fastCss("pointerEvents", "none"), $(document).trigger("disableUserTouch"), !0
            },
            unlock: function() {
                if (!this._isLocked) return;
                return this._isLocked = !1, $("body").fastCss("pointerEvents", "auto"), $(document).trigger("enableUserTouch"), !0
            },
            dispose: function() {
                var t = this._eventHandler;
                t && ($(document).off("showLoading", t).off("hideLoading", t).off("lockLoading", t).off("unlockLoading", t), this._eventHandler = null), e.prototype.dispose.call(this)
            }
        })
    }), define("components/LongTap", ["jquery", "components/Button"], function(e, t) {
        return t.extend({
            _viewName: "LongTap",
            _defaults: {
                disable_class: "mbgaui-disabled",
                message: undefined,
                longtap_message: undefined,
                longtap_duration: 500
            },
            initialize: function() {
                FF.logger.warn("WARNING: LongTap.js will be expired. Use anchorslongtap instead.", document.URL), this._initializeVariables(), t.prototype.initialize.apply(this, arguments), this.addTouchBehavior(), this._addEventListener()
            },
            _initializeVariables: function() {
                t.prototype._initializeVariables.apply(this, arguments), this._originalEvent = undefined, this._timer = undefined, this._validDistance = 10
            },
            __st: function(e) {
                t.prototype.__st.apply(this, arguments), this._originalEvent = e.originalEvent, this._initLongtap()
            },
            _mv: function(e) {
                (this._validDistance < Math.abs(e.diffX) || this._validDistance < Math.abs(e.diffY)) && this._expireLongtap()
            },
            __ed: function() {
                this._expireLongtap()
            },
            _initLongtap: function() {
                if (!this._timer) {
                    var e = this;
                    this._timer = window.setTimeout(function() {
                        e._onLongtapBehave()
                    }, this._options.longtap_duration)
                }
            },
            _expireLongtap: function() {
                this._timer && (window.clearTimeout(this._timer), this._timer = undefined)
            },
            _onLongtapBehave: function() {
                this._isMoved = !0;
                if (this._button.hasClass(this._options.disable_class)) return;
                this.trigger("longtap_message", {
                    long_message: this._options.longtap_message,
                    e: this._originalEvent
                }), this._expireLongtap()
            },
            _addEventListener: function() {
                var e = this;
                this._onAnchorsBeforeJump = function(t) {
                    e._expireLongtap(t)
                }, this.listenTo(this, "touchmoved", this._mv), this._button.on("anchorsbeforejump", this._onAnchorsBeforeJump)
            },
            dispose: function() {
                this._button && (this._button.off("anchorsbeforejump", this._onAnchorsBeforeJump), this._button = null, this._onAnchorsBeforeJump = null), this._timer && this._expireLongtap(), t.prototype.dispose.call(this)
            }
        })
    }), define("components/Meter", ["jquery", "components/ComponentBase"], function(e, t) {
        return t.extend({
            _viewName: "Meter",
            _defaults: {
                reverse: !1
            },
            initialize: function() {
                this._initializeVariables(), this._setCss(), this._checkOptions(), this._setMax()
            },
            _initializeVariables: function() {
                this._max = undefined
            },
            _setCss: function() {
                this.$el.fastCss({
                    webkitTransitionDuration: "1s"
                })
            },
            _setMax: function() {
                this._max = this.$el.attr("data-meter-max")
            },
            _getPercent: function(e) {
                var t = ~~(e / this._max * 100);
                return this._options.reverse && (t = 100 - t), t
            },
            changeTo: function(t) {
                var n = this._getPercent(t),
                    r = n + "%",
                    i;
                this.$el.fastCss("display", "block"), i = parseInt(this.$el.css("width"), 10);
                if (i === n) return 100 <= n;
                window.setTimeout(e.proxy(function() {
                    this.$el.fastCss({
                        width: r
                    })
                }, this), 1)
            },
            reset: function(t) {
                this._max = +t, this.$el.hide().width(0).fastCss({
                    webkitTransitionDuration: "1s"
                }), window.setTimeout(e.proxy(function() {
                    this._setCss()
                }, this), 10)
            }
        })
    }), define("components/Modal", ["underscore", "components/ComponentBase"], function(e, t) {
        var n = "webkitTransitionEnd transitionend";
        return t.extend({
            _viewName: "Modal",
            _defaults: {
                template: $("#modal-template")
            },
            events: {
                "anchorsbeforejump .btn-close": "close",
                "anchorsbeforejump [data-app-close]": "close",
                "anchorsbeforejump [data-app-btn-close]": "close"
            },
            initialize: function() {
                var e = this;
                this._initializeVariables(), this._checkOptions(), this._defineTemplate(), this._onAnchorsBeforeJump = function(t) {
                    e._onClickButton(t)
                }
            },
            _initializeVariables: function() {
                this._is_open = !1, this._is_empty = !0, this._template = undefined
            },
            _defineTemplate: function() {
                this._template = this._options.template.text()
            },
            _onClickButton: function(e) {
                var t = e.originalEvent.srcElement,
                    n = t.getAttribute("data-ui-trigger-event");
                this.trigger(n), this.close()
            },
            putContent: function(t) {
                if (this._is_open || !t) return;
                this._is_empty || this.empty();
                var n = this,
                    r = e.template(this._template, t);
                return this.$el.html(r), $("[data-ui-trigger-event]").on("anchorsbeforejump", this._onAnchorsBeforeJump), this._is_empty = !1, this
            },
            empty: function() {
                if (this._is_open) return;
                return this.$el.empty(), this._is_empty = !0, this
            },
            open: function() {
                if (this._is_empty) return;
                var e = this;
                return this.$el.addClass("open").one(n, function() {
                    e.trigger("openAnimationEnd")
                }), this._is_open = !0, this.trigger("openNotify"), this
            },
            close: function(e) {
                var t = this;
                return this.$el.removeClass("open").one(n, function() {
                    t.trigger("closeAnimationEnd")
                }), this._is_open = !1, e || this.trigger("closeNotify"), this
            },
            end: function(e) {
                this.close(e), this.dispose()
            },
            dispose: function() {
                $("[data-ui-trigger-event]").off("anchorsbeforejump", this._onAnchorsBeforeJump), this._onAnchorsBeforeJump = null, this.$el.off(n), this.$el.empty(), this.stopListening(), this.undelegateEvents()
            }
        })
    }), define("components/MonoSelector", ["components/ComponentBase"], function(e) {
        return e.extend({
            _viewName: "MonoSelector",
            _defaults: {
                idx: 0,
                className: "current",
                useOneAsFirstIndex: !1
            },
            events: {
                "anchorsbeforejump [data-app-ui-mono-selector-child]": "_onClickChildren"
            },
            initialize: function() {
                e.prototype.initialize.apply(this, arguments), this._initializeVariables(), this._checkOptions(), this._collectElements(), this._initializeDisplay()
            },
            _initializeVariables: function() {
                this._children = null, this._currentIndex = null
            },
            _collectElements: function() {
                this._children = this.$el.find("[data-app-ui-mono-selector-child]")
            },
            _initializeDisplay: function() {
                var e = this._getActualIndexByNum(this._options.idx);
                this._updateDisplayTo(e)
            },
            _onClickChildren: function(e) {
                var t = $(e.target).index(),
                    n = this._options.useOneAsFirstIndex ? t + 1 : t;
                if (this._currentIndex === t) return;
                this._currentIndex = t, this._updateDisplayTo(t), this.trigger("clickMonoSelector", {
                    index: t,
                    value: n
                })
            },
            _updateDisplayTo: function(e) {
                this._children.removeClass(this._options.className).eq(e).addClass(this._options.className)
            },
            _getActualIndexByNum: function(e) {
                return this._options.useOneAsFirstIndex ? e - 1 : +e
            }
        })
    }), define("components/Overlay", ["components/ComponentBase"], function(e) {
        return e.extend({
            _viewName: "Overlay",
            _defaults: {
                originalSpeed: "0.1s",
                fadingSpeed: "0.4s",
                originalTo: "rgba(0, 0, 0, 0.65)",
                fadingTo: "rgba(0, 0, 0, 1)",
                stripClass: "hide"
            },
            initialize: function() {
                e.prototype.initialize.apply(this, arguments), this._initializeVariables(), this._checkOptions()
            },
            _initializeVariables: function() {
                this._children = undefined
            },
            _show: function() {
                this.$el.fastCss({
                    webkitTransitionDuration: this._options.originalSpeed,
                    transitionDuration: this._options.originalSpeed,
                    backgroundColor: this._options.originalTo
                }).removeClass(this._options.stripClass)
            },
            _hide: function() {
                this.$el.fastCss({
                    webkitTransitionDuration: this._options.originalSpeed,
                    transitionDuration: this._options.originalSpeed,
                    backgroundColor: this._options.originalTo
                }).addClass(this._options.stripClass)
            },
            _fadeIn: function() {
                this.$el.fastCss({
                    webkitTransitionDuration: this._options.fadingSpeed,
                    transitionDuration: this._options.fadingSpeed
                }).addClass(this._options.stripClass)
            },
            _fadeOut: function() {
                this.$el.fastCss({
                    webkitTransitionDuration: this._options.fadingSpeed,
                    transitionDuration: this._options.fadingSpeed,
                    backgroundColor: this._options.fadingTo
                }).removeClass(this._options.stripClass)
            },
            registerChildren: function(e) {
                var t = this;
                this.listenTo(e, "openNotify", function() {
                    t._show()
                }).listenTo(e, "closeNotify", function() {
                    t._hide()
                }).listenTo(e, "fadeInNotify", function() {
                    t._fadeIn()
                }).listenTo(e, "fadeOutNotify", function() {
                    t._fadeOut()
                })
            },
            unregisterChildren: function(e) {
                this.stopListening(e)
            },
            getOriginalSpeed: function() {
                return this._defaults.originalSpeed.split("s")[0] * 1e3
            },
            dispose: function() {
                e.prototype.dispose.call(this)
            }
        })
    }), define("components/OverScrollable", ["jquery", "components/FreeScroll"], function(e, t) {
        var n = 2 / 3;
        return t.extend({
            _viewName: "OverScrollable",
            initialize: function() {
                this._initializeVariables(), this._setContent(), this._setProperties(), this._checkOptions();
                if (FF.env.isIOS() && this._options.useNativeScroll) {
                    this._initializeNativeScroll(), this._options.useLazyLoad ? this._initializeLazyLoad() : this._removeLazyLoad(), this._options.startUp && (this.$el.scrollTop(this._options.startUp), this.trigger("startedUp")), this.$el.attr("data-ui-freescroll-init-as", "native"), this._initializeAfterNativeScrollBind(), this._bindNativeScrollEvent();
                    return
                }
                this._removeLazyLoad(), this._bindEvent(), this._options.startUp ? this._startUp(this._options.startUp) : this._content.fastCss("webkitTransform", "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"), this._hasBuilt = !0, this._checkOptions(), this.listenTo(this, "scrollchange", this._onScroll).listenTo(this, "ontrail", this._onThrownOnTrail).listenTo(this, "return:top", this._onReturnTop).listenTo(this, "return:top:verylast:up", this._onReturnTopVeryLastUp).listenTo(this, "return:bottom", this._onReturnBottom), this._setExternalContentsHeight(), this._setPlayPxs()
            },
            _initializeVariables: function() {
                this._lastScroll = 0, this._upperPlayPx = 0, this._lowerPlayPx = 0, this._currentY = 0, this._sensorHeight = 50, this._contentSelector = this.options.contentSelector || this._contentSelector
            },
            _setProperties: function() {
                this._parentH = this.$el.height(), this._validOverScroll = this._parentH / this._validRatio, this._minScroll = this._validOverScroll, this._maxScroll = this._parentH - this._contentH, this._maxOverScroll = this._maxScroll - this._validOverScroll, this._hasBuilt || (this._isScrollable = this._parentH < this._contentH ? !0 : !1, this._isScrollable || this.trigger("noScrollNecessary"))
            },
            _bindNativeScrollEvent: function() {
                if (this._hasInitNativeScroll) return;
                this._hasInitNativeScroll = !0;
                var e = this;
                this.$el.on("scroll.overscrollable", function() {
                    var t = Math.abs(e._contentH - e._parentH - e.$el.scrollTop());
                    t < e._sensorHeight && (e.trigger("nativeScrollEnd"), e.trigger("allTransitionEnd"), e.trigger("overscroll:changeAnimation"))
                })
            },
            _setPlayPxs: function() {
                this._upperPlayPx = Math.floor(this._loadingOuterHeight * n), this._lowerPlayPx = Math.floor(-this._reloadOuterHeight * n)
            },
            _onScroll: function(e) {
                var t = e.y,
                    n, r;
                if (!e.isTouching) return;
                if (0 < t) this._options.reload && (n = this._reloadOuterHeight, r = t < n ? t : n, this._isStartedFromUpperEdge && (this._options.reload.fastCss({
                    opacity: this._getTwoDecimals(r / n),
                    webkitTransitionDuration: "0",
                    webkitTransform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + this._getTwoDecimals(r) + ", 0, 1)"
                }), this.trigger("overscroll:changeAnimation", {
                    target: this._options.reload,
                    method: this._upperPlayPx < t ? "addClass" : "removeClass"
                })));
                else if (t < this._maxScroll) {
                    if (this._options.loading) {
                        var i = t - this._maxScroll;
                        n = this._loadingOuterHeight, r = i < -n ? -n : i, this._isStartedFromLowerEdge && (this._options.loading.fastCss({
                            opacity: Math.abs(this._getTwoDecimals(r / n)),
                            webkitTransitionDuration: "0",
                            webkitTransform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + this._getTwoDecimals(r) + ", 0, 1)"
                        }), this.trigger("overscroll:changeAnimation", {
                            target: this._options.loading,
                            method: i < this._lowerPlayPx ? "addClass" : "removeClass"
                        }))
                    }
                } else this._hideExternalContent();
                this._lastScroll = t
            },
            _onThrownOnTrail: function(e) {
                this._hideExternalContent(e.speed)
            },
            _onReturnTop: function(e) {
                this._isStartedFromUpperEdge && this._options.reload && this._reloadOuterHeight * n < this._lastScroll && this.trigger("overscroll:down"), this._hideExternalContent(e.speed)
            },
            _onReturnTopVeryLastUp: function(e) {
                this._hideExternalContent(e.speed)
            },
            _onReturnBottom: function(e) {
                this._isStartedFromLowerEdge && this._options.loading && this._lastScroll <= this._maxScroll - this._loadingOuterHeight * n && this.trigger("overscroll:up"), this._hideExternalContent(e.speed)
            },
            _hideExternalContent: function(e) {
                var t = {
                    opacity: 0,
                    webkitTransitionDuration: e ? e + "ms" : "0",
                    webkitTransform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
                };
                this._options.reload && this._options.reload.fastCss(t), this._options.loading && this._options.loading.fastCss(t)
            },
            _setExternalContentsHeight: function() {
                this._options.reload && (this._reloadOuterHeight = this._options.reload.outerHeight()), this._options.loading && (this._loadingOuterHeight = this._options.loading.outerHeight())
            },
            resetActualScrollable: function() {
                this._actualScrollable = undefined
            },
            getActualScrollable: function() {
                return this._actualScrollable || (this._actualScrollable = this._parentH < this._contentH), this._actualScrollable
            },
            getScrollableWithCalculation: function() {
                return this.updateContent(), this._parentH < this._contentH
            },
            setContentHeightToParentHeight: function() {
                this._contentH < this._parentH ? this._content.height(this._parentH) : (this.resetContentHeightToParentHeight(), this.updateContent())
            },
            resetContentHeightToParentHeight: function() {
                this._content.height("auto")
            },
            rebindNativeScrollEvent: function() {
                this._bindNativeScrollEvent()
            },
            moveHeadToAxis: function(e) {
                this.updateContent();
                var t = e ? this.getMaxScroll() : 0;
                this._content.off().fastCss({
                    webkitTransitionDuration: "0ms",
                    webkitTransform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + t + ", 0, 1)"
                }), this.trigger("scrollchange", {
                    percent: t,
                    speed: "0ms"
                }), this._hasInitNativeScroll = !1
            },
            setIsScrollable: function(t) {
                t = t || {}, this.$el.off(".overscrollable"), this._hasInitNativeScroll = !1, window.setTimeout(e.proxy(function() {
                    this._isScrollable = t.isScrollable, this.trigger(this._isScrollable ? "scrollNecessary" : "noScrollNecessary")
                }, this), 0)
            }
        })
    }), define("components/QuantitySelector", ["components/ComponentBase", "components/Fluctuator", "components/CyclicButton", "components/Button"], function(e, t, n, r) {
        return e.extend({
            _viewName: "QuantitySelector",
            _defaults: {
                onIncrease: void 0,
                onDecrease: void 0,
                onMaximize: void 0,
                increaseBtnSelector: "[data-ui-fluctuator-increase]",
                decreaseBtnSelector: "[data-ui-fluctuator-decrease]",
                maximizeBtnSelector: "[data-ui-fluctuator-select-max]",
                inputSelector: "[data-ui-fluctuator-input]",
                maxAttrSelector: "data-ui-fluctuator-max",
                buttonSelector: ".button",
                disableButtonClass: "is-disable",
                incrementPerStep: 1,
                decrementPerStep: -1,
                autoViewUpdate: !0
            },
            initialize: function() {
                this._checkOptions(), e.prototype.initialize.apply(this, arguments), this._initializeVariables(), this._setupComponets(), this._bindEvents()
            },
            _initializeVariables: function() {
                this._fluctuator = void 0, this._increaseBtn = void 0, this._decreaseBtn = void 0, this._maximizeBtn = void 0, this._increaseBtnElm = void 0, this._decreaseBtnElm = void 0, this._maximizeBtnElm = void 0, this._max = void 0
            },
            _setupComponets: function() {
                this._initButtons();
                var e = this.$el.find(this._options.inputSelector);
                this._max = +e.attr(this._options.maxAttrSelector), this._fluctuator = new t({
                    el: e,
                    max: this._max,
                    increase: this._increaseBtn,
                    decrease: this._decreaseBtn
                }), this._options.current && this._fluctuator.setValue(this._options.current)
            },
            _initButtons: function() {
                this._increaseBtn = new n({
                    el: this.$el.find(this._options.increaseBtnSelector),
                    message: this._options.incrementPerStep,
                    disableClassName: "." + this._options.disableButtonClass,
                    parent: this
                }), this._decreaseBtn = new n({
                    el: this.$el.find(this._options.decreaseBtnSelector),
                    message: this._options.decrementPerStep,
                    disableClassName: "." + this._options.disableButtonClass,
                    parent: this
                });
                var e = this._options.buttonSelector;
                this._increaseBtnElm = this._increaseBtn.$el.find(e), this._decreaseBtnElm = this._decreaseBtn.$el.find(e);
                var t = this.$el.find(this._options.maximizeBtnSelector);
                t.size() ? (this._maximizeBtn = new r({
                    el: t
                }), this._maximizeBtnElm = this._maximizeBtn.$el.find(e)) : this._maximizeBtnElm = $()
            },
            _bindEvents: function() {
                var e = this;
                this.listenTo(this._increaseBtn, "message", function() {
                    e._onIncreaseButtonClick()
                }), this.listenTo(this._decreaseBtn, "message", function() {
                    e._onDecreaseButtonClick()
                }), this.listenTo(this._increaseBtn, "startNewTimer", function() {
                    e._expireTimerByEvent(), e._notifyNewTimer()
                }), this.listenTo(this._decreaseBtn, "startNewTimer", function() {
                    e._expireTimerByEvent(), e._notifyNewTimer()
                }), this.listenTo(FF.eventNotifier, "cyclicButton:expireAllTimer", function() {
                    e._expireTimerByEvent()
                }), this._maximizeBtn && this.listenTo(this._maximizeBtn, "message", function() {
                    e._notifyNewTimer(), e._onMaximizeButtonClick()
                })
            },
            _onIncreaseButtonClick: function() {
                if (this.getValue() > this.getMax()) return;
                this._notify(this._options.onIncrease), this._options.autoViewUpdate && this.updateFluctuatorView()
            },
            _onDecreaseButtonClick: function() {
                if (this.getValue() < 0) return;
                this._notify(this._options.onDecrease), this._options.autoViewUpdate && this.updateFluctuatorView()
            },
            _onMaximizeButtonClick: function() {
                if (this.getValue() == this.getMax()) return;
                var e = this._options.onMaximize;
                e || (this.setMax(), this.updateFluctuatorView()), this._notify(e)
            },
            _expireTimerByEvent: function() {
                this._increaseBtn.expireTimer(), this._decreaseBtn.expireTimer()
            },
            _notifyNewTimer: function() {
                FF.eventNotifier.trigger("cyclicButton:expireAllTimer")
            },
            _notify: function(e) {
                e && e(this), this.trigger("update", this)
            },
            updateFluctuatorView: function() {
                var e = this._options.disableButtonClass,
                    t = this.getValue();
                this._max === 0 ? (this._decreaseBtnElm.addClass(e), this._increaseBtnElm.addClass(e), this._maximizeBtnElm.addClass(e)) : t === 0 ? (this._decreaseBtnElm.addClass(e), this._increaseBtnElm.removeClass(e), this._maximizeBtnElm.removeClass(e)) : t === this._max ? (this._decreaseBtnElm.removeClass(e), this._increaseBtnElm.addClass(e), this._maximizeBtnElm.addClass(e)) : (this._decreaseBtnElm.removeClass(e), this._increaseBtnElm.removeClass(e), this._maximizeBtnElm.removeClass(e))
            },
            setIncreaseButtonEnabled: function(e) {
                this._setButtonEnabled(this._increaseBtnElm, e)
            },
            setDecreaseButtonEnabled: function(e) {
                this._setButtonEnabled(this._decreaseBtnElm, e)
            },
            setMaximizeButtonEnabled: function(e) {
                this._setButtonEnabled(this._maximizeBtnElm, e)
            },
            _setButtonEnabled: function(e, t) {
                var n = this._options.disableButtonClass;
                t ? e.removeClass(n) : e.addClass(n)
            },
            getIncreaseButtonEnabled: function() {
                return this._getButtonEnabled(this._increaseBtnElm)
            },
            getDecreaseButtonEnabled: function() {
                return this._getButtonEnabled(this._decreaseBtnElm)
            },
            getMaximizeButtonEnabled: function() {
                return this._getButtonEnabled(this._maximizeBtnElm)
            },
            _getButtonEnabled: function(e) {
                return !e.hasClass(this._options.disableButtonClass)
            },
            getValue: function() {
                return this._fluctuator.getValue()
            },
            setValue: function(e) {
                this._fluctuator.setValue(e)
            },
            resetValue: function() {
                this._fluctuator.resetValue()
            },
            getMax: function() {
                return this._max
            },
            setMax: function() {
                this._fluctuator.setValue(this._max)
            },
            isMax: function() {
                return this.getValue() === this.getMax()
            },
            changeMax: function(e) {
                this._max !== e && (this._max = e, this._fluctuator.changeMax(this._max))
            },
            dispose: function() {
                this._fluctuator.dispose(), this._increaseBtn.dispose(), this._decreaseBtn.dispose(), this._maximizeBtn && this._maximizeBtn.dispose(), e.prototype.dispose.apply(this, arguments)
            }
        })
    }), define("components/Ripple", ["underscore", "components/ComponentBase"], function(e, t) {
        return t.extend({
            _viewName: "Ripple",
            _defaults: {
                mainAnimDuration: 400,
                subAnimDuration: 800,
                isVisible: !0
            },
            initialize: function() {
                this._checkOptions(), this._collectElement(), this._addEventListener()
            },
            _collectElement: function() {
                this._rippleMain = $("#ripple"), this._rippleSub = $("#subRipple")
            },
            _addEventListener: function() {
                var e = this,
                    t;
                t = this._handler = function(t) {
                    e.onTouchStart(t)
                }, this.$el.parent().get(0).addEventListener("touchstart", t, !0)
            },
            onTouchStart: function(e) {
                var t = this,
                    n = e.touches,
                    r = n.length,
                    i = n[r - 1];
                this._functionalBehave(e, i);
                if (!this._options.isVisible) return;
                this._animationBehave(i)
            },
            _functionalBehave: function(e, t) {
                var n = this;
                this.stopTimer(), this.trigger("onTapScreen", {
                    originalEvent: e,
                    offset: {
                        x: t.pageX,
                        y: t.pageY
                    }
                })
            },
            _animationBehave: function(e) {
                var t = this;
                this.startTimer(), this._rippleMain.off().css({
                    left: e.pageX + "px",
                    top: e.pageY + "px"
                }).removeClass("animate"), this._rippleSub.off().css({
                    left: e.pageX + "px",
                    top: e.pageY + "px"
                }).removeClass("animate"), window.setTimeout(function() {
                    t._rippleMain.show().addClass("animate").on("webkitAnimationEnd animationend", function() {
                        $(this).hide()
                    }), t._rippleSub.show().addClass("animate").on("webkitAnimationEnd animationend", function() {
                        $(this).hide()
                    })
                }, 0)
            },
            stop: function() {
                this._rippleMain.hide(), this._rippleSub.hide()
            },
            startTimer: function() {
                var e = this;
                this._mainTimer = window.setTimeout(function() {
                    e._rippleMain.hide()
                }, this._options.mainAnimDuration), this._subTimer = window.setTimeout(function() {
                    e._rippleSub.hide()
                }, this._options.subAnimDuration)
            },
            stopTimer: function() {
                this._mainTimer && window.clearTimeout(this._mainTimer), this._subTimer && window.clearTimeout(this._subTimer)
            },
            setIsVisible: function(e) {
                if (typeof e != "boolean") throw new Error("Argument (flag to visibility) must be a boolean");
                this._options.isVisible = e
            },
            dispose: function() {
                this.stopTimer(), this.$el.parent().get(0).removeEventListener("touchstart", this._handler, !0), t.prototype.dispose.apply(this, arguments)
            }
        })
    }), define("components/Scrollbar", ["jquery", "components/ComponentBase"], function(e, t) {
        return t.extend({
            _viewName: "Scrollbar",
            initialize: function() {
                this._initializeVariables(), this._setFace(), this._setFaceHeight(), this._watch(), this._elHeight = this.$el.outerHeight(), this._faceHeight = this._face.outerHeight(), this.updateContent()
            },
            _initializeVariables: function() {
                this._face = undefined, this._current = 0, this._isNeverShown = this.options.watch.getIsNativeScrollAvailable()
            },
            _setFace: function() {
                this._face = this.$el.find("[data-ui-scrollbar-face]"), this._face.fastCss({
                    webkitTransitionTimingFunction: "cubic-bezier(.27, 1, .47, 1)"
                })
            },
            _setFaceHeight: function() {
                if (this._isNeverShown) {
                    this.$el.hide();
                    return
                }
                var e = this.options.watch,
                    t = e.getViewName(),
                    n = t === "FreeScroll",
                    r = t === "OverScrollable",
                    i = n ? undefined : r ? undefined : e.getChildrenNum(),
                    s;
                if (t === "Carousel" && i < 2) {
                    this.$el.hide();
                    return
                }
                s = i ? 100 / i : e.getScrollbarHeight(), this.options.faceHeight && (this._originalMaxScroll = 100 - s, s = this.options.faceHeight), (r || this._originalMaxScroll > 0) && e.getIsScrollable() && this.$el.show(), s += this.options.faceHeight ? "px" : "%", this._face && this._face.height(s)
            },
            _watch: function() {
                var e = this;
                this.listenTo(this.options.customScroller ? this.options.customScroller : this.options.watch, "scrollchange", function(t) {
                    e._onScrollChange(t)
                }).listenTo(this.options.watch, "noScrollNecessary", function() {
                    e._hide()
                }).listenTo(this.options.watch, "scrollNecessary", function() {
                    this._isNeverShown || e._show()
                })
            },
            _onScrollChange: function(e) {
                var t = e.speed || this._defaultSpeed,
                    n = e.percent / 100 * this._elHeight,
                    r = this.options.customScroller ? e.percent : e.percent / this._originalMaxScroll;
                this.options.disableOverscroll && (r < 0 ? r = 0 : 1 < r && (r = 1)), this.options.faceHeight && (n = (this._elHeight - this._faceHeight) * r), this._face.fastCss({
                    webkitTransitionDuration: t,
                    webkitTransform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + Math.floor(n) + ", 0, 1)"
                })
            },
            _hide: function() {
                this.$el.hide()
            },
            _show: function() {
                this.$el.show()
            },
            updateContent: function() {
                window.setTimeout(e.proxy(function() {
                    this.options.watch.updateContent(), this._setFaceHeight()
                }, this), 0)
            },
            updateContentWithScrollReset: function() {
                window.setTimeout(e.proxy(function() {
                    this.options.watch.updateContent(), this.options.watch.reset(), this._setFaceHeight()
                }, this), 0)
            },
            dispose: function() {
                this._face = null, t.prototype.dispose.call(this)
            }
        })
    }), define("components/ScrollbarX", ["jquery", "components/ComponentBase"], function(e, t) {
        return t.extend({
            _viewName: "ScrollbarX",
            initialize: function() {
                this._setFace(), this._setFaceWidth(), this._watch(), this._elWidth = this.$el.width(), this._faceWidth = this._face.width()
            },
            _initializeVariables: function() {
                this._face = undefined, this._current = 0
            },
            _setFace: function() {
                this._face = this.$el.find("[data-ui-scrollbar-face]"), this._face.fastCss("webkitTransitionTimingFunction", "cubic-bezier(.27, 1, .47, 1)")
            },
            _setFaceWidth: function() {
                var e = this.options.watch,
                    t = e.getViewName(),
                    n = t === "FreeScrollX",
                    r = t === "FreeScrollX" ? undefined : e.getChildrenNum(),
                    i;
                if (t === "Carousel" && r < 2) {
                    this.$el.hide();
                    return
                }
                i = r ? 100 / r : e.getScrollbarWidth(), this.options.faceWidth && (this._originalMaxScroll = 100 - i, i = this.options.faceWidth), this._originalMaxScroll > 0 && this.$el.show(), i += this.options.faceWidth ? "px" : "%", this._face.width(i)
            },
            _watch: function() {
                var e = this;
                this.listenTo(this.options.watch, "scrollchange", function(t) {
                    e._onScrollChange(t)
                }).listenTo(this.options.watch, "noScrollNecessary", function() {
                    e._hide()
                }).listenTo(this.options.watch, "scrollNecessary", function() {
                    e._show()
                })
            },
            _onScrollChange: function(e) {
                var t = e.speed || this._defaultSpeed,
                    n = e.percent / 100 * this._elWidth,
                    r = e.percent / this._originalMaxScroll;
                this.options.disableOverscroll && (r < 0 ? r = 0 : 1 < r && (r = 1)), this.options.faceWidth && (n = (this._elWidth - this._faceWidth) * r), this._face.fastCss({
                    webkitTransitionDuration: t,
                    webkitTransform: "translate3d(" + Math.floor(n) + "px, 0px, 0px)"
                })
            },
            _hide: function() {
                this.$el.hide()
            },
            _show: function() {
                this.$el.show()
            },
            updateContent: function() {
                this.options.watch.updateContent(), this._setFaceWidth()
            },
            dispose: function() {
                this._face = null, t.prototype.dispose.call(this)
            }
        })
    }), define("components/SlideIn", ["jquery", "components/ComponentBase"], function(e, t) {
        var n = "webkitTransitionEnd transitionend";
        return t.extend({
            _viewName: "SlideIn",
            _defaults: {
                direction: 0
            },
            initialize: function() {
                this._initializeVariables(), this._checkOptions(), this._calc()
            },
            _initializeVariables: function() {
                this._children = null, this._gapX = null, this._gapY = null, this._moveX = null, this._moveY = null, this._isSwitched = !1
            },
            _calc: function() {
                var e = this.$el.find(".slide-state"),
                    t = e.eq(0),
                    n = e.eq(1),
                    r = t.offset(),
                    i = n.offset(),
                    s = this._options.direction;
                this._children = e, this._gapX = r.left - i.left, this._gapY = r.top - i.top, this._moveX = s ? 0 : this._gapX, this._moveY = s ? this._gapY : 0
            },
            slide: function() {
                if (this._isSwitched) {
                    this.trigger("slide:switched");
                    return
                }
                var e = this;
                this._children.css({
                    pointerEvents: "none",
                    webkitTransform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, " + this._moveX + ", " + this._moveY + ", 0, 1)",
                    transform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, " + this._moveX + ", " + this._moveY + ", 0, 1)"
                }).eq(0).one(n, function() {
                    e._children.css("pointerEvents", "auto"), e.trigger("slide:switched"), e._isSwitched = !0
                })
            },
            back: function(e) {
                if (!this._isSwitched) {
                    this.trigger("slide:original");
                    return
                }
                var t = this;
                this._children.css({
                    pointerEvents: "none",
                    webkitTransform: "",
                    transform: ""
                }).eq(0).one(n, function() {
                    t._children.css("pointerEvents", "auto"), t.trigger("slide:original"), t._isSwitched = !1
                })
            },
            dispose: function() {
                this._children && (this._children.off(n), this._children = null), t.prototype.dispose.call(this)
            }
        })
    }), define("components/Tab", ["underscore", "jquery", "components/ComponentBase"], function(e, t, n) {
        return n.extend({
            _viewName: "Tab",
            _defaults: {
                defaultPage: undefined
            },
            _currentPane: void 0,
            initialize: function() {
                this._initializeVariables(), this._checkOptions(), this._defineElements(), this._addEventListener(), this._changeState()
            },
            _initializeVariables: function() {
                this._current = 0, this._elements = {
                    tabs: undefined,
                    panes: undefined
                }
            },
            _defineElements: function() {
                this._elements.tabs = this._options.tabs, this._elements.panes = this._options.panes
            },
            _addEventListener: function() {
                var e = this,
                    t;
                t = this._eventHandler = function(t) {
                    e._options.customEvent ? e._options.customEvent(t) : e.ready(t)
                }, this._elements.tabs.on("anchorsbeforejump", t)
            },
            ready: function(e) {
                var n = t(e.currentTarget),
                    r;
                while (n.get(0).tagName.toLowerCase() !== "li") n = n.parent();
                r = n.index(), this._changeState(r)
            },
            _changeState: function(n) {
                var r = this._options.className;
                n === 0 && (n = "0"), this._updatePaneStyle(r, n);
                var i = this._currentPane || t();
                this._currentPane = e.find(this._elements.panes, function(e) {
                    return t(e).hasClass(r)
                }), this.trigger("changedState", {
                    index: n,
                    prevPane: i,
                    currentPane: this._currentPane
                })
            },
            _updatePaneStyle: function(e, t) {
                this._elements.tabs.removeClass(e).eq(t || this._options.defaultPage || 0).addClass(e);
                if (!this._elements.panes) return;
                this._elements.panes.removeClass(e).eq(t || this._options.defaultPage || 0).addClass(e)
            },
            changeState: function(e) {
                this._changeState(e)
            },
            hideInactivePanes: function(n) {
                if (!this._elements.panes) return;
                n = n || "di-n";
                var r = this._options.className;
                e.each(this._elements.panes, function(e) {
                    var i = t(e);
                    i.hasClass(r) || i.addClass(n)
                })
            },
            dispose: function() {
                this._elements && this._eventHandler && (this._elements.tabs.off("anchorsbeforejump", this._eventHandler), this._elements.tabs = null, this._elements.panes = null, this._eventHandler = null), n.prototype.dispose.call(this)
            }
        })
    }), define("components/TimeKeeper", ["components/ComponentBase"], function(e) {
        var t = {
            jp: {
                YYYYMMDDHHII: {
                    format: "%Y年%M月%D日 %H時%I分",
                    months: "01 02 03 04 05 06 07 08 09 10 11 12".split(" ")
                }
            },
            en: {
                MMDDHHII: {
                    format: "%M/%D %H:%I",
                    months: "01 02 03 04 05 06 07 08 09 10 11 12".split(" ")
                },
                YYYYMMDDHHII: {
                    format: "%Y/%M/%D %H:%I",
                    months: "JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC".split(" ")
                },
                DDMMYYYYHHII: {
                    format: "%D/%M/%Y %H:%I",
                    months: "JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC".split(" ")
                },
                "YYYY/MM/DD_HH:II": {
                    format: "%Y/%M/%D %H:%I",
                    months: "01 02 03 04 05 06 07 08 09 10 11 12".split(" ")
                }
            }
        };
        return e.extend({
            _viewName: "TimeKeeper",
            _defaults: {
                format: "%W, %M %D, %Y %h:%i:%s %a",
                months: "Jan. Feb. Mar. Apr. May Jun. Jul. Aug. Sep. Oct. Nov. Dec.".split(" "),
                weekdays: "Sun. Mon. Tue. Wed. Thu. Fri. Sat.".split(" "),
                ampm: "A.M. P.M.".split(" "),
                is24h: !1,
                timeZoneOffset: 32400
            },
            initialize: function() {
                e.prototype.initialize.apply(this, arguments), this._initializeVariables(), this._checkOptions(), this._checkPreset()
            },
            _initializeVariables: function() {
                this._unixtime = undefined, this._date = undefined
            },
            _checkPreset: function() {
                if (this._options.preset) {
                    var e = this._options.preset,
                        n = e.language,
                        r = e.format;
                    if (t[n] && t[n][r]) {
                        var i = t[n][r];
                        this._options.format = i.format || this._options.format, this._options.months = i.months || this._options.months, this._options.weekdays = i.weekdays || this._options.weekdays, this._options.ampm = i.ampm || this._options.ampm, this._options.is24h = i.is24h === undefined ? this._options.is24h : i.is24h, this._options.timeZoneOffset = i.timeZoneOffset || this._options.timeZoneOffset
                    }
                }
            },
            _setUnixTime: function(e) {
                this._unixtime = parseInt(e, 10) * 1e3, isNaN(this._unixtime) && (this._unixtime = 0)
            },
            _setUnixMilliSec: function(e) {
                this._unixtime = parseInt(e, 10), isNaN(this._unixtime) && (this._unixtime = 0)
            },
            _createTimeObject: function() {
                this._date = new Date(this._unixtime)
            },
            _getDateValues: function(e) {
                var t = new Date(e * 1e3 + this._date.getTime());
                return {
                    year: t.getUTCFullYear(),
                    fullYear: t.getUTCFullYear(),
                    month: t.getUTCMonth(),
                    date: t.getUTCDate(),
                    day: t.getUTCDay(),
                    hours: t.getUTCHours(),
                    minutes: t.getUTCMinutes(),
                    seconds: t.getUTCSeconds()
                }
            },
            _analyseFormat: function(e, t) {
                var n = e,
                    r = this._getDateValues(t),
                    i = r.month,
                    s = r.date,
                    o = r.day,
                    u = r.hours,
                    a = r.minutes,
                    f = r.seconds;
                return n = n.replace(/%Y/g, r.fullYear).replace(/%M/g, this._options.months[i]).replace(/%D/g, $.proxy(function() {
                    return this._fixDecimal(s)
                }, this)).replace(/%W/g, this._options.weekdays[o]).replace(/%H/g, $.proxy(function() {
                    var e = u;
                    return e = this._options.is24h && 11 < e ? e - 12 : e, e = this._fixDecimal(e), e
                }, this)).replace(/%I/g, $.proxy(function() {
                    return this._fixDecimal(a)
                }, this)).replace(/%S/g, $.proxy(function() {
                    return this._fixDecimal(f)
                }, this)).replace(/%y/g, r.year).replace(/%m/g, this._options.months[i]).replace(/%d/g, s).replace(/%w/g, this._options.weekdays[o]).replace(/%h/g, u).replace(/%i/g, a).replace(/%s/g, f).replace(/%a/g, $.proxy(function() {
                    return this._options.ampm[(u - 12) / 12 < 0 ? 0 : 1]
                }, this)), n
            },
            _fixDecimal: function(e) {
                return this._getPadTxt(e, 2)
            },
            setUnixTime: function(e) {
                return this._setUnixTime(e), this._createTimeObject(), this
            },
            getString: function(e) {
                e = e || {};
                var t = e.format || this._options.format,
                    n = e.timeZoneOffset !== undefined ? e.timeZoneOffset : this._options.timeZoneOffset;
                if (typeof e == "string" || e instanceof String) t = e;
                return this._analyseFormat(t, n)
            },
            getIsLeapYear: function() {
                var e = this._date.getFullYear();
                return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
            }
        })
    }), define("components/Timer", ["jquery", "components/ComponentBase"], function(e, t) {
        return t.extend({
            _viewName: "Timer",
            initialize: function(e) {
                this._initializeVariables(), this._checkOptions(), this._updateDisplay(), this._setEachTimingFunction(), this._remaining && (this._startTime = +(new Date), this._startTimer())
            },
            _initializeVariables: function() {
                this._startTime = null, this._timer = null, this._onTimerEnd = null, this._interval = 300, this._past = 0, this._remaining = 0, this._timing = []
            },
            _checkOptions: function() {
                t.prototype._checkOptions.apply(this, arguments), this._remaining = this._options.remaining
            },
            _startTimer: function() {
                this.$el.parent().addClass("counting"), this._timer = window.setInterval(e.proxy(this._countIn, this), this._interval)
            },
            _stopTimer: function() {
                this.$el.parent().removeClass("counting"), window.clearTimeout(this._timer), this._timer = null
            },
            _setEachTimingFunction: function() {
                var e = this._remaining,
                    t = this._options.onEachMs;
                while (t < e) e -= t, this._timing.unshift(e)
            },
            _countIn: function() {
                this._remaining -= this._interval, this._past += this._interval, this._remaining <= 0 && (this._remaining = 0, this._stopTimer(), this._options.onTimerEnd && this._options.onTimerEnd()), this._timing[0] <= this._past && (this._timing.shift(), this._options.onEachFn()), this._updateDisplay()
            },
            _updateDisplay: function() {
                var e = this._translate(this._displayMs());
                this.$el.html(e)
            },
            _displayMs: function() {
                return this._options.displayType === "EACH" ? this._timing.length ? this._timing[0] - this._past : this._remaining : this._remaining
            },
            _translate: function(e) {
                var t = 0,
                    n = 0,
                    r = 0,
                    i;
                while (36e5 < e) e -= 36e5, t++;
                while (6e4 < e) e -= 6e4, n++;
                while (1e3 < e) e -= 1e3, r++;
                return i = 0 < t ? this._getPadTxt(t, 2) + ":" : "", i += this._getPadTxt(n, 2) + ":" + this._getPadTxt(r, 2), i
            },
            _forceUpdate: function() {
                var e = +(new Date),
                    t = this._startTime,
                    n = this._options.remaining,
                    r = t + n,
                    i = r - e,
                    s = n - i;
                while (this._timing[0] < s) this._timing.shift(), this._options.onEachFn && this._options.onEachFn();
                this._remaining = i, this._past = s, this._updateDisplay(), this._startTimer()
            },
            forceUpdate: function() {
                this._stopTimer(), this._forceUpdate()
            },
            disposeFunctionality: function() {
                this._stopTimer(), t.prototype.disposeFunctionality.apply(this, arguments)
            }
        })
    }), define("components/Toast", ["jquery", "underscore", "components/ComponentBase"], function(e, t, n) {
        var r = "webkitAnimationStart animationstart",
            i = "webkitAnimationEnd animationend";
        return n.extend({
            _viewName: "Toast",
            initialize: function() {
                this._initializeVariables(), this._checkOptions(), this._setTemplate(), this._setEvent()
            },
            _initializeVariables: function() {
                this._lastBake = undefined, this._lastBakedTopping = undefined, this._template = undefined, this._isMoving = !1, this._queue = []
            },
            _setTemplate: function() {
                this._template = e(this.$el).text()
            },
            _setEvent: function() {
                var t = this;
                e(document).on("documentanchorsnotify", function() {
                    t.eatAll()
                })
            },
            hasTopping: function() {
                return !!this._queue.length
            },
            topping: function(e) {
                return e && this._queue.push(e), this
            },
            bake: function() {
                var n = this;
                if (this._queue.length) {
                    if (!this._isMoving) {
                        var s = "toast" + +(new Date),
                            o = this._queue[0],
                            u = {
                                data: {
                                    id: s,
                                    topping: o
                                }
                            },
                            a = t.template(this._template, u);
                        this._isMoving = !0, e(this._options.parent).append(a), this._lastBake = e("#" + s), this._lastBake.on("touchstart", function(e) {
                            e.preventDefault()
                        }), this._lastBakedTopping = o, this._queue.shift(), this._lastBake.one(r, function() {
                            n.trigger("bakeStart")
                        }).one(i, function() {
                            n.eat().bake()
                        })
                    }
                } else this._lastBake = undefined;
                return this
            },
            eat: function() {
                return this._lastBake && this._lastBake.off().remove(), this._isMoving = !1, this
            },
            eatAll: function() {
                return this._lastBake && this._lastBake.off().remove(), e(".c-toast").off().remove(), this._queue.length = 0, this._isMoving = !1, this
            },
            leaveLeft: function() {
                return this._lastBakedTopping && this._queue.unshift(this._lastBakedTopping), this._lastBakedTopping = undefined, this._lastBake && this._lastBake.off().remove(), this._isMoving = !1, this
            },
            getIsMoving: function() {
                return this._isMoving
            },
            dispose: function() {
                this.eatAll(), this.disposeFunctionality()
            }
        })
    }), define("components/ToggleButton", ["components/Button"], function(e) {
        return e.extend({
            _viewName: "ToggleButton",
            _defaults: {
                className: "active",
                state: !1,
                message: undefined
            },
            events: {
                "anchorsbeforejump .button": "toggle"
            },
            initialize: function() {
                e.prototype.initialize.apply(this, arguments), this._initializeVariables(), this._checkState()
            },
            _initializeVariables: function() {
                this._currentState = !1
            },
            _checkState: function() {
                var e = this._options.state ? "addClass" : "removeClass";
                this._currentState = this._options.state, this.$el[e](this._options.className)
            },
            toggle: function() {
                this._currentState = !this._currentState;
                var e = this._currentState ? "addClass" : "removeClass";
                this.$el[e](this._options.className), this.trigger("message", {
                    message: this._options.message,
                    state: this._currentState
                })
            }
        })
    }), define("components/UpDownButton", ["jquery", "backbone", "components/CyclicButton", "components/Fluctuator"], function(e, t, n, r) {
        return t.View.extend({
            option: {
                selector: {
                    input: "[data-ui-fluctuator-input]",
                    increase: "[data-ui-fluctuator-increase]",
                    decrease: "[data-ui-fluctuator-decrease]",
                    innerButton: ".button"
                },
                attr: {
                    max: "data-ui-fluctuator-max"
                },
                className: {
                    disable: "is-disable"
                }
            },
            initialize: function(t, n) {
                this.$el = t, this.option = e.extend(!0, this.option, n.option || {}), this.initialState = n.initialState || {}, this.state = e.extend(!0, {
                    value: 0,
                    increaseable: !1,
                    decreasable: !1,
                    isMax: !1
                }, this.initialState || {}), this._setupFluctuator(), this._updateView()
            },
            _setupFluctuator: function() {
                var t = this,
                    i = this.option;
                this.increaseBtn = new n({
                    el: this.$el.find(i.selector.increase),
                    message: 1,
                    disableClassName: "." + i.className.disable,
                    parent: t
                }), this.decreaseBtn = new n({
                    el: this.$el.find(i.selector.decrease),
                    message: -1,
                    disableClassName: "." + i.className.disable,
                    parent: t
                });
                var s = this.$el.find(i.selector.input),
                    o = +s.attr(i.attr.max);
                this.fluctuator = new r({
                    el: e(s),
                    max: o > 0 ? o : 9999999,
                    increase: this.increaseBtn,
                    decrease: this.decreaseBtn
                }), t.listenTo(this.increaseBtn, "message", function() {
                    FF.SoundMgr.playChooseEffect()
                }), t.listenTo(this.decreaseBtn, "message", function() {
                    FF.SoundMgr.playChooseEffect()
                }), t.listenTo(this.increaseBtn, "startNewTimer", function() {
                    t._expireTimerByEvent(), t._notifyNewTimer()
                }), t.listenTo(this.decreaseBtn, "startNewTimer", function() {
                    t._expireTimerByEvent(), t._notifyNewTimer()
                }), this.listenTo(FF.eventNotifier, "cyclicButton:expireAllTimer", function() {
                    t._expireTimerByEvent()
                }), this.listenTo(this.fluctuator, "valueChanged", function(n) {
                    t.state = e.extend(!0, this.initialState, {
                        value: n.value,
                        increaseable: !n.isMax,
                        decreasable: !n.isZero,
                        isMax: n.isMax
                    }), t._updateView(), this.trigger("valueChanged", t.state)
                })
            },
            _updateView: function() {
                var e = this.state,
                    t = this.option;
                !e.isMax && e.increaseable ? this.increaseBtn.$el.find(t.selector.innerButton).removeClass(t.className.disable) : this.increaseBtn.$el.find(t.selector.innerButton).addClass(t.className.disable), e.decreasable ? this.decreaseBtn.$el.find(t.selector.innerButton).removeClass(t.className.disable) : this.decreaseBtn.$el.find(t.selector.innerButton).addClass(t.className.disable)
            },
            _expireTimerByEvent: function() {
                this.increaseBtn.expireTimer(), this.decreaseBtn.expireTimer()
            },
            _notifyNewTimer: function() {
                FF.eventNotifier.trigger("cyclicButton:expireAllTimer")
            },
            updateState: function(t) {
                this.state = e.extend(!0, this.state, t), this._updateView()
            },
            reset: function(e) {
                this.updateState(e), this.fluctuator.resetValue()
            },
            dispose: function() {
                this.increaseBtn.dispose.call(this), this.decreaseBtn.dispose.call(this), this.fluctuator.dispose.call(this)
            }
        })
    });