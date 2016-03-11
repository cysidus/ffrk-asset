define([], function() {
    var a = FF.ns.battle,
        b = 4070201,
        c = 4070202,
        d = 4070203,
        e = 10,
        f = 11,
        g = 13,
        h = 14,
        i = 21,
        j = 22,
        k = [a.Conf.EXERCISE_TYPE.PHYSICAL, a.Conf.EXERCISE_TYPE.NINJA, a.Conf.EXERCISE_TYPE.INBORN],
        l = [a.Conf.EXERCISE_TYPE.BLACK_MAGIC, a.Conf.EXERCISE_TYPE.WHITE_MAGIC, a.Conf.EXERCISE_TYPE.BLUE_MAGIC, a.Conf.EXERCISE_TYPE.SUMMON],
        m = 20701602,
        n = 20701603;
    FF.ns.battle.ai.conf[40702001] = {
        startStateId: e,
        globalRegister: {},
        states: [{
            id: e,
            "class": "InitState",
            memberValues: {
                nextStateId: f
            }
        }, {
            id: f,
            "class": "SimpleState",
            inState: ["CHANGE_PARAM"],
            memberValues: {
                paramId: b
            },
            transitions: [{
                nextStateId: j,
                condition: [{
                    canTransition: "HP",
                    args: {
                        under: 50
                    }
                }, {
                    "class": "EachDamageTransitCondition",
                    args: {
                        exercises: k
                    }
                }]
            }, {
                nextStateId: i,
                condition: [{
                    canTransition: "HP",
                    args: {
                        under: 50
                    }
                }, {
                    "class": "EachDamageTransitCondition",
                    args: {
                        exercises: l
                    }
                }]
            }]
        }, {
            id: g,
            "class": "SimpleState",
            inState: ["CHANGE_PARAM"],
            memberValues: {
                paramId: c
            }
        }, {
            id: h,
            "class": "SimpleState",
            inState: ["CHANGE_PARAM"],
            memberValues: {
                paramId: d
            }
        }, {
            id: i,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: g,
                abilityId: a.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    animationId: m
                }
            }
        }, {
            id: j,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: h,
                abilityId: a.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    animationId: n
                }
            }
        }]
    }
});