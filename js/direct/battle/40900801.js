define([], function() {
    var a = 10,
        b = 11,
        c = 12,
        d = 20,
        e = 21,
        f = 30,
        g = 31,
        h = 1013601,
        i = 1013602,
        j = 1013603,
        k = 4090081,
        l = 4090082,
        m = 10900200,
        n = FF.ns.battle;
    FF.ns.battle.ai.conf[40900801] = {
        notifyJudgedDeath: function() {
            return this.isCurrentState(g) ? !0 : this.isCurrentState(f) ? !1 : (this.changeState(f), !1)
        },
        startStateId: a,
        globalRegister: {},
        states: [{
            id: a,
            "class": "InitState",
            memberValues: {
                nextStateId: b,
                paramId: k
            }
        }, {
            id: b,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: c,
                abilityId: n.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            messageId: h,
                            buddyId: m
                        }]
                    ]
                }
            }
        }, {
            id: c,
            "class": "SimpleState",
            transitions: [{
                nextStateId: d,
                condition: [{
                    canTransition: "HP",
                    args: {
                        underOrEqual: 50
                    }
                }]
            }]
        }, {
            id: d,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: e,
                abilityId: n.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            messageId: i,
                            buddyId: m
                        }]
                    ]
                }
            }
        }, {
            id: e,
            "class": "SimpleState",
            inState: ["CHANGE_PARAM"],
            memberValues: {
                paramId: l
            }
        }, {
            id: f,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: g,
                abilityId: n.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            messageId: j,
                            buddyId: m
                        }]
                    ]
                }
            }
        }, {
            id: g
        }]
    }
});