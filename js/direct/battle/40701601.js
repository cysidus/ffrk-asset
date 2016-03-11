define([], function() {
    {
        var a = 10,
            b = 11,
            c = 12,
            d = [b, c],
            e = [15, 85],
            f = 4070161,
            g = 4070162;
        FF.ns.battle
    }
    FF.ns.battle.ai.conf[40701601] = {
        startStateId: a,
        globalRegister: {
            stateIds: d
        },
        states: [{
            id: a,
            "class": "DoNothingState",
            transitions: [{
                nextStateLot: e,
                condition: {
                    "class": "TurnTransitCondition",
                    args: {
                        turn: 1
                    }
                }
            }]
        }, {
            id: b,
            "class": "InterruptAbility",
            inState: ["CHANGE_PARAM"],
            memberValues: {
                paramId: g,
                nextStateId: a
            }
        }, {
            id: c,
            "class": "InterruptMultipleAbility",
            inState: ["CHANGE_PARAM"],
            memberValues: {
                paramId: f,
                nextStateId: a,
                abilityCount: 2
            }
        }]
    }
});