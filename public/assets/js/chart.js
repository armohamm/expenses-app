$(document).ready(function (){

    $.get(location.protocol + '//' + location.host + '/allExpenses', function(data){
        chart(data);
    });

});

function chart(response){
    var types = ['Fixed', 'Daycare', 'Loans', 'Daycare', 'Tuition', 'Utilities', 'Vacation', 'Fun'];
    var total = generateChart(response);
    populateChart(types, total);
}

function generateChart(response){
    var charExpenses = [];

    var types = ['Fixed', 'Daycare', 'Loans', 'Daycare', 'Tuition', 'Utilities', 'Vacation', 'Fun'];

    var expenses = response;

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

function populateChart(types, total){
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
