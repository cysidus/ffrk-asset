define([], function() {
    var a = 11,
        b = 13,
        c = 14,
        d = 15,
        e = 16,
        f = 17,
        g = 2080490301,
        h = "deformation_01",
        i = "deformation_02",
        j = "deformation_03",
        k = 208049031,
        l = 208049032,
        m = 208049033,
        n = "energy_bomber",
        o = "ultima",
        p = "meteor",
        q = "shell",
        r = 70,
        s = 40,
        t = 1,
        u = FF.ns.battle,
        v = 1,
        w = 2,
        x = 3,
        y = {};
    y[v] = [{
        abilityTag: q,
        turn: 1,
        checkReflect: !0
    }], y[w] = [{
        abilityTag: o,
        turn: 1
    }], y[x] = [{
        abilityTag: o,
        turn: 1,
        loop: 5
    }, {
        abilityTag: p,
        turn: 4,
        loop: 5
    }];
    var z = {};
    z[t] = {}, z[t][n] = j;
    var A = function(a, b) {
            for (var c = a.currAdelPhase, d = a.currTurnInAdelPhase, e = void 0, f = y[c], g = 0; g < f.length; g++) {
                var h = f[g];
                if (!h.checkReflect || !b.isInReflection()) {
                    if (d === h.turn) {
                        e = b.getAbilityIdByTag(h.abilityTag);
                        break
                    }
                    if (d > h.turn && (d - h.turn) % h.loop === 0) {
                        e = b.getAbilityIdByTag(h.abilityTag);
                        break
                    }
                }
            }
            if (!e) {
                var i = b.getWithoutAbilityList({
                    forceIgnoresReflection: !1
                });
                e = b.lotAbilityWithout(i)
            }
            return e
        },
        B = function(a, b) {
            a.currAdelPhase = b, a.currTurnInAdelPhase = 1
        },
        C = function() {
            var a = this._executer,
                b = this.parent.globalRegister;
            if (this.getConditionFlagInFrame(E) && b.currTurnInAdelPhase++, a.isReadyToSelectAbility()) {
                var c = A(b, a);
                c === a.getAbilityIdByTag(o) && a.registerInterruptAbility(u.Conf.ABILITY_ID_OF.DEFORM, {
                    messageId: g
                }), a.registerAbility(c)
            }
        },
        D = {
            currAdelPhase: v,
            currTurnInAdelPhase: 1
        },
        E = "ability_done",
        F = {
            conditionFlagTag: E,
            condition: {
                "class": "AbilityCountTransitCondition",
                args: {
                    anyAbilities: !0,
                    whenDone: !0,
                    count: 1
                }
            }
        };
    FF.ns.battle.ai.conf[2080490301] = {
        startStateId: a,
        globalRegister: D,
        states: [{
            id: a,
            "class": "InitState",
            memberValues: {
                paramId: k,
                nextStateId: b,
                abilityDeformMapTag: z
            }
        }, {
            id: b,
            inState: [function(a) {
                var b = this.parent.globalRegister;
                B(b, v), a()
            }],
            update: C,
            transitions: [{
                nextStateId: e,
                condition: [{
                    canTransition: "HP",
                    args: {
                        underOrEqual: s
                    }
                }]
            }, {
                nextStateId: c,
                condition: [{
                    canTransition: "HP",
                    args: {
                        underOrEqual: r
                    }
                }]
            }],
            conditionFlags: [F]
        }, {
            id: d,
            update: C,
            transitions: [{
                nextStateId: e,
                condition: [{
                    canTransition: "HP",
                    args: {
                        underOrEqual: s
                    }
                }]
            }],
            conditionFlags: [F]
        }, {
            id: f,
            update: C,
            conditionFlags: [F]
        }, {
            id: c,
            "class": "InterruptMultipleAbility",
            inState: ["CHANGE_PARAM", function() {
                var a = 0,
                    b = {},
                    c = this._executer,
                    d = this.parent.globalRegister;
                return B(d, w), b[++a] = {
                    abilityId: u.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                    abilityOptions: {
                        sequence: [
                            [{
                                deformTag: h
                            }]
                        ]
                    }
                }, c.isInReflection() || (b[++a] = {
                    abilityTag: q
                }), this._memberValues.abilitySettingMap = b, this._memberValues.abilityCount = a, u.ai.state.InterruptMultipleAbility.prototype.inState.apply(this, arguments)
            }],
            outState: ["RESET"],
            memberValues: {
                paramId: l,
                nextStateId: d,
                abilityCount: void 0,
                abilitySettingMap: void 0
            }
        }, {
            id: e,
            "class": "InterruptMultipleAbility",
            inState: ["CHANGE_PARAM", function() {
                var a = 0,
                    b = {},
                    c = this._executer,
                    d = this.parent.globalRegister;
                return B(d, x), b[++a] = {
                    abilityId: u.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                    abilityOptions: {
                        sequence: [
                            [{
                                deformTag: i
                            }]
                        ]
                    }
                }, c.isInReflection() || (b[++a] = {
                    abilityTag: q
                }), this._memberValues.abilitySettingMap = b, this._memberValues.abilityCount = a, u.ai.state.InterruptMultipleAbility.prototype.inState.apply(this, arguments)
            }],
            outState: ["RESET"],
            memberValues: {
                paramId: m,
                nextStateId: f,
                abilityCount: void 0,
                abilitySettingMap: void 0
            }
        }]
    }
});