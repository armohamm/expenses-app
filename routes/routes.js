var firebase = require('firebase');
var database = firebase.database();
var dbExpense = database.ref('/expenses/');


module.exports = function(app, path){
    
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '/..' , '/public/index.html'));
    });

    app.get('/allExpenses', function(req, res){
        dbExpense.once("value", function(snapshot) {
            // console.log(snapshot.val());
            res.send(snapshot.val());
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });
    });

    app.post('/addExpense', function(req, res){
        var expense = req.body;

        dbExpense.push(expense, function(error){
            if(error){
                console.log("Data could not be saved." + error);
                res.send('worked');
            } else {
                console.log("Data saved successfully.");
                res.send('error');
            }
        });
        
    });

    app.use('*', function(req,res){
        res.sendFile(path.join(__dirname, '/..' , '/public/404.html'));
    });

}
