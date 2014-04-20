/**
 * Beacons - A jQuery plugin to react when elements scroll into view.
 * @author Dan Cobb
 * @license MIT
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
     */
    $.fn.beacon = function (action) {
        if ($.isFunction(action)) {
            // Shortcut - enable and listen.
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
            this.on('beacon/activate', function () {
                action.handler();
                if (action.runOnce) {
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
     */
    $.beacons = function (action) {
        if (action === 'destroy') {
            active = false;
            $('.beacon').beacon('destroy');
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
