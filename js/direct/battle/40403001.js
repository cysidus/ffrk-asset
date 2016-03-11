define([], function() {
    var a = FF.ns.battle,
        b = 4040301,
        c = 10,
        d = 11,
        e = 12,
        f = 1007701,
        g = 10400100;
    FF.ns.battle.ai.conf[40403001] = {
        startStateId: c,
        globalRegister: {},
        states: [{
            id: c,
            "class": "InitState",
            memberValues: {
                paramId: b,
                overrideActorParam: {}
            },
            updateTransition: function() {
                var b = _.any(a.ActorMgr.getAliveBuddies(), function(a) {
                    return a.getId() === g
                });
                return b ? d : e
            }
        }, {
            id: d,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: e,
                abilityId: a.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    messageId: f
                }
            }
        }, {
            id: e,
            "class": "SimpleState"
        }]
    }
});