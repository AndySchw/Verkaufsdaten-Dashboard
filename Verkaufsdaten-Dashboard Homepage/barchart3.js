async function createChart() {
  // Fetch data from the server
  const response = await fetch('http://localhost:3000/api/date');
  const result = await response.json();
  console.log(result)

  // Convert data into Chart.js format
  const labels = result.map(entry => entry._id);
  const datasetData = result.map(entry => entry.VerkaufteMenge);

  const data = {
    labels: labels,
    datasets: [{
      label: 'Beste Tage/Verkäufe',
      data: datasetData,
      backgroundColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
      borderColor: ['RGBA(0, 0, 0, 1)', 'RGBA(0, 0, 0, 1)', 'RGBA(0, 0, 0, 1)'],
      borderWidth: 2
    }]
  };

  // Create Chart.js chart
  new Chart(
    document.getElementById('barchart3'),
    {
      type: "bar",
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
