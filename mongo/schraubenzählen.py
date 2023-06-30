import json

# Lade die Daten aus der output.json-Datei
with open('output.json', 'r') as f:
    data = json.load(f)

# Erstelle ein Dictionary, um die verschiedenen Schraubenarten zu zählen
schrauben_count = {}

# Gehe durch jedes Element in den Daten
for item in data:
    # Hole den Schraubentyp aus dem Element
    schraube = item['Schraube']
    
    # Wenn der Schraubentyp bereits im Dictionary vorhanden ist, erhöhe den Zähler um 1
    if schraube in schrauben_count:
        schrauben_count[schraube] += 1
    # Andernfalls füge den Schraubentyp zum Dictionary hinzu und setze den Zähler auf 1
    else:
        schrauben_count[schraube] = 1

# Gebe das Ergebnis aus
print(schrauben_count)
