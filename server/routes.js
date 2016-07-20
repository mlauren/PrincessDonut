'use strict';

var express = require('express'),
    errors = require('./errors');

module.exports = function(app) {

  // server routes ===========================================================
  // handle things like api calls
  // authentication routes

  // frontend routes =========================================================
  app.use('/js', express.static(__dirname + "/js"));
  app.use('/work', express.static(__dirname + "/work"));
  app.use('/pages', express.static(__dirname + "/pages"));
  app.use('/img', express.static(__dirname + "/img"));
  app.use('/zines', express.static(__dirname + "/zines"));

  app.all('/*', function(req, res, next) {
      res.sendFile('index.html', { root: __dirname });
  });

};