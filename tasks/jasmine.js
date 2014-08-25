var resolve = require('bower-path');
module.exports = function (grunt) {
    grunt.config.merge({
        jasmine: {
            'dist-global': {
                src: 'dist/**/*.js',
                options: {
                    specs: 'tests/global/*.spec.js',
                    outfile: 'tests/_SpecRunner-global.html'
                }
            },
            'dist-single': {
                src: 'dist/**/*.js',
                options: {
                    specs: 'tests/single/*.spec.js',
                    outfile: 'tests/_SpecRunner-single.html'
                }
            },
            'dist-other': {
                src: 'dist/**/*.js',
                options: {
                    specs: 'tests/other/*.spec.js',
                    outfile: 'tests/_SpecRunner-other.html'
                }
            },
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
                keepRunner: true,
                display: 'short',
                summary: true
            }
        }
    });
};
