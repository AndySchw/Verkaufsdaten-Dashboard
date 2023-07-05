// Create the initial chart
let chart5;

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

  // Check if chart5 already exists
  if (chart5) {
    // Update the chart data
    chart5.data = data;
    chart5.update();
  } else {
    // Create a new Chart.js chart
    chart5 = new Chart(
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
}

// Create a dropdown menu to select a manufacturer
const herstellerSelect = document.createElement('select');
herstellerSelect.id = 'herstellerSelect';

// Add options to the dropdown menu
const herstellerOptions = ['Wuerth', 'HECO', 'SWG']; 
herstellerOptions.forEach((hersteller) => {
  const option = document.createElement('option');
  option.value = hersteller;
  option.textContent = hersteller;
  herstellerSelect.appendChild(option);
});

// Add an event listener to the dropdown menu
herstellerSelect.addEventListener('change', () => {
  createChart5(herstellerSelect.value);
});

// Get the chart5 div element
const chart5Div = document.querySelector('.chart5');

// Insert the dropdown menu above the chart
chart5Div.insertBefore(herstellerSelect, chart5Div.firstChild);

// Create the initial chart with the initially selected manufacturer
createChart5(herstellerSelect.value);
