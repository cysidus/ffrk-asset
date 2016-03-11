define("event/AppHelperBase", ["backbone", "sprintf", "lib/ClassBase"], function(e, t, n) {
        return n.extend({
            getTermText: function(e) {
                var t = e.getWorldModel();
                return t.getOpenedToClosedTermText()
            },
            canShowEventList: function(e) {
                var t = e.getWorldModel();
                return t.isOpenedToClosedTerm()
            },
            getImagePath: function(e) {
                return e.get("image_path")
            },
            getBackgroundImagePath: function(e) {
                return e.get("background_image_path")
            },
            getBannerImageClass: function(e) {
                return t("is-%s", e.get("type_name"))
            }
        })
    }), define("event/special/app/models/EventItem", ["backbone", "lib/Model", "sprintf", "util"], function(e, t, n, r) {
        return t.extend({})
    }), define("event/special/app/models/EventPrize", ["underscore", "backbone", "lib/Model", "sprintf", "util"], function(e, t, n, r, i) {
        var s = n.extend({
                getItemTypeNames: function() {
                    var t = this.get("item_package").items,
                        n = e.map(t, function(e) {
                            return e.item_type_name
                        });
                    return e.uniq(n)
                },
                getPrizeName: function() {
                    var t = "";
                    return e.each(this.get("item_package").items, function(e) {
                        t += e.item_name + "x" + e.num
                    }), t
                },
                getImagePath: function() {
                    return this.get("item_package").items[0].image_path
                },
                canExchange: function(e) {
                    var t = 1;
                    return e < this.get("required_num") ? !1 : this.isUnlimitedExchange() ? !0 : this.get("exchanged_num") + t <= this.get("exchangeable_num")
                },
                isUnlimitedExchange: function() {
                    return this.get("exchangeable_num") === 0
                },
                remainExchangeableNum: function() {
                    return this.get("exchangeable_num") - this.get("exchanged_num")
                },
                incrementExchangedNum: function() {
                    this.set("exchanged_num", this.get("exchanged_num") + 1)
                },
                hasBuddy: function() {
                    return e.any(this.get("item_package").items, function(e) {
                        return e.type_name.toLowerCase() === "buddy"
                    })
                },
                getExchangeWord: function() {
                    return this.hasBuddy() ? FF.TextMaster.get("special_event_exchange_word_for_buddy") : FF.TextMaster.get("special_event_exchange_word_for_general")
                }
            }),
            o = null;
        return o = s.extend({
            getPrizeName: function() {
                var t = "";
                return e.each(this.get("item_package").items, function(e) {
                    t += e.item_name + " x " + e.num
                }), t
            }
        }), o || s
    }), define("event/special/app/collections/EventPrize", ["lib/Collection", "../models/EventPrize"], function(e, t) {
        return e.extend({
            model: t,
            getSortedModelsForDisplay: function() {
                return this.models.sort(function(e, t) {
                    return e.get("disp_order") < t.get("disp_order") ? -1 : e.get("disp_order") > t.get("disp_order") ? 1 : e.get("id") > t.get("id") ? -1 : e.get("id") < t.get("id") ? 1 : 0
                })
            }
        })
    }), define("event/special/app/Helper", ["underscore", "jquery", "backbone", "util", "scenes/common/util/Api", "event/AppHelperBase", "lib/ClassBase", "scenes/common/collections/Dungeon", "./models/EventItem", "./collections/EventPrize"], function(e, t, n, r, i, s, o, u, a, f) {
        return s.extend({
            setupEventDeferred: function(e) {
                var r = t.Deferred();
                if (FF.datastore.getEventData(e)) return r.resolve().promise();
                var s = FF.datastore.eventCollection.get(e),
                    o = s.getWorldModel();
                return o.isLocked() ? (n.history.navigate(s.getIntroFragment(), {
                    trigger: !0
                }), r.reject().promise()) : (i.getEventDataDeferred(e, s.get("type_name")).done(function(t) {
                    FF.datastore.setEventData(e, {
                        eventItemModel: new a(t.event_item),
                        eventPrizeCollection: new f(t.prizes)
                    }), r.resolve()
                }), r.promise())
            },
            getTermText: function(e) {
                var t = e.getWorldModel();
                return t.isKeptOutToClosedTerm() ? t.getOpenedToClosedTermText() : t.getOpenedToKeptOutTermText()
            },
            getBannerImageClass: function(e) {
                var t = e.getWorldModel();
                return t.isKeptOutToClosedTerm() ? "is-collection-close" : "is-collection"
            },
            getPrizeExchangeBackgroundImagePath: function() {
                return pUrl("/dff/static/img/event/common/prize_exchange_bg.png")
            }
        })
    }), define("templates_event/special/dungeon_list/DungeonList", [], function() {
        return function(a) {
            function print() {
                __p += __j.call(arguments, "")
            }
            a || (a = {});
            var b, __p = "",
                __e = _.escape,
                __j = Array.prototype.join;
            with(a) __p += '<div class="layer-bg w-full h-full" data-app-layer-bg></div>\n<div class="layer-content-1 dungeon-list-layout-scroll special mod-freescroll-wrap mod-basic" data-ui-freescroll data-app-dungeon-list-scroll>\n    <div data-ui-freescroll-content>\n        <ul class="list-decoration locked layout-special">\n            ', _.each(dungeonModels, function(e) {
                __p += "\n            ";
                var t = e.get("is_unlocked");
                __p += '\n\n                <li class="flag-unlocked" data-dungeon-id="' + __e(e.get("id")) + '" data-mbgaui-anchors data-app-sound="choose" data-app-flag-unlock>\n                    <div class="inner box-cb flex1">\n                        <div>' + __e(e.get("name")) + "</div>\n                    </div>\n                 </li>\n            "
            }), __p += '\n        </ul>\n        <div class="btn-wide" data-mbgaui-anchors data-app-sound="choose" data-app-btn-intro>\n            <span class="inner">Event Rules</span>\n        </div>\n    </div>\n    <div class="scrollbar" data-ui-scrollbar><div class="inner" data-ui-scrollbar-face></div></div>\n</div>\n<div class="layer-content-11 dungeon-list-layout special" data-app-dungeon-list>\n    <h1 class="hdr-content">\n        <div class="inner">\n            <span class="title-name">' + __e(worldModel.get("name")) + '</span>\n            <!--  -->\n            <!-- /*ifdef wwlcd*/ -->\n            <div class="period mod-bg-alpha">\n                Available Through <span class="tl-time mr-b">PST</span>' + __e(timeKeeper.setUnixTime(worldModel.get("kept_out_at")).getPSTString()) + '\n                <span class="tl-time mr-b ml-b">UTC</span>' + __e(timeKeeper.setUnixTime(worldModel.get("kept_out_at")).getString()) + '\n            </div>\n            <!-- /*endif*/ -->\n        </div>\n    </h1>\n    <a class="btn-back" data-app-btn-back data-mbgaui-anchors data-app-sound="choose"></a>\n\n    <div class="mod-modern-container po-r mb-b4">\n        <h1 class="hdr-content-sub mb-b2"><span class="inner">Magicite Shards:</span></h1>\n        <dl class="key-item-status box-cc mb-b">\n            <dt>\n                <div class="mod-icon-key-item img-rep mr-b">Magicite Shards:</div>\n            </dt>\n            <dd>' + __e(eventItemModel.get("num")) + '</dd>\n        </dl>\n        <div class="is-bg-type-status-l-03 mb-b">\n            <dl>\n                <dt class="img-text-change-period img-rep mr-b">Reward Period:</dt>\n                <dd class="ta-r fs-s">\n                    <!--  -->\n                    <!-- /*ifdef wwlcd*/ -->\n                    ' + __e(worldModel.getOpenedToClosedTermTextPst()) + '\n                    <!-- /*endif*/ -->\n                </dd>\n            </dl>\n        </div>\n        <a class="btn-add-mog position-limited" data-app-btn-special-prize-shop data-mbgaui-anchors data-app-sound="choose"><div class="inner img-rep">Deliver to Dr. Mog</div></a>\n    </div>\n\n</div>\n\n<div data-app-dungeon-detail></div>\n';
            return __p
        }
    }), define("templates_event/special/dungeon_list/DungeonDetail", [], function() {
        return function(a) {
            function print() {
                __p += __j.call(arguments, "")
            }
            a || (a = {});
            var b, __p = "",
                __e = _.escape,
                __j = Array.prototype.join;
            with(a) {
                __p += '<div class="layer-content-1 dungeon-detail-scroll special mod-freescroll-wrap mod-basic" data-ui-freescroll="detail">\n    <div data-ui-freescroll-content>\n        <div class="mod-paper-container">\n            <section>\n                ';
                var c = FF.CONST.SERVER.DUNGEON.PRIZE_TYPE_OF;
                __p += "\n                ", _.each(dungeonModel.getSortedDungeonPrizes(), function(e) {
                    __p += "\n                    ";
                    var t = e.type;
                    __p += "\n                    ";
                    var n = e.items;
                    __p += '\n                <h1 class="hdr-content-sub02 mb-b">\n                    ', t == c.FIRST_CLEAR && (__p += "First Time Reward"), __p += "\n                    ", t == c.CLEAR && (__p += "Completion Reward"), __p += "\n                    ", t == c.FIRST_MASTER && (__p += "Mastery Reward"), __p += "\n                </h1>\n                <ul>\n                ";
                    var r = dungeonModel.isAcquisitionByPrizeType(t);
                    __p += "\n                ", _.each(n, function(e) {
                        __p += '\n                    <li class="box-c mb-b">\n                        <div class="mr-b', r && (__p += " mod-is-acquisition"), __p += '"><img src="' + __e(pUrl(e.image_path)) + '" width="35" height="35"></div>\n                         <p>' + __e(e.name) + " ×" + __e(e.num) + "</p>\n                    </li>\n                "
                    }), __p += "\n                "
                }), __p += '\n                </ul>\n            </section>\n        </div>\n        <div class="dungeon-detail">\n            <div class="dungeon-detail-plate ml-a mr-a">\n                <ul class="rank-badge add-rank-badge' + __e(dungeonModel.get("rank")) + " ", dungeonModel.get("is_master") && (__p += "add-master"), __p += '">\n                    <!-- rank badge container -->\n                    <li></li>\n                    <li></li>\n                    <li></li>\n                </ul>\n            </div>\n        </div>\n    </div>\n    <div class="scrollbar" data-ui-scrollbar="detail"><div class="inner" data-ui-scrollbar-face></div></div>\n</div>\n<div class="layer-content-11">\n    <h1 class="hdr-content">\n        <div class="inner">\n            <span class="title-name">' + __e(worldModel.get("name")) + '</span>\n            <!--  -->\n            <!-- /*ifdef wwlcd*/ -->\n            <div class="period mod-bg-alpha">\n                Available Through <span class="tl-time mr-b">PST</span>' + __e(timeKeeper.setUnixTime(worldModel.get("kept_out_at")).getPSTString()) + '\n                <span class="tl-time mr-b ml-b">UTC</span>' + __e(timeKeeper.setUnixTime(worldModel.get("kept_out_at")).getString()) + '\n            </div>\n            <!-- /*endif*/ -->\n        </div>\n    </h1>\n    <div id=\'dungeon-detail-back\' class="btn-back" data-app-btn-back data-mbgaui-anchors data-app-sound="choose"></div>\n\n    <div class="btn-container position-type01">\n        <a class="btn-main ml-a mr-a" data-mbgaui-anchors data-app-sound="decide" data-app-btn-go><span class="inner">GO!</span></a>\n    </div>\n</div>\n'
            }
            return __p
        }
    }), define("event/special/app/dungeon_list/views/DungeonDetail", ["underscore", "jquery", "backbone", "sprintf", "scenes/dungeon_list/Api", "templates_event/special/dungeon_list/DungeonDetail", "scenes/dungeon_list/views/DungeonDetail"], function(e, t, n, r, i, s, o) {
        return o.extend({
            tmpl: s
        })
    }), define("event/special/app/dungeon_list/views/Layout", ["underscore", "jquery", "backbone", "sprintf", "templates_event/special/dungeon_list/DungeonList", "./DungeonDetail", "scenes/dungeon_list/views/Layout"], function(e, t, n, r, i, s, o) {
        return o.extend({
            tmpl: i,
            DungeonDetailViewClass: s,
            events: e.extend({}, o.prototype.events, {
                "anchorsbeforejump [data-app-btn-special-prize-shop]": "onClickPrizeExchange",
                "anchorsbeforejump [data-app-btn-intro]": "onClickIntro"
            }),
            render: function() {
                var e = FF.datastore.getEventData(this.worldModel.getEventId());
                o.prototype.render.call(this, {
                    eventItemModel: e.eventItemModel
                })
            },
            updateBackground: function() {
                var e = this.worldModel.getEventModel();
                this.setBackgroundImage(e.get("background_image_path"))
            },
            onClickPrizeExchange: function() {
                var e = r("#event/special/%s/prize_exchange", this.worldModel.getEventId());
                n.history.navigate(e, {
                    trigger: !0
                })
            },
            onClickIntro: function() {
                var e = this.worldModel.getEventModel();
                n.history.navigate(e.getIntroFragment(), {
                    trigger: !0
                })
            }
        })
    }), define("event/special/app/dungeon_list/DungeonListScene", ["underscore", "jquery", "backbone", "scenes/dungeon_list/Api", "./views/Layout", "scenes/dungeon_list/DungeonListScene", "scenes/common/collections/Dungeon"], function(e, t, n, r, i, s, o) {
        return s.extend({
            start: function(e) {
                var t = this,
                    n = FF.datastore.worldCollection.getByEventId(e),
                    r = n.getEventModel(),
                    s = r.getHelper();
                s.setupEventDeferred(e).then(t.setupDeferred.bind(t, n.get("id"))).done(function() {
                    var e = FF.datastore.dungeonCollection.where({
                        world_id: n.get("id")
                    });
                    t.worldModel = n, t.dungeonCollection = new o(e), t.layoutView = new i({
                        worldModel: t.worldModel,
                        dungeonCollection: t.dungeonCollection
                    }), t.layoutView.render(), FF.SoundMgr.playMusic(t.worldModel.get("bgm"))
                })
            }
        })
    }), define("templates_event/special/battle_list/BattleList", [], function() {
        return function(a) {
            function print() {
                __p += __j.call(arguments, "")
            }
            a || (a = {});
            var b, __p = "",
                __e = _.escape,
                __j = Array.prototype.join;
            with(a) {
                __p += '<div class="layer-bg w-full h-full" data-app-layer-bg></div>\n<div class="layer-content-1">\n    <div class="battle-list-scroll mod-freescroll-wrap battle-list special" data-ui-freescroll>\n        <ul class="list-battle anim-slide-in-parent" data-ui-freescroll-content>\n            ';
                var c = !0;
                __p += "\n            ", battleCollection.each(function(e) {
                    __p += "\n                ";
                    var t = dungeonModel.get("battle_id") === e.get("id") ? !0 : !1;
                    __p += "\n                <li", t && (__p += ' class="is-current"'), __p += '>\n                    <div class="btn-btl-wide', e.get("has_boss") && (__p += " is-boss"), c && (__p += " is-unlocked"), __p += '"', c && (__p += ' data-mbgaui-anchors data-app-touch-init data-app-sound="choose"'), __p += ' data-app-battle-id="' + __e(e.get("id")) + '">\n                        <div class="inner box-cb">\n                            <div class="list-title">\n                                ' + __e(t || e.get("is_unlocked") ? e.get("name") : "???") + '\n                            </div>\n                            <div class="notice-detail">\n                                <dl>\n                                    <dt class="icon-soul', e.get("has_boss") === 1 && (__p += "-boss"), __p += ' img-rep mr-b">Stamina Cost:</dt>\n                                    <dd class="fs-s">' + __e(e.get("stamina")) + '</dd>\n                                </dl>\n                                <dl>\n                                    <dt class="icon-battle', e.get("has_boss") === 1 && (__p += "-boss"), __p += ' img-rep mr-b">Battles:</dt>\n                                    <dd class="fs-s">' + __e(e.get("round_num")) + "</dd>\n                                </dl>\n                            </div>\n                        </div>\n                        <!-- スコア評価 -->\n                        ";
                    var n = c && !t ? e.get("rank") : 0;
                    __p += "\n                        ", n === 3 ? __p += '\n                            <div class="img-text-excellent img-rep">Exellent!!</div>\n                        ' : n === 2 ? __p += '\n                            <div class="img-text-good img-rep">Good</div>\n                        ' : n === 1 ? __p += '\n                            <div class="img-text-normal img-rep">Normal</div>\n                        ' : e.get("has_boss") === 1 && (__p += '\n                            <div class="img-text-boss img-rep">boss</div>\n                        '), __p += "\n                    </div>\n                </li>\n                ", t && (c = !1), __p += "\n            "
                }), __p += '\n        </ul>\n        <div class="scrollbar" data-ui-scrollbar><div class="inner" data-ui-scrollbar-face></div></div>\n    </div>\n</div>\n\n<div class="layer-content-2 battle-list btl-content-sub">\n    <h1 class="hdr-btl-content-title-sub">Magicite Shards:</h1>\n    <dl class="key-item-status box-cc mb-b2">\n        <dt>\n            <div class="mod-icon-key-item img-rep mr-b">Magicite Shards:</div>\n        </dt>\n        <dd>' + __e(eventItemModel.get("num")) + '</dd>\n    </dl>\n</div>\n\n<div class="layer-content-11 battle-list special">\n    <h1 class="hdr-btl-content">' + __e(dungeonModel.get("name")) + '</h1>\n    <!-- For Android Device Back Key -->\n    <a class="btn-back img-rep vi-h" data-mbgaui-anchors data-app-btn-back data-app-sound="choose">Back</a>\n\n    <div class="is-tap is-disable" data-app-is-tap><div class="inner-type-down"></div></div>\n    <a class="btn-operations img-rep" data-app-operations data-mbgaui-anchors data-app-sound="choose" data-app-touch-init>Camp</a>\n</div>\n'
            }
            return __p
        }
    }), define("event/special/app/battle_list/views/Layout", ["backbone", "scenes/battle_list/views/Layout", "templates_event/special/battle_list/BattleList"], function(e, t, n) {
        return t.extend({
            tmpl: n,
            updateBackgroundImage: function() {
                var e = this.worldModel.getEventModel().getBackgroundImagePath();
                this.setBackgroundImage(e)
            },
            render: function() {
                var e = FF.datastore.getEventData(this.worldModel.getEventId());
                t.prototype.render.call(this, {
                    eventItemModel: e.eventItemModel
                })
            },
            onClickOperations: function() {
                FF.router.loading.lock();
                var t = sprintf("#event/special/%s/battle_operations", this.worldModel.getEventId());
                e.history.navigate(t, {
                    trigger: !0
                })
            }
        })
    }), define("event/special/app/battle_list/BattleListScene", ["scenes/battle_list/BattleListScene", "./views/Layout"], function(e, t) {
        return e.extend({
            start: function(e, n) {
                var r = this,
                    i = FF.datastore.worldCollection.getByEventId(+e),
                    s = i.getEventModel(),
                    o = s.getHelper();
                o.setupEventDeferred(e).then(r.setupDeferred.bind(r, n)).done(function() {
                    r.layoutView = new t, r.layoutView.render();
                    var e = FF.datastore.dungeonSessionModel.get("bgm");
                    FF.SoundMgr.playMusic(e), r.playDungeonWarp()
                })
            }
        })
    }), define("event/special/app/battle_operations/views/Layout", ["scenes/battle_operations/views/Layout"], function(e) {
        return e.extend({
            updateBackgroundImage: function() {
                var e = this.worldModel.getEventModel().getBackgroundImagePath();
                this.setBackgroundImage(e)
            }
        })
    }), define("event/special/app/battle_operations/BattleOperationsScene", ["underscore", "jquery", "backbone", "scenes/battle_list/Api", "scenes/battle_operations/BattleOperationsScene", "./views/Layout"], function(e, t, n, r, i, s) {
        return i.extend({
            renderLayoutView: function(e) {
                this.layoutView = new s({}), this.layoutView.render(e)
            }
        })
    }), define("event/special/app/Api", ["jquery", "underscore", "scenes/common/util/Api"], function(e, t, n) {
        return t.extend({}, n, {
            exchangeEventSpecialPrizeDeferred: function(e, t) {
                return this.requestDeferred(sprintf("/dff/event/special/%s/exchange_prize", e), {
                    prize_id: t
                }, {
                    type: "POST"
                })
            }
        })
    }), define("templates_event/special/prize_exchange/PrizeExchange", [], function() {
        return function(a) {
            function print() {
                __p += __j.call(arguments, "")
            }
            a || (a = {});
            var b, __p = "",
                __e = _.escape,
                __j = Array.prototype.join;
            with(a) __p += '<div class="layer-bg w-full h-full" data-app-layer-bg></div>\n<div class="layer-content-1 prize-exchange-scroll mod-freescroll-wrap mod-basic" data-ui-freescroll>\n    <ul class="list-item" data-ui-freescroll-content>\n        ', _.each(eventPrizeCollection.getSortedModelsForDisplay(), function(e) {
                __p += "\n        ";
                var t = e.canExchange(eventItemModel.get("num"));
                __p += '\n            <li>\n                <div class="list-paper">\n                    <div class="list-item-inner">\n                        <div data-app-prize-list data-app-prize-collection-id="' + __e(e.get("id")) + '">\n                            <img src="' + __e(pUrl(e.getImagePath())) + '" width="56" height="56">\n                        </div>\n                        <div class="flex1">\n                            <h1 class="paper-on-title mb-b2">' + __e(e.getPrizeName()) + '</h1>\n                            <div class="di-f">\n                                <div>\n                                    <dl class="item-explanation di-f fs-xs">\n                                        <dt class="mr-b2">Needed:</dt>\n                                        <dd class="w-a">' + __e(e.get("required_num")) + "</dd>\n                                    </dl>\n                                    ";
                if (e.isUnlimitedExchange() || e.canExchange()) __p += '\n                                    <dl class="item-explanation di-f fs-xs">\n                                        <dt class="mr-b2">Exchanges Left:</dt>\n                                        <dd>\n                                            ', e.isUnlimitedExchange() ? __p += "\n                                                Unlimited\n                                            " : e.canExchange() && (__p += "\n                                                " + __e(e.remainExchangeableNum()) + "\n                                            "), __p += "\n                                        </dd>\n                                    </dl>\n                                    ";
                else {
                    __p += "\n                                        ";
                    var n = e.hasBuddy() ? "img-text-release" : "img-text-exchange";
                    __p += '\n                                        <div class="' + __e(n) + ' img-rep">Exchanged</div>\n                                    '
                }
                __p += '\n                                </div>\n\n                                <a data-mbgaui-anchors data-app-btn-exchange data-app-exchange-id="' + __e(e.get("id")) + '" data-app-sound="choose" class="btn-sub-thin ', t || (__p += "is-disable"), __p += '">\n                                    <span class="inner">Exchange</span>\n                                </a>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </li>\n        '
            }), __p += '\n    </ul>\n\n    <div class="scrollbar" data-ui-scrollbar><div class="inner" data-ui-scrollbar-face></div></div>\n</div>\n<div class="layer-content-11 prize-exchange">\n    <h1 class="hdr-content">\n        <span class="inner">Dr. Mog</span>\n    </h1>\n    <a class="btn-back" data-app-btn-back data-mbgaui-anchors data-app-sound="choose"></a>\n\n    <div class="mod-modern-container po-r mb-b4">\n        <h1 class="hdr-content-sub mb-b2"><span class="inner">Magicite Shards:</span></h1>\n        <dl class="key-item-status box-cc mb-b">\n            <dt>\n                <div class="mod-icon-key-item img-rep mr-b">Magicite Shards:</div>\n            </dt>\n            <dd>' + __e(eventItemModel.get("num")) + "</dd>\n        </dl>\n        ", FF.datastore.itemPossessionLimitCollection.isOverLimit() && (__p += '\n            <p class="ml-b4 mb-b pl-b2">\n                <span class="fc-warning">*You can\'t hold any more.</span>\n            </p>\n        '), __p += '\n        <div class="is-bg-type-status-l-03 mb-b">\n            <dl>\n                <dt class="img-text-change-period img-rep mr-b">Reward Period:</dt>\n                <dd class="ta-r fs-s">\n                    <!--  -->\n                    <!-- /*ifdef wwlcd*/ -->\n                    ' + __e(worldModel.getOpenedToClosedTermTextPst()) + '\n                    <!-- /*endif*/ -->\n                </dd>\n            </dl>\n        </div>\n        <div class="pic-mog-normal">\n            <div class="add-balloon box-cc">\n                <p class="ta-c">Collect those magicite<br>\nshards, kupo.</p>\n            </div>\n        </div>\n    </div>\n</div>\n';
            return __p
        }
    }), define("templates_event/special/prize_exchange/ModalExchangeConfirm", [], function() {
        return function(a) {
            function print() {
                __p += __j.call(arguments, "")
            }
            a || (a = {});
            var b, __p = "",
                __e = _.escape,
                __j = Array.prototype.join;
            with(a) {
                var c = prizeModel.hasBuddy() ? "英雄の記憶" : "魔石のかけら使用確認";
                __p += '\n<div class="modal-window">\n    <div class="modal-window-inner">\n        <div class="hdr-content">\n	<!--  -->\n	<!-- /*ifdef wwlcd*/ -->\n        ', prizeModel.hasBuddy ? __p += '\n            <span class="inner">\n  Hero Record\n  </span>\n        ' : __p += '\n            <span class="inner">\n  Deliver Magicite Shards\n  </span>\n        ', __p += '\n	<!-- /*endif*/ -->\n        </div>\n        <div class="exchange-conf description-inner">\n            <div class="mod-bg-status-alpha mb-b2">\n                <div class="mod-item-detail box">\n                    <div class="wrap-item mr-b2">\n                        <img src="' + __e(pUrl(prizeModel.getImagePath())) + '" width="56" height="56">\n                    </div>\n                    <div class="item-detail pt-b">\n                        <div class="mb-b">' + __e(prizeModel.getPrizeName()) + '</div>\n                        <dl class="mod-status-lv lh-s">\n                            <dt><div class="img-text-indicate img-rep">Needed:</div></dt>\n                            <dd>' + __e(prizeModel.get("required_num")) + '</dd>\n                        </dl>\n                    </div>\n                </div>\n            </div>\n            <div class="box-cc">\n                <p class="text-adjust fs-xs">\n                    Exchange ' + __e(eventItemModel.get("name")) + " x" + __e(prizeModel.get("required_num")) + " for " + __e(prizeModel.getPrizeName()) + '?<br>\n                </p>\n            </div>\n\n            <p class="fs-xs ta-c">\n                <span class="fc-warning">*This cannot be undone.</span>\n            </p>\n        </div>\n        <div class="modal-btn-container">\n            <div class="btn-container position-type02">\n                <a class="btn-sub p-l" data-mbgaui-anchors data-app-modal-close data-app-sound="choose"><span class="inner">Cancel</span></a>\n                <a class="btn-main p-r" data-mbgaui-anchors data-app-modal-decide data-app-sound="decide"><span class="inner">Exchange</span></a>\n            </div>\n        </div>\n    </div>\n</div>\n'
            }
            return __p
        }
    }), define("event/special/app/prize_exchange/views/ModalExchangeConfirm", ["underscore", "jquery", "backbone", "lib/ModalBase", "templates_event/special/prize_exchange/ModalExchangeConfirm"], function(e, t, n, r, i) {
        return r.extend({
            el: "[data-app-modal]",
            events: {
                "anchorsbeforejump [data-app-modal-close]": "onClickModalClose",
                "anchorsbeforejump [data-app-modal-decide]": "onClickModalDecide"
            },
            initialize: function(e) {
                this.prizeModel = e.prizeModel, this.eventItemModel = e.eventItemModel, r.prototype.initialize.call(this)
            },
            render: function() {
                this.putContent(i({
                    prizeModel: this.prizeModel,
                    eventItemModel: this.eventItemModel
                }))
            },
            onClickModalDecide: function() {
                this.trigger("onClickToExchange", this.prizeModel.get("id")), this.end(!0)
            },
            onClickModalClose: function() {
                this.end()
            }
        })
    }), define("templates_event/special/prize_exchange/ModalExchangeResult", [], function() {
        return function(a) {
            function print() {
                __p += __j.call(arguments, "")
            }
            a || (a = {});
            var b, __p = "",
                __e = _.escape,
                __j = Array.prototype.join;
            with(a) {
                var c = prizeModel.hasBuddy() ? "英雄の記憶" : "獲得完了";
                __p += '\n<div class="modal-window">\n    <div class="modal-window-inner">\n        <div class="hdr-content">\n	<!--  -->\n	<!-- /*ifdef wwlcd*/ -->\n        ', prizeModel.hasBuddy ? __p += '\n            <span class="inner">Hero Record</span>\n        ' : __p += '\n            <span class="inner">Collected</span>\n        ', __p += '\n	<!-- /*endif*/ -->\n        </div>\n        <div class="exchange-conf description-inner">\n            <div class="mod-bg-status-alpha mb-b2">\n                <div class="mod-item-detail box">\n                    <div class="wrap-item mr-b2">\n                        <img src="' + __e(pUrl(prizeModel.getImagePath())) + '" width="50" height="50">\n                    </div>\n                    <div class="is-lv-up-deco"></div>\n                    <div class="item-detail pt-b">\n                        <div>' + __e(prizeModel.getPrizeName()) + '</div>\n                    </div>\n                </div>\n            </div>\n            <div class="box-cc">\n                <p class="text-adjust fs-xs">\n                    ' + __e(prizeModel.getPrizeName()) + '!\n                </p>\n            </div>\n        </div>\n        <div class="modal-btn-container">\n            <div class="btn-container position-type02">\n                <a class="btn-main ml-a mr-a" data-mbgaui-anchors data-app-modal-close data-app-sound="choose"><span class="inner">OK</span></a>\n            </div>\n        </div>\n    </div>\n</div>\n'
            }
            return __p
        }
    }), define("event/special/app/prize_exchange/views/ModalExchangeResult", ["underscore", "jquery", "backbone", "lib/ModalBase", "templates_event/special/prize_exchange/ModalExchangeResult"], function(e, t, n, r, i) {
        return r.extend({
            el: "[data-app-modal]",
            events: {
                "anchorsbeforejump [data-app-modal-close]": "onClickModalClose"
            },
            initialize: function(e) {
                this.prizeModel = e.prizeModel, this.eventItemModel = e.eventItemModel, r.prototype.initialize.call(this)
            },
            render: function() {
                this.putContent(i({
                    prizeModel: this.prizeModel,
                    eventItemModel: this.eventItemModel
                }))
            },
            onClickModalClose: function() {
                this.end(!0)
            }
        })
    }), define("templates_event/special/prize_exchange/ModalEquipmentDetail", [], function() {
        return function(a) {
            function print() {
                __p += __j.call(arguments, "")
            }
            a || (a = {});
            var b, __p = "",
                __e = _.escape,
                __j = Array.prototype.join;
            with(a) __p += '<div class="modal-window">\n    <div class="modal-window-inner">\n        <div class="hdr-content">' + __e(name) + '</div>\n        <div class="gacha-item-detail">\n\n            <div class="mod-item-detail">\n                <div class="wrap-item">\n                    <img src="' + __e(pUrl(image_path)) + '" width="56" height="56">\n                </div>\n                <ul class="mod-item-detail-inner">\n                    <li class="is-bg-type-status-02 box-c">\n                        <dl class="mod-status-lv">\n                            <dt class="img-text-rarity img-rep">Rarity</dt>\n                            <dd><span class="icon-rarity0' + __e(rarity) + ' di-ib"></span></dd>\n                        </dl>\n                    </li>\n                    <li class="is-bg-type-status-03 box-c">\n                        <dl class="mod-status-lv">\n                            <dt class="icon-lv img-rep">Lv</dt>\n                            <dd>' + __e(max_level_by_max_evolution_num) + '</dd>\n                        </dl>\n                    </li>\n                    <li class="is-bg-type-status-03 box-c">\n                        <dl class="mod-status-lv">\n                            <dt class="icon-category img-rep">Type</dt>\n                            <dd>' + __e(category_name) + '</dd>\n                        </dl>\n                    </li>\n                </ul>\n            </div>\n\n            <ul class="mod-equip-detail-status">\n                <li class="mod-item-detail-sub is-bg-type-status-l-02 box-c">\n                    <dl class="mod-status-lv">\n                        <dt class="icon-attack img-rep">ATK</dt>\n                        <dd>' + __e(atk_max) + '</dd>\n                    </dl>\n                    <dl class="mod-status-lv">\n                        <dt class="icon-defense img-rep">DEF</dt>\n                        <dd>' + __e(def_max) + '</dd>\n                    </dl>\n                </li>\n                <li class="mod-item-detail-sub is-bg-type-status-l-02 box-c">\n                    <dl class="mod-status-lv">\n                        <dt class="icon-witchcraft img-rep adjust-str2">MAG</dt>\n                        <dd>' + __e(matk_max) + '</dd>\n                    </dl>\n                    <dl class="mod-status-lv">\n                        <dt class="icon-magic-defense img-rep adjust-str2">RES</dt>\n                        <dd>' + __e(mdef_max) + '</dd>\n                    </dl>\n                    <dl class="mod-status-lv">\n                        <dt class="icon-spirit img-rep adjust-str2">MND</dt>\n                        <dd>' + __e(mnd_max) + '</dd>\n                    </dl>\n                </li>\n                <li class="mod-item-detail-sub is-bg-type-status-l-02 box-c">\n                    <dl class="mod-status-lv">\n                        <dt class="icon-hit img-rep adjust-str2">ACC</dt>\n                        <dd>' + __e(acc_max) + '</dd>\n                    </dl>\n                    <dl class="mod-status-lv">\n                        <dt class="icon-avoidance img-rep adjust-str2">EVA</dt>\n                        <dd>' + __e(eva_max) + '</dd>\n                    </dl>\n                </li>\n            </ul>\n\n            <div class="mod-item-detail-sub is-bg-type-status-l-01 box-c is-effect mt-b">\n                <dl class="mod-status-lv">\n                    <dt class="icon-special-effects img-rep">Bonus Effect</dt>\n                    <dd>' + __e(description) + "</dd>\n                </dl>\n            </div>\n\n            ", soul_strike && (__p += '\n                 <div class="mod-bg-status-alpha is-soulstrike">\n                    <div class="mod-item-detail">\n                        <div class="wrap-item">\n                            <img src="' + __e(pUrl(soul_strike.image_path)) + '" width="80" height="80">\n                        </div>\n                        <div class="mod-soulstrike-detail">\n                            <dl class="mod-status-lv">\n                                <dt class="icon-soul-strike img-rep">Soul Break</dt>\n                                <dd>' + __e(soul_strike.name) + '</dd>\n                            </dl>\n                            <dl class="mod-status-lv">\n                                <dt class="icon-soul-gauge img-rep">Soul Gauge</dt>\n                                <dd>\n                                    <div class="mod-soul-strike-gauge"><div class="inner ' + __e("gauge" + soul_strike.consume_ss_gauge) + '"></div></div>\n                                </dd>\n                            </dl>\n                            <p class="fs-xs">' + __e(soul_strike.description) + "</p>\n                        </div>\n                    </div>\n                </div>\n            "), __p += '\n\n            <p class="ta-c fc-warning mt-b fs-s">*Stats after fully upgraded.</p>\n            <div class="modal-btn-container">\n                <div class="btn-container position-type02">\n                    <div class="btn-sub mr-a ml-a" data-mbgaui-anchors data-app-modal-close data-app-sound="choose"><span class="inner">Close</span></div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n';
            return __p
        }
    }), define("event/special/app/prize_exchange/views/ModalEquipmentDetail", ["underscore", "jquery", "backbone", "lib/ModalBase", "templates_event/special/prize_exchange/ModalEquipmentDetail"], function(e, t, n, r, i) {
        return r.extend({
            el: "[data-app-modal]",
            events: {
                "anchorsbeforejump [data-app-modal-close]": "onClickModalClose"
            },
            onClickModalClose: function() {
                this.trigger("detailModalClose"), this.end()
            },
            render: function(e) {
                var t = i(e);
                this.putContent(t)
            }
        })
    }), define("templates_event/special/prize_exchange/ModalMaterialDetail", [], function() {
        return function(a) {
            a || (a = {});
            var b, __p = "",
                __e = _.escape;
            with(a) __p += '<div class="modal-window">\n    <div class="modal-window-inner">\n        <div class="hdr-content">' + __e(name) + '</div>\n\n        <div class="inventory-material-detail mb-b4">\n\n            <div class="mod-item-detail">\n                <div class="wrap-item">\n                    <img src="' + __e(pUrl(image_path)) + '" width="56" height="56">\n                </div>\n                <ul class="mod-item-detail-inner">\n                    <li class="is-bg-type-status-02 box-c">\n                        <dl class="mod-status-lv">\n                            <dt class="img-text-rarity img-rep">Rarity</dt>\n                            <dd><span class="icon-rarity0' + __e(rarity) + ' di-ib"></span></dd>\n                        </dl>\n                    </li>\n                 </ul>\n            </div>\n\n            <ul class="mod-item-detail-sub is-bg-type-status-l-01 box-c fs-xs lh-xs">\n                <li>' + __e(description) + '</li>\n            </ul>\n\n        </div>\n\n        <div data-app-buttons-container>\n            <div data-app-buttons="centerBtns">\n                <a class="btn-sub mr-a ml-a mb-b2" data-mbgaui-anchors data-app-modal-close data-app-sound="choose"><span class="inner">Close</span></a>\n            </div>\n        </div>\n    </div>\n</div>\n';
            return __p
        }
    }), define("event/special/app/prize_exchange/views/ModalMaterialDetail", ["underscore", "jquery", "backbone", "lib/ModalBase", "templates_event/special/prize_exchange/ModalMaterialDetail"], function(e, t, n, r, i) {
        return r.extend({
            el: "[data-app-modal]",
            events: {
                "anchorsbeforejump [data-app-modal-close]": "onClickModalClose"
            },
            onClickModalClose: function() {
                this.trigger("detailModalClose"), this.end()
            },
            render: function(e) {
                var t = i(e);
                this.putContent(t)
            }
        })
    }), define("event/special/app/prize_exchange/views/Layout", ["underscore", "jquery", "backbone", "sprintf", "event/special/app/Api", "scenes/common/helper/ItemPossessionLimit", "templates_event/special/prize_exchange/PrizeExchange", "lib/LayoutBase", "./ModalExchangeConfirm", "./ModalExchangeResult", "./ModalEquipmentDetail", "./ModalMaterialDetail", "components/FreeScroll", "components/Scrollbar", "components/LongTap"], function(e, t, n, r, i, s, o, u, a, f, l, c, h, p, d) {
        var v = u.extend({
            contentType: "BASE",
            designType: "MODERN",
            events: {
                "anchorsbeforejump [data-app-btn-exchange]": "onClickPrize",
                "anchorsbeforejump [data-app-banner-id]": "onClickPrizeDetail"
            },
            initialize: function(e) {
                this.worldModel = e.worldModel, this.eventItemModel = e.eventItemModel, this.eventPrizeCollection = e.eventPrizeCollection, this.hasLongTap = !1, this._longTaps = [], u.prototype.initialize.call(this)
            },
            render: function() {
                u.prototype.render.call(this, o, {
                    worldModel: this.worldModel,
                    eventItemModel: this.eventItemModel,
                    eventPrizeCollection: this.eventPrizeCollection
                }), this.setupComponents();
                var e = this.worldModel.getEventModel(),
                    t = e.getHelper().getPrizeExchangeBackgroundImagePath();
                this.setBackgroundImage(t), this.processAfterRender()
            },
            setupComponents: function() {
                this.freescroll = new h({
                    el: t("[data-ui-freescroll]")
                }), this.scrollbar = new p({
                    el: t("[data-ui-scrollbar]"),
                    watch: this.freescroll,
                    faceHeight: 31,
                    disableOverscroll: !0
                }), this.setupLongTap()
            },
            setupLongTap: function() {
                var n = this,
                    r = t("[data-app-prize-list]"),
                    i;
                e.each(r, function(e) {
                    i = new d({
                        el: t(e)
                    }), n.listenTo(i, "longtap_message", n.onLongTapEquipDetail), n._longTaps.push(i)
                })
            },
            onLongTapEquipDetail: function(e) {
                var n = this,
                    r = e.e,
                    i = t(r.target).closest("[data-app-prize-collection-id]").attr("data-app-prize-collection-id"),
                    s = this.eventPrizeCollection.get(i),
                    o = s.get("item_package").items;
                if (o.length > 1) return;
                var u = o[0],
                    a = u.type_name.toLowerCase() === "equipment" ? new l : u.type_name.toLowerCase() === "ability_material" ? new c : null;
                if (!a) return;
                FF.router.loading.lock(), this.hasLongTap = !0, FF.SoundMgr.playChooseEffect(), a.render(u), FF.router.overlay.registerChildren(a), a.open(), this.listenToOnce(a, "detailModalClose", function() {
                    n.hasLongTap = !1
                })
            },
            onClickPrize: function(e) {
                if (this.hasLongTap) return;
                FF.router.loading.lock();
                var n = this,
                    r = t(e.target).attr("data-app-exchange-id"),
                    i = this.eventPrizeCollection.get(r);
                s.showModalIfOverLimitDeferred({
                    itemTypeNames: i.getItemTypeNames()
                }).done(function() {
                    var e = new a({
                        prizeModel: i,
                        eventItemModel: n.eventItemModel
                    });
                    FF.router.overlay.registerChildren(e), e.render(), e.open(), n.listenToOnce(e, "onClickToExchange", n.onClickToExchange)
                })
            },
            onClickToExchange: function(e) {
                FF.router.loading.lock();
                var t = this,
                    n = this.worldModel.getEventModel(),
                    r = this.eventPrizeCollection.get(e);
                i.exchangeEventSpecialPrizeDeferred(n.get("id"), r.get("id")).done(function(e) {
                    FF.datastore.clearHasPartyAllData(), FF.datastore.userModel.set(e.user), FF.datastore.itemPossessionLimitCollection.update(e.item_possession_limits), t.eventItemModel.set(e.event_item), r.incrementExchangedNum();
                    var n = new f({
                        prizeModel: r,
                        eventItemModel: t.eventItemModel
                    });
                    FF.router.overlay.registerChildren(n), n.render(), n.open(), t.listenToOnce(n, "closeAnimationEnd", function() {
                        FF.router.loading.show(), t.render()
                    })
                })
            },
            onClickBack: function() {
                window.history.back()
            },
            dispose: function() {
                this.resetBackgroundImage(), this.freescroll && this.freescroll.dispose(), this.scrollbar && this.scrollbar.dispose(), e.each(this._longTaps, function(e) {
                    e.dispose()
                }), this._longTaps.length = 0, u.prototype.dispose.call(this)
            }
        });
        return v
    }), define("event/special/app/prize_exchange/PrizeExchangeScene", ["underscore", "jquery", "backbone", "scenes/common/util/Api", "lib/Scene", "./views/Layout", "components/FreeScroll", "components/Scrollbar"], function(e, t, n, r, i, s, o, u, a) {
        return i.extend({
            setupDeferred: function(e) {
                var r = t.Deferred(),
                    i = FF.datastore.worldCollection.getByEventId(e);
                return !i || !i.isOpenedToClosedTerm() ? (n.history.navigate("#events", {
                    trigger: !0
                }), r.reject().promise()) : r.resolve().promise()
            },
            start: function(e) {
                var t = this,
                    n = FF.datastore.eventCollection.get(+e),
                    r = n.getHelper();
                this.setupDeferred(e).then(r.setupEventDeferred.bind(r, e)).done(function() {
                    var n = FF.datastore.getEventData(e),
                        r = FF.datastore.worldCollection.getByEventId(e);
                    t.layoutView = new s({
                        worldModel: r,
                        eventItemModel: n.eventItemModel,
                        eventPrizeCollection: n.eventPrizeCollection
                    }), t.layoutView.render(), FF.SoundMgr.playMusic(r.get("bgm"))
                })
            }
        })
    }),
    function() {
        var e = FF.onload;
        FF.onload = function() {
            require(["backbone", "event/special/app/Helper", "event/special/app/dungeon_list/DungeonListScene", "event/special/app/battle_list/BattleListScene", "event/special/app/battle_operations/BattleOperationsScene", "event/special/app/prize_exchange/PrizeExchangeScene"], function(t, n, r, i, s, o) {
                var u = t.Router.extend({
                    routes: {
                        "event/special/:event_id/dungeons": "createEventSpecialDungeonListScene",
                        "event/special/:event_id/battles/:dungeon_id": "createEventSpecialBattleListScene",
                        "event/special/:event_id/battle_operations": "createBattleOperationsScene",
                        "event/special/:event_id/prize_exchange": "createEventSpecialPrizeExchangeScene"
                    },
                    createEventSpecialDungeonListScene: function(e) {
                        return FF.router.changeScene(r, [e])
                    },
                    createEventSpecialBattleListScene: function(e, t) {
                        return FF.router.changeScene(i, [e, t])
                    },
                    createBattleOperationsScene: function(e) {
                        return FF.router.changeScene(s, [e])
                    },
                    createEventSpecialPrizeExchangeScene: function(e) {
                        return FF.router.changeScene(o, [e])
                    }
                });
                FF.Events.special = FF.Events.special || {}, FF.Events.special.app = {
                    router: new u,
                    helper: new n
                }, e()
            })
        }
    }(), define("event/special/app", function() {});