'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: ['index.js','Gruntfile','test/**/*.js']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('lint',['jshint']);
};
