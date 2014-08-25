describe('scroll', function () {
    describe('onscreen callback', function () {
        it('fires when moving in view', function (done) {
            expect($jb.div.TST03.onscreen.called).toBe(false, 'for onscreen');
            expect($jb.div.TST03.handler.called).toBe(false, 'for handler');
            $jb.move('#TST03', 2);
            setTimeout(function () {
                expect($jb.div.TST03.onscreen.called).toBe(true, 'for onscreen');
                expect($jb.div.TST03.handler.called).toBe(true, 'for handler');
                done();
            }, 100);
        });
        it('fires only once when moving in view', function (done) {
            expect($jb.div.TST01.onscreen.calls.count()).toEqual(1, 'initially');
            setTimeout(function () {
                expect($jb.div.TST01.onscreen.calls.count()).toEqual(1, 'after waiting');
                done();
            }, 100);
        });
        it('does not fire when moving offscreen', function (done) {
            expect($jb.div.TST01.onscreen.calls.count()).toEqual(1, 'initially');
            $jb.move('#TST01', -2500);
            setTimeout(function () {
                expect($jb.div.TST01.onscreen.calls.count()).toEqual(1, 'after leaving screen');
                done();
            }, 100);
        });
        it('can fire repeatedly', function (done) {
            expect($jb.div.TST01.onscreen.calls.count()).toEqual(1, 'initially');
            $jb.move('#TST01', -2500);
            setTimeout(function () {
                expect($jb.div.TST01.onscreen.calls.count()).toEqual(1, 'after leaving screen');
                $jb.move('#TST01', 0);
                setTimeout(function () {
                    expect($jb.div.TST01.onscreen.calls.count()).toEqual(2, 'after coming back onscreen');
                    done();
                }, 100);
            }, 100);
        });
        it('triggers the scroll/onscreen event', function (done) {
            var fired = false;
            jQuery('#TST03').on('beacon/scroll/onscreen', function () {
                fired = true;
            });
            $jb.move('#TST03', 0);
            setTimeout(function () {
                expect(fired).toBe(true);
                done();
            }, 100);
        });
    });
    describe('offscreen callback', function () {
        it('fires when moving out of view', function (done) {
            expect($jb.div.TST02.offscreen.called).toBe(false, 'for offscreen');
            expect($jb.div.TST02.handler.called).toBe(true, 'for handler');
            $jb.move('#TST02', 2500);
            setTimeout(function () {
                expect($jb.div.TST02.offscreen.called).toBe(true, 'for offscreen');
                expect($jb.div.TST02.handler.called).toBe(true, 'for handler');
                done();
            }, 100);
        });
        it('fires only once when moving out of view', function (done) {
            expect($jb.div.TST01.offscreen.calls.count()).toEqual(0, 'initially');
            $jb.move('#TST01', -2500);
            setTimeout(function () {
                expect($jb.div.TST01.offscreen.calls.count()).toEqual(1, 'after moving offscreen');
                setTimeout(function () {
                    expect($jb.div.TST01.offscreen.calls.count()).toEqual(1, 'after waiting');
                    done();
                }, 100);
            }, 100);
        });
        it('does not fire when moving onscreen', function (done) {
            expect($jb.div.TST03.onscreen.called).toBe(false, 'on: initially');
            expect($jb.div.TST03.offscreen.called).toBe(false, 'off: initially');
            $jb.move('#TST03', -2);
            setTimeout(function () {
                expect($jb.div.TST03.onscreen.called).toBe(true, 'on: after moving onscreen');
                expect($jb.div.TST03.offscreen.called).toBe(false, 'off: after moving onscreen');
                done();
            }, 100);
        });
        it('can fire repeatedly', function (done) {
            expect($jb.div.TST01.offscreen.calls.count()).toEqual(0, 'initially');
            $jb.move('#TST01', -2500);
            setTimeout(function () {
                expect($jb.div.TST01.offscreen.calls.count()).toEqual(1, 'after leaving screen 1st time');
                $jb.move('#TST01', 0);
                setTimeout(function () {
                    expect($jb.div.TST01.offscreen.calls.count()).toEqual(1, 'after coming back onscreen');
                        $jb.move('#TST01', 3500);
                    setTimeout(function () {
                        expect($jb.div.TST01.offscreen.calls.count()).toEqual(2, 'after leaving screen 2nd time');
                        done();
                    }, 100);
                }, 100);
            }, 100);
        });
        it('triggers the scroll/offscreen event', function (done) {
            var fired = false;
            jQuery('#TST01').on('beacon/scroll/offscreen', function () {
                fired = true;
            });
            $jb.move('#TST01', 3000);
            setTimeout(function () {
                expect(fired).toBe(true);
                done();
            }, 100);
        });
    });
});
