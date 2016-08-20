module.exports = function (grunt) {
    grunt.config.merge({
        browserify: {
            build: {
                files: {
                    'dist/jquery-beacons.js': 'src/jquery-beacons.js'
                },
                options: {
                    alias: './src/jquery.alias.js:jquery'
                }
            }
        }
    });
};
