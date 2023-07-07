// Create the initial chart
let chart5;

async function createChart5(hersteller) {
  // Fetch data from the server
  const response = await fetch(`http://localhost:3000/api/prozent/${hersteller}`);
  const result = await response.json();

  // Convert data into Chart.js format
  const labels = result.percentages.map(schraube => schraube.schraube);
  const datasetData = result.percentages.map(schraube => schraube.percentage);
  const minValue = Math.min(...datasetData) * 0.95;

  const data = {
    labels: labels,
    datasets: [{
      label: 'Verkaufsprozentsatz',
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
      hoverBorderWidth: 2      
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
          indexAxis: 'y', // Display bars horizontally
          scales: {
            x: {
              min: minValue
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
