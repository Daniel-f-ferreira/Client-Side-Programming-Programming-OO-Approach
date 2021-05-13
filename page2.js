//Daniel Freitas Ferreira 2020335



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var bill = {
    starters: getRandomInt(1, 100),
    mains: getRandomInt(1, 100),
    desserts: getRandomInt(1, 100),
    drinks: getRandomInt(1, 100)
}

// CHART JS
var ctx = document.getElementById('myChart').getContext('2d');
const data = {
    labels: [
      'Starters',
      'Mains',
      'Desserts',
      'Drinks'
    ],
    datasets: [{
      label: 'money spent in each category',
      data: [bill.starters, bill.mains, bill.desserts, bill.drinks],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(64, 105, 202)'
      ],
      hoverOffset: 4
    }]
};

var myChart = new Chart(document.getElementById('myChart2').getContext('2d'), {
    type: 'bar',
    data: data
});

var myChart2 = new Chart(ctx, {
    type: 'doughnut',
    data: data
});

// GOOGLE CHART

// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'category');
  data.addColumn('number', 'price');
  data.addRows([
    ['Starters', bill.starters],
    ['Mains', bill.mains],
    ['Desserts', bill.desserts],
    ['Drinks', bill.drinks]
  ]);

  // Set chart options
  var options = { 'title': 'money spent in each category',
                    'width':500,
                    'height':500};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  chart.draw(data, options);

  var chart = new google.visualization.BarChart(document.getElementById('chart_div2'));
  chart.draw(data, options);
}

// CANVA JS
var chart = new CanvasJS.Chart("chartContainer", {
	theme: "light1", // "light2", "dark1", "dark2"
	animationEnabled: false, // change to true		
	title:{
		text: "money spent in each category"
	},
	data: [
	{
		type: "column",
		dataPoints: [
			{ label: "Starters",  y: bill.starters  },
			{ label: "Mains", y: bill.mains  },
			{ label: "Desserts", y: bill.desserts  },
			{ label: "Drinks",  y: bill.drinks  }
		]
	}
	]
});
chart.render();

var chart2 = new CanvasJS.Chart("chartContainer2", {
	theme: "light1", // "light2", "dark1", "dark2"
	animationEnabled: false, // change to true		
	title:{
		text: "money spent in each category"
	},
	data: [
	{
		type: "pie",
		dataPoints: [
			{ label: "Starters",  y: bill.starters  },
			{ label: "Mains", y: bill.mains  },
			{ label: "Desserts", y: bill.desserts  },
			{ label: "Drinks",  y: bill.drinks  }
		]
	}
	]
});
chart2.render();
