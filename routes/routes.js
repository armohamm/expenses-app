var firebase = require('firebase');
var database = firebase.database();
var dbExpense = database.ref('/expenses/');


module.exports = function (app, path) {

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '/..', '/public/index.html'));
    });

    app.get('/allExpenses', function (req, res) {
        var expenses = [];
        dbExpense.once("value", function (snapshot) {
            snapshot.forEach((child) => {
                expenses.push({
                    Type: child.val().Type,
                    Value: child.val().Value,
                    Note: child.val().Note,
                    Key: child.key
                });
            });
            res.send(expenses);
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });


    });

    app.post('/addExpense', function (req, res) {
        var expense = req.body;

        var result = "";

        var newExpenseRef = dbExpense.push(expense, function (error) {
            if (error) {
                console.log("Data could not be saved." + error);
                result = "error";
            } else {
                console.log("Data saved successfully.");
                result = "success";
            }
        });

        res.send(result);

    });

    app.post('/updateExpense/:key', function (req, res) {

        var key = req.params.key;

        var expense = req.body;

        var result = "";

        dbExpense.child(key).set(expense, function (error){
            if (error) {
                console.log("Data could not be updated." + error);
                result = "error";
            } else {
                console.log("Data updated successfully.");
                result = "success";
            }
        });

        res.send(result);
    });

    app.get('/removeExpenses/:key', function (req, res){
        
        var key = req.params.key;

        var result = "";

        dbExpense.child(key).remove(function(error){
            if (error) {
                console.log("Data could not be deleted." + error);
                result = "error";
            } else {
                console.log("Data deleted successfully.");
                result = "success";
            }
        });

        res.send(result);

    });

    app.use('*', function (req, res) {
        res.sendFile(path.join(__dirname, '/..', '/public/404.html'));
    });

}
