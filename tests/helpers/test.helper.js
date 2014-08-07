var $help = {
    handlerCalledFor: {},
    handlerFor: {},
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
    newBeacon: function (id, top, on, once) {
        var sel = '#' + id;
        $help.createDiv(id);
        $help.move(sel, top);
        $help.handlerCalledFor[id] = false;
        $help.handlerFor[id] = function () {
            $help.handlerCalledFor[id] = true;
        };
        spyOn($help.handlerFor, id).and.callThrough();
        $(sel).beacon({
            handler: $help.handlerFor[id],
            enabled: on,
            runOnce: once
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
