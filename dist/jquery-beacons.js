require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * # nearViewport()
 * Global function attached to the `window` object.
 */

/**
 * ### getWinTop()
 * Cross-browser check for the the window's scroll top.
 * @return {Number}
 */
function getWinTop() {
    if (window.pageYOffset === undefined) {
        return (document.documentElement || document.body.parentNode || document.body).scrollTop;
    }
    return window.pageYOffset;
}

/**
 * ## nearViewport(el, [margin])
 * @param {Element} el The DOM element to check.
 * @param {Number} [margin] Defaults to 0. Offset in
 * pixels from the top and bottom of the viewport to
 * include when checking for the element.
 * @return {Boolean} True if the element is near
 * the viewport.
 */
module.exports = function (el, margin) {
    var winTop = getWinTop();
    var winHeight = document.documentElement.clientHeight;
    var winBottom = winTop + winHeight;
    margin = margin || 0;

    var rect = el.getBoundingClientRect();
    var elTop = rect.top + winTop - margin;
    var elBottom = rect.bottom + winTop + margin;

    return elBottom > winTop && elTop < winBottom;
};

},{}],2:[function(require,module,exports){
var jquery = require('jquery'),
    Beacon = require('./types/beacon.js');

jquery.fn.beacon = function (action) {
    this.each(function (i, el) {
        if (action === 'enable') {
            el.$b_enable();
        } else if (action === 'disable') {
            el.$b_disable();
        } else if (action === 'destroy') {
            el.$b_destroy();
        } else if (typeof action === 'object') {
            action.el = el;
            Beacon(action);
        }
    });
    return this;
};

},{"./types/beacon.js":3,"jquery":"jquery"}],3:[function(require,module,exports){
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
        var inView = nearViewport(el, range);
        if (enabled) {
            if (inView && !active) {
                if (enteronce && !entered) {
                    entered = true;
                    enter(el);
                }
            } else if (!inView && active) {
                if (exitonce && !exited) {
                    exited = true;
                    exit(el);
                }
            }
        }
        active = inView;

        // Check if this beacon is exhausted.
        if ((enteronce && entered) && (exitonce && exited)) {
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

    smoothScroll(el.$b_activate);
    return el;
};

},{"../util/smooth-scroll.js":4,"jquery-near-viewport":1}],4:[function(require,module,exports){
(function (global){
/**
 * # Smooth Scroll
 * Uses requestAnimationFrame to debounce the scroll event.
 * @param {function()} action Your onscroll event.
 */

var $ = require('jquery');

module.exports = function (scrollAction) {
    var working = false;
    scrollAction = scrollAction || function () {};
    $(global.window).on('scroll', function () {
        if (!working) {
            working = true;
            global.requestAnimationFrame(function () {
                scrollAction();
                working = false;
            });
        }
    }).trigger('scroll');
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"jquery":"jquery"}],"jquery":[function(require,module,exports){
(function (global){
module.exports = global.jQuery;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[2]);
