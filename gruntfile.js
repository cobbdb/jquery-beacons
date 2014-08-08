module.exports = function (grunt) {
    // Load in all the external tasks.
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.loadTasks('tasks');

    grunt.registerTask('default', 'Build suite.', [
        'jasmine:src',
        'jshint',
        'uglify',
        'jasmine:dist-global',
        'jasmine:dist-single'
    ]);
    grunt.registerTask('dev-test', 'Run SpecRunner.html locally.', [
        'jasmine:dist-global',
        'jasmine:dist-single',
        'connect',
        'watch'
    ]);
    grunt.registerTask('sl-test', 'SauceLabs test suite.', [
        'jasmine:dist-global',
        'jasmine:dist-single',
        'connect',
        'saucelabs-jasmine'
    ]);
};
