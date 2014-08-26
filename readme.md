[![Beacons](http://i.imgur.com/WVg4Pft.png)](https://cobbdb.github.io/jquery-beacons)

[![Build Status](https://travis-ci.org/cobbdb/jquery-beacons.svg?branch=master)](https://travis-ci.org/cobbdb/jquery-beacons) [![Bower version](https://badge.fury.io/bo/jquery-beacons.svg)](http://badge.fury.io/bo/jquery-beacons)

A jQuery plugin to react when elements are in view.

    $ bower install jquery-beacons

[![Saucelabs Test Status](https://saucelabs.com/browser-matrix/jquery-beacons.svg?branch=master)](https://saucelabs.com/u/jquery-beacons)

-------------
## Creating a new beacon
Beacons are page elements you want to act on when they scroll into view.
Just supply a callback function to run when the beacon is triggered.

    $('.widget').beacon(function () {
        alert('A widget is on screen!');
    });

#### Convenience variables for your handlers
Provided to the beacon's handler is both the DOM object as well
as the jQuery object.

    $('.widget').beacon(function (el) {
        // 'el' is the DOM object.
        var pos = el.style.position;
        // 'this' is the jQuery object.
        var color = this.css('background-color');
    });

#### Bind side-effects dynamically
When a beacon activates, it triggers several jQuery events so you can keep your
code modular.

    $('#my-widget').
        on('beacon/activate', function () {
            alert('The widget is visible!');
        }).
        on('beacon/scroll/onscreen', function () {
            alert('The widget has come into view!');
        }).
        on('beacon/scroll/offscreen', function () {
            alert('The widget has scrolled out of view!');
        });

## Beacon options
For more advanced use cases, there are options available to configure how beacons are triggered.

    $('.widget').beacon({
        handler: function () {
            alert('A widget is visible!');
        },
        runOnce: true,
        scroll: {
            offscreen: function () {
                alert('The widget is gone now!');
            }
        }
    });

#### options.handler
* Default: ```noop```
* Type: ```function```

The callback to be run when a beacon is activated.

#### options.runOnce
* Default: ```false```
* Type: ```boolean```

Remove the beacon automatically after it has been triggered by the handler.

#### options.scroll.onscreen
* Default: ```noop```
* Type: ```function```

Callback for when the beacon scrolls on screen. This is triggered only once
when the beacon becomes visible, but can trigger multiple times - once for
each time the beacon becomes visible. The `runOnce` option does not apply
to the scroll callbacks. Does not trigger if beacon is disabled.

#### options.scroll.offscreen
* Default: ```noop```
* Type: ```function```

Companion for the `onscreen` callback. This behaves according to the same
rules as `onscreen` except applies to when the beacon scrolls off the viewport
instead.

#### options.range
* Default: ```0```
* Type: ```number```

Set a specific range for this beacon. If no range is provided,
then it will use the [global range value](#con_global_range).

#### options.enabled
* Default: ```true```
* Type: ```boolean```

Whether or not the beacon is active after its creation. See the section on [enabling/disabling beacons](#con_enable) for more information.

## Beacon controls
For more complicated scenarios, there are commands to control what your beacons are doing.

    $('.widget').beacon('disable');

#### activate
Trip a beacon regardless of if it's viewable or not. This does
not affect disabled beacons.

#### destroy
Remove the beacon from the system, but retain the original element.

#### enable / disable <a name="con_enable"></a>
Turn an individual beacon on or off, but does not destroy it. Disabled beacons cannot
be tripped manually with `activate`.

## Global controls
Here are some options to control all your beacons at once.

    $.beacons({
        range: 150
    });
    $.beacons('enable');

#### activate
Trip all beacons regardless of if they are viewable or not. This does not
affect disabled beacons.

#### destroy
Remove all beacons. This does *not* alter the original page element.

#### enable / disable
Turn all beacons on or off.

#### fetch
* Returns: ```array```

Return the array of all beacons in the system - including disabled beacons.

#### settings
* Returns: ```object```

Fetch the current system settings.

#### options.range <a name="con_global_range"></a>
* Default: ```0```
* Type: ```number```

An offset in pixels to increase the range outside of the viewport.
For example, an offset of 100 will trigger beacons 100px above the viewport and 100px below the viewport.

#### options.throttle
* Default: ```80```
* Type: ```number```

The rate at which beacons are inspected. This value is in milliseconds.

---------
* See: http://plugins.jquery.com/beacons/
* See: http://github.com/cobbdb/jquery-beacons
* License: MIT
