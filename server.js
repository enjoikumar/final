// =============
// requirements
// =============
var express = require('express');
var app = express();
var morgan = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var cookieParser = require("cookie-parser");
var ngrok = require('ngrok');
var port = process.env.PORT || 3000;


// =============
// Middleware
// =============
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(cookieParser());


// =============
// Middleware
// =============
app.use(express.static("public"));


//==========
// database
//==========
var db = process.env.MONGODB_URI || "mongodb://localhost/final";
mongoose.connect(db);
//REMEMBER TO TURN ON MONGOD 


//==========
// Ngrok 
//==========
ngrok.connect({
	proto: 'http', 
	addr: port,  
	auth: 'user:pwd', 
	region: 'us'
}, function (err, url) {
});


// =============
// Server
// =============
app.listen(port);
console.log("==============");
console.log("server running on port " + port);
console.log("==============");
