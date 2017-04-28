'use strict';

var Hotel = require('./../models/hotel');
var mongoose = require('mongoose');
var setHeader = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', false);
}

/**
 * Carga hoteles en la BD
 * 
 * @param req - HTTP Request.
 * @param res - HTTP Response.
 */

module.exports.seedDB = function(req, res) {
    setHeader(req, res);
    //Ejecutamos query
    Hotel.create({
            "_id": new mongoose.mongo.ObjectID(),
            "name": "Hotel Emperador",
            "stars": "3",
            "price": "1596",
            "image": '/images/hotels/emperador.png'
        }, {
            "_id": new mongoose.mongo.ObjectID(),
            "name": "Petit Palace San Bernardo",
            "stars": "4",
            "price": "2145",
            "image": '/images/hotels/petit_palace.png'
        }, {
            "_id": new mongoose.mongo.ObjectID(),
            "name": "Hotel Nuevo Boston",
            "stars": "2",
            "price": "861",
            "image": '/images/hotels/nuevo_boston.png'
        },

        function(err, results) {
            if (err) {
                console.log("Error importando: ", err);
                return res.status(500).send(err);
            } else
                return res.status(200).send('Importado correctamente!');
        });
}

/**
 * Devuelve todos los hoteles
 * 
 * @param req - HTTP Request.
 * @param res - HTTP Response.
 */
module.exports.findAll = function(req, res) {
    setHeader(req, res);
    //Ejecutamos query
    Hotel.find({}, function(err, results) {
        if (err) {
            console.log("Error BD: ", err);
            return res.status(500).send(err);
        } else
            return res.status(200).send(results);
    });
};