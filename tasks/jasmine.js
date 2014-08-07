var resolve = require('bower-path');
module.exports = function (grunt) {
    grunt.config.merge({
        jasmine: {
            dist: {
                src: 'dist/**/*.js'
            },
            src: {
                src: [
                    'bower_components/jquery-near-viewport/dist/near-viewport.min.js',
                    'src/**/*.js'
                ]
            },
            options: {
                polyfills: [
                    'bower_components/json2/json2.js',
                    resolve('polyfill-queryselector'),
                    resolve('jasmine-polyfills')
                ],
                specs: [
                    'tests/global-cmds.spec.js',
                    'tests/beacon-cmds.spec.js'
                ],
                helpers: [
                    resolve('jasmine-jsreporter-real'),
                    'tests/helpers/saucelabs.helper.js',
                    'tests/helpers/test.helper.js'
                ],
                vendor: [
                    resolve('jquery')
                ],
                outfile: 'tests/_SpecRunner.html',
                keepRunner: true,
                display: 'full',
                summary: false
            }
        }
    });
};
