define([], function() {
    var a = 100,
        b = 110,
        c = 120,
        d = 130,
        e = 140,
        f = 150,
        g = 4070382,
        h = 4070384,
        i = 1,
        j = 2,
        k = 3,
        l = (FF.ns.battle, function(a, b) {
            return !!_.find(a, function(a) {
                return a.get("no") === b
            })
        });
    FF.ns.battle.ai.conf[40703851] = {
        startStateId: a,
        states: [{
            id: a,
            "class": "InitState",
            memberValues: {
                nextStateId: b,
                visible: {
                    visibleNo: [j, i]
                }
            }
        }, {
            id: b
        }, {
            id: c,
            inState: ["CHANGE_PARAM"],
            memberValues: {
                paramId: g,
                id: i
            }
        }, {
            id: d,
            inState: ["CHANGE_PARAM"],
            memberValues: {
                paramId: h,
                id: j
            }
        }, {
            id: e,
            inState: ["ENABLE"],
            outState: function() {
                _.each(this._executer.getChildren(), function(a) {
                    a.kill()
                })
            },
            memberValues: {
                visible: {
                    visibleNo: [j, i, k]
                }
            },
            updateTransition: function() {
                return f
            }
        }, {
            id: f
        }],
        notifyJudgedDeath: function(a) {
            var f = l(a, i),
                g = l(a, j);
            if (this.isCurrentState(b))
                if (g && f) this.changeState(e);
                else if (g) this.changeState(c);
            else {
                if (!f) throw new Error("should not dying enemy. no:" + a[0].get("no"));
                this.changeState(d)
            } else(this.isCurrentState(c) && f || this.isCurrentState(d) && g) && this.changeState(e);
            return !0
        }
    }
});