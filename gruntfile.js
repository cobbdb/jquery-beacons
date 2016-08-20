module.exports = function (grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.loadTasks('tasks');

    grunt.registerTask('default', 'Full build suite.', [
        'jshint',
        'browserify:bundle',
        'uglify'
    ]);
};
