(function ($) {
    var hash = false;
    var throttle = 80;
    var context = window;
    var range = 0;
    var active = false;

    /**
     *  Main loop of the plugin.
     */
    var run = function () {
        if (!active) {
            hash = true;
            active = true;
            $(context).on('scroll.beacon', function () {
                if (!hash && active) {
                    var set = $('.beacon.beacon-on');
                    if (set.length) {
                        set = set.filter(':near-viewport(' + range + ')');
                        set.trigger('beacon/activate');
                    }
                    // Throttle the heartbeat for performance.
                    hash = window.setTimeout(function () {
                        hash = false;
                    }, throttle);
                }
            });
        }
    };

    /**
     *  Create a new beacon, or issue commands to an individual beacon.
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
        beacons.push(this);
    };

    /**
     *  Global beacon commands.
     */
    $.beacons = function (action, opts) {
        if (action === 'destroy') {
            active = false;
            $('.beacon').removeClass('beacon-on beacon');
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
