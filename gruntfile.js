module.exports = function (grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.loadTasks('tasks');

    grunt.registerTask('test', 'Run tests against raw source', [
        'jasmine'
    ]);
    grunt.registerTask('default', 'Full build suite.', [
        'jasmine',
        'jshint',
        'browserify',
        'uglify'
    ]);
};
