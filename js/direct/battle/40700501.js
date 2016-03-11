define(["util"], function(a) {
    var b = [2, 3, 4],
        c = 10,
        d = 11,
        e = 21,
        f = 80,
        g = 20700502,
        h = 1010701,
        i = FF.ns.battle;
    FF.ns.battle.ai.conf[40700501] = {
        notifyJudgedDeath: function() {
            return _.each(this._executer.container.getChildren(), function(a) {
                a.kill()
            }), !0
        },
        startStateId: c,
        globalRegister: {},
        states: [{
            id: c,
            "class": "InitState",
            memberValues: {
                nextStateId: d
            }
        }, {
            id: d,
            update: function() {
                this._nextStateId = void 0;
                var c = this._executer;
                if (c.isReadyToSelectAbility()) {
                    var d = _.any(b, function(a) {
                        return this._executer.container.getChild(a).isDead()
                    }, this);
                    d && a.lotByFraction(f) ? this._nextStateId = e : c.lotAndRegisterAbility()
                }
            },
            updateTransition: function() {
                return this._nextStateId
            }
        }, {
            id: e,
            "class": "InterruptAbility",
            inState: ["RECOVER"],
            outState: ["RESET", "SHUFFLE_ATB"],
            memberValues: {
                recover: {
                    recoverNo: b
                },
                nextStateId: d,
                abilityId: i.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    animationId: g,
                    messageId: h
                }
            }
        }]
    }
});