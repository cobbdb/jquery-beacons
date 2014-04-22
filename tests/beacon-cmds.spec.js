/**
 * Spec for global beacon commands: $.beacons()
 */
describe("$.fn.beacon", function () {
    var winHeight;
    var switchboard = {};
    var move = function (sel, top) {
        $(sel).css({
            position: 'absolute',
            top: top + 'px'
        });
    };
    var newBeacon = function (id, top, on, once) {
        var sel = '#' + id;
        $('body').append('<div id="' + id + '">test div</div>');
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
        winHeight = window.innerHeight;
    });
    afterEach(function () {
        $('body *').remove();
        $.beacons('destroy');
        $(window).off('scroll');
        switchboard = {};
    });

    // Run the tests.
    it('can chain commands', function () {
        spyOn($.fn, 'beacon').and.callThrough();
        expect(function () {
            $('#TST01')
                .beacon('enable')
                .beacon('disable');
        }).not.toThrowError();
        expect($.fn.beacon.calls.count()).toEqual(2);
    });
    describe('constructor', function () {
        beforeEach(function () {
            $('body').append('<div id="MY02">test div</div>');
            switchboard.MY02 = false;
        });
        it('requires a handler', function () {
            expect(function () {
                $('#MY02').beacon({});
            }).toThrowError();
        });
        it('adds beacon classes', function () {
            expect($('#MY02').is('.beacon')).toBe(false);
            expect($('#MY02').is('.beacon-on')).toBe(false);
            $('#MY02').beacon({
                handler: function () {}
            });
            expect($('#MY02').is('.beacon')).toBe(true);
            expect($('#MY02').is('.beacon-on')).toBe(true);
        });
        it('binds beacon/activate event', function () {
            $('#MY02').trigger('beacon/activate');
            expect(switchboard.MY02).toBe(false);
            $('#MY02').beacon({
                handler: function () {
                    switchboard.MY02 = true;
                }
            });
            expect(switchboard.MY02).toBe(true);
        });
        it('activates the heartbeat', function () {
            $.beacons('destroy');
            var set = $._data(window, 'events');
            expect(set).toBeUndefined();
            $('#MY02').beacon({
                handler: function () {}
            });
            set = $._data(window, 'events');
            expect(set).toBeDefined();
            expect(set.scroll).toBeDefined();
            expect(set.scroll.length).toEqual(1);
        });
        it('can be created disabled', function () {
            expect($('#MY02').is('.beacon')).toBe(false);
            expect($('#MY02').is('.beacon-on')).toBe(false);
            $('#MY02').beacon({
                handler: function () {
                    switchboard.MY02 = true;
                },
                enabled: false
            });
            expect($('#MY02').is('.beacon')).toBe(true);
            expect($('#MY02').is('.beacon-on')).toBe(false);
            expect(switchboard.MY02).toBe(false);
        });
        it('can run once', function () {
            $('#MY02').beacon({
                handler: function () {
                    switchboard.MY02 = true;
                },
                runOnce: true
            });
            expect($('#MY02').is('.beacon')).toBe(false);
            expect($('#MY02').is('.beacon-on')).toBe(false);
            expect(switchboard.MY02).toBe(true);
        });
    });
    describe('constructor - shortcut', function () {
        beforeEach(function () {
            $('body').append('<div id="MY02">test div</div>');
        });
        it('adds beacon classes', function () {
            expect($('#MY02').is('.beacon')).toBe(false);
            expect($('#MY02').is('.beacon-on')).toBe(false);
            $('#MY02').beacon(function () {});
            expect($('#MY02').is('.beacon')).toBe(true);
            expect($('#MY02').is('.beacon-on')).toBe(true);
        });
        it('binds beacon/activate event', function () {
            switchboard.MY02 = false;
            $('#MY02').trigger('beacon/activate');
            expect(switchboard.MY02).toBe(false);
            $('#MY02').beacon(function () {
                switchboard.MY02 = true;
            });
            expect(switchboard.MY02).toBe(true);
        });
        it('activates the heartbeat', function () {
            $.beacons('destroy');
            var set = $._data(window, 'events');
            expect(set).toBeUndefined();
            $('#MY02').beacon(function () {});
            set = $._data(window, 'events');
            expect(set).toBeDefined();
            expect(set.scroll).toBeDefined();
            expect(set.scroll.length).toEqual(1);
        });
    });
    describe('destroy option', function () {
        it('removes beacon classes', function () {
            expect($('.beacon.beacon-on').length).toEqual(3);
            $('#TST01').beacon('destroy');
            expect($('.beacon').length).toEqual(2);
            expect($('.beacon-on').length).toEqual(2);
            expect($('#TST01').is('.beacon')).toBe(false);
            expect($('#TST01').is('.beacon-on')).toBe(false);
        });
        it('unbinds beacon/activate event', function () {
            newBeacon('MY01', 10, false);
            expect(switchboard.MY01).toBe(false);
            $('#MY01').beacon('destroy');
            $('.beacon').trigger('beacon/activate');
            expect(switchboard.MY01).toBe(false);
        });
    });
    describe('disable option', function () {
        it('removes only beacon-on class', function () {
            expect($('.beacon.beacon-on').length).toEqual(3);
            $('#TST03').beacon('disable');
            expect($('.beacon-on').length).toEqual(2);
            expect($('.beacon').length).toEqual(3);
        });
        it('retains the beacon/activate event', function () {
            expect(switchboard.TST01).toBe(true);
            expect(switchboard.TST03).toBe(false);
            $('#TST03').beacon('disable');
            $('.beacon').trigger('beacon/activate');
            expect(switchboard.TST03).toBe(true);
        });
    });
    describe('enable option', function () {
        it('adds beacon-on class', function () {
            $.beacons('disable');
            expect($('.beacon-on').length).toEqual(0);
            $('#TST02').beacon('enable');
            expect($('.beacon-on').length).toEqual(1);
        });
        it('only affects beacons', function () {
            $.beacons('destroy');
            expect($('.beacon-on').length).toEqual(0);
            $('#TST01').beacon('enable');
            expect($('.beacon-on').length).toEqual(0);
        });
    });
    describe('settings option', function () {
        afterEach(function () {
            $.beacons({
                context: false,
                throttle: false,
                range: false
            });
        });
        it('can fetch all current settings', function () {
            var defaults = $.beacons('settings');
            expect(defaults).toBeDefined();
        });
        it('can set all new configurations', function () {
            var test = {};
            $.beacons({
                context: test,
                throttle: 183,
                range: 52
            });
            var config = $.beacons('settings');
            expect(config.context).toEqual(test);
            expect(config.throttle).toEqual(183);
            expect(config.range).toEqual(52);
        });
        it('can set a few new settings', function () {
            var oldConf = $.beacons('settings');
            $.beacons({
                throttle: 98
            });
            var newConf = $.beacons('settings');
            expect(newConf.context).toEqual(oldConf.context);
            expect(newConf.throttle).toEqual(98);
            expect(newConf.range).toEqual(oldConf.range);
        });
    });
});
