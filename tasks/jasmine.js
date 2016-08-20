var resolve = require('bower-path');
module.exports = function (grunt) {
    grunt.config.merge({
        jasmine: {
            src: {
                src: [
                    'bower_components/jquery-near-viewport/dist/near-viewport.min.js',
                    'src/**/*.js'
                ],
                options: {
                    specs: [
                        'tests/**/*.spec.js'
                    ],
                    outfile: 'tests/_SpecRunner-dev.html',
                    display: 'full',
                    summary: false
                }
            },
            options: {
                helpers: [
                    resolve('jasmine-jsreporter-real'),
                    'tests/helpers/saucelabs.helper.js',
                    'tests/helpers/test-utils.helper.js',
                    'tests/helpers/setup-teardown.helper.js'
                ],
                vendor: [
                    resolve('jquery')
                ],
                keepRunner: false,
                display: 'short',
                summary: true
            }
        }
    });
};
