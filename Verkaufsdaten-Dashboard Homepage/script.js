

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

const textElement = document.getElementById('typing-effect');
  const text = textElement.innerHTML;
  textElement.innerHTML = '';

  let index = 0;
  const typingInterval = setInterval(() => {
    textElement.innerHTML += text[index];
    index++;
    if (index >= text.length) {
      clearInterval(typingInterval);
    }
  }, 50);


// Umsatz pro Schraubenart pro Hersteller
async function updateOutput() {
  const herstellerSelect = document.getElementById('herstellerSelect');
  const schraubeSelect = document.getElementById('schraubeSelect');
  const output1 = document.getElementById('output1');
  const hersteller = herstellerSelect.value;
  const schraube = schraubeSelect.value;
  if (hersteller && schraube) {
    const response = await fetch(`http://localhost:3000/api/verkaufswerte/${hersteller}/${schraube}`);
    const data = await response.json();
    if (data.length > 0) {
      const gesamtVerkaufswert = data[0].GesamtVerkaufswert.toFixed(2);
      output1.textContent = gesamtVerkaufswert + ' €';
    } else {
      output1.textContent = 'Keine Daten gefunden';
    }
  } else {
    output1.textContent = '';
  }
}


// am meisten verkaufte Schraubenart pro Hersteller
async function updateOutput2(hersteller) {
  const output2 = document.getElementById('output2');
  if (hersteller) {
    const response = await fetch(`http://localhost:3000/api/topschraube/${hersteller}`);
    const data = await response.json();
    if (data.length > 0) {
      output2.textContent = data[0]._id;
    } else {
      output2.textContent = 'Keine Daten gefunden';
    }
  } else {
    output2.textContent = '';
  }
}


// Gesamtumsatz pro Hersteller für einen Monat
async function updateOutput3(hersteller) {
  const output3 = document.getElementById('output3');
  if (hersteller) {
    const response = await fetch(`http://localhost:3000/api/gesamtumsatz/${hersteller}`);
    const data = await response.json();
    if (data.length > 0) {
      const gesamtUmsatz = data[0].GesamtUmsatz.toFixed(2);
      output3.textContent = gesamtUmsatz + ' €';
    } else {
      output3.textContent = 'Keine Daten gefunden';
    }
  } else {
    output3.textContent = '';
  }
}
