'use strict';

var express = require('express');
var app = express();
var router = express.Router();
var routes = require('./routes');

router.use('/', routes);

app.use(router);

module.exports = app;