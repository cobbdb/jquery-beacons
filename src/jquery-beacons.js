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
        // Explicitly trip all beacons.
        activateBeacons();
        // Do nothing if already active.
        if (!active) {
            active = true;
            // Pulse on an interval to look for new beacons.
            hash = window.setInterval(function () {
                activateBeacons();
                if (!active) {
                    window.clearInterval(hash);
                }
            }, throttle);
        }
    };
    var activateBeacons = function () {
        var set = $('.beacon.beacon-on:near-viewport(' + range + ')');
        set.trigger('beacon/activate');
    };

    /**
     * Create a new beacon or issue commands to
     * an individual beacon.
     */
    $.fn.beacon = function (action) {
        if (typeof action === 'function') {
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
            // Stop the heartbeat if no more beacons are left.
            if (!$('.beacon').length) {
                active = false;
            }
        } else if (typeof action === 'object') {
            if (!action.handler) {
                throw Error('Beacon Creation Error: All beacons require a handler.');
            }
            this.addClass('beacon');
            var $this = this;
            this.on('beacon/activate', function () {
                action.handler();
                if (action.runOnce) {
                    $this.beacon('destroy');
                }
            });
            var enabled = (typeof action.enabled === 'undefined') ? true : action.enabled;
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
        } else if (action === 'enable') {
            $('.beacon').addClass('beacon-on');
            run();
        } else if (action === 'disable') {
            $('.beacon').removeClass('beacon-on');
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
}(jQuery));
