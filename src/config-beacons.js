/**
 * Commands that apply to all beacons.
 */
$.beacons = function (action) {
    var i, len;
    len = beacons.length;
    if (action === 'destroy') {
        active = false;
        //$('.beacon').beacon('destroy');
        for (i = 0; i < len; i += 1) {
            beacons[i].beacon('destroy'); // <----- come back to this
        }
        beacons = [];
    } else if (action === 'enable') {
        for (i = 0; i < len; i += 1) {
            beacons[i].enabled = true;
        }
        //$('.beacon').addClass('beacon-on');
        run();
    } else if (action === 'disable') {
        for (i = 0; i < len; i += 1) {
            beacons[i].enabled = false;
        }
        //$('.beacon').removeClass('beacon-on');
        active = false;
    } else if (action === 'settings') {
        // Fetch current settings.
        return {
            range: range,
            context: context,
            throttle: throttle
        };
    } else if (typeof action === 'object') {
        range = action.range || range;
        context = action.context || context;
        throttle = action.throttle || throttle;
    }
    return this;
};
