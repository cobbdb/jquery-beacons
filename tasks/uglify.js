module.exports = function (grunt) {
    grunt.config.merge({
        uglify: {
            build: {
                src: [
                    'bower_components/jquery-near-viewport/dist/near-viewport.min.js',
                    'src/**/*.js'
                ],
                dest: 'dist/jquery-beacons.min.js'
            },
            options: {
                enclose: {}
            }
        }
    });
};
