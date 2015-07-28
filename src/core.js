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
        if (el) {
            elRange = (typeof el.jb_range === 'number') ? el.jb_range : range;
            if (el.jb_active) {
                if (nearViewport(el, elRange)) {
                    el.jb_handler();
                    if (!el.jb_wasOnscreen) {
                        el.jb_wasOnscreen = true;
                        el.jb_onscreen();
                    }
                } else if (el.jb_wasOnscreen) {
                    el.jb_wasOnscreen = false;
                    el.jb_offscreen();
                }
            }
        }
    }
};
