/**
 * Spec for global beacon commands: $.beacons()
 */
describe("$.fn.beacon", function () {
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
            newBeacon('MY02', 10, false);
            $.beacons('destroy');
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
            newBeacon('MY02', 10, false);
            $.beacons('destroy');
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
});
