define([], function() {
    var a = 10,
        b = 11,
        c = 1013703,
        d = 1013704,
        e = 11200100,
        f = 11200200,
        g = FF.ns.battle;
    FF.ns.battle.ai.conf[41200451] = {
        startStateId: a,
        globalRegister: {},
        states: [{
            id: a,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: b,
                abilityId: g.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            messageId: c,
                            buddyId: e
                        }],
                        [{
                            messageId: d,
                            buddyId: f
                        }]
                    ]
                }
            }
        }, {
            id: b
        }]
    }
});