'use strict';

var mongoose = require('mongoose');

var hotelSchema = new mongoose.Schema({

	_id: mongoose.SchemaTypes.ObjectId,
	name: String,
	stars: Number,
	price: Number,
	image: String
});

module.exports = mongoose.model('Hotel', hotelSchema)