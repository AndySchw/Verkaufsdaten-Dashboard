async function createChart5(hersteller) {
  // Fetch data from the server
  const response = await fetch(`http://localhost:3000/api/prozent/${hersteller}`);
  const result = await response.json();

  // Convert data into Chart.js format
  const labels = [result.hersteller];
  const datasetData = [result.percentage];

  const data = {
    labels: labels,
    datasets: [{
      label: 'Sales Percentage',
      data: datasetData,
      backgroundColor: ['rgba(54, 162, 235, 1)'],
      borderColor: ['rgba(54, 162, 235, 1)'],
      borderWidth: 1
    }]
  };

  // Create Chart.js chart
  new Chart(
    document.getElementById('barchart5'),
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
