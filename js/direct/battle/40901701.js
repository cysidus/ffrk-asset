define([], function() {
    var a = 11,
        b = 12,
        c = 13,
        d = 14,
        e = 1016301,
        f = 1016302,
        g = 4090171,
        h = 4090172,
        i = 401936,
        j = 402014,
        k = 14,
        l = FF.ns.battle;
    FF.ns.battle.ai.conf[40901701] = {
        startStateId: a,
        states: [{
            id: a,
            inState: ["CHANGE_PARAM"],
            "class": "SimpleState",
            memberValues: {
                paramId: g
            },
            transitions: [{
                nextStateId: b,
                condition: {
                    "class": "TurnTransitCondition",
                    args: {
                        turn: k
                    }
                }
            }]
        }, {
            id: b,
            inState: ["CHANGE_PARAM", "RESET"],
            memberValues: {
                paramId: h
            },
            update: function() {
                var a = this._executer;
                a.isReadyToSelectAbility() && a.registerAbility(i)
            },
            transitions: [{
                nextStateId: a,
                condition: {
                    canTransition: "ABILITY_DONE",
                    args: {
                        abilityId: i
                    }
                }
            }]
        }, {
            id: c,
            "class": "InterruptMultipleAbility",
            inState: ["CHANGE_PARAM"],
            memberValues: {
                nextStateId: d,
                paramId: h,
                abilityCount: 3,
                abilitySettingMap: {
                    1: {
                        abilityId: l.Conf.ABILITY_ID_OF.DEFORM,
                        abilityOptions: {
                            messageId: e
                        }
                    },
                    2: {
                        abilityId: j
                    },
                    3: {
                        abilityId: l.Conf.ABILITY_ID_OF.DEFORM,
                        abilityOptions: {
                            messageId: f
                        }
                    }
                }
            }
        }, {
            id: d
        }],
        notifyJudgedDeath: function() {
            return this.isCurrentState(d) ? !0 : (this.isCurrentState(c) || this.changeState(c), !1)
        }
    }
});