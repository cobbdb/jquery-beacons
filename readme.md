[![Beacons](https://i.imgur.com/bCS34uV.png)](//cobbdb.github.io/jquery-beacons)

[![License](https://img.shields.io/npm/l/jquery-beacons.svg)](//npmjs.com/package/jquery-beacons)
[![Bower version](https://badge.fury.io/bo/jquery-beacons.svg)](//badge.fury.io/bo/jquery-beacons)
[![NPM version](https://badge.fury.io/js/jquery-beacons.svg)](//badge.fury.io/js/jquery-beacons)
[![Dependencies](https://img.shields.io/david/dev/cobbdb/jquery-beacons.svg)](./package.json)

React when elements are in view.

    $ bower i jquery-beacons
    $ npm i jquery-beacons

## Loading the plugin
#### Using Browserify
```javascript
var $ = require('jquery');
require('jquery-beacons');
$('.widget').beacon({..});
```
#### As a JS global
```html
<script src="path/to/jquery.js"></script>
<script src="path/to/jquery-beacons.min.js"></script>
<script>
    $('.widget').beacon({..});
</script>
```

## Creating a new beacon
Beacons are page elements you want to act on when they scroll into view.
```javascript
$('.widget').beacon({
    onenter: function (el) {
        alert('Widget ' + el.id + ' is on screen!');
    }
});
```

## Beacon options
```javascript
$('.widget').beacon({
    enteronce: true,
    onenter: function () {
        alert('A widget is visible!');
    }
});
```

#### *{function(HTMLElement)}* [onenter]
Event when beacon enters the viewport.

#### *{boolean}* [opts.enteronce=false]
True to trip onenter event only once.

#### *{function(HTMLElement)}* [onexit]
Event when beacon leaves the viewport.

#### *{boolean}* [opts.exitonce=false]
True to trip onexit event only once.

#### *{number}* [opts.range=0]
Pixels from top and bottom of viewport to trigger this beacon.

## Beacon actions
```javascript
$(.widget).beacon('enable');
$(.widget).beacon('disable');
$(.widget).beacon('destroy');
```

---------
* See: http://plugins.jquery.com/beacons
* See: http://github.com/cobbdb/jquery-beacons
* License: MIT
