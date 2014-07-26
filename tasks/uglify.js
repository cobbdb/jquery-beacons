module.exports = function (grunt) {
    grunt.config.merge({
        uglify: {
            default: {
                src: 'src/jquery-beacons.js',
                dest: 'dist/jquery-beacons.min.js'
            }
        }
    });
};
