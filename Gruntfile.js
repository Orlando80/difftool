'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: ['index.js','Gruntfile','test/**/*.js']
    },
 bump: {
    options: {
      files: ['package.json'],
      updateConfigs: [],
      commit: true,
      commitMessage: 'Release v%VERSION%',
      commitFiles: ['package.json'],
      createTag: true,
      tagName: 'v%VERSION%',
      tagMessage: 'Version %VERSION%',
      push: true,
      pushTo: 'origin',
      gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
      globalReplace: false,
      prereleaseName: false,
      regExp: false
    }
  }
  });
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('lint',['jshint']);
  grunt.registerTask('deploy',['bump']);
};
