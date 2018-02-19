var express = require('express');
var app = express();
var morgan = require('morgan');
var path = require('path');

app.use(express.static('./public'));
app.use(morgan('dev'));

console.log(__dirname);

require('./routes/routes.js')(app, path);

var listener = app.listen(process.env.PORT || 8080 , function(){
    console.log('Listening expenses-app on ' + listener.address().port);
});
