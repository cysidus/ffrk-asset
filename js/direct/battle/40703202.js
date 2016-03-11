define([], function() {
    var a = 10,
        b = 11,
        c = 12,
        d = 1017632,
        e = 402051,
        f = 1,
        g = FF.ns.battle;
    FF.ns.battle.ai.conf[40703202] = {
        notifyJudgedDeath: function() {
            return this._executer.container.getChild(f).judgeDeath() ? !0 : this.isCurrentState(c) ? !0 : (this.isCurrentState(a) && this.changeState(b), !1)
        },
        startStateId: a,
        states: [{
            id: a,
            "class": "SimpleState"
        }, {
            id: b,
            "class": "InterruptMultipleAbility",
            memberValues: {
                nextStateId: c,
                abilityCount: 2,
                abilitySettingMap: {
                    1: {
                        abilityId: e
                    },
                    2: {
                        abilityId: g.Conf.ABILITY_ID_OF.DEFORM,
                        abilityOptions: {
                            messageId: d
                        }
                    }
                }
            }
        }, {
            id: c
        }]
    }
});