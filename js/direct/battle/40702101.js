define([], function() {
    {
        var a = 4070211,
            b = 4070212,
            c = 10,
            d = 11,
            e = 12;
        FF.ns.battle
    }
    FF.ns.battle.ai.conf[40702101] = {
        startStateId: c,
        globalRegister: {},
        states: [{
            id: c,
            "class": "InitState",
            memberValues: {
                nextStateId: d
            }
        }, {
            id: d,
            "class": "SimpleState",
            inState: ["CHANGE_PARAM"],
            memberValues: {
                paramId: a
            },
            transitions: [{
                nextStateId: e,
                condition: [{
                    canTransition: "HP",
                    args: {
                        underOrEqual: 30
                    }
                }]
            }]
        }, {
            id: e,
            "class": "SimpleState",
            inState: ["CHANGE_PARAM"],
            memberValues: {
                paramId: b
            }
        }]
    }
});