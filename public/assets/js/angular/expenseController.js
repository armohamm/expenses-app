var controllers = angular.module('expense.controller', []);

controllers.controller('expense', function ($scope, $http) {

    $http.get("http://localhost:3000/allExpenses").then(function (response) {
        $scope.expenses = response.data;
        chart(response);
    });

    $scope.addExpense = function () {

        var expense = { Type: $scope.expenseType, Value: parseFloat($scope.expenseValue).toFixed(2), Note: $scope.expenseNote, DateCreated: new Date() };

        console.log(expense);

        $http.post("http://localhost:3000/addExpense", expense)
            .then(function (response) { $scope.result = response.data; });

        cleanForm();

        $("#addExpense").modal('hide');

        $http.get("http://localhost:3000/allExpenses").then(function (response) {
            $scope.expenses = response.data;
            chart(response);
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

        cleanForm();

        $("#updateExpense").modal('hide');

        $http.get("http://localhost:3000/allExpenses").then(function (response) {
            $scope.expenses = response.data;
            chart(response);
        });
    }

    $scope.deleteExpense = function(event){
        
        var key = event.target.id;

        $http.get("http://localhost:3000/removeExpenses/" + key).then(function (response) {
            $scope.expenses = response.data;
        });

        $http.get("http://localhost:3000/allExpenses").then(function (response) {
            $scope.expenses = response.data;
            chart(response);
        });
    }

    function chart(response){
        var types = ['Fixed', 'Daycare', 'Loans', 'Daycare', 'Tuition', 'Utilities', 'Vacation', 'Fun'];
        var total = generateChart(response);
        populateChart(types, total);
    }

    function cleanForm(){
        $scope.expenseType = null;
        $scope.expenseValue = null;
        $scope.expenseNote = null;
    }

    function populateChart(types, total) {

        var columnColor = ['rgba(0,108,169,.5)', 'rgba(247,228,59,.5)', 'rgba(247,187,98,.5)', "rgba(252,81,55,.5)", "rgba(251,229,234,.5)", "rgba(189,144,167,.5)", "rgba(231,197,162,.5)", "rgba(76,255,88,.5)"];

        var borderColor = ['rgb(0,108,169)', 'rgb(247, 228, 59)', 'rgb(247, 187, 98)', "rgb(252, 81, 55)", "rgb(251, 229, 234)", "rgb(189,144,167)", "rgb(231,197,162)", "rgb(76,255,88)"];

        var progress = document.getElementById('animationProgress');
        $("#animationProgress").hide();
        var ctx = $("#pie_chart_expenses");
        var bacChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: types,
                datasets: [{
                    label: "Total",
                    data: total,
                    backgroundColor: columnColor,
                    borderColor: borderColor,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 5000,
                    onProgress: function (animation) {
                        progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
                    }
                }
            }
        });
    }

    function generateChart(response){
        var charExpenses = [];

        var types = ['Fixed', 'Daycare', 'Loans', 'Daycare', 'Tuition', 'Utilities', 'Vacation', 'Fun'];

        var expenses = response.data;

        types.forEach(type => {
            var total = 0;
            for(i =0; i < expenses.length; i++){
                var expense = expenses[i];
                if(expense.Type == type){
                    total = total + Number(expense.Value);
                }
            }
            charExpenses.push(total);
        });

        return charExpenses;
    }
});

