async function createChart() {
  // Fetch data from the server
  const response = await fetch('http://localhost:3000/api/hersteller/Wuerth');
  const result = await response.json();

  // Extract data for the chart
  const labels = result.map(entry => entry._id);
  const datasetData = result.map(entry => entry.Umsatz);
  const quantityData = result.map(entry => entry.Menge);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Umsatz',
        data: datasetData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(0, 0, 0, 0.5)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(255, 99, 132, 1)',
        hoverBorderColor: 'rgba(0, 0, 0, 1)'
      },
      {
        label: 'Menge',
        data: quantityData,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(0, 0, 0, 0.5)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(54, 162, 235, 1)',
        hoverBorderColor: 'rgba(0, 0, 0, 1)'
      }
    ]
  };

  // Create or update the Chart.js chart
  let chart = Chart.getChart('barchart8');
  if (!chart) {
    chart = new Chart(
      document.getElementById('barchart8'),
      {
        type: 'bar',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value, index, values) => {
                  if (index === 0) {
                    return `${value.toLocaleString()}€`;
                  }
                  return value.toLocaleString();
                }
              }
            }
          }
        }
      }
    );
  } else {
    chart.data = data;
    chart.options.scales.y.ticks.callback = (value, index, values) => {
      if (index === 0) {
        return `${value.toLocaleString()}€`;
      }
      return value.toLocaleString();
    };
    chart.update();
  }
}

createChart();
