/**
 * Spec for global beacon commands: $.beacons()
 */
describe("$.beacons", function () {
    var winHeight;
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
        $('#' + id).beacon(function () {});
    };

    // Setup the environment.
    $(function () {
        newBeacon('TST01', 10);
        newBeacon('TST02', 200);
        newBeacon('TST03', 500);
        winHeight = window.innerHeight;
    });

    // Run the tests.
    it('')

    it("matches visible by default", function () {
        var set = $('#test:near-viewport');
        expect(set.length).toEqual(1);
    });
    it("accepts 0 as an offset", function () {
        var set = $('#test:near-viewport(0)');
        expect(set.length).toEqual(1);
    });
    it("accepts 100 as an offset", function () {
        var set = $('#test:near-viewport(100)');
        expect(set.length).toEqual(1);
    });
    it("does not match distant elements by default", function () {
        moveTo(winHeight + 10);
        var set = $('#test:near-viewport');
        expect(set.length).toEqual(0);
    });
    it("does not match distant elements with a short offset", function () {
        moveTo(winHeight + 1000);
        var set = $('#test:near-viewport(10)');
        expect(set.length).toEqual(0);
    });
    it("matches distant elements with a long offset", function () {
        moveTo(winHeight + 10);
        var set = $('#test:near-viewport(1000)');
        expect(set.length).toEqual(1);
    });
    it("matches partially visible elements above", function () {
        moveTo(-elHeight);
        var set = $('#test:near-viewport');
        expect(set.length).toEqual(1);
    });
    it("matches partially visible elements below", function () {
        moveTo(winHeight - 2);
        var set = $('#test:near-viewport');
        expect(set.length).toEqual(1);
    });
    it("is pixel perfect above", function () {
        moveTo(-elHeight);
        var set = $('#test:near-viewport');
        expect(set.length).toEqual(0);

        moveTo(-elHeight);
        set = $('#test:near-viewport(1)');
        expect(set.length).toEqual(1);
    });
    it("is pixel perfect below", function () {
        moveTo(winHeight);
        set = $('#test:near-viewport(0)');
        expect(set.length).toEqual(0);

        moveTo(winHeight);
        set = $('#test:near-viewport(1)');
        expect(set.length).toEqual(1);
    });
});
