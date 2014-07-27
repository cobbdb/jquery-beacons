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
            $.beacons('destroy');
            $('.testdiv').remove();
            expect($('.testdiv, .beacon, .beacon-on').length).toEqual(0);
        });
        it('requires a handler', function () {
            expect(function () {
                $('#MY02').beacon({});
            }).toThrowError();
        });
        it('adds beacon classes', function () {
            newBeacon('MY01', 5);
            expect($('#MY01').is('.beacon')).toBe(true);
            expect($('#MY01').is('.beacon-on')).toBe(true);
        });
        it('binds beacon/activate event', function () {
            newBeacon('TST01', 2000);
            expect(handlerFor.TST01).not.toHaveBeenCalled();
            $('#TST01').trigger('beacon/activate');
            expect(handlerFor.TST01).toHaveBeenCalled();
        });
        it('can be created disabled', function () {
            newBeacon('MY01', 5, false);
            expect($('#MY01').is('.beacon')).toBe(true);
            expect($('#MY01').is('.beacon-on')).toBe(false);
            expect(handlerCalledFor.MY01).toBe(false);
        });
        it('can run once', function () {
            newBeacon('MY02', 5, true, true);
            expect($('#MY02').is('.beacon')).toBe(false);
            expect($('#MY02').is('.beacon-on')).toBe(false);
            expect(handlerCalledFor.MY02).toBe(true);
            expect($('.beacon').length).toEqual(0);
        });
    });
    describe('constructor - shortcut', function () {
        beforeEach(function () {
            $.beacons('destroy');
            $('.testdiv').remove();
            expect($('.testdiv, .beacon, .beacon-on').length).toEqual(0);
            createDiv('MY01');
            createDiv('MY02');
            move('#MY02', 2000);
        });
        it('adds beacon classes', function () {
            $('#MY02').beacon(function () {});
            expect($('#MY02').is('.beacon')).toBe(true);
            expect($('#MY02').is('.beacon-on')).toBe(true);
        });
        it('binds beacon/activate event', function () {
            var callTest = false;
            $('#MY01').trigger('beacon/activate');
            expect(callTest).toBe(false);
            $('#MY01').beacon(function () {
                callTest = true;
            });
            expect(callTest).toBe(true);
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
            expect(handlerCalledFor.MY01).toBe(false);
            $('#MY01').beacon('destroy');
            $('.beacon').trigger('beacon/activate');
            expect(handlerCalledFor.MY01).toBe(false);
        });
    });
    xdescribe('disable option', function () {
        it('removes only beacon-on class', function () {
            expect($('.beacon.beacon-on').length).toEqual(3);
            $('#TST03').beacon('disable');
            expect($('.beacon-on').length).toEqual(2);
            expect($('.beacon').length).toEqual(3);
        });
        it('retains the beacon/activate event', function () {
            expect(handlerCalledFor.TST01).toBe(true);
            expect(handlerCalledFor.TST03).toBe(false);
            $('#TST03').beacon('disable');
            $('.beacon').trigger('beacon/activate');
            expect(handlerCalledFor.TST03).toBe(true);
        });
    });
    xdescribe('enable option', function () {
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
