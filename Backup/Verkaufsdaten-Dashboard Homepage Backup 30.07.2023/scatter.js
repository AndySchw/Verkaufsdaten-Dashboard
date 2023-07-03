//Beispiellink
//https://www.chartjs.org/docs/latest/charts/scatter.html
//Ohne den wahrscheinlich nicht machbar

(async function () {
  const data = [
    // HIER DIE DATEN REINSCHREIBEN
    { x: 20, y: 30 },
    { x: 40, y: 10 },
    // Weitere Datenpunkte hier hinzufügen
  ];


  new Chart(
    document.getElementById('scatter'),
    {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Scatter Dataset',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom'
          }
        }
      }
    }
  );
})();



