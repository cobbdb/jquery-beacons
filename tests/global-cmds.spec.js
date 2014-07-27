/**
 * Spec for global beacon commands: $.beacons()
 */
describe("$.beacons", function () {
    xit('can chain commands', function () {
        spyOn($, 'beacons').and.callThrough();
        expect(function () {
            $.beacons('enable').beacons('disable');
        }).not.toThrowError();
        expect($.beacons.calls.count()).toEqual(2);
    });
    describe('destroy option', function () {
        it('destroys all beacons', function () {
            expect($('.beacon').length).toEqual(3);
            $.beacons('destroy');
            expect($('.beacon').length).toEqual(0);
        });
        it('unbinds the beacon/activate event', function () {
            expect(handlerCalledFor.TST01).toBe(true);
            expect(handlerCalledFor.TST03).toBe(false);
            $.beacons('destroy');
            $('.beacon').trigger('beacon/activate');
            expect(handlerCalledFor.TST03).toBe(false);
        });
    });
    describe('disable option', function () {
        it('removes beacon-on class from all beacons', function () {
            expect($('.beacon-on').length).toEqual(3);
            $.beacons('disable');
            expect($('.beacon-on').length).toEqual(0);
            expect($('.beacon').length).toEqual(3);
        });
        it('retains beacon/activate event', function () {
            // Called already since TST01 is visible.
            expect(handlerCalledFor.TST01).toBe(true);
            expect(handlerCalledFor.TST03).toBe(false);
            $.beacons('disable');
            $('.beacon').trigger('beacon/activate');
            expect(handlerCalledFor.TST03).toBe(true);
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
        it('adds beacon-on class to all beacons', function () {
            var set = $('.beacon-on');
            expect(set.length).toEqual(0);
            $.beacons('enable');
            set = $('.beacon-on');
            expect(set.length).toEqual(3);
        });
        it('binds beacon/activate event', function () {
            $.beacons('destroy');
            newBeacon('MY01', 10, false);
            expect(handlerCalledFor.MY01).toBe(false);
            $('.beacon').trigger('beacon/activate');
            expect(handlerCalledFor.MY01).toBe(true);
        });
    });
    describe('settings option', function () {
        afterEach(function () {
            $.beacons({
                context: window,
                throttle: 80,
                range: 0
            });
        });
        it('can fetch all current settings', function () {
            var defaults = $.beacons('settings');
            expect(defaults.throttle).toEqual(80);
        });
        xit('can set new configurations', function () {
            var defaults = $.beacons('settings');
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
        xit('can set a few new settings', function () {
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
