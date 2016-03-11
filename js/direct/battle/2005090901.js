define([], function() {
    var a = 1,
        b = 10,
        c = 11,
        d = 12,
        e = 21,
        f = 22,
        g = 200509091,
        h = 200509092,
        i = 2005090901,
        j = 2005090902,
        k = 2005090903,
        l = 20800904,
        m = 10800100,
        n = FF.ns.battle;
    FF.ns.battle.ai.conf[2005090901] = {
        notifyJudgedDeath: function() {
            return this.isCurrentState(d) ? !0 : (this.isCurrentState(f) || this.changeState(f), !1)
        },
        startStateId: b,
        globalRegister: {},
        states: [{
            id: b,
            "class": "InitState",
            memberValues: {
                nextStateId: e,
                paramId: g
            }
        }, {
            id: e,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: c,
                abilityId: n.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            messageId: i
                        }]
                    ]
                }
            }
        }, {
            id: c,
            "class": "SimpleState"
        }, {
            id: f,
            "class": "InterruptAbility",
            inState: ["CHANGE_PARAM"],
            outState: ["RECOVER"],
            memberValues: {
                paramId: h,
                nextStateId: d,
                abilityId: n.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            messageId: j
                        }],
                        [{
                            animationId: l
                        }],
                        [{
                            messageId: k,
                            buddyId: m
                        }]
                    ]
                },
                recover: {
                    recoverNo: [a]
                }
            }
        }, {
            id: d,
            "class": "SimpleState",
            inState: ["RESET", "SHUFFLE_ATB", "UNSET_ALL_SA"]
        }]
    }
});