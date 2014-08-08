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
    var i, len = beacons.length, el, elRange;
    for (i = 0; i < len; i += 1) {
        el = beacons[i];
        elRange = (typeof el.jb_range === 'number') ? el.jb_range : range;
        if (el.jb_active && nearViewport(el, elRange)) {
            el.jb_handler();
        }
    }
};
