module.exports = function (grunt) {
    grunt.config.merge({
        connect: {
            server: {
                options: {
                    base: '',
                    port: 9999
                }
            }
        },
        watch: {}
    });
};
