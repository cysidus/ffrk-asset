define([], function() {
    {
        var a = 11,
            b = 12,
            c = 21,
            d = 103003;
        FF.ns.battle
    }
    FF.ns.battle.ai.conf[40400402] = {
        startStateId: a,
        globalRegister: {},
        states: [{
            id: a,
            "class": "SimpleState",
            memberValues: {},
            transitions: [{
                nextStateId: c,
                condition: [{
                    "class": "DamageTransitCondition",
                    args: {
                        element: "FIRE",
                        counter: !0
                    }
                }]
            }, {
                nextStateId: b,
                condition: {
                    "class": "TurnTransitCondition",
                    args: {
                        turn: 3
                    }
                }
            }]
        }, {
            id: b,
            "class": "SimpleState",
            update: function() {
                var a = this._executer;
                a.isReadyToSelectAbility() && a.registerAbility(d)
            },
            transitions: []
        }, {
            id: c,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: a,
                abilityId: d,
                abilityOptions: {
                    isCounter: !0
                }
            }
        }]
    }
});