define([], function() {
    {
        var a = 10,
            b = 11;
        FF.ns.battle
    }
    FF.ns.battle.ai.conf[5] = {
        startStateId: a,
        states: [{
            id: a,
            "class": "DoNothingState",
            transitions: [{
                nextStateId: b,
                condition: {
                    "class": "TurnTransitCondition",
                    args: {
                        turn: 1
                    }
                }
            }]
        }, {
            id: b,
            "class": "InterruptMultipleAbility",
            memberValues: {
                nextStateId: a,
                abilityCount: 2,
                shouldRegisterAbilityFromActor: !0
            }
        }]
    }
});