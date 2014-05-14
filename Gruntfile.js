module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

    // Package meta
    pkg: grunt.file.readJSON('package.json'),

    // grunt-contrib-jshint
    // ...
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: [
        'Gruntfile.js',
        'src/**/*.js',
        'test/**/*.js'
      ]
    },

    // grunt-contrib-uglify
    // ...
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> | Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> | Released under the <%= pkg.license %> license %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['src/<%= pkg.name %>.js']
        }
      }
    },

    // grunt-contrib-watch
    // ...
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }

  })

  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('test', ['jshint'])
  grunt.registerTask('default', ['test', 'uglify'])

}