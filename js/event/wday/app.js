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
    }), define("event/wday/app/models/EventWdayDungeon", ["backbone", "lib/Model", "sprintf", "util"], function(e, t, n, r) {
        return t.extend({})
    }), define("event/wday/app/collections/EventWdayDungeon", ["lib/Collection", "../models/EventWdayDungeon"], function(e, t) {
        return e.extend({
            model: t,
            getDungeonIdsByWday: function(e) {
                return this.filter(function(t) {
                    return t.get("wday") === +e
                }).map(function(e) {
                    return e.get("dungeon_id")
                })
            }
        })
    }), define("templates_event/wday/ModalDungeonInfo", [], function() {
        return function(a) {
            function print() {
                __p += __j.call(arguments, "")
            }
            a || (a = {});
            var b, __p = "",
                __e = _.escape,
                __j = Array.prototype.join;
            with(a) {
                var c = FF.CONST.SERVER.DUNGEON.PRIZE_TYPE_OF;
                __p += '\n\n<div class="scene-modal-dungeon-detail c-modal-window">\n    <div class="c-modal-window__inner">\n        <h1 class="c-ttl-scene">\n            ', helper.isSeriesIconDefined(seriesId) && (__p += '\n                <span class="c-ttl-scene__img p-icon-' + __e(seriesId) + ' img-rep">' + __e(seriesId) + "</span>\n            "), __p += '\n            <span class="c-ttl-scene__inner ls-xxs fs-l lh-s">' + __e(dungeonModel.get("name")) + '</span>\n        </h1>\n\n        <div class="c-dungeon-detail-plate mlr-a box-cc">\n            <dl class="c-label">\n                <dt class="c-label__img"><div class="p-text-total-stamina img-rep">総消費スタミナ</div></dt>\n                <dd class="c-label__text">' + __e(dungeonModel.get("total_stamina")) + '</dd>\n            </dl>\n        </div>\n\n            <div class="c-paper-container mb-b2 s-only-content">\n                <div class="c-paper-container__inner">\n                <h1 class="c-ttl-category"><span class="c-ttl-category__inner">Rewards</span></h1>\n                <div class="c-freescroll" data-ui-freescroll="dungeon-info">\n                    <div data-ui-freescroll-content>\n                        <div data-ui-group="pane" data-ui-tab-name="prize">\n\n                            <section class="c-paper-container__content">\n                                <h1 class="c-ttl-section mb-b">Item Highlights</h1>\n                                <ul>\n                                ', _.each(eventWdayDungenModel.get("attention_items"), function(e) {
                    __p += '\n                                    <li class="box-c mb-b">\n                                        <div class="mr-b"><img src="' + __e(pUrl(e.image_path)) + '" width="35" height="35"></div>\n                                         <p class="s-ww-prize-name">' + __e(e.name), e.num && (FF.env.isWWRegion ? __p += "&nbsp;x" : __p += "&times;", __p += __e(e.num)), __p += "</p>\n                                    </li>\n                                "
                }), __p += '\n                                </ul>\n                                <div class="c-bar-content mb-b">\n                                    <p class="c-bar-content__inner">\n                                        Strategy Tips<br>\n                                        ' + __e(eventWdayDungenModel.get("description")) + "\n                                    </p>\n                                </div>\n                            </section>\n                            ", _.each(dungeonModel.getSortedDungeonPrizes(), function(e) {
                    __p += "\n                                ";
                    var t = e.type;
                    __p += "\n                                ";
                    var n = e.items;
                    __p += '\n                                <section>\n                                    <h1 class="c-ttl-section mb-b">\n                                        <span class="c-ttl-section__inner">\n                                            ', t == c.CLEAR && (__p += "Completion Reward"), __p += "\n                                            ", t == c.FIRST_CLEAR && (__p += "First Time Reward"), __p += "\n                                            ", t == c.FIRST_MASTER && (__p += "Mastery Reward"), __p += '\n                                        </span>\n                                    </h1>\n                                    <ul class="ml-b2 mr-b2">\n                                        ';
                    var r = dungeonModel.isAcquisitionByPrizeType(t);
                    __p += "\n                                        ", _.each(n, function(e) {
                        __p += '\n                                            <li class="box-c mb-b">\n                                                <div class="mr-b', r && (__p += " c-acquisition"), __p += '"><img src="' + __e(pUrl(e.image_path)) + '" width="35" height="35"></div>\n                                                <p class="s-ww-prize-name">' + __e(e.name), FF.env.isWWRegion ? __p += "&nbsp;x" : __p += "&times;", __p += __e(e.num) + "</p>\n                                            </li>\n                                        "
                    }), __p += "\n                                    </ul>\n                                </section>\n                            "
                }), __p += '\n                        </div>\n                    </div>\n                    <div class="c-freescroll__scrollbar" data-ui-scrollbar="detail"><div class="c-freescroll__scrollbar-inner" data-ui-scrollbar-face></div></div>\n                </div>\n            </div>\n        </div>\n        <div class="c-btn-layout">\n            ', enableChallengeButton ? __p += '\n                <div class="c-btn is-sub-lead c-btn-layout__left" data-mbgaui-anchors data-app-sound="choose" data-app-modal-close data-app-enable-back-key="true">\n                    <span class="c-btn__inner">Close</span>\n                </div>\n                <div class="c-btn is-main-lead c-btn-layout__right" data-mbgaui-anchors data-app-modal-challenge data-app-sound="decide">\n                    <span class="c-btn__inner">Enter Dungeon</span>\n                </div>\n            ' : __p += '\n                <div class="c-btn is-sub-lead c-btn-layout__center" data-mbgaui-anchors data-app-sound="choose" data-app-modal-close data-app-enable-back-key="true">\n                    <span class="c-btn__inner">Close</span>\n                </div>\n            ', __p += "\n        </div>\n    </div>\n</div>\n"
            }
            return __p
        }
    }), define("event/wday/app/views/ModalDungeonInfo", ["underscore", "jquery", "backbone", "util", "templates_event/wday/ModalDungeonInfo", "scenes/common/views/ModalDungeonInfo"], function(e, t, n, r, i, s) {
        return s.extend({
            setupDeferred: function() {
                var e = this.dungeonModel.getWorldModel(),
                    t = e.getEventModel(),
                    n = t.getHelper();
                return n.setupEventDeferred(t.get("id"))
            },
            render: function() {
                this.renderContent(i, {
                    util: r,
                    dungeonModel: this.dungeonModel,
                    selectedType: this.selectedType,
                    enableChallengeButton: this.enableChallengeButton,
                    eventWdayDungenModel: this.getEventWdayDungeonModel(),
                    seriesId: this.dungeonModel.get("series_id")
                }), this.setupComponents()
            },
            getEventWdayDungeonModel: function() {
                var e = FF.datastore.worldCollection.get(+this.dungeonModel.get("world_id")),
                    t = e.getEventId(),
                    n = FF.datastore.getEventData(+t);
                return n.eventWdayDungeonCollection.findWhere({
                    dungeon_id: +this.dungeonModel.get("id")
                })
            }
        })
    }), define("event/wday/app/Helper", ["underscore", "jquery", "backbone", "util", "scenes/common/util/Api", "event/AppHelperBase", "scenes/common/collections/Dungeon", "./collections/EventWdayDungeon", "./views/ModalDungeonInfo"], function(e, t, n, r, i, s, o, u, a) {
        return s.extend({
            canShowEventList: function(e) {
                var t = e.getWorldModel();
                return t.canBeginBattleTerm()
            },
            getImagePath: function(e) {
                return e.get("image_path").replace(/\/\d+\.png$/, sprintf("/wday/%d_%d.png", +e.get("id"), +r.getCurrentDay()))
            },
            getBackgroundImagePath: function(e) {
                return e.get("background_image_path").replace(/\/\d+_bg\.png$/, sprintf("/wday/%d_%d_bg.png", +e.get("id"), +r.getCurrentDay()))
            },
            setupEventDeferred: function(e) {
                var r = t.Deferred();
                if (FF.datastore.getEventData(e)) return r.resolve().promise();
                var s = FF.datastore.eventCollection.get(e),
                    o = s.getWorldModel();
                return o.isLocked() ? (n.history.navigate(s.getIntroFragment(), {
                    trigger: !0
                }), r.reject().promise()) : (i.getEventDataDeferred(e, s.get("type_name")).done(function(t) {
                    var n = new u(t.wday_dungeon);
                    return FF.datastore.setEventData(e, {
                        eventWdayDungeonCollection: n
                    }), r.resolve()
                }), r.promise())
            },
            grepCurrentDungeonModels: function(t) {
                var n = FF.datastore.getEventData(+t),
                    i = r.getCurrentDay(),
                    s = n.eventWdayDungeonCollection.getDungeonIdsByWday(i);
                if (!s) throw new Error("missing wday dungeon schedule : " + i);
                return FF.datastore.dungeonCollection.filter(function(t) {
                    return e.contains(s, t.get("id"))
                })
            },
            canEnterDungeonId: function(e, t) {
                var n = FF.datastore.getEventData(+e),
                    i = n.eventWdayDungeonCollection.findWhere({
                        dungeon_id: t,
                        wday: r.getCurrentDay()
                    });
                return i ? !0 : !1
            },
            getDungeonInfoModalClass: function() {
                return a
            }
        })
    }), define("templates_event/wday/dungeon/List", [], function() {
        return function(a) {
            function print() {
                __p += __j.call(arguments, "")
            }
            a || (a = {});
            var b, __p = "",
                __e = _.escape,
                __j = Array.prototype.join;
            with(a) __p += '<div class="c-layer-bg w-full h-full" data-app-layer-bg></div>\n<div class="c-layer-content-1 scene-wday-dungeon-list">\n    <div class="c-freescroll-wrap">\n        <div class="c-freescroll" data-ui-freescroll data-app-dungeon-list-scroll>\n            <div data-ui-freescroll-content>\n                <ul class="mb-b4">\n                    ', _.each(dungeonModels, function(e) {
                __p += '\n                        <li class="mb-b2">\n                            <div class="c-btn is-thick-long mlr-a" data-dungeon-id="' + __e(e.get("id")) + '" data-mbgaui-anchors data-app-sound="choose" data-app-flag-unlock data-app-dungeon-info>\n                                <div class="c-btn__inner">\n                                    <div class="mb-b">' + __e(e.get("name")) + '</div>\n                                    <div class="c-text-mat s-text-layout">\n                                        <div class="c-text-mat__inner">\n                                            <dl class="c-label box-cb">\n                                                <dt class="c-label__img"><div class="p-text-total-stamina img-rep">総消費スタミナ</div></dt>\n                                                <dd class="c-label__text s-text-layout__num">' + __e(e.get("total_stamina")) + "</dd>\n                                            </dl>\n                                        </div>\n                                    </div>\n                                </div>\n\n                                ", e.get("is_master") ? __p += '\n                                    <div class="p-text-master img-rep s-badge">Master</div>\n                                ' : e.get("is_clear") && (__p += '\n                                    <div class="p-text-clear img-rep s-badge">clear</div>\n                                '), __p += "\n                            </div>\n                         </li>\n                     "
            }), __p += '\n                </ul>\n                <div class="c-btn is-nav-small s-btn-intro" data-mbgaui-anchors data-app-sound="choose" data-app-btn-intro>\n                    <span class="c-btn__inner fs-xs">Daily Dungeon Rules</span>\n                </div>\n            </div>\n            <div class="c-freescroll__scrollbar" data-ui-scrollbar><div class="c-freescroll__scrollbar-inner" data-ui-scrollbar-face></div></div>\n        </div>\n    </div>\n</div>\n\n<div class="c-layer-content-11 scene-wday-dungeon-list" data-app-dungeon-list>\n    <h1 class="c-ttl-scene">\n        <span class="c-ttl-scene__inner">\n            ' + __e(worldModel.get("name")) + '\n        </span>\n    </h1>\n    <a class="c-btn-back img-rep" data-app-btn-back data-mbgaui-anchors data-app-sound="choose">戻る</a>\n\n</div>\n<div data-app-dungeon-detail></div>\n';
            return __p
        }
    }), define("event/wday/app/dungeon/pages/List", ["underscore", "jquery", "backbone", "scenes/dungeon/pages/List", "templates_event/wday/dungeon/List"], function(e, t, n, r, i) {
        return r.extend({
            tmpl: i,
            events: e.extend({}, r.prototype.events, {
                "anchorsbeforejump [data-app-btn-intro]": "onClickIntro"
            }),
            getDungeonModels: function() {
                var t = this.worldModel.getEventModel().getHelper(),
                    n = t.grepCurrentDungeonModels(this.worldModel.getEventId());
                return e.filter(n, function(e) {
                    return e.isOpened()
                })
            },
            onClickIntro: function() {
                var e = this.worldModel.getEventModel();
                n.history.navigate(e.getIntroFragment(), {
                    trigger: !0
                })
            }
        })
    }), define("event/wday/app/dungeon/DungeonScene", ["underscore", "jquery", "backbone", "scenes/dungeon/Api", "scenes/dungeon/DungeonScene", "scenes/common/helper/Relation", "./pages/List"], function(e, t, n, r, i, s, o) {
        return i.extend({
            pages: e.extend({}, i.prototype.pages, {
                list: o
            }),
            start: function(e, t) {
                var n = this,
                    r = t[0],
                    i = FF.datastore.worldCollection.get(r),
                    o = i.getEventModel(),
                    u = o.getHelper();
                u.setupEventDeferred(o.get("id")).then(s.showModalIfNeedDeferred.bind(s)).then(n.setupDeferred.bind(n, r)).done(function() {
                    n.showPage(e, t)
                })
            }
        })
    }), define("event/wday/app/battle_list/BattleListScene", ["underscore", "jquery", "backbone", "scenes/battle_list/BattleListScene"], function(e, t, n, r) {
        return r.extend({})
    }),
    function() {
        var e = FF.onload;
        FF.onload = function() {
            require(["backbone", "event/wday/app/Helper", "event/wday/app/dungeon/DungeonScene", "event/wday/app/battle_list/BattleListScene"], function(t, n, r, i) {
                var s = t.Router.extend({
                    routes: {
                        "event/wday/:event_id/dungeon/:page(/*args)": "createEventWdayDungeonScene",
                        "event/wday/:event_id/battles/:dungeon_id": "createEventWdayBattleListScene"
                    },
                    createEventWdayDungeonScene: function(e, t, n) {
                        var i = [e, n].join("/");
                        return FF.router.changeSceneByPages(r, t, i)
                    },
                    createEventWdayBattleListScene: function(e, t) {
                        return FF.router.changeScene(i, [e, t])
                    }
                });
                FF.Events.wday = FF.Events.wday || {}, FF.Events.wday.app = {
                    router: new s,
                    helper: new n
                }, e()
            })
        }
    }(), define("event/wday/app", function() {}), define("event/wday/app/battle_list/views/Layout", ["scenes/battle_list/views/Layout"], function(e) {
        return e.extend({
            updateBackgroundImage: function() {
                var e = this.worldModel.getEventModel(),
                    t = e.getBackgroundImagePath();
                this.setBackgroundImage(t)
            },
            onClickOperations: function() {
                FF.router.loading.lock();
                var e = sprintf("#event/wday/%s/battle_operations", this.worldModel.getEventId());
                Backbone.history.navigate(e, {
                    trigger: !0
                })
            }
        })
    });