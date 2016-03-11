define([], function() {
    var a = FF.ns.battle,
        b = 4040401,
        c = 10,
        d = 11,
        e = 12,
        f = 21,
        g = 1007401,
        h = 10400200;
    FF.ns.battle.ai.conf[40404001] = {
        startStateId: c,
        globalRegister: {},
        states: [{
            id: c,
            "class": "InitState",
            memberValues: {
                nextStateId: d,
                paramId: b,
                overrideActorParam: {}
            }
        }, {
            id: d,
            "class": "SimpleState",
            transitions: [{
                nextStateId: f,
                condition: {
                    "class": "TurnTransitCondition",
                    args: {
                        turn: 20
                    }
                }
            }]
        }, {
            id: f,
            update: function() {
                var b = this._executer;
                b.statusAilments.set(a.Conf.STATUS_AILMENTS_TYPE.INSTANT_DEATH, b)
            },
            updateTransition: function() {
                return d
            }
        }, {
            id: e
        }],
        notifyJudgedDeath: function() {
            if (!this.isCurrentState(e)) {
                this.changeState(e);
                var b = _.find(a.ActorMgr.getAliveBuddies(), function(a) {
                    return a.getId() === h
                });
                return b ? (this._dyingAbility = a.Commander.getInstance().register(a.Conf.ABILITY_ID_OF.DEFORM, this._executer, {
                    messageId: g
                }, {
                    interruptBoss: !0
                }), !1) : !0
            }
            return this._dyingAbility.isDone() ? (this._dyingAbility = void 0, !0) : !1
        }
    }
});