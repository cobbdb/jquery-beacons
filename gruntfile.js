module.exports = function (grunt) {
    // Load in all the external tasks.
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.loadTasks('tasks');

    grunt.registerTask('test', 'Run tests against raw source', [
        'jasmine:src',
        'jshint'
    ]);
    grunt.registerTask('default', 'Build suite.', [
        'jasmine:src',
        'jshint',
        'uglify',
        'queue:test-dist'
    ]);
    grunt.registerTask('dev-test', 'Run SpecRunner.html locally.', [
        'queue:test-dist',
        'connect',
        'watch'
    ]);
    grunt.registerTask('sl-test', 'SauceLabs test suite.', [
        'queue:test-dist',
        'connect',
        'saucelabs-jasmine:all'
    ]);
};
