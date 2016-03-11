define([], function() {
    var a = 10,
        b = 11,
        c = 12,
        d = 20,
        e = 21,
        f = 1012601,
        g = 1012602,
        h = 4080161,
        i = FF.ns.battle;
    FF.ns.battle.ai.conf[40801601] = {
        notifyJudgedDeath: function() {
            return this.isCurrentState(e) ? !0 : this.isCurrentState(d) ? !1 : (this.changeState(d), !1)
        },
        startStateId: a,
        globalRegister: {},
        states: [{
            id: a,
            "class": "InitState",
            memberValues: {
                nextStateId: b,
                paramId: h
            }
        }, {
            id: b,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: c,
                abilityId: i.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            messageId: f
                        }]
                    ]
                }
            }
        }, {
            id: c,
            "class": "SimpleState"
        }, {
            id: d,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: e,
                abilityId: i.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            messageId: g
                        }]
                    ]
                }
            }
        }, {
            id: e
        }]
    }
});