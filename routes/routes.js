var firebase = require('firebase');
var database = firebase.database();

module.exports = function(app, path){
    
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '/..' , '/public/index.html'));
    });

    app.get('/allExpenses', function(req, res){
        database.ref('/').once("value", function(snapshot) {
            // console.log(snapshot.val());
            res.send(snapshot.val());
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });
    });

    app.post('/addExpense', function(req, res){
        console.log(req);
        // database.ref('/').push(expense, function(error){
        //     console.log(error);
        // });
    });

    app.use('*', function(req,res){
        res.sendFile(path.join(__dirname, '/..' , '/public/404.html'));
    });

}
