// import Chart from 'chart.js/auto';
const ctx = document.getElementById('myChart');
// var vic_data = JSON.parse(document.getElementById("mydiv").dataset.myData);
var vic_data = d3.json("/vicdata")
console.log(vic_data)

new Chart(ctx, {
    type: 'line',
    data: {
      // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: 'My First Dataset',
        data: vic_data,
        // fill: false,
        borderColor: 'rgb(75, 192, 192)',
        // tension: 0.1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });