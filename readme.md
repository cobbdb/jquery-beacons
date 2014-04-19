# beacon [![Build Status](https://travis-ci.org/cobbdb/jquery-beacon.svg)](https://travis-ci.org/cobbdb/jquery-beacon)

A jQuery plugin to watch when elements scroll into view.

    $ bower install jquery-beacon

-------------
## Creating a new beacon
Beacons are page elements you want to act on when they scroll into view.

    $('.ad').beacon(function () {
        // Run some code now that the ad is on screen.
    });

## Using beacon options
For more advanced use cases, there are options available to configure how beacons are tirggered.

    $('.ad').beacon({
        handler: my-handler,
        offset: 100,
        runOnce: false
    });

#### Handler
***Default: $.noop*** -
The callback to be run when a beacon is activated.

#### Offset
***Default: 0*** -
A viewport offset can be set which will increase the sensitive portion outside fo the viewport.
For example, an offset of 100 will trigger beacons 100px above the viewport and 100px below the viewport.

#### runOnce
***Default: true*** -
Remove any beacon automatically after it has been triggered.

---------
* See: http://plugins.jquery.com/beacon/
* See: http://github.com/cobbdb/jquery-beacon
* License: MIT
