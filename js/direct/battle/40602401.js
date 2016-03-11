define([], function() {
    var a = 10,
        b = 11,
        c = 12,
        d = 21,
        e = 4060241,
        f = 4060242,
        g = 1009301,
        h = 1009302,
        i = 1009303,
        j = 1009304,
        k = FF.ns.battle;
    FF.ns.battle.ai.conf[40602401] = {
        startStateId: a,
        globalRegister: {},
        states: [{
            id: a,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: b,
                abilityId: k.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            messageId: g
                        }],
                        [{
                            messageId: h
                        }],
                        [{
                            messageId: i
                        }]
                    ]
                }
            }
        }, {
            id: b,
            "class": "SimpleState",
            inState: ["CHANGE_PARAM"],
            memberValues: {
                paramId: e
            },
            transitions: [{
                nextStateId: d,
                condition: [{
                    canTransition: "HP",
                    args: {
                        under: 50
                    }
                }]
            }]
        }, {
            id: d,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: c,
                abilityId: k.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            messageId: j
                        }]
                    ]
                }
            }
        }, {
            id: c,
            "class": "SimpleState",
            inState: ["CHANGE_PARAM"],
            memberValues: {
                paramId: f
            }
        }]
    }
});