function Beacon(el, opts) {
    opts.handler = (typeof opts.handler === 'function') ? opts.handler : noop;
    opts.enabled = (typeof opts.enabled === 'undefined') ? true : opts.enabled;
    opts.scroll = opts.scroll || {};
    opts.scroll.onscreen = (typeof opts.scroll.onscreen === 'function') ? opts.scroll.onscreen : noop;
    opts.scroll.offscreen = (typeof opts.scroll.offscreen === 'function') ? opts.scroll.offscreen : noop;

    el.jb_wasOnscreen = false;
    el.jb_range = opts.range;
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
    el.jb_onscreen = function () {
        var $el = jQuery(el);
        opts.scroll.onscreen.call($el, el);
        $el.trigger('beacon/scroll/onscreen');
    };
    el.jb_offscreen = function () {
        var $el = jQuery(el);
        opts.scroll.offscreen.call($el, el);
        $el.trigger('beacon/scroll/offscreen');
    };
    if (opts.enabled) {
        el.jb_active = true;
    }
    return el;
}
