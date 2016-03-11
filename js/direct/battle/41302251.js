define([], function() {
    var a = 10,
        b = 11,
        c = 12,
        d = 13,
        e = 14,
        f = 15,
        g = 16,
        h = 20,
        i = 21,
        j = 30,
        k = 31,
        l = 32,
        m = 40,
        n = 41302201,
        o = 1017001,
        p = 21306202,
        q = 21306205,
        r = 21306206,
        s = 21306207,
        t = 21306208,
        u = 21306209,
        v = 4130221,
        w = 4130222,
        x = [4130223, 4130224, 4130225],
        y = [4130226, 4130227, 4130228],
        z = 402093,
        A = 401954,
        B = 401955,
        C = 1,
        D = 2,
        E = 3,
        F = [D, E],
        G = 6,
        H = FF.ns.battle,
        I = H.Conf.BUDDY_ID;
    FF.ns.battle.ai.conf[41302251] = {
        initialInvisibleNos: [C],
        notifyJudgedDeath: function(a) {
            var b = _.find(a, function(a) {
                return a.get("no") === D || a.get("no") === E
            });
            if (b) {
                var c = this._executer,
                    d = _.all(F, function(a) {
                        return c.getChild(a).isDead() || c.getChild(a).judgeDeath()
                    });
                d && !this.isCurrentState(h) && this.changeState(h)
            }
            return !0
        },
        startStateId: a,
        globalRegister: {
            magicAmplificationCount: 0
        },
        states: [{
            id: a,
            "class": "InitState",
            inState: ["CHANGE_PARAM_MULTI"],
            memberValues: {
                nextStateId: d,
                visible: {
                    visibleNo: [C, D, E]
                },
                childParams: [{
                    id: C,
                    paramId: v
                }, {
                    id: D,
                    paramId: x[0]
                }, {
                    id: E,
                    paramId: y[0]
                }]
            },
            updateTransition: function() {
                var a = H.ai.state.InitState.prototype.updateTransition.apply(this, arguments);
                if (a) {
                    var c = H.ActorMgr.getAllBuddies(),
                        d = 3 === c.length,
                        e = _.find(c, function(a) {
                            return a.getId() === I.LIGHTNING
                        });
                    if (d && e) return b
                }
                return a
            }
        }, {
            id: b,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: d,
                abilityId: H.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            messageId: n
                        }]
                    ]
                }
            }
        }, {
            id: d,
            update: function() {
                var a = this._executer.getChild(C);
                a.isReadyToSelectAbility() && a.lotAndRegisterAbility()
            },
            transitions: [{
                nextStateId: e,
                condition: {
                    "class": "TurnTransitCondition",
                    args: {
                        id: C,
                        turn: G
                    }
                }
            }]
        }, {
            id: e,
            inState: function() {
                var a = this._executer.getChild(C);
                a.reset()
            },
            update: function() {
                this._nextStateId = void 0;
                var a = this._executer.getChild(C);
                a.isReadyToSelectAbility() && (this._nextStateId = f)
            },
            updateTransition: function() {
                return this._nextStateId ? this._nextStateId : H.ai.State.prototype.updateTransition.apply(this, arguments)
            }
        }, {
            id: f,
            "class": "InterruptAbility",
            inState: function() {
                this._memberValues.nextStateId = void 0;
                var a = this.parent.globalRegister;
                a.magicAmplificationCount++;
                var b = a.magicAmplificationCount;
                return this._memberValues.nextStateId = 1 >= b ? d : g, this._memberValues.childParams = [{
                    id: D,
                    paramId: x[b]
                }, {
                    id: E,
                    paramId: y[b]
                }], H.ai.state.InterruptAbility.prototype.inState.apply(this, arguments)
            },
            outState: ["CHANGE_PARAM_MULTI", "RESET"],
            memberValues: {
                nextStateId: void 0,
                abilityId: H.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            messageId: o
                        }],
                        [{
                            animationId: p
                        }]
                    ]
                },
                childParams: [{
                    id: D,
                    paramId: x[1]
                }, {
                    id: E,
                    paramId: y[1]
                }]
            }
        }, {
            id: g,
            update: function() {
                var a = this._executer.getChild(C);
                a.isReadyToSelectAbility() && a.lotAndRegisterAbility()
            }
        }, {
            id: h,
            "class": "InterruptAbility",
            inState: ["CHANGE_PARAM", "UNSET_SA"],
            outState: ["RESET"],
            memberValues: {
                nextStateId: c,
                id: C,
                paramId: w,
                sa: H.Conf.STATUS_AILMENTS_TYPE.INVISIBLE,
                saChildNos: [C],
                abilityId: H.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    animationId: q
                }
            }
        }, {
            id: c,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: i,
                abilityId: z,
                abilityOptions: {
                    id: C
                }
            }
        }, {
            id: i,
            update: function() {
                this._nextStateId = void 0;
                var a = this._executer.getChild(C);
                if (a.isReadyToSelectAbility()) {
                    var b = a.lotAbility();
                    this._nextStateId = b === B ? j : b === A ? m : void 0, this._nextStateId || a.registerAbility(b)
                }
            },
            updateTransition: function() {
                return this._nextStateId ? this._nextStateId : H.ai.State.prototype.updateTransition.apply(this, arguments)
            }
        }, {
            id: j,
            "class": "InterruptAbility",
            outState: ["RESET"],
            memberValues: {
                nextStateId: k,
                abilityId: H.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    animationId: t
                }
            }
        }, {
            id: k,
            update: function() {
                this._nextStateId = void 0;
                var a = this._executer.getChild(C);
                a.isReadyToSelectAbility() && (this._nextStateId = l)
            },
            updateTransition: function() {
                return this._nextStateId ? this._nextStateId : H.ai.State.prototype.updateTransition.apply(this, arguments)
            }
        }, {
            id: l,
            "class": "InterruptMultipleAbility",
            outState: ["RESET"],
            memberValues: {
                nextStateId: i,
                abilityCount: 2,
                abilitySettingMap: {
                    1: {
                        abilityId: B,
                        abilityOptions: {
                            id: C
                        }
                    },
                    2: {
                        abilityId: H.Conf.ABILITY_ID_OF.DEFORM,
                        abilityOptions: {
                            id: C,
                            animationId: u
                        }
                    }
                }
            }
        }, {
            id: m,
            "class": "InterruptMultipleAbility",
            outState: ["RESET"],
            memberValues: {
                nextStateId: i,
                abilityCount: 3,
                abilitySettingMap: {
                    1: {
                        abilityId: H.Conf.ABILITY_ID_OF.DEFORM,
                        abilityOptions: {
                            id: C,
                            animationId: r
                        }
                    },
                    2: {
                        abilityId: A,
                        abilityOptions: {
                            id: C
                        }
                    },
                    3: {
                        abilityId: H.Conf.ABILITY_ID_OF.DEFORM,
                        abilityOptions: {
                            id: C,
                            animationId: s
                        }
                    }
                }
            }
        }]
    }
});