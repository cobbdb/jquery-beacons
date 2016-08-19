/**
 * @constructor
 * @type {Beacon}
 * @param {Object} opts
 * @param {HTMLElement} opts.el
 * @param {function(Beacon)} [onenter]
 * @param {function(Beacon)} [onexit]
 * @param {number} [opts.range] Defaults to 0.
 */

var nearViewport = require('jquery-near-viewport'),
    smoothScroll = require('../util/smooth-scroll.js');

module.exports = function (opts) {
    var exit = opts.onexit || function () {},
        enter = opts.onenter || function () {},
        el = opts.el,
        range = opts.range || 0,
        active = false,
        enabled = true;

    el.$b_activate = function () {
        var inView = nearViewport(el, range);
        if (enabled) {
            if (inView && !active) {
                enter(el);
            } else if (!inView && active) {
                exit(el);
            }
        }
        active = inView;
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

    smoothScroll(el.$b_activate);
    return el;
};
