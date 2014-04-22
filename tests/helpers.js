var switchboard = {};
var move = function (sel, top) {
    $(sel).css({
        position: 'absolute',
        top: top + 'px'
    });
};
var newBeacon = function (id, top, on, once) {
    var sel = '#' + id;
    $('body').append('<div id="' + id + '" class="test">test div</div>');
    move(sel, top);
    switchboard[id] = false;
    $(sel).beacon({
        handler: function () {
            switchboard[id] = true;
        },
        enabled: on,
        runOnce: once
    });
};

beforeEach(function () {
    newBeacon('TST01', 10);
    newBeacon('TST02', 200);
    newBeacon('TST03', 500);
});
afterEach(function () {
    $.beacons('destroy');
    $('.test').remove();
    $(window).off('scroll');
    switchboard = {};
});
