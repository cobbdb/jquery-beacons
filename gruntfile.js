module.exports = function (grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.loadTasks('tasks');

    grunt.registerTask('test', 'Minimal test suite.', [
        'browserify:specs',
        'jasmine:module'
    ]);
    grunt.registerTask('default', 'Full build suite.', [
        'test',
        'jshint',
        'browserify:bundle',
        'uglify',
        'jasmine:bundle'
    ]);
};
