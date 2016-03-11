define([], function() {
    var a = 10,
        b = 101072,
        c = FF.ns.battle;
    FF.ns.battle.ai.conf[40604202] = {
        startStateId: a,
        globalRegister: {},
        states: [{
            id: a,
            update: function() {
                var a = this._executer;
                if (a.isReadyToSelectAbility()) {
                    var d = _.find(_.shuffle(c.ActorMgr.getAliveBuddies()), function(a) {
                        return a.isInSleeping() && a.isPossibleToTarget()
                    });
                    d ? a.registerAbility(b, {
                        activeTarget: d
                    }) : a.lotAndRegisterAbility()
                }
            }
        }]
    }
});