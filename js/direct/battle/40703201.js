define([], function() {
    var a = 10,
        b = 11,
        c = 12,
        d = 13,
        e = 1017621,
        f = 1017631,
        g = 4070322,
        h = 402006,
        i = 2,
        j = FF.ns.battle,
        k = function() {
            var a = this._executer,
                b = this.parent.globalRegister;
            if (a.isReadyToSelectAbility()) {
                if (b.canonBeamCount >= 1) return a.registerAbility(h), void(b.canonBeamCount = 0);
                var c = a.lotAbility();
                c === h ? (j.Commander.getInstance().register(j.Conf.ABILITY_ID_OF.DEFORM, a, {
                    messageId: e
                }, {
                    interruptBoss: !0
                }), a.reset(), b.canonBeamCount++) : a.registerAbility(c)
            }
        };
    FF.ns.battle.ai.conf[40703201] = {
        notifyJudgedDeath: function() {
            var a = this._executer.container.getChild(i);
            return a.kill(), !0
        },
        startStateId: a,
        globalRegister: {
            canonBeamCount: 0
        },
        states: [{
            id: a,
            "class": "InitState",
            memberValues: {
                nextStateId: d
            }
        }, {
            id: d,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: b,
                abilityId: j.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    messageId: f
                }
            }
        }, {
            id: b,
            update: k,
            updateTransition: function() {
                var a = void 0,
                    b = this._executer.container.getChild(i);
                return b.isDead() && (a = c), a
            }
        }, {
            id: c,
            inState: ["CHANGE_PARAM"],
            memberValues: {
                paramId: g
            },
            update: k
        }]
    }
});