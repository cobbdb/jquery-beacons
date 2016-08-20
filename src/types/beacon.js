/**
 * # Beacon
 * @constructor
 * @type {Beacon}
 * @param {Object} opts
 * @param {HTMLElement} opts.el
 * @param {function(Beacon)} [onenter] Event when beacon enters the viewport.
 * @param {boolean} [opts.enteronce=false] True to trip onenter event only once.
 * @param {function(Beacon)} [onexit] Event when beacon leaves the viewport.
 * @param {boolean} [opts.exitonce=false] True to trip onexit event only once.
 * @param {number} [opts.range=0] Pixels from top and bottom of viewport
 * to trigger this beacon.
 */

var nearViewport = require('jquery-near-viewport'),
    smoothScroll = require('../util/smooth-scroll.js');

module.exports = function (opts) {
    var exit = opts.onexit || function () {},
        enter = opts.onenter || function () {},
        el = opts.el,
        range = opts.range || 0,
        active = false,
        enabled = true,
        enteronce = opts.enteronce,
        entered = false,
        exitonce = opts.exitonce,
        exited = false;

    el.$b_activate = function () {
        var inView = nearViewport(el, range),
            exhaustedEnter = enteronce && entered,
            exhaustedExit = exitonce && exited;
        if (enabled) {
            if (inView && !active) {
                if (!exhaustedEnter) {
                    entered = true;
                    enter(el);
                }
            } else if (!inView && active) {
                if (!exhaustedExit) {
                    exited = true;
                    exit(el);
                }
            }
        }
        active = inView;

        // Check if this beacon is exhausted.
        if ((exhaustedEnter) && (exhaustedExit)) {
            el.$b_destroy();
        }
    };
    el.$b_destroy = function () {
        // Permanently destroy the activate() method.
        el.$b_activate = function () {};
    };
    el.$b_disable = function () {
        enabled = false;
    };
    el.$b_enable = function () {
        enabled = true;
    };

    smoothScroll(function () {
        el.$b_activate();
    });
    return el;
};
