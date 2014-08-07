function Beacon(el, opts) {
    opts.handler = (typeof opts.handler === 'function') ? opts.handler : noop;
    opts.enabled = (typeof opts.enabled === 'undefined') ? true : opts.enabled;
    el.jb_destroy = function () {
        var i, len = beacons.length;
        for (i = 0; i < len; i += 1) {
            if (beacons[i] === el) {
                beacons.splice(i, 1);
                i -= 1;
                len -= 1;
            }
        }
    };
    el.jb_handler = function () {
        var $el = jQuery(el);
        opts.handler.call($el, el);
        if (opts.runOnce) {
            el.jb_destroy();
        }
        $el.trigger('beacon/activate');
    };
    if (opts.enabled) {
        el.jb_active = true;
    }
    return el;
}
