'use strict';

var contentDisposition = require('content-disposition'),
    express = require('express'),
    path = require('path'),
    errors = require('./errors');

module.exports = function(app) {


  // ROUTES FOR OUR API
  // =============================================================================
  var router = express.Router();              // get an instance of the express Router

  // middleware to use for all requests
  /*router.use(function(req, res, next) {
      // do logging
      console.log('Something is happening.');
      next(); // make sure we go to the next routes and don't stop here
  });

  // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
  router.get('/', function(req, res) {
      res.json({ message: 'hooray! welcome to our api!' });   
  });

  router.get('/tweets', function(req, res) {


  });*/

  // more routes for our API will happen here

  // REGISTER OUR ROUTES -------------------------------
  // all of our routes will be prefixed with /api
  app.use('/api/tweets', require('./api/tweets'));

  // more routes for our API will happen here
  // server routes ===========================================================
  // handle things like api calls
  // app.use('/api/tweets', require('./api/tweets'));

  // frontend routes =========================================================
  //app.use('/app', express.static(__dirname + '/app'));

  // app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   // .get(errors[404]);
  app.use('/', express.static('app'));

  // app.use(express.static('app'));

  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/app/index.html');
  });

};
