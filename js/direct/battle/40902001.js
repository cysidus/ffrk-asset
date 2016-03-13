define([], function() {
    var a = 10,
        b = 11,
        c = 12,
        d = 13,
        e = 1017101,
        f = 10900700,
        g = 10900200,
        h = 302104,
        i = FF.ns.battle;
    FF.ns.battle.ai.conf[40902001] = {
        startStateId: a,
        states: [{
            id: a,
            "class": "SimpleState",
            transitions: [{
                nextStateId: c,
                transit: function(b, c) {
                    var d = c.getMemberValues();
                    d.nextStateId = a
                },
                condition: {
                    "class": "DamageTransitCondition",
                    args: {
                        exercise: "SUMMON",
                        buddyId: f
                    }
                }
            }, {
                nextStateId: d,
                condition: [{
                    canTransition: "HP",
                    args: {
                        underOrEqual: 50
                    }
                }]
            }]
        }, {
            id: c,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: void 0,
                abilityId: i.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            messageId: e,
                            buddyId: g
                        }]
                    ]
                }
            }
        }, {
            id: d,
            outState: ["RESET"],
            update: function() {
                var a = this._executer;
                a.isReadyToSelectAbility() && a.registerAbility(h)
            },
            transitions: [{
                nextStateId: c,
                transit: function(a, b) {
                    var c = b.getMemberValues();
                    c.nextStateId = d
                },
                condition: {
                    "class": "DamageTransitCondition",
                    args: {
                        exercise: i.Conf.EXERCISE_TYPE.SUMMON,
                        buddyId: f
                    }
                }
            }, {
                nextStateId: b,
                condition: {
                    "class": "AbilityCountTransitCondition",
                    args: {
                        abilityId: [h],
                        count: 1,
                        whenDone: !0
                    }
                }
            }]
        }, {
            id: b,
            "class": "SimpleState",
            transitions: [{
                nextStateId: c,
                transit: function(a, c) {
                    var d = c.getMemberValues();
                    d.nextStateId = b
                },
                condition: {
                    "class": "DamageTransitCondition",
                    args: {
                        exercise: i.Conf.EXERCISE_TYPE.SUMMON,
                        buddyId: f
                    }
                }
            }]
        }]
    }
});