define([], function() {
    var a = 10,
        b = 11,
        c = 12,
        d = 13,
        e = 14,
        f = 22,
        g = [b, f],
        h = [1, 1],
        i = 1,
        j = [2, 3, 4, 5],
        k = 102031,
        l = 102052,
        m = 1000101,
        n = 1000201,
        o = FF.ns.battle;
    FF.ns.battle.ai.conf[40400751] = {
        startStateId: a,
        globalRegister: {
            stateIds: g
        },
        states: [{
            id: a,
            "class": "InitState",
            memberValues: {
                nextStateId: b,
                visible: {
                    visibleNo: [].concat(i, j)
                }
            }
        }, {
            id: b,
            memberValues: {},
            inState: function() {
                this._turnCount = 0
            },
            update: function() {
                var a = this._executer,
                    b = a.getChild(i);
                b.isReadyToSelectAbility() && (this._turnCount < 1 && b.registerAbility(k), this._turnCount++), _.each(j, function(b) {
                    var c = a.getChild(b);
                    c.isReadyToSelectAbility() && c.lotAndRegisterAbility()
                }, this), this._isAlone = _.all(j, function(b) {
                    return a.getChild(b).isDead()
                })
            },
            transitions: [{
                nextStateLot: h,
                condition: {
                    canTransition: function() {
                        return this.parent.parent._turnCount > 1 ? !0 : !1
                    }
                }
            }, {
                nextStateId: d,
                condition: {
                    canTransition: function() {
                        return this.parent.parent._isAlone ? !0 : !1
                    }
                }
            }]
        }, {
            id: f,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: c,
                abilityId: o.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    id: i,
                    messageId: m
                }
            }
        }, {
            id: c,
            memberValues: {},
            inState: function() {
                this._drainExecInfo = {}
            },
            outState: function() {
                this._executer.getChild(i).reset(), this._drainExecInfo = {}
            },
            update: function() {
                var a = this._executer;
                _.each(j, function(b) {
                    var c = a.getChild(b);
                    if (c.isReadyToSelectAbility())
                        if (this._drainExecInfo[b]) c.lotAndRegisterAbility();
                        else {
                            var d = c.registerAbility(l);
                            this._drainExecInfo[b] = d
                        }
                }, this), this._isAllExecDrain = _.all(j, function(b) {
                    if (a.getChild(b).isDead()) return !0;
                    var c = this._drainExecInfo[b];
                    return c && c.isDone() ? !0 : !1
                }, this), this._isAlone = _.all(j, function(b) {
                    return a.getChild(b).isDead()
                })
            },
            transitions: [{
                nextStateLot: h,
                condition: {
                    canTransition: function() {
                        return this.parent.parent._isAllExecDrain ? !0 : !1
                    }
                }
            }, {
                nextStateId: d,
                condition: {
                    canTransition: function() {
                        return this.parent.parent._isAlone ? !0 : !1
                    }
                }
            }]
        }, {
            id: d,
            update: function() {
                var a = this._executer,
                    b = a.getChild(i);
                b.isReadyToSelectAbility() && b.lotAndRegisterAbility()
            }
        }, {
            id: e
        }],
        notifyJudgedDeath: function(a) {
            if (this._dyingAbility) return this._dyingAbility.isDone() ? (this._dyingAbility = void 0, this.changeState(b), !0) : !1;
            var c = _.first(_.filter(a, function(a) {
                return a.get("no") === i
            }, this));
            return c ? (this._dyingAbility = o.Commander.getInstance().register(o.Conf.ABILITY_ID_OF.DEFORM, c, {
                messageId: n
            }, {
                interruptBoss: !0
            }), this.changeState(e), !1) : !0
        }
    }
});