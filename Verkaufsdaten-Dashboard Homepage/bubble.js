// AJAX-Aufruf, um die Daten aus der JSON-Datei zu laden
const loadData = async () => {
    try {
      const response = await fetch('bubble.json');
      const jsonData = await response.json();
      
      // Daten aus der JSON-Datei extrahieren und in das Chart-Format konvertieren
      const data = {
        datasets: [{
          label: 'First Dataset',
          data: jsonData.map(item => ({
            x: item.x,
            y: item.y,
            r: item.r
          })),
          backgroundColor: 'rgb(255, 99, 132)'
        }]
      };
      
      // Chart erstellen
      new Chart(
        document.getElementById('bubble'),
        {
          type: 'bubble',
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
    } catch (error) {
      console.error('Fehler beim Laden der Daten:', error);
    }
  };
  
  // Daten laden aufrufen
  loadData();
  