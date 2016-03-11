define(["util"], function(a) {
    var b = 10,
        c = 12,
        d = 13,
        e = 14,
        f = 15,
        g = 16,
        h = 17,
        i = 18,
        j = 19,
        k = 20502402,
        l = 20502403,
        m = 20502404,
        n = 20502405,
        o = 20502406,
        p = 20502407,
        q = 1,
        r = 2,
        s = 3,
        t = 4,
        u = [r, s, t],
        v = u.concat(q),
        w = {};
    w[r] = k, w[s] = m, w[t] = o;
    var x = {};
    x[r] = l, x[s] = n, x[t] = p;
    var y = .5,
        z = FF.ns.battle;
    FF.ns.battle.ai.conf[40501951] = {
        notifyJudgedDeath: function(a) {
            var b = _.find(a, function(a) {
                return a.get("no") === q
            });
            return b ? this.isCurrentState(j) ? (_.each(this._executer.getChildren(), function(a) {
                a.get("no") !== q && a.kill()
            }), !0) : (this.changeState(j), !1) : (this.changeState(i), !1)
        },
        startStateId: b,
        globalRegister: {
            childNoOfCurrentHole: s,
            isAppearance: !0
        },
        states: [{
            id: b,
            "class": "InitState",
            memberValues: {
                nextStateId: c,
                visible: {
                    visibleNo: _.without(v, s)
                }
            }
        }, {
            id: c,
            outState: function() {
                var a = z.ActorMgr.getActiveTarget(),
                    b = this._executer.getChild(q);
                return a && b.equals(a) && z.ActorMgr.clearActiveTarget(), z.ai.State.prototype.outState.apply(this, arguments)
            },
            update: function() {
                this._nextStateId = void 0;
                var b = this._executer.getChild(q);
                b.isReadyToSelectAbility() && (a.lotByProb(y) ? b.lotAndRegisterAbility() : this._nextStateId = e)
            },
            updateTransition: function() {
                return this._nextStateId ? this._nextStateId : z.ai.State.prototype.updateTransition.apply(this, arguments)
            }
        }, {
            id: e,
            "class": "InterruptAbility",
            inState: ["ENABLE", "RESET"],
            memberValues: {
                nextStateId: f,
                abilityId: z.Conf.ABILITY_ID_OF.DO_NOTHING,
                visible: {
                    visibleNo: u
                }
            }
        }, {
            id: f,
            "class": "InterruptAbility",
            inState: function() {
                var a = this.parent.globalRegister;
                a.isAppearance = !1;
                var b = a.childNoOfCurrentHole;
                return this._memberValues.abilityOptions.animationId = x[b], z.ai.state.InterruptAbility.prototype.inState.apply(this, arguments)
            },
            memberValues: {
                nextStateId: d,
                abilityId: z.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    animationId: void 0,
                    shouldDeformAllNodes: !0
                }
            }
        }, {
            id: g,
            "class": "InterruptAbility",
            inState: function() {
                var b = this.parent.globalRegister,
                    c = a.lot(u, function() {
                        return 100
                    });
                return b.childNoOfCurrentHole = c, this._memberValues.visible.visibleNo = _.without(v, c), z.ai.state.InterruptAbility.prototype.inState.apply(this, arguments)
            },
            outState: ["ENABLE", "RESET"],
            memberValues: {
                nextStateId: h,
                abilityId: z.Conf.ABILITY_ID_OF.DO_NOTHING,
                visible: {
                    visibleNo: void 0
                }
            }
        }, {
            id: h,
            "class": "InterruptAbility",
            inState: function() {
                this.parent.globalRegister.isAppearance = !0;
                var a = this.parent.globalRegister.childNoOfCurrentHole;
                return this._memberValues.abilityOptions.animationId = w[a], z.ai.state.InterruptAbility.prototype.inState.apply(this, arguments)
            },
            memberValues: {
                nextStateId: c,
                abilityId: z.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    animationId: void 0,
                    shouldDeformAllNodes: !0
                }
            }
        }, {
            id: d,
            transitions: [{
                nextStateId: g,
                condition: {
                    "class": "TurnTransitCondition",
                    args: {
                        id: r,
                        turn: 1
                    }
                }
            }]
        }, {
            id: i,
            inState: ["RECOVER", "UNSET_ALL_SA"],
            memberValues: {
                saChildNos: u,
                recover: {
                    recoverNo: u
                }
            },
            updateTransition: function() {
                return this.parent.globalRegister.isAppearance ? c : d
            }
        }, {
            id: j,
            inState: ["ENABLE"],
            memberValues: {
                visible: {
                    visibleNo: v
                }
            }
        }]
    }
});