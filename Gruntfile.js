module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: '1012582116@qq.com',
                password: 'huangpeijun53',
                branch: 'master',
                ptr: false
            },
            dist: {
                src: ['dist/*.js']
            }
        }
    });
}