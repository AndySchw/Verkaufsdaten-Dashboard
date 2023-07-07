async function createChart() {
  // Fetch data from the server
  const response = await fetch('http://localhost:3000/api/date');
  const result = await response.json();
  console.log(result)

  // Convert data into Chart.js format
  const labels = result.map(entry => entry._id);
  const datasetData = result.map(entry => entry.VerkaufteMenge);
  const minValue = Math.min(...datasetData) * 0.98;

  const data = {
    labels: labels,
    datasets: [{
      label: 'Beste Tage/Verkäufe',
      data: datasetData,
      backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(75, 192, 192, 0.5)'],
      borderColor: ['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.5)'],
      borderWidth: 2,
      hoverBackgroundColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
      hoverBorderColor: ['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)']
    }]
  };

  // Create Chart.js chart
  new Chart(
    document.getElementById('barchart3'),
    {
      type: "doughnut",
      data: data,
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Beste Tage/Verkäufe'
          }
        },
        scales: {
          y: {
            min: minValue
          }
        }
      },
    }
  );
}

createChart();
