define("event/challenge/battle/EventLogic", ["underscore"], function(e) {
        var t = FF.ns.battle,
            n = t.Conf,
            r = FF.ns.battle.BattleViewController.getInstance();
        r.shouldPlayForceEffect = function(e) {
            return e.battle.dungeon.dungeonTypeAlias ? !1 : e.battle.dungeon.isForce ? !0 : !1
        };
        var i = {
                YUNAX2: 53
            },
            s = {};
        s[i.YUNAX2] = "bgm_10_106";
        var o = [1050320701, 1050320702, 1050320703, 1050321401, 1050321402, 1050321403, 1050380110, 1050380111, 1050380112, 1050380122, 1050380123, 1050380124],
            u = {};
        u[i.YUNAX2] = "bgm_10_107", r.playWinBgm = function() {
            var n = t.BattleInfo.getInstance().getAppInitDataEventId(),
                r = t.BattleInfo.getInstance().getBattleInitData().battle.battleId,
                i = e.any(o, function(e) {
                    return r === e
                });
            if (i) FF.SoundMgr.playMusic(t.DataConstructor.getBattleBgm());
            else {
                var u = s[n] || t.DataConstructor.getWinBgm();
                FF.SoundMgr.playMusic(u)
            }
        }, r.playRequiem = function() {
            var e = t.BattleInfo.getInstance().getAppInitDataEventId(),
                n = u[e] || t.Conf.BGM_NAME.REQUIEM;
            FF.SoundMgr.playMusic(n)
        };
        var a = FF.ns.battle.view.animation.AppearanceAnimation,
            f = {};
        FF.ns.battle.view.animation.AppearanceAnimation = a.extend({
            playEndHook: function() {
                var n = t.BattleInfo.getInstance().getAppInitDataEventId(),
                    r = f[n];
                e.isFunction(r) && r()
            }
        });
        var l = 31;
        f[l] = function() {
            var n = [10603132],
                r = e.any(t.ActorMgr.getAllEnemies(), function(t) {
                    return e.contains(n, t.getId())
                });
            r && FF.SoundMgr.playEffect("se_ability_00720")
        }
    }), define("event/challenge/battle/battle_result/views/ResultDungeon", ["underscore", "jquery", "backbone", "sprintf", "scenes/battle_result/views/ResultDungeon", "lib/TextMaster"], function(e, t, n, r, i, s) {
        return i.extend({
            initialize: function(e) {
                i.prototype.initialize.call(this, e), this.dungeonTypeAlias = e.result.dungeonTypeAlias
            },
            getDungeonTypeName: function(e) {
                var t;
                return this.dungeonTypeAlias ? (t = e.isForce ? this.dungeonTypeAlias[this.serverConst.DUNGEON.TYPE_OF.FORCE] : this.dungeonTypeAlias[this.serverConst.DUNGEON.TYPE_OF.NORMAL], t += " ", t) : i.prototype.getDungeonTypeName.call(this, e)
            },
            getDungeonUnlockText: function(e) {
                var t = +e.dungeonId;
                return t === 10902423 || t === 10902424 || t === 10902425 || t === 10902426 ? s.getInstance().get("R10190") : i.prototype.getDungeonUnlockText.call(this, e)
            }
        })
    }), define("event/challenge/battle/battle_result/ResultViewController", ["underscore", "scenes/battle_result/ResultViewController", "./views/ResultDungeon"], function(e, t, n) {
        var r = FF.ns.battle;
        return r.ResultViewController = t.extend({
            resultDungeonViewClass: n
        }), r.ResultViewController
    }),
    function() {
        var e = FF.onload;
        FF.onload = function() {
            require(["event/challenge/battle/EventLogic", "event/challenge/battle/battle_result/ResultViewController"], function() {
                e()
            })
        }
    }(), define("event/challenge/battle", function() {});