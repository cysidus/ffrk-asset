define([], function() {
    var a = 11,
        b = 12,
        c = 21,
        d = 22,
        e = 23,
        f = 31,
        g = 32,
        h = 33,
        i = 2080490101,
        j = 2080490102,
        k = "deformation_01",
        l = "deformation_02",
        m = "death",
        n = "soul_crush",
        o = [1, 2, 3, 4, 5],
        p = [6, 7, 8, 9, 10],
        q = [11, 12, 13, 14, 15],
        r = 12,
        s = 13,
        t = 15,
        u = [12, 13, 15],
        v = 50,
        w = "soul_crush_ability_done_for_ses1",
        x = "soul_crush_ability_done_for_ses2",
        y = "soul_crush_ability_done_for_ses3",
        z = "death_ability_done1",
        A = "death_ability_done2",
        B = "death_ability_done3",
        C = {};
    C[r] = w, C[s] = x, C[t] = y;
    var D = FF.ns.battle,
        E = D.Conf.BUDDY_ID.LAGUNA;
    FF.ns.battle.ai.conf[2080490151] = {
        startStateId: a,
        notifyJudgedDeath: function() {
            var a = this._executer,
                d = !1;
            if (this.isCurrentState(b)) {
                if (d = _.all(o, function(b) {
                        var c = a.getChild(b);
                        return c.isDead() || c.judgeDeath()
                    })) return this.changeState(c), !1
            } else if (this.isCurrentState(e) && (d = _.all(p, function(b) {
                    var c = a.getChild(b);
                    return c.isDead() || c.judgeDeath()
                }))) return this.changeState(f), !1;
            return !0
        },
        states: [{
            id: a,
            "class": "InitState",
            memberValues: {
                nextStateId: b,
                visible: {
                    visibleNo: o
                }
            }
        }, {
            id: b
        }, {
            id: c,
            inState: ["ENABLE", "SET_SA"],
            update: function() {
                var a = this._executer,
                    b = _.all(o, function(b) {
                        var c = a.getChild(b);
                        return c.isDead()
                    });
                b && this.setNextStateId(d)
            },
            transitions: [{
                "class": "NextStateIdTransition"
            }],
            memberValues: {
                sa: D.Conf.STATUS_AILMENTS_TYPE.INVISIBLE,
                saChildNos: p,
                visible: {
                    visibleNo: _.union(o, p)
                }
            }
        }, {
            id: d,
            "class": "InterruptAbility",
            inState: ["ENABLE"],
            outState: ["RESET", "SHUFFLE_ATB", "UNSET_SA"],
            memberValues: {
                sa: D.Conf.STATUS_AILMENTS_TYPE.INVISIBLE,
                saChildNos: p,
                nextStateId: e,
                abilityId: D.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            deformTag: k
                        }],
                        [{
                            messageId: i,
                            buddyId: E
                        }]
                    ]
                },
                visible: {
                    visibleNo: p
                }
            }
        }, {
            id: e
        }, {
            id: f,
            inState: ["ENABLE", "SET_SA"],
            update: function() {
                var a = this._executer,
                    b = _.all(p, function(b) {
                        var c = a.getChild(b);
                        return c.isDead()
                    });
                b && this.setNextStateId(g)
            },
            transitions: [{
                "class": "NextStateIdTransition"
            }],
            memberValues: {
                sa: D.Conf.STATUS_AILMENTS_TYPE.INVISIBLE,
                saChildNos: q,
                visible: {
                    visibleNo: _.union(p, q)
                }
            }
        }, {
            id: g,
            "class": "InterruptAbility",
            inState: ["ENABLE"],
            outState: ["RESET", "SHUFFLE_ATB", "UNSET_SA"],
            memberValues: {
                sa: D.Conf.STATUS_AILMENTS_TYPE.INVISIBLE,
                saChildNos: q,
                nextStateId: h,
                abilityId: D.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            deformTag: l
                        }],
                        [{
                            messageId: j,
                            buddyId: E
                        }]
                    ]
                },
                visible: {
                    visibleNo: q
                }
            }
        }, {
            id: h,
            inState: function() {
                this._soulCrushExecInfo = {}, this._isExecDeath = !1
            },
            update: function() {
                var a = this._executer;
                (this.getConditionFlagInFrame(z) || this.getConditionFlagInFrame(A) || this.getConditionFlagInFrame(B)) && (this._isExecDeath = !0), _.each(u, function(b) {
                    this.getConditionFlagInFrame(C[b]) && (this._soulCrushExecInfo[b] = !0);
                    var c = a.getChild(b);
                    if (c.isReadyToSelectAbility()) {
                        var d = _.filter(u, function(b) {
                            return a.getChild(b).isAlive()
                        });
                        !this._soulCrushExecInfo[b] && c.getRemainingHpRate() <= v ? c.registerAbilityByTag(n, {
                            ignoreCalcDamagedRateScore: !0
                        }) : this._isExecDeath || 1 !== d.length ? c.lotAndRegisterAbility() : c.registerAbilityByTag(m)
                    }
                }, this)
            },
            conditionFlags: [{
                conditionFlagTag: w,
                condition: {
                    "class": "AbilityCountTransitCondition",
                    args: {
                        id: r,
                        abilityTag: [n],
                        whenDone: !0,
                        count: 1
                    }
                }
            }, {
                conditionFlagTag: x,
                condition: {
                    "class": "AbilityCountTransitCondition",
                    args: {
                        id: s,
                        abilityTag: [n],
                        whenDone: !0,
                        count: 1
                    }
                }
            }, {
                conditionFlagTag: y,
                condition: {
                    "class": "AbilityCountTransitCondition",
                    args: {
                        id: t,
                        abilityTag: [n],
                        whenDone: !0,
                        count: 1
                    }
                }
            }, {
                conditionFlagTag: z,
                condition: {
                    "class": "AbilityCountTransitCondition",
                    args: {
                        id: r,
                        abilityTag: [m],
                        whenDone: !0,
                        count: 1
                    }
                }
            }, {
                conditionFlagTag: A,
                condition: {
                    "class": "AbilityCountTransitCondition",
                    args: {
                        id: s,
                        abilityTag: [m],
                        whenDone: !0,
                        count: 1
                    }
                }
            }, {
                conditionFlagTag: B,
                condition: {
                    "class": "AbilityCountTransitCondition",
                    args: {
                        id: t,
                        abilityTag: [m],
                        whenDone: !0,
                        count: 1
                    }
                }
            }]
        }]
    }
});