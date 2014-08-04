module.exports = function (grunt) {
    grunt.config.merge({
        uglify: {
            default: {
                src: 'src/*.js',
                dest: 'dist/jquery-beacons.min.js'
            },
            options: {
                enclose: {
                    jQuery: '$'
                }
            }
        }
    });
};
