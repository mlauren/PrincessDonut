// server.js

// modules =================================================
var express = require('express');
var app = express();

// configuration ===========================================

// set our port
var port = process.env.PORT || 80; 

// Setup server
var app = express();
var server = require('http').createServer(app);           

// routes ==================================================
require('./routes')(app); // configure our routes

// Start server
server.listen(port, function () {
  console.log('Express server listening on %d', port);
});

// expose app
exports = module.exports = app;