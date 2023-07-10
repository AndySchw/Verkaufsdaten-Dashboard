# Schrauben24 API

Diese RESTful API wurde mit Express.js und MongoDB für die Schrauben24-Anwendung entwickelt. Sie bietet verschiedene Endpunkte zum Abrufen von Daten zu Schraubenverkäufen, Herstellern und Umsätzen.

## Voraussetzungen

- Node.js
- MongoDB

## Erste Schritte

1. Klonen oder laden Sie das Repository herunter.
2. Installieren Sie die Abhängigkeiten mit dem Befehl `npm install`.
3. Starten Sie den Server mit dem Befehl `npm start`.
4. Der Server läuft unter `http://localhost:3000`.

## API-Endpunkte

- `GET /api/schrauben`: Ruft alle Schrauben ab.
- `GET /api/top3`: Ruft die 3 meistverkauften Schraubenarten ab.
- `GET /api/hersteller`: Ruft die Hersteller und ihren Gesamtumsatz ab.
- `GET /api/date`: Ruft die Verkaufsmenge pro Tag ab.
- `GET /api/verkaufswochentag`: Ruft den Durchschnittsverkauf pro Wochentag ab.
- `GET /api/prozent/:hersteller`: Ruft den prozentualen Verkauf für jede Schraubenart eines Herstellers ab.
- `GET /api/hersteller/:name`: Ruft Umsatz, Menge und Trends für jeden Hersteller ab.
- `GET /api/verkaufswerte/:hersteller/:schraube`: Ruft den Gesamtverkaufswert für einen bestimmten Schraubentyp und Hersteller ab.
- `GET /api/topschraube/:hersteller`: Ruft den meistverkauften Schraubentyp für einen bestimmten Hersteller ab.
- `GET /api/gesamtumsatz/:hersteller`: Ruft den Gesamtumsatz für einen bestimmten Hersteller innerhalb eines Monats ab.

## Datenbankverbindung

Die API stellt eine Verbindung zu einer MongoDB-Datenbank her, indem sie den folgenden Verbindungsstring verwendet:
