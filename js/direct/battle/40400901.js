define([], function() {
    var a = FF.ns.battle,
        b = 4040091,
        c = 10,
        d = 11,
        e = 12,
        f = 21,
        g = 22,
        h = 23,
        i = 1000401,
        j = 1000501,
        k = 201003,
        l = 201034;
    FF.ns.battle.ai.conf[40400901] = {
        startStateId: c,
        globalRegister: {},
        states: [{
            id: c,
            "class": "InitState",
            memberValues: {
                nextStateId: d,
                paramId: b
            }
        }, {
            id: d,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: e,
                abilityId: a.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    messageId: i
                }
            }
        }, {
            id: e,
            "class": "SimpleState",
            transitions: [{
                nextStateId: f,
                condition: [{
                    "class": "DamageTransitCondition",
                    args: {
                        exercise: "PHYSICAL",
                        rate: 40,
                        counter: !0
                    }
                }]
            }, {
                nextStateId: g,
                condition: [{
                    "class": "DamageTransitCondition",
                    args: {
                        element: "FIRE",
                        rate: 30,
                        counter: !0
                    }
                }]
            }]
        }, {
            id: f,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: e,
                abilityId: k,
                abilityOptions: {
                    isCounter: !0
                }
            }
        }, {
            id: g,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: h,
                abilityId: a.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    messageId: j
                }
            }
        }, {
            id: h,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: e,
                abilityId: l,
                abilityOptions: {
                    isCounter: !0
                }
            }
        }]
    }
});