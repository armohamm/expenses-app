var controllers = angular.module('expense.controller', []);

controllers.controller('expense', function ($scope, $http) {

    $http.get("http://localhost:3000/allExpenses").then(function (response) {
        $scope.expenses = response.data;
    });

    $scope.addExpense = function () {

        var expense = { Type: $scope.expenseType, Value: $scope.expenseValue, Note: $scope.expenseNote, DateCreated: new Date() };

        console.log(expense);

        $http.post("http://localhost:3000/addExpense", expense)
            .then(function (response) { $scope.result = response.data; });

        $("#addExpense").modal('hide');

        $http.get("http://localhost:3000/allExpenses").then(function (response) {
            $scope.expenses = response.data;
        });
    }

    $scope.getExpense = function (event){

        var expense = JSON.parse(event.target.id);

        $scope.expenseType = expense.Type;
        $scope.expenseNote = expense.Note;
        $scope.expenseValue = expense.Value;
        $scope.Key = expense.Key;

        $("#updateExpense").modal();
    }

    $scope.updateExpense = function(){

        var expense = { Type: $scope.expenseType, Value: $scope.expenseValue, Note: $scope.expenseNote, DateModified: new Date() };

        var key = $scope.Key;

        $http.post("http://localhost:3000/updateExpense/" + key, expense).then(function (response) {
            $scope.expenses = response.data;
        });

        $("#updateExpense").modal('hide');

        $http.get("http://localhost:3000/allExpenses").then(function (response) {
            $scope.expenses = response.data;
        });
    }

    $scope.deleteExpense = function(event){
        
        var key = event.target.id;

        $http.get("http://localhost:3000/removeExpenses/" + key).then(function (response) {
            $scope.expenses = response.data;
        });

        $http.get("http://localhost:3000/allExpenses").then(function (response) {
            $scope.expenses = response.data;
        });
    }
});

