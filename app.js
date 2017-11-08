// Modules
var express = require('express');
var app = express();
var Twit = require('twit');
// Setup server
var server = require('http').Server(app);
// IO
var io = require('socket.io')(server);



// Routes
app.use(express.static('./app'));

app.get('/', (req, res) => {
  res.status(200).sendFile('/index.html', { root: './app/' });
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


// Start server
if (module === require.main) {
  // [START server]
  // Start the server
  server.listen(process.env.PORT || 8081, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}

// expose app
module.exports = app;