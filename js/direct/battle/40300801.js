define(["util"], function(a) {
    var b = 11,
        c = 12,
        d = 13,
        e = 14,
        f = 15,
        g = 21,
        h = 23,
        i = 24,
        j = 25,
        k = [h, i, j],
        l = 1012201,
        m = 1012202,
        n = 1012203,
        o = 1012204,
        p = 4030081,
        q = 4030082,
        r = 4030083,
        s = [10300100, 10300200, 10300300, 10399600],
        t = FF.ns.battle,
        u = function(a) {
            return _.some(a, function(a) {
                return _.contains(s, a.getId())
            })
        },
        v = {
            nextStateId: c,
            condition: {
                "class": "TurnTransitCondition",
                args: {
                    turn: 3
                }
            }
        };
    FF.ns.battle.ai.conf[40300801] = {
        startStateId: b,
        globalRegister: {
            lastStateId: void 0
        },
        states: [{
            id: b,
            "class": "InitState",
            updateTransition: function() {
                var a = t.ActorMgr.getAliveBuddies(),
                    b = u(a);
                return b ? g : c
            }
        }, {
            id: g,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: c,
                abilityId: t.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            messageId: l
                        }]
                    ]
                }
            }
        }, {
            id: c,
            updateTransition: function() {
                var b = this.parent.globalRegister.lastStateId,
                    c = _.filter(k, function(a) {
                        return b !== a
                    }),
                    d = a.lot(c, function() {
                        return 1
                    });
                return this.parent.globalRegister.lastStateId = d, d
            }
        }, {
            id: h,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: d,
                abilityId: t.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            messageId: o
                        }]
                    ]
                }
            }
        }, {
            id: d,
            "class": "SimpleState",
            inState: ["CHANGE_PARAM"],
            memberValues: {
                paramId: p
            },
            transitions: [v]
        }, {
            id: i,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: e,
                abilityId: t.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            messageId: n
                        }]
                    ]
                }
            }
        }, {
            id: e,
            "class": "SimpleState",
            inState: ["CHANGE_PARAM"],
            memberValues: {
                paramId: q
            },
            transitions: [v]
        }, {
            id: j,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: f,
                abilityId: t.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            messageId: m
                        }]
                    ]
                }
            }
        }, {
            id: f,
            "class": "SimpleState",
            inState: ["CHANGE_PARAM"],
            memberValues: {
                paramId: r
            },
            transitions: [v]
        }]
    }
});