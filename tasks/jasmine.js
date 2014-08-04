var resolve = require('bower-path');
module.exports = function (grunt) {
    grunt.config.merge({
        jasmine: {
            dist: {
                src: 'dist/**/*.js'
            },
            src: {
                src: 'src/**/*.js'
            },
            options: {
                polyfills: [
                    'bower_components/json2/json2.js',
                    resolve('jasmine-polyfills'),
                    resolve('polyfill-queryselector')
                ],
                specs: [
                    'tests/global-cmds.spec.js',
                    'tests/beacon-cmds.spec.js'
                ],
                helpers: [
                    'bower_components/jasmine-jsreporter-real/jasmine-jsreporter.js',
                    'tests/helpers/saucelabs.helper.js',
                    'tests/helpers/test.helper.js'
                ],
                vendor: [
                    resolve('jquery'),
                    resolve('jquery-near-viewport')
                ],
                outfile: 'tests/_SpecRunner.html',
                keepRunner: true,
                display: 'short',
                summary: true
            }
        }
    });
};
