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
    var set = $('.beacon.beacon-on:near-viewport(' + range + ')');
    set.trigger('beacon/activate');
};
