var express = require('express');
var moment = require('moment');
var bodyParser = require('body-parser');


var app = express();
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.use(express.static(__dirname + '/assets'));
app.set("view engine", "ejs");


app.get('/', function(req, res) {
    res.render('index.ejs', {moment : moment});
});


app.listen(8081,"127.0.0.1");