jQuery.fn.beacon = function (action) {
    this.each(function (i, el) {
        var beacon;
        if (typeof action === 'function') {
            beacon = Beacon(el, {
                handler: action
            });
            beacons.push(beacon);
            run();
        } else if (action === 'activate') {
            if (el.jb_active) {
                el.jb_handler();
            }
        } else if (action === 'enable') {
            el.jb_active = true;
        } else if (action === 'disable') {
            el.jb_active = false;
        } else if (action === 'destroy') {
            el.jb_destroy();
        } else if (typeof action === 'object') {
            beacon = Beacon(el, action);
            beacons.push(beacon);
            run();
        }
    });
    return this;
};
