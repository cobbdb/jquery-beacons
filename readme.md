# beacon [![Build Status](https://travis-ci.org/cobbdb/jquery-beacon.svg)](https://travis-ci.org/cobbdb/jquery-beacon)

A jQuery plugin to watch when elements scroll into view.

    $ bower install jquery-beacon

-------------
## Creating a new beacon
Beacons are page elements you want to act on when they scroll into view.
Just supply a callback function to run when the beacon is triggered.

    $('.widget').beacon(function () {
        alert('A widget is on screen!');
    });

## Beacon options
For more advanced use cases, there are options available to configure how beacons are tirggered.

    $('.widget').beacon({
        handler: function () {
            alert('A widget will soon appear!');
        },
        offset: 150,
        runOnce: false
    });

#### options.handler
* Required
* Type: ```Function```

The callback to be run when a beacon is activated.

#### options.offset
* Default: ```0```
* Type: ```Number```

A viewport offset can be set which will increase the sensitive portion outside fo the viewport.
For example, an offset of 100 will trigger beacons 100px above the viewport and 100px below the viewport.

#### options.runOnce
* Default: ```false```
* Type: ```Boolean```

Remove the beacon automatically after it has been triggered.

#### options.enabled
* Default: ```true```
* Type: ```Boolean```

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

    $.beacons('destroy');

#### enable / disable
Turn all beacons on or off.

#### destroy
Remove all beacons. This does *not* alter the original page element.

---------
* See: http://plugins.jquery.com/beacon/
* See: http://github.com/cobbdb/jquery-beacon
* License: MIT
