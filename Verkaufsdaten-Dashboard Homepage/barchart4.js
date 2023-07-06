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
      backgroundColor: [
        'rgba(0, 255, 0, 0.3)',
        'rgba(255, 99, 132, 0.3)',
        'rgba(75, 192, 192, 0.3)',
        'rgba(125, 200, 50, 0.3)',
        'rgba(200, 100, 150, 0.3)',
        'rgba(230, 150, 20, 0.3)',
        'rgba(50, 150, 200, 0.3)',
        'rgba(180, 60, 230, 0.3)',
        'rgba(100, 100, 100, 0.3)',
        'rgba(255, 255, 0, 0.3)'
      ],
      borderColor: [
        'RGBA(0, 0, 0, 1)',
        'RGBA(0, 0, 0, 1)',
        'RGBA(0, 0, 0, 1)',
        'RGBA(0, 0, 0, 1)',
        'RGBA(0, 0, 0, 1)',
        'RGBA(0, 0, 0, 1)',
        'RGBA(0, 0, 0, 1)',
        'RGBA(0, 0, 0, 1)',
        'RGBA(0, 0, 0, 1)',
        'RGBA(0, 0, 0, 1)'
      ],
      borderWidth: 2,
      hoverBackgroundColor: [
        'rgba(0, 255, 0, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(125, 200, 50, 1)',
        'rgba(200, 100, 150, 1)',
        'rgba(230, 150, 20, 1)',
        'rgba(50, 150, 200, 1)',
        'rgba(180, 60, 230, 1)',
        'rgba(100, 100, 100, 1)',
        'rgba(255, 255, 0, 1)'
      ],
      hoverBorderColor: [
        'RGBA(0, 0, 0, 1)',
        'RGBA(0, 0, 0, 1)',
        'RGBA(0, 0, 0, 1)',
        'RGBA(0, 0, 0, 1)',
        'RGBA(0, 0, 0, 1)',
        'RGBA(0, 0, 0, 1)',
        'RGBA(0, 0, 0, 1)',
        'RGBA(0, 0, 0, 1)',
        'RGBA(0, 0, 0, 1)',
        'RGBA(0, 0, 0, 1)'
      ],
      hoverBorderWidth: 1
      }
    ]
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
