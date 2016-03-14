define([], function() {
    var a = 10,
        b = 11,
        c = 12,
        d = 13,
        e = 14,
        f = 15,
        g = 2090340301,
        h = 2090340302,
        i = 20901910,
        j = 20901914,
        k = 20901913,
        l = 20901911,
        m = 20901909,
        n = 20901912,
        o = 209034031,
        p = 209034032,
        q = 209034033,
        r = {};
    r[c] = {}, r[b] = {}, r[d] = {}, r[c][b] = k, r[c][d] = l, r[b][c] = i, r[b][d] = j, r[d][b] = m, r[d][c] = n;
    var s = [b, c, d],
        t = {
            nextStateId: e,
            condition: {
                "class": "TurnTransitCondition",
                args: {
                    lot: [20, 80]
                }
            },
            transit: function(a, b) {
                var c = this.parent.parent.globalRegister,
                    e = b.getMemberValues(),
                    f = c.lastStateId,
                    g = _.without(s, f),
                    i = _.sample(g),
                    j = r[f][i];
                if (!j) throw new Error(sprintf("undefined animation id. LAST_STATE:%s NEXT_STATE:%s", f, i));
                var k = [
                    [{
                        animationId: j
                    }]
                ];
                d === i && k.unshift([{
                    messageId: h
                }]), c.lastStateId = i, e.nextStateId = i, e.abilityOptions.sequence = k
            }
        },
        u = {
            nextStateId: f,
            condition: {
                "class": "DamageTransitCondition",
                args: {
                    scope: "ANY",
                    evaluateFlgName: "isFaraway"
                }
            },
            transit: function(a, b) {
                var c = b.getMemberValues();
                c.nextStateId = a.getStateId()
            }
        },
        v = FF.ns.battle;
    FF.ns.battle.ai.conf[2090340301] = {
        globalRegister: {
            lastStateId: d
        },
        startStateId: a,
        states: [{
            id: a,
            "class": "InitState",
            memberValues: {
                nextStateId: d
            }
        }, {
            id: b,
            "class": "SimpleState",
            inState: ["CHANGE_PARAM", "SET_SA"],
            memberValues: {
                paramId: o,
                sa: v.Conf.STATUS_AILMENTS_TYPE.FARAWAY
            },
            transitions: [u, t]
        }, {
            id: c,
            "class": "SimpleState",
            inState: ["CHANGE_PARAM", "SET_SA"],
            memberValues: {
                paramId: p,
                sa: v.Conf.STATUS_AILMENTS_TYPE.FARAWAY
            },
            transitions: [u, t]
        }, {
            id: d,
            "class": "SimpleState",
            inState: ["CHANGE_PARAM", "UNSET_SA"],
            memberValues: {
                paramId: q,
                sa: v.Conf.STATUS_AILMENTS_TYPE.FARAWAY
            },
            transitions: [t]
        }, {
            id: e,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: void 0,
                abilityId: v.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: void 0,
                    shouldDeformAllNodes: !0
                }
            }
        }, {
            id: f,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: void 0,
                abilityId: v.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            messageId: g
                        }]
                    ]
                }
            }
        }]
    }
});