define([], function() {
    var a = 4040011,
        b = 4040012,
        c = 4,
        d = 20405402,
        e = 20405403,
        f = 10,
        g = 11,
        h = 12,
        i = 21,
        j = 22,
        k = 23,
        l = 24,
        m = 1006301,
        n = 1006401,
        o = 1006501,
        p = 201001,
        q = FF.ns.battle;
    FF.ns.battle.ai.conf[40400101] = {
        startStateId: f,
        globalRegister: {},
        states: [{
            id: f,
            "class": "InitState",
            memberValues: {
                nextStateId: g,
                paramId: a,
                overrideActorParam: {}
            }
        }, {
            id: g,
            "class": "SimpleState",
            inState: ["CHANGE_PARAM"],
            outState: ["RESET"],
            memberValues: {
                paramId: a
            },
            transitions: [{
                nextStateId: i,
                condition: {
                    "class": "TurnTransitCondition",
                    args: {
                        turn: c
                    }
                }
            }]
        }, {
            id: h,
            "class": "DoNothingState",
            memberValues: {
                paramId: b
            },
            transitions: [{
                nextStateId: j,
                condition: {
                    "class": "TurnTransitCondition",
                    args: {
                        turn: c
                    }
                }
            }, {
                nextStateId: k,
                condition: {
                    "class": "DamageTransitCondition",
                    args: {
                        all: !0,
                        scope: "ANY",
                        counter: !0
                    }
                }
            }]
        }, {
            id: i,
            inState: ["SET_SA"],
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: h,
                abilityId: q.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    messageId: m,
                    animationId: d
                },
                sa: q.Conf.STATUS_AILMENTS_TYPE.INVINCIBLE
            }
        }, {
            id: j,
            "class": "InterruptAbility",
            outState: ["UNSET_SA"],
            memberValues: {
                nextStateId: g,
                abilityId: q.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    messageId: n,
                    animationId: e
                },
                sa: q.Conf.STATUS_AILMENTS_TYPE.INVINCIBLE
            }
        }, {
            id: l,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: h,
                abilityId: q.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    messageId: o
                }
            }
        }, {
            id: k,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: l,
                abilityId: p,
                abilityOptions: {
                    isCounter: !0
                }
            }
        }]
    }
});