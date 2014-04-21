var resolve = require('bower-path');

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                curly: true,
                eqeqeq: false,
                indent: 4,
                noarg: true,
                nonew: false,
                plusplus: true,
                quotmark: false,
                trailing: true
            },
            default: {
                src: 'src/*.js'
            }
        },
        uglify: {
            default: {
                src: 'src/jquery-beacons.js',
                dest: 'dist/jquery-beacons.min.js'
            }
        },
        jasmine: {
            default: {
                src: 'dist/**/*.js'
            },
            options: {
                specs: 'tests/*.spec.js',
                vendor: [
                    require.resolve('jquery'),
                    resolve('jquery-near-viewport')
                ]
            }
        },
        watch: {
            source: {
                files: ['src/*.js'],
                tasks: ['default']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', [
        'jshint',
        'uglify'
    ]);

    grunt.registerTask('default', [
        'build',
        'jasmine'
    ]);
};
