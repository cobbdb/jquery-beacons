module.exports = function (grunt) {
    grunt.config.merge({
        jasmine: {
            module: {
                src: [
                    'bin/tests/*.js'
                ]
            },
            bundle: {
                specs: [
                    'tests/bundle/*.spec.js'
                ],
                src: [
                    'dist/jquery-beacons.min.js'
                ],
                options: {
                    vendor: [
                        'node_modules/jquery/dist/jquery.min.js'
                    ]
                }
            },
            options: {
                display: 'full',
                summary: false
            }
        }
    });
};
