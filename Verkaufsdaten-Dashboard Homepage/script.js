
// Function zum Update der Ausgabe (div id="output")
function updateOutput(value) {
    // Durchführung der erforderlichen Logik auf der Grundlage des ausgewählten Wertes und Aktualisierung des entsprechenden output div
    // als Beispiel:
    const outputDiv = document.getElementById("output");
    outputDiv.innerText = "Output for " + value;
}

// Funktion für den Darkmode Switch
const switchToggle = document.getElementById("switch");

const body = document.body;

switchToggle.addEventListener("change", () => {

  if (switchToggle.checked) {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }
});

// Chart-Daten für barchart
const barchartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [{
      label: 'Dataset 1',
      data: [10, 20, 30, 40, 50],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 1
    }]
  };
  
  // Chart-Daten für barchart2
  const barchart2Data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [{
      label: 'Dataset 2',
      data: [5, 15, 25, 35, 45],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 1
    }]
  };
  
  // Funktion zur Aktualisierung des ausgewählten Charts
  function updateChart(selectElement) {
    var chartId = selectElement.value;
  
    var selectedChartCanvas = document.getElementById('selectedChart');
    selectedChartCanvas.innerHTML = '';
  
    // Überprüfet die ausgewählte Chart-ID und aktualisiert das Canvas entsprechend
    if (chartId === 'barchart') {
      selectedChartCanvas.innerHTML = '<canvas id="selectedChart"></canvas>';
      new Chart(selectedChartCanvas.childNodes[0], {
        type: 'line', // Ändert den Chart-Typ auf 'line'
        data: barchartData,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else if (chartId === 'barchart2') {
      selectedChartCanvas.innerHTML = '<canvas id="selectedChart"></canvas>';
      new Chart(selectedChartCanvas.childNodes[0], {
        type: 'line', // Ändert den Chart-Typ auf 'line'
        data: barchart2Data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
  