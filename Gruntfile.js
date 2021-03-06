/*
 * Generated on 2015-05-18
 * generator-assemble v0.5.0
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2015 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist'
    },
    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      css:{
        files:['<%= config.src %>/assets/{,*/}*.css'],
        tasks:['copy:theme']
      },
      js:{
        files:['<%= config.src %>/assets/{,*/}*.js'],
        tasks:['copy:themejs']
      },
      img:{
        files:['<%= config.src %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'],
        tasks:['copy:themeimg']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: '<%= config.dist %>/assets',
          layoutdir: '<%= config.src %>/templates/layouts',
          layout: 'default.hbs',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/templates/partials/*.hbs'
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
        }
      }
    },

    copy: {
      lightgallery: {
        expand: true,
        cwd: 'bower_components/lightgallery/dist/',
        src: '**',
        dest: '<%= config.dist %>/assets/js/plugins/lightgallery/'
      },
      jqmin: {
        expand: true,
        cwd: 'bower_components/jquery/dist/',
        src: '{,*/}*.min.{js,map}',
        dest: '<%= config.dist %>/assets/js/'
      },
      materialize: {
        expand: true,
        cwd: 'bower_components/materialize/dist/',
        src: '**',
        dest: '<%= config.dist %>/assets/'
      },
      theme: {
        expand: true,
        cwd: 'src/assets/',
        src: '{,*/}*.css',
        dest: '<%= config.dist %>/assets/css/'
      },
      themejs: {
        expand: true,
        cwd: 'src/assets/js',
        src: '{,*/}*.js',
        dest: '<%= config.dist %>/assets/js/'
      },
      themeimg: {
        expand: true,
        cwd: 'src/assets/img',
        src: '{,*/}*.{jpg,png,gif}',
        dest: '<%= config.dist %>/assets/img/'
      }
    },
    autoprefixer: {
      options: {
        // Task-specific options go here.
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
      },
      single_file: {
        options: {
          // Target-specific options go here.
        },
        src: '<%= config.dist %>/assets/css/theme.css',
        dest: '<%= config.dist %>/assets/css/creekside-prefixed.css'
      },
    },
    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/**/*.{html,xml}']

  });

  grunt.loadNpmTasks('assemble');

  grunt.registerTask('server', [
    'build',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'copy',
    'assemble',
    'autoprefixer'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
