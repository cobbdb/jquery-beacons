describe("$.beacons", function () {
    describe('fetch option', function () {
        it('retrieves all beacons', function () {
            var list = jQuery.beacons('fetch');
            expect(list.length).toEqual(3);
        });
    });
    describe('activate option', function () {
        it('activates all active beacons', function () {
            expect($jb.div.TST01.handler.called).toBe(true);
            expect($jb.div.TST03.handler.called).toBe(false);
            jQuery.beacons('activate');
            expect($jb.div.TST03.handler.called).toBe(true);
        });
        it('does not trip disabled beacons', function () {
            $jb.newBeacon('MY01', 0, false);
            expect($jb.div.MY01.handler.called).toBe(false);
            jQuery.beacons('activate');
            expect($jb.div.MY01.handler.called).toBe(false);
        });
    });
    describe('destroy option', function () {
        it('removes all beacons', function () {
            jQuery.beacons('destroy');
            expect(jQuery.beacons('fetch').length).toEqual(0);
        });
        it('unbinds handlers', function () {
            expect($jb.div.TST01.handler.called).toBe(true);
            expect($jb.div.TST03.handler.called).toBe(false);
            jQuery.beacons('destroy');
            jQuery.beacons('activate');
            expect($jb.div.TST03.handler.called).toBe(false);
        });
    });
    describe('disable option', function () {
        it('deactivates beacon handlers', function () {
            expect($jb.div.TST01.handler.called).toBe(true);
            expect($jb.div.TST03.handler.called).toBe(false);
            jQuery.beacons('disable');
            jQuery.beacons('activate');
            expect($jb.div.TST03.handler.called).toBe(false);
        });
    });
    describe('enable option', function () {
        it('activates beacon handlers', function () {
            jQuery.beacons('disable');
            $jb.newBeacon('MY01', 1, false);
            expect($jb.div.TST01.handler.called).toBe(true);
            expect($jb.div.TST03.handler.called).toBe(false);
            expect($jb.div.MY01.handler.called).toBe(false);
            jQuery.beacons('activate');
            expect($jb.div.TST01.handler.called).toBe(true);
            expect($jb.div.TST03.handler.called).toBe(false);
            expect($jb.div.MY01.handler.called).toBe(false);
            jQuery.beacons('enable');
            expect($jb.div.TST01.handler.called).toBe(true);
            expect($jb.div.TST03.handler.called).toBe(false);
            expect($jb.div.MY01.handler.called).toBe(true);
            jQuery.beacons('activate');
            expect($jb.div.TST01.handler.called).toBe(true);
            expect($jb.div.TST03.handler.called).toBe(true);
            expect($jb.div.MY01.handler.called).toBe(true);
        });
    });
    describe('settings option', function () {
        afterEach(function () {
            jQuery.beacons({
                throttle: 80,
                range: 0
            });
        });
        it('can fetch all current settings', function () {
            var defaults = jQuery.beacons('settings');
            expect(defaults.throttle).toEqual(80);
        });
        it('can set a few new settings', function () {
            var oldConf = jQuery.beacons('settings');
            jQuery.beacons({
                throttle: 98
            });
            var newConf = jQuery.beacons('settings');
            expect(newConf.throttle).toEqual(98);
            expect(newConf.range).toEqual(oldConf.range);
        });
        it('applies global range as default', function (done) {
            var winH = jQuery(window).height();
            var beaY = 3000;
            var diff = beaY - winH;
            $jb.newBeacon('TST05', beaY, true, false, diff - 100);
            $jb.newBeacon('TST04', beaY, true, false, diff + 100);
            expect($jb.div.TST05.handler.called).toBe(false, 'A - TST05');
            expect($jb.div.TST04.handler.called).toBe(true, 'A - TST04');
            expect($jb.div.TST03.handler.called).toBe(false, 'A - TST03');
            jQuery.beacons({
                range: 4000
            });
            setTimeout(function () {
                expect($jb.div.TST05.handler.called).toBe(false, 'B - TST05');
                expect($jb.div.TST04.handler.called).toBe(true, 'B - TST04');
                expect($jb.div.TST03.handler.called).toBe(true, 'B - TST03');
                done();
            }, 100);
        });
    });
    it('can chain commands', function () {
        spyOn(jQuery, 'beacons').and.callThrough();
        expect(function () {
            jQuery.beacons('enable').beacons('disable');
        }).not.toThrowError();
        expect(jQuery.beacons.calls.count()).toEqual(2);
    });
});
