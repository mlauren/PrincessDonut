// Gets a list of tweets
'use strict';
var _ = require('lodash');
var Twit = require('twit')


exports.main = function(req, res) {
	res.send('hello world');


}

exports.getMentions = function(req, res) {
	var twit = new Twit({
		consumer_key:         '6U3ASBeodwSY8OgrNg4diORnJ',
		consumer_secret:      'wCL3DgE0QMWobbhpALWpgx83pHn0taUdmKKLfXjdALs0kbs9Ji',
		access_token:         '752643629978488835-rrT8yDAspH4gHxTJkBT1qHS4bVSWs3M',
		access_token_secret:  'sho2o1YkyOEMWmIARuLHMEth3yVrTRpViQ8QHCXo0Z3ms',
		timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
	})

	var stream = twit.stream('statuses/filter', { track: ['@SimonHi'] });

	stream.on('tweet', function(tweet) {
		console.log(tweet);

	});


	//
	//  tweet 'hello world!'
	//
	// var post = T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
	  // console.log(data)
	// })
	// res.send(post)

	//
	//  search twitter for all tweets containing the word 'banana' since July 11, 2011
	//
	

}