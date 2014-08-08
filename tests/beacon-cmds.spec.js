describe("$.fn.beacon", function () {
    describe('constructor', function () {
        beforeEach(function () {
            // Remove any existing beacons.
            $.beacons('destroy');
            $('.testdiv').remove();
            expect($.beacons('fetch').length).toEqual(0);
        });
        it('is enabled by default', function (done) {
            $help.newBeacon('TST01', 0);
            expect($help.handlerCalledFor.TST01).toBe(true);
            setTimeout(function () {
                var callCount = $help.handlerFor.TST01.calls.count();
                expect(callCount).toBeGreaterThan(1);
                done();
            }, 100);
        });
        it('can be created disabled', function (done) {
            $help.newBeacon('MY01', 5, false);
            expect($help.handlerCalledFor.MY01).toBe(false);
            setTimeout(function () {
                expect($help.handlerFor.MY01).not.toHaveBeenCalled();
                done();
            }, 100);
        });
        it('can run once', function (done) {
            $help.newBeacon('TST01', 0, true, true);
            expect($help.handlerCalledFor.TST01).toBe(true);
            setTimeout(function () {
                var callCount = $help.handlerFor.TST01.calls.count();
                expect(callCount).toEqual(1);
                done();
            }, 100);
        });
        it('can use a specific range value', function () {
            $help.newBeacon('TST04', 1900, true, true);
            expect($help.handlerCalledFor.TST04).toBe(false);
            $help.newBeacon('TST05', 1900, true, true, 2000);
            expect($help.handlerCalledFor.TST05).toBe(true);
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
            $help.createDiv('MY01');
            $('#MY01').beacon(function () {
                callTest = true;
            });
            expect(callTest).toBe(true);
        });
    });
    it('trips handler when moving into view', function (done) {
        expect($help.handlerCalledFor.TST03).toBe(false);
        $help.move('#TST03', -1);
        setTimeout(function () {
            expect($help.handlerCalledFor.TST03).toBe(true);
            done();
        }, 100);
    });
    it('provides element to handler', function (done) {
        expect($help.handlerCalledFor.TST03).toBe(false);
        $help.move('#TST03', -1);
        setTimeout(function () {
            expect($help.handlerCalledFor.TST03).toBe(true);
            expect($help.handlerParamFor.TST03).toEqual($('#TST03')[0]);
            done();
        }, 100);
    });
    it('binds jQ obj as this for handler', function (done) {
        expect($help.handlerCalledFor.TST03).toBe(false);
        $help.move('#TST03', -1);
        setTimeout(function () {
            expect($help.handlerCalledFor.TST03).toBe(true);
            expect($help.handlerThisFor.TST03.attr('id')).toEqual('TST03');
            done();
        }, 100);
    });
    describe('activate option', function () {
        it('trips active beacons', function () {
            expect($help.handlerCalledFor.TST03).toBe(false);
            $('#TST03').beacon('activate');
            expect($help.handlerCalledFor.TST03).toBe(true);
            // Smoke test TST02.
            expect($help.handlerCalledFor.TST02).toBe(true);
        });
    });
    it('trips beacon/activate event when activated', function () {
        var fired = false;
        expect($help.handlerCalledFor.TST03).toBe(false);
        $('#TST03').on('beacon/activate', function () {
            fired = true;
        });
        $('#TST03').beacon('activate');
        expect($help.handlerCalledFor.TST03).toBe(true);
        expect(fired).toBe(true);
    });
    describe('destroy option', function () {
        it('unbinds handler', function () {
            $help.newBeacon('MY01', 1, false);
            expect($help.handlerCalledFor.MY01).toBe(false);
            $('#MY01').beacon('destroy');
            $('#MY01').beacon('activate');
            expect($help.handlerCalledFor.MY01).toBe(false);
        });
        it('removes only this beacon', function () {
            $help.newBeacon('MY01', 2000);
            $help.newBeacon('MY02', 2000);
            expect($.beacons('fetch').length).toEqual(5);
            expect($help.handlerCalledFor.MY01).toBe(false);
            expect($help.handlerCalledFor.MY02).toBe(false);
            $('#MY01').beacon('destroy');
            $.beacons('activate');
            expect($.beacons('fetch').length).toEqual(4);
            expect($help.handlerCalledFor.MY01).toBe(false);
            expect($help.handlerCalledFor.MY02).toBe(true);
        });
    });
    describe('disable option', function () {
        it('unbinds handler', function () {
            expect($help.handlerCalledFor.TST03).toBe(false);
            $('#TST03').beacon('disable');
            $help.move('#TST03', -1);
            expect($help.handlerCalledFor.TST03).toBe(false);
        });
    });
    describe('enable option', function () {
        it('binds handler for heartbeat', function (done) {
            $help.newBeacon('MY01', 1, false);
            expect($help.handlerCalledFor.MY01).toBe(false);
            $('#MY01').beacon('enable');
            setTimeout(function () {
                expect($help.handlerCalledFor.MY01).toBe(true);
                done();
            }, 100);
        });
        it('binds handler for manual activate', function () {
            $help.newBeacon('MY01', 2000, false);
            $('#MY01').beacon('activate');
            expect($help.handlerCalledFor.MY01).toBe(false);
            $('#MY01').beacon('enable');
            expect($help.handlerCalledFor.MY01).toBe(false);
            $('#MY01').beacon('activate');
            expect($help.handlerCalledFor.MY01).toBe(true);
        });
    });
    it('can chain commands', function () {
        spyOn($.fn, 'beacon').and.callThrough();
        expect(function () {
            $('#TST01')
                .beacon('enable')
                .beacon('disable');
        }).not.toThrowError();
        expect($.fn.beacon.calls.count()).toEqual(2);
    });
});
