//Dependencies
//Express
var express = require('express');
var app = express();
//Morgan
var morgan = require('morgan');
//Body-parser
var bodyParser = require('body-parser');
//Mongoose
var mongoose = require('mongoose');
//Request
var request = require('request');

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

//Importing Controllers 
// var imgur = require('./controllers/imgur_controller.js');
// app.use('/coolpicapp', imgur);

//Server execution
var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("server is running on " + port);
});

