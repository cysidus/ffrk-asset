define([], function() {
    var a = 10,
        b = 11,
        c = 12,
        d = 20,
        e = 1016101,
        f = FF.ns.battle;
    FF.ns.battle.ai.conf[40901301] = {
        startStateId: a,
        globalRegister: {},
        states: [{
            id: a,
            "class": "InitState",
            memberValues: {
                nextStateId: b,
                deadAnimateType: f.Conf.DEAD_ANIMATE_TYPE.ESCAPE
            }
        }, {
            id: b,
            "class": "SimpleState"
        }, {
            id: c
        }, {
            id: d,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: c,
                abilityId: f.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            messageId: e
                        }]
                    ]
                }
            }
        }],
        notifyJudgedDeath: function() {
            return this.isCurrentState(c) ? !0 : (this.isCurrentState(d) || this.changeState(d), !1)
        }
    }
});