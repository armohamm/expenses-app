var express = require('express');
var app = express();
var morgan = require('morgan');
var path = require('path');
var firebase = require('firebase');
var database = require('./config/database.js');

firebase.initializeApp(database);

app.use(express.static('./public'));
app.use(morgan('dev'));

require('./routes/routes.js')(app, path);

var listener = app.listen(process.env.PORT || 8080 , function(){
    console.log('Listening expenses-app on ' + listener.address().port);
});
