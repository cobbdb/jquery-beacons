beforeEach(function () {
    expect(jQuery('.testdiv').length).toEqual(0);
    expect(jQuery.beacons('fetch').length).toEqual(0);
    // Partially on-screen.
    $jb.newBeacon('TST01', -2);
    // Completely on-screen.
    $jb.newBeacon('TST02', 5);
    // Completely off-screen.
    $jb.newBeacon('TST03', 2500);
    expect($('.testdiv').length).toEqual(3);
    expect($.beacons('fetch').length).toEqual(3);
});

afterEach(function () {
    jQuery.beacons('destroy');
    jQuery('.testdiv').remove();
    $jb.div = {};
    expect($('.testdiv').length).toEqual(0);
    expect($.beacons('fetch').length).toEqual(0);
});
