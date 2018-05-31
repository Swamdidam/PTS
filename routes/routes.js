'use strict';

/***********************
 * Module dependencies *
 ***********************/
const express = require('express');
const jwt = require('jsonwebtoken');

const user = require('./user');

/********************
 * Router instance  *
 ********************/
const router = express.Router();

/***********************
 *   Routes            *
 **********************/
router.use('/', user);


/******************
 * Export router  *
 ******************/
module.exports = router;