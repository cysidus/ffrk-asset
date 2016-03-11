define("templates_event/challenge", function() {}), define("templates_event/challenge/dungeon/LinkList", [], function() {
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
}), define("templates_event/challenge/dungeon/ListFes3", [], function() {
    return function(a) {
        function print() {
            __p += __j.call(arguments, "")
        }
        a || (a = {});
        var b, __p = "",
            __e = _.escape,
            __j = Array.prototype.join;
        with(a) {
            __p += "\n";
            var c = FF.datastore.eventCollection.get(eventId),
                seriesFormalName = "FINAL FANTASY ";
            seriesId === 104001 ? seriesFormalName += "IV" : seriesId === 107001 ? seriesFormalName += "VII" : seriesId === 108001 ? seriesFormalName += "VIII" : seriesId === 110001 ? seriesFormalName += "X" : seriesFormalName = undefined, __p += '\n\n<div class="c-layer-bg w-full h-full" data-app-layer-bg></div>\n<div class="c-layer-content-1 scene-challenge-dungeon-list">\n    <div class="c-freescroll-wrap">\n        <div class="c-freescroll" data-ui-freescroll data-app-dungeon-list-scroll>\n            <div data-ui-freescroll-content>\n                ', seriesFormalName && (__p += '\n                    <div class="c-ttl-category-series mlr-a mb-b2">\n                        <span class="c-ttl-category-series__inner"><div class="p-text-ff img-rep">' + __e(seriesFormalName) + '</div><div class="p-icon-' + __e(seriesId) + ' c-series-icon-s"></div></span>\n                    </div>\n                '), __p += '\n                <ul class="mb-b2">\n                    ', _.each(dungeonModels, function(e) {
                __p += "\n                        ";
                if (e.get("series_id") !== seriesId) return;
                __p += "\n                        ";
                var t = +e.get("id");
                __p += "\n                        ";
                var n = e.get("is_unlocked");
                __p += '\n                        <li class="mb-b2">\n                            <div class="c-btn is-thick-long-locked mlr-a mb-b', e.get("is_unlocked") && (__p += " is-unlocked", e.get("button_style") === "EXTRA" ? __p += " is-extra" : e.get("button_style") === "DOOM" && (__p += " is-doom")), __p += '" data-dungeon-id="' + __e(t) + '" data-mbgaui-anchors data-app-sound="choose" data-app-flag-unlock>\n                                <div class="c-btn__inner">\n                                    <div class="mb-b">' + __e(n ? e.get("name") : "???") + '</div>\n                                    <div class="box-c">\n                                        <div class="c-text-mat">\n                                            <div class="c-text-mat__inner box-cb">\n                                                <dl class="c-label box-cb mr-b">\n                                                    <dt class="c-label__img"><div class="p-text-difficulty img-rep">難易度</div></dt>\n                                                    <dd class="c-label__text s-text-layout__num">' + __e(e.get("challenge_level")) + '</dd>\n                                                </dl>\n                                                <dl class="c-label box-cb">\n                                                    <dt class="c-label__img"><div class="p-text-total-stamina img-rep">総消費スタミナ</div></dt>\n                                                    <dd class="c-label__text s-text-layout__num">' + __e(e.get("total_stamina")) + "</dd>\n                                                </dl>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                                ", e.get("is_master") ? __p += '\n                                    <div class="p-text-master img-rep s-badge">Master</div>\n                                ' : e.get("is_clear") && (__p += '\n                                    <div class="p-text-clear img-rep s-badge">clear</div>\n                                '), __p += "\n                                <div>\n                                    ";
                var r = e.getDisplayAblePrizes();
                __p += "\n                                    ", _.each(r, function(e) {
                    __p += "\n                                        ";
                    var t = n ? "" : "_disable";
                    __p += '\n                                        <img src="' + __e(pUrl("/dff/static/img/event/challenge_" + eventId + "/icon_badge" + e.id + t + ".png")) + '" width="40" height="40" class="s-icon-badge">\n                                    '
                }), __p += "\n                                </div>\n                            </div>\n                         </li>\n                    "
            }), __p += '\n                </ul>\n            </div>\n        </div>\n    </div>\n    <div class="c-dungeon-list-nav">\n        <div class="c-btn is-nav-small s-btn-intro" data-mbgaui-anchors data-app-sound="choose" data-app-btn-intro>\n            <span class="c-btn__inner fs-b">Event Rules</span>\n        </div>\n        <a class="c-btn is-nav-small" data-app-btn-challenge-prizes data-app-dungeon-type="', isForce ? __p += __e(FF.CONST.SERVER.DUNGEON.TYPE_OF.FORCE) : __p += __e(FF.CONST.SERVER.DUNGEON.TYPE_OF.NORMAL), __p += '" data-mbgaui-anchors data-app-sound="choose"><div class="c-btn__inner fs-b ta-c">Completion<br>Rewards</div></a>\n    </div>\n</div>\n\n<div class="c-layer-content-11 scene-challenge-dungeon-list" data-app-dungeon-list>\n    <h1 class="c-ttl-scene">\n        <div class="c-ttl-scene__inner po-r">\n            <span class="c-ttl-scene__title fs-b">' + __e(worldModel.get("name")) + '</span>\n            <div class="c-ttl-scene__term c-text-mat"><div class="c-text-mat__inner">' + __e(worldModel.getOpenedToKeptOutTermText()) + '</div></div>\n        </div>\n    </h1>\n    <a class="c-btn-back" data-app-btn-back data-mbgaui-anchors data-app-sound="choose"></a>\n</div>\n'
        }
        return __p
    }
}), define("templates_event/challenge/dungeon_list/DungeonDetail", [], function() {
    return function(a) {
        function print() {
            __p += __j.call(arguments, "")
        }
        a || (a = {});
        var b, __p = "",
            __e = _.escape,
            __j = Array.prototype.join;
        with(a) {
            __p += '<div class="c-layer-content-1 dungeon-detail-scroll challenge">\n';
            var c = dungeonIdQuestMap[dungeonModel.get("id")];
            __p += "\n";
            var d = c && !c.isAchieved() && !c.isCompleted();
            __p += "\n\n", d && (__p += '\n    <div class="mod-eventquest-receive box-cc">\n        <img src="' + __e(pUrl("/dff/static/img/event/common/bg_eventquest_receive.png")) + '" width="286" height="55">\n        <p class="fs-l ta-c">\n            Event Quests Available!<br>\n            <span class="fc-warning fs-b">Accept Event Quests and earn rewards!</span>\n        </p>\n        <a class="layout-btn-quest" data-mbgaui-anchors data-app-sound="choose" data-app-event-quest>\n            <div class="icon-btn-eventquest img-rep">event quest</div>\n        </a>\n    </div>\n'), __p += "\n", dungeonModel.hasCaptures() ? __p += '\n    <ul class="mod-tab-content-modal tab-type2" data-app-tab-small>\n        <li data-ui-group="tab" data-mbgaui-anchors="{ preventDefault: true }" data-app-sound="choose" class="is-current"><span class="inner">Rewards</span></li>\n        <li data-ui-group="tab" data-mbgaui-anchors="{ preventDefault: true }" data-app-sound="choose"><span class="inner">BOSS</span></li>\n    </ul>\n    <div class="mod-paper-container">\n' : __p += '\n    <div class="mod-paper-container only-content-adjust">\n        <h1 class="hdr-content-sub"><span class="inner">Rewards</span></h1>\n', __p += '\n            <div class="mod-freescroll-wrap mod-basic ', d && (__p += "eventquest-receive"), __p += ' " data-ui-freescroll="detail">\n            <div class="freescroll-mask">\n                <div data-ui-freescroll-content>\n                    <div data-ui-group="pane" class="is-current">\n                        ';
            var f = FF.CONST.SERVER.DUNGEON.PRIZE_TYPE_OF;
            __p += "\n                        ", _.each(dungeonModel.getSortedDungeonPrizes(), function(e) {
                __p += "\n                            ";
                var t = e.type;
                __p += "\n                            ";
                var n = e.items;
                __p += '\n                            <section>\n                                <h1 class="c-ttl-section mb-b">\n                                    ', t == f.FIRST_CLEAR && (__p += "First Time Reward"), __p += "\n                                    ", t == f.CLEAR && (__p += "Completion Reward"), __p += "\n                                    ", t == f.FIRST_MASTER && (__p += "Mastery Reward"), __p += "\n                                </h1>\n                                <ul>\n                                    ";
                var r = dungeonModel.isAcquisitionByPrizeType(t);
                __p += "\n                                    ", _.each(n, function(e) {
                    __p += '\n                                    <li class="box-c mb-b">\n                                        <div class="mr-b', r && (__p += " c-acquisition"), __p += '">\n                                            <img src="' + __e(pUrl(e.image_path)) + '" width="35" height="35">\n                                        </div>\n                                        <p class ="s-ww-prize-name">\n                                            ' + __e(e.name), FF.env.isWWRegion ? __p += "&nbsp;x" : __p += "&times;", __p += __e(e.num) + "<br>\n                                        </p>\n                                    </li>\n                                    "
                }), __p += "\n                                </ul>\n                            </section>\n                        "
            }), __p += "\n                    </div>\n                    ", dungeonModel.hasCaptures() && (__p += '\n                        <div data-ui-group="pane">\n                        ', _.each(dungeonModel.getCaptures(), function(e) {
                __p += "\n                            ";
                var t = e.tip_battle;
                __p += "\n                            ";
                var n = e.sp_scores;
                __p += '\n                            <section class="mb-b2 mod-text-style">\n                                <h1 class="hdr-content-sub04 mb-b2">' + __e(t.title) + '</h1>\n                                <div class="ta-c mb-b2">\n                                    <img src="' + __e(pUrl(e.image_path)) + '" width="250" height="auto">\n                                </div>\n                                <p class="mb-b3 pl-b pr-b">' + ((b = util.nl2br(t.message)) == null ? "" : b) + "</p>\n                                ", n && n.length > 0 && (__p += '\n                                    <div class="bg-detail-point box-cc po-r ml-a mr-a">\n                                        <h1 class="img-text-special-score img-rep">special score</h1>\n                                        <div>\n                                            ', _.each(n, function(e) {
                    __p += '\n                                                <p class="fc-light">' + __e(e.title) + "</p>\n                                            "
                }), __p += "\n                                        </div>\n                                    </div>\n                                "), __p += "\n                            </section>\n                        "
            }), __p += "\n                        </div>\n                    "), __p += '\n                </div>\n            </div>\n            <div class="scrollbar" data-ui-scrollbar="detail"><div class="inner" data-ui-scrollbar-face></div></div>\n        </div>\n    </div>\n</div>\n<div class="c-layer-content-11 dungeon-detail challenge">\n    <h1 class="c-ttl-scene">\n        <div class="c-ttl-scene__inner">\n            <span>' + __e(worldModel.get("name")) + '</span>\n            <div class="c-text-mat"><div class="c-text-mat__inner">' + ((b = worldModel.getOpenedToKeptOutTermText()) == null ? "" : b) + '</div></div>\n        </div>\n    </h1>\n    <div class="dungeon-detail-plate">\n        <ul class="rank-badge add-rank-badge' + __e(dungeonModel.get("rank")) + " ", dungeonModel.get("is_master") ? __p += "add-master" : dungeonModel.get("is_clear") && (__p += "add-clear"), __p += '">\n            <!-- rank badge container -->\n            <li></li>\n            <li></li>\n            <li></li>\n        </ul>\n    </div>\n    <div id=\'dungeon-detail-back\' class="c-btn-back" data-app-btn-back data-mbgaui-anchors data-app-sound="choose"></div>\n\n    <div class="c-btn-layout">\n        <div class="bg-total-stamina box-cc">\n            <div class="box-cc">\n                <div class="p-text-total-stamina img-rep">総消費スタミナ</div>\n                <div class="ta-c fc-light fs-s">' + __e(dungeonModel.get("total_stamina")) + '</div>\n            </div>\n        </div>\n        <a class="c-btn is-main-lead c-btn-layout__center" data-mbgaui-anchors data-app-sound="decide" data-app-btn-go><span class="c-btn__inner">GO!</span></a>\n    </div>\n</div>\n'
        }
        return __p
    }
}), define("templates_event/challenge/dungeon_list/DungeonList", [], function() {
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
            __p += '\n<div class="c-layer-bg w-full h-full" data-app-layer-bg></div>\n<div class="c-layer-content-1 dungeon-list-layout-scroll challenge mod-freescroll-wrap mod-basic" data-ui-freescroll data-app-dungeon-list-scroll>\n    <div data-ui-freescroll-content>\n        ';
            var d = worldModel.get("series_formal_name");
            __p += "\n        ", d && (__p += '\n            <div class="c-ttl-category-series mlr-a mb-b2">\n                <span class="c-ttl-category-series__inner">' + __e(d) + "</span>\n            </div>\n        "), __p += '\n        <ul class="list-decoration locked layout-challenge">\n            ', _.each(dungeonModels, function(e) {
                __p += "\n                ";
                var t = +e.get("id");
                __p += "\n                ";
                var n = e.get("is_unlocked");
                __p += "\n                <li", e.get("is_unlocked") && (__p += ' class="flag-unlocked', e.get("button_style") === "EXTRA" ? __p += " btn-deco-wide-extra" : e.get("button_style") === "DOOM" && (__p += " btn-deco-wide-doom"), __p += '"'), __p += ' data-dungeon-id="' + __e(t) + '" data-mbgaui-anchors data-app-sound="choose" data-app-flag-unlock>\n                    <div class="inner box-cb flex1">\n                        <div>\n                            <div class="challenge-dungeon-name">\n                                ' + __e(n ? e.get("name") : "???") + '\n                            </div>\n                            <div class="di-f">\n                                <span class="level ', e.get("button_style") === "DOOM" && (__p += "pl-b2"), __p += '">Difficulty ' + __e(e.getDisplayChallengeLevel()) + "</span>\n                                ";
                var r = dungeonIdQuestMap[t];
                __p += "\n                                ", r && (__p += "\n                                    ", !r.isAchieved() && !r.isCompleted() && (__p += '\n                                        <div class="img-text-quest-receive img-rep ml-b"></div>\n                                    '), __p += "\n                                "), __p += "\n                            </div>\n                        </div>\n                    </div>\n                    ", e.get("is_master") ? __p += '\n                        <div class="img-text-master img-rep">Master</div>\n                    ' : e.get("is_clear") && (__p += '\n                        <div class="img-text-clear img-rep">clear</div>\n                    '), __p += "\n                    ";
                var i = e.getDisplayAblePrizes();
                __p += "\n                    ", _.each(i, function(e) {
                    __p += "\n                        ";
                    var t = n ? "" : "_disable";
                    __p += '\n                        <img src="' + __e(pUrl("/dff/static/img/event/challenge_" + eventId + "/icon_badge" + e.id + t + ".png")) + '" width="40" height="40" class="icon-chara-badge box-cb">\n                    '
                }), __p += "\n                 </li>\n            "
            }), __p += '\n        </ul>\n        <div class="dungeon-list-nav">\n            <div class="btn-narrow" data-mbgaui-anchors data-app-sound="choose" data-app-btn-intro>\n                <span class="inner">Event Rules</span>\n            </div>\n            <a class="btn-prize-list position-limited" data-app-btn-challenge-prizes data-app-dungeon-type="', isForce ? __p += __e(FF.CONST.SERVER.DUNGEON.TYPE_OF.FORCE) : __p += __e(FF.CONST.SERVER.DUNGEON.TYPE_OF.NORMAL), __p += '" data-mbgaui-anchors data-app-sound="choose"><div class="inner img-rep">ダンジョンクリア報酬一覧</div></a>\n        </div>\n        ', c.get("has_intro_movie") && (__p += '\n            <div class="dungeon-list-nav mt-b2">\n                <div class="btn-wide" data-mbgaui-anchors data-app-sound="choose" data-app-btn-intro-movie>\n                    Play Event Movie\n                </div>\n            </div>\n        '), __p += '\n        <div data-app-link-list-wrap>\n            \n        </div>\n    </div>\n    <div class="c-freescroll__scrollbar" data-ui-scrollbar><div class="c-freescroll__scrollbar-inner" data-ui-scrollbar-face></div></div>\n</div>\n\n<div class="c-layer-content-11 dungeon-list-layout challenge" data-app-dungeon-list>\n    <h1 class="c-ttl-scene">\n        <div class="c-ttl-scene__inner po-r">\n            <span class="c-ttl-scene__title fs-b">' + __e(worldModel.get("name")) + '</span>\n            <div class="c-ttl-scene__term c-text-mat"><div class="c-text-mat__inner">' + ((b = worldModel.getOpenedToKeptOutTermText()) == null ? "" : b) + '</div></div>\n        </div>\n    </h1>\n    <a class="c-btn-back" data-app-btn-back data-mbgaui-anchors data-app-sound="choose"></a>\n    ', isForce ? (__p += "\n        \n        ", dungeonTypeAlias ? __p += '\n            <a class="position-limited box-cc btn-right-shoulder btn-history" data-mbgaui-anchors="{ preventDefault: true }" data-app-btn-normal data-app-sound="choose">\n                <img class="img-title" src="' + __e(pUrl("/dff/static/img/event/challenge_" + eventId + "/btn_history.png")) + '" width="127" height="36">\n            </a>\n        ' : __p += '\n            <a class="position-limited box-cc btn-right-shoulder btn-history" data-mbgaui-anchors="{ preventDefault: true }" data-app-btn-normal data-app-sound="choose">\n                <div class="p-icon-history img-rep">normal</div>\n            </a>\n        ', __p += "\n    ") : hasForceDungeon && (__p += "\n        ", dungeonTypeAlias ? __p += '\n            <a class="position-limited box-cc btn-right-shoulder btn-force" data-mbgaui-anchors="{ preventDefault: true }" data-app-btn-force data-app-sound="choose">\n                <img class="img-title" src="' + __e(pUrl("/dff/static/img/event/challenge_" + eventId + "/btn_force.png")) + '" width="127" height="36">\n            </a>\n        ' : __p += '\n            <a class="position-limited box-cc btn-right-shoulder btn-force" data-mbgaui-anchors="{ preventDefault: true }" data-app-btn-force data-app-sound="choose">\n                <div class="p-icon-force img-rep">force</div>\n            </a>\n        ', __p += "\n    "), __p += "\n</div>\n<div data-app-dungeon-detail></div>\n"
        }
        return __p
    }
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
});