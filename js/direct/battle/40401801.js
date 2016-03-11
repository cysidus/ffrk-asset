define([], function() {
    var a = 4040181,
        b = 4040182,
        c = 10,
        d = 11,
        e = 12,
        f = 21,
        g = 20401202,
        h = 1009601,
        i = FF.ns.battle;
    FF.ns.battle.ai.conf[40401801] = {
        startStateId: c,
        globalRegister: {},
        states: [{
            id: c,
            "class": "InitState",
            memberValues: {
                nextStateId: d
            }
        }, {
            id: d,
            "class": "SimpleState",
            inState: ["CHANGE_PARAM"],
            memberValues: {
                paramId: a
            },
            transitions: [{
                nextStateId: f,
                condition: [{
                    canTransition: "HP",
                    args: {
                        underOrEqual: 30
                    }
                }]
            }]
        }, {
            id: f,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: e,
                abilityId: i.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    messageId: h,
                    animationId: g
                }
            }
        }, {
            id: e,
            "class": "SimpleState",
            inState: ["CHANGE_PARAM"],
            memberValues: {
                paramId: b
            }
        }]
    }
});