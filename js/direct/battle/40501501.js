define([], function() {
    var a = 10,
        b = 12,
        c = 21,
        d = 1015801,
        e = 401915,
        f = FF.ns.battle;
    FF.ns.battle.ai.conf[40501501] = {
        startStateId: a,
        globalRegister: {},
        states: [{
            id: a,
            "class": "InitState",
            memberValues: {
                nextStateId: b
            }
        }, {
            id: b,
            update: function() {
                this._nextStateId = 0;
                var a = this._executer;
                if (a.isReadyToSelectAbility()) {
                    var b = a.lotAbility();
                    b === e ? this._nextStateId = c : a.registerAbility(b)
                }
            },
            updateTransition: function() {
                return this._nextStateId ? this._nextStateId : f.ai.State.prototype.updateTransition.apply(this, arguments)
            }
        }, {
            id: c,
            "class": "InterruptMultipleAbility",
            outState: ["RESET"],
            memberValues: {
                nextStateId: b,
                abilityCount: 2,
                abilitySettingMap: {
                    1: {
                        abilityId: e
                    },
                    2: {
                        abilityId: f.Conf.ABILITY_ID_OF.DEFORM,
                        abilityOptions: {
                            messageId: d
                        }
                    }
                }
            }
        }]
    }
});