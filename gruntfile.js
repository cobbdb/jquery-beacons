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
            dist: {
                src: 'dist/**/*.js'
            },
            raw: {
                src: 'src/**/*.js'
            },
            options: {
                specs: 'tests/*.spec.js',
                helpers: [
                    'bower_components/jasmine-jsreporter-real/jasmine-jsreporter.js',
                    'tests/saucelabs.helper.js',
                    'tests/helpers.js'
                ],
                vendor: [
                    resolve('jquery'),
                    resolve('jquery-near-viewport')
                ],
                outfile: 'tests/_SpecRunner.html',
                keepRunner: true,
                display: 'short',
                summary: true
            }
        },
        watch: {
            default: {
                files: [
                    'src/*.js',
                    'tests/*.spec.js'
                ],
                tasks: ['default']
            }
        },
        connect: {
            server: {
                options: {
                    base: '',
                    port: 9999
                }
            }
        },
        watch: {}
    });

    // Load in all the external tasks.
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.loadTasks('tasks');

    grunt.registerTask('default', [
        'jshint',
        'uglify',
        'jasmine:dist'
    ]);
    grunt.registerTask('dev-test', [
        'connect',
        'watch'
    ]);
    grunt.registerTask('sl-test', [
        'connect',
        'jasmine:dist',
        'saucelabs-jasmine'
    ]);
};
