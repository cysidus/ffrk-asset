define([], function() {
    var a = 10,
        b = 11,
        c = 12,
        d = 13,
        e = 14,
        f = 2090340201,
        g = 2090340202,
        h = 20901805,
        i = 20901806,
        j = 209034021,
        k = 209034022,
        l = 503402,
        m = FF.ns.battle;
    FF.ns.battle.ai.conf[2090340201] = {
        startStateId: a,
        states: [{
            id: a,
            "class": "InitState",
            memberValues: {
                nextStateId: c
            }
        }, {
            id: b,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: c,
                abilityId: m.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            animationId: i
                        }],
                        [{
                            messageId: g
                        }]
                    ]
                }
            }
        }, {
            id: c,
            "class": "SimpleState",
            inState: ["CHANGE_PARAM"],
            outState: ["RESET"],
            memberValues: {
                paramId: j
            },
            transitions: [{
                nextStateId: d,
                condition: {
                    "class": "DamageTransitCondition",
                    args: {
                        element: "FIRE"
                    }
                }
            }]
        }, {
            id: d,
            "class": "InterruptMultipleAbility",
            outState: ["RESET"],
            memberValues: {
                nextStateId: e,
                abilityCount: 3,
                abilitySettingMap: {
                    1: {
                        abilityId: m.Conf.ABILITY_ID_OF.DEFORM,
                        abilityOptions: {
                            animationId: h
                        }
                    },
                    2: {
                        abilityId: m.Conf.ABILITY_ID_OF.DEFORM,
                        abilityOptions: {
                            messageId: f
                        }
                    },
                    3: {
                        abilityId: l
                    }
                }
            }
        }, {
            id: e,
            "class": "SimpleState",
            inState: ["CHANGE_PARAM"],
            outState: ["RESET"],
            memberValues: {
                paramId: k
            },
            transitions: [{
                nextStateId: b,
                condition: {
                    "class": "DamageTransitCondition",
                    args: {
                        elements: [m.Conf.ELEMENT_TYPE.WATER, m.Conf.ELEMENT_TYPE.ICE]
                    }
                }
            }]
        }]
    }
});