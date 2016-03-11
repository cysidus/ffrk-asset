define("templates_event/select_prize", function() {}), define("templates_event/select_prize/prize_list/PrizeList", [], function() {
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
});