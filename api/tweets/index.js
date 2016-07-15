'use strict';

var express = require('express');
var controller = require('./tweet.controller');

var router = express.Router();
// Get at replies
router.get('/', controller.index);

module.exports = router;
