/**
 * # Smooth Scroll
 * Uses requestAnimationFrame to debounce the scroll event.
 * @param {function()} action Your onscroll event.
 */

var $ = require('jquery');

module.exports = function (scrollAction) {
    var working = false;
    scrollAction = scrollAction || function () {};
    $(global.window).on('scroll', function () {
        if (!working) {
            working = true;
            global.requestAnimationFrame(function () {
                scrollAction();
                working = false;
            });
        }
    }).trigger('scroll');
};
