define(["util"], function(a) {
    var b = 10,
        c = 11,
        d = 12,
        e = 13,
        f = 14,
        g = 1013902,
        h = 4130113,
        i = 4130114,
        j = 4130116,
        k = 201411,
        l = 70,
        m = 40,
        n = 2,
        o = FF.ns.battle,
        p = function() {
            var a = o.ActorMgr.getAliveEnemies().sort(function(a, b) {
                return a.get("no") === n ? 1 : b.get("no") === n ? -1 : 0
            });
            return a[0]
        };
    FF.ns.battle.ai.conf[41301102] = {
        startStateId: b,
        states: [{
            id: b,
            "class": "InitState",
            memberValues: {
                paramId: h,
                sa: o.Conf.STATUS_AILMENTS_TYPE.IGNORE_INCONTROLLABLE,
                nextStateId: c
            }
        }, {
            id: c,
            "class": "SimpleState",
            transitions: [{
                nextStateId: f,
                condition: {
                    canTransition: "HP",
                    args: {
                        underOrEqual: l
                    }
                }
            }]
        }, {
            id: f,
            "class": "InterruptAbility",
            memberValues: {
                nextStateId: d,
                abilityId: o.Conf.ABILITY_ID_OF.DEFORM_MULTI,
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
            "class": "SimpleState",
            inState: ["CHANGE_PARAM"],
            memberValues: {
                paramId: i
            },
            updateTransition: function() {
                return this._executer.isInConfusion() ? e : void 0
            }
        }, {
            id: e,
            "class": "SimpleState",
            inState: ["CHANGE_PARAM"],
            memberValues: {
                paramId: j
            },
            update: function() {
                var b = this._executer;
                b.isReadyToSelectAbility() && (a.lotByFraction(m) ? b.registerAbility(k, {
                    activeTarget: p()
                }) : b.lotAndRegisterAbility())
            },
            updateTransition: function() {
                return this._executer.isInConfusion() ? void 0 : d
            }
        }]
    }
});