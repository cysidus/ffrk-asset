define([], function() {
    var a = 10,
        b = 11,
        c = 12,
        d = 13,
        e = 14,
        f = 21,
        g = 22,
        h = 23,
        i = 20400502,
        j = 20400503,
        k = 1,
        l = 2,
        m = [3, 4, 5, 6, 7, 8],
        n = 201032,
        o = 1006801,
        p = {};
    p[l] = {}, p[l][n] = j;
    var q = function(a, b) {
            return _.find(a, function(a) {
                return _.isArray(b) ? _.find(b, function(b) {
                    return a.get("no") === b
                }) : a.get("no") === b
            })
        },
        r = FF.ns.battle;
    FF.ns.battle.ai.conf[40400451] = {
        startStateId: a,
        globalRegister: {},
        states: [{
            id: a,
            "class": "InitState",
            memberValues: {
                nextStateId: b,
                visible: {
                    visibleNo: [k]
                },
                abilityDeformMap: p
            }
        }, {
            id: b,
            memberValues: {},
            transitions: [{
                nextStateId: f,
                condition: [{
                    canTransition: "HP",
                    args: {
                        id: k,
                        underOrEqual: 90
                    }
                }]
            }]
        }, {
            id: f,
            "class": "InterruptAbility",
            inState: ["ENABLE", "UNSET_ALL_SA"],
            outState: ["RESET", "SET_SA"],
            memberValues: {
                visible: {
                    visibleNo: [k, l]
                },
                sa: r.Conf.STATUS_AILMENTS_TYPE.DISABLE,
                saChildNos: [k],
                nextStateId: c,
                abilityId: r.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    id: k,
                    animationId: i
                }
            }
        }, {
            id: c,
            memberValues: {},
            transitions: [{
                nextStateId: g,
                condition: {
                    "class": "TurnTransitCondition",
                    args: {
                        id: l,
                        turn: 1
                    }
                }
            }]
        }, {
            id: g,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: d,
                abilityId: r.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    id: l,
                    messageId: o
                }
            }
        }, {
            id: d,
            memberValues: {},
            transitions: [{
                nextStateId: h,
                condition: {
                    "class": "TurnTransitCondition",
                    args: {
                        id: l,
                        turn: 1
                    }
                }
            }]
        }, {
            id: h,
            "class": "InterruptAbility",
            inState: ["ENABLE", "UNSET_ALL_SA"],
            outState: ["RESET", "SHUFFLE_ATB", "SET_SA"],
            memberValues: {
                visible: {
                    visibleNo: [l].concat(m)
                },
                sa: r.Conf.STATUS_AILMENTS_TYPE.DISABLE,
                saChildNos: [l],
                nextStateId: e,
                abilityId: n,
                abilityOptions: {
                    id: l,
                    usesMainNode: !0
                }
            }
        }, {
            id: e,
            memberValues: {},
            transitions: []
        }],
        notifyJudgedDeath: function(a) {
            var i = q(a, k),
                j = q(a, l),
                n = q(a, m);
            if (n) {
                var o = _.filter(m, function(a) {
                    var b = this._executer.getChild(a);
                    return b.isAlive() && !b.judgeDeath()
                }, this);
                o.length < 1 && _.each(this._executer.getChildren(), function(a) {
                    a.kill()
                })
            } else {
                if (i) return this.isCurrentState(c) ? !0 : (this.isCurrentState(b) && this.changeState(f), !1);
                if (j) return this.isCurrentState(e) ? !0 : ((this.isCurrentState(c) || this.isCurrentState(d) || this.isCurrentState(g)) && this.changeState(h), !1)
            }
            return !0
        }
    }
});