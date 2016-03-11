define([], function() {
    var a = 10,
        b = 11,
        c = 12,
        d = 13,
        e = 1013801,
        f = 4120081,
        g = 4120082,
        h = 102061,
        i = 201404,
        j = 11200500,
        k = FF.ns.battle;
    FF.ns.battle.ai.conf[41200701] = {
        startStateId: a,
        states: [{
            id: a,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: b,
                abilityId: k.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            messageId: e,
                            buddyId: j
                        }]
                    ]
                }
            }
        }, {
            id: b,
            "class": "SimpleState",
            inState: ["CHANGE_PARAM"],
            memberValues: {
                paramId: f
            },
            transitions: [{
                nextStateId: c,
                condition: [{
                    "class": "DamageTransitCondition",
                    canTransition: "HP",
                    args: {
                        underOrEqual: 60
                    }
                }]
            }]
        }, {
            id: c,
            "class": "InterruptMultipleAbility",
            inState: ["CHANGE_PARAM"],
            memberValues: {
                paramId: g,
                nextStateId: d,
                abilityCount: 2,
                abilitySettingMap: {
                    1: {
                        abilityId: h
                    },
                    2: {
                        abilityId: i
                    }
                }
            }
        }, {
            id: d,
            "class": "SimpleState"
        }]
    }
});