'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');
var hotels = require('./controllers/hotels');

// Ruta de la API
router.get('/hotels', hotels.findAll);

router.get('/seedDB', hotels.seedDB);

module.exports = router;