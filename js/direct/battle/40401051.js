define(["util"], function(a) {
    var b = 10,
        c = 11,
        d = 21,
        e = 22,
        f = 23,
        g = 20400902,
        h = 1,
        i = 2,
        j = 3,
        k = 103003,
        l = 1007301,
        m = 50,
        n = FF.ns.battle;
    FF.ns.battle.ai.conf[40401051] = {
        startStateId: b,
        globalRegister: {
            unuseProperty: void 0
        },
        states: [{
            id: b,
            "class": "InitState",
            memberValues: {
                nextStateId: c,
                visible: {
                    visibleNo: [h, i, j]
                }
            }
        }, {
            id: c,
            update: function() {
                this._nextStateId = 0;
                var b = this._executer,
                    c = b.getChild(h),
                    g = b.getChild(i),
                    k = b.getChild(j);
                c.isReadyToSelectAbility() && (g.isDead() && k.isDead() && a.lotByFraction(m) ? (this._nextStateId = d, c.reset()) : c.lotAndRegisterAbility()), c.isDead() && (k.isAlive() ? this._nextStateId = f : g.isAlive() && (this._nextStateId = e))
            },
            updateTransition: function() {
                return this._nextStateId
            }
        }, {
            id: d,
            "class": "InterruptAbility",
            inState: ["RECOVER_ENABLE"],
            outState: ["RESET"],
            memberValues: {
                visible: {
                    visibleNo: [i, j]
                },
                nextStateId: c,
                abilityId: n.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    animationId: g,
                    messageId: l
                }
            }
        }, {
            id: e,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: c,
                abilityId: k,
                abilityOptions: {
                    id: i
                }
            }
        }, {
            id: f,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: c,
                abilityId: k,
                abilityOptions: {
                    id: j
                }
            }
        }]
    }
});