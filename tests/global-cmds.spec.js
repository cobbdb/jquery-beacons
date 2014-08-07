describe("$.beacons", function () {
    describe('fetch option', function () {
        it('retrieves all beacons', function () {
            var list = $.beacons('fetch');
            expect(list.length).toEqual(3);
        });
    });
    describe('activate option', function () {
        it('activates all active beacons', function () {
            expect($help.handlerCalledFor.TST01).toBe(true);
            expect($help.handlerCalledFor.TST03).toBe(false);
            $.beacons('activate');
            expect($help.handlerCalledFor.TST03).toBe(true);
        });
        it('does not trip disabled beacons', function () {
            $help.newBeacon('MY01', 0, false);
            expect($help.handlerCalledFor.MY01).toBe(false);
            $.beacons('activate');
            expect($help.handlerCalledFor.MY01).toBe(false);
        });
    });
    describe('destroy option', function () {
        it('removes all beacons', function () {
            $.beacons('destroy');
            expect($.beacons('fetch').length).toEqual(0);
        });
        it('unbinds handlers', function () {
            expect($help.handlerCalledFor.TST01).toBe(true);
            expect($help.handlerCalledFor.TST03).toBe(false);
            $.beacons('destroy');
            $.beacons('activate');
            expect($help.handlerCalledFor.TST03).toBe(false);
        });
    });
    describe('disable option', function () {
        it('deactivates beacon handlers', function () {
            expect($help.handlerCalledFor.TST01).toBe(true);
            expect($help.handlerCalledFor.TST03).toBe(false);
            $.beacons('disable');
            $.beacons('activate');
            expect($help.handlerCalledFor.TST03).toBe(false);
        });
    });
    describe('enable option', function () {
        it('activates beacon handlers', function () {
            $.beacons('disable');
            $help.newBeacon('MY01', 1, false);
            expect($help.handlerCalledFor.TST01).toBe(true);
            expect($help.handlerCalledFor.TST03).toBe(false);
            expect($help.handlerCalledFor.MY01).toBe(false);
            $.beacons('activate');
            expect($help.handlerCalledFor.TST01).toBe(true);
            expect($help.handlerCalledFor.TST03).toBe(false);
            expect($help.handlerCalledFor.MY01).toBe(false);
            $.beacons('enable');
            expect($help.handlerCalledFor.TST01).toBe(true);
            expect($help.handlerCalledFor.TST03).toBe(false);
            expect($help.handlerCalledFor.MY01).toBe(true);
            $.beacons('activate');
            expect($help.handlerCalledFor.TST01).toBe(true);
            expect($help.handlerCalledFor.TST03).toBe(true);
            expect($help.handlerCalledFor.MY01).toBe(true);
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
    it('can chain commands', function () {
        spyOn($, 'beacons').and.callThrough();
        expect(function () {
            $.beacons('enable').beacons('disable');
        }).not.toThrowError();
        expect($.beacons.calls.count()).toEqual(2);
    });
});
