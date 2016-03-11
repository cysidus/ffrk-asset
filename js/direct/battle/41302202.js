define([], function() {
    var a = 10,
        b = 20,
        c = 21,
        d = 21306204,
        e = FF.ns.battle;
    FF.ns.battle.ai.conf[41302202] = {
        notifyJudgedDeath: function() {
            return this.isCurrentState(c) ? !0 : (this.isCurrentState(b) || this.changeState(b), !1)
        },
        startStateId: a,
        globalRegister: {},
        states: [{
            id: a,
            "class": "SimpleState"
        }, {
            id: b,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: c,
                abilityId: e.Conf.ABILITY_ID_OF.DEFORM,
                abilityOptions: {
                    animationId: d
                }
            }
        }, {
            id: c
        }]
    }
});