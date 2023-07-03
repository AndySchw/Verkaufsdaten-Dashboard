async function createChart() {
  // Fetch data from the server
  const response = await fetch('http://localhost:3000/api/top3');
  const result = await response.json();
  console.log(result)

  // Convert data into Chart.js format
  const labels = result.map(entry => entry.Schraube);
  const datasetData = result.map(entry => entry.VerkaufteMenge);

  const data = {
    labels: labels,
    datasets: [{
      label: 'Top 3 Schrauben nach VerkaufteMenge',
      data: datasetData,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };

  // Create Chart.js chart
  new Chart(
    document.getElementById('barchart'),
    {
      type: 'bar',
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
