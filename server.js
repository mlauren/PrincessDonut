// Modules
var express = require('express');
var app = express();
var Twit = require('twit');
// Setup server
var server = require('http').createServer(app);

// IO
var io = require('socket.io')(server);

// Set our port
var port = process.env.PORT || 3001;

// Start server
server.listen(port, function () {
  console.log('Express server listening on %d', port);
});

// Routes
app.use('/', express.static('app'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + 'app/index.html');
});
app.get('*', function(req, res){
  res.status(404).sendFile(__dirname + '/app/index.html');
});

twit = new Twit({
  consumer_key:         '6U3ASBeodwSY8OgrNg4diORnJ',
  consumer_secret:      'wCL3DgE0QMWobbhpALWpgx83pHn0taUdmKKLfXjdALs0kbs9Ji',
  access_token:         '752643629978488835-rrT8yDAspH4gHxTJkBT1qHS4bVSWs3M',
  access_token_secret:  'sho2o1YkyOEMWmIARuLHMEth3yVrTRpViQ8QHCXo0Z3ms'
});

// Socket Connection
io.on('connection', function (socket) {
  socket.on('set', function (status, callback) {
    twit.get('statuses/mentions_timeline', { count: 1 }, function(err, tweet, response) {

      if (tweet[0]) {
        if (tweet[0].entities.media) {
          io.emit('tweetmedia', { message: tweet[0].entities.media[0] });

          tweetText = tweet[0].text.replace(tweet[0].entities.media[0].url, '');
        }
        else {
          tweetText = tweet[0].text;
        }
        io.emit('tweet', { message: tweetText });
      }
    });
  });
});

// Twitter
var variousResponses,
    twit,
    stream,
    bird,
    tweetText,
    replyTweet,
    replyParams;

variousResponses = [
    '（・⊝・）'
  , '⋛⋋( ‘Θ’)⋌⋚'
  , 'ㄟ( ･ө･ )ㄏ'
  , '（´◉◞⊖◟◉｀）'
  , '（´≝◞⊖◟≝｀)'
  , '⋋(◍’Θ’◍)⋌'
  , '(•ө•)♡'
  , '(∞ ❛ั ⊝❛ั )'
];

stream = twit.stream('statuses/filter', { track: ['@SimonHi'] });
stream.on('tweet', function(tweet) {

  bird = variousResponses[Math.floor(Math.random() * variousResponses.length)];

  replyTweet = '@' + tweet.user.screen_name + ' ' + bird;
  replyParams = {status: replyTweet, in_reply_to_status_id: tweet.id};

  twit.post('statuses/update', replyParams);

  if (tweet.entities.media) {
    io.emit('tweetmedia', { message: tweet.entities.media[0] });

    tweetText = tweet.text.replace(tweet.entities.media[0].url, '');
  }
  else {
    tweetText = tweet.text;
  }

  io.emit('tweet', { message: tweetText });
});


// expose app
exports = module.exports = app;