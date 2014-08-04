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
// Collection of HTML elements.
var beacons = [];
