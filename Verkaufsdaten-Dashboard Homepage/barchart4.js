async function createChart() {
  // Fetch data from the server
  const response = await fetch('http://localhost:3000/api/verkaufswochentag');
  const result = await response.json();
  console.log(result)

  // Convert data into Chart.js format
  const labels = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  const datasetData = result.map(entry => entry.avgSales);

  const data = {
    labels: labels,
    datasets: [{
      label: 'Durchschnittlicher Verkauf pro Wochentag',
      data: datasetData,
      backgroundColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
      borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
      borderWidth: 1
    }]
  };

// Create Chart.js chart
new Chart(
    document.getElementById('barchart4'),
    {
      type: "pie",
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    }
);
}

createChart();
