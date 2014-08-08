var $help = {
    handlerCalledFor: {},
    handlerFor: {},
    handlerParamFor: {},
    handlerThisFor: {},
    move: function (sel, top) {
        return $(sel).css({
            top: top + 'px'
        });
    },
    createDiv: function (id) {
        return $('<div>', {
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
        $help.createDiv(id);
        $help.move(sel, top);
        $help.handlerCalledFor[id] = false;
        $help.handlerParamFor[id] = null;
        $help.handlerThisFor[id] = null;
        $help.handlerFor[id] = function (param) {
            $help.handlerCalledFor[id] = true;
            $help.handlerParamFor[id] = param;
            $help.handlerThisFor[id] = this;
        };
        spyOn($help.handlerFor, id).and.callThrough();
        $(sel).beacon({
            handler: $help.handlerFor[id],
            enabled: on,
            runOnce: once,
            range: range
        });
    }
};

beforeEach(function () {
    expect($('.testdiv').length).toEqual(0);
    expect($.beacons('fetch').length).toEqual(0);
    // Partially on-screen.
    $help.newBeacon('TST01', -2);
    // Completely on-screen.
    $help.newBeacon('TST02', 5);
    // Completely off-screen.
    $help.newBeacon('TST03', 2000);
    expect($('.testdiv').length).toEqual(3);
    expect($.beacons('fetch').length).toEqual(3);
});
afterEach(function () {
    $.beacons('destroy');
    $('.testdiv').remove();
    $help.handlerCalledFor = {};
    $help.handlerFor = {};
    expect($('.testdiv').length).toEqual(0);
    expect($.beacons('fetch').length).toEqual(0);
});
