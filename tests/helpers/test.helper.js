var handlerCalledFor = {};
var handlerFor = {};
var move = function (sel, top) {
    $(sel).css({
        position: 'absolute',
        top: top + 'px'
    });
};
var createDiv = function (id) {
    $('<div>', {
        id: id,
        'class': 'testdiv'
    }).text('test div').appendTo('body');
};
var newBeacon = function (id, top, on, once) {
    var sel = '#' + id;
    createDiv(id);
    move(sel, top);
    handlerCalledFor[id] = false;
    handlerFor[id] = function () {
        handlerCalledFor[id] = true;
    };
    spyOn(handlerFor, id).and.callThrough();
    $(sel).beacon({
        handler: handlerFor[id],
        enabled: on,
        runOnce: once
    });
};

beforeEach(function () {
    // Partially on-screen.
    newBeacon('TST01', -2);
    // Completely on-screen.
    newBeacon('TST02', 5);
    // Completely off-screen.
    newBeacon('TST03', 2000);
});
afterEach(function () {
    $.beacons('destroy');
    $('.testdiv').remove();
    $(window).off('scroll');
    handlerCalledFor = {};
    handlerFor = {};
});
