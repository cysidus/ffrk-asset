define([], function() {
    var a = 11,
        b = 12,
        c = 21,
        d = 1017801,
        e = 1017802,
        f = FF.ns.battle,
        g = [f.Conf.BUDDY_ID.LIGHTNING, f.Conf.BUDDY_ID.SAZH];
    FF.ns.battle.ai.conf[41302401] = {
        startStateId: a,
        globalRegister: {},
        states: [{
            id: a,
            "class": "InitState",
            memberValues: {
                nextStateId: c
            }
        }, {
            id: c,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: b,
                abilityId: f.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            messageId: d,
                            buddyIds: g
                        }],
                        [{
                            messageId: e,
                            buddyIds: g
                        }]
                    ]
                }
            }
        }, {
            id: b,
            "class": "SimpleState"
        }]
    }
});