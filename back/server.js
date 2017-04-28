var express = require('express');
var app = express();

var cfgMongo = require('./db');
var mongoose = require('mongoose');

var alMundo = require('./app');

const PUERTO_NODEJS = 3000;

mongoose.connect('mongodb://' + cfgMongo.ip + '/' + cfgMongo.db);

app.use('/', alMundo);

app.listen(PUERTO_NODEJS, function() {
    console.log("Backend iniciado en puerto 3000!");
    console.log("--------> http://localhost:3000 <--------");
    console.log("");
    console.log("Frontend iniciado en puerto 8000!");
    console.log("--------> http://localhost:8000 <--------");
});