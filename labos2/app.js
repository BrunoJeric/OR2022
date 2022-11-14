require('dotenv').config();
var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var cors = require('cors')
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);
const db =  mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected'));

routes(app);

var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});

app.get('/download/csv', function(req, res){
    const file = `${__dirname}/download/Westeros-castles.csv`;
    res.download(file); // Set disposition and send it.
});
app.get('/download/json', function(req, res){
    const file = `${__dirname}/download/Westeros-castles.json`;
    res.download(file); // Set disposition and send it.
});