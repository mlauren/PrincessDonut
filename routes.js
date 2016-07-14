'use strict';

var contentDisposition = require('content-disposition'),
    express = require('express'),
    path = require('path'),
    errors = require('./errors');

module.exports = function(app) {

  // server routes ===========================================================
  // handle things like api calls
  // authentication routes

  // frontend routes =========================================================
  app.use('/app/js', express.static(__dirname + "/app/js"));
  app.use('/app/work', express.static(__dirname + "/app/work"));
  app.use('/app/pages', express.static(__dirname + "/app/pages"));
  app.use('/app/img', express.static(__dirname + "/app/img"));
  app.use('/app/zines', express.static(__dirname + "/app/zines"));


  app.all('/*', function(req, res, next) {
    res.sendFile('/app/index.html', { root: __dirname });
  });
};