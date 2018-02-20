var controllers = angular.module('expense.controller', []);

controllers.controller('expense', function ($scope, $http) {

    $http.get("http://localhost:8080/allExpenses").then(function (response) {
        $scope.expenses = response.data;
    });

    $scope.addExpense = function () {
        var expense = {Type: $scope.expenseType, Value: $scope.expenseValue, Note: $scope.expenseNote};
         $http.post("http://localhost:8080/addExpense", expense)
         .then(function (response) { $scope.result = response.data ;});
    }
});

