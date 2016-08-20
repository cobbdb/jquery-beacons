module.exports = function (grunt) {
    grunt.config.merge({
        browserify: {
            bundle: {
                files: {
                    'dist/jquery-beacons.js': 'src/jquery-beacons.js'
                },
                options: {
                    alias: {
                        'jquery': './src/jquery.alias.js'
                    }
                }
            }
        }
    });
};
