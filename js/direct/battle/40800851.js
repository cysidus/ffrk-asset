define(["util"], function(a) {
    var b = 1,
        c = 2,
        d = 10,
        e = 11,
        f = 12,
        g = 21,
        h = 22,
        i = 201266,
        j = 30,
        k = 1011601,
        l = 1011602,
        m = 1011603,
        n = 1011604,
        o = 1011605,
        p = FF.ns.battle;
    FF.ns.battle.ai.conf[40800851] = {
        startStateId: d,
        globalRegister: {
            dyingMessageId: 0
        },
        states: [{
            id: d,
            "class": "InitState",
            memberValues: {
                visible: {
                    visibleNo: [b, c]
                },
                nextStateId: e
            }
        }, {
            id: e,
            update: function() {
                this._nextStateId = 0;
                var d = this._executer,
                    e = d.getChild(b),
                    f = d.getChild(c);
                if (this._isLaunchingPairAttack) return e.isAlive() && e.canDoAbility() && f.isAlive() && f.canDoAbility() || (this._isLaunchingPairAttack = !1), void(e.isReadyToSelectAbility() && f.isReadyToSelectAbility() && (this._nextStateId = g, this._isLaunchingPairAttack = !1));
                if (e.isReadyToSelectAbility()) {
                    if (a.lotByFraction(j) && f.isAlive() && f.canDoAbility()) return void(this._isLaunchingPairAttack = !0);
                    e.lotAndRegisterAbility()
                }
                f.isReadyToSelectAbility() && f.lotAndRegisterAbility()
            },
            updateTransition: function() {
                return this._nextStateId
            }
        }, {
            id: g,
            "class": "InterruptAbility",
            outState: ["RESET"],
            memberValues: {
                nextStateId: e,
                abilityId: i,
                abilityOptions: {
                    id: b
                }
            }
        }, {
            id: h,
            "class": "InterruptAbility",
            inState: function() {
                var a = this.parent.globalRegister,
                    b = a.dyingMessageId;
                this._memberValues.abilityOptions.messageId = b, p.ai.state.InterruptAbility.prototype.inState.apply(this, arguments)
            },
            memberValues: {
                nextStateId: f,
                abilityId: p.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    messageId: 0
                }
            }
        }, {
            id: f
        }],
        notifyJudgedDeath: function(a) {
            if (this.isCurrentState(f)) return this.changeState(e), !0;
            if (!this.isCurrentState(h)) {
                var c = _.all(this._executer.getChildren(), function(a) {
                        return a.isAlive()
                    }),
                    d = a.length,
                    g = this.globalRegister;
                if (c && 2 === d) g.dyingMessageId = o;
                else if (c && 1 === d) g.dyingMessageId = a[0].get("no") === b ? k : m;
                else {
                    if (c || 1 !== d) {
                        var i = JSON.stringify(["isAllAlive", c, "dyingNum", d]);
                        throw new Error("unexpected notifyJudgedDeath. " + i)
                    }
                    g.dyingMessageId = a[0].get("no") === b ? l : n
                }
                this.changeState(h)
            }
            return !1
        }
    }
});