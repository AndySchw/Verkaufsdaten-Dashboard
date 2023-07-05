//Beispiellink
//https://www.chartjs.org/docs/latest/charts/doughnut.html
//Ohne den wahrscheinlich nicht machbar


(async function () {
  const data = [
    // HIER DIE DATEN REINSCHREIBEN
    { label: 'Label 1', data: 10 },
    { label: 'Label 2', data: 20 },
    { label: 'Label 3', data: 30 }
  ];


  new Chart(
    document.getElementById('doughnut'),
    {
      type: 'doughnut',
      data: {
        labels: data.map(item => item.label),
        datasets: [{
          data: data.map(item => item.data),
          backgroundColor: [
            // HIER DIE HINTERGRUNDFARBEN FÜR JEDES SEGMENT EINFÜGEN
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(255, 205, 86, 0.5)'
          ],
          borderColor: 'rgba(255, 255, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {}
    }
  );
})();
