define([], function() {
    {
        var a = 11,
            b = 21,
            c = 201487;
        FF.ns.battle
    }
    FF.ns.battle.ai.conf[40702301] = {
        startStateId: a,
        states: [{
            id: a,
            "class": "SimpleState",
            transitions: [{
                nextStateId: b,
                condition: [{
                    "class": "AbilityCountTransitCondition",
                    args: {
                        abilityId: [c],
                        count: 1
                    }
                }]
            }]
        }, {
            id: b,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: a,
                abilityId: c
            }
        }]
    }
});