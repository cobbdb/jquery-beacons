module.exports = function (grunt) {
    grunt.config.merge({
        uglify: {
            build: {
                files: {
                    'dist/jquery-beacons.min.js': 'dist/jquery-beacons.js'
                }
            }
        }
    });
};
