google.charts.load('current', {'packages':['corechart']});
var mockarooKey;
var minIncome = 100;
var maxIncome = 200;

$.ajax({
    url: 'config.json',
    dataType: 'json',
    type: 'get',
    success:function(keys){
        mockarooKey = keys[0].MOCKAROO_KEY;
        getData();
    },
    error:function(error){
        console.log(error);
        console.log('SOMETHING WENT WRONG!!!!!!!!!')
    }
})

function getData(){
    $.ajax({
        url: 'https://my.api.mockaroo.com/ageincome2.json?key='+mockarooKey+'&min_income='+minIncome+'&max_income='+maxIncome,
        dataType: 'json',
        type: 'get',
        success:function(data){
            console.log(data);

            var dataTable = new google.visualization.DataTable();
            dataTable.addColumn("number", "Age");
            dataTable.addColumn("number", "Income");

            for (var i = 0; i < data.length; i++) {
                dataTable.addRow([data[i].age, data[i].annual_income])
            }

            var options = {
                title: 'Age Vs Income Scatter Chart'
            }

            var chart = new google.visualization.ScatterChart(document.getElementById('scatterChart'));
            chart.draw(dataTable, options)
        },
        error:function(error){
            console.log(error);
            console.log('Something went wrong while getting the Mockaroo data')
        }
    })
}
