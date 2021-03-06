'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**.*.js'],
      options: {
        jshintrc: '.jshintrc',
      },
    },
    concat: {
      options: {
        banner: [
          '/*!',
          ' * <%= pkg._name %> v<%= pkg.version %>',
          ' * <%= pkg.homepage %>',
          ' *',
          ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>',
          ' * Released under the <%= pkg.license %> license',
          ' */\n',
        ].join('\n'),
      },
      dist: {
        src: ['src/<%= pkg.main %>.js'],
        dest: 'dist/<%= pkg._name %>.js',
      },
    },
    uglify: {
      options: {
        banner: [
          '/*!',
          ' * <%= pkg._name %> v<%= pkg.version %>',
          ' * <%= pkg.homepage %>',
          ' *',
          ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>',
          ' * Released under the <%= pkg.license %> license',
          ' */\n',
        ].join('\n'),
      },
      dist: {
        files: {
          'dist/<%= pkg._name %>.min.js': ['dist/<%= pkg._name %>.js'],
        },
      },
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint'],
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('build', ['concat', 'uglify']);
  grunt.registerTask('lint', ['jshint']);

  grunt.registerTask('default', ['test', 'lint']);
};
