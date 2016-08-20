module.exports = function (grunt) {
    grunt.config.merge({
        browserify: {
            bundle: {
                files: {
                    'dist/jquery-beacons.js': 'src/jquery-beacons.js'
                },
                options: {
                    alias: './src/jquery.alias.js:jquery'
                }
            },
            specs: {
                dest: 'bin/tests',
                src: 'tests/*.spec.js'
            }
        }
    });
};
