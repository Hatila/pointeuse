var express = require('express');
var moment = require('moment');
var bodyParser = require('body-parser');
var nconf = require('nconf');
var mysql = require('mysql');

nconf.argv()
    .env()
    .file({file: __dirname + "/config.json"});

var connection = mysql.createConnection({
    host     : nconf.get('database:host'),
    user     : nconf.get('database:login'),
    password : nconf.get('database:password'),
    database : nconf.get('database:database')
});

connection.query('SELECT * from account', function(err, rows, fields) {
    if (err) throw err;

        console.log('The solution is: ',  rows.length);

});

var app = express();
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.use(express.static(__dirname + '/assets'));
app.set("view engine", "ejs");

var sess;


app.get('/', function(req, res) {
    sess = req.session;
    if(sess.id){
        res.redirect('/pannel');
    }else {
        res.render('index.ejs', {moment : moment});
    }


});

app.get('/pannel', function(req, res) {
    sess = req.session;
    if (sess.id){
        res.render('pannel.ejs', {moment : moment});
    }else {
        res.redirect('/');
    }
});

app.post('/signIn',urlencodedParser, function (req, res) {
    //todo
});


app.listen(8081,"127.0.0.1");