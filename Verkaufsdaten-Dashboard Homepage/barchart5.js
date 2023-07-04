async function createChart() {
  // Fetch data from the server
  const response = await fetch('http://localhost:3000/api/schrauben');
  const result = await response.json();

  // Calculate the total number of screws sold
  let totalScrewsSold = 0;
  result.forEach(schraube => {
    totalScrewsSold += schraube.VerkaufteMenge;
  });

  // Calculate the number of screws sold by Hersteller X
  let herstellerXScrewsSold = 0;
  result.forEach(schraube => {
    if (schraube.Hersteller === 'Hersteller X') {
      herstellerXScrewsSold += schraube.VerkaufteMenge;
    }
  });

  // Calculate the percentage of screws sold by Hersteller X
  const herstellerXPercentage = (herstellerXScrewsSold / totalScrewsSold) * 100;

  // Convert data into Chart.js format
  const data = {
    labels: ['Hersteller X'],
    datasets: [{
      label: 'Prozentualer Anteil der Schraubenverkäufe von Hersteller X',
      data: [herstellerXPercentage],
      backgroundColor: ['rgba(54, 162, 235, 1)'],
      borderColor: ['rgba(54, 162, 235, 1)'],
      borderWidth: 1
    }]
  };

  // Create Chart.js chart
  new Chart(
    document.getElementById('barchart5'),
    {
      type: "doughnut",
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
