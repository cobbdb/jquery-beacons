/**
 * Spec for global beacon commands: $.beacons()
 */
describe("$.beacons", function () {
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
        spyOn($, 'beacons').and.callThrough();
        expect(function () {
            $.beacons('enable').beacons('disable');
        }).not.toThrowError();
        expect($.beacons.calls.count()).toEqual(2);
    });
    describe('destroy option', function () {
        it('destroys all beacons', function () {
            expect($('.beacon').length).toEqual(3);
            spyOn($.fn, 'beacon').and.callThrough();
            $.beacons('destroy');
            expect($.fn.beacon).toHaveBeenCalledWith('destroy');
            expect($('.beacon').length).toEqual(0);
        });
        it('releases the scroll event', function () {
            var set = $._data(window, 'events');
            expect(set).toBeDefined();
            expect(set.scroll).toBeDefined();
            expect(set.scroll.length).toEqual(1);
            $.beacons('destroy');
            expect(set).toBeUndefined();
        });
        it('releases only the beacon scroll event', function () {
            var scrollTest = false;
            $(window).on('scroll', function () {
                scrollTest = true;
            });
            var set = $._data(window, 'events');
            expect(set).toBeDefined();
            expect(set.scroll).toBeDefined();
            expect(set.scroll.length).toEqual(2);
            $.beacons('destroy');
            expect(set.scroll.length).toEqual(1);
            $(window).trigger('scroll');
            expect(scrollTest).toBe(true);
        });
        it('unbinds the beacon/activate event', function () {
            expect(switchboard.TST01).toBe(true);
            expect(switchboard.TST03).toBe(false);
            $.beacons('destroy');
            $('.beacon').trigger('beacon/activate');
            expect(switchboard.TST03).toBe(false);
        });
    });
    describe('disable option', function () {
        it('removes the beacon-on class from all beacons', function () {
            var set = $('.beacon-on');
            expect(set.length).toEqual(3);
            $.beacons('disable');
            set = $('.beacon-on');
            expect(set.length).toEqual(0);
        });
        it('releases the scroll event', function () {
            var events = $._data(window, 'events');
            expect(events).toBeDefined();
            expect(events.scroll).toBeDefined();
            expect(events.scroll.length).toEqual(1);
            $.beacons('disable');
            expect(events.scroll).toBeUndefined();
        });
        it('releases only the beacon scroll event', function () {
            var scrollTest = false;
            $(window).on('scroll', function () {
                scrollTest = true;
            });
            var events = $._data(window, 'events');
            expect(events).toBeDefined();
            expect(events.scroll).toBeDefined();
            expect(events.scroll.length).toEqual(2);
            $.beacons('disable');
            expect(events.scroll.length).toEqual(1);
            $(window).trigger('scroll');
            expect(scrollTest).toBe(true);
        });
        it('retains the beacon/activate event', function () {
            expect(switchboard.TST01).toBe(true);
            expect(switchboard.TST03).toBe(false);
            $.beacons('disable');
            $('.beacon').trigger('beacon/activate');
            expect(switchboard.TST03).toBe(true);
        });
    });
    describe('enable option', function () {
        beforeEach(function () {
            $.beacons('disable');
        });
        it('only affects beacons', function () {
            $('.beacon').beacon('destroy');
            var set = $('.beacon-on');
            expect(set.length).toEqual(0);
            $.beacons('enable');
            set = $('.beacon-on');
            expect(set.length).toEqual(0);
        });
        it('adds the beacon-on class to all beacons', function () {
            var set = $('.beacon-on');
            expect(set.length).toEqual(0);
            $.beacons('enable');
            set = $('.beacon-on');
            expect(set.length).toEqual(3);
        });
        it('binds the scroll event', function () {
            var events = $._data(window, 'events');
            expect(events).toBeUndefined();
            $.beacons('enable');
            events = $._data(window, 'events');
            expect(events).toBeDefined();
            expect(events.scroll).toBeDefined();
            expect(events.scroll.length).toEqual(1);
        });
        it('binds the beacon/activate event', function () {
            $.beacons('destroy');
            newBeacon('MY01', 10, false);
            expect(switchboard.MY01).toBe(false);
            $('.beacon').trigger('beacon/activate');
            expect(switchboard.MY01).toBe(true);
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
