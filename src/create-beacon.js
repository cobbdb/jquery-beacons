/**
 * Create a new beacon or issue commands to
 * an individual beacon.
 */
$.fn.beacon = function (action) {
    if (typeof action === 'function') {
        // Shortcut - enable and listen.
        this.addClass('beacon beacon-on');
        this.on('beacon/activate', action);
        run();
    } else if (action === 'enable') {
        this.filter('.beacon').addClass('beacon-on');
    } else if (action === 'disable') {
        this.removeClass('beacon-on');
    } else if (action === 'destroy') {
        this.removeClass('beacon beacon-on');
        this.off('beacon/activate');
        // Stop the heartbeat if no more beacons are left.
        if (!$('.beacon').length) {
            active = false;
        }
    } else if (typeof action === 'object') {
        if (!action.handler) {
            throw Error('Beacon Creation Error: All beacons require a handler.');
        }
        this.addClass('beacon');
        var $this = this;
        this.on('beacon/activate', function () {
            action.handler();
            if (action.runOnce) {
                $this.beacon('destroy');
            }
        });
        var enabled = (typeof action.enabled === 'undefined') ? true : action.enabled;
        if (enabled) {
            this.addClass('beacon-on');
            run();
        }
    }
    return this;
};
