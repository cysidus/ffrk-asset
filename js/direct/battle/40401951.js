define(["util"], function(a) {
    var b = 1,
        c = 2,
        d = 3,
        e = 10,
        f = 11,
        g = 21,
        h = 22,
        i = 23,
        j = 24,
        k = 25,
        l = 26,
        m = 27,
        n = 1009701,
        o = 1009702,
        p = 1009703,
        q = 1009704,
        r = 1009705,
        s = 102054,
        t = 102012,
        u = 102022,
        v = 102032,
        w = function() {
            return a.lot([t, u, v], function() {
                return 100
            })
        },
        x = {};
    x[t] = j, x[u] = k, x[v] = l;
    var y = 20401502,
        z = 30,
        A = 50,
        B = {
            nextStateId: f,
            abilityOptions: {
                id: d,
                activeTargetId: c
            }
        },
        C = FF.ns.battle;
    FF.ns.battle.ai.conf[40401951] = {
        startStateId: e,
        globalRegister: {},
        states: [{
            id: e,
            "class": "InitState",
            memberValues: {
                nextStateId: f
            }
        }, {
            id: f,
            update: function() {
                this._nextStateId = 0;
                var e = this._executer,
                    f = e.getChild(b),
                    h = e.getChild(c),
                    i = e.getChild(d);
                if (f.isReadyToSelectAbility()) {
                    var j = this._haveEverDeltaAttack ? z : 100;
                    if (h.isAlive() && i.isAlive() && !h.statusAilments.has(C.Conf.STATUS_AILMENTS_TYPE.REFLECTION) && a.lotByFraction(j)) return this._haveEverDeltaAttack = !0, this._nextStateId = g, void f.reset();
                    f.lotAndRegisterAbility()
                }
                if (h.isReadyToSelectAbility()) {
                    if (f.isDead() && i.isDead() && a.lotByFraction(A)) return this._nextStateId = m, void h.reset();
                    h.lotAndRegisterAbility()
                }
                i.isReadyToSelectAbility() && (h.isAlive() && h.statusAilments.has(C.Conf.STATUS_AILMENTS_TYPE.REFLECTION) ? i.registerAbility(w(), {
                    activeTarget: h
                }) : i.lotAndRegisterAbility())
            },
            updateTransition: function() {
                return this._nextStateId
            }
        }, {
            id: g,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: h,
                abilityId: C.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    id: b,
                    messageId: n
                }
            }
        }, {
            id: h,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: i,
                abilityId: s,
                abilityOptions: {
                    id: b,
                    activeTargetId: c
                }
            }
        }, {
            id: i,
            "class": "InterruptAbility",
            memberValues: {
                abilityId: C.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            messageId: o,
                            enemyNo: c
                        }],
                        [{
                            messageId: p,
                            enemyNo: d
                        }],
                        [{
                            messageId: q,
                            enemyNo: d
                        }]
                    ]
                }
            },
            updateTransition: function() {
                if (this._ability && this._ability.isDone()) {
                    this._ability = void 0;
                    var a = w();
                    return x[a]
                }
            }
        }, {
            id: j,
            "class": "InterruptAbility",
            outState: ["RESET"],
            memberValues: _.extend({
                abilityId: t
            }, B)
        }, {
            id: k,
            "class": "InterruptAbility",
            outState: ["RESET"],
            memberValues: _.extend({
                abilityId: u
            }, B)
        }, {
            id: l,
            "class": "InterruptAbility",
            outState: ["RESET"],
            memberValues: _.extend({
                abilityId: v
            }, B)
        }, {
            id: m,
            "class": "InterruptAbility",
            inState: ["RECOVER_ENABLE"],
            memberValues: {
                visible: {
                    visibleNo: [b, d]
                },
                nextStateId: f,
                abilityId: C.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            messageId: r,
                            enemyNo: c
                        }],
                        [{
                            animationId: y
                        }]
                    ]
                }
            }
        }]
    }
});