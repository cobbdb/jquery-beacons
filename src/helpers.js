// Main loop of the plugin.
var run = function () {
    // Explicitly trip all beacons.
    activateBeacons();
    // Do nothing if already active.
    if (!active) {
        active = true;
        // Pulse on an interval to look for new beacons.
        hash = window.setInterval(function () {
            activateBeacons();
            if (!active) {
                window.clearInterval(hash);
            }
        }, throttle);
    }
};

var activateBeacons = function () {
    //var set = $('.beacon.beacon-on:near-viewport(' + range + ')');
    var i, len = beacons.length, el;
    for (i = 0; i < len; i += 1) {
        el = beacons[i];
        if (nearViewport(el, range)) {
            el.trigger('beacon/activate'); //<------ come back to this
        }
    }
    //set.trigger('beacon/activate');
};
