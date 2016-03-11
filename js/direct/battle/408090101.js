define([], function() {
    {
        var a = 10,
            b = 11,
            c = 12,
            d = 13,
            e = 40809011,
            f = 40809012,
            g = 40809013,
            h = 50,
            i = 25,
            j = [302012, 302013, 302063, 302075],
            k = function() {
                var a = this._executer;
                if (a.isReadyToSelectAbility()) {
                    var b = a.getWithoutAbilityList(),
                        c = a.lotAbilityWithout(b),
                        d = {};
                    a.isInReflection() && _.contains(j, c) && (d.activeTarget = a), a.registerAbility(c, d)
                }
            };
        FF.ns.battle
    }
    FF.ns.battle.ai.conf[408090101] = {
        startStateId: a,
        states: [{
            id: a,
            inState: ["CHANGE_PARAM"],
            "class": "InitState",
            memberValues: {
                paramId: e,
                nextStateId: b
            }
        }, {
            id: b,
            update: k,
            transitions: [{
                nextStateId: c,
                condition: {
                    canTransition: "HP",
                    args: {
                        underOrEqual: h
                    }
                }
            }]
        }, {
            id: c,
            inState: ["CHANGE_PARAM"],
            update: k,
            memberValues: {
                paramId: f
            },
            transitions: [{
                nextStateId: d,
                condition: {
                    canTransition: "HP",
                    args: {
                        underOrEqual: i
                    }
                }
            }]
        }, {
            id: d,
            inState: ["CHANGE_PARAM"],
            update: k,
            memberValues: {
                paramId: g
            }
        }]
    }
});