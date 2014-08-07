/**
 * Commands that apply to all beacons.
 */
$.beacons = function (action) {
    var el, i, len = beacons.length;

    if (action === 'destroy') {
        active = false;
        beacons = [];
    } else if (action === 'enable') {
        for (i = 0; i < len; i += 1) {
            beacons[i].jb_active = true;
        }
        run();
    } else if (action === 'disable') {
        for (i = 0; i < len; i += 1) {
            beacons[i].jb_active = false;
        }
        active = false;
    } else if (action === 'fetch') {
        return beacons;
    } else if (action === 'activate') {
        for (i = 0; i < len; i += 1) {
            el = beacons[i];
            if (el.jb_active) {
                el.jb_handler();
            }
        }
    } else if (action === 'settings') {
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
