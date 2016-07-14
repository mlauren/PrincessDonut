'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
  path = require('path');

module.exports = function (grunt) {
  // Project Configuration
  grunt.initConfig({
    env: {
      test: {
        NODE_ENV: 'test'
      },
      dev: {
        NODE_ENV: 'development'
      },
      prod: {
        NODE_ENV: 'production'
      }
    },
    server: {
      port: 3030,
      base: './'
    }
  });

  grunt.task.registerTask('server', 'Starting the server', function () {
    grunt.log.writeln('Started web server on port 3000');
    require('./server.js').listen(3030);
  });

  // grunt.registerTask('default', ['concurrent:default']);

};

