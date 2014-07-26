module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });

    // Load in all the external tasks.
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.loadTasks('tasks');

    grunt.registerTask('default', 'Build suite.', [
        'jshint',
        'jasmine:src',
        'uglify',
        'jasmine:dist'
    ]);
    grunt.registerTask('dev-test', 'Run SpecRunner.html locally.', [
        'connect',
        'watch'
    ]);
    grunt.registerTask('sl-test', 'SauceLabs test suite.', [
        'connect',
        'jasmine:dist',
        'saucelabs-jasmine'
    ]);
};
