define([], function() {
    {
        var a = 11,
            b = 12,
            c = 13,
            d = 14,
            e = 201514011,
            f = 201514012,
            g = 201514013,
            h = 75,
            i = 35;
        FF.ns.battle
    }
    FF.ns.battle.ai.conf[2015140101] = {
        startStateId: a,
        states: [{
            id: a,
            "class": "InitState",
            memberValues: {
                paramId: e,
                nextStateId: b
            }
        }, {
            id: b,
            "class": "SimpleState",
            transitions: [{
                nextStateId: d,
                condition: {
                    canTransition: "HP",
                    args: {
                        underOrEqual: i
                    }
                }
            }, {
                nextStateId: c,
                condition: {
                    canTransition: "HP",
                    args: {
                        underOrEqual: h
                    }
                }
            }]
        }, {
            id: c,
            inState: ["CHANGE_PARAM", "RESET_CAST_ABILITY"],
            "class": "SimpleState",
            memberValues: {
                paramId: f
            },
            transitions: [{
                nextStateId: d,
                condition: {
                    canTransition: "HP",
                    args: {
                        underOrEqual: i
                    }
                }
            }]
        }, {
            id: d,
            inState: ["CHANGE_PARAM", "RESET_CAST_ABILITY"],
            "class": "SimpleState",
            memberValues: {
                paramId: g
            }
        }]
    }
});