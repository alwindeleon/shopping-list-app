require('./db/connect');
var express = require('express');
var router = require('./routes/router');
var bodyParser = require('body-parser');
var logger = require('morgan');
var path = require("path");
var app = express();



app.set("views",path.join(__dirname,"views"));
app.set("view engine","jade");

//middlewares

app.use(logger("dev"));
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
//routes
app.use('/',router);
app.use('*',function(req,res){
	res.status(404).json({message: "Not Found"});
});

app.listen(8080, function(){
	console.log("listening on port 8080");
});