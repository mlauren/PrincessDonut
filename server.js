// server.js

// modules =================================================
var express = require('express');
var app = express();
var Twit = require('twit');

app.set('view engine', 'ejs');

// configuration ===========================================

// set our port
var port = process.env.PORT || 3000;

// Setup server
var server = require('http').Server(app);

// IO
var io = require('socket.io')(server);

// Start server
server.listen(port, function () {
  console.log('Express server listening on %d', port);
});

// routes ==================================================
app.use('/', express.static('app'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + 'app/index.html');
});

// Socket ==================================================
io.on('connection', function (socket) {
  var twit = new Twit({
    consumer_key:         '6U3ASBeodwSY8OgrNg4diORnJ',
    consumer_secret:      'wCL3DgE0QMWobbhpALWpgx83pHn0taUdmKKLfXjdALs0kbs9Ji',
    access_token:         '752643629978488835-rrT8yDAspH4gHxTJkBT1qHS4bVSWs3M',
    access_token_secret:  'sho2o1YkyOEMWmIARuLHMEth3yVrTRpViQ8QHCXo0Z3ms',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  });
  var stream = twit.stream('statuses/filter', { track: ['@SimonHi'] });

  stream.on('tweet', function(tweet) {
    console.log(tweet);
    socket.emit('tweet', { message: tweet.text });
  });

  
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

// expose app
exports = module.exports = app;