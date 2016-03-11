define([], function() {
    var a = 10,
        b = 11,
        c = 12,
        d = 13,
        e = 14,
        f = 402012,
        g = 20702402,
        h = 1,
        i = 2,
        j = FF.ns.battle;
    FF.ns.battle.ai.conf[40703802] = {
        startStateId: a,
        states: [{
            id: a,
            "class": "InitState",
            memberValues: {
                nextStateId: b
            }
        }, {
            id: b,
            "class": "SimpleState"
        }, {
            id: c,
            "class": "InterruptAbility",
            inState: ["RESET", "UNSET_ALL_SA", "SET_SA", "RECOVER"],
            memberValues: {
                nextStateId: d,
                abilityId: f,
                recover: {
                    recoverNo: [i]
                },
                sa: j.Conf.STATUS_AILMENTS_TYPE.INVISIBLE,
                saChildNos: [i]
            },
            updateTransition: function() {
                var a = j.ai.state.InterruptAbility.prototype.updateTransition.apply(this, arguments);
                if (a) {
                    var b = this._executer.container.getChild(h);
                    if (b.statusAilments.has(j.Conf.STATUS_AILMENTS_TYPE.INVISIBLE)) return e
                }
                return a
            }
        }, {
            id: d,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: e,
                abilityId: j.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    animationId: g
                }
            }
        }, {
            id: e
        }],
        notifyJudgedDeath: function() {
            return this.isCurrentState(e) ? !0 : (this.isCurrentState(b) && this.changeState(c), !1)
        }
    }
});