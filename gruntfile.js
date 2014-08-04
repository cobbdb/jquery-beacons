module.exports = function (grunt) {
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
        'jasmine:dist',
        'connect',
        'watch'
    ]);
    grunt.registerTask('sl-test', 'SauceLabs test suite.', [
        'jasmine:dist',
        'connect',
        'saucelabs-jasmine'
    ]);
};
