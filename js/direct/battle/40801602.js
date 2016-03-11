define([], function() {
    var a = 10,
        b = 11,
        c = 20,
        d = 21,
        e = 30,
        f = 31,
        g = 1012603,
        h = 1012604,
        i = 4080162,
        j = FF.ns.battle;
    FF.ns.battle.ai.conf[40801602] = {
        notifyJudgedDeath: function() {
            return this.isCurrentState(f) ? !0 : this.isCurrentState(e) ? !1 : (this.changeState(e), !1)
        },
        startStateId: a,
        globalRegister: {},
        states: [{
            id: a,
            "class": "InitState",
            memberValues: {
                nextStateId: b,
                paramId: i
            }
        }, {
            id: b,
            "class": "SimpleState",
            transitions: [{
                nextStateId: c,
                condition: {
                    "class": "DamageTransitCondition",
                    args: {
                        all: !0,
                        damagedOnly: !0
                    }
                }
            }]
        }, {
            id: c,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: d,
                abilityId: j.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            messageId: g
                        }]
                    ]
                }
            }
        }, {
            id: d,
            "class": "SimpleState"
        }, {
            id: e,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: f,
                abilityId: j.Conf.ABILITY_ID_OF.DEFORM_MULTI,
                abilityOptions: {
                    sequence: [
                        [{
                            messageId: h
                        }]
                    ]
                }
            }
        }, {
            id: f
        }]
    }
});