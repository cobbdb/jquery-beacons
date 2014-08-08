var resolve = require('bower-path');
module.exports = function (grunt) {
    grunt.config.merge({
        jasmine: {
            'dist-global': {
                src: 'dist/**/*.js',
                options: {
                    specs: 'tests/global-cmds.spec.js',
                    outfile: 'tests/_SpecRunner-global.html'
                }
            },
            'dist-single': {
                src: 'dist/**/*.js',
                options: {
                    specs: 'tests/beacon-cmds.spec.js',
                    outfile: 'tests/_SpecRunner-single.html'
                }
            },
            src: {
                src: [
                    'bower_components/jquery-near-viewport/dist/near-viewport.min.js',
                    'src/**/*.js'
                ],
                options: {
                    specs: [
                        'tests/global-cmds.spec.js',
                        'tests/beacon-cmds.spec.js'
                    ],
                    keepRunner: false,
                    display: 'full',
                    summary: false
                }
            },
            options: {
                helpers: [
                    resolve('jasmine-jsreporter-real'),
                    'tests/helpers/saucelabs.helper.js',
                    'tests/helpers/test.helper.js'
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
