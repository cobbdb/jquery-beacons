describe("$.fn.beacon", function () {
    describe('constructor', function () {
        beforeEach(function () {
            // Remove any existing beacons.
            $.beacons('destroy');
            $('.testdiv').remove();
            expect($.beacons('fetch').length).toEqual(0);
        });
        it('is enabled by default', function (done) {
            $jb.newBeacon('TST01', 0);
            expect($jb.div.TST01.handler.called).toBe(true);
            setTimeout(function () {
                var callCount = $jb.div.TST01.handler.calls.count();
                expect(callCount).toBeGreaterThan(1);
                done();
            }, 100);
        });
        it('can be created disabled', function (done) {
            $jb.newBeacon('MY01', 5, false);
            expect($jb.div.MY01.handler.called).toBe(false);
            setTimeout(function () {
                expect($jb.div.MY01.handler).not.toHaveBeenCalled();
                done();
            }, 100);
        });
        it('can run once', function (done) {
            $jb.newBeacon('TST01', 0, true, true);
            expect($jb.div.TST01.handler.called).toBe(true);
            setTimeout(function () {
                var callCount = $jb.div.TST01.handler.calls.count();
                expect(callCount).toEqual(1);
                done();
            }, 100);
        });
        it('can use a specific range value', function () {
            $jb.newBeacon('TST04', 1900, true, true);
            expect($jb.div.TST04.handler.called).toBe(false);
            $jb.newBeacon('TST05', 1900, true, true, 2000);
            expect($jb.div.TST05.handler.called).toBe(true);
        });
    });
    describe('constructor - shortcut', function () {
        beforeEach(function () {
            $.beacons('destroy');
            $('.testdiv').remove();
            expect($.beacons('fetch').length).toEqual(0);
        });
        it('is enabled by default', function () {
            var callTest = false;
            $jb.createDiv('MY01');
            $('#MY01').beacon(function () {
                callTest = true;
            });
            expect(callTest).toBe(true);
        });
    });
    describe('activate option', function () {
        it('trips active beacons', function () {
            expect($jb.div.TST03.handler.called).toBe(false);
            jQuery('#TST03').beacon('activate');
            expect($jb.div.TST03.handler.called).toBe(true);
            // Smoke test TST02.
            expect($jb.div.TST02.handler.called).toBe(true);
        });
    });
    describe('destroy option', function () {
        it('unbinds handler', function () {
            $jb.newBeacon('MY01', 1, false);
            expect($jb.div.MY01.handler.called).toBe(false);
            jQuery('#MY01').beacon('destroy');
            jQuery('#MY01').beacon('activate');
            expect($jb.div.MY01.handler.called).toBe(false);
        });
        it('removes only this beacon', function () {
            $jb.newBeacon('MY01', 2000);
            $jb.newBeacon('MY02', 2000);
            expect(jQuery.beacons('fetch').length).toEqual(5);
            expect($jb.div.MY01.handler.called).toBe(false);
            expect($jb.div.MY02.handler.called).toBe(false);
            jQuery('#MY01').beacon('destroy');
            jQuery.beacons('activate');
            expect(jQuery.beacons('fetch').length).toEqual(4);
            expect($jb.div.MY01.handler.called).toBe(false);
            expect($jb.div.MY02.handler.called).toBe(true);
        });
    });
    describe('disable option', function () {
        it('unbinds handler', function () {
            expect($jb.div.TST03.handler.called).toBe(false);
            jQuery('#TST03').beacon('disable');
            $jb.move('#TST03', -1);
            expect($jb.div.TST03.handler.called).toBe(false);
        });
    });
    describe('enable option', function () {
        it('binds handler for heartbeat', function (done) {
            $jb.newBeacon('MY01', 1, false);
            expect($jb.div.MY01.handler.called).toBe(false);
            jQuery('#MY01').beacon('enable');
            setTimeout(function () {
                expect($jb.div.MY01.handler.called).toBe(true);
                done();
            }, 100);
        });
        it('binds handler for manual activate', function () {
            $jb.newBeacon('MY01', 2000, false);
            jQuery('#MY01').beacon('activate');
            expect($jb.div.MY01.handler.called).toBe(false);
            jQuery('#MY01').beacon('enable');
            expect($jb.div.MY01.handler.called).toBe(false);
            jQuery('#MY01').beacon('activate');
            expect($jb.div.MY01.handler.called).toBe(true);
        });
    });
    it('can chain commands', function () {
        spyOn(jQuery.fn, 'beacon').and.callThrough();
        expect(function () {
            jQuery('#TST01')
                .beacon('enable')
                .beacon('disable');
        }).not.toThrowError();
        expect(jQuery.fn.beacon.calls.count()).toEqual(2);
    });
});
