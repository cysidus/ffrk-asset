define([], function() {
    var a = 4040021,
        b = 10,
        c = 28,
        d = 27,
        e = 26,
        f = 25,
        g = 24,
        h = 23,
        i = 22,
        j = 21,
        k = 20400202,
        l = 20400203,
        m = 20400204,
        n = 20400205,
        o = 20400206,
        p = 20400207,
        q = 20400208,
        r = 37,
        s = 36,
        t = 35,
        u = 34,
        v = 33,
        w = 32,
        x = 31,
        y = 1003801,
        z = FF.ns.battle;
    FF.ns.battle.ai.conf[40400201] = {
        startStateId: b,
        globalRegister: {},
        states: [{
            id: b,
            "class": "InitState",
            memberValues: {
                nextStateId: c,
                paramId: a
            }
        }, {
            id: c,
            "class": "SimpleState",
            transitions: [{
                nextStateId: r,
                condition: {
                    canTransition: "HP",
                    args: {
                        under: 70
                    }
                }
            }]
        }, {
            id: d,
            "class": "SimpleState",
            transitions: [{
                nextStateId: s,
                condition: {
                    canTransition: "HP",
                    args: {
                        under: 50
                    }
                }
            }]
        }, {
            id: e,
            "class": "SimpleState",
            transitions: [{
                nextStateId: t,
                condition: {
                    canTransition: "HP",
                    args: {
                        under: 40
                    }
                }
            }]
        }, {
            id: f,
            "class": "SimpleState",
            transitions: [{
                nextStateId: u,
                condition: {
                    canTransition: "HP",
                    args: {
                        under: 30
                    }
                }
            }]
        }, {
            id: g,
            "class": "SimpleState",
            transitions: [{
                nextStateId: v,
                condition: {
                    canTransition: "HP",
                    args: {
                        under: 20
                    }
                }
            }]
        }, {
            id: h,
            "class": "SimpleState",
            transitions: [{
                nextStateId: w,
                condition: {
                    canTransition: "HP",
                    args: {
                        under: 10
                    }
                }
            }]
        }, {
            id: i,
            "class": "SimpleState",
            transitions: [{
                nextStateId: x,
                condition: {
                    canTransition: "HP",
                    args: {
                        under: 5
                    }
                }
            }]
        }, {
            id: j,
            "class": "SimpleState"
        }, {
            id: r,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: d,
                abilityId: z.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    animationId: k
                }
            }
        }, {
            id: s,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: e,
                abilityId: z.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    animationId: l
                }
            }
        }, {
            id: t,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: f,
                abilityId: z.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    animationId: m
                }
            }
        }, {
            id: u,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: g,
                abilityId: z.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    animationId: n
                }
            }
        }, {
            id: v,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: h,
                abilityId: z.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    animationId: o
                }
            }
        }, {
            id: w,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: i,
                abilityId: z.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    animationId: p,
                    messageId: y
                }
            }
        }, {
            id: x,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: j,
                abilityId: z.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    animationId: q
                }
            }
        }]
    }
});