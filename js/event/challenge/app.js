define("event/AppHelperBase", ["backbone", "sprintf", "lib/ClassBase", "scenes/common/views/ModalDungeonInfo"], function(e, t, n, r) {
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
            getDungeonInfoModalClass: function(e) {
                return r
            }
        })
    }), define("event/common/models/Link", ["backbone"], function(e) {
        return e.Model.extend({})
    }), define("event/common/collections/Link", ["backbone", "../models/Link"], function(e, t) {
        return e.Collection.extend({
            model: t,
            comparator: function(e, t) {
                return t.order_no - e.order_no || t.id - e.id
            }
        })
    }), define("event/challenge/app/Helper", ["underscore", "jquery", "backbone", "util", "scenes/common/util/Api", "event/AppHelperBase", "event/common/collections/Link"], function(e, t, n, r, i, s, o) {
        return s.extend({
            canShowEventList: function(e) {
                var t = e.getWorldModel();
                return t.canBeginBattleTerm()
            },
            getTermText: function(e) {
                var t = e.getWorldModel();
                return t.getOpenedToKeptOutTermText()
            },
            getBackgroundImagePath: function(e, t) {
                var n = e.get("background_image_path").replace(/[^\/]+$/, ""),
                    r = sprintf(t ? "%d_force_bg.png" : "%d_bg.png", e.get("id"));
                return n + r
            },
            setupEventDeferred: function(r) {
                var s = t.Deferred(),
                    u = FF.datastore.eventCollection.get(r),
                    a = u.getWorldModel();
                return a.isLocked() ? (n.history.navigate(u.getIntroFragment(), {
                    trigger: !0,
                    replace: !0
                }), s.reject().promise()) : (i.getEventDataDeferred(r, u.get("type_name")).done(function(t) {
                    var n = void 0;
                    t.event_links_by_place_type && (n = {}, e.each(t.event_links_by_place_type, function(e, t) {
                        n[t] = new o(e)
                    })), FF.datastore.setEventData(r, {
                        dungeonTypeAlias: t.dungeon_type_alias,
                        eventLinkCollectionByPlaceType: n
                    }), s.resolve()
                }), s.promise())
            }
        })
    }), define("templates_event/challenge/dungeon/List", [], function() {
        return function(a) {
            function print() {
                __p += __j.call(arguments, "")
            }
            a || (a = {});
            var b, __p = "",
                __e = _.escape,
                __j = Array.prototype.join;
            with(a) {
                var c = FF.datastore.eventCollection.get(eventId);
                __p += '\n<div class="c-layer-bg w-full h-full" data-app-layer-bg></div>\n<div class="c-layer-content-1 scene-challenge-dungeon-list">\n    <div class="c-freescroll-wrap">\n        <div class="c-freescroll" data-ui-freescroll data-app-dungeon-list-scroll>\n            <div data-ui-freescroll-content>\n                ';
                var d = worldModel.get("series_formal_name");
                __p += "\n                ", d && (__p += '\n                    <div class="c-ttl-category-series mlr-a mb-b2">\n                        <span class="c-ttl-category-series__inner"><div class="p-text-ff img-rep">FINAL FANTASY</div><div class="p-icon-' + __e(worldModel.get("series_id")) + ' c-series-icon-s"></div></span>\n                    </div>\n                '), __p += '\n                <ul class="mb-b2">\n                    ', _.each(dungeonModels, function(e) {
                    __p += "\n                        ";
                    var t = +e.get("id");
                    __p += "\n                        ";
                    var n = e.get("is_unlocked");
                    __p += "\n                        ";
                    var r = e.getOpenedMissionModels();
                    __p += '\n                        <li class="mb-b2">\n                            <div class="c-btn is-thick-long-locked mlr-a', e.get("is_unlocked") && (__p += " is-unlocked", e.get("button_style") === "EXTRA" ? __p += " is-extra" : e.get("button_style") === "DOOM" && (__p += " is-doom"), __p += '"'), __p += ' data-dungeon-id="' + __e(t) + '" data-mbgaui-anchors data-app-sound="choose" data-app-flag-unlock>\n                                <div class="c-btn__inner', e.get("button_style") === "DOOM" && (__p += " pl-b"), __p += '">\n                                    <div class="mb-b">' + __e(n ? e.get("name") : "???") + '</div>\n                                    <div class="box-c">\n                                        <div class="c-text-mat">\n                                            <div class="c-text-mat__inner box-cb">\n                                                <dl class="c-label box-cb mr-b">\n                                                    <dt class="c-label__img"><div class="p-text-difficulty img-rep">難易度</div></dt>\n                                                    <dd class="c-label__text s-text-layout__num">' + __e(e.getDisplayChallengeLevel()) + '</dd>\n                                                </dl>\n                                                <dl class="c-label box-cb">\n                                                    <dt class="c-label__img"><div class="p-text-total-stamina img-rep">総消費スタミナ</div></dt>\n                                                    <dd class="c-label__text s-text-layout__num">' + __e(e.get("total_stamina")) + "</dd>\n                                                </dl>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                                ", r.length > 0 && (__p += '\n                                    <div class="p-text-limited-time-mission-term img-rep">期間限定ミッション発生中!</div>\n                                '), __p += "\n                                ", e.get("is_master") ? __p += '\n                                    <div class="p-text-master img-rep s-badge">Master</div>\n                                ' : e.get("is_clear") && (__p += '\n                                    <div class="p-text-clear img-rep s-badge">clear</div>\n                                '), __p += '\n                                <div class="', r.length > 0 && (__p += "s-layout-adjust"), __p += '">\n                                    ', FF.env.isWWRegion() || (__p += "\n                                    \n                                    ", t === 10704807 && (__p += ' \n                                        <img src="' + __e(pUrl("/dff/static/img/event/challenge_48/icon_badge95001006.png")) + '" width="35" height="35" class="s-icon-badge">\n                                        <img src="' + __e(pUrl("/dff/static/lang/image/buddy/10700100/120700100/crystal.png")) + '" width="35" height="35" class="s-icon-badge">\n                                    '), __p += "\n                                    ", t === 10704812 && (__p += ' \n                                        <img src="' + __e(pUrl("/dff/static/img/event/challenge_48/icon_badge95001007.png")) + '" width="35" height="35" class="s-icon-badge">\n                                    '), __p += "\n                                    ", t === 10704816 && (__p += ' \n                                        <img src="' + __e(pUrl("/dff/static/img/event/challenge_48/icon_badge95001008.png")) + '" width="35" height="35" class="s-icon-badge">\n                                    '), __p += "\n                                    \n                                    "), __p += "\n\n                                    ";
                    var i = e.getDisplayAblePrizes();
                    __p += "\n                                    ", _.each(i, function(e) {
                        __p += '\n                                        <img src="' + __e(pUrl("/dff/static/img/event/challenge_" + eventId + "/icon_badge" + e.id + ".png")) + '" width="35" height="35" class="s-icon-badge">\n                                    '
                    }), __p += "\n                                </div>\n                            </div>\n                         </li>\n                    "
                }), __p += '\n                </ul>\n                <div class="c-dungeon-list-nav">\n                    <div class="c-btn is-nav-small s-btn-intro" data-mbgaui-anchors data-app-sound="choose" data-app-btn-intro>\n                        <span class="c-btn__inner fs-b">Event Rules</span>\n                    </div>\n                    <a class="c-btn is-nav-small" data-app-btn-challenge-prizes data-app-dungeon-type="', isForce ? __p += __e(FF.CONST.SERVER.DUNGEON.TYPE_OF.FORCE) : __p += __e(FF.CONST.SERVER.DUNGEON.TYPE_OF.NORMAL), __p += '" data-mbgaui-anchors data-app-sound="choose"><div class="c-btn__inner fs-b ta-c">Completion<br>Rewards</div></a>\n                </div>\n                ', c.get("has_intro_movie") && (__p += '\n                    <div class="c-dungeon-list-nav mt-b2">\n                        <div class="c-btn is-thick-long" data-mbgaui-anchors data-app-sound="choose" data-app-btn-intro-movie>\n                            <span class="c-btn__inner">Play Event Movie</span>\n                        </div>\n                    </div>\n                '), __p += '\n                <div data-app-link-list-wrap>\n                    \n                </div>\n            </div>\n            <div class="c-freescroll__scrollbar" data-ui-scrollbar><div class="c-freescroll__scrollbar-inner" data-ui-scrollbar-face></div></div>\n        </div>\n    </div>\n</div>\n\n<div class="c-layer-content-11 scene-challenge-dungeon-list" data-app-dungeon-list>\n    <h1 class="c-ttl-scene">\n        <div class="c-ttl-scene__inner po-r">\n            <span class="c-ttl-scene__title fs-b">' + __e(worldModel.get("name")) + '</span>\n            <div class="c-ttl-scene__term c-text-mat"><div class="c-text-mat__inner">' + ((b = worldModel.getOpenedToKeptOutTermText()) == null ? "" : b) + '</div></div>\n        </div>\n    </h1>\n    <a class="c-btn-back" data-app-btn-back data-mbgaui-anchors data-app-sound="choose"></a>\n    ', isForce ? (__p += "\n        \n        ", dungeonTypeAlias ? __p += '\n            <a class="c-event-btn-limited c-btn is-event-first-half" data-mbgaui-anchors="{ preventDefault: true }" data-app-btn-normal data-app-sound="choose">\n                <img class="c-event-btn-limited__inner" src="' + __e(pUrl("/dff/static/img/event/challenge_" + eventId + "/btn_history.png")) + '" width="127" height="36">\n            </a>\n        ' : __p += '\n            <a class="c-btn-history img-rep" data-mbgaui-anchors="{ preventDefault: true }" data-app-btn-normal data-app-sound="choose">history</a>\n        ', __p += "\n    ") : hasForceDungeon && (__p += "\n        ", dungeonTypeAlias ? __p += '\n            <a class="c-event-btn-limited c-btn is-event-second-half" data-mbgaui-anchors="{ preventDefault: true }" data-app-btn-force data-app-sound="choose">\n                <img class="c-event-btn-limited__inner" src="' + __e(pUrl("/dff/static/img/event/challenge_" + eventId + "/btn_force.png")) + '" width="127" height="36">\n            </a>\n        ' : __p += '\n            <a class="c-btn-force img-rep" data-mbgaui-anchors="{ preventDefault: true }" data-app-btn-force data-app-sound="choose">force</a>\n        ', __p += "\n    "), __p += "\n</div>\n<div data-app-dungeon-detail></div>\n"
            }
            return __p
        }
    }), define("event/common/views/LinkListBase", ["underscore", "jquery", "backbone", "scenes/notification/views/ModalNotificationDetail"], function(e, t, n, r) {
        return n.View.extend({
            initialize: function(e) {
                var t = this;
                this.linkCollection = e, this.linkMap = {}, e.each(function(e) {
                    t.linkMap[e.get("id")] = e
                })
            },
            render: function() {},
            addTouchEvent: function() {
                t("[data-app-link-id]").on("anchorsbeforejump", this.onClickLink.bind(this))
            },
            removeTouchEvent: function() {
                t("[data-app-link-id]").off("anchorsbeforejump")
            },
            onClickLink: function(e) {
                var r = t(e.target).attr("data-app-link-id"),
                    i = this.linkMap[r],
                    s = i.get("url"),
                    o = i.get("link_type");
                switch (o) {
                    case FF.CONST.SERVER.EVENT.LINK.LINK_TYPE_OF.NAVIGATE:
                        n.history.navigate(s, {
                            trigger: !0
                        });
                        break;
                    case FF.CONST.SERVER.EVENT.LINK.LINK_TYPE_OF.EXTERNAL:
                        kickmotor.platform.canOpenExternalURL(s, function(e) {
                            if (!e.canOpen) throw new Error("invalid url(" + s + ") value.");
                            kickmotor.platform.openExternalURL(s)
                        });
                        break;
                    case FF.CONST.SERVER.EVENT.LINK.LINK_TYPE_OF.NOTIFICATION:
                        this.openNotificationModal(s);
                        break;
                    default:
                        throw new Error("invalid link_type(" + o + ") value")
                }
            },
            openNotificationModal: function(e) {
                var t = this;
                FF.router.loading.lock();
                var n = FF.datastore.notificationCollection.get(e);
                this.notificationModal = new r({
                    notificationModel: n,
                    isPopup: !0
                }), this.notificationModal.render(), FF.router.overlay.registerChildren(this.notificationModal), this.listenToOnce(this.notificationModal, "modalNotificationDetailBack", function() {
                    t.notificationModal.end()
                }), this.notificationModal.open()
            },
            dispose: function() {
                this.removeTouchEvent(), this.$el.empty(), this.stopListening(), this.undelegateEvents()
            }
        })
    }), define("templates_event/challenge/dungeon/LinkList", [], function() {
        return function(a) {
            function print() {
                __p += __j.call(arguments, "")
            }
            a || (a = {});
            var b, __p = "",
                __e = _.escape,
                __j = Array.prototype.join;
            with(a) linkCollection.each(function(e) {
                __p += '\n    <div class="c-dungeon-list-nav">\n        <div class="c-btn is-thick-long" data-mbgaui-anchors data-app-sound="choose" data-mbgaui-anchors="{preventDefault: true}" data-app-touch-init data-app-link-id="' + __e(e.get("id")) + '">\n            <img src="' + __e(pUrl("/dff/static/img/event/challenge_" + e.get("event_id") + "/event_link_dungeon_list" + e.get("id") + ".png")) + '" width="286" height="42">\n        </div>\n    </div>\n'
            }), __p += "\n";
            return __p
        }
    }), define("event/challenge/app/dungeon/views/LinkList", ["underscore", "jquery", "backbone", "lib/TemplateRenderer", "event/common/views/LinkListBase", "templates_event/challenge/dungeon/LinkList"], function(e, t, n, r, i, s) {
        return i.extend({
            render: function() {
                var e = r.process(s, {
                    linkCollection: this.linkCollection
                });
                t("[data-app-link-list-wrap]").empty(), t("[data-app-link-list-wrap]").append(e), this.addTouchEvent()
            }
        })
    }), define("event/challenge/app/dungeon/pages/List", ["underscore", "jquery", "backbone", "sprintf", "scenes/dungeon/pages/List", "templates_event/challenge/dungeon/List", "event/challenge/app/dungeon/views/LinkList"], function(e, t, n, r, i, s, o) {
        return i.extend({
            tmpl: s,
            events: e.extend({}, i.prototype.events, {
                "anchorsbeforejump [data-app-btn-challenge-prizes]": "onClickPrize",
                "anchorsbeforejump [data-app-btn-intro]": "onClickIntro",
                "anchorsbeforejump [data-app-btn-intro-movie]": "onClickIntroMovie",
                "anchorsbeforejump [data-app-external]": "onClickExternalLink"
            }),
            setupDeferred: function() {
                var e = this;
                return i.prototype.setupDeferred.call(this).then(function() {
                    var i = t.Deferred(),
                        s = e.worldModel.getEventId();
                    if (e.shouldPlayIntroMovie(s)) {
                        FF.datastore.stash.hasPlayedEventIntroMovie[s] = !0;
                        var o = r("#event/challenge/%s/intro_movie", e.worldModel.get("id"));
                        n.history.navigate(o, {
                            trigger: !0
                        }), i.reject()
                    } else i.resolve();
                    return i.promise()
                })
            },
            render: function(e) {
                e = e || {};
                var t = this.worldModel.getEventId(),
                    n = FF.datastore.getEventData(t);
                e.dungeonTypeAlias = n.dungeonTypeAlias, e.eventId = t, e.hasForceDungeon = this.hasForceDungeon();
                var r = FF.CONST.SERVER.EVENT.LINK.DISPLAY_PLACE_TYPE_OF.DUNGEON_LIST;
                n.eventLinkCollectionByPlaceType && n.eventLinkCollectionByPlaceType[r] && (e.eventLinkCollectionInDungeonList = n.eventLinkCollectionByPlaceType[r].sort()), i.prototype.render.apply(this, [e]), e.eventLinkCollectionInDungeonList && (this.linkView = new o(e.eventLinkCollectionInDungeonList), this.linkView.render())
            },
            getDungeonModels: function(t) {
                var n = this.dungeonCollection.where({
                    type: t || this.dungeonListType
                });
                return e.filter(n, function(e) {
                    return e.isOpened()
                })
            },
            onClickPrize: function(e) {
                var i = t(e.target).data("app-dungeon-type"),
                    s = r("#event/challenge/%s/prizes/%s", this.worldModel.get("id"), i);
                n.history.navigate(s, {
                    trigger: !0
                })
            },
            onClickIntro: function() {
                var e = this.worldModel.getEventModel();
                n.history.navigate(e.getIntroFragment(), {
                    trigger: !0
                })
            },
            onClickIntroMovie: function() {
                var e = r("#event/challenge/%s/intro_movie", this.worldModel.get("id"));
                n.history.navigate(e, {
                    trigger: !0
                })
            },
            onClickExternalLink: function(e) {
                var n = t(e.target).attr("data-app-external");
                kickmotor.platform.canOpenExternalURL(n, function(e) {
                    if (!e.canOpen) throw new Error("invalid url:" + n);
                    kickmotor.platform.openExternalURL(n)
                })
            },
            shouldShowForceDungeonTutorial: function() {
                return !1
            },
            hasForceDungeon: function() {
                var e = this.getDungeonModels(FF.CONST.SERVER.DUNGEON.TYPE_OF.FORCE);
                return e.length > 0
            },
            shouldPlayIntroMovie: function(e) {
                var t = FF.datastore.eventCollection.get(e);
                return t.get("has_intro_movie") ? FF.datastore.stash.hasShownFirstTimeEventIntroPage[e] ? FF.datastore.stash.hasPlayedEventIntroMovie[e] ? !1 : FF.env.canPlayMovieJustAfterDownload() ? !0 : !1 : !1 : !1
            },
            dispose: function() {
                this.linkView && this.linkView.dispose(), i.prototype.dispose.call(this)
            }
        })
    }), define("event/challenge/app/dungeon/DungeonScene", ["underscore", "jquery", "backbone", "sprintf", "scenes/dungeon/DungeonScene", "scenes/common/models/World", "scenes/common/collections/Dungeon", "scenes/common/helper/Relation", "./pages/List"], function(e, t, n, r, i, s, o, u, a) {
        return i.extend({
            pages: e.extend({}, i.prototype.pages, {
                list: a
            }),
            start: function(e, t) {
                var n = this,
                    r = t[0],
                    i = FF.datastore.worldCollection.get(r),
                    s = i.getEventModel(),
                    o = s.getHelper();
                o.setupEventDeferred(s.get("id")).then(u.showModalIfNeedDeferred.bind(u)).then(n.setupDeferred.bind(n, i.get("id"))).done(function() {
                    n.showPage(e, t)
                })
            }
        })
    }), define("event/challenge/app/battle_list/BattleListScene", ["underscore", "jquery", "backbone", "scenes/battle_list/Api", "scenes/battle_list/BattleListScene"], function(e, t, n, r, i) {
        return i.extend({})
    }), define("templates_event/challenge/prize_list/PrizeList", [], function() {
        return function(a) {
            function print() {
                __p += __j.call(arguments, "")
            }
            a || (a = {});
            var b, __p = "",
                __e = _.escape,
                __j = Array.prototype.join;
            with(a) __p += '<div class="c-layer-bg w-full h-full" data-app-layer-bg></div>\n<div class="c-layer-content-1 scene-challenge-prize-list">\n    <div class="c-content-bg is-alpha s-freescroll-content', hasForce && (__p += " is-tab-type"), __p += '">\n        ', hasForce || (__p += '\n            <div class="p-content-border-top"></div>\n        '), __p += '\n        <div class="c-freescroll-wrap is-add-cover">\n            <div class="c-freescroll" data-ui-freescroll>\n                <div class="c-paper-container" data-ui-freescroll-content>\n                    <div class="c-paper-container__inner" data-app-detail></div>\n                </div>\n                <div class="c-freescroll__scrollbar" data-ui-scrollbar><div class="c-freescroll__scrollbar-inner" data-ui-scrollbar-face></div></div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class="c-layer-content-11 scene-challenge-prize-list">\n    <h1 class="c-ttl-scene">\n        <span class="c-ttl-scene__inner">\n        Event Rewards\n        </span>\n    </h1>\n    ', hasForce && (__p += '\n        <ul class="c-tab is-tab-type2">\n            ', dungeonTypeAlias ? (__p += '\n                <li class="c-tab__children', isForce || (__p += " is-current"), __p += '" data-mbgaui-anchors="{ preventDefault: true }" data-app-sound="choose" data-app-dungeon-type="' + __e(TYPE_OF.NORMAL) + '" data-app-tab>\n                    <div class="c-tab__children-inner"><img class="s-img-title" src="' + __e(pUrl("/dff/static/img/event/challenge_" + eventId + "/btn_history.png")) + '" width="125" height="34"></div>\n                </li>\n                <li class="c-tab__children', isForce && (__p += " is-current"), __p += '" data-mbgaui-anchors="{ preventDefault: true }" data-app-sound="choose" data-app-dungeon-type="' + __e(TYPE_OF.FORCE) + '" data-app-tab>\n                    <div class="c-tab__children-inner"><img class="s-img-title" src="' + __e(pUrl("/dff/static/img/event/challenge_" + eventId + "/btn_force.png")) + '" width="125" height="34"></div>\n                </li>\n            ') : (__p += '\n                <li class="c-tab__children', isForce || (__p += " is-current"), __p += '" data-mbgaui-anchors="{ preventDefault: true }" data-app-sound="choose" data-app-dungeon-type="' + __e(TYPE_OF.NORMAL) + '" data-app-tab>\n                    <div class="c-tab__children-inner"><img class="s-img-title" src="' + __e(pUrl("/dff/static/img/event/common/btn_history.png")) + '" width="125" height="34"></div>\n                </li>\n                <li class="c-tab__children', isForce && (__p += " is-current"), __p += '" data-mbgaui-anchors="{ preventDefault: true }" data-app-sound="choose" data-app-dungeon-type="' + __e(TYPE_OF.FORCE) + '" data-app-tab>\n                    <div class="c-tab__children-inner"><img class="s-img-title" src="' + __e(pUrl("/dff/static/img/event/common/btn_force.png")) + '" width="125" height="34"></div>\n                </li>\n            '), __p += "\n            </ul>\n    "), __p += '\n    <a class="c-btn-back img-rep" data-app-btn-back data-mbgaui-anchors data-app-sound="choose">戻る</a>\n</div>\n';
            return __p
        }
    }), define("templates_event/challenge/prize_list/view/PrizeDetail", [], function() {
        return function(a) {
            function print() {
                __p += __j.call(arguments, "")
            }
            a || (a = {});
            var b, __p = "",
                __e = _.escape,
                __j = Array.prototype.join;
            with(a) hasAnyBuddyPrizeDungeon && (__p += '\n    <div class="ta-c mb-b2">\n        <img src="' + __e(pUrl("/dff/static/img/event/challenge_" + eventId + "/event_prize_pick_up.png")) + '" width="257" height="91">\n    </div>\n'), __p += "\n", _.each(dungeons, function(e) {
                __p += "\n    \n    ";
                if (!e.isOpened()) return;
                __p += "\n\n    \n    ";
                if (_.indexOf([10902423, 10902424, 10902425, 10902426], +e.get("id")) >= 0) return;
                __p += '\n\n    <section class="c-paper-container__content">\n        <h1 class="c-ttl-category">\n            <span class="c-ttl-category__inner">' + __e(e.get("name")) + "</span>\n        </h1>\n        <ul>\n            ", _.each(e.getSortedDungeonPrizes(), function(t) {
                    __p += "\n                ";
                    var n = t.type;
                    __p += "\n                ";
                    var r = t.items;
                    __p += '\n                <li class="mb-b">\n                    <h1 class="c-ttl-section mb-b">\n                        ', n == PRIZE_TYPE_OF.CLEAR && (__p += "Completion Reward"), __p += "\n                        ", n == PRIZE_TYPE_OF.FIRST_CLEAR && (__p += "First Time Reward"), __p += "\n                        ", n == PRIZE_TYPE_OF.FIRST_MASTER && (__p += "Mastery Reward"), __p += "\n                    </h1>\n                    ";
                    var i = e.isAcquisitionByPrizeType(n);
                    __p += "\n                    ", _.each(r, function(e) {
                        __p += '\n                        <dl class="prize-detail ml-a mr-a box-c">\n                            <dt class="mr-b', i && (__p += " c-acquisition"), __p += '">\n                                <img src="' + __e(pUrl(e.image_path)) + '" width="35" height="35">\n                            </dt>\n                            <dd>\n                                ' + __e(e.name), FF.env.isWWRegion ? __p += "&nbsp;x" : __p += "&times;", __p += __e(e.num) + "<br>\n                            </dd>\n                        </dl>\n                    "
                    }), __p += "\n                </li>\n            "
                }), __p += "\n        </ul>\n    </section>\n"
            }), __p += "\n";
            return __p
        }
    }), define("event/challenge/app/prize_list/views/Layout", ["underscore", "jquery", "backbone", "lib/TemplateRenderer", "templates_event/challenge/prize_list/PrizeList", "templates_event/challenge/prize_list/view/PrizeDetail", "lib/LayoutBase", "components/FreeScroll", "components/Scrollbar"], function(e, t, n, r, i, s, o, u, a) {
        var f = {
                CURRENT_CLASS_NAME: "is-current"
            },
            l = o.extend({
                events: {
                    "anchorsbeforejump [data-app-tab]": "onClickTab"
                },
                initialize: function(e) {
                    this.eventId = e.eventId, this.worldModel = e.worldModel, this.dungeonCollection = e.dungeonCollection, this.currentDungeonType = e.dungeonType ? e.dungeonType : FF.CONST.SERVER.DUNGEON.TYPE_OF.NORMAL, o.prototype.initialize.call(this)
                },
                render: function() {
                    var e = FF.datastore.getEventData(this.eventId);
                    o.prototype.render.call(this, i, {
                        dungeonTypeAlias: e.dungeonTypeAlias,
                        eventId: this.eventId,
                        isForce: this.isForce(),
                        TYPE_OF: FF.CONST.SERVER.DUNGEON.TYPE_OF,
                        hasForce: this.hasForceDungeon()
                    }), this.cacheElements(), this.renderDetail(), this.setupComponents(), this.updateBackground(), this.processAfterRender()
                },
                updateBackground: function() {
                    var e = this.worldModel.getEventModel();
                    this.setBackgroundImage(e.get("background_image_path"))
                },
                setupComponents: function() {
                    this.freescroll = new u({
                        el: t("[data-ui-freescroll]")
                    }), this.scrollbar = new a({
                        el: t("[data-ui-scrollbar]"),
                        watch: this.freescroll,
                        faceHeight: 31,
                        disableOverscroll: !0
                    })
                },
                onClickBack: function() {
                    var e = this.worldModel.getDungeonListFragment({
                        isForce: this.isForce()
                    });
                    n.history.navigate(e, {
                        trigger: !0
                    })
                },
                isForce: function() {
                    return +this.currentDungeonType === +FF.CONST.SERVER.DUNGEON.TYPE_OF.FORCE
                },
                hasForceDungeon: function() {
                    var e = this.getDungeonModels(FF.CONST.SERVER.DUNGEON.TYPE_OF.FORCE);
                    return e.length > 0 ? !0 : !1
                },
                getDungeonModels: function(t) {
                    t = t || this.dungeonListType;
                    var n = this.dungeonCollection.where({
                        type: t
                    });
                    return e.filter(n, function(e) {
                        return e.isOpened()
                    })
                },
                cacheElements: function() {
                    this.detailElm = t("[data-app-detail]"), this.tabLiElms = t("[data-app-tab]")
                },
                renderDetail: function() {
                    var e = this.dungeonCollection,
                        t = r.process(s, {
                            eventId: this.eventId,
                            dungeons: e.getDungeonModelByType(this.currentDungeonType),
                            hasAnyBuddyPrizeDungeon: e.hasAnyBuddyPrizeDungeon(this.worldModel.get("id")),
                            PRIZE_TYPE_OF: FF.CONST.SERVER.DUNGEON.PRIZE_TYPE_OF
                        });
                    this.detailElm.html(t)
                },
                onClickTab: function(e) {
                    FF.router.loading.lock(), this.currentDungeonType = t(e.target).attr("data-app-dungeon-type"), this.tabLiElms.removeClass(f.CURRENT_CLASS_NAME).filter('[data-app-dungeon-type="' + this.currentDungeonType + '"]').addClass(f.CURRENT_CLASS_NAME), this.renderDetail(), this.scrollbar.updateContentWithScrollReset(), this.freescroll.reset(), FF.router.loading.unlock()
                },
                dispose: function() {
                    this.resetBackgroundImage(), this.freescroll && this.freescroll.dispose(), this.scrollbar && this.scrollbar.dispose(), o.prototype.dispose.call(this)
                }
            });
        return l
    }), define("event/challenge/app/prize_list/PrizeListScene", ["underscore", "jquery", "backbone", "scenes/common/util/Api", "lib/Scene", "./views/Layout", "scenes/common/collections/Dungeon"], function(e, t, n, r, i, s, o) {
        return i.extend({
            start: function(e, t) {
                var r = FF.datastore.worldCollection.get(e),
                    i = FF.datastore.dungeonCollection.where({
                        world_id: +e
                    });
                if (i.length <= 0) return n.history.navigate(r.getDungeonListFragment(), {
                    trigger: !0
                });
                this.layoutView = new s({
                    eventId: r.getEventId(),
                    worldModel: r,
                    dungeonCollection: new o(i),
                    dungeonType: +t
                }), this.layoutView.render(), FF.SoundMgr.playMusic(r.get("bgm"))
            }
        })
    }), define("event/challenge/app/intro_movie/views/Layout", ["underscore", "jquery", "backbone", "scenes/movie_play/views/Layout", "templates/event_intro_movie/EventIntroMovie"], function(e, t, n, r, i) {
        return r.extend({
            _getTmpl: function() {
                return i
            },
            _getEndFragment: function() {
                var e = FF.datastore.worldCollection.get(+this.options.worldId);
                return e.getDungeonListFragment()
            }
        })
    }), define("event/challenge/app/intro_movie/IntroMovieScene", ["underscore", "jquery", "backbone", "lib/Scene", "./views/Layout", "scenes/movie_play/MoviePlayScene", "scenes/common/helper/MovieHelper"], function(e, t, n, r, i, s, o) {
        return s.extend({
            layoutClass: i,
            start: function(e) {
                var t = FF.datastore.worldCollection.get(e),
                    n = t.getEventId(),
                    r = o.getEventMovieName(n),
                    i = {
                        worldId: e,
                        eventId: n
                    };
                return s.prototype.start.call(this, r, i)
            }
        })
    }),
    function() {
        var e = FF.onload;
        FF.onload = function() {
            require(["backbone", "event/challenge/app/Helper", "event/challenge/app/dungeon/DungeonScene", "event/challenge/app/battle_list/BattleListScene", "event/challenge/app/prize_list/PrizeListScene", "event/challenge/app/intro_movie/IntroMovieScene"], function(t, n, r, i, s, o) {
                var u = t.Router.extend({
                    routes: {
                        "event/challenge/:world_id/dungeon/:page(/*args)": "createEventChallengeDungeonScene",
                        "event/challenge/:world_id/battles/:dungeon_id": "createEventChallengeBattleListScene",
                        "event/challenge/:world_id/prizes(/:type)": "createEventChallengePrizeListScene",
                        "event/challenge/:world_id/intro_movie": "createChallengeIntroMovieScene"
                    },
                    createEventChallengeDungeonScene: function(e, t, n) {
                        var i = [e, n].join("/");
                        return FF.router.changeSceneByPages(r, t, i)
                    },
                    createEventChallengeBattleListScene: function(e, t) {
                        return FF.router.changeScene(i, [e, t])
                    },
                    createEventChallengePrizeListScene: function(e, t) {
                        return FF.router.changeScene(s, [e, t])
                    },
                    createChallengeIntroMovieScene: function(e) {
                        return FF.router.changeScene(o, [+e])
                    }
                });
                FF.Events.challenge = FF.Events.challenge || {}, FF.Events.challenge.app = {
                    router: new u,
                    helper: new n
                }, e()
            })
        }
    }(), define("event/challenge/app", function() {});