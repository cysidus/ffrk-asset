define([], function() {
    var a = FF.ns.battle,
        b = 10,
        c = 11,
        d = 12,
        e = 13,
        f = 1016402,
        g = 401932,
        h = 401933,
        i = 2,
        j = 4090161,
        k = 4090162;
    FF.ns.battle.ai.conf[40901601] = {
        notifyJudgedDeath: function() {
            var a = this._executer.container.getChild(i);
            return a.isAlive() && a.kill(), !0
        },
        startStateId: b,
        globalRegister: {},
        states: [{
            id: b,
            "class": "InitState",
            memberValues: {
                nextStateId: c,
                deadAnimateType: a.Conf.DEAD_ANIMATE_TYPE.ESCAPE
            }
        }, {
            id: c,
            "class": "SimpleState",
            inState: ["CHANGE_PARAM"],
            memberValues: {
                paramId: j
            },
            transitions: [{
                nextStateId: d,
                condition: {
                    "class": "DamageTransitCondition",
                    args: {
                        scope: "ANY",
                        abilityIds: [g]
                    }
                }
            }]
        }, {
            id: d,
            "class": "SimpleState",
            inState: ["CHANGE_PARAM"],
            memberValues: {
                paramId: k
            },
            transitions: [{
                nextStateId: e,
                condition: {
                    "class": "DamageTransitCondition",
                    args: {
                        all: !0,
                        damagedOnly: !0
                    }
                }
            }, {
                nextStateId: e,
                condition: {
                    canTransition: "ABILITY_DONE",
                    args: {
                        abilityId: h
                    }
                }
            }]
        }, {
            id: e,
            "class": "InterruptAbility",
            inState: ["RESET"],
            memberValues: {
                nextStateId: c,
                abilityId: a.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            messageId: f
                        }]
                    ]
                }
            }
        }]
    }
});