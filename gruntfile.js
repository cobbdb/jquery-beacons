module.exports = function (grunt) {
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
        'jasmine:dist-global',
        'jasmine:dist-single',
        'jasmine:dist-other'
    ]);
    grunt.registerTask('dev-test', 'Run SpecRunner.html locally.', [
        'jasmine:dist-global',
        'jasmine:dist-single',
        'jasmine:dist-other',
        'connect',
        'watch'
    ]);
    grunt.registerTask('sl-test', 'SauceLabs test suite.', [
        'jasmine:dist-global',
        'jasmine:dist-single',
        'jasmine:dist-other',
        'connect',
        'saucelabs-jasmine:all'
    ]);
};
