define([], function() {
    var a = 11,
        b = 20,
        c = 1018001,
        d = 1018002,
        e = 1018003,
        f = 1018004,
        g = FF.ns.battle,
        h = g.Conf.BUDDY_ID;
    FF.ns.battle.ai.conf[41302651] = {
        startStateId: b,
        states: [{
            id: b,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: a,
                abilityId: g.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            messageId: c,
                            buddyIds: [h.LIGHTNING, h.SAZH]
                        }],
                        [{
                            messageId: d,
                            buddyIds: [h.LIGHTNING, h.SAZH]
                        }],
                        [{
                            messageId: e,
                            buddyIds: [h.LIGHTNING, h.SAZH]
                        }],
                        [{
                            messageId: f,
                            buddyIds: [h.LIGHTNING, h.SAZH]
                        }]
                    ]
                }
            }
        }, {
            id: a
        }]
    }
});