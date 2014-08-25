var $jb = {
    div: {},
    move: function (sel, top) {
        return jQuery(sel).css({
            top: top + 'px'
        });
    },
    createDiv: function (id) {
        return jQuery('<div>', {
            id: id,
            'class': 'testdiv',
            text: 'test div',
            css: {
                position: 'absolute'
            }
        }).appendTo('body');
    },
    newBeacon: function (id, top, on, once, range) {
        var sel = '#' + id;
        this.createDiv(id);
        this.move(sel, top);
        var cbTypes = [
            'handler',
            'onscreen',
            'offscreen'
        ];
        $jb.div[id] = {};
        cbTypes.forEach(function (type) {
            $jb.div[id][type] = function () {
                $jb.div[id][type].called = true;
                $jb.div[id][type].params = arguments;
                $jb.div[id][type]._this = this;
            };
            $jb.div[id][type].called = false;
            $jb.div[id][type].params = null;
            $jb.div[id][type]._this = null;
            spyOn($jb.div[id], type).and.callThrough();
        });
        jQuery(sel).beacon({
            handler: $jb.div[id].handler,
            enabled: on,
            runOnce: once,
            range: range,
            scroll: {
                onscreen: $jb.div[id].onscreen,
                offscreen: $jb.div[id].offscreen
            }
        });
    }
};
