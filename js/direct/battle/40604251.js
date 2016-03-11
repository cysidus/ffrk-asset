define([], function() {
    var a = 1,
        b = 2,
        c = 10,
        d = 11,
        e = 20,
        f = 21,
        g = 20605202,
        h = 20605203,
        i = 1014901,
        j = 1014902,
        k = FF.ns.battle;
    FF.ns.battle.ai.conf[40604251] = {
        notifyJudgedDeath: function() {
            return this.isCurrentState(f) ? !0 : (this.isCurrentState(d) && this.changeState(e), !1)
        },
        startStateId: c,
        globalRegister: {},
        states: [{
            id: c,
            "class": "InitState",
            memberValues: {
                nextStateId: d,
                visible: {
                    visibleNo: [a]
                }
            }
        }, {
            id: d
        }, {
            id: e,
            "class": "InterruptAbility",
            inState: ["ENABLE", "RESET", "SHUFFLE_ATB"],
            memberValues: {
                visible: {
                    visibleNo: [b]
                },
                nextStateId: f,
                abilityId: k.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            animationId: g
                        }],
                        [{
                            messageId: i
                        }],
                        [{
                            animationId: h
                        }],
                        [{
                            messageId: j
                        }]
                    ]
                }
            }
        }, {
            id: f
        }]
    }
});