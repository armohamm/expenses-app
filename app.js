var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var firebase = require('firebase');
var database = require('./config/database.js');

firebase.initializeApp(database);

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('./public'));
app.use(morgan('dev'));
app.use(bodyParser.json());

require('./routes/routes.js')(app, path);

var listener = app.listen(process.env.PORT || 3000 , function(){
    console.log('Listening expenses-app on ' + listener.address().port);
});
