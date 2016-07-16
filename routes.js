'use strict';

var contentDisposition = require('content-disposition'),
    express = require('express'),
    path = require('path'),
    errors = require('./errors');

module.exports = function(app) {

  // server routes ===========================================================
  // handle things like api calls
  //app.use('/api/tweets', require('./api/tweets'));

  // frontend routes =========================================================
  //app.use('/app', express.static(__dirname + '/app'));

  // app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   // .get(errors[404]);

   app.get('/', function (req, res) {
    res.sendFile(__dirname + '/app/index.html');
  });

 
  
};
