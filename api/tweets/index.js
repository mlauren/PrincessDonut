'use strict';

var express = require('express');
var controller = require('./tweet.controller');

var router = express.Router();
// Get at replies
router.get('/', controller.main);
router.get('/getMentions', controller.getMentions);


module.exports = router;
