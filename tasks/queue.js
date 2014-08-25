module.exports = function (grunt) {
    grunt.config.merge({
        queue: {
            'test-dist': {
                tasks: [
                    'jasmine:dist-global',
                    'jasmine:dist-single',
                    'jasmine:dist-other'
                ]
            }
        }
    });
};
