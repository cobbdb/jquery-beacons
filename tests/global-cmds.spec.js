/**
 * Spec for global beacon commands: $.beacons()
 */
describe("$.beacons", function () {
    var winHeight;
    var switchboard = {};
    var move = function (id) {
        return {
            to: function (top) {
                $('#test').css({
                    position: 'absolute',
                    top: top + 'px'
                });
            }
        };
    };
    var newBeacon = function (id, top) {
        $('body').append('<div id="' + id + '">test div</div>');
        move(id).to(top);
        switchboard[id] = false;
        $('#' + id).beacon(function () {
            switchboard[id] = true;
        });
    };

    // Setup the environment.
    $(function () {
        newBeacon('TST01', 10);
        newBeacon('TST02', 200);
        newBeacon('TST03', 500);
        winHeight = window.innerHeight;
    });

    // Run the tests.
    describe('destroy option', function () {});
    describe('disable option', function () {});
    describe('enable option', function () {});
    describe('settings option', function () {
        it('can fetch all current settings', function () {
            var defaults = $.beacons('settings');
            expect(defaults).toBeDefined();
        });
        it('can set all new configurations', function () {
            var test = {};
            $.beacons({
                context: test,
                throttle: 183,
                range: 52
            });
            var config = $.beacons('settings');
            expect(config.context).toEqual(test);
            expect(config.throttle).toEqual(183);
            expect(config.range).toEqual(52);
        });
        it('can set a few new settings', function () {
            var oldConf = $.beacons('settings');
            $.beacons({
                throttle: 98
            });
            var newConf = $.beacons('settings');
            expect(newConf.context).toEqual(oldConf.context);
            expect(newConf.throttle).toEqual(98);
            expect(newConf.range).toEqual(oldConf.range);
        });
    });
});
