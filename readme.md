# beacons

[![Build Status](https://travis-ci.org/cobbdb/jquery-beacons.svg)](https://travis-ci.org/cobbdb/jquery-beacons) [![Bower version](https://badge.fury.io/bo/jquery-beacons.svg)](http://badge.fury.io/bo/jquery-beacons) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

A jQuery plugin to react when elements scroll into view.

    $ bower install jquery-beacons

**Note:** This plugin depends on jquery-near-viewport which is listed as a bower dependency.

[![Saucelabs Test Status](https://saucelabs.com/browser-matrix/dcobb.svg)](https://saucelabs.com/u/dcobb)

-------------
## Creating a new beacon
Beacons are page elements you want to act on when they scroll into view.
Just supply a callback function to run when the beacon is triggered.

    $('.widget').beacon(function () {
        alert('A widget is on screen!');
    });

## Beacon options
For more advanced use cases, there are options available to configure how beacons are triggered.

    $('.widget').beacon({
        handler: function () {
            alert('A widget has appeared!');
        },
        runOnce: true
    });

#### options.handler
* Required
* Type: ```function```

The callback to be run when a beacon is activated.

#### options.runOnce
* Default: ```false```
* Type: ```boolean```

Remove the beacon automatically after it has been triggered.

#### options.enabled
* Default: ```true```
* Type: ```boolean```

Whether or not the beacon is active after its creation. See the section on [enabling/disabling beacons](#con_enable) for more information.

## Beacon controls
For more complicated scenarios, there are commands to control what your beacons are doing.

    $('.widget').beacon('disable');

#### enable / disable <a name="con_enable"></a>
Turn an individual beacon on or off.

#### destroy
Remove the beacon, but retain the original element.

## Global controls
Here are some options to control all your beacons at once.

    $.beacons({
        range: 150
    });
    $.beacons('enable');

#### enable / disable
Turn all beacons on or off.

#### destroy
Remove all beacons. This does *not* alter the original page element.

#### settings
Fetch the current system settings.

#### options.range
* Default: ```0```
* Type: ```number|string```

An offset in pixels to increase the range outside of the viewport.
For example, an offset of 100 will trigger beacons 100px above the viewport and 100px below the viewport.

#### options.context
* Default: ```window```
* Type: ```object|selector```

The container in which the scrolling will happen.
This is typically ```window```, but can be to something else if you have a special case.

#### options.throttle
* Default: ```80```
* Type: ```number```

Limit the rate at which beacons are inspected. This value is in milliseconds.

---------
* See: http://plugins.jquery.com/beacons/
* See: http://github.com/cobbdb/jquery-beacons
* License: MIT
