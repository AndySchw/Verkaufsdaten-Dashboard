async function createChart5(hersteller) {
  // Fetch data from the server
  const response = await fetch(`http://localhost:3000/api/prozent/${hersteller}`);
  const result = await response.json();

  // Convert data into Chart.js format
  const labels = result.percentages.map(schraube => schraube.schraube);
  const datasetData = result.percentages.map(schraube => schraube.percentage);

  const data = {
    labels: labels,
    datasets: [{
      label: 'Verkaufsprozentsatz',
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

// Create a dropdown menu to select a manufacturer
const herstellerSelect = document.createElement('select');
herstellerSelect.id = 'herstellerSelect';
herstellerSelect.addEventListener('change', () => {
  createChart5(herstellerSelect.value);
});

// Add options to the dropdown menu
const herstellerOptions = ['Wuerth', 'HECO', 'SWG']; 
herstellerOptions.forEach((hersteller) => {
  const option = document.createElement('option');
  option.value = hersteller;
  option.textContent = hersteller;
  herstellerSelect.appendChild(option);
});

// Add the dropdown menu to the page
document.body.appendChild(herstellerSelect);

// Create the chart with the initially selected manufacturer
createChart5(herstellerSelect.value);
