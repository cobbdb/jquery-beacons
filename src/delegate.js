/**
 * Create a new beacon or issue commands to
 * an individual beacon.
 */
jQuery.fn.beacon = function (action) {
    var beacon = this[0];
    if (typeof action === 'function') {
        // Shortcut - enable and listen.
        //this.addClass('beacon beacon-on');
        beacon.beaconActive = true;
        //this.on('beacon/activate', action); <---- come back to this
        run();
    } else if (action === 'enable') {
        //enableBeacon(this);
        beacon.beaconActive = true;
    } else if (action === 'disable') {
        //disableBeacon(this);
        beacon.beaconActive = false;
    } else if (action === 'destroy') {
        /*this.removeClass('beacon beacon-on');
        this.off('beacon/activate');
        // Stop the heartbeat if no more beacons are left.
        if (!$('.beacon').length) {
            active = false;
        }*/
        var i, len = beacons.length;
        for (i = 0; i < len; i += 1) {
            if (beacons[i] === beacon) {
                beacons.splice(i, 1);
                i -= 1;
            }
        }
    } else if (typeof action === 'object') {
        if (!action.handler) {
            throw Error('Beacon Creation Error: All beacons require a handler.');
        }
        //this.addClass('beacon');
        beacons.push(beacon);
        var $this = this;
        this.on('beacon/activate', function () { // <--- come back to this
            action.handler();
            if (action.runOnce) {
                $this.beacon('destroy');
            }
        });
        var enabled = (typeof action.enabled === 'undefined') ? true : action.enabled;
        if (enabled) {
            //this.addClass('beacon-on');
            beacon.beaconActive = true;
            run();
        }
    }
    return this;
};
