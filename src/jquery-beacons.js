var jquery = require('jquery'),
    Beacon = require('./types/beacon.js');

jquery.fn.beacon = function (action) {
    this.each(function (i, el) {
        if (action === 'enable') {
            el.$b_enable();
        } else if (action === 'disable') {
            el.$b_disable();
        } else if (action === 'destroy') {
            el.$b_destroy();
        } else if (typeof action === 'object') {
            action.el = el;
            Beacon(action);
        }
    });
    return this;
};
