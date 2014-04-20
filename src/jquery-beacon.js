/**
 * Beacon - A jQuery plugin to react when elements scroll into view.
 * @module jquery-beacon
 */
(function ($) {
    // Interval hash used for performance throttling.
    var hash = false;
    // Refresh rate of the heartbeat in milliseconds.
    var throttle = 80;
    // The container to which the scroll event is bound.
    var context = window;
    // Offset in pixels from the viewport.
    var range = 0;
    // Whether or not the heartbeat is active.
    var active = false;

    // Main loop of the plugin.
    var run = function () {
        if (!active) {
            hash = true;
            active = true;
            $(context).on('scroll.beacon', function () {
                if (!hash && active) {
                    var set = $('.beacon.beacon-on:near-viewport(' + range + ')');
                    /**
                     * Fired when a beacon should activate.
                     * @event beacon/activate
                     */
                    set.trigger('beacon/activate');
                    // Throttle the heartbeat for performance.
                    hash = window.setTimeout(function () {
                        hash = false;
                    }, throttle);
                }
            });
        }
    };

    /**
     * Create a new beacon or issue commands to
     * an individual beacon.
     * @class beacon
     * @constructor
     *
     * @param option {Function|String|Object} Either
     * a callback, command, or config.
     * @param option.callback {Function} Create a
     * new beacon with the provided callback.
     * @param option.command {String} One of the
     * following commands:
     *  * enable
     *  * disable
     *  * destroy
     * @param option.config {Object} Create a new
     * beacon with the following configuration.
     * @param {Function} option.config.handler Callback
     * when this beacon is activated.
     * @param {Boolean} [option.config.runOnce=false] True
     * to destroy this beacon after it has been
     * activated.
     * @param {Boolean} [option.config.enabled=true] Whether
     * or not the beacon is active after its creation.
     * @returns jQuery object.
     */
    $.fn.beacon = function (action) {
        if ($.isFunction(action)) {
            // Shortcut - enable and listen.
            if (!action) {
                throw Error('Beacon Creation Error: All beacons require a handler.');
            }
            this.addClass('beacon beacon-on');
            this.on('beacon/activate', action);
            run();
        } else if (action === 'enable') {
            this.filter('.beacon').addClass('beacon-on');
        } else if (action === 'disable') {
            this.removeClass('beacon-on');
        } else if (action === 'destroy') {
            this.removeClass('beacon beacon-on');
            this.off('beacon/activate');
        } else {
            if (!action.handler) {
                throw Error('Beacon Creation Error: All beacons require a handler.');
            }
            this.addClass('beacon');
            var runOnce = action.runOnce || false;
            this.on('beacon/activate', function () {
                action.handler();
                if (runOnce) {
                    this.beacon('destroy');
                }
            });
            var enabled = action.enabled || true;
            if (enabled) {
                this.addClass('beacon-on');
                run();
            }
        }
        return this;
    };

    /**
     * Commands that apply to all beacons.
     * @method beacons
     * @for jquery
     *
     * @param option {String|Object} Either
     * a command or config.
     * @param option.command {String} One of the
     * following commands:
     *  * destroy
     *  * disable
     *  * enable
     * @param option.config {Object} Apply a
     * setting for all beacons.
     * @param {Number} [option.config.throttle] Set
     * the speed of the system's heartbeat.
     * @param {Number} [option.config.range] Offset in
     * pixels from the viewport. This is used for
     * offscreen elements.
     * @param {Object} [option.config.context] The
     * container to which the scroll event is bound.
     */
    $.beacons = function (action) {
        if (action === 'destroy') {
            active = false;
            $('.beacon')
                .removeClass('beacon-on beacon')
                .off('beacon/activate');
            $(context).off('scroll.beacon');
        } else if (action === 'enable') {
            $('.beacon').addClass('.beacon-on');
            run();
        } else if (action === 'disable') {
            $('.beacon').removeClass('.beacon-on');
            active = false;
            $(context).off('scroll.beacon');
        } else {
            range = action.range || range;
            context = action.context || context;
            throttle = action.throttle || throttle;
        }
    };
}(jQuery));
