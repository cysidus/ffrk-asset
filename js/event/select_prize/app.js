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
            }
        })
    }), define("event/select_prize/app/models/DungeonPrize", ["underscore", "backbone", "lib/Model", "sprintf", "util"], function(e, t, n, r, i) {
        return n.extend({
            isAlreadyUnlocked: function() {
                var e = FF.datastore.getEventData(this.get("event_id")),
                    t = e.userSelectedPrizeCollection.findWhere({
                        dungeon_id: this.get("dungeon_id")
                    });
                return !!t && !!t.isAlreadyUnlocked()
            },
            isAlreadyGot: function() {
                var e = FF.datastore.getEventData(this.get("event_id")),
                    t = e.userSelectedPrizeCollection.findWhere({
                        dungeon_id: this.get("dungeon_id")
                    });
                return !!t && !!t.isAlreadyGot()
            }
        })
    }), define("event/select_prize/app/collections/DungeonPrize", ["underscore", "lib/Collection", "../models/DungeonPrize"], function(e, t, n) {
        return t.extend({
            model: n,
            getModelsByDungeonIds: function(t) {
                return this.filter(function(n) {
                    return e.contains(t, n.get("dungeon_id"))
                })
            }
        })
    }), define("event/select_prize/app/models/DungeonGroupTab", ["underscore", "backbone", "lib/Model", "sprintf", "util", "components/TimeKeeper"], function(e, t, n, r, i, s) {
        return n.extend({
            isOpened: function() {
                var e = i.getTimeAsSec();
                return this.get("opened_at") <= e && this.get("closed_at") > e
            },
            isClosed: function() {
                var e = i.getTimeAsSec();
                return this.get("closed_at") <= e
            },
            getOpenedToClosedTermText: function() {
                var e = this.getTimeKeeper();
                return "PST " + e.setUnixTime(this.get("closed_at")).getPSTString() + " " + "UTC " + e.setUnixTime(this.get("closed_at")).getString()
            },
            getTimeKeeper: function() {
                return new s({
                    format: "%M/%D %H:%I",
                    months: "01 02 03 04 05 06 07 08 09 10 11 12".split(" ")
                })
            },
            getLabelClassName: function() {
                return "img-text-vol" + this.get("release_no")
            }
        })
    }), define("event/select_prize/app/collections/DungeonGroupTab", ["lib/Collection", "../models/DungeonGroupTab"], function(e, t) {
        return e.extend({
            model: t,
            comparator: function(e, t) {
                return e.get("release_no") < t.get("release_no") ? -1 : e.get("release_no") > t.get("release_no") ? 1 : 0
            },
            getCurrentTab: function() {
                return this.find(function(e) {
                    return e.isOpened()
                })
            }
        })
    }), define("event/select_prize/app/models/UserSelectedPrize", ["underscore", "backbone", "lib/Model", "sprintf", "util"], function(e, t, n, r, i) {
        return n.extend({
            idAttribute: "dungeon_id",
            isAlreadyUnlocked: function() {
                return !!this.get("unlocked_at")
            },
            isAlreadyGot: function() {
                return this.get("unlocked_at") ? !!this.get("got_at") : !1
            },
            shouldOpenCongratulationModal: function() {
                return this.get("unlocked_at") ? this.get("got_at") ? this.get("congratulated_at") ? !1 : !0 : !1 : !1
            }
        })
    }), define("event/select_prize/app/collections/UserSelectedPrize", ["lib/Collection", "../models/UserSelectedPrize"], function(e, t) {
        return e.extend({
            model: t,
            getUnlockedNum: function() {
                var e = this.filter(function(e) {
                    return e.isAlreadyUnlocked()
                });
                return e.length
            },
            getModelsToOpenCongratulationModal: function() {
                return this.filter(function(e) {
                    return e.shouldOpenCongratulationModal()
                })
            }
        })
    }), define("event/select_prize/app/models/UnlockItem", ["underscore", "backbone", "lib/Model", "sprintf", "util"], function(e, t, n, r, i) {
        return n.extend({})
    }), define("event/select_prize/app/collections/UnlockItem", ["lib/Collection", "util", "../models/UnlockItem"], function(e, t, n) {
        return e.extend({
            model: n,
            getOpenModels: function() {
                return this.filter(function(e) {
                    return t.getTimeAsSec() >= e.get("opened_at")
                })
            },
            getUnopenedModels: function() {
                return this.filter(function(e) {
                    return t.getTimeAsSec() < e.get("opened_at")
                })
            },
            getCurrentMaxNum: function() {
                var e = _.map(this.getOpenModels(), function(e) {
                    return e.get("num")
                });
                return t.sum(e)
            },
            getNextModel: function() {
                var e = this.getUnopenedModels();
                return e.length === 0 ? null : _.min(e, function(e) {
                    return e.get("opened_at")
                })
            },
            getWaitSecToGetNextUnlockItem: function() {
                var e = this.getNextModel();
                return e ? e.get("opened_at") - t.getTimeAsSec() : null
            }
        })
    }), define("event/select_prize/app/Helper", ["underscore", "jquery", "backbone", "util", "scenes/common/util/Api", "event/AppHelperBase", "scenes/common/collections/Dungeon", "./collections/DungeonPrize", "./collections/DungeonGroupTab", "./collections/UserSelectedPrize", "./collections/UnlockItem"], function(e, t, n, r, i, s, o, u, a, f, l) {
        return s.extend({
            canShowEventList: function(e) {
                var t = e.getWorldModel();
                return t.canBeginBattleTerm()
            },
            getTermText: function(e) {
                var t = e.getWorldModel();
                return t.getOpenedToKeptOutTermText()
            },
            setupEventDeferred: function(e) {
                var r = t.Deferred(),
                    s = FF.datastore.eventCollection.get(e),
                    c = s.getWorldModel();
                return c.isLocked() ? (n.history.navigate(s.getIntroFragment(), {
                    trigger: !0
                }), r.reject().promise()) : (i.getEventDataDeferred(e, s.get("type_name")).done(function(t) {
                    var n = new o(t.dungeons),
                        i = new u(t.dungeon_prizes),
                        s = new a(t.dungeon_group_tabs),
                        c = new f(t.user_selected_prizes),
                        h = new l(t.unlock_items);
                    return FF.datastore.setEventData(e, {
                        dungeonCollection: n,
                        dungeonPrizeCollection: i,
                        dungeonGroupTabCollection: s,
                        userSelectedPrizeCollection: c,
                        unlockItemCollection: h
                    }), r.resolve()
                }), r.promise())
            },
            grepCurrentDungeonModels: function(e) {
                var t = FF.datastore.getEventData(e),
                    n = FF.datastore.eventCollection.get(e),
                    r = n.getWorldModel();
                return t.dungeonCollection.filter(function(e) {
                    return e.get("world_id") !== r.get("id") ? !1 : e.isOpened()
                })
            },
            getRemainingUnlockItemNum: function(e) {
                var t = FF.datastore.getEventData(e),
                    n = t.unlockItemCollection.getCurrentMaxNum(),
                    r = t.userSelectedPrizeCollection.getUnlockedNum();
                return n - r
            }
        })
    }), define("templates_event/select_prize/dungeon_list/DungeonList", [], function() {
        return function(a) {
            function print() {
                __p += __j.call(arguments, "")
            }
            a || (a = {});
            var b, __p = "",
                __e = _.escape,
                __j = Array.prototype.join;
            with(a) __p += '<div class="layer-bg w-full h-full" data-app-layer-bg></div>\n<div class="layer-content-1 dungeon-list-layout-scroll select-prize mod-freescroll-wrap mod-basic" data-ui-freescroll data-app-dungeon-list-scroll>\n    <div data-ui-freescroll-content>\n        <div class="dungeon-list-nav mb-b">\n            <div class="btn-narrow" data-mbgaui-anchors data-app-sound="choose" data-app-btn-intro>\n                <span class="inner">Event Rules</span>\n            </div>\n            <a class="btn-fes-prize no' + __e(eventId) + ' img-rep position-limited" data-app-btn-select-prize-prizes data-mbgaui-anchors data-app-sound="choose">Rewards</a>\n        </div>\n        <ul class="list-decoration layout-select-prize">\n            ', _.each(dungeonModels, function(e) {
                __p += '\n                <li data-dungeon-id="' + __e(e.get("id")) + '" data-mbgaui-anchors data-app-sound="choose" data-app-flag-unlock>\n                    <div class="inner box-cb flex1">\n                        <div>' + __e(e.get("name")) + '<!-- /*ifdef wwlcd*/ --><br><span class="level">Difficulty ' + __e(e.get("challenge_level")) + "</span><!-- /*endif*/ --></div>\n                    </div>\n                    ", e.get("is_master") ? __p += '\n                        <div class="img-text-master img-rep">Master</div>\n                    ' : e.get("is_clear") && (__p += '\n                        <div class="img-text-clear img-rep">clear</div>\n                    '), __p += "\n                 </li>\n             "
            }), __p += '\n        </ul>\n    </div>\n    <div class="scrollbar" data-ui-scrollbar><div class="inner" data-ui-scrollbar-face></div></div>\n</div>\n\n<div class="layer-content-11 dungeon-list-layout select-prize" data-app-dungeon-list>\n    <h1 class="hdr-content">\n        <span class="inner">\n            <div class="title-name">' + __e(worldModel.get("name")) + '</div>\n            <!--  -->\n            <!-- /*ifdef wwlcd*/ -->\n            <div class="period mod-bg-alpha">\n                <span class="tl-time mr-b">PST</span>' + __e(timeKeeper.setUnixTime(worldModel.get("kept_out_at")).getPSTString()) + '\n                <span class="tl-time mr-b ml-b">UTC</span>' + __e(timeKeeper.setUnixTime(worldModel.get("kept_out_at")).getString()) + '\n            </div>\n            <!-- /*endif*/ -->\n        </span>\n    </h1>\n    <a class="btn-back" data-app-btn-back data-mbgaui-anchors data-app-sound="choose"></a>\n\n    <div class="hdr-dungeon">\n        <div class="name">' + __e(currentTabModel.get("name")) + '</div>\n        <!--  -->\n        <!-- /*ifdef wwlcd*/ -->\n        <div class="period mod-bg-alpha">\n            <span class="tl-time mr-b">PST</span>' + __e(timeKeeper.setUnixTime(currentTabModel.get("closed_at")).getPSTString()) + '\n            <span class="tl-time mr-b ml-b">UTC</span>' + __e(timeKeeper.setUnixTime(currentTabModel.get("closed_at")).getString()) + "\n        </div>\n        <!-- /*endif*/ -->\n    </div>\n</div>\n\n<div data-app-dungeon-detail></div>\n";
            return __p
        }
    }), define("templates_event/select_prize/dungeon_list/DungeonDetail", [], function() {
        return function(a) {
            function print() {
                __p += __j.call(arguments, "")
            }
            a || (a = {});
            var b, __p = "",
                __e = _.escape,
                __j = Array.prototype.join;
            with(a) {
                var c = worldModel.getEventModel();
                __p += "\n";
                var d = c.get("id");
                __p += "\n";
                var f = FF.datastore.getEventData(d);
                __p += "\n";
                var g = FF.Events.select_prize.app.helper.getRemainingUnlockItemNum(d);
                __p += "\n";
                var h = f.dungeonPrizeCollection.findWhere({
                    dungeon_id: dungeonModel.get("id")
                });
                __p += "\n";
                var i = f.unlockItemCollection.getWaitSecToGetNextUnlockItem();
                __p += "\n";
                var j = f.dungeonGroupTabCollection.getCurrentTab().get("release_no");
                __p += '\n<div class="layer-content-1 dungeon-detail-scroll select-prize">\n', dungeonModel.hasCaptures() ? __p += '\n    <ul class="mod-tab-content-modal tab-type2" data-app-tab-small>\n        <li data-ui-group="tab" data-mbgaui-anchors="{ preventDefault: true }" data-app-sound="choose" class="is-current"><span class="inner">Rewards</span></li>\n        <li data-ui-group="tab" data-mbgaui-anchors="{ preventDefault: true }" data-app-sound="choose"><span class="inner">BOSS</span></li>\n    </ul>\n    <div class="mod-paper-container">\n' : __p += '\n    <div class="mod-paper-container only-content-adjust">\n        <h1 class="hdr-content-sub"><span class="inner">Rewards</span></h1>\n', __p += '\n        <div class="mod-freescroll-wrap mod-basic" data-ui-freescroll="detail">\n            <div class="freescroll-mask">\n                <div data-ui-freescroll-content>\n                    <div data-ui-group="pane" class="is-current">\n                        <section>\n                            <h1 class="hdr-content-sub02 mb-b">\n                                Bonus Drops\n                            </h1>\n\n                            <p class="mb-b">\n                                <img class="img-title" src="' + __e(pUrl("/dff/static/img/event/select_prize_" + d + "/img_defeat_sabojabo_0" + j + ".png")) + '" width="272" height="190">\n                            </p>\n                        </section>\n                        ';
                var k = FF.CONST.SERVER.DUNGEON.PRIZE_TYPE_OF;
                __p += "\n                        ", _.each(dungeonModel.getSortedDungeonPrizes(), function(e) {
                    __p += "\n                            ";
                    var t = e.type;
                    __p += "\n                            ";
                    var n = e.items;
                    __p += '\n                            <section>\n                                <h1 class="hdr-content-sub02 mb-b">\n                                    ', t == k.FIRST_CLEAR && (__p += "First Time Reward"), __p += "\n                                    ", t == k.CLEAR && (__p += "Completion Reward"), __p += "\n                                    ", t == k.FIRST_MASTER && (__p += "Mastery Reward"), __p += "\n                                </h1>\n                                <ul>\n                                    ";
                    var r = dungeonModel.isAcquisitionByPrizeType(t);
                    __p += "\n                                    ", _.each(n, function(e) {
                        __p += '\n                                        <li class="box-c mb-b">\n                                            <div class="mr-b', r && (__p += " mod-is-acquisition"), __p += '">\n                                                <img src="' + __e(pUrl(e.image_path)) + '" width="35" height="35">\n                                            </div>\n                                            <p>\n                                                ' + __e(e.name) + "&times;" + __e(e.num) + "<br>\n                                            </p>\n                                        </li>\n                                    "
                    }), __p += "\n                                </ul>\n                            </section>\n                        "
                }), __p += "\n                    </div>\n                    ", dungeonModel.hasCaptures() && (__p += '\n                        <div data-ui-group="pane">\n                        ', _.each(dungeonModel.getCaptures(), function(e) {
                    __p += "\n                            ";
                    var t = e.tip_battle;
                    __p += "\n                            ";
                    var n = e.sp_scores;
                    __p += '\n                            <section class="mb-b2 mod-text-style">\n                                <h1 class="hdr-content-sub04 mb-b2">' + __e(t.title) + '</h1>\n                                <div class="ta-c mb-b2">\n                                    <img src="' + __e(pUrl(e.image_path)) + '" width="250" height="auto">\n                                </div>\n                                <p class="mb-b3 pl-b pr-b">' + ((b = util.nl2br(t.message)) == null ? "" : b) + "</p>\n                                ", n && n.length > 0 && (__p += '\n                                    <div class="bg-detail-point box-cc po-r ml-a mr-a">\n                                        <h1 class="img-text-special-score img-rep">special score</h1>\n                                        <div>\n                                            ', _.each(n, function(e) {
                        __p += '\n                                                <p class="fc-em-light">' + __e(e.title) + "</p>\n                                            "
                    }), __p += "\n                                        </div>\n                                    </div>\n                                "), __p += "\n                            </section>\n                        "
                }), __p += "\n                        </div>\n                    "), __p += '\n                </div>\n            </div>\n            <div class="scrollbar" data-ui-scrollbar="detail"><div class="inner" data-ui-scrollbar-face></div></div>\n        </div>\n    </div>\n</div>\n<div class="layer-content-11 dungeon-detail select-prize">\n    <h1 class="hdr-content">\n        <div class="inner">\n            <span class="title-name">' + __e(worldModel.get("name")) + '</span>\n            <!--  -->\n            <!-- /*ifdef wwlcd*/ -->\n            <div class="period mod-bg-alpha">\n                <span class="tl-time mr-b">PST</span>' + __e(timeKeeper.setUnixTime(worldModel.get("kept_out_at")).getPSTString()) + '\n                <span class="tl-time mr-b ml-b">UTC</span>' + __e(timeKeeper.setUnixTime(worldModel.get("kept_out_at")).getString()) + '\n            </div>\n            <!-- /*endif*/ -->\n        </div>\n    </h1>\n    <div class="dungeon-detail-plate">\n        <ul class="rank-badge add-rank-badge' + __e(dungeonModel.get("rank")) + " ", dungeonModel.get("is_master") ? __p += "add-master" : dungeonModel.get("is_clear") && (__p += "add-clear"), __p += '">\n            <!-- rank badge container -->\n            <li></li>\n            <li></li>\n            <li></li>\n        </ul>\n    </div>\n    <div id=\'dungeon-detail-back\' class="btn-back" data-app-btn-back data-mbgaui-anchors data-app-sound="choose"></div>\n\n    <div class="btn-container position-type01">\n        <div class="bg-total-stamina box-cc">\n            <div class="box-cc">\n                <div class="img-text-total-stamina img-rep">Total Stamina Cost</div>\n                <div class="ta-c fc-em-light fs-s">' + __e(dungeonModel.get("total_stamina")) + '</div>\n            </div>\n        </div>\n        <a class="btn-main ml-a mr-a" data-mbgaui-anchors data-app-sound="decide" data-app-btn-go><span class="inner">GO!</span></a>\n    </div>\n</div>'
            }
            return __p
        }
    }), define("templates_event/select_prize/dungeon_list/ModalUnlockConfirm", [], function() {
        return function(a) {
            function print() {
                __p += __j.call(arguments, "")
            }
            a || (a = {});
            var b, __p = "",
                __e = _.escape,
                __j = Array.prototype.join;
            with(a) __p += '<div class="modal-window">\n    <div class="modal-window-inner select-prize">\n        <div class="hdr-content">\n            <span class="inner">Unlock Forbidden Rewards</span>\n        </div>\n        <div class="exchange-conf description-inner">\n            <div class="pattern-modern-alpha mb-b2">\n                <p class="text-adjust fs-xs ml-b4 -mb-b">\n                    After unlocking a Forbidden Reward, it can be obtained<br>\n<span class="fc-warning">once</span> by <span class="fc-warning">completing</span> the dungeon.\n                </p>\n                <div class="mod-item-detail box special-prize-list">\n                    <ul>\n                        ', _.each(eventDungeonPrizeModel.get("item_package").items, function(e) {
                __p += '\n                            <li class="prize-list-item mb-b">\n                                <div class="prize-list-item-img">\n                                    <img src="' + __e(pUrl(e.image_path)) + '" width="35" height="35">\n                                </div>\n                                <div class="prize-list-item-txt">\n                                    ' + __e(e.name) + "<br>\n                                    &times;" + __e(e.num) + "<br>\n                                </div>\n                            </li>\n                        "
            }), __p += '\n                    </ul>\n                    <div class="badge-unreleased img-rep">Locked</div>\n                </div>\n            </div>\n            <div class="box-cc">\n                <div class="mr-b"><img src="' + __e(pUrl("/dff/static/img/event/select_prize/icon_key_item.png")) + '" width="32" height="32"></div>\n                <p class="prize-list-item-txt fs-xs">\n                    Use 1 Tablet to unlock these rewards?\n                </p>\n            </div>\n            <p class="fs-xs ta-c mb-b2">\n                <span class="fc-warning">\n                    It takes 1 Tablet to unlock a reward.<br>\n                    You must still complete the dungeon to obtain the reward.<br>\n                </span>\n            </p>\n        </div>\n        <div class="modal-btn-container">\n            <div class="btn-container position-type02">\n                <a class="btn-sub p-l" data-mbgaui-anchors data-app-modal-close data-app-sound="choose"><span class="inner">Cancel</span></a>\n                <a class="btn-main p-r" data-mbgaui-anchors data-app-modal-unlock data-app-sound="decide"><span class="inner">Unlock</span></a>\n            </div>\n        </div>\n    </div>\n</div>\n';
            return __p
        }
    }), define("event/select_prize/app/dungeon_list/views/ModalUnlockConfirm", ["underscore", "jquery", "backbone", "lib/ModalBase", "templates_event/select_prize/dungeon_list/ModalUnlockConfirm"], function(e, t, n, r, i) {
        return r.extend({
            el: "[data-app-modal]",
            events: {
                "anchorsbeforejump [data-app-modal-close]": "onClickModalClose",
                "anchorsbeforejump [data-app-modal-unlock]": "onClickModalUnlock"
            },
            render: function(e) {
                this.putContent(i({
                    eventDungeonPrizeModel: e
                }))
            },
            onClickModalUnlock: function() {
                this.end(!0), this.trigger("onClickToUnlock")
            },
            onClickModalClose: function() {
                this.end()
            }
        })
    }), define("templates_event/select_prize/dungeon_list/ModalUnlockResult", [], function() {
        return function(a) {
            function print() {
                __p += __j.call(arguments, "")
            }
            a || (a = {});
            var b, __p = "",
                __e = _.escape,
                __j = Array.prototype.join;
            with(a) __p += '<div class="modal-window">\n    <div class="modal-window-inner select-prize">\n        <div class="hdr-content">\n            <span class="inner">Rewards Unlocked</span>\n        </div>\n        <div class="exchange-conf description-inner">\n            <div class="pattern-modern-alpha mb-b2">\n                <p class="text-adjust fs-xs ml-b4 -mb-b">\n                    Available Forbidden Rewards\n                </p>\n                <div class="mod-item-detail box special-prize-list">\n                    <ul>\n                        ', _.each(eventDungeonPrizeModel.get("item_package").items, function(e) {
                __p += '\n                            <li class="prize-list-item mb-b">\n                                <div class="prize-list-item-img">\n                                    <img src="' + __e(pUrl(e.image_path)) + '" width="35" height="35">\n                                </div>\n                                <div class="prize-list-item-txt">\n                                    ' + __e(e.name) + "<br>\n                                    &times;" + __e(e.num) + "<br>\n                                </div>\n                            </li>\n                        "
            }), __p += '\n                    </ul>\n                </div>\n            </div>\n            <div class="box-cc">\n                <div class="mr-b"><img src="' + __e(pUrl("/dff/static/img/event/select_prize/icon_key_item.png")) + '" width="32" height="32"></div>\n                <p class="text-adjust fs-xs">\n                    Rewards unlocked with 1 Tablet.\n                </p>\n            </div>\n            <div class="ta-c">\n                <p class="fs-xs ta-c mb-b2">\n                    <span class="fc-warning">\n                        Unlocked rewards can only be obtained once.\n                    </span>\n                </p>\n            </div>\n        </div>\n        <div class="modal-btn-container">\n            <div class="btn-container position-type02">\n                <a class="btn-main ml-a mr-a" data-mbgaui-anchors data-app-modal-close data-app-sound="choose"><span class="inner">OK</span></a>\n            </div>\n        </div>\n    </div>\n</div>\n';
            return __p
        }
    }), define("event/select_prize/app/dungeon_list/views/ModalUnlockResult", ["underscore", "jquery", "backbone", "lib/ModalBase", "templates_event/select_prize/dungeon_list/ModalUnlockResult"], function(e, t, n, r, i) {
        return r.extend({
            el: "[data-app-modal]",
            events: {
                "anchorsbeforejump [data-app-modal-close]": "onClickModalClose"
            },
            render: function(e) {
                this.putContent(i({
                    eventDungeonPrizeModel: e
                }))
            },
            onClickModalClose: function() {
                this.end()
            }
        })
    }), define("event/select_prize/app/Api", ["jquery", "underscore", "scenes/common/util/Api"], function(e, t, n) {
        return t.extend({}, n, {
            unlockEventItemDeferred: function(e, t) {
                return this.requestDeferred(sprintf("/dff/event/select_prize/%s/unlock_item", e), {
                    dungeon_id: t
                }, {
                    type: "POST"
                })
            },
            setEventCongratulatedAtDeferred: function(e, t) {
                return this.requestDeferred(sprintf("/dff/event/select_prize/%s/set_congratulated_at", e), {
                    dungeon_id: t
                }, {
                    type: "POST"
                })
            }
        })
    }), define("event/select_prize/app/dungeon_list/views/DungeonDetail", ["underscore", "jquery", "backbone", "sprintf", "templates_event/select_prize/dungeon_list/DungeonDetail", "./ModalUnlockConfirm", "./ModalUnlockResult", "scenes/dungeon_list/views/DungeonDetail", "event/select_prize/app/Api"], function(e, t, n, r, i, s, o, u, a) {
        return u.extend({
            tmpl: i,
            events: e.extend({}, u.prototype.events, {
                "anchorsbeforejump [data-app-btn-select-prize-unlock-item]": "onClickConfirmUnlockItem"
            }),
            initialize: function(e) {
                u.prototype.initialize.call(this, e), this.eventModel = this.worldModel.getEventModel(), this.eventData = FF.datastore.getEventData(this.eventModel.get("id")), this.eventDungeonPrizeModel = this.eventData.dungeonPrizeCollection.findWhere({
                    dungeon_id: this.dungeonModel.get("id")
                })
            },
            onClickConfirmUnlockItem: function() {
                var e = new s;
                FF.router.overlay.registerChildren(e), e.render(this.eventDungeonPrizeModel), e.open(), this.listenToOnce(e, "onClickToUnlock", this.onClickToUnlock)
            },
            onClickToUnlock: function() {
                var e = this,
                    n = this.dungeonModel.get("id"),
                    r = this.eventModel.get("id");
                FF.router.loading.lock(), a.unlockEventItemDeferred(r, n).then(function(i) {
                    e.eventData.userSelectedPrizeCollection.add(i.user_selected_prize, {
                        merge: !0
                    });
                    var s = new o({});
                    FF.router.overlay.registerChildren(s), s.render(e.eventData.dungeonPrizeCollection.findWhere({
                        dungeon_id: n
                    })), s.open(), FF.router.loading.hide(!0);
                    var u = FF.Events.select_prize.app.helper,
                        a = u.getRemainingUnlockItemNum(r);
                    t("[data-app-remaining-unlock-item-num]").text(a), t("[data-app-btn-unlock]").addClass("is-disable"), t("[data-app-wrap-special-prize]").removeClass("locked").find(".badge-locked").removeClass("badge-locked").addClass("badge-unlocked")
                })
            }
        })
    }), define("templates_event/select_prize/dungeon_list/ModalCongratulation", [], function() {
        return function(a) {
            function print() {
                __p += __j.call(arguments, "")
            }
            a || (a = {});
            var b, __p = "",
                __e = _.escape,
                __j = Array.prototype.join;
            with(a) __p += '<div class="po-r">\n    <div class="modal-window">\n        <div class="modal-window-inner">\n            <div class="hdr-content"><span class="inner">Forbidden Reward!</span></div>\n\n            <div class="mod-item-detail box pattern-modern-alpha mb-b2">\n                <ul>\n                    ', _.each(eventDungeonPrizeModel.get("item_package").items, function(e) {
                __p += '\n                        <li class="box-c">\n                            <div class="mr-b">\n                                <img src="' + __e(pUrl(e.image_path)) + '" width="35" height="35">\n                            </div>\n                            <p>\n                                ' + __e(e.name) + "&times;" + __e(e.num) + "<br>\n                            </p>\n                        </li>\n                    "
            }), __p += '\n                </ul>\n            </div>\n\n            <div>\n                <p class="ta-c fs-s">Forbidden Rewards sent to Item Chest!</p>\n                <p class="ta-c fs-xs fc-warning">*You have 30 days to collect the rewards.</p>\n            </div>\n\n            <div class="modal-btn-container pt-b2">\n                <div class="btn-container position-type02">\n                    <a class="btn-sub p-l" data-mbgaui-anchors data-app-sound="choose" data-app-modal-close><span class="inner">Close</span></a>\n                    <a class="btn-main p-r" data-mbgaui-anchors data-app-sound="choose" data-app-present-box><span class="inner">Item Chest</span></a>\n                </div>\n            </div>\n\n        </div>\n    </div>\n</div>\n';
            return __p
        }
    }), define("event/select_prize/app/dungeon_list/views/ModalCongratulation", ["lib/ModalBase", "templates_event/select_prize/dungeon_list/ModalCongratulation"], function(e, t) {
        return e.extend({
            el: "[data-app-modal]",
            events: {
                "anchorsbeforejump [data-app-modal-close]": "onClickClose",
                "anchorsbeforejump [data-app-present-box]": "onClickPresentBox"
            },
            render: function(e) {
                var n = t(e);
                this.putContent(n)
            },
            onClickClose: function() {
                this.end(!0), this.trigger("CongratulationModalClose")
            },
            onClickPresentBox: function() {
                this.end(!0), this.trigger("GoToPresentBox")
            }
        })
    }), define("event/select_prize/app/dungeon_list/views/Layout", ["underscore", "jquery", "backbone", "sprintf", "templates_event/select_prize/dungeon_list/DungeonList", "./DungeonDetail", "./ModalCongratulation", "scenes/dungeon_list/views/Layout", "event/select_prize/app/Api"], function(e, t, n, r, i, s, o, u, a) {
        return u.extend({
            tmpl: i,
            DungeonDetailViewClass: s,
            events: e.extend({}, u.prototype.events, {
                "anchorsbeforejump [data-app-btn-intro]": "onClickIntro",
                "anchorsbeforejump [data-app-btn-select-prize-prizes]": "onClickPrize"
            }),
            render: function() {
                var e = this.worldModel.getEventId(),
                    t = FF.datastore.getEventData(e),
                    n = t.dungeonGroupTabCollection.getCurrentTab(),
                    r = FF.Events.select_prize.app.helper.getRemainingUnlockItemNum(e),
                    i = t.unlockItemCollection.getWaitSecToGetNextUnlockItem();
                u.prototype.render.call(this, {
                    currentTabModel: n,
                    remainingUnlockItemNum: r,
                    waitSecToGetNextUnlockItem: i,
                    eventId: e
                })
            },
            updateBackground: function() {
                var e = this.worldModel.getEventModel();
                this.setBackgroundImage(e.getBackgroundImagePath())
            },
            onClickIntro: function() {
                var e = this.worldModel.getEventModel();
                n.history.navigate(e.getIntroFragment(), {
                    trigger: !0
                })
            },
            onClickPrize: function(e) {
                var t = r("#event/select_prize/%s/prizes", this.worldModel.getEventId());
                n.history.navigate(t, {
                    trigger: !0
                })
            },
            processAfterContentLoad: function() {
                u.prototype.processAfterContentLoad.call(this), this.openEventCongratulationModalIfNeed()
            },
            openEventCongratulationModalIfNeed: function() {
                var e = this,
                    t = this.worldModel.getEventId(),
                    r = FF.datastore.getEventData(t),
                    i = r.userSelectedPrizeCollection.getModelsToOpenCongratulationModal();
                if (i.length === 0) return;
                var s = i.shift(),
                    u = r.dungeonPrizeCollection.findWhere({
                        dungeon_id: s.get("dungeon_id")
                    }),
                    f = new o;
                f.render({
                    eventDungeonPrizeModel: u
                }), FF.router.overlay.registerChildren(f), f.open(), this.listenToOnce(f, "CongratulationModalClose", function() {
                    a.setEventCongratulatedAtDeferred(t, s.get("dungeon_id")).then(function(t) {
                        r.userSelectedPrizeCollection.add(t.user_selected_prize, {
                            merge: !0
                        }), FF.router.loading.hide(), e.openEventCongratulationModalIfNeed()
                    })
                }), this.listenToOnce(f, "GoToPresentBox", function() {
                    a.setEventCongratulatedAtDeferred(t, s.get("dungeon_id")).then(function(e) {
                        r.userSelectedPrizeCollection.add(e.user_selected_prize, {
                            merge: !0
                        }), FF.router.loading.hide(), f.end(), n.history.navigate("#gift_box", {
                            trigger: !0
                        })
                    })
                })
            }
        })
    }), define("event/select_prize/app/dungeon_list/DungeonListScene", ["underscore", "jquery", "backbone", "./views/Layout", "scenes/dungeon_list/DungeonListScene", "scenes/common/models/World", "scenes/common/collections/Dungeon", "scenes/common/helper/Relation"], function(e, t, n, r, i, s, o, u) {
        return i.extend({
            start: function(e, t) {
                var n = this,
                    i = FF.datastore.worldCollection.getByEventId(e),
                    s = i.getEventModel(),
                    a = s.getHelper();
                a.setupEventDeferred(e).then(u.showModalIfNeedDeferred.bind(u)).then(n.setupDeferred.bind(n, i.get("id"))).done(function() {
                    var s = a.grepCurrentDungeonModels(e);
                    n.worldModel = i, n.dungeonCollection = new o(s), n.layoutView = new r({
                        worldModel: n.worldModel,
                        dungeonCollection: n.dungeonCollection,
                        type: +t
                    }), n.layoutView.render(), FF.SoundMgr.playMusic(n.worldModel.get("bgm"))
                })
            }
        })
    }), define("event/select_prize/app/battle_list/views/Layout", ["scenes/battle_list/views/Layout"], function(e) {
        return e.extend({
            updateBackgroundImage: function() {
                var t = this.worldModel.getEventModel();
                if (t.isBattleListBgTypeEachBattle()) e.prototype.updateBackgroundImage.call(this);
                else {
                    var n = t.getBackgroundImagePath();
                    this.setBackgroundImage(n)
                }
            },
            onClickOperations: function() {
                FF.router.loading.lock();
                var e = sprintf("#event/select_prize/%s/battle_operations", this.worldModel.getEventId());
                Backbone.history.navigate(e, {
                    trigger: !0
                })
            }
        })
    }), define("event/select_prize/app/battle_list/BattleListScene", ["underscore", "jquery", "backbone", "scenes/battle_list/Api", "scenes/battle_list/BattleListScene", "./views/Layout"], function(e, t, n, r, i, s) {
        return i.extend({
            renderLayoutView: function() {
                this.layoutView = new s, this.layoutView.render()
            }
        })
    }), define("templates_event/select_prize/prize_list/PrizeList", [], function() {
        return function(a) {
            function print() {
                __p += __j.call(arguments, "")
            }
            a || (a = {});
            var b, __p = "",
                __e = _.escape,
                __j = Array.prototype.join;
            with(a) {
                __p += '<div class="layer-bg w-full h-full" data-app-layer-bg></div>\n<div class="layer-content-1 bg-modern-alpha prize-tab-list-scroll select-prize">\n    <div class="pattern-modern-alpha" data-app-dungeon-header>\n        <div data-app-dungeon-label class="icon-layout-adjust"></div>\n        <h1 data-app-dungeon-name></h1>\n        <div class="text-closed fc-warning fs-xs">Dungeon expired.</div>\n        <span class="period mod-bg-alpha fs-xs" data-app-dungeon-term></span>\n    </div>\n    <div class="freescroll-mask">\n        <div class="mod-freescroll-wrap mod-basic" data-ui-freescroll>\n            <div class="mod-paper-container" data-ui-freescroll-content data-app-detail>\n            </div>\n\n            <div class="scrollbar" data-ui-scrollbar><div class="inner" data-ui-scrollbar-face></div></div>\n        </div>\n    </div>\n</div>\n\n<div class="layer-content-11 prize-tab-list">\n    <h1 class="hdr-content">\n        <span class="inner">\n            Event Rewards\n        </span>\n    </h1>\n\n    <ul class="mod-tab-content-alpha tab-type4">\n        ';
                var c = +dungeonGroupTabCollection.getCurrentTab().get("release_no");
                __p += "\n        ", dungeonGroupTabCollection.each(function(e) {
                    __p += "\n            ";
                    var t = +e.get("release_no");
                    __p += "\n            ";
                    var n = c === t;
                    __p += '\n            <li data-mbgaui-anchors="{ preventDefault: true }" data-app-sound="choose" data-app-release-no="' + __e(t) + '" data-app-tab ', n && (__p += 'class="is-current"'), __p += '>\n                <div class="inner"><img class="img-title" src="' + __e(pUrl("/dff/static/img/event/select_prize/icon_prize" + t + ".png")) + '" width="50" height="40"></div>\n            </li>\n        '
                }), __p += '\n    </ul>\n\n    <a class="btn-back" data-app-btn-back data-mbgaui-anchors data-app-sound="choose"></a>\n</div>\n'
            }
            return __p
        }
    }), define("templates_event/select_prize/prize_list/view/PrizeDetail", [], function() {
        return function(a) {
            function print() {
                __p += __j.call(arguments, "")
            }
            a || (a = {});
            var b, __p = "",
                __e = _.escape,
                __j = Array.prototype.join;
            with(a) __p += '<section>\n    <h1 class="hdr-content-sub02 mb-b">\n        Bonus Drops\n    </h1>\n    <p class="mb-b">\n        <img class="img-title" src="' + __e(pUrl("/dff/static/img/event/select_prize_" + eventId + "/img_defeat_sabojabo_0" + releaseNo + ".png")) + '" width="272" height="190">\n    </p>\n</section>\n\n', _.each(dungeonIds, function(e) {
                __p += "\n    ";
                var t = eventData.dungeonCollection.get(e);
                __p += '\n\n    <section class="layout-challenge-prize-list">\n        <h1 class="hdr-content-sub fs-add">\n            <span class="inner">' + __e(t.get("name")) + "</span>\n        </h1>\n\n        ";
                var n = prizeMap[e];
                __p += "\n        ";
                if (n) {
                    __p += "\n            ";
                    var r = eventData.userSelectedPrizeCollection.get(n.get("dungeon_id"));
                    __p += "\n            ";
                    var i = r && r.isAlreadyGot();
                    __p += '\n            <h1 class="hdr-content-sub02 mb-b">\n                Forbidden Rewards\n            </h1>\n            <ul>\n                ', _.each(n.get("item_package").items, function(e) {
                        __p += '\n                <li class="box-c mb-b">\n                    <div class="mr-b', i && (__p += " mod-is-acquisition"), __p += '">\n                        <img src="' + __e(pUrl(e.image_path)) + '" width="35" height="35">\n                    </div>\n                    <p>\n                        ' + __e(e.name) + "&times;" + __e(e.num) + "<br>\n                    </p>\n                </li>\n                "
                    }), __p += "\n            </ul>\n\n        "
                }
                __p += "\n\n        ";
                var s = FF.CONST.SERVER.DUNGEON.PRIZE_TYPE_OF;
                __p += "\n        ", _.each(t.getSortedDungeonPrizes(), function(e) {
                    __p += "\n            ";
                    var n = e.type;
                    __p += "\n            ";
                    var r = e.items;
                    __p += '\n        <h1 class="hdr-content-sub02 mb-b">\n            ', n == s.FIRST_CLEAR && (__p += "First Time Reward"), __p += "\n            ", n == s.CLEAR && (__p += "Completion Reward"), __p += "\n            ", n == s.FIRST_MASTER && (__p += "Mastery Reward"), __p += "\n        </h1>\n        <ul>\n            ";
                    var i = t.isAcquisitionByPrizeType(n);
                    __p += "\n            ", _.each(r, function(e) {
                        __p += '\n            <li class="box-c mb-b">\n                <div class="mr-b', i && (__p += " mod-is-acquisition"), __p += '">\n                    <img src="' + __e(pUrl(e.image_path)) + '" width="35" height="35">\n                </div>\n                <p>\n                    ' + __e(e.name) + "&times;" + __e(e.num) + "<br>\n                </p>\n            </li>\n            "
                    }), __p += "\n        "
                }), __p += "\n        </ul>\n    </section>\n"
            }), __p += "\n";
            return __p
        }
    }), define("event/select_prize/app/prize_list/views/Layout", ["underscore", "jquery", "backbone", "templates_event/select_prize/prize_list/PrizeList", "templates_event/select_prize/prize_list/view/PrizeDetail", "lib/LayoutBase", "components/FreeScroll", "components/Scrollbar"], function(e, t, n, r, i, s, o, u) {
        var a = {
            CURRENT_CLASS_NAME: "is-current"
        };
        return s.extend({
            events: {
                "anchorsbeforejump [data-app-tab]": "onClickTab"
            },
            initialize: function(e) {
                this.eventId = e.eventId, this.worldModel = e.worldModel, this.dungeonGroupTabCollection = FF.datastore.getEventData(this.eventId).dungeonGroupTabCollection, this.currentReleaseNo = this.dungeonGroupTabCollection.getCurrentTab().get("release_no"), s.prototype.initialize.call(this)
            },
            render: function() {
                s.prototype.render.call(this, r, {
                    dungeonGroupTabCollection: this.dungeonGroupTabCollection,
                    eventId: this.eventId
                }), this.cacheElements(), this.renderDetail(), this.setupComponents(), this.updateBackground(), this.processAfterRender()
            },
            updateBackground: function() {
                var e = this.worldModel.getEventModel();
                this.setBackgroundImage(e.get("background_image_path"))
            },
            setupComponents: function() {
                this.freescroll = new o({
                    el: t("[data-ui-freescroll]")
                }), this.scrollbar = new u({
                    el: t("[data-ui-scrollbar]"),
                    watch: this.freescroll,
                    faceHeight: 31,
                    disableOverscroll: !0
                })
            },
            onClickBack: function() {
                var e = this.worldModel.getDungeonListFragment();
                n.history.navigate(e, {
                    trigger: !0
                })
            },
            cacheElements: function() {
                this.detailElm = t("[data-app-detail]"), this.tabLiElms = t("[data-app-tab]"), this.dungeonName = t("[data-app-dungeon-name]"), this.dungeonTerm = t("[data-app-dungeon-term]"), this.dungeonHeader = t("[data-app-dungeon-header]")
            },
            renderDetail: function(t) {
                var n = FF.datastore.getEventData(this.eventId),
                    r = n.dungeonGroupTabCollection.findWhere({
                        release_no: +this.currentReleaseNo
                    }),
                    s = r.get("dungeon_ids"),
                    o = n.dungeonPrizeCollection.getModelsByDungeonIds(s);
                s.sort(function(e, t) {
                    return e < t ? -1 : e > t ? 1 : 0
                }), this.dungeonName.text(r.get("name"));
                var u = r.getOpenedToClosedTermText();
                u = u.replace("PST", '<span class="tl-time mr-b">PST</span>').replace("UTC", '<span class="tl-time mr-b ml-b">UTC</span>'), this.dungeonTerm.html(u);
                var a = r.isClosed() ? "addClass" : "removeClass";
                this.dungeonHeader[a]("is-closed"), this.detailElm.html(i({
                    eventData: n,
                    eventId: this.eventId,
                    dungeonIds: s,
                    prizeMap: e.indexBy(o, "dungeon_id"),
                    releaseNo: this.currentReleaseNo
                }))
            },
            onClickTab: function(e) {
                FF.router.loading.lock(), this.currentReleaseNo = t(e.target).attr("data-app-release-no"), this.tabLiElms.removeClass(a.CURRENT_CLASS_NAME).filter('[data-app-release-no="' + this.currentReleaseNo + '"]').addClass(a.CURRENT_CLASS_NAME), this.renderDetail(), this.scrollbar.updateContentWithScrollReset(), this.freescroll.reset(), FF.router.loading.unlock()
            },
            dispose: function() {
                this.resetBackgroundImage(), this.freescroll && this.freescroll.dispose(), this.scrollbar && this.scrollbar.dispose(), s.prototype.dispose.call(this)
            }
        })
    }), define("event/select_prize/app/prize_list/PrizeListScene", ["underscore", "jquery", "backbone", "scenes/common/util/Api", "lib/Scene", "./views/Layout", "scenes/common/collections/Dungeon"], function(e, t, n, r, i, s, o) {
        return i.extend({
            start: function(e) {
                var t = FF.datastore.getEventData(e),
                    n = FF.datastore.worldCollection.getByEventId(e),
                    r = t.dungeonCollection.where({
                        world_id: n.get("id")
                    });
                if (r.length <= 0) throw new Error("dungeon data is not fetched");
                this.layoutView = new s({
                    eventId: e,
                    worldModel: n
                }), this.layoutView.render(), FF.SoundMgr.playMusic(n.get("bgm"))
            }
        })
    }), define("event/select_prize/app/battle_operations/views/Layout", ["scenes/battle_operations/views/Layout"], function(e) {
        return e.extend({
            updateBackgroundImage: function() {
                var t = this.worldModel.getEventModel();
                if (t.isBattleListBgTypeEachBattle()) e.prototype.updateBackgroundImage.call(this);
                else {
                    var n = t.getBackgroundImagePath();
                    this.setBackgroundImage(n)
                }
            }
        })
    }), define("event/select_prize/app/battle_operations/BattleOperationsScene", ["underscore", "jquery", "backbone", "scenes/battle_list/Api", "scenes/battle_operations/BattleOperationsScene", "./views/Layout"], function(e, t, n, r, i, s) {
        return i.extend({
            renderLayoutView: function(e) {
                this.layoutView = new s({}), this.layoutView.render(e)
            }
        })
    }),
    function() {
        var e = FF.onload;
        FF.onload = function() {
            require(["backbone", "event/select_prize/app/Helper", "event/select_prize/app/dungeon_list/DungeonListScene", "event/select_prize/app/battle_list/BattleListScene", "event/select_prize/app/prize_list/PrizeListScene", "event/select_prize/app/battle_operations/BattleOperationsScene"], function(t, n, r, i, s, o) {
                var u = t.Router.extend({
                    routes: {
                        "event/select_prize/:event_id/dungeons(/:type)": "createEventDungeonListScene",
                        "event/select_prize/:event_id/battles/:dungeon_id": "createEventBattleListScene",
                        "event/select_prize/:event_id/prizes": "createEventPrizeListScene",
                        "event/select_prize/:event_id/battle_operations": "createBattleOperationsScene"
                    },
                    createEventDungeonListScene: function(e, t) {
                        return FF.router.changeScene(r, [e, t])
                    },
                    createEventBattleListScene: function(e, t) {
                        return FF.router.changeScene(i, [e, t])
                    },
                    createEventPrizeListScene: function(e) {
                        return FF.router.changeScene(s, [e])
                    },
                    createBattleOperationsScene: function(e) {
                        return FF.router.changeScene(o, [e])
                    }
                });
                FF.Events.select_prize = FF.Events.select_prize || {}, FF.Events.select_prize.app = {
                    router: new u,
                    helper: new n
                }, e()
            })
        }
    }(), define("event/select_prize/app", function() {});