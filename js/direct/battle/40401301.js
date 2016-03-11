define([], function() {
    var a = 4040131,
        b = 4040132,
        c = 4040133,
        d = 20403202,
        e = 20403203,
        f = 20403204,
        g = 20403205,
        h = 10,
        i = 11,
        j = 12,
        k = 13,
        l = 21,
        m = 22,
        n = 23,
        o = 24,
        p = 25,
        q = 1004001,
        r = 1004101,
        s = 1004201,
        t = FF.ns.battle;
    FF.ns.battle.ai.conf[40401301] = {
        startStateId: h,
        globalRegister: {},
        states: [{
            id: h,
            "class": "InitState",
            memberValues: {
                nextStateId: i,
                paramId: a
            }
        }, {
            id: i,
            "class": "SimpleState",
            inState: ["CHANGE_PARAM"],
            outState: ["RESET"],
            memberValues: {
                paramId: a
            },
            transitions: [{
                nextStateId: o,
                condition: [{
                    canTransition: "HP",
                    args: {
                        under: 30
                    }
                }, {
                    "class": "TurnTransitCondition",
                    args: {
                        lot: [3, 1]
                    }
                }]
            }, {
                nextStateId: l,
                condition: {
                    "class": "TurnTransitCondition",
                    args: {
                        lot: [1, 2]
                    }
                }
            }]
        }, {
            id: j,
            "class": "SimpleState",
            inState: ["CHANGE_PARAM"],
            outState: ["RESET"],
            memberValues: {
                paramId: b
            },
            transitions: [{
                nextStateId: m,
                condition: {
                    canTransition: "ABILITY_DONE"
                }
            }, {
                nextStateId: n,
                condition: {
                    "class": "DamageTransitCondition",
                    args: {
                        element: "LIGHTNING"
                    }
                }
            }]
        }, {
            id: k,
            "class": "SimpleState",
            inState: ["CHANGE_PARAM"],
            outState: ["RESET"],
            memberValues: {
                paramId: c
            },
            transitions: [{
                nextStateId: p,
                condition: {
                    canTransition: "HP",
                    args: {
                        over: 30
                    }
                }
            }, {
                nextStateId: p,
                condition: {
                    "class": "TurnTransitCondition",
                    args: {
                        lot: [3, 7]
                    }
                }
            }]
        }, {
            id: l,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: j,
                abilityId: t.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    messageId: q,
                    animationId: d
                }
            }
        }, {
            id: m,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: i,
                abilityId: t.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    animationId: e
                }
            }
        }, {
            id: n,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: i,
                abilityId: t.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    messageId: s,
                    animationId: e
                }
            }
        }, {
            id: o,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: k,
                abilityId: t.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    messageId: r,
                    animationId: f
                }
            }
        }, {
            id: p,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: i,
                abilityId: t.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    animationId: g
                }
            }
        }]
    }
});