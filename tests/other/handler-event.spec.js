describe('handler callback', function () {
    it('trips handler when moving into view', function (done) {
        expect($jb.div.TST03.handler.called).toBe(false);
        $jb.move('#TST03', -1);
        setTimeout(function () {
            expect($jb.div.TST03.handler.called).toBe(true);
            done();
        }, 100);
    });
    it('provides element to handler', function (done) {
        expect($jb.div.TST03.handler.called).toBe(false);
        $jb.move('#TST03', -1);
        setTimeout(function () {
            var el = jQuery('#TST03')[0];
            expect($jb.div.TST03.handler.called).toBe(true);
            expect($jb.div.TST03.handler.params[0]).toEqual(el);
            done();
        }, 100);
    });
    it('binds jQ obj as this for handler', function (done) {
        expect($jb.div.TST03.handler.called).toBe(false);
        $jb.move('#TST03', -1);
        setTimeout(function () {
            expect($jb.div.TST03.handler.called).toBe(true);
            expect($jb.div.TST03.handler._this.attr('id')).toEqual('TST03');
            done();
        }, 100);
    });
    it('trips beacon/activate event when activated', function () {
        var fired = false;
        expect($jb.div.TST03.handler.called).toBe(false);
        jQuery('#TST03').on('beacon/activate', function () {
            fired = true;
        });
        jQuery('#TST03').beacon('activate');
        expect($jb.div.TST03.handler.called).toBe(true);
        expect(fired).toBe(true);
    });
});
