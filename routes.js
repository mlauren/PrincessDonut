'use strict';

var contentDisposition = require('content-disposition'),
    express = require('express'),
    path = require('path'),
    errors = require('./errors');

module.exports = function(app) {

  // server routes ===========================================================
  // handle things like api calls
  app.use('/api/tweets', require('./api/tweets'));

  // frontend routes =========================================================
  app.use('/app', express.static(__dirname + '/app'));

  // app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   // .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
  .get((req, res) => {
    res.sendFile(path.resolve(path.normalize(__dirname + '/app/') + 'index.html'));
  });
};