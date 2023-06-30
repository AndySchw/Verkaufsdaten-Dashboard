const MongoClient = require('mongodb').MongoClient;

(async function() {
  // MongoDB-Verbindungs-URL
  const url = 'mongodb+srv://christiangruender:8fBQzZdDlLX1kBE4@cluster0.xhnylat.mongodb.net/schrauben24?retryWrites=true&w=majority';
  
  // Name der Datenbank und der Sammlung
  const dbName = 'schrauben24';
  const collectionName = 'schrauben24';

  try {
    // Verbindung zur MongoDB herstellen
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);

    // Daten aus der MongoDB abrufen
    const collection = db.collection(collectionName);
    const result = await collection.find().toArray();

    // Daten in das Chart.js-Format konvertieren
    const labels = result.map(entry => entry.label);
    const datasetData = result.map(entry => entry.data);
    const backgroundColors = result.map(entry => entry.backgroundColor);
    const borderColors = result.map(entry => entry.borderColor);

    const data = {
      labels: labels,
      datasets: [{
        label: 'My First Dataset',
        data: datasetData,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1
      }]
    };

    // Chart.js-Diagramm erstellen
    new Chart(
      document.getElementById('barchart'),
      {
        type: 'bar',
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

    // MongoDB-Verbindung schließen
    client.close();
  } catch (err) {
    console.error('Fehler beim Abrufen der Daten aus MongoDB:', err);
  }
})();
