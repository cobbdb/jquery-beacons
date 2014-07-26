module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });

    // Load in all the external tasks.
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.loadTasks('tasks');

    grunt.registerTask('default', [
        'jshint',
        'jasmine:src',
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
